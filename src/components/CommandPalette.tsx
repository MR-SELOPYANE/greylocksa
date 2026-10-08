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
import { useConfirm } from "@/lib/confirm";
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
    evidence,
    honeytokens,
    scans,
    role,
    setRole,
    lockdown,
    setLockdown,
  } = useAppState();

  const confirm = useConfirm();

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
          <CommandItem
            onSelect={() =>
              run(() => {
                window.dispatchEvent(new CustomEvent("greylock:open-add-entity"));
                navigate({ to: "/entities" });
              })
            }
          >
            <Shield /> <span>Add new target</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run(() => {
                navigate({ to: "/cases" });
                setTimeout(() => window.dispatchEvent(new CustomEvent("greylock:new-case")), 80);
              })
            }
          >
            <FolderPlus /> <span>Open new case</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run(() => {
                window.dispatchEvent(new CustomEvent("greylock:export-entities"));
                navigate({ to: "/entities" });
              })
            }
          >
            <Download /> <span>Export targets to CSV</span>
          </CommandItem>
          {role === "admin" && (
            <CommandItem
              onSelect={() =>
                run(async () => {
                  const { confirmed, reason } = await confirm({
                    title: lockdown ? "Lift emergency lockdown" : "Engage emergency lockdown",
                    description: lockdown
                      ? "Mutations and scans resume for every operator."
                      : "All mutations and scans stop until an admin lifts it.",
                    reasonLabel: "Reason",
                    requireReason: true,
                    confirmLabel: lockdown ? "Lift lockdown" : "Engage lockdown",
                    destructive: !lockdown,
                  });
                  if (!confirmed) return;
                  setLockdown(!lockdown, reason || undefined);
                  toast.warning(lockdown ? "Lockdown lifted" : "EMERGENCY LOCKDOWN ENGAGED");
                })
              }
            >
              <AlertOctagon />{" "}
              <span>{lockdown ? "Lift emergency lockdown" : "Engage emergency lockdown"}</span>
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
                onSelect={() =>
                  run(() => {
                    if (blocked) {
                      toast.error("Privilege escalation blocked", {
                        description: "Only an admin can grant the admin role.",
                      });
                      return;
                    }
                    setRole(r);
                    toast.success(`Role switched to ${r}`);
                  })
                }
                disabled={role === r}
              >
                <Shield />{" "}
                <span className="capitalize">
                  Switch role · {r}
                  {blocked ? " (admin only)" : ""}
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Targets">
          {entities.map((e) => (
            <CommandItem
              key={e.id}
              value={`${e.id} ${e.identifier} ${e.type} ${e.status} ${Object.values(e.metadata ?? {}).join(" ")}`}
              onSelect={() => run(() => navigate({ to: "/entity/$id", params: { id: e.id } }))}
            >
              <Eye />
              <span className="font-mono text-xs text-tactical">{e.id}</span>
              <span className="ml-2 truncate">{e.identifier}</span>
              <span className="ml-auto font-mono text-[10px] uppercase text-muted-foreground">
                {e.type}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Cases">
          {cases.map((c) => (
            <CommandItem
              key={c.id}
              value={`${c.id} ${c.title} ${c.status} ${c.description} ${c.assignedAnalyst} ${c.priority}`}
              onSelect={() =>
                run(() => {
                  navigate({ to: "/cases" });
                  setTimeout(
                    () =>
                      window.dispatchEvent(
                        new CustomEvent("greylock:open-case", { detail: { id: c.id } }),
                      ),
                    80,
                  );
                })
              }
            >
              <FolderSearch />
              <span className="font-mono text-xs text-tactical">{c.id}</span>
              <span className="ml-2 truncate">{c.title}</span>
              <span className="ml-auto font-mono text-[10px] uppercase text-muted-foreground">
                {c.status}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Evidence">
          {evidence.map((ev) => (
            <CommandItem
              key={ev.id}
              value={`${ev.id} ${ev.filename} ${ev.category} ${ev.notes ?? ""} ${ev.uploadedBy} ${ev.sha256}`}
              onSelect={() => run(() => navigate({ to: "/vault" }))}
            >
              <Archive />
              <span className="font-mono text-xs text-tactical">{ev.id}</span>
              <span className="ml-2 truncate">{ev.filename}</span>
              <span className="ml-auto font-mono text-[10px] uppercase text-muted-foreground">
                {ev.category}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Honeytokens">
          {honeytokens.map((t) => (
            <CommandItem
              key={t.id}
              value={`${t.id} ${t.label} ${t.kind} ${t.bait}`}
              onSelect={() => run(() => navigate({ to: "/vault" }))}
            >
              <Radio />
              <span className="font-mono text-xs text-tactical">{t.id}</span>
              <span className="ml-2 truncate">{t.label}</span>
              {t.triggered && (
                <span className="ml-auto font-mono text-[10px] uppercase text-destructive">
                  triggered
                </span>
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Scans">
          {scans.slice(0, 40).map((s) => (
            <CommandItem
              key={s.id}
              value={`${s.id} ${s.targetLabel} ${s.profile} ${s.status}`}
              onSelect={() => run(() => navigate({ to: "/scans" }))}
            >
              <Bug />
              <span className="font-mono text-xs text-tactical">{s.id}</span>
              <span className="ml-2 truncate">{s.targetLabel}</span>
              <span className="ml-auto font-mono text-[10px] uppercase text-muted-foreground">
                {s.status}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
