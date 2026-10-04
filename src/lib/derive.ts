import type { AnomalyKind, CustodyEntry, Scan, SessionEntry, ThreatIoc, UserRole } from "./types";

/** Build IOCs from real passive-sweep results (VirusTotal verdicts + Shodan CVEs). */
export function deriveIocsFromScans(scans: Scan[]): ThreatIoc[] {
  const out: ThreatIoc[] = [];
  const seen = new Set<string>();
  const push = (ioc: ThreatIoc) => {
    if (seen.has(ioc.value + ioc.type)) {
      const existing = out.find((o) => o.value === ioc.value && o.type === ioc.type)!;
      ioc.matchedEntityIds.forEach((id) => {
        if (!existing.matchedEntityIds.includes(id)) existing.matchedEntityIds.push(id);
      });
      return;
    }
    seen.add(ioc.value + ioc.type);
    out.push(ioc);
  };

  for (const s of scans) {
    if (!s.intel || s.status !== "complete") continue;
    const at = s.finishedAt ?? s.startedAt;
    const vt = s.intel.virustotal;
    if (vt && (vt.malicious > 0 || vt.suspicious > 0)) {
      push({
        id: `TI-VT-${s.id}`,
        type: s.intel.isIp ? "ip" : "domain",
        value: s.intel.target,
        source: "VirusTotal (live sweep)",
        severity: vt.malicious >= 5 ? "critical" : vt.malicious > 0 ? "high" : "medium",
        firstSeen: at,
        description: `${vt.malicious} engine(s) flag malicious, ${vt.suspicious} suspicious. Reputation ${vt.reputation}.`,
        matchedEntityIds: [s.targetEntityId],
      });
    }
    const vulns: unknown = s.intel.shodan?.vulns;
    const cves = Array.isArray(vulns)
      ? (vulns as string[])
      : vulns && typeof vulns === "object"
        ? Object.keys(vulns as object)
        : [];
    cves.slice(0, 25).forEach((cve) => {
      push({
        id: `TI-SH-${cve}`,
        type: "cve",
        value: cve,
        source: "Shodan (live sweep)",
        severity: "high",
        firstSeen: at,
        description: `Shodan tags ${s.intel!.target} as exposed to ${cve}. Verify service version and patch.`,
        matchedEntityIds: [s.targetEntityId],
      });
    });
    const ports: unknown = s.intel.shodan?.ports;
    if (Array.isArray(ports)) {
      const risky = (ports as number[]).filter((p) =>
        [21, 23, 445, 3389, 5900, 27017, 6379, 9200].includes(p),
      );
      if (risky.length) {
        push({
          id: `TI-PORT-${s.id}`,
          type: s.intel.isIp ? "ip" : "domain",
          value: s.intel.target,
          source: "Shodan (live sweep)",
          severity: "medium",
          firstSeen: at,
          description: `Sensitive services exposed on ports ${risky.join(", ")}.`,
          matchedEntityIds: [s.targetEntityId],
        });
      }
    }
  }
  return out;
}

/** Reconstruct operator sessions from LOGIN/LOGOUT (and other) custody events. */
export function deriveSessions(custody: CustodyEntry[]): SessionEntry[] {
  const chrono = [...custody].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  const open = new Map<string, SessionEntry>();
  const sessions: SessionEntry[] = [];

  for (const c of chrono) {
    if (c.action === "LOGIN") {
      const prev = open.get(c.actor);
      if (prev) {
        prev.active = false;
      }
      const hour = new Date(c.timestamp).getHours();
      const anomalies: AnomalyKind[] = [];
      if (hour < 6 || hour >= 22) anomalies.push("off_hours");
      const s: SessionEntry = {
        id: `SES-${c.id.replace(/^CUS-/, "").toUpperCase()}`,
        user: c.actor,
        role: c.role as UserRole,
        ip: c.ip,
        country: "—",
        device: typeof navigator !== "undefined" ? summarizeUa(navigator.userAgent) : "Browser",
        startedAt: c.timestamp,
        lastActivity: c.timestamp,
        active: true,
        anomalies,
        riskScore: anomalies.length ? 35 : 8,
      };
      open.set(c.actor, s);
      sessions.push(s);
      continue;
    }
    const s = open.get(c.actor);
    if (!s) continue;
    s.lastActivity = c.timestamp;
    if (c.action === "LOGOUT") {
      s.active = false;
      open.delete(c.actor);
      continue;
    }
    if (c.action === "EXPORT") {
      const exportsInSession = chrono.filter(
        (x) =>
          x.actor === c.actor &&
          x.action === "EXPORT" &&
          x.timestamp >= s.startedAt &&
          x.timestamp <= c.timestamp,
      ).length;
      if (exportsInSession >= 3 && !s.anomalies.includes("burst_export")) {
        s.anomalies.push("burst_export");
        s.riskScore += 30;
      }
    }
    if (c.action === "LOCKDOWN" || c.action === "DELETE")
      s.riskScore = Math.min(100, s.riskScore + 5);
  }
  return sessions.reverse();
}

function summarizeUa(ua: string) {
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /Chrome\//.test(ua)
      ? "Chrome"
      : /Firefox\//.test(ua)
        ? "Firefox"
        : /Safari\//.test(ua)
          ? "Safari"
          : "Browser";
  const os = /Windows/.test(ua)
    ? "Windows"
    : /Mac OS/.test(ua)
      ? "macOS"
      : /Android/.test(ua)
        ? "Android"
        : /Linux/.test(ua)
          ? "Linux"
          : /iPhone|iPad/.test(ua)
            ? "iOS"
            : "Unknown OS";
  return `${browser} / ${os}`;
}

/** SHA-256 of a File/Blob via Web Crypto. */
export async function sha256File(file: Blob): Promise<string> {
  const buf = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
