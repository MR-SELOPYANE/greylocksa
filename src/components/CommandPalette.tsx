import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useAppState } from "@/lib/store";
import { toast } from "sonner";
import {
  Database,
  FolderSearch,
  FolderPlus,
  FileText,
  Activity,
  MessageSquare,
  Home,
  Shield,
  Download,
  Eye,
  Bug,
  Fingerprint,
  AlertOctagon,
  Radio,
  Archive,
  Users,
} from "lucide-react";

export function CommandPalette() {
  const navigate = useNavigate();
  const {
    commandOpen,
    setCommandOpen,
    entities,
    cases,
    role,
    setRole,
    lockdown,
    setLockdown,
  } = useAppState();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commandOpen, setCommandOpen]);

  const run = (fn: () => void) => {
    setCommandOpen(false);
    setTimeout(fn, 50);
  };

  return (
    <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
      <CommandInput placeholder="Type a command, route, or entity ID…" />
      <CommandList>
        <CommandEmpty>No matches.</CommandEmpty>

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => run(() => navigate({ to: "/" }))}>
            <Home /> <span>Landing</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate({ to: "/entities" }))}>
            <Database /> <span>Targets</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate({ to: "/scans" }))}>
            <Bug /> <span>Scans</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate({ to: "/threats" }))}>
            <Radio /> <span>Threat Intel</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate({ to: "/vault" }))}>
            <Archive /> <span>Evidence Vault</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate({ to: "/cases" }))}>
            <FolderSearch /> <span>Cases</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate({ to: "/custody" }))}>
            <Fingerprint /> <span>Chain of Custody</span>
          </CommandItem>
          {role === "admin" && (
            <CommandItem onSelect={() => run(() => navigate({ to: "/sessions" }))}>
              <Users /> <span>Sessions</span>
            </CommandItem>
          )}
          <CommandItem onSelect={() => run(() => navigate({ to: "/audit" }))}>
            <FileText /> <span>Audit Log</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate({ to: "/system" }))}>
            <Activity /> <span>System Status</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate({ to: "/sentinel" }))}>
            <MessageSquare /> <span>Sentinel AI</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(() => { window.dispatchEvent(new CustomEvent("greylock:open-add-entity")); navigate({ to: "/entities" }); })}>
            <Shield /> <span>Add new target</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => { navigate({ to: "/cases" }); setTimeout(() => window.dispatchEvent(new CustomEvent("greylock:new-case")), 80); })}>
            <FolderPlus /> <span>Open new case</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => { window.dispatchEvent(new CustomEvent("greylock:export-entities")); navigate({ to: "/entities" }); })}>
            <Download /> <span>Export targets to CSV</span>
          </CommandItem>
          {role === "admin" && (
            <CommandItem
              onSelect={() => run(() => {
                const reason = prompt(lockdown ? "Reason for lifting lockdown:" : "Reason for emergency lockdown:");
                if (reason === null) return;
                setLockdown(!lockdown, reason || undefined);
                toast.warning(lockdown ? "Lockdown lifted" : "EMERGENCY LOCKDOWN ENGAGED");
              })}
            >
              <AlertOctagon /> <span>{lockdown ? "Lift emergency lockdown" : "Engage emergency lockdown"}</span>
            </CommandItem>
          )}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Role">
          {(["analyst", "admin"] as const).map((r) => {
            const blocked = role === "analyst" && r === "admin";
            return (
              <CommandItem
                key={r}
                onSelect={() => run(() => {
                  if (blocked) { toast.error("Privilege escalation blocked", { description: "Only an admin can grant the admin role." }); return; }
                  setRole(r);
                  toast.success(`Role switched to ${r}`);
                })}
                disabled={role === r}
              >
                <Shield /> <span className="capitalize">Switch role · {r}{blocked ? " (admin only)" : ""}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Jump to target">
          {entities.slice(0, 20).map((e) => (
            <CommandItem
              key={e.id}
              value={`${e.id} ${e.identifier} ${e.type}`}
              onSelect={() => run(() => {
                navigate({ to: "/entities" });
                window.dispatchEvent(new CustomEvent("greylock:open-entity", { detail: { id: e.id } }));
              })}
            >
              <Eye />
              <span className="font-mono text-xs text-tactical">{e.id}</span>
              <span className="ml-2 truncate">{e.identifier}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
