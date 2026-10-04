import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { l as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./index.mjs";
import {
  u as useAppState,
  B as Button,
  D as Dialog,
  b as DialogContent,
  d as DialogHeader,
  e as DialogTitle,
  f as DialogDescription,
  c as cn,
} from "./router-rFz3Bia9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as Textarea } from "./textarea-PZtgXrW6.mjs";
import { S as ScrollArea } from "./scroll-area-BHCPfQz6.mjs";
import { B as Badge } from "./badge-BlsWwPaG.mjs";
import {
  R as Root,
  b as Trigger,
  P as Portal,
  C as Content,
  a as Close,
  T as Title,
  D as Description,
  O as Overlay,
} from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import "../_libs/seroval.mjs";
import {
  L as Lock,
  N as RotateCcw,
  m as Download,
  d as FileText,
  T as Trash2,
  Q as Copy,
  V as Sparkles,
  Y as Send,
  X,
} from "../_libs/lucide-react.mjs";
import { h as objectType, q as enumType, m as arrayType, k as stringType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-scroll-area.mjs";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(
    async (...args) => {
      try {
        const res = await serverFn(...args);
        if (isRedirect(res)) throw res;
        return res;
      } catch (err) {
        if (isRedirect(err)) {
          err.options._fromLocation = router.stores.location.get();
          return router.navigate(router.resolveRedirect(err).options);
        }
        throw err;
      }
    },
    [router, serverFn],
  );
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true,
  });
};
const sentinelTurnSchema = objectType({
  role: enumType(["user", "assistant"]),
  content: stringType().trim().min(1).max(8e3),
});
const sentinelInputSchema = objectType({
  messages: arrayType(sentinelTurnSchema).min(1).max(20),
  clearance: enumType(["UNCLASSIFIED", "CONFIDENTIAL", "SECRET"]).optional(),
});
const askSentinel = createServerFn({
  method: "POST",
})
  .inputValidator((input) => sentinelInputSchema.parse(input))
  .handler(createSsrRpc("46976752a79ad20314a277635f85391ade236fe1dbd4dc85013e5e1867526df8"));
const Sheet = Root;
const SheetTrigger = Trigger;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    ),
    ...props,
    ref,
  }),
);
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);
const SheetContent = reactExports.forwardRef(
  ({ side = "right", className, children, ...props }, ref) =>
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, {
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, {
          ref,
          className: cn(sheetVariants({ side }), className),
          ...props,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, {
              className:
                "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                  className: "sr-only",
                  children: "Close",
                }),
              ],
            }),
            children,
          ],
        }),
      ],
    }),
);
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) =>
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
    ...props,
  });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsxRuntimeExports.jsx(Title, {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props,
  }),
);
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsxRuntimeExports.jsx(Description, {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props,
  }),
);
SheetDescription.displayName = Description.displayName;
const MAX_INPUT = 2e3;
const SUGGESTED_PROMPTS = [
  "Give me a current threat assessment summary.",
  "Which scan profile should I run on a new web target?",
  "Explain the chain-of-custody model and why it matters.",
  "Summarize this week's watchlist triage priorities.",
];
function generateId() {
  return Math.random().toString(36).slice(2, 10);
}
function renderMarkdown(content) {
  return content.split(/(\*\*.*?\*\*|`[^`]+`|```[\s\S]*?```)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: part.slice(2, -2) }, i);
    }
    if (part.startsWith("```") && part.endsWith("```")) {
      const code = part.slice(3, -3).replace(/^\w+\n/, "");
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "pre",
        { className: "my-2 overflow-x-auto rounded bg-background p-2 text-[11px]", children: code },
        i,
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "code",
        {
          className: "rounded bg-background px-1 py-0.5 text-tactical",
          children: part.slice(1, -1),
        },
        i,
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, i);
  });
}
function SentinelView() {
  const { clearance } = useAppState();
  const callSentinel = useServerFn(askSentinel);
  const [messages, setMessages] = reactExports.useState([
    {
      id: "sys-0",
      role: "system",
      content:
        "**SENTINEL AI Assistant** — Clearance: " +
        clearance +
        "\n\nLive AI analysis mode active. Ask about watchlist strategy, threat assessment, scans, or custody. Type `help` for guidance.",
      timestamp: /* @__PURE__ */ new Date().toISOString(),
    },
  ]);
  const [input, setInput] = reactExports.useState("");
  const [isTyping, setIsTyping] = reactExports.useState(false);
  const [showDenial, setShowDenial] = reactExports.useState(false);
  const scrollRef = reactExports.useRef(null);
  const textareaRef = reactExports.useRef(null);
  const classifiedKeywords = ["launch", "nuke", "classified", "top secret", "ts/sci"];
  const isEmptyConversation = messages.filter((m) => m.role !== "system").length === 0;
  const overLimit = input.length > MAX_INPUT;
  reactExports.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);
  reactExports.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);
  const requestCompletion = reactExports.useCallback(
    async (convo) => {
      setIsTyping(true);
      const history = convo
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-20)
        .map((m) => ({ role: m.role, content: m.content }));
      try {
        const { text } = await callSentinel({ data: { messages: history, clearance } });
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            role: "assistant",
            content: text,
            timestamp: /* @__PURE__ */ new Date().toISOString(),
            approvalStatus: "approved",
          },
        ]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "";
        const friendly =
          msg === "RATE_LIMIT"
            ? "Rate limit reached. Wait a moment and try again."
            : msg === "CREDITS_EXHAUSTED"
              ? "AI credits exhausted. Add credits in your workspace settings to continue."
              : "Sentinel could not reach the AI service. Try again.";
        toast.error(friendly);
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            role: "system",
            content: "**Connection error** — " + friendly,
            timestamp: /* @__PURE__ */ new Date().toISOString(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [callSentinel, clearance],
  );
  const submitQuery = reactExports.useCallback(
    (raw) => {
      const trimmed = raw.trim();
      if (!trimmed || isTyping) return;
      if (trimmed.length > MAX_INPUT) {
        toast.error(`Query too long. Keep it under ${MAX_INPUT} characters.`);
        return;
      }
      if (classifiedKeywords.some((k) => trimmed.toLowerCase().includes(k))) {
        setShowDenial(true);
        return;
      }
      const userMsg = {
        id: generateId(),
        role: "user",
        content: trimmed,
        timestamp: /* @__PURE__ */ new Date().toISOString(),
      };
      setInput("");
      setMessages((prev) => {
        const next = [...prev, userMsg];
        void requestCompletion(next);
        return next;
      });
    },
    [isTyping, requestCompletion],
  );
  const handleRegenerate = reactExports.useCallback(() => {
    if (isTyping) return;
    const lastUserIndex = [...messages].reverse().findIndex((m) => m.role === "user");
    if (lastUserIndex === -1) return;
    const cutIndex = messages.length - 1 - lastUserIndex;
    const trimmedConvo = messages.slice(0, cutIndex + 1);
    setMessages(trimmedConvo);
    void requestCompletion(trimmedConvo);
  }, [isTyping, messages, requestCompletion]);
  const handleCopy = reactExports.useCallback((content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Could not copy"));
  }, []);
  const handleExport = reactExports.useCallback(() => {
    const transcript = messages
      .map((m) => {
        const stamp = new Date(m.timestamp).toLocaleString();
        return `### ${m.role.toUpperCase()} — ${stamp}

${m.content}`;
      })
      .join("\n\n---\n\n");
    const header = `# SENTINEL Transcript

Clearance: ${clearance}
Exported: ${/* @__PURE__ */ new Date().toLocaleString()}

---

`;
    const blob = new Blob([header + transcript], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sentinel-transcript-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Transcript exported");
  }, [messages, clearance]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitQuery(input);
    }
    if (e.key === "Escape") {
      setInput("");
    }
  };
  const auditEntries = messages.filter((m) => m.role !== "system").slice(-10);
  const canRegenerate = !isTyping && messages.some((m) => m.role === "user");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "flex h-[calc(100vh-8rem)] flex-col rounded-lg border border-border bg-card",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "flex items-center justify-between border-b border-border px-4 py-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                className: "h-2 w-2 rounded-full bg-status-white animate-pulse-glow",
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                className: "font-mono text-sm font-bold tracking-wider text-card-foreground",
                children: "SENTINEL",
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, {
                variant: "outline",
                className: "font-mono text-[10px] uppercase tracking-wider",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "mr-1 h-2.5 w-2.5" }),
                  clearance,
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                variant: "outline",
                size: "sm",
                className: "gap-1.5 text-xs",
                onClick: handleRegenerate,
                disabled: !canRegenerate,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
                  "Regenerate",
                ],
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                variant: "outline",
                size: "sm",
                className: "gap-1.5 text-xs",
                onClick: handleExport,
                disabled: isEmptyConversation,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
                  "Export",
                ],
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, {
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, {
                    asChild: true,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                      variant: "outline",
                      size: "sm",
                      className: "gap-1.5 text-xs",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {
                          className: "h-3.5 w-3.5",
                        }),
                        "Audit",
                      ],
                    }),
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, {
                    className: "w-[400px] bg-card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, {
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, {
                            className: "font-mono",
                            children: "Audit Trail",
                          }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, {
                            children: "Last 10 AI interactions",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                        className: "mt-4 space-y-3",
                        children: [
                          auditEntries.map((m) =>
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className:
                                  "rounded-md border border-border bg-background p-3 text-xs",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, {
                                        variant: "outline",
                                        className: "font-mono text-[10px] uppercase",
                                        children: m.role,
                                      }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                                        className: "font-mono text-[10px] text-muted-foreground",
                                        children: new Date(m.timestamp).toLocaleTimeString(),
                                      }),
                                    ],
                                  }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
                                    className: "mt-1.5 text-muted-foreground line-clamp-2",
                                    children: [m.content.slice(0, 100), "..."],
                                  }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                                    className: "mt-1.5 flex gap-2",
                                    children: [
                                      m.redactedTags?.map((t) =>
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "span",
                                          {
                                            className:
                                              "rounded bg-status-grey/20 px-1.5 py-0.5 font-mono text-[9px] text-status-grey",
                                            children: t,
                                          },
                                          t,
                                        ),
                                      ),
                                      m.approvalStatus &&
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                                          className:
                                            "rounded bg-status-white/20 px-1.5 py-0.5 font-mono text-[9px] text-status-white",
                                          children: m.approvalStatus,
                                        }),
                                    ],
                                  }),
                                ],
                              },
                              m.id,
                            ),
                          ),
                          auditEntries.length === 0 &&
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                              className: "text-center text-xs text-muted-foreground",
                              children: "No interactions yet.",
                            }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
                variant: "outline",
                size: "sm",
                className: "gap-1.5 text-xs",
                onClick: () => setMessages((prev) => [prev[0]]),
                disabled: isEmptyConversation,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                  "Clear",
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, {
        className: "flex-1 p-4",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          className: "space-y-4",
          children: [
            messages.map((msg) =>
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `group flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                    className: `max-w-[80%] rounded-lg px-4 py-3 text-sm ${msg.role === "user" ? "bg-tactical text-tactical-foreground" : msg.role === "system" ? "border border-border bg-surface text-surface-foreground" : "bg-accent text-accent-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                        className: "whitespace-pre-wrap font-mono text-xs leading-relaxed",
                        children: renderMarkdown(msg.content),
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                        className: "mt-1 flex items-center justify-end gap-2",
                        children: [
                          msg.role === "assistant" &&
                            /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
                              onClick: () => handleCopy(msg.content),
                              className:
                                "opacity-0 transition-opacity group-hover:opacity-60 hover:!opacity-100",
                              "aria-label": "Copy message",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, {
                                className: "h-3 w-3",
                              }),
                            }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                            className: "font-mono text-[9px] opacity-50",
                            children: new Date(msg.timestamp).toLocaleTimeString(),
                          }),
                        ],
                      }),
                    ],
                  }),
                },
                msg.id,
              ),
            ),
            isEmptyConversation &&
              !isTyping &&
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                className: "space-y-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                    className:
                      "flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
                      "Suggested queries",
                    ],
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                    className: "grid gap-2 sm:grid-cols-2",
                    children: SUGGESTED_PROMPTS.map((p) =>
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => submitQuery(p),
                          className:
                            "rounded-md border border-border bg-surface px-3 py-2 text-left font-mono text-xs text-surface-foreground transition-colors hover:border-tactical hover:bg-accent",
                          children: p,
                        },
                        p,
                      ),
                    ),
                  }),
                ],
              }),
            isTyping &&
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                className: "flex justify-start",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                  className: "rounded-lg bg-accent px-4 py-3",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                    className: "flex gap-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                        className: "h-2 w-2 rounded-full bg-muted-foreground animate-pulse-glow",
                        style: { animationDelay: "0ms" },
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                        className: "h-2 w-2 rounded-full bg-muted-foreground animate-pulse-glow",
                        style: { animationDelay: "200ms" },
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                        className: "h-2 w-2 rounded-full bg-muted-foreground animate-pulse-glow",
                        style: { animationDelay: "400ms" },
                      }),
                    ],
                  }),
                }),
              }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef }),
          ],
        }),
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "border-t border-border p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "flex items-end gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, {
                ref: textareaRef,
                value: input,
                onChange: (e) => setInput(e.target.value),
                onKeyDown: handleKeyDown,
                rows: 1,
                placeholder: "Enter command... (Enter to send, Shift+Enter for newline)",
                className: `max-h-40 min-h-[40px] flex-1 resize-none bg-surface font-mono text-sm ${overLimit ? "border-status-black focus-visible:ring-status-black" : ""}`,
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
                onClick: () => submitQuery(input),
                disabled: !input.trim() || isTyping || overLimit,
                size: "icon",
                className: "shrink-0",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
              }),
            ],
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "mt-1.5 flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                className: "text-[10px] font-mono text-muted-foreground",
                children:
                  "Enter: send · Shift+Enter: newline · Esc: clear · All interactions logged",
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", {
                className: `font-mono text-[10px] ${overLimit ? "text-status-black" : "text-muted-foreground"}`,
                children: [input.length, "/", MAX_INPUT],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, {
        open: showDenial,
        onOpenChange: setShowDenial,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, {
          className: "bg-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, {
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, {
                  className: "flex items-center gap-2 font-mono text-status-black",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5" }),
                    "Access Denied",
                  ],
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, {
                  children:
                    "This query references classified material above your current clearance level. The request has been logged and cannot be processed in this session.",
                }),
              ],
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
              variant: "outline",
              onClick: () => setShowDenial(false),
              className: "mt-2",
              children: "Acknowledged",
            }),
          ],
        }),
      }),
    ],
  });
}
function SentinelPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SentinelView, {});
}
export { SentinelPage as component };
