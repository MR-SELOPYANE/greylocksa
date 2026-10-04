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
  Bell,
  Menu,
  X,
  Terminal as TerminalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppState } from "@/lib/store";
import { deriveIocsFromScans } from "@/lib/derive";
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
  {
    to: "/vault",
    icon: Archive,
    label: "Evidence Vault",
    roles: ["analyst", "admin"] as UserRole[],
  },
  { to: "/cases", icon: FolderSearch, label: "Cases", roles: ["analyst", "admin"] as UserRole[] },
  {
    to: "/sentinel",
    icon: MessageSquare,
    label: "Sentinel AI",
    roles: ["analyst", "admin"] as UserRole[],
  },
  {
    to: "/terminal",
    icon: TerminalIcon,
    label: "Terminal",
    roles: ["analyst", "admin"] as UserRole[],
  },
  {
    to: "/custody",
    icon: Fingerprint,
    label: "Chain of Custody",
    roles: ["analyst", "admin"] as UserRole[],
  },
  { to: "/activity", icon: Activity, label: "Activity", roles: ["analyst", "admin"] as UserRole[] },
  { to: "/sessions", icon: Users, label: "Sessions", roles: ["admin"] as UserRole[] },
  { to: "/audit", icon: FileText, label: "Audit Log", roles: ["admin"] as UserRole[] },
  { to: "/system", icon: Activity, label: "System Status", roles: ["admin"] as UserRole[] },
] as const;

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    role,
    setRole,
    operator,
    clearance,
    lockdown,
    setLockdown,
    scans,
    logout,
    notifications,
    markNotificationsRead,
    clearNotifications,
  } = useAppState();
  const [bellOpen, setBellOpen] = useState(false);

  const navItems = baseNav.filter((n) => n.roles.includes(role));

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setBellOpen(false);
  }, [location.pathname]);

  // Live Ops metrics
  const running = scans.filter((s) => s.status === "running").length;
  const criticalFindings = useMemo(
    () => scans.reduce((acc, s) => acc + (s.summary?.critical ?? 0) + (s.summary?.high ?? 0), 0),
    [scans],
  );
  const liveIocMatches = useMemo(() => {
    const set = new Set<string>();
    deriveIocsFromScans(scans).forEach((t) => t.matchedEntityIds.forEach((id) => set.add(id)));
    return set.size;
  }, [scans]);
  const alertCount = criticalFindings + liveIocMatches;
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const onDenied = () => {
      toast.error("Privilege escalation blocked", {
        description:
          "Only an admin can grant the admin role. Ask an existing admin to promote you.",
      });
    };
    window.addEventListener("greylock:role-denied", onDenied);
    return () => window.removeEventListener("greylock:role-denied", onDenied);
  }, []);

  const toggleLockdown = () => {
    const reason = prompt(
      lockdown ? "Reason for lifting lockdown:" : "Reason for emergency lockdown:",
    );
    if (reason === null) return;
    setLockdown(!lockdown, reason || undefined);
    toast.warning(
      lockdown ? "Lockdown lifted — operations resumed" : "EMERGENCY LOCKDOWN ENGAGED",
      {
        description: "Event written to chain-of-custody.",
      },
    );
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
      toast.success("Demoted to analyst", {
        description: "Admin tools hidden until promoted again.",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Signed out", { description: "Session cleared and role reset." });
    navigate({ to: "/login" });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col border-r border-border bg-sidebar shadow-2xl">
            <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
              <Shield className="h-6 w-6 shrink-0 text-tactical" />
              <span className="font-mono text-sm font-bold tracking-wider text-sidebar-foreground">
                greyLock
              </span>
              <button
                className="ml-auto text-muted-foreground hover:text-sidebar-foreground"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-2">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="space-y-2 border-t border-sidebar-border p-3">
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {clearance}
                </span>
              </div>
              <div className="font-mono text-[10px] text-muted-foreground truncate">
                {operator} · <span className="uppercase text-tactical">{role}</span>
              </div>
            </div>
          </aside>
        </div>
      )}

      <aside
        className={cn(
          "hidden flex-col border-r border-border bg-sidebar transition-all duration-300 md:flex",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
          <Shield className="h-6 w-6 shrink-0 text-tactical" />
          {!collapsed && (
            <span className="font-mono text-sm font-bold tracking-wider text-sidebar-foreground">
              greyLock
            </span>
          )}
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
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
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
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {clearance}
              </span>
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
            <span className="text-muted-foreground">
              — mutations and scans disabled until lifted by admin.
            </span>
          </div>
        )}
        <header className="flex h-14 items-center justify-between gap-2 border-b border-border bg-card px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-8 shrink-0 p-0 md:hidden"
              title="Menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="truncate font-mono text-sm font-semibold tracking-wide text-card-foreground">
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
                {running > 0 ? (
                  <Loader2 className="h-3 w-3 animate-spin text-tactical" />
                ) : (
                  <Zap className="h-3 w-3 text-muted-foreground" />
                )}
                <span className={running > 0 ? "text-tactical" : ""}>
                  {running} scan{running === 1 ? "" : "s"}
                </span>
              </span>
              <span className="h-3 w-px bg-border" />
              <span className={cn("flex items-center gap-1", alertCount > 0 && "text-destructive")}>
                <ShieldAlert className="h-3 w-3" />
                <span>
                  {alertCount} alert{alertCount === 1 ? "" : "s"}
                </span>
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
              <span className="hidden text-xs text-muted-foreground sm:inline">Role:</span>
              <Select value={role} onValueChange={handleRoleChange}>
                <SelectTrigger className="h-7 w-28 bg-secondary text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analyst">Analyst</SelectItem>
                  <SelectItem value="admin" disabled={role === "analyst"}>
                    Admin{" "}
                    {role === "analyst" && (
                      <span className="ml-1 text-[10px] text-muted-foreground">
                        (admin-grant only)
                      </span>
                    )}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-8 p-0"
                title="Alerts"
                onClick={() => {
                  setBellOpen((v) => !v);
                  if (!bellOpen) markNotificationsRead();
                }}
              >
                <Bell className="h-3.5 w-3.5" />
                {unread > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 font-mono text-[9px] text-destructive-foreground">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </Button>
              {bellOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setBellOpen(false)} />
                  <div className="absolute right-0 top-9 z-50 w-80 rounded-md border border-border bg-card shadow-xl">
                    <div className="flex items-center justify-between border-b border-border px-3 py-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Alerts
                      </span>
                      <button
                        className="text-[10px] text-tactical hover:underline"
                        onClick={() => {
                          clearNotifications();
                          setBellOpen(false);
                        }}
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 && (
                        <p className="px-3 py-8 text-center text-xs text-muted-foreground">
                          Nothing to report. Alerts appear here when a sweep finishes, a case is
                          escalated, or a decoy is touched.
                        </p>
                      )}
                      {notifications.slice(0, 30).map((n) => (
                        <button
                          key={n.id}
                          onClick={() => {
                            setBellOpen(false);
                            if (n.link) navigate({ to: n.link });
                          }}
                          className="block w-full border-b border-border px-3 py-2 text-left last:border-0 hover:bg-accent"
                        >
                          <div className="flex items-start gap-2">
                            <span
                              className={cn(
                                "mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
                                n.kind === "critical"
                                  ? "bg-destructive"
                                  : n.kind === "warning"
                                    ? "bg-status-grey"
                                    : n.kind === "success"
                                      ? "bg-status-white"
                                      : "bg-tactical",
                              )}
                            />
                            <div className="min-w-0">
                              <p className="truncate font-mono text-[11px] text-foreground">
                                {n.title}
                              </p>
                              {n.description && (
                                <p className="mt-0.5 line-clamp-2 text-[10px] text-muted-foreground">
                                  {n.description}
                                </p>
                              )}
                              <p className="mt-0.5 font-mono text-[9px] text-muted-foreground">
                                {new Date(n.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <Button onClick={handleLogout} variant="outline" size="sm" className="h-7 gap-1.5">
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </Button>

            <div className="hidden items-center gap-1.5 sm:flex">
              <div
                className={cn(
                  "h-2 w-2 rounded-full animate-pulse-glow",
                  lockdown ? "bg-status-black" : "bg-status-white",
                )}
              />
              <span className="font-mono text-[10px] uppercase text-muted-foreground">
                {lockdown ? "Locked" : "Secure"}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
