import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAppState } from "@/lib/store";
import { Keyboard } from "lucide-react";

type Shortcut = {
  keys: string[];
  label: string;
  run: (ctx: { navigate: ReturnType<typeof useNavigate>; openCommand: () => void }) => void;
};

const SEQUENCES: Shortcut[] = [
  {
    keys: ["g", "t"],
    label: "Go to Targets",
    run: ({ navigate }) => navigate({ to: "/entities" }),
  },
  { keys: ["g", "s"], label: "Go to Scans", run: ({ navigate }) => navigate({ to: "/scans" }) },
  { keys: ["g", "c"], label: "Go to Cases", run: ({ navigate }) => navigate({ to: "/cases" }) },
  {
    keys: ["g", "v"],
    label: "Go to Evidence Vault",
    run: ({ navigate }) => navigate({ to: "/vault" }),
  },
  {
    keys: ["g", "r"],
    label: "Go to Threat Intel",
    run: ({ navigate }) => navigate({ to: "/threats" }),
  },
  {
    keys: ["g", "u"],
    label: "Go to Chain of Custody",
    run: ({ navigate }) => navigate({ to: "/custody" }),
  },
  {
    keys: ["g", "a"],
    label: "Go to Activity Timeline",
    run: ({ navigate }) => navigate({ to: "/activity" }),
  },
  {
    keys: ["g", "i"],
    label: "Go to Sentinel AI",
    run: ({ navigate }) => navigate({ to: "/sentinel" }),
  },
  {
    keys: ["g", "d"],
    label: "Go to Command Dashboard",
    run: ({ navigate }) => navigate({ to: "/system" }),
  },
];

const SINGLES: Shortcut[] = [
  {
    keys: ["n"],
    label: "Open new case",
    run: ({ navigate }) => {
      navigate({ to: "/cases" });
      setTimeout(() => window.dispatchEvent(new CustomEvent("greylock:new-case")), 90);
    },
  },
  { keys: ["/"], label: "Open command palette", run: ({ openCommand }) => openCommand() },
];

function isTyping(el: EventTarget | null) {
  const node = el as HTMLElement | null;
  if (!node) return false;
  const tag = node.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || node.isContentEditable;
}

export function GlobalShortcuts() {
  const navigate = useNavigate();
  const { setCommandOpen } = useAppState();
  const [helpOpen, setHelpOpen] = useState(false);
  const pending = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const openCommand = () => setCommandOpen(true);

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping(e.target)) return;

      const key = e.key.toLowerCase();

      if (key === "?") {
        e.preventDefault();
        setHelpOpen((v) => !v);
        return;
      }

      // Two-key "g" sequences
      if (pending.current === "g") {
        const seq = SEQUENCES.find((s) => s.keys[1] === key);
        pending.current = null;
        if (timer.current) clearTimeout(timer.current);
        if (seq) {
          e.preventDefault();
          seq.run({ navigate, openCommand });
        }
        return;
      }
      if (key === "g") {
        pending.current = "g";
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => (pending.current = null), 900);
        return;
      }

      const single = SINGLES.find((s) => s.keys[0] === key);
      if (single) {
        e.preventDefault();
        single.run({ navigate, openCommand });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [navigate, setCommandOpen]);

  const rows = [
    { keys: ["⌘", "K"], label: "Command palette" },
    ...SINGLES.map((s) => ({
      keys: s.keys.map((k) => (k === "/" ? "/" : k.toUpperCase())),
      label: s.label,
    })),
    ...SEQUENCES.map((s) => ({ keys: s.keys.map((k) => k.toUpperCase()), label: s.label })),
    { keys: ["?"], label: "Toggle this help" },
  ];

  return (
    <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
      <DialogContent className="max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-mono">
            <Keyboard className="h-4 w-4 text-tactical" /> Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Press <kbd className="rounded bg-secondary px-1 font-mono">?</kbd> anytime to toggle
            this panel.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent"
            >
              <span className="text-muted-foreground">{r.label}</span>
              <span className="flex items-center gap-1">
                {r.keys.map((k, i) => (
                  <kbd
                    key={i}
                    className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[11px] text-foreground"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
