import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/**
 * Themed replacement for the browser's native `prompt()` / `confirm()` boxes.
 *
 * Native dialogs can't be styled, can't be validated, and can't be dismissed
 * with the console's own keyboard conventions. `useConfirm()` resolves to
 * `{ confirmed, reason }` so call sites read like the flow they replace.
 */

export interface ConfirmOptions {
  /** Headline of the dialog, e.g. "Purge target". */
  title: string;
  /** Supporting line — say what will actually happen. */
  description?: string;
  /** Label above the reason field. Setting it makes the field appear. */
  reasonLabel?: string;
  /** Refuse to close until the reason field has text. */
  requireReason?: boolean;
  /** Suggested text pre-filled into the reason field. */
  defaultReason?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Renders the confirm button in the destructive colour. */
  destructive?: boolean;
}

export interface ConfirmResult {
  confirmed: boolean;
  reason: string;
}

type ConfirmFn = (options: ConfirmOptions) => Promise<ConfirmResult>;

const declined: ConfirmResult = { confirmed: false, reason: "" };

const ConfirmContext = createContext<ConfirmFn | null>(null);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const resolver = useRef<((result: ConfirmResult) => void) | null>(null);

  const confirm = useCallback<ConfirmFn>((next) => {
    setReason(next.defaultReason ?? "");
    setError("");
    setOptions(next);
    return new Promise<ConfirmResult>((resolve) => {
      resolver.current?.(declined);
      resolver.current = resolve;
    });
  }, []);

  const settle = useCallback(
    (confirmed: boolean) => {
      const trimmed = reason.trim();
      if (confirmed && options?.requireReason && !trimmed) {
        setError("A reason is required — it goes into the chain of custody.");
        return;
      }
      resolver.current?.({ confirmed, reason: trimmed });
      resolver.current = null;
      setOptions(null);
    },
    [options, reason],
  );

  const value = useMemo(() => confirm, [confirm]);

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <Dialog
        open={options !== null}
        onOpenChange={(open) => {
          if (!open) settle(false);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  options?.destructive
                    ? "bg-status-black/15 text-status-black"
                    : "bg-tactical/15 text-tactical",
                )}
              >
                <AlertOctagon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <DialogTitle className="font-mono text-sm tracking-wide uppercase">
                  {options?.title}
                </DialogTitle>
                {options?.description && (
                  <DialogDescription className="mt-1 text-xs">
                    {options.description}
                  </DialogDescription>
                )}
              </div>
            </div>
          </DialogHeader>

          {options?.reasonLabel && (
            <div className="space-y-1.5">
              <Label
                htmlFor="confirm-reason"
                className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              >
                {options.reasonLabel}
              </Label>
              <Textarea
                id="confirm-reason"
                autoFocus
                rows={3}
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) settle(true);
                }}
                placeholder="Recorded in the audit trail"
                className="font-mono text-xs"
              />
              {error && <p className="text-[11px] text-status-black">{error}</p>}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => settle(false)}>
              {options?.cancelLabel ?? "Cancel"}
            </Button>
            <Button
              size="sm"
              variant={options?.destructive ? "destructive" : "default"}
              onClick={() => settle(true)}
            >
              {options?.confirmLabel ?? "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmContext.Provider>
  );
}

/** Returns a `confirm()` that shows the console's own dialog instead of the browser's. */
export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used inside <ConfirmProvider>");
  return ctx;
}
