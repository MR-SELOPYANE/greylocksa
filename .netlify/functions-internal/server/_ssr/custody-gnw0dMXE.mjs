import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAppState, c as cn } from "./router-rFz3Bia9.mjs";
import { B as Badge } from "./badge-BlsWwPaG.mjs";
import "../_libs/sonner.mjs";
import { c as FingerprintPattern } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-presence.mjs";
function CustodyView() {
  const { custody } = useAppState();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "space-y-4",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "flex items-start gap-3 rounded-md border border-tactical/40 bg-tactical/5 p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FingerprintPattern, {
            className: "mt-0.5 h-4 w-4 text-tactical",
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "text-xs text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                className: "font-mono uppercase tracking-wider text-tactical",
                children: "Chain-of-Custody Ledger",
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                className: "mt-1",
                children:
                  "Append-only record of who accessed what, when, and why. Each entry is hashed; tampering breaks the chain and invalidates downstream entries. Required for investigative integrity and legal proceedings.",
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
                  "Timestamp",
                  "Actor",
                  "Role",
                  "Action",
                  "Target",
                  "Reason",
                  "IP",
                  "Hash",
                ].map((h) =>
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      className:
                        "px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
                      children: h,
                    },
                    h,
                  ),
                ),
              }),
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", {
              children: [
                custody.map((c) =>
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-border hover:bg-accent",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                          className:
                            "px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap",
                          children: new Date(c.timestamp).toLocaleString(),
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                          className: "px-4 py-3 font-mono text-xs text-tactical",
                          children: c.actor,
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                          className: "px-4 py-3",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, {
                            variant: "outline",
                            className: "font-mono text-[10px] uppercase",
                            children: c.role,
                          }),
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                          className: "px-4 py-3",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                            className: cn(
                              "rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                              c.action === "DELETE" || c.action === "LOCKDOWN"
                                ? "bg-status-black text-status-black-foreground"
                                : c.action === "EDIT" || c.action === "STATUS_CHANGE"
                                  ? "bg-status-grey text-status-grey-foreground"
                                  : c.action === "SCAN"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-accent text-accent-foreground",
                            ),
                            children: c.action,
                          }),
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                          className: "px-4 py-3 font-mono text-xs",
                          children: c.entityId,
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                          className: "px-4 py-3 text-xs text-foreground max-w-[280px] truncate",
                          title: c.reason,
                          children: c.reason,
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                          className: "px-4 py-3 font-mono text-xs text-muted-foreground",
                          children: c.ip,
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", {
                          className: "px-4 py-3 font-mono text-[10px] text-muted-foreground",
                          children: [c.hash.slice(0, 10), "…"],
                        }),
                      ],
                    },
                    c.id,
                  ),
                ),
                custody.length === 0 &&
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tr", {
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                      colSpan: 8,
                      className: "px-4 py-12 text-center text-sm text-muted-foreground",
                      children: "Chain is empty.",
                    }),
                  }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function CustodyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustodyView, {});
}
export { CustodyPage as component };
