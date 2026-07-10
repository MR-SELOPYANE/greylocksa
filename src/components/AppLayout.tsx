import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Shield,
  Database,
  FolderSearch,
  FileText,
  Activity,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Lock,
  Bug,
  Fingerprint,
  AlertOctagon,
  Radio,
  Archive,
  Users,
  Zap,
  ShieldAlert,
  Loader2,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppState } from "@/lib/store";
import { mockThreats } from "@/lib/security-mock";
import type { UserRole } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const baseNav = [
  { to: "/entities", icon: Database, label: "Targets", roles: ["analyst", "admin"] as UserRole[] },
  { to: "/scans", icon: Bug, label: "Scans", roles: ["analyst", "admin"] as UserRole[] },
  { to: "/threats", icon: Radio, label: "Threat Intel", roles: ["analyst", "admin"] as UserRole[] },
  { to: "/vault", icon: Archive, label: "Evidence Vault", roles: ["analyst", "admin"] as UserRole[] },
  { to: "/cases", icon: FolderSearch, label: "Cases", roles: ["analyst", "admin"] as UserRole[] },
  { to: "/sentinel", icon: MessageSquare, label: "Sentinel AI", roles: ["analyst", "admin"] as UserRole[] },
  { to: "/custody", icon: Fingerprint, label: "Chain of Custody", roles: ["analyst", "admin"] as UserRole[] },
  { to: "/activity", icon: Activity, label: "Activity", roles: ["analyst", "admin"] as UserRole[] },
  { to: "/sessions", icon: Users, label: "Sessions", roles: ["admin"] as UserRole[] },
  { to: "/audit", icon: FileText, label: "Audit Log", roles: ["admin"] as UserRole[] },
  { to: "/system", icon: Activity, label: "System Status", roles: ["admin"] as UserRole[] },
] as const;

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole, operator, clearance, lockdown, setLockdown, scans, logout } = useAppState();

  const navItems = baseNav.filter((n) => n.roles.includes(role));

  // Live Ops metrics
  const running = scans.filter((s) => s.status === "running").length;
  const criticalFindings = useMemo(
    () => scans.reduce((acc, s) => acc + (s.summary?.critical ?? 0) + (s.summary?.high ?? 0), 0),
    [scans]
  );
  const liveIocMatches = useMemo(() => {
    const set = new Set<string>();
    mockThreats.forEach((t) => t.matchedEntityIds.forEach((id) => set.add(id)));
    return set.size;
  }, []);
  const alertCount = criticalFindings + liveIocMatches;

  useEffect(() => {
    const onDenied = () => {
      toast.error("Privilege escalation blocked", {
        description: "Only an admin can grant the admin role. Ask an existing admin to promote you.",
      });
    };
    window.addEventListener("greylock:role-denied", onDenied);
    return () => window.removeEventListener("greylock:role-denied", onDenied);
  }, []);

  const toggleLockdown = () => {
    const reason = prompt(lockdown ? "Reason for lifting lockdown:" : "Reason for emergency lockdown:");
    if (reason === null) return;
    setLockdown(!lockdown, reason || undefined);
    toast.warning(lockdown ? "Lockdown lifted — operations resumed" : "EMERGENCY LOCKDOWN ENGAGED", {
      description: "Event written to chain-of-custody.",
    });
  };

  const handleRoleChange = (v: string) => {
    if (role === "analyst" && v === "admin") {
      toast.error("Privilege escalation blocked", {
        description: "Only an admin can promote a user to admin. This attempt was logged.",
      });
      return;
    }
    setRole(v as UserRole);
    if (role === "admin" && v === "analyst") {
      toast.success("Demoted to analyst", { description: "Admin tools hidden until promoted again." });
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Signed out", { description: "Session cleared and role reset." });
    navigate({ to: "/login" });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className={cn("flex flex-col border-r border-border bg-sidebar transition-all duration-300", collapsed ? "w-16" : "w-60")}>
        <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
          <Shield className="h-6 w-6 shrink-0 text-tactical" />
          {!collapsed && <span className="font-mono text-sm font-bold tracking-wider text-sidebar-foreground">greyLock</span>}
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="space-y-2 border-t border-sidebar-border p-3">
            <div className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{clearance}</span>
            </div>
            <div className="font-mono text-[10px] text-muted-foreground truncate">
              {operator} · <span className="uppercase text-tactical">{role}</span>
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-10 items-center justify-center border-t border-sidebar-border text-muted-foreground hover:text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        {lockdown && (
          <div className="flex items-center gap-2 border-b border-status-black bg-status-black/20 px-6 py-2 text-xs text-status-black">
            <AlertOctagon className="h-3.5 w-3.5" />
            <span className="font-mono uppercase tracking-widest">Emergency Lockdown Active</span>
            <span className="text-muted-foreground">— mutations and scans disabled until lifted by admin.</span>
          </div>
        )}
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-3">
            <h1 className="font-mono text-sm font-semibold tracking-wide text-card-foreground">
              {navItems.find((n) => location.pathname.startsWith(n.to))?.label ?? "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Ops pill — replaces the previous Quick Command button */}
            <button
              onClick={() => navigate({ to: running > 0 ? "/scans" : "/threats" })}
              className="hidden md:flex items-center gap-3 rounded-md border border-border bg-secondary px-2.5 py-1 text-[11px] font-mono text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              title="Live operational status — click to jump to the hottest queue"
            >
              <span className="flex items-center gap-1">
                {running > 0 ? <Loader2 className="h-3 w-3 animate-spin text-tactical" /> : <Zap className="h-3 w-3 text-muted-foreground" />}
                <span className={running > 0 ? "text-tactical" : ""}>{running} scan{running === 1 ? "" : "s"}</span>
              </span>
              <span className="h-3 w-px bg-border" />
              <span className={cn("flex items-center gap-1", alertCount > 0 && "text-destructive")}>
                <ShieldAlert className="h-3 w-3" />
                <span>{alertCount} alert{alertCount === 1 ? "" : "s"}</span>
              </span>
            </button>

            {role === "admin" && (
              <Button
                onClick={toggleLockdown}
                variant={lockdown ? "outline" : "destructive"}
                size="sm"
                className="h-7 gap-1.5"
              >
                <AlertOctagon className="h-3.5 w-3.5" />
                {lockdown ? "Lift Lockdown" : "Lockdown"}
              </Button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Role:</span>
              <Select value={role} onValueChange={handleRoleChange}>
                <SelectTrigger className="h-7 w-28 bg-secondary text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="analyst">Analyst</SelectItem>
                  <SelectItem value="admin" disabled={role === "analyst"}>
                    Admin {role === "analyst" && <span className="ml-1 text-[10px] text-muted-foreground">(admin-grant only)</span>}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleLogout} variant="outline" size="sm" className="h-7 gap-1.5">
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </Button>

            <div className="flex items-center gap-1.5">
              <div className={cn("h-2 w-2 rounded-full animate-pulse-glow", lockdown ? "bg-status-black" : "bg-status-white")} />
              <span className="font-mono text-[10px] uppercase text-muted-foreground">{lockdown ? "Locked" : "Secure"}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
