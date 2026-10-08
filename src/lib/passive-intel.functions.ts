import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { PassiveIntelReport, ShodanInfo, VulnFinding, ScanSeverity } from "./types";

const inputSchema = z.object({
  target: z.string().trim().min(1).max(500),
});

/** Extract a bare hostname or IP from an entity identifier (URL, "IP: 1.2.3.4", etc.) */
function normalizeTarget(raw: string): { host: string; isIp: boolean } | null {
  const t = raw.trim();
  // strip protocol / path
  let host = t
    .replace(/^[a-z]+:\/\//i, "")
    .split("/")[0]
    .split(":")[0]
    .trim();
  // drop leading www.
  host = host.replace(/^www\./i, "").toLowerCase();
  const ipv4 = /^(?:\d{1,3}\.){3}\d{1,3}$/;
  const ipv6 = /^[0-9a-f:]+$/i;
  if (ipv4.test(host)) return { host, isIp: true };
  if (host.includes(":") && ipv6.test(host)) return { host, isIp: true };
  // must look like a domain
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(host)) return null;
  return { host, isIp: false };
}

async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return await Promise.race([
    p,
    new Promise<T>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)),
  ]);
}

/**
 * Third-party intel APIs return loosely-shaped JSON. Every field is read through
 * one of the `as*` helpers below rather than being asserted as `any`, so a
 * surprising response degrades to a null instead of a runtime crash.
 */
type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function asRecords(value: unknown): JsonRecord[] {
  return Array.isArray(value) ? value.map(asRecord).filter((v): v is JsonRecord => v !== null) : [];
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function asNumberArray(value: unknown): number[] {
  return Array.isArray(value) ? value.filter((v): v is number => typeof v === "number") : [];
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asStringMap(value: unknown): Record<string, string> {
  const rec = asRecord(value);
  if (!rec) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(rec)) {
    if (typeof v === "string") out[k] = v;
  }
  return out;
}

async function safeFetchJson(url: string, init?: RequestInit, timeoutMs = 8000): Promise<unknown> {
  try {
    const res = await withTimeout(fetch(url, init), timeoutMs);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// --- Sources ---------------------------------------------------------------

async function dnsLookup(host: string) {
  const types = ["A", "AAAA", "MX", "NS", "TXT", "CNAME"];
  const results: Record<string, string[]> = {};
  await Promise.all(
    types.map(async (t) => {
      const j = asRecord(
        await safeFetchJson(
          `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(host)}&type=${t}`,
          { headers: { Accept: "application/dns-json" } },
          5000,
        ),
      );
      const answers = asRecords(j?.Answer)
        .map((a) => asString(a.data))
        .filter((d): d is string => d !== null);
      if (answers.length) results[t] = answers;
    }),
  );
  return results;
}

async function rdapLookup(host: string) {
  // rdap.org redirects to authoritative RDAP endpoint
  const j = asRecord(
    await safeFetchJson(`https://rdap.org/domain/${encodeURIComponent(host)}`, undefined, 8000),
  );
  if (!j) return null;
  const events = asRecords(j.events);
  const dateOf = (action: string) =>
    asString(events.find((e) => asString(e.eventAction) === action)?.eventDate);
  const registrarEntity = asRecords(j.entities).find((e) =>
    asStringArray(e.roles).includes("registrar"),
  );
  // vcardArray is ["vcard", [["fn", {}, "text", "Example Inc."], ...]]
  const vcardRaw = registrarEntity?.vcardArray;
  const vcard = Array.isArray(vcardRaw) ? (vcardRaw as unknown[]) : [];
  const fields = Array.isArray(vcard[1]) ? (vcard[1] as unknown[][]) : [];
  const registrar = asString(fields.find((f) => Array.isArray(f) && f[0] === "fn")?.[3]);
  const nameservers = asRecords(j.nameservers)
    .map((n) => asString(n.ldhName))
    .filter((n): n is string => n !== null);
  return {
    handle: asString(j.handle) ?? undefined,
    registrar,
    status: asStringArray(j.status),
    nameservers,
    created: dateOf("registration"),
    updated: dateOf("last changed"),
    expires: dateOf("expiration"),
  };
}

async function httpHeaders(host: string) {
  for (const scheme of ["https", "http"] as const) {
    try {
      const res = await withTimeout(
        fetch(`${scheme}://${host}/`, { method: "GET", redirect: "manual" }),
        6000,
      );
      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => {
        headers[k.toLowerCase()] = v;
      });
      return { scheme, status: res.status, headers };
    } catch {
      /* try next scheme */
    }
  }
  return null;
}

async function crtShSubdomains(host: string) {
  const raw = await safeFetchJson(
    `https://crt.sh/?q=%25.${encodeURIComponent(host)}&output=json`,
    undefined,
    10000,
  );
  if (!Array.isArray(raw)) return null;
  const set = new Set<string>();
  for (const row of asRecords(raw)) {
    (asString(row.name_value) ?? "").split(/\n/).forEach((s) => {
      const n = s.trim().toLowerCase();
      if (n && !n.startsWith("*") && n.endsWith(host)) set.add(n);
    });
  }
  return { count: set.size, sample: Array.from(set).slice(0, 25).sort() };
}

async function shodanLookup(host: string, isIp: boolean): Promise<ShodanInfo | null> {
  const key = process.env.SHODAN_API_KEY;
  if (!key) return null;
  if (isIp) {
    const j = asRecord(
      await safeFetchJson(
        `https://api.shodan.io/shodan/host/${encodeURIComponent(host)}?key=${key}&minify=true`,
        undefined,
        8000,
      ),
    );
    if (!j || j.error) return null;
    return {
      ip: asString(j.ip_str),
      org: asString(j.org),
      isp: asString(j.isp),
      country: asString(j.country_name),
      os: asString(j.os),
      ports: asNumberArray(j.ports),
      hostnames: asStringArray(j.hostnames),
      vulns: asStringArray(j.vulns),
      tags: asStringArray(j.tags),
      last_update: asString(j.last_update),
      domain: null,
      subdomainCount: 0,
      subdomains: [],
    };
  }
  const j = asRecord(
    await safeFetchJson(
      `https://api.shodan.io/dns/domain/${encodeURIComponent(host)}?key=${key}`,
      undefined,
      8000,
    ),
  );
  if (!j || j.error) return null;
  const subdomains = asStringArray(j.subdomains);
  return {
    ip: null,
    org: null,
    isp: null,
    country: null,
    os: null,
    ports: [],
    hostnames: [],
    vulns: [],
    tags: asStringArray(j.tags),
    last_update: null,
    domain: asString(j.domain),
    subdomainCount: subdomains.length,
    subdomains: subdomains.slice(0, 20),
  };
}

async function virusTotalLookup(host: string, isIp: boolean) {
  const key = process.env.VIRUSTOTAL_API_KEY;
  if (!key) return null;
  const path = isIp
    ? `ip_addresses/${encodeURIComponent(host)}`
    : `domains/${encodeURIComponent(host)}`;
  const j = asRecord(
    await safeFetchJson(
      `https://www.virustotal.com/api/v3/${path}`,
      {
        headers: { "x-apikey": key },
      },
      8000,
    ),
  );
  const data = asRecord(j?.data);
  const attrs = asRecord(data?.attributes) ?? asRecord(j?.attributes);
  if (!attrs) return null;
  const stats = asRecord(attrs.last_analysis_stats) ?? {};
  const lastSeen = attrs.last_analysis_date;
  return {
    reputation: asNumber(attrs.reputation),
    malicious: asNumber(stats.malicious),
    suspicious: asNumber(stats.suspicious),
    harmless: asNumber(stats.harmless),
    undetected: asNumber(stats.undetected),
    categories: asStringMap(attrs.categories),
    lastAnalysisDate: typeof lastSeen === "number" ? new Date(lastSeen * 1000).toISOString() : null,
    asOwner: asString(attrs.as_owner),
    country: asString(attrs.country),
  };
}

// --- Finding derivation ----------------------------------------------------

function deriveFindings(r: PassiveIntelReport): VulnFinding[] {
  const out: VulnFinding[] = [];
  const push = (
    id: string,
    title: string,
    severity: ScanSeverity,
    evidence: string,
    remediation: string,
    cwe?: string,
  ) => out.push({ id, title, severity, evidence, remediation, cwe });

  // HTTP header hygiene
  if (r.http) {
    const h = r.http.headers;
    const missing: string[] = [];
    if (!h["strict-transport-security"]) missing.push("Strict-Transport-Security");
    if (!h["content-security-policy"]) missing.push("Content-Security-Policy");
    if (!h["x-content-type-options"]) missing.push("X-Content-Type-Options");
    if (!h["referrer-policy"]) missing.push("Referrer-Policy");
    if (!h["x-frame-options"] && !h["content-security-policy"]?.includes("frame-ancestors"))
      missing.push("X-Frame-Options");
    if (missing.length) {
      push(
        "PI-HDR",
        `Missing security headers (${missing.length})`,
        missing.length >= 3 ? "medium" : "low",
        `Absent: ${missing.join(", ")} on ${r.http.scheme}://${r.target}`,
        "Add missing headers via reverse proxy or app middleware.",
        "CWE-693",
      );
    }
    const banner = h["server"] || h["x-powered-by"];
    if (banner) {
      push(
        "PI-BANNER",
        "Server banner discloses framework/version",
        "info",
        `Server=${h["server"] ?? "—"}; X-Powered-By=${h["x-powered-by"] ?? "—"}`,
        "Strip Server / X-Powered-By headers to reduce fingerprinting.",
        "CWE-200",
      );
    }
    if (r.http.scheme === "http") {
      push(
        "PI-NOHTTPS",
        "Site serves plaintext HTTP",
        "high",
        `http://${r.target}/ returned ${r.http.status} without upgrading to TLS`,
        "Redirect HTTP → HTTPS and enforce HSTS.",
        "CWE-319",
      );
    }
  }

  // WHOIS age
  if (r.whois?.created) {
    const ageDays = (Date.now() - new Date(r.whois.created).getTime()) / 86_400_000;
    if (ageDays < 90 && ageDays >= 0) {
      push(
        "PI-YOUNG",
        `Domain registered ${Math.round(ageDays)} days ago`,
        "medium",
        `Created ${r.whois.created} via ${r.whois.registrar ?? "unknown registrar"}`,
        "Newly registered domains correlate with phishing/C2. Manually verify legitimacy.",
        "CWE-1188",
      );
    }
    if (r.whois.expires) {
      const daysToExpiry = (new Date(r.whois.expires).getTime() - Date.now()) / 86_400_000;
      if (daysToExpiry > 0 && daysToExpiry < 30) {
        push(
          "PI-EXPIRE",
          `Domain expires in ${Math.round(daysToExpiry)} days`,
          "low",
          `Expiration ${r.whois.expires}`,
          "Renew registration to avoid loss / hostile pickup.",
        );
      }
    }
  }

  // DNS: SPF/DMARC on TXT
  if (r.dns?.TXT) {
    const txt = r.dns.TXT.join(" ");
    if (!/v=spf1/i.test(txt)) {
      push(
        "PI-SPF",
        "No SPF record found",
        "low",
        `TXT records for ${r.target} contain no v=spf1`,
        "Publish an SPF record to prevent spoofing.",
        "CWE-290",
      );
    }
  }
  if (r.dns && !r.dns.MX && !r.dns.CNAME) {
    // silent — no mail
  }

  // Shodan
  if (r.shodan) {
    const ports = r.shodan.ports;
    const risky = ports.filter((p) =>
      [21, 23, 3389, 445, 139, 3306, 5432, 6379, 27017, 9200, 11211].includes(p),
    );
    if (risky.length) {
      push(
        "PI-EXPOSED",
        `Sensitive services exposed on ${risky.length} port(s)`,
        "high",
        `Ports open per Shodan: ${risky.join(", ")}`,
        "Firewall these services or place behind VPN / bastion.",
        "CWE-284",
      );
    }
    if (ports.length > 10) {
      push(
        "PI-SURFACE",
        `Broad attack surface: ${ports.length} open ports`,
        "medium",
        `Open: ${ports.slice(0, 20).join(", ")}${ports.length > 20 ? "…" : ""}`,
        "Audit exposed services; close what isn't required.",
      );
    }
    if (r.shodan.vulns.length) {
      push(
        "PI-CVE",
        `Shodan-tagged CVEs: ${r.shodan.vulns.length}`,
        "critical",
        `CVEs: ${r.shodan.vulns.slice(0, 10).join(", ")}${r.shodan.vulns.length > 10 ? "…" : ""}`,
        "Patch affected services immediately.",
        "CWE-1035",
      );
    }
  }

  // VirusTotal
  if (r.virustotal) {
    const vt = r.virustotal;
    if (vt.malicious >= 5) {
      push(
        "PI-VT-MAL",
        `${vt.malicious} vendors flag target as malicious`,
        "critical",
        `VT stats: malicious=${vt.malicious} suspicious=${vt.suspicious} harmless=${vt.harmless}`,
        "Consider blacklisting; escalate to threat intel.",
      );
    } else if (vt.malicious >= 1 || vt.suspicious >= 3) {
      push(
        "PI-VT-SUS",
        `Reputation flags on VirusTotal`,
        "high",
        `malicious=${vt.malicious} suspicious=${vt.suspicious}`,
        "Investigate flags; correlate with other IOC sources.",
      );
    }
    if (typeof vt.reputation === "number" && vt.reputation < -20) {
      push(
        "PI-VT-REP",
        `Negative community reputation (${vt.reputation})`,
        "medium",
        `VirusTotal community reputation score`,
        "Manual review recommended.",
      );
    }
  }

  // Subdomain sprawl
  if (r.subdomains && r.subdomains.count > 200) {
    push(
      "PI-SPRAWL",
      `Large subdomain footprint (${r.subdomains.count})`,
      "low",
      `Certificate Transparency reveals ${r.subdomains.count} names`,
      "Audit for stale/forgotten hosts; risk of subdomain takeover.",
      "CWE-1104",
    );
  }

  return out;
}

// --- Entry point -----------------------------------------------------------

export const runPassiveIntel = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }): Promise<{ report: PassiveIntelReport; findings: VulnFinding[] }> => {
    const norm = normalizeTarget(data.target);
    if (!norm) {
      throw new Error(`Target "${data.target}" is not a scannable domain or IP.`);
    }
    const { host, isIp } = norm;
    const startedAt = new Date().toISOString();

    const [dns, whois, http, subs, shodan, vt] = await Promise.all([
      isIp ? Promise.resolve(null) : dnsLookup(host),
      isIp ? Promise.resolve(null) : rdapLookup(host),
      httpHeaders(host),
      isIp ? Promise.resolve(null) : crtShSubdomains(host),
      shodanLookup(host, isIp),
      virusTotalLookup(host, isIp),
    ]);

    const sources = {
      dns: dns ? "ok" : "skipped",
      whois: whois ? "ok" : isIp ? "skipped" : "failed",
      http: http ? "ok" : "failed",
      crtsh: subs ? "ok" : isIp ? "skipped" : "failed",
      shodan: shodan ? "ok" : process.env.SHODAN_API_KEY ? "no-data" : "no-key",
      virustotal: vt ? "ok" : process.env.VIRUSTOTAL_API_KEY ? "no-data" : "no-key",
    } as const;

    const report: PassiveIntelReport = {
      target: host,
      isIp,
      startedAt,
      finishedAt: new Date().toISOString(),
      sources,
      dns,
      whois,
      http,
      subdomains: subs,
      shodan,
      virustotal: vt,
    };

    return { report, findings: deriveFindings(report) };
  });
