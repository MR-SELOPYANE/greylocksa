import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shield, ArrowRight, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign In — greyLock" },
      { name: "description", content: "Authenticate to the greyLock intelligence console." },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/entities" }), 600);
  };

  return (
    <AuthShell
      title="Operator Sign-In"
      subtitle="Authenticate to access the console."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Operator ID / Email">
          <Input
            type="email"
            required
            placeholder="analyst@agency.gov"
            autoComplete="username"
            className="bg-secondary font-mono text-sm"
          />
        </Field>
        <Field label="Passphrase">
          <Input
            type="password"
            required
            placeholder="••••••••••••"
            autoComplete="current-password"
            className="bg-secondary font-mono text-sm"
          />
        </Field>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input type="checkbox" className="h-3 w-3 rounded border-border bg-secondary" />
            Trusted terminal
          </label>
          <a href="#" className="text-xs text-tactical hover:underline">
            Reset passphrase
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? "Authenticating…" : "Sign In"}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        No account?{" "}
        <Link to="/signup" className="text-tactical hover:underline">
          Request access
        </Link>
      </p>
    </AuthShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.65_0.15_220/0.10),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.25_0.02_250/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.25_0.02_250/0.3)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

      <div className="relative w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <Shield className="h-6 w-6 text-tactical" />
          <span className="font-mono text-base font-bold tracking-wider">greyLock</span>
        </Link>

        <div className="rounded-lg border border-border bg-card/90 p-6 shadow-2xl backdrop-blur">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-mono text-lg font-bold">{title}</h1>
              <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
            </div>
            <div className="flex items-center gap-1.5 rounded border border-border px-2 py-1">
              <Lock className="h-3 w-3 text-status-white" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Secure
              </span>
            </div>
          </div>
          {children}
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          All access attempts are logged
        </p>
      </div>
    </div>
  );
}
