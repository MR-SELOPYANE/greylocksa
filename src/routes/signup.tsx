import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Wrench } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { AuthShell } from "./login";
import { useAppState } from "@/lib/store";
import type { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [
      { title: "Onboarding — greyLock" },
      { name: "description", content: "Provision an operator account on the greyLock vulnerability testing platform." },
    ],
  }),
});

function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAppState();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [role, setRoleLocal] = useState<UserRole>("analyst");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    login(
      name.trim() || (role === "admin" ? "admin.you" : "analyst.you"),
      role,
      role === "admin" ? "SECRET" : "CONFIDENTIAL"
    );
    setTimeout(() => navigate({ to: role === "admin" ? "/system" : "/entities" }), 600);
  };

  return (
    <AuthShell title="Onboarding" subtitle="Provision a new operator account.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Full Name / Callsign">
          <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="J. Doe" className="bg-secondary font-mono text-sm" />
        </Field>
        <Field label="Work Email">
          <Input type="email" required placeholder="you@org.io" autoComplete="username" className="bg-secondary font-mono text-sm" />
        </Field>

        <div>
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Role</span>
          <div className="grid grid-cols-2 gap-2">
            <RoleCard
              active={role === "analyst"}
              onClick={() => setRoleLocal("analyst")}
              icon={<Wrench className="h-4 w-4" />}
              title="Analyst"
              desc="Run scans, triage findings, edit targets, work cases."
            />
            <RoleCard
              active={role === "admin"}
              onClick={() => setRoleLocal("admin")}
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Admin"
              desc="All analyst powers + purge, lockdown, audit, system controls."
            />
          </div>
        </div>

        <Field label="Passphrase">
          <Input type="password" required placeholder="min. 12 characters" autoComplete="new-password" className="bg-secondary font-mono text-sm" />
        </Field>

        <label className="flex items-start gap-2 pt-1 text-xs text-muted-foreground">
          <input type="checkbox" required className="mt-0.5 h-3 w-3 rounded border-border bg-secondary" />
          <span>
            I acknowledge that every action is signed into the chain-of-custody ledger per the{" "}
            <a href="#" className="text-tactical hover:underline">Operator Use Policy</a>.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? "Provisioning…" : `Enter as ${role === "admin" ? "Admin" : "Analyst"}`}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Already onboarded?{" "}
        <Link to="/login" className="text-tactical hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function RoleCard({ active, onClick, icon, title, desc }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border p-3 text-left transition-colors",
        active ? "border-tactical bg-tactical/10" : "border-border bg-secondary hover:border-tactical/50"
      )}
    >
      <div className="flex items-center gap-2 text-tactical">
        {icon}
        <span className="font-mono text-xs font-bold uppercase tracking-wider">{title}</span>
      </div>
      <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{desc}</p>
    </button>
  );
}
