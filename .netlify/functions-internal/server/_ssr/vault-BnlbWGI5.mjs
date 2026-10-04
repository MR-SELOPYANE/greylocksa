import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import {
  u as useAppState,
  m as mockHoneytokens,
  B as Button,
  D as Dialog,
  a as DialogTrigger,
  c as cn,
  b as DialogContent,
  d as DialogHeader,
  e as DialogTitle,
  f as DialogDescription,
  S as Select,
  g as SelectTrigger,
  h as SelectValue,
  i as SelectContent,
  j as SelectItem,
  k as DialogFooter,
} from "./router-rFz3Bia9.mjs";
import { B as Badge } from "./badge-BlsWwPaG.mjs";
import { I as Input } from "./input-CIbZo0CB.mjs";
import { T as Textarea } from "./textarea-PZtgXrW6.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import {
  I as Info,
  A as Archive,
  n as Upload,
  L as Lock,
  o as LockOpen,
  p as ShieldCheck,
  j as ShieldAlert,
  q as Hash,
  r as History,
  P as Pencil,
  T as Trash2,
  s as Bomb,
} from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-presence.mjs";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsxRuntimeExports.jsx(Root, {
    ref,
    className: cn(labelVariants(), className),
    ...props,
  }),
);
Label.displayName = Root.displayName;
const CATEGORIES = ["pcap", "screenshot", "log", "binary", "doc", "memory", "other"];
function EvidenceVaultView() {
  const {
    evidence,
    addEvidence,
    updateEvidence,
    deleteEvidence,
    canEditEvidence,
    operator,
    role,
    entities,
    logCustody,
  } = useAppState();
  const [tokens, setTokens] = reactExports.useState(() => mockHoneytokens);
  const [editing, setEditing] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState(null);
  const [uploadOpen, setUploadOpen] = reactExports.useState(false);
  const [filter, setFilter] = reactExports.useState("all");
  const filtered = evidence.filter((e) => {
    if (filter === "mine") return e.uploadedBy === operator;
    if (filter === "broken") return e.integrity === "broken";
    return true;
  });
  const verify = (e) => {
    toast.success(`Hash verified for ${e.filename}`, {
      description: `SHA-256 ${e.sha256.slice(0, 24)}… matches sealed digest.`,
    });
    logCustody({
      entityId: e.linkedEntityId ?? "VAULT",
      action: "VIEW",
      reason: `Hash verify on ${e.id}`,
    });
  };
  const reseal = (e) => {
    if (!canEditEvidence(e)) {
      toast.error("Permission denied", {
        description: "Only the uploader or an admin can break or re-seal this artifact.",
      });
      return;
    }
    const reason = prompt(e.sealed ? "Reason for breaking seal:" : "Reason for re-sealing:");
    if (!reason) return;
    updateEvidence(e.id, { sealed: !e.sealed }, reason);
    logCustody({
      entityId: e.linkedEntityId ?? "VAULT",
      action: "EDIT",
      reason: `${e.sealed ? "Broke seal" : "Re-sealed"} ${e.id} — ${reason}`,
    });
  };
  const remove = (e) => {
    if (!canEditEvidence(e)) {
      toast.error("Permission denied");
      return;
    }
    const reason = prompt(`Reason for deleting ${e.filename}:`);
    if (!reason) return;
    deleteEvidence(e.id, reason);
    logCustody({
      entityId: e.linkedEntityId ?? "VAULT",
      action: "DELETE",
      reason: `Deleted ${e.id} (${e.filename}) — ${reason}`,
    });
    toast.success("Artifact removed", {
      description: "Deletion event sealed into chain-of-custody.",
    });
  };
  const triggerToken = (id) => {
    setTokens((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              triggered: true,
              triggers: [
                ...t.triggers,
                {
                  ip: "203.0.113." + Math.floor(Math.random() * 254),
                  ua: "curl/8.4",
                  timestamp: /* @__PURE__ */ new Date().toISOString(),
                },
              ],
            }
          : t,
      ),
    );
    toast.warning("HONEYTOKEN TRIGGERED", {
      description: "Decoy access logged — investigate session.",
    });
    logCustody({
      entityId: "HONEYTOKEN",
      action: "HONEYTOKEN",
      reason: `Simulated trigger of token ${id}`,
    });
  };
  const fmtSize = (n) =>
    n > 1e6 ? `${(n / 1e6).toFixed(1)} MB` : n > 1e3 ? `${(n / 1e3).toFixed(1)} KB` : `${n} B`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "flex items-start gap-3 rounded-md border border-tactical/40 bg-tactical/5 p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, {
            className: "mt-0.5 h-4 w-4 text-tactical shrink-0",
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "text-xs text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                className: "font-mono uppercase tracking-wider text-tactical",
                children: "How the vault works",
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
                className: "mt-1",
                children: [
                  "Every artifact is sealed with a SHA-256 digest the moment it is uploaded. Multiple operators can work the same case: anyone can ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "view" }),
                  " and ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "verify" }),
                  ", but only the original ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "uploader or an admin" }),
                  ' can edit notes, re-link evidence, break the seal, or delete. Every change carries a reason and is written to the chain-of-custody so admins can answer "who touched what and when."',
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", {
        className: "space-y-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "flex flex-wrap items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, {
                className: "h-4 w-4 text-tactical",
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
                className: "font-mono text-sm uppercase tracking-widest text-foreground",
                children: "Evidence Vault",
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, {
                variant: "outline",
                className: "font-mono text-[10px]",
                children: [evidence.length, " sealed"],
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                className: "ml-auto flex items-center gap-1.5",
                children: [
                  ["all", "mine", "broken"].map((f) =>
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: filter === f ? "default" : "outline",
                        className: "h-7 font-mono text-[10px] uppercase",
                        onClick: () => setFilter(f),
                        children: f,
                      },
                      f,
                    ),
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, {
                    open: uploadOpen,
                    onOpenChange: setUploadOpen,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, {
                        asChild: true,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                          size: "sm",
                          className: "h-7 gap-1.5",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, {
                              className: "h-3.5 w-3.5",
                            }),
                            " Upload artifact",
                          ],
                        }),
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UploadDialog, {
                        operator,
                        entityOptions: entities.map((e) => ({
                          id: e.id,
                          label: `${e.id} · ${e.identifier}`,
                        })),
                        onSubmit: (data) => {
                          const item = addEvidence(data);
                          logCustody({
                            entityId: data.linkedEntityId ?? "VAULT",
                            action: "EDIT",
                            reason: `Uploaded ${item.filename} (${item.id})`,
                          });
                          toast.success("Artifact sealed", {
                            description: `${item.filename} added to the vault.`,
                          });
                          setUploadOpen(false);
                        },
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
            className: "overflow-x-auto rounded-lg border border-border",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", {
              className: "w-full text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", {
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", {
                    className: "border-b border-border bg-surface",
                    children: [
                      "ID",
                      "Filename",
                      "Size",
                      "Category",
                      "Linked",
                      "Uploaded by",
                      "Last edit",
                      "Seal",
                      "Integrity",
                      "Actions",
                    ].map((h) =>
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "th",
                        {
                          className:
                            "px-3 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
                          children: h,
                        },
                        h,
                      ),
                    ),
                  }),
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", {
                  children: [
                    filtered.map((e) => {
                      const mine = canEditEvidence(e);
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          className: "border-b border-border hover:bg-accent",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                              className: "px-3 py-3 font-mono text-xs text-tactical",
                              children: e.id,
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", {
                              className: "px-3 py-3 font-mono text-xs text-foreground",
                              title: e.notes,
                              children: [
                                e.filename,
                                e.notes &&
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                                    className:
                                      "mt-0.5 text-[10px] text-muted-foreground truncate max-w-[220px]",
                                    children: e.notes,
                                  }),
                              ],
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                              className: "px-3 py-3 font-mono text-xs text-muted-foreground",
                              children: fmtSize(e.sizeBytes),
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                              className: "px-3 py-3",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, {
                                variant: "outline",
                                className: "font-mono text-[10px] uppercase",
                                children: e.category,
                              }),
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                              className: "px-3 py-3 font-mono text-xs text-muted-foreground",
                              children: e.linkedEntityId ?? "—",
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", {
                              className: "px-3 py-3 font-mono text-[11px]",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                                  className: "text-tactical",
                                  children: e.uploadedBy,
                                }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                                  className: "text-[10px] text-muted-foreground",
                                  children: new Date(e.uploadedAt).toLocaleDateString(),
                                }),
                              ],
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                              className: "px-3 py-3 font-mono text-[11px]",
                              children: e.lastEditedBy
                                ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    jsxRuntimeExports.Fragment,
                                    {
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                                          className: "text-foreground",
                                          children: e.lastEditedBy,
                                        }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                                          className: "text-[10px] text-muted-foreground",
                                          children: new Date(e.lastEditedAt).toLocaleString(),
                                        }),
                                      ],
                                    },
                                  )
                                : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                                    className: "text-muted-foreground",
                                    children: "—",
                                  }),
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                              className: "px-3 py-3",
                              children: e.sealed
                                ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, {
                                    className: "h-3.5 w-3.5 text-tactical",
                                  })
                                : /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, {
                                    className: "h-3.5 w-3.5 text-muted-foreground",
                                  }),
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                              className: "px-3 py-3",
                              children:
                                e.integrity === "verified"
                                  ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", {
                                      className:
                                        "inline-flex items-center gap-1 font-mono text-[10px] uppercase text-status-white",
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, {
                                          className: "h-3 w-3",
                                        }),
                                        " verified",
                                      ],
                                    })
                                  : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", {
                                      className:
                                        "inline-flex items-center gap-1 font-mono text-[10px] uppercase text-destructive",
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, {
                                          className: "h-3 w-3",
                                        }),
                                        " broken",
                                      ],
                                    }),
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                              className: "px-3 py-3",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                                className: "flex items-center gap-0.5",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                                    size: "sm",
                                    variant: "ghost",
                                    className: "h-7 w-7 p-0",
                                    title: "Verify hash",
                                    onClick: () => verify(e),
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, {
                                      className: "h-3 w-3",
                                    }),
                                  }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                                    size: "sm",
                                    variant: "ghost",
                                    className: "h-7 w-7 p-0",
                                    title: "History",
                                    onClick: () => setHistory(e),
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, {
                                      className: "h-3 w-3",
                                    }),
                                  }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                                    size: "sm",
                                    variant: "ghost",
                                    className: "h-7 w-7 p-0",
                                    title: mine ? "Edit" : "Locked — uploader/admin only",
                                    disabled: !mine,
                                    onClick: () => setEditing(e),
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, {
                                      className: "h-3 w-3",
                                    }),
                                  }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                                    size: "sm",
                                    variant: "ghost",
                                    className: "h-7 w-7 p-0",
                                    title: e.sealed ? "Break seal" : "Re-seal",
                                    disabled: !mine,
                                    onClick: () => reseal(e),
                                    children: e.sealed
                                      ? /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, {
                                          className: "h-3 w-3",
                                        })
                                      : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, {
                                          className: "h-3 w-3",
                                        }),
                                  }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                                    size: "sm",
                                    variant: "ghost",
                                    className:
                                      "h-7 w-7 p-0 text-destructive hover:text-destructive",
                                    title: mine ? "Delete" : "Locked",
                                    disabled: !mine,
                                    onClick: () => remove(e),
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, {
                                      className: "h-3 w-3",
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          ],
                        },
                        e.id,
                      );
                    }),
                    filtered.length === 0 &&
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tr", {
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                          colSpan: 10,
                          className: "px-4 py-12 text-center text-sm text-muted-foreground",
                          children: "No artifacts match this filter.",
                        }),
                      }),
                  ],
                }),
              ],
            }),
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
            className: "text-[11px] text-muted-foreground",
            children: [
              "Signed in as ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                className: "font-mono text-tactical",
                children: operator,
              }),
              " · role ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                className: "font-mono uppercase",
                children: role,
              }),
              ". ",
              role === "admin"
                ? "Admin override active — you can edit any artifact."
                : "You can edit only artifacts you uploaded.",
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", {
        className: "space-y-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bomb, {
                className: "h-4 w-4 text-destructive",
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
                className: "font-mono text-sm uppercase tracking-widest text-foreground",
                children: "Honeytokens",
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                className: "text-xs text-muted-foreground",
                children: "— planted decoys that scream when touched",
              }),
            ],
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
            className: "grid gap-3 md:grid-cols-2",
            children: tokens.map((t) =>
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "rounded-lg border p-4 space-y-2",
                    t.triggered
                      ? "border-destructive/50 bg-destructive/5"
                      : "border-border bg-surface",
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                      className: "flex items-start justify-between gap-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                              className: "flex items-center gap-2",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, {
                                  variant: "outline",
                                  className: "font-mono text-[10px] uppercase",
                                  children: t.kind,
                                }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                                  className: "font-mono text-xs text-foreground",
                                  children: t.label,
                                }),
                              ],
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                              className:
                                "mt-1 font-mono text-[11px] text-muted-foreground break-all",
                              children: t.bait,
                            }),
                          ],
                        }),
                        t.triggered
                          ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, {
                              className:
                                "bg-destructive text-destructive-foreground font-mono text-[10px] uppercase",
                              children: "Triggered",
                            })
                          : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, {
                              variant: "outline",
                              className: "font-mono text-[10px] uppercase text-status-white",
                              children: "Quiet",
                            }),
                      ],
                    }),
                    t.triggers.length > 0 &&
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", {
                        className:
                          "space-y-1 border-t border-border pt-2 text-[11px] font-mono text-muted-foreground",
                        children: t.triggers
                          .slice(-3)
                          .map((trg, i) =>
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "li",
                              {
                                children: [
                                  "· ",
                                  new Date(trg.timestamp).toLocaleString(),
                                  " — ",
                                  trg.ip,
                                  " (",
                                  trg.ua,
                                  ")",
                                ],
                              },
                              i,
                            ),
                          ),
                      }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 gap-1.5",
                      onClick: () => triggerToken(t.id),
                      children: "Simulate trigger",
                    }),
                  ],
                },
                t.id,
              ),
            ),
          }),
        ],
      }),
      editing &&
        /* @__PURE__ */ jsxRuntimeExports.jsx(EditDialog, {
          item: editing,
          entityOptions: entities.map((e) => ({ id: e.id, label: `${e.id} · ${e.identifier}` })),
          onClose: () => setEditing(null),
          onSubmit: (patch, reason) => {
            updateEvidence(editing.id, patch, reason);
            logCustody({
              entityId: editing.linkedEntityId ?? "VAULT",
              action: "EDIT",
              reason: `Updated ${editing.id} — ${reason}`,
            });
            toast.success("Artifact updated", {
              description: "Change captured in chain-of-custody.",
            });
            setEditing(null);
          },
        }),
      history &&
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, {
          open: true,
          onOpenChange: () => setHistory(null),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, {
            className: "max-w-2xl",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, {
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, {
                    className: "font-mono text-sm",
                    children: [history.id, " · Edit history"],
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, {
                    children: "Every change is signed by the operator and chained into custody.",
                  }),
                ],
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                className: "max-h-[60vh] overflow-y-auto rounded border border-border",
                children:
                  history.editHistory.length === 0
                    ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                        className: "p-6 text-center text-xs text-muted-foreground",
                        children: "No edits yet — original upload only.",
                      })
                    : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", {
                        className: "divide-y divide-border",
                        children: [...history.editHistory]
                          .reverse()
                          .map((ed, i) =>
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "li",
                              {
                                className: "p-3 text-xs",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                                    className: "flex items-center justify-between font-mono",
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                                        className: "text-tactical",
                                        children: ed.by,
                                      }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                                        className: "text-muted-foreground",
                                        children: new Date(ed.at).toLocaleString(),
                                      }),
                                    ],
                                  }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                                    className: "mt-1 font-mono text-[11px]",
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", {
                                        className: "text-muted-foreground",
                                        children: [ed.field, ":"],
                                      }),
                                      " ",
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                                        className: "line-through opacity-60",
                                        children: ed.from || "∅",
                                      }),
                                      " → ",
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                                        className: "text-foreground",
                                        children: ed.to || "∅",
                                      }),
                                    ],
                                  }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
                                    className: "mt-1 text-[11px] text-muted-foreground",
                                    children: ["Reason: ", ed.reason],
                                  }),
                                ],
                              },
                              i,
                            ),
                          ),
                      }),
              }),
            ],
          }),
        }),
    ],
  });
}
function UploadDialog({ operator, entityOptions, onSubmit }) {
  const [filename, setFilename] = reactExports.useState("");
  const [size, setSize] = reactExports.useState("131072");
  const [category, setCategory] = reactExports.useState("doc");
  const [linked, setLinked] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, {
    className: "max-w-lg",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, {
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, {
            className: "font-mono text-sm",
            children: "Seal new artifact",
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, {
            children: [
              "Uploader will be recorded as ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                className: "font-mono text-tactical",
                children: operator,
              }),
              ". Other operators can view & verify, but cannot edit unless they are admins.",
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "space-y-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, {
                className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                children: "Filename",
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
                value: filename,
                onChange: (e) => setFilename(e.target.value),
                placeholder: "e.g. acme-prod-config.json",
                className: "font-mono text-sm",
              }),
            ],
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "grid grid-cols-2 gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, {
                    className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                    children: "Size (bytes)",
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
                    type: "number",
                    value: size,
                    onChange: (e) => setSize(e.target.value),
                    className: "font-mono text-sm",
                  }),
                ],
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, {
                    className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                    children: "Category",
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, {
                    value: category,
                    onValueChange: (v) => setCategory(v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, {
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}),
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, {
                        children: CATEGORIES.map((c) =>
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            SelectItem,
                            { value: c, children: c },
                            c,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, {
                className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                children: "Linked target (optional)",
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, {
                value: linked || "_none",
                onValueChange: (v) => setLinked(v === "_none" ? "" : v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, {
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {
                      placeholder: "None",
                    }),
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, {
                    className: "max-h-72",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, {
                        value: "_none",
                        children: "None",
                      }),
                      entityOptions.map((o) =>
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectItem,
                          { value: o.id, children: o.label },
                          o.id,
                        ),
                      ),
                    ],
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, {
                className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                children: "Notes for the team",
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, {
                value: notes,
                onChange: (e) => setNotes(e.target.value),
                rows: 3,
                placeholder: "Why does this matter? Anything teammates should know?",
                className: "text-sm",
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, {
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
          disabled: !filename.trim(),
          onClick: () =>
            onSubmit({
              filename: filename.trim(),
              sizeBytes: Math.max(1, parseInt(size) || 0),
              category,
              linkedEntityId: linked || void 0,
              notes: notes.trim() || void 0,
            }),
          children: "Upload & seal",
        }),
      }),
    ],
  });
}
function EditDialog({ item, entityOptions, onClose, onSubmit }) {
  const [filename, setFilename] = reactExports.useState(item.filename);
  const [category, setCategory] = reactExports.useState(item.category);
  const [linked, setLinked] = reactExports.useState(item.linkedEntityId ?? "");
  const [notes, setNotes] = reactExports.useState(item.notes ?? "");
  const [reason, setReason] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, {
    open: true,
    onOpenChange: onClose,
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, {
      className: "max-w-lg",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, {
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, {
              className: "font-mono text-sm",
              children: ["Edit ", item.id],
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, {
              children:
                "Edits are required to carry a reason. The reason is sealed into the chain-of-custody alongside the diff.",
            }),
          ],
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          className: "space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, {
                  className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                  children: "Filename",
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
                  value: filename,
                  onChange: (e) => setFilename(e.target.value),
                  className: "font-mono text-sm",
                }),
              ],
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, {
                  className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                  children: "Category",
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, {
                  value: category,
                  onValueChange: (v) => setCategory(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, {
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}),
                    }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, {
                      children: CATEGORIES.map((c) =>
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectItem,
                          { value: c, children: c },
                          c,
                        ),
                      ),
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, {
                  className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                  children: "Linked target",
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, {
                  value: linked || "_none",
                  onValueChange: (v) => setLinked(v === "_none" ? "" : v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, {
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {
                        placeholder: "None",
                      }),
                    }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, {
                      className: "max-h-72",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, {
                          value: "_none",
                          children: "None",
                        }),
                        entityOptions.map((o) =>
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            SelectItem,
                            { value: o.id, children: o.label },
                            o.id,
                          ),
                        ),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, {
                  className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                  children: "Notes",
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, {
                  value: notes,
                  onChange: (e) => setNotes(e.target.value),
                  rows: 3,
                  className: "text-sm",
                }),
              ],
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, {
                  className: "text-[10px] uppercase tracking-widest text-destructive",
                  children: "Reason for change *",
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {
                  value: reason,
                  onChange: (e) => setReason(e.target.value),
                  placeholder: "e.g. corrected mislabeled target, added redaction note…",
                  className: "text-sm",
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, {
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
              variant: "ghost",
              onClick: onClose,
              children: "Cancel",
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
              disabled: !reason.trim() || !filename.trim(),
              onClick: () => {
                const patch = {};
                if (filename !== item.filename) patch.filename = filename;
                if (category !== item.category) patch.category = category;
                if ((linked || void 0) !== item.linkedEntityId)
                  patch.linkedEntityId = linked || void 0;
                if ((notes || void 0) !== item.notes) patch.notes = notes || void 0;
                if (Object.keys(patch).length === 0) {
                  toast.info("No changes to save");
                  return;
                }
                onSubmit(patch, reason.trim());
              },
              children: "Save & seal change",
            }),
          ],
        }),
      ],
    }),
  });
}
function VaultPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(EvidenceVaultView, {});
}
export { VaultPage as component };
