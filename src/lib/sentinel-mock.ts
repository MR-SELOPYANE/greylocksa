const responses: Record<string, string[]> = {
  status: [
    "**System Status Report**\n\nAll core services operational. Watchlist engine processing at 2.3ms avg latency. Database cluster healthy with 3 replicas in sync. Threat intelligence feed experiencing minor delays from upstream OSINT provider.\n\n```\nServices: 7/8 OPERATIONAL\nDegraded: 1 (TI Feed)\nUptime: 99.87% (30d avg)\n```",
    "**SENTINEL Status Check**\n\nLocal AI processing unit: ACTIVE\nMemory allocation: 4.2GB / 8GB\nLast model sync: 2026-04-14T06:00:00Z\nClassification engine: ONLINE\nAll subsystems nominal.",
  ],
  greylock: [
    "**greyLock Watchlist Summary**\n\nTotal entities monitored: **32**\n- Black (confirmed threat): **10**\n- Grey (under investigation): **14**\n- White (cleared): **8**\n\nHighest risk entity: `ENT-018` (darknet-market.onion) — Risk Score: 99\n\nActive cases: **6** open/in-progress\nEscalated: **1** (CASE-007: Volkov-Petrov Network)",
    "**greyLock Intelligence Brief**\n\nRecent activity spike detected in Eastern European entity cluster. Meridian Holdings LLC (ENT-002) linked to 2 additional shell companies not yet in system. Recommend expanding entity graph analysis.\n\n```\nPriority Actions:\n1. Review ENT-019 KYC gaps\n2. Monitor ENT-029 SSH brute-force patterns\n3. Escalate ENT-027 impersonation domain\n```",
  ],
  audit: [
    "**Recent Audit Activity**\n\nLast 24h summary:\n- 6 status changes\n- 2 new entities created\n- 1 case escalation\n- 3 automated scans triggered\n\nAll actions logged to append-only store. No anomalous access patterns detected. Role-based access controls enforced across all endpoints.",
  ],
  network: [
    "**Network Intelligence Report**\n\nActive monitoring on 4 IP addresses:\n- `185.234.72.19` (DE) — VPN endpoint, grey status\n- `45.33.12.88` (US) — Confirmed C2 server\n- `103.45.67.89` (HK) — Phishing host\n- `5.188.86.12` (RU) — SSH brute-force source\n\n```\nPacket analysis: 142 suspicious flows/hr\nGeo-distribution: 47% EU, 28% APAC, 25% NA\nEncrypted traffic: 89%\n```",
  ],
  help: [
    "**SENTINEL Command Reference**\n\nAvailable queries:\n- `status` — System health overview\n- `greylock` — Watchlist intelligence summary\n- `audit` — Recent audit activity\n- `network` — Network threat intelligence\n- `entity [ID]` — Entity details lookup\n- `case [ID]` — Case status report\n- `threat` — Current threat assessment\n\nKeyboard: `Ctrl+Enter` to send, `Esc` to clear input",
  ],
  threat: [
    "**Current Threat Assessment: ELEVATED**\n\nKey indicators:\n1. **Phishing Campaign** — Active credential harvesting (trustbank-login.com)\n2. **Vulnerable Targets** — 2 critical findings open on `ENT-013` (SQLi + weak JWT)\n3. **Sanctions Evasion** — Maritime route manipulation detected\n4. **Darknet Activity** — Increased traffic to monitored marketplace\n\nRecommended posture: **Enhanced monitoring** + immediate remediation on critical findings.",
  ],
  scan: [
    "**Scan Recommendation**\n\nFor a new website target, start with `passive` to footprint without touching the origin, then escalate to `active` once written authorization is on file. Reserve `deep` for authenticated surfaces and `fuzz` for staging environments only — fuzz can trip WAFs and rate limiters.\n\n```\npassive → recon + headers\nactive  → probe known classes (XSS/SQLi/SSRF)\ndeep    → authenticated crawl + RBAC checks\nfuzz    → payload sweep, destructive\n```",
  ],
  lockdown: [
    "**Emergency Lockdown Playbook**\n\nEngage lockdown when:\n- An active intrusion is suspected against greyLock itself\n- A scan operator is compromised or coerced\n- Legal hold requires immediate cessation of mutations\n\nWhile locked: scans, edits, deletes, and bulk actions are blocked. Chain-of-custody continues recording read access. Only an admin can lift — provide a written reason; it is signed into the ledger.",
  ],
  custody: [
    "**Chain-of-Custody Notes**\n\nEvery VIEW, EDIT, SCAN, EXPORT, and DELETE is appended with actor, role, IP, ISO timestamp, reason, and a per-entry hash. The ledger is append-only at the application layer; downstream systems should mirror it to write-once storage for full tamper-evidence.\n\nUse the `/custody` route to inspect, or query Sentinel with `who touched ENT-XXX`.",
  ],
};

function getDefaultResponse(input: string): string {
  return `Acknowledged. Processing query: "${input.slice(0, 50)}${input.length > 50 ? "..." : ""}"\n\nNo specific intelligence match found for this query. Try:\n- \`status\` for system health\n- \`greylock\` for watchlist overview\n- \`help\` for available commands\n\n*All interactions are logged and subject to audit review.*`;
}

export function getMockResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const [key, vals] of Object.entries(responses)) {
    if (lower.includes(key)) {
      return vals[Math.floor(Math.random() * vals.length)];
    }
  }
  if (lower.startsWith("entity") || lower.startsWith("ent-")) {
    return `**Entity Lookup**\n\nQuerying greyLock database for matching records...\n\nUse the Entities tab in the dashboard for full detail views including metadata, evidence references, and status history.\n\n*Reminder: Entity data access is logged per security protocol GL-7.*`;
  }
  if (lower.startsWith("case") || lower.startsWith("case-")) {
    return `**Case Lookup**\n\nQuerying case management system...\n\nUse the Cases tab for full investigation details including linked entities, progress tracking, and analyst assignments.\n\n*Case access logged per protocol GL-9.*`;
  }
  return getDefaultResponse(input);
}
