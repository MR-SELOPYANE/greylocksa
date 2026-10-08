import { createContext, useContext } from "react";

/**
 * Contract for the console's own confirmation dialog.
 *
 * Native `prompt()` / `confirm()` can't be styled, validated, or dismissed with
 * the console's keyboard conventions, so every destructive action goes through
 * `useConfirm()` instead. The dialog itself lives in
 * `src/components/ConfirmDialog.tsx`; this module holds only the context and
 * the hook so the component file can stay component-only.
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

export type ConfirmFn = (options: ConfirmOptions) => Promise<ConfirmResult>;

export const ConfirmContext = createContext<ConfirmFn | null>(null);

/** Returns a `confirm()` that shows the console's own dialog instead of the browser's. */
export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used inside <ConfirmProvider>");
  return ctx;
}
