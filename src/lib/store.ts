import { useState, useCallback, createContext, useContext } from "react";
import type { UserRole, ClearanceLevel, Entity, EntityStatus, Scan, CustodyEntry, VulnFinding, ScanSeverity, EvidenceItem, Case, CaseStatus } from "./types";
import { mockEntities, mockScans, mockCustody, mockCases } from "./mock-data";
import { mockEvidence } from "./security-mock";

interface AppState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  /** Bypasses the analyst→admin guard. Use ONLY during onboarding/signup. */
  provisionRole: (role: UserRole) => void;
  logout: () => void;
  operator: string;
  setOperator: (name: string) => void;
  clearance: ClearanceLevel;
  setClearance: (level: ClearanceLevel) => void;

  entities: Entity[];
  addEntity: (e: Omit<Entity, "id" | "lastUpdated" | "metadata" | "evidenceRefs" | "statusHistory"> & { metadata?: Record<string, unknown> }) => Entity;
  updateEntity: (id: string, patch: Partial<Pick<Entity, "identifier" | "type" | "riskScore" | "status" | "metadata">>) => void;
  updateEntityStatus: (id: string, status: EntityStatus, reason?: string) => void;
  deleteEntity: (id: string) => void;

  scans: Scan[];
  startScan: (entityId: string, profile: Scan["profile"]) => Scan;

  cases: Case[];
  addCase: (input: { title: string; description: string; priority: Case["priority"]; assignedAnalyst: string; status?: CaseStatus; linkedEntityIds?: string[] }) => Case;
  updateCase: (id: string, patch: Partial<Pick<Case, "title" | "description" | "assignedAnalyst" | "priority" | "notes" | "linkedEntityIds">>, reason?: string) => void;
  updateCaseStatus: (id: string, status: CaseStatus, reason?: string) => void;
  updateCaseProgress: (id: string, progress: number) => void;


  custody: CustodyEntry[];
  logCustody: (e: Omit<CustodyEntry, "id" | "timestamp" | "ip" | "hash" | "actor" | "role">) => void;

  evidence: EvidenceItem[];
  addEvidence: (input: { filename: string; sizeBytes: number; category: EvidenceItem["category"]; linkedEntityId?: string; notes?: string }) => EvidenceItem;
  updateEvidence: (id: string, patch: Partial<Pick<EvidenceItem, "filename" | "category" | "linkedEntityId" | "notes" | "sealed">>, reason: string) => void;
  deleteEvidence: (id: string, reason: string) => void;
  canEditEvidence: (item: EvidenceItem) => boolean;

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
    { id: "F-XSS", title: "Reflected XSS in search parameter", severity: "high", cwe: "CWE-79", evidence: `GET /search?q=<script>alert(1)</script> reflected unescaped on ${target.identifier}`, remediation: "Output-encode user input; deploy CSP with strict default-src." },
    { id: "F-SQLI", title: "Boolean-based SQL injection", severity: "critical", cwe: "CWE-89", evidence: "id=1' AND 1=1-- returned 200; id=1' AND 1=2-- returned 500", remediation: "Use parameterized queries / prepared statements." },
    { id: "F-SSL", title: "TLS 1.0 still enabled", severity: "medium", cwe: "CWE-326", evidence: "Server negotiated TLS_RSA_WITH_AES_128_CBC_SHA on port 443", remediation: "Disable TLS < 1.2; prefer TLS 1.3." },
    { id: "F-HDR", title: "Missing security headers", severity: "low", cwe: "CWE-693", evidence: "No HSTS, X-Content-Type-Options, or Referrer-Policy headers present", remediation: "Add HSTS, X-Frame-Options, CSP, X-Content-Type-Options nosniff." },
    { id: "F-OPEN", title: "Open S3 bucket discovered", severity: "high", cwe: "CWE-284", evidence: "s3://assets-" + target.identifier.replace(/[^a-z0-9]/gi, "") + " ListBucket=AllowAll", remediation: "Apply bucket policy denying anonymous access." },
    { id: "F-CSRF", title: "Missing CSRF token on state-changing endpoint", severity: "medium", cwe: "CWE-352", evidence: "POST /api/profile accepts cross-origin form without token", remediation: "Implement CSRF tokens or SameSite=strict cookies." },
    { id: "F-AUTH", title: "JWT signed with HS256 + weak secret", severity: "critical", cwe: "CWE-327", evidence: "Secret cracked in 4s via dictionary attack", remediation: "Rotate secret to 256-bit random or switch to RS256." },
    { id: "F-INFO", title: "Server banner discloses framework version", severity: "info", evidence: "Server: nginx/1.18.0 (Ubuntu) — X-Powered-By: Express", remediation: "Strip Server/X-Powered-By headers." },
    { id: "F-RATE", title: "No rate limiting on login endpoint", severity: "high", cwe: "CWE-307", evidence: "500 password attempts/min accepted without lockout", remediation: "Add per-IP and per-account rate limits + exponential backoff." },
  ];
  const counts: Record<Scan["profile"], number> = { passive: 3, active: 5, deep: 7, fuzz: 9 };
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(counts[profile], pool.length));
}

function tally(findings: VulnFinding[]) {
  const acc = { critical: 0, high: 0, medium: 0, low: 0, info: 0 } as Record<ScanSeverity, number>;
  findings.forEach((f) => { acc[f.severity] += 1; });
  return acc;
}

export function useAppStateProvider(): AppState {
  const [role, setRoleState] = useState<UserRole>("analyst");
  const [operator, setOperator] = useState<string>("analyst.you");
  const [clearance, setClearance] = useState<ClearanceLevel>("SECRET");
  const [entities, setEntities] = useState<Entity[]>(() => mockEntities);
  const [scans, setScans] = useState<Scan[]>(() => mockScans);
  const [cases, setCases] = useState<Case[]>(() => mockCases);
  const [custody, setCustody] = useState<CustodyEntry[]>(() => mockCustody);
  const [evidence, setEvidence] = useState<EvidenceItem[]>(() => mockEvidence);
  const [lockdown, setLockdownState] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  // Guarded role setter: an analyst cannot self-promote to admin.
  // Only an existing admin can change roles (e.g. demote themselves to analyst
  // or grant admin via the proper admin flow). Silent fail for invalid attempts.
  const setRole: AppState["setRole"] = useCallback((next) => {
    setRoleState((current) => {
      if (current === next) return current;
      if (current === "analyst" && next === "admin") {
        // Privilege escalation blocked — surface via toast in caller.
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("greylock:role-denied", { detail: { from: current, to: next } }));
        }
        return current;
      }
      return next;
    });
  }, []);

  const provisionRole: AppState["provisionRole"] = useCallback((next) => setRoleState(next), []);

  const logout: AppState["logout"] = useCallback(() => {
    setRoleState("analyst");
    setOperator("analyst.you");
    setClearance("SECRET");
    setLockdownState(false);
    setCommandOpen(false);
  }, []);

  const logCustody: AppState["logCustody"] = useCallback((e) => {
    setCustody((prev) => [
      {
        id: `CUS-${Date.now().toString(36)}`,
        actor: "analyst.you",
        role: "analyst",
        timestamp: new Date().toISOString(),
        ip: "10.0.1.42",
        hash: genHash(),
        ...e,
      },
      ...prev,
    ]);
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
        e.id === id ? { ...e, ...patch, lastUpdated: new Date().toISOString() } : e
      )
    );
  }, []);

  const updateEntityStatus: AppState["updateEntityStatus"] = useCallback((id, status, reason = "Manual update") => {
    setEntities((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              status,
              lastUpdated: new Date().toISOString(),
              statusHistory: [
                ...e.statusHistory,
                { from: e.status, to: status, changedBy: "operator", timestamp: new Date().toISOString(), reason },
              ],
            }
          : e
      )
    );
  }, []);

  const deleteEntity: AppState["deleteEntity"] = useCallback((id) => {
    setEntities((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const startScan: AppState["startScan"] = useCallback((entityId, profile) => {
    const target = mockEntities.find((e) => e.id === entityId) ?? entities.find((e) => e.id === entityId);
    const label = target?.identifier ?? entityId;
    const id = `SCN-${Date.now().toString(36).toUpperCase()}`;
    const queued: Scan = {
      id,
      targetEntityId: entityId,
      targetLabel: label,
      profile,
      status: "running",
      startedAt: new Date().toISOString(),
      startedBy: "analyst.you",
      findings: [],
      summary: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
    };
    setScans((prev) => [queued, ...prev]);
    // Simulate completion
    setTimeout(() => {
      const findings = target ? simulateFindings(profile, target) : [];
      setScans((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: "complete", finishedAt: new Date().toISOString(), findings, summary: tally(findings) }
            : s
        )
      );
    }, 1800 + Math.random() * 1200);
    return queued;
  }, [entities]);

  const addCase: AppState["addCase"] = useCallback((input) => {
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
  }, [operator, role]);

  const updateCase: AppState["updateCase"] = useCallback((id, patch, reason = "Case details updated") => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c))
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
  }, [operator, role]);



  const updateCaseStatus: AppState["updateCaseStatus"] = useCallback((id, status, reason = "Manual status update") => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              progress: status === "closed" ? 100 : c.progress,
              updatedAt: new Date().toISOString(),
            }
          : c
      )
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
  }, [operator, role]);

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
          : c
      )
    );
  }, []);



  const setLockdown: AppState["setLockdown"] = useCallback((v, reason) => {
    setLockdownState(v);
    setCustody((prev) => [
      {
        id: `CUS-${Date.now().toString(36)}`,
        actor: "admin.you",
        role: "admin",
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

  const addEvidence: AppState["addEvidence"] = useCallback((input) => {
    const id = `EVD-${Date.now().toString(36).toUpperCase()}`;
    const sha = Array.from({ length: 8 }, () => Math.random().toString(16).slice(2, 10)).join("");
    const item: EvidenceItem = {
      id,
      filename: input.filename,
      sizeBytes: input.sizeBytes,
      sha256: sha.slice(0, 64),
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
  }, [operator]);

  const updateEvidence: AppState["updateEvidence"] = useCallback((id, patch, reason) => {
    setEvidence((prev) => prev.map((e) => {
      if (e.id !== id) return e;
      const edits = (Object.keys(patch) as (keyof typeof patch)[]).map((k) => ({
        by: operator,
        at: new Date().toISOString(),
        field: String(k),
        from: String(e[k] ?? ""),
        to: String(patch[k] ?? ""),
        reason,
      }));
      return { ...e, ...patch, lastEditedBy: operator, lastEditedAt: new Date().toISOString(), editHistory: [...e.editHistory, ...edits] };
    }));
  }, [operator]);

  const deleteEvidence: AppState["deleteEvidence"] = useCallback((id, _reason) => {
    setEvidence((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const canEditEvidence: AppState["canEditEvidence"] = useCallback((item) => {
    return role === "admin" || item.uploadedBy === operator;
  }, [role, operator]);

  return {
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
    startScan,
    cases,
    addCase,
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
