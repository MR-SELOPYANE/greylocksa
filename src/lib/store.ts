import { useState, useCallback, createContext, useContext, useRef, useEffect } from "react";
import { toast } from "sonner";
import type {
  UserRole,
  ClearanceLevel,
  Entity,
  EntityStatus,
  Scan,
  CustodyEntry,
  VulnFinding,
  ScanSeverity,
  EvidenceItem,
  Case,
  CaseStatus,
  Honeytoken,
  AppNotification,
  NotificationKind,
} from "./types";
import { mockEntities, mockScans, mockCustody, mockCases } from "./mock-data";
import { mockEvidence, mockHoneytokens } from "./security-mock";
import { runPassiveIntel } from "./passive-intel.functions";
import { usePersistedState, clearPersistedState } from "./persist";

interface AppState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  /** Bypasses the analyst→admin guard. Use ONLY during onboarding/signup. */
  provisionRole: (role: UserRole) => void;
  /** Establish a session: sets role/operator/clearance and writes a LOGIN custody event. */
  login: (operator: string, role: UserRole, clearance: ClearanceLevel) => void;
  logout: () => void;
  operator: string;
  setOperator: (name: string) => void;
  clearance: ClearanceLevel;
  setClearance: (level: ClearanceLevel) => void;
  /** True once persisted state has been loaded from this browser. */
  hydrated: boolean;
  /** Wipe all locally stored data and reload defaults. */
  resetAllData: () => void;

  entities: Entity[];
  addEntity: (
    e: Omit<Entity, "id" | "lastUpdated" | "metadata" | "evidenceRefs" | "statusHistory"> & {
      metadata?: Record<string, unknown>;
    },
  ) => Entity;
  updateEntity: (
    id: string,
    patch: Partial<Pick<Entity, "identifier" | "type" | "riskScore" | "status" | "metadata">>,
  ) => void;
  updateEntityStatus: (id: string, status: EntityStatus, reason?: string) => void;
  deleteEntity: (id: string) => void;

  scans: Scan[];
  startScan: (entityId: string, profile: Scan["profile"]) => Scan;
  /** Real passive OSINT sweep: WHOIS/RDAP, DNS, HTTP headers, crt.sh, Shodan, VirusTotal. */
  runPassiveScan: (
    entityId: string,
    opts?: { silent?: boolean; entity?: Entity },
  ) => Promise<Scan | null>;
  /** True when a domain/ip/web entity is auto-eligible for a passive sweep. */
  isPassiveEligible: (e: Pick<Entity, "type" | "identifier">) => boolean;

  cases: Case[];
  addCase: (input: {
    title: string;
    description: string;
    priority: Case["priority"];
    assignedAnalyst: string;
    status?: CaseStatus;
    linkedEntityIds?: string[];
  }) => Case;
  updateCase: (
    id: string,
    patch: Partial<
      Pick<
        Case,
        "title" | "description" | "assignedAnalyst" | "priority" | "notes" | "linkedEntityIds"
      >
    >,
    reason?: string,
  ) => void;
  updateCaseStatus: (id: string, status: CaseStatus, reason?: string) => void;
  updateCaseProgress: (id: string, progress: number) => void;

  custody: CustodyEntry[];
  logCustody: (
    e: Omit<CustodyEntry, "id" | "timestamp" | "ip" | "hash" | "actor" | "role">,
  ) => void;

  evidence: EvidenceItem[];
  addEvidence: (input: {
    filename: string;
    sizeBytes: number;
    category: EvidenceItem["category"];
    linkedEntityId?: string;
    notes?: string;
    sha256?: string;
  }) => EvidenceItem;
  updateEvidence: (
    id: string,
    patch: Partial<
      Pick<
        EvidenceItem,
        "filename" | "category" | "linkedEntityId" | "notes" | "sealed" | "integrity"
      >
    >,
    reason: string,
  ) => void;
  deleteEvidence: (id: string, reason: string) => void;
  canEditEvidence: (item: EvidenceItem) => boolean;

  honeytokens: Honeytoken[];
  addHoneytoken: (input: { label: string; kind: Honeytoken["kind"]; bait: string }) => Honeytoken;
  triggerHoneytoken: (id: string, hit?: { ip?: string; ua?: string }) => void;
  removeHoneytoken: (id: string) => void;

  notifications: AppNotification[];
  notify: (
    kind: NotificationKind,
    title: string,
    opts?: { description?: string; link?: string; silent?: boolean },
  ) => void;
  markNotificationsRead: () => void;
  clearNotifications: () => void;

  lockdown: boolean;
  setLockdown: (v: boolean, reason?: string) => void;

  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppProvider");
  return ctx;
}

export { AppContext };

function genHash() {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
}

function simulateFindings(profile: Scan["profile"], target: Entity): VulnFinding[] {
  const pool: VulnFinding[] = [
    {
      id: "F-XSS",
      title: "Reflected XSS in search parameter",
      severity: "high",
      cwe: "CWE-79",
      evidence: `GET /search?q=<script>alert(1)</script> reflected unescaped on ${target.identifier}`,
      remediation: "Output-encode user input; deploy CSP with strict default-src.",
    },
    {
      id: "F-SQLI",
      title: "Boolean-based SQL injection",
      severity: "critical",
      cwe: "CWE-89",
      evidence: "id=1' AND 1=1-- returned 200; id=1' AND 1=2-- returned 500",
      remediation: "Use parameterized queries / prepared statements.",
    },
    {
      id: "F-SSL",
      title: "TLS 1.0 still enabled",
      severity: "medium",
      cwe: "CWE-326",
      evidence: "Server negotiated TLS_RSA_WITH_AES_128_CBC_SHA on port 443",
      remediation: "Disable TLS < 1.2; prefer TLS 1.3.",
    },
    {
      id: "F-HDR",
      title: "Missing security headers",
      severity: "low",
      cwe: "CWE-693",
      evidence: "No HSTS, X-Content-Type-Options, or Referrer-Policy headers present",
      remediation: "Add HSTS, X-Frame-Options, CSP, X-Content-Type-Options nosniff.",
    },
    {
      id: "F-OPEN",
      title: "Open S3 bucket discovered",
      severity: "high",
      cwe: "CWE-284",
      evidence:
        "s3://assets-" + target.identifier.replace(/[^a-z0-9]/gi, "") + " ListBucket=AllowAll",
      remediation: "Apply bucket policy denying anonymous access.",
    },
    {
      id: "F-CSRF",
      title: "Missing CSRF token on state-changing endpoint",
      severity: "medium",
      cwe: "CWE-352",
      evidence: "POST /api/profile accepts cross-origin form without token",
      remediation: "Implement CSRF tokens or SameSite=strict cookies.",
    },
    {
      id: "F-AUTH",
      title: "JWT signed with HS256 + weak secret",
      severity: "critical",
      cwe: "CWE-327",
      evidence: "Secret cracked in 4s via dictionary attack",
      remediation: "Rotate secret to 256-bit random or switch to RS256.",
    },
    {
      id: "F-INFO",
      title: "Server banner discloses framework version",
      severity: "info",
      evidence: "Server: nginx/1.18.0 (Ubuntu) — X-Powered-By: Express",
      remediation: "Strip Server/X-Powered-By headers.",
    },
    {
      id: "F-RATE",
      title: "No rate limiting on login endpoint",
      severity: "high",
      cwe: "CWE-307",
      evidence: "500 password attempts/min accepted without lockout",
      remediation: "Add per-IP and per-account rate limits + exponential backoff.",
    },
  ];
  const counts: Record<Scan["profile"], number> = { passive: 3, active: 5, deep: 7, fuzz: 9 };
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(counts[profile], pool.length));
}

function tally(findings: VulnFinding[]) {
  const acc = { critical: 0, high: 0, medium: 0, low: 0, info: 0 } as Record<ScanSeverity, number>;
  findings.forEach((f) => {
    acc[f.severity] += 1;
  });
  return acc;
}

interface SessionState {
  role: UserRole;
  operator: string;
  clearance: ClearanceLevel;
}
const DEFAULT_SESSION: SessionState = {
  role: "analyst",
  operator: "analyst.you",
  clearance: "SECRET",
};

export function useAppStateProvider(): AppState {
  const [session, setSession, sessionLoaded] = usePersistedState<SessionState>(
    "session",
    DEFAULT_SESSION,
  );
  const { role, operator, clearance } = session;
  const setRoleState = useCallback(
    (v: UserRole | ((r: UserRole) => UserRole)) =>
      setSession((s) => ({ ...s, role: typeof v === "function" ? v(s.role) : v })),
    [setSession],
  );
  const setOperator = useCallback(
    (v: string) => setSession((s) => ({ ...s, operator: v })),
    [setSession],
  );
  const setClearance = useCallback(
    (v: ClearanceLevel) => setSession((s) => ({ ...s, clearance: v })),
    [setSession],
  );

  const [entities, setEntities, l1] = usePersistedState<Entity[]>("entities", () => mockEntities);
  const [scans, setScans, l2] = usePersistedState<Scan[]>("scans", () => mockScans);
  const [cases, setCases, l3] = usePersistedState<Case[]>("cases", () => mockCases);
  const [custody, setCustody, l4] = usePersistedState<CustodyEntry[]>("custody", () => mockCustody);
  const [evidence, setEvidence, l5] = usePersistedState<EvidenceItem[]>(
    "evidence",
    () => mockEvidence,
  );
  const [honeytokens, setHoneytokens, l6] = usePersistedState<Honeytoken[]>(
    "honeytokens",
    () => mockHoneytokens,
  );
  const [notifications, setNotifications, l7] = usePersistedState<AppNotification[]>(
    "notifications",
    () => [],
  );
  const [lockdown, setLockdownState] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const hydrated = sessionLoaded && l1 && l2 && l3 && l4 && l5 && l6 && l7;

  // Any scan still "running" after a reload can never complete — mark it failed.
  useEffect(() => {
    if (!l2) return;
    setScans((prev) =>
      prev.some((s) => s.status === "running" || s.status === "queued")
        ? prev.map((s) =>
            s.status === "running" || s.status === "queued"
              ? {
                  ...s,
                  status: "failed",
                  finishedAt: new Date().toISOString(),
                  error: "Interrupted by page reload",
                }
              : s,
          )
        : prev,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [l2]);

  // Keep a ref of the current actor so custody writers don't go stale.
  const actorRef = useRef({ operator, role });
  actorRef.current = { operator, role };

  const notify: AppState["notify"] = useCallback(
    (kind, title, opts) => {
      const n: AppNotification = {
        id: `NTF-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
        kind,
        title,
        description: opts?.description,
        link: opts?.link,
        timestamp: new Date().toISOString(),
        read: false,
      };
      setNotifications((prev) => [n, ...prev].slice(0, 100));
      if (!opts?.silent) {
        const fn =
          kind === "critical"
            ? toast.error
            : kind === "warning"
              ? toast.warning
              : kind === "success"
                ? toast.success
                : toast.info;
        fn(title, { description: opts?.description });
      }
    },
    [setNotifications],
  );

  const markNotificationsRead = useCallback(
    () =>
      setNotifications((p) => (p.some((n) => !n.read) ? p.map((n) => ({ ...n, read: true })) : p)),
    [setNotifications],
  );
  const clearNotifications = useCallback(() => setNotifications([]), [setNotifications]);

  // Guarded role setter: an analyst cannot self-promote to admin.
  const setRole: AppState["setRole"] = useCallback(
    (next) => {
      setRoleState((current) => {
        if (current === next) return current;
        if (current === "analyst" && next === "admin") {
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("greylock:role-denied", { detail: { from: current, to: next } }),
            );
          }
          return current;
        }
        return next;
      });
    },
    [setRoleState],
  );

  const provisionRole: AppState["provisionRole"] = useCallback(
    (next) => setRoleState(next),
    [setRoleState],
  );

  const logCustody: AppState["logCustody"] = useCallback(
    (e) => {
      setCustody((prev) => [
        {
          id: `CUS-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 4)}`,
          actor: actorRef.current.operator,
          role: actorRef.current.role,
          timestamp: new Date().toISOString(),
          ip: "10.0.1.42",
          hash: genHash(),
          ...e,
        },
        ...prev,
      ]);
    },
    [setCustody],
  );

  const login: AppState["login"] = useCallback(
    (op, r, cl) => {
      setSession({ operator: op, role: r, clearance: cl });
      setCustody((prev) => [
        {
          id: `CUS-${Date.now().toString(36)}`,
          actor: op,
          role: r,
          entityId: "SESSION",
          action: "LOGIN",
          reason: `Operator signed in as ${r.toUpperCase()} (${cl})`,
          timestamp: new Date().toISOString(),
          ip: "10.0.1.42",
          hash: genHash(),
        },
        ...prev,
      ]);
    },
    [setSession, setCustody],
  );

  const logout: AppState["logout"] = useCallback(() => {
    const { operator: op, role: r } = actorRef.current;
    setCustody((prev) => [
      {
        id: `CUS-${Date.now().toString(36)}`,
        actor: op,
        role: r,
        entityId: "SESSION",
        action: "LOGOUT",
        reason: "Operator signed out",
        timestamp: new Date().toISOString(),
        ip: "10.0.1.42",
        hash: genHash(),
      },
      ...prev,
    ]);
    setSession(DEFAULT_SESSION);
    setLockdownState(false);
    setCommandOpen(false);
  }, [setSession, setCustody]);

  const resetAllData = useCallback(() => {
    clearPersistedState();
    window.location.reload();
  }, []);

  const addEntity: AppState["addEntity"] = useCallback((input) => {
    const id = `ENT-${String(Date.now()).slice(-6)}`;
    const newEntity: Entity = {
      id,
      type: input.type,
      identifier: input.identifier,
      riskScore: input.riskScore,
      status: input.status,
      lastUpdated: new Date().toISOString(),
      metadata: input.metadata ?? {},
      evidenceRefs: [],
      statusHistory: [],
    };
    setEntities((prev) => [newEntity, ...prev]);
    return newEntity;
  }, []);

  const updateEntity: AppState["updateEntity"] = useCallback((id, patch) => {
    setEntities((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, ...patch, lastUpdated: new Date().toISOString() } : e,
      ),
    );
  }, []);

  const updateEntityStatus: AppState["updateEntityStatus"] = useCallback(
    (id, status, reason = "Manual update") => {
      setEntities((prev) =>
        prev.map((e) =>
          e.id === id
            ? {
                ...e,
                status,
                lastUpdated: new Date().toISOString(),
                statusHistory: [
                  ...e.statusHistory,
                  {
                    from: e.status,
                    to: status,
                    changedBy: actorRef.current.operator,
                    timestamp: new Date().toISOString(),
                    reason,
                  },
                ],
              }
            : e,
        ),
      );
    },
    [],
  );

  const deleteEntity: AppState["deleteEntity"] = useCallback((id) => {
    setEntities((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const startScan: AppState["startScan"] = useCallback(
    (entityId, profile) => {
      const target =
        mockEntities.find((e) => e.id === entityId) ?? entities.find((e) => e.id === entityId);
      const label = target?.identifier ?? entityId;
      const id = `SCN-${Date.now().toString(36).toUpperCase()}`;
      const queued: Scan = {
        id,
        targetEntityId: entityId,
        targetLabel: label,
        profile,
        status: "running",
        startedAt: new Date().toISOString(),
        startedBy: actorRef.current.operator,
        findings: [],
        summary: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
      };
      setScans((prev) => [queued, ...prev]);
      // Simulate completion
      setTimeout(
        () => {
          const findings = target ? simulateFindings(profile, target) : [];
          setScans((prev) =>
            prev.map((s) =>
              s.id === id
                ? {
                    ...s,
                    status: "complete",
                    finishedAt: new Date().toISOString(),
                    findings,
                    summary: tally(findings),
                  }
                : s,
            ),
          );
        },
        1800 + Math.random() * 1200,
      );
      return queued;
    },
    [entities],
  );

  const isPassiveEligible: AppState["isPassiveEligible"] = useCallback((e) => {
    if (!["domain", "ip", "web", "platform"].includes(e.type)) return false;
    const host = e.identifier
      .replace(/^[a-z]+:\/\//i, "")
      .split("/")[0]
      .split(":")[0];
    if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(host)) return true;
    if (/\.onion$/i.test(host)) return false;
    return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(host);
  }, []);

  const runPassiveScan: AppState["runPassiveScan"] = useCallback(
    async (entityId, opts) => {
      // Callers that just created/edited an entity pass it directly, since the
      // `entities` closure here is one render behind.
      const target = opts?.entity ?? entities.find((e) => e.id === entityId);
      if (!target) return null;
      if (!isPassiveEligible(target)) return null;

      const id = `SCN-${Date.now().toString(36).toUpperCase()}`;
      const queued: Scan = {
        id,
        targetEntityId: entityId,
        targetLabel: target.identifier,
        profile: "passive",
        status: "running",
        startedAt: new Date().toISOString(),
        startedBy: operator,
        findings: [],
        summary: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
      };
      setScans((prev) => [queued, ...prev]);

      setCustody((prev) => [
        {
          id: `CUS-${Date.now().toString(36)}`,
          actor: operator,
          role,
          entityId,
          action: "SCAN",
          reason: `${opts?.silent ? "Auto" : "Manual"} passive intel sweep against ${target.identifier}`,
          timestamp: new Date().toISOString(),
          ip: "10.0.1.42",
          hash: genHash(),
        },
        ...prev,
      ]);

      try {
        const { report, findings } = await runPassiveIntel({ data: { target: target.identifier } });
        const done: Scan = {
          ...queued,
          status: "complete",
          finishedAt: new Date().toISOString(),
          findings,
          summary: tally(findings),
          intel: report,
        };
        setScans((prev) => prev.map((s) => (s.id === id ? done : s)));
        const sev = done.summary;
        const vt = report.virustotal;
        if (vt && vt.malicious > 0) {
          notify("critical", `${target.identifier} flagged malicious`, {
            description: `${vt.malicious} VirusTotal engine(s) report this target as malicious.`,
            link: "/threats",
          });
        } else if (sev.critical > 0 || sev.high > 0) {
          notify("warning", `Sweep complete — ${target.identifier}`, {
            description: `${sev.critical} critical, ${sev.high} high severity findings.`,
            link: "/scans",
          });
        } else {
          notify("success", `Sweep complete — ${target.identifier}`, {
            description: `${done.findings.length} finding(s) recorded.`,
            link: "/scans",
            silent: opts?.silent,
          });
        }
        return done;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Passive intel sweep failed";
        const failed: Scan = {
          ...queued,
          status: "failed",
          finishedAt: new Date().toISOString(),
          error: message,
        };
        setScans((prev) => prev.map((s) => (s.id === id ? failed : s)));
        notify("warning", `Sweep failed — ${target.identifier}`, {
          description: message,
          link: "/scans",
          silent: opts?.silent,
        });
        return failed;
      }
    },
    [entities, operator, role, isPassiveEligible, setScans, setCustody, notify],
  );

  const addCase: AppState["addCase"] = useCallback(
    (input) => {
      const now = new Date().toISOString();
      const newCase: Case = {
        id: `CASE-${String(Date.now()).slice(-3)}`,
        title: input.title,
        description: input.description,
        status: input.status ?? "open",
        assignedAnalyst: input.assignedAnalyst,
        linkedEntityIds: input.linkedEntityIds ?? [],
        progress: input.status === "closed" ? 100 : 0,
        createdAt: now,
        updatedAt: now,
        priority: input.priority,
      };
      setCases((prev) => [newCase, ...prev]);
      setCustody((prev) => [
        {
          id: `CUS-${Date.now().toString(36)}`,
          actor: operator,
          role,
          entityId: newCase.id,
          action: "EDIT",
          reason: `Case opened: ${newCase.title}`,
          timestamp: now,
          ip: "10.0.1.42",
          hash: genHash(),
        },
        ...prev,
      ]);
      return newCase;
    },
    [operator, role],
  );

  const updateCase: AppState["updateCase"] = useCallback(
    (id, patch, reason = "Case details updated") => {
      setCases((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c,
        ),
      );
      setCustody((prev) => [
        {
          id: `CUS-${Date.now().toString(36)}`,
          actor: operator,
          role,
          entityId: id,
          action: "EDIT",
          reason: `Case updated: ${reason}`,
          timestamp: new Date().toISOString(),
          ip: "10.0.1.42",
          hash: genHash(),
        },
        ...prev,
      ]);
    },
    [operator, role],
  );

  const updateCaseStatus: AppState["updateCaseStatus"] = useCallback(
    (id, status, reason = "Manual status update") => {
      setCases((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                status,
                progress: status === "closed" ? 100 : c.progress,
                updatedAt: new Date().toISOString(),
              }
            : c,
        ),
      );
      setCustody((prev) => [
        {
          id: `CUS-${Date.now().toString(36)}`,
          actor: operator,
          role,
          entityId: id,
          action: "STATUS_CHANGE",
          reason: `Case → ${status.replace("_", " ").toUpperCase()}: ${reason}`,
          timestamp: new Date().toISOString(),
          ip: "10.0.1.42",
          hash: genHash(),
        },
        ...prev,
      ]);
      if (status === "escalated") {
        notify("critical", `Case ${id} escalated`, { description: reason, link: "/cases" });
      }
    },
    [operator, role, setCases, setCustody, notify],
  );

  const updateCaseProgress: AppState["updateCaseProgress"] = useCallback((id, progress) => {
    const clamped = Math.max(0, Math.min(100, Math.round(progress)));
    setCases((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              progress: clamped,
              status: clamped === 100 ? "closed" : c.status,
              updatedAt: new Date().toISOString(),
            }
          : c,
      ),
    );
  }, []);

  const setLockdown: AppState["setLockdown"] = useCallback((v, reason) => {
    setLockdownState(v);
    setCustody((prev) => [
      {
        id: `CUS-${Date.now().toString(36)}`,
        actor: actorRef.current.operator,
        role: actorRef.current.role,
        entityId: "SYSTEM",
        action: "LOCKDOWN",
        reason: reason ?? (v ? "Emergency lockdown engaged" : "Lockdown lifted"),
        timestamp: new Date().toISOString(),
        ip: "10.0.1.10",
        hash: genHash(),
      },
      ...prev,
    ]);
  }, []);

  const addEvidence: AppState["addEvidence"] = useCallback(
    (input) => {
      const id = `EVD-${Date.now().toString(36).toUpperCase()}`;
      const fallback = Array.from({ length: 8 }, () => Math.random().toString(16).slice(2, 10))
        .join("")
        .slice(0, 64);
      const item: EvidenceItem = {
        id,
        filename: input.filename,
        sizeBytes: input.sizeBytes,
        sha256: input.sha256 ?? fallback,
        uploadedBy: operator,
        uploadedAt: new Date().toISOString(),
        linkedEntityId: input.linkedEntityId,
        category: input.category,
        sealed: true,
        integrity: "verified",
        notes: input.notes,
        editHistory: [],
      };
      setEvidence((prev) => [item, ...prev]);
      return item;
    },
    [operator, setEvidence],
  );

  const updateEvidence: AppState["updateEvidence"] = useCallback(
    (id, patch, reason) => {
      setEvidence((prev) =>
        prev.map((e) => {
          if (e.id !== id) return e;
          const edits = (Object.keys(patch) as (keyof typeof patch)[]).map((k) => ({
            by: operator,
            at: new Date().toISOString(),
            field: String(k),
            from: String(e[k] ?? ""),
            to: String(patch[k] ?? ""),
            reason,
          }));
          return {
            ...e,
            ...patch,
            lastEditedBy: operator,
            lastEditedAt: new Date().toISOString(),
            editHistory: [...e.editHistory, ...edits],
          };
        }),
      );
    },
    [operator],
  );

  const deleteEvidence: AppState["deleteEvidence"] = useCallback((id, _reason) => {
    setEvidence((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const canEditEvidence: AppState["canEditEvidence"] = useCallback(
    (item) => {
      return role === "admin" || item.uploadedBy === operator;
    },
    [role, operator],
  );

  const addHoneytoken: AppState["addHoneytoken"] = useCallback(
    (input) => {
      const token: Honeytoken = {
        id: `HT-${Date.now().toString(36).toUpperCase()}`,
        label: input.label,
        kind: input.kind,
        bait: input.bait,
        placedAt: new Date().toISOString(),
        triggered: false,
        triggers: [],
      };
      setHoneytokens((prev) => [token, ...prev]);
      return token;
    },
    [setHoneytokens],
  );

  const triggerHoneytoken: AppState["triggerHoneytoken"] = useCallback(
    (id, hit) => {
      setHoneytokens((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                triggered: true,
                triggers: [
                  ...t.triggers,
                  {
                    ip: hit?.ip ?? `203.0.113.${Math.floor(Math.random() * 254)}`,
                    ua: hit?.ua ?? "curl/8.4",
                    timestamp: new Date().toISOString(),
                  },
                ],
              }
            : t,
        ),
      );
    },
    [setHoneytokens],
  );

  const removeHoneytoken: AppState["removeHoneytoken"] = useCallback(
    (id) => {
      setHoneytokens((prev) => prev.filter((t) => t.id !== id));
    },
    [setHoneytokens],
  );

  return {
    login,
    hydrated,
    resetAllData,
    honeytokens,
    addHoneytoken,
    triggerHoneytoken,
    removeHoneytoken,
    notifications,
    notify,
    markNotificationsRead,
    clearNotifications,
    role,
    setRole,
    provisionRole,
    logout,
    operator,
    setOperator,
    clearance,
    setClearance,
    entities,
    addEntity,
    updateEntity,
    updateEntityStatus,
    deleteEntity,
    scans,
    runPassiveScan,
    isPassiveEligible,
    startScan,
    cases,
    addCase,
    updateCase,
    updateCaseStatus,
    updateCaseProgress,
    custody,
    logCustody,
    evidence,
    addEvidence,
    updateEvidence,
    deleteEvidence,
    canEditEvidence,
    lockdown,
    setLockdown,
    commandOpen,
    setCommandOpen,
  };
}
