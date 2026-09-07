import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { PassiveIntelReport, VulnFinding, ScanSeverity } from "./types";

const inputSchema = z.object({
  target: z.string().trim().min(1).max(500),
});

/** Extract a bare hostname or IP from an entity identifier (URL, "IP: 1.2.3.4", etc.) */
function normalizeTarget(raw: string): { host: string; isIp: boolean } | null {
  const t = raw.trim();
  // strip protocol / path
  let host = t.replace(/^[a-z]+:\/\//i, "").split("/")[0].split(":")[0].trim();
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

async function safeFetchJson(url: string, init?: RequestInit, timeoutMs = 8000): Promise<any | null> {
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
      const j = await safeFetchJson(
        `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(host)}&type=${t}`,
        { headers: { Accept: "application/dns-json" } },
        5000,
      );
      const answers = (j?.Answer as Array<{ data: string; type: number }> | undefined) ?? [];
      if (answers.length) results[t] = answers.map((a) => a.data);
    }),
  );
  return results;
}

async function rdapLookup(host: string) {
  // rdap.org redirects to authoritative RDAP endpoint
  const j = await safeFetchJson(`https://rdap.org/domain/${encodeURIComponent(host)}`, undefined, 8000);
  if (!j) return null;
  const events = (j.events ?? []) as Array<{ eventAction: string; eventDate: string }>;
  const created = events.find((e) => e.eventAction === "registration")?.eventDate;
  const expires = events.find((e) => e.eventAction === "expiration")?.eventDate;
  const updated = events.find((e) => e.eventAction === "last changed")?.eventDate;
  const registrar = (j.entities ?? [])
    .find((e: any) => (e.roles ?? []).includes("registrar"))
    ?.vcardArray?.[1]?.find((f: any[]) => f[0] === "fn")?.[3];
  return {
    handle: j.handle,
    registrar: registrar ?? null,
    status: j.status ?? [],
    nameservers: (j.nameservers ?? []).map((n: any) => n.ldhName).filter(Boolean),
    created: created ?? null,
    updated: updated ?? null,
    expires: expires ?? null,
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
      res.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });
      return { scheme, status: res.status, headers };
    } catch { /* try next scheme */ }
  }
  return null;
}

async function crtShSubdomains(host: string) {
  const j = await safeFetchJson(`https://crt.sh/?q=%25.${encodeURIComponent(host)}&output=json`, undefined, 10000);
  if (!Array.isArray(j)) return null;
  const set = new Set<string>();
  for (const row of j as Array<{ name_value?: string }>) {
    (row.name_value ?? "").split(/\n/).forEach((s) => {
      const n = s.trim().toLowerCase();
      if (n && !n.startsWith("*") && n.endsWith(host)) set.add(n);
    });
  }
  return { count: set.size, sample: Array.from(set).slice(0, 25).sort() };
}

async function shodanLookup(host: string, isIp: boolean) {
  const key = process.env.SHODAN_API_KEY;
  if (!key) return null;
  if (isIp) {
    const j = await safeFetchJson(`https://api.shodan.io/shodan/host/${encodeURIComponent(host)}?key=${key}&minify=true`, undefined, 8000);
    if (!j || j.error) return null;
    return {
      ip: j.ip_str,
      org: j.org,
      isp: j.isp,
      country: j.country_name,
      os: j.os,
      ports: j.ports ?? [],
      hostnames: j.hostnames ?? [],
      vulns: j.vulns ?? [],
      tags: j.tags ?? [],
      last_update: j.last_update,
    };
  }
  const j = await safeFetchJson(`https://api.shodan.io/dns/domain/${encodeURIComponent(host)}?key=${key}`, undefined, 8000);
  if (!j || j.error) return null;
  return {
    domain: j.domain,
    subdomainCount: (j.subdomains ?? []).length,
    subdomains: (j.subdomains ?? []).slice(0, 20),
    tags: j.tags ?? [],
  };
}

async function virusTotalLookup(host: string, isIp: boolean) {
  const key = process.env.VIRUSTOTAL_API_KEY;
  if (!key) return null;
  const path = isIp ? `ip_addresses/${encodeURIComponent(host)}` : `domains/${encodeURIComponent(host)}`;
  const j = await safeFetchJson(`https://www.virustotal.com/api/v3/${path}`, { headers: { "x-apikey": key } }, 8000);
  const attrs = j?.data?.attributes;
  if (!attrs) return null;
  const stats = attrs.last_analysis_stats ?? {};
  return {
    reputation: attrs.reputation ?? 0,
    malicious: stats.malicious ?? 0,
    suspicious: stats.suspicious ?? 0,
    harmless: stats.harmless ?? 0,
    undetected: stats.undetected ?? 0,
    categories: attrs.categories ?? {},
    lastAnalysisDate: attrs.last_analysis_date
      ? new Date(attrs.last_analysis_date * 1000).toISOString()
      : null,
    asOwner: attrs.as_owner ?? null,
    country: attrs.country ?? null,
  };
}

// --- Finding derivation ----------------------------------------------------

function deriveFindings(r: PassiveIntelReport): VulnFinding[] {
  const out: VulnFinding[] = [];
  const push = (id: string, title: string, severity: ScanSeverity, evidence: string, remediation: string, cwe?: string) =>
    out.push({ id, title, severity, evidence, remediation, cwe });

  // HTTP header hygiene
  if (r.http) {
    const h = r.http.headers;
    const missing: string[] = [];
    if (!h["strict-transport-security"]) missing.push("Strict-Transport-Security");
    if (!h["content-security-policy"]) missing.push("Content-Security-Policy");
    if (!h["x-content-type-options"]) missing.push("X-Content-Type-Options");
    if (!h["referrer-policy"]) missing.push("Referrer-Policy");
    if (!h["x-frame-options"] && !h["content-security-policy"]?.includes("frame-ancestors")) missing.push("X-Frame-Options");
    if (missing.length) {
      push("PI-HDR", `Missing security headers (${missing.length})`, missing.length >= 3 ? "medium" : "low",
        `Absent: ${missing.join(", ")} on ${r.http.scheme}://${r.target}`,
        "Add missing headers via reverse proxy or app middleware.", "CWE-693");
    }
    const banner = h["server"] || h["x-powered-by"];
    if (banner) {
      push("PI-BANNER", "Server banner discloses framework/version", "info",
        `Server=${h["server"] ?? "—"}; X-Powered-By=${h["x-powered-by"] ?? "—"}`,
        "Strip Server / X-Powered-By headers to reduce fingerprinting.", "CWE-200");
    }
    if (r.http.scheme === "http") {
      push("PI-NOHTTPS", "Site serves plaintext HTTP", "high",
        `http://${r.target}/ returned ${r.http.status} without upgrading to TLS`,
        "Redirect HTTP → HTTPS and enforce HSTS.", "CWE-319");
    }
  }

  // WHOIS age
  if (r.whois?.created) {
    const ageDays = (Date.now() - new Date(r.whois.created).getTime()) / 86_400_000;
    if (ageDays < 90 && ageDays >= 0) {
      push("PI-YOUNG", `Domain registered ${Math.round(ageDays)} days ago`, "medium",
        `Created ${r.whois.created} via ${r.whois.registrar ?? "unknown registrar"}`,
        "Newly registered domains correlate with phishing/C2. Manually verify legitimacy.", "CWE-1188");
    }
    if (r.whois.expires) {
      const daysToExpiry = (new Date(r.whois.expires).getTime() - Date.now()) / 86_400_000;
      if (daysToExpiry > 0 && daysToExpiry < 30) {
        push("PI-EXPIRE", `Domain expires in ${Math.round(daysToExpiry)} days`, "low",
          `Expiration ${r.whois.expires}`, "Renew registration to avoid loss / hostile pickup.");
      }
    }
  }

  // DNS: SPF/DMARC on TXT
  if (r.dns?.TXT) {
    const txt = r.dns.TXT.join(" ");
    if (!/v=spf1/i.test(txt)) {
      push("PI-SPF", "No SPF record found", "low",
        `TXT records for ${r.target} contain no v=spf1`, "Publish an SPF record to prevent spoofing.", "CWE-290");
    }
  }
  if (r.dns && !r.dns.MX && !r.dns.CNAME) {
    // silent — no mail
  }

  // Shodan
  if (r.shodan) {
    if ("ports" in r.shodan && Array.isArray(r.shodan.ports)) {
      const risky = r.shodan.ports.filter((p: number) => [21, 23, 3389, 445, 139, 3306, 5432, 6379, 27017, 9200, 11211].includes(p));
      if (risky.length) {
        push("PI-EXPOSED", `Sensitive services exposed on ${risky.length} port(s)`, "high",
          `Ports open per Shodan: ${risky.join(", ")}`,
          "Firewall these services or place behind VPN / bastion.", "CWE-284");
      }
      if (r.shodan.ports.length > 10) {
        push("PI-SURFACE", `Broad attack surface: ${r.shodan.ports.length} open ports`, "medium",
          `Open: ${r.shodan.ports.slice(0, 20).join(", ")}${r.shodan.ports.length > 20 ? "…" : ""}`,
          "Audit exposed services; close what isn't required.");
      }
    }
    if (Array.isArray(r.shodan.vulns) && r.shodan.vulns.length) {
      push("PI-CVE", `Shodan-tagged CVEs: ${r.shodan.vulns.length}`, "critical",
        `CVEs: ${r.shodan.vulns.slice(0, 10).join(", ")}${r.shodan.vulns.length > 10 ? "…" : ""}`,
        "Patch affected services immediately.", "CWE-1035");
    }
  }

  // VirusTotal
  if (r.virustotal) {
    const vt = r.virustotal;
    if (vt.malicious >= 5) {
      push("PI-VT-MAL", `${vt.malicious} vendors flag target as malicious`, "critical",
        `VT stats: malicious=${vt.malicious} suspicious=${vt.suspicious} harmless=${vt.harmless}`,
        "Consider blacklisting; escalate to threat intel.");
    } else if (vt.malicious >= 1 || vt.suspicious >= 3) {
      push("PI-VT-SUS", `Reputation flags on VirusTotal`, "high",
        `malicious=${vt.malicious} suspicious=${vt.suspicious}`,
        "Investigate flags; correlate with other IOC sources.");
    }
    if (typeof vt.reputation === "number" && vt.reputation < -20) {
      push("PI-VT-REP", `Negative community reputation (${vt.reputation})`, "medium",
        `VirusTotal community reputation score`, "Manual review recommended.");
    }
  }

  // Subdomain sprawl
  if (r.subdomains && r.subdomains.count > 200) {
    push("PI-SPRAWL", `Large subdomain footprint (${r.subdomains.count})`, "low",
      `Certificate Transparency reveals ${r.subdomains.count} names`,
      "Audit for stale/forgotten hosts; risk of subdomain takeover.", "CWE-1104");
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
      whois: whois ? "ok" : (isIp ? "skipped" : "failed"),
      http: http ? "ok" : "failed",
      crtsh: subs ? "ok" : (isIp ? "skipped" : "failed"),
      shodan: shodan ? "ok" : (process.env.SHODAN_API_KEY ? "no-data" : "no-key"),
      virustotal: vt ? "ok" : (process.env.VIRUSTOTAL_API_KEY ? "no-data" : "no-key"),
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
