export type EntityType = "person" | "org" | "ip" | "domain" | "web" | "app" | "platform";
export type EntityStatus = "grey" | "black" | "white";
export type CaseStatus = "open" | "in_progress" | "closed" | "escalated";
export type UserRole = "analyst" | "admin";
export type ClearanceLevel = "UNCLASSIFIED" | "CONFIDENTIAL" | "SECRET";

export interface Entity {
  id: string;
  type: EntityType;
  identifier: string;
  riskScore: number;
  status: EntityStatus;
  lastUpdated: string;
  metadata: Record<string, unknown>;
  evidenceRefs: string[];
  statusHistory: StatusChange[];
  quarantined?: boolean;
}

export interface StatusChange {
  from: EntityStatus;
  to: EntityStatus;
  changedBy: string;
  timestamp: string;
  reason: string;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  assignedAnalyst: string;
  linkedEntityIds: string[];
  progress: number;
  createdAt: string;
  updatedAt: string;
  priority: "low" | "medium" | "high" | "critical";
  notes?: string;
}

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  entityId: string;
  timestamp: string;
  ip: string;
  details: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  redactedTags?: string[];
  approvalStatus?: "approved" | "pending" | "denied";
}

export interface SystemStatus {
  service: string;
  status: "operational" | "degraded" | "down";
  uptime: string;
  lastCheck: string;
  details: string;
}

export type ScanSeverity = "info" | "low" | "medium" | "high" | "critical";
export type ScanStatus = "queued" | "running" | "complete" | "failed";

export interface VulnFinding {
  id: string;
  title: string;
  severity: ScanSeverity;
  cwe?: string;
  mitre?: string;
  evidence: string;
  remediation: string;
}

export interface Scan {
  id: string;
  targetEntityId: string;
  targetLabel: string;
  profile: "passive" | "active" | "deep" | "fuzz";
  status: ScanStatus;
  startedAt: string;
  finishedAt?: string;
  startedBy: string;
  findings: VulnFinding[];
  summary: { critical: number; high: number; medium: number; low: number; info: number };
  /** Populated for real passive-intel scans (WHOIS/DNS/HTTP/crt.sh/Shodan/VT). */
  intel?: PassiveIntelReport;
  /** Optional error message if the scan failed. */
  error?: string;
}

export interface PassiveIntelReport {
  target: string;
  isIp: boolean;
  startedAt: string;
  finishedAt: string;
  sources: Record<
    "dns" | "whois" | "http" | "crtsh" | "shodan" | "virustotal",
    "ok" | "failed" | "skipped" | "no-key" | "no-data"
  >;
  dns: Record<string, string[]> | null;
  whois: {
    handle?: string;
    registrar: string | null;
    status: string[];
    nameservers: string[];
    created: string | null;
    updated: string | null;
    expires: string | null;
  } | null;
  http: { scheme: "http" | "https"; status: number; headers: Record<string, string> } | null;
  subdomains: { count: number; sample: string[] } | null;
  shodan: any | null;
  virustotal: {
    reputation: number;
    malicious: number;
    suspicious: number;
    harmless: number;
    undetected: number;
    categories: Record<string, string>;
    lastAnalysisDate: string | null;
    asOwner: string | null;
    country: string | null;
  } | null;
}

export interface CustodyEntry {
  id: string;
  actor: string;
  role: UserRole;
  entityId: string;
  action:
    | "VIEW"
    | "EXPORT"
    | "EDIT"
    | "SCAN"
    | "STATUS_CHANGE"
    | "DELETE"
    | "LOCKDOWN"
    | "QUARANTINE"
    | "HONEYTOKEN"
    | "LOGIN"
    | "LOGOUT";
  reason: string;
  timestamp: string;
  ip: string;
  hash: string;
}

// ===== Threat Intelligence =====
export type IocType = "ip" | "domain" | "url" | "hash" | "cve" | "email";
export interface ThreatIoc {
  id: string;
  type: IocType;
  value: string;
  source: string;
  severity: ScanSeverity;
  firstSeen: string;
  description: string;
  mitre?: string;
  matchedEntityIds: string[];
}

// ===== Evidence Vault =====
export interface EvidenceEdit {
  by: string;
  at: string;
  field: string;
  from: string;
  to: string;
  reason: string;
}
export interface EvidenceItem {
  id: string;
  filename: string;
  sizeBytes: number;
  sha256: string;
  uploadedBy: string;
  uploadedAt: string;
  linkedEntityId?: string;
  category: "pcap" | "screenshot" | "log" | "binary" | "doc" | "memory" | "other";
  sealed: boolean;
  integrity: "verified" | "broken";
  notes?: string;
  lastEditedBy?: string;
  lastEditedAt?: string;
  editHistory: EvidenceEdit[];
}

// ===== Honeytokens =====
export interface Honeytoken {
  id: string;
  label: string;
  kind: "api_key" | "credential" | "doc" | "url";
  bait: string;
  placedAt: string;
  triggered: boolean;
  triggers: { ip: string; ua: string; timestamp: string }[];
}

// ===== Sessions / Anomaly =====
export type AnomalyKind =
  "impossible_travel" | "off_hours" | "new_device" | "tor_exit" | "burst_export";
export interface SessionEntry {
  id: string;
  user: string;
  role: UserRole;
  ip: string;
  country: string;
  device: string;
  startedAt: string;
  lastActivity: string;
  active: boolean;
  anomalies: AnomalyKind[];
  riskScore: number;
}

// ===== Notifications =====
export type NotificationKind = "info" | "success" | "warning" | "critical";
export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  description?: string;
  timestamp: string;
  read: boolean;
  /** Optional in-app link, e.g. "/scans" or "/entity/ENT-001". */
  link?: string;
}
