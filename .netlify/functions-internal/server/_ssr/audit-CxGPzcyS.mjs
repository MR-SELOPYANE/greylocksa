import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { p as mockAuditLog } from "./router-rFz3Bia9.mjs";
import "../_libs/sonner.mjs";
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
import "../_libs/lucide-react.mjs";
function AuditLogView() {
  const formatDate = (d) =>
    new Date(d).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    className: "overflow-x-auto rounded-lg border border-border",
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", {
      className: "w-full text-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", {
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", {
            className: "border-b border-border bg-surface",
            children: ["Timestamp", "Actor", "Action", "Entity", "IP Address", "Details"].map((h) =>
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", {
          children: mockAuditLog.map((entry) =>
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border transition-colors hover:bg-accent",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                    className:
                      "px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap",
                    children: formatDate(entry.timestamp),
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                    className: "px-4 py-3 font-mono text-xs text-tactical",
                    children: entry.actor,
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                    className: "px-4 py-3",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                      className:
                        "rounded bg-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-foreground",
                      children: entry.action,
                    }),
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                    className: "px-4 py-3 font-mono text-xs text-foreground",
                    children: entry.entityId,
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                    className: "px-4 py-3 font-mono text-xs text-muted-foreground",
                    children: entry.ip,
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
                    className: "px-4 py-3 text-xs text-muted-foreground max-w-[300px] truncate",
                    children: entry.details,
                  }),
                ],
              },
              entry.id,
            ),
          ),
        }),
      ],
    }),
  });
}
function AuditPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuditLogView, {});
}
export { AuditPage as component };
