import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAppState, B as Button, S as Select, g as SelectTrigger, h as SelectValue, i as SelectContent, j as SelectItem, c as cn, D as Dialog, b as DialogContent, d as DialogHeader, e as DialogTitle, f as DialogDescription, k as DialogFooter } from "./router-rFz3Bia9.mjs";
import { P as PriorityBadge, C as CaseStatusBadge } from "./StatusBadges-CWKZcZPv.mjs";
import { I as Input } from "./input-CIbZo0CB.mjs";
import { T as Textarea } from "./textarea-PZtgXrW6.mjs";
import { B as Badge } from "./badge-BlsWwPaG.mjs";
import { S as ScrollArea } from "./scroll-area-BHCPfQz6.mjs";
import { R as Root, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { v as Plus, a1 as Maximize2, a2 as Minus, F as FolderSearch, a3 as Link2, b as Check, a4 as ExternalLink, c as FingerprintPattern, a5 as Save } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-scroll-area.mjs";
function NewCaseDialog({
  open,
  onOpenChange
}) {
  const { addCase, operator, entities } = useAppState();
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [priority, setPriority] = reactExports.useState("medium");
  const [status, setStatus] = reactExports.useState("open");
  const [analyst, setAnalyst] = reactExports.useState(operator);
  const [linked, setLinked] = reactExports.useState([]);
  const [entityFilter, setEntityFilter] = reactExports.useState("");
  const reset = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setStatus("open");
    setAnalyst(operator);
    setLinked([]);
    setEntityFilter("");
  };
  const toggleEntity = (id) => setLinked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const filteredEntities = reactExports.useMemo(() => {
    const q = entityFilter.trim().toLowerCase();
    if (!q) return entities;
    return entities.filter(
      (e) => e.identifier.toLowerCase().includes(q) || e.id.toLowerCase().includes(q)
    );
  }, [entities, entityFilter]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const created = addCase({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      assignedAnalyst: analyst.trim() || operator,
      linkedEntityIds: linked
    });
    toast.success(`Case opened: ${created.id}`, {
      description: `${created.title} · ${linked.length} entit${linked.length === 1 ? "y" : "ies"} linked`
    });
    reset();
    onOpenChange(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => {
    if (!v) reset();
    onOpenChange(v);
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card sm:max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-mono", children: "Open Case" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create a new investigation. Action will be written to chain-of-custody." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            required: true,
            value: title,
            onChange: (e) => setTitle(e.target.value),
            placeholder: "e.g. Meridian Holdings Network Analysis",
            className: "bg-secondary text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: description,
            onChange: (e) => setDescription(e.target.value),
            placeholder: "Scope and objective of the investigation",
            className: "min-h-20 bg-secondary text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Priority" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: priority, onValueChange: (v) => setPriority(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "critical", children: "Critical" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "high", children: "High" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "medium", children: "Medium" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "low", children: "Low" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: status, onValueChange: (v) => setStatus(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "open", children: "Open" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "in_progress", children: "In Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "escalated", children: "Escalated" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Assigned Analyst" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: analyst,
            onChange: (e) => setAnalyst(e.target.value),
            placeholder: "analyst.you",
            className: "bg-secondary font-mono text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-3 w-3" }),
            " Linked Entities"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-tactical", children: [
            linked.length,
            " selected"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: entityFilter,
            onChange: (e) => setEntityFilter(e.target.value),
            placeholder: "Filter targets…",
            className: "bg-secondary font-mono text-xs"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-36 rounded-md border border-border bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-1.5", children: [
          filteredEntities.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 py-3 text-center font-mono text-[11px] text-muted-foreground", children: "No targets match." }),
          filteredEntities.map((ent) => {
            const isOn = linked.includes(ent.id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggleEntity(ent.id),
                className: cn(
                  "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left font-mono text-xs transition-colors",
                  isOn ? "bg-tactical/15 text-tactical" : "text-foreground hover:bg-accent"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(
                    "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border",
                    isOn ? "border-tactical bg-tactical text-background" : "border-border"
                  ), children: isOn && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-2.5 w-2.5" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: ent.identifier }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto shrink-0 text-[10px] text-muted-foreground", children: ent.type })
                ]
              },
              ent.id
            );
          })
        ] }) }),
        linked.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 pt-1", children: linked.map((id) => {
          const ent = entities.find((e) => e.id === id);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "font-mono text-[10px]", children: ent ? ent.identifier.slice(0, 18) : id }, id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "Open Case" })
      ] })
    ] })
  ] }) });
}
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
const STATUS_OPTIONS$1 = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "escalated", label: "Escalated" },
  { value: "closed", label: "Closed" }
];
function CaseDetailDialog({
  caseId,
  open,
  onOpenChange
}) {
  const { cases, entities, custody, updateCase, updateCaseStatus } = useAppState();
  const activeCase = cases.find((c) => c.id === caseId) ?? null;
  const [analyst, setAnalyst] = reactExports.useState("");
  const [priority, setPriority] = reactExports.useState("medium");
  const [notes, setNotes] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (activeCase) {
      setAnalyst(activeCase.assignedAnalyst);
      setPriority(activeCase.priority);
      setNotes(activeCase.notes ?? "");
    }
  }, [activeCase]);
  const linkedEntities = reactExports.useMemo(
    () => activeCase ? activeCase.linkedEntityIds.map((id) => ({ id, entity: entities.find((e) => e.id === id) })) : [],
    [activeCase, entities]
  );
  const trail = reactExports.useMemo(
    () => activeCase ? custody.filter((c) => c.entityId === activeCase.id) : [],
    [activeCase, custody]
  );
  const formatDate = (d) => new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  if (!activeCase) return null;
  const dirty = analyst !== activeCase.assignedAnalyst || priority !== activeCase.priority || notes !== (activeCase.notes ?? "");
  const save = () => {
    updateCase(activeCase.id, { assignedAnalyst: analyst.trim() || activeCase.assignedAnalyst, priority, notes: notes.trim() }, "Detail panel edit");
    toast.success(`${activeCase.id} updated`, { description: "Change written to chain-of-custody." });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex flex-wrap items-center gap-2 font-mono", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-tactical", children: activeCase.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityBadge, { priority: activeCase.priority }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStatusBadge, { status: activeCase.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: activeCase.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-[65vh] pr-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: activeCase.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            activeCase.progress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: activeCase.progress, className: "h-1.5" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: activeCase.status, onValueChange: (v) => {
            updateCaseStatus(activeCase.id, v);
            toast.success(`${activeCase.id} → ${v.replace("_", " ").toUpperCase()}`);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 bg-secondary text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS$1.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Priority" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: priority, onValueChange: (v) => setPriority(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 bg-secondary text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "critical", children: "Critical" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "high", children: "High" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "medium", children: "Medium" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "low", children: "Low" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Assigned Analyst" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: analyst, onChange: (e) => setAnalyst(e.target.value), className: "h-8 bg-secondary font-mono text-xs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Investigation Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            placeholder: "Add findings, observations, or next steps…",
            className: "min-h-24 bg-secondary text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-3 w-3" }),
          " Linked Entities (",
          linkedEntities.length,
          ")"
        ] }),
        linkedEntities.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-muted-foreground/60", children: "No entities linked to this case." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-1.5", children: linkedEntities.map(({ id, entity }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/entities",
            className: "flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 font-mono text-xs transition-colors hover:border-tactical hover:text-tactical",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-tactical", children: id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-foreground", children: entity ? entity.identifier : "unknown target" }),
              entity && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] text-muted-foreground", children: [
                "risk ",
                entity.riskScore
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 shrink-0 text-muted-foreground" })
            ]
          },
          id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FingerprintPattern, { className: "h-3 w-3" }),
          " Chain of Custody (",
          trail.length,
          ")"
        ] }),
        trail.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-muted-foreground/60", children: "No custody events recorded." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: trail.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background p-2.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "font-mono text-[9px]", children: t.action }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-tactical", children: t.actor }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-[10px] text-muted-foreground", children: formatDate(t.timestamp) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: t.reason })
        ] }, t.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
          "Created ",
          formatDate(activeCase.createdAt)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
          "· Updated ",
          formatDate(activeCase.updatedAt)
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 border-t border-border pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => onOpenChange(false), children: "Close" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, disabled: !dirty, className: "gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
        " Save changes"
      ] })
    ] })
  ] }) });
}
const STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "escalated", label: "Escalated" },
  { value: "closed", label: "Closed" }
];
function CasesView() {
  const { cases, entities, updateCaseStatus, updateCaseProgress } = useAppState();
  const [filter, setFilter] = reactExports.useState("all");
  const [newOpen, setNewOpen] = reactExports.useState(false);
  const [detailId, setDetailId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const onNew = () => setNewOpen(true);
    const onOpen = (ev) => {
      const id = ev.detail?.id;
      if (id) setDetailId(id);
    };
    window.addEventListener("greylock:new-case", onNew);
    window.addEventListener("greylock:open-case", onOpen);
    return () => {
      window.removeEventListener("greylock:new-case", onNew);
      window.removeEventListener("greylock:open-case", onOpen);
    };
  }, []);
  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const counts = reactExports.useMemo(() => {
    const acc = { all: cases.length, open: 0, in_progress: 0, escalated: 0, closed: 0 };
    cases.forEach((c) => {
      acc[c.status] += 1;
    });
    return acc;
  }, [cases]);
  const filtered = reactExports.useMemo(
    () => filter === "all" ? cases : cases.filter((c) => c.status === filter),
    [cases, filter]
  );
  const handleStatus = (id, status) => {
    updateCaseStatus(id, status);
    toast.success(`${id} → ${status.replace("_", " ").toUpperCase()}`, {
      description: "Change written to chain-of-custody."
    });
  };
  const nudgeProgress = (id, current, delta) => {
    updateCaseProgress(id, current + delta);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      [{ value: "all", label: "All" }, ...STATUS_OPTIONS].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setFilter(opt.value),
          className: `rounded-md border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${filter === opt.value ? "border-tactical bg-tactical/10 text-tactical" : "border-border bg-surface text-muted-foreground hover:bg-accent hover:text-foreground"}`,
          children: [
            opt.label,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 opacity-60", children: counts[opt.value] ?? 0 })
          ]
        },
        opt.value
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => setNewOpen(true), className: "ml-auto gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
        "Open Case"
      ] })
    ] }),
    filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-tactical", children: c.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityBadge, { priority: c.priority }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStatusBadge, { status: c.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setDetailId(c.id),
              className: "group flex items-center gap-1.5 text-left text-sm font-semibold text-card-foreground transition-colors hover:text-tactical",
              children: [
                c.title,
                /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: c.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: "Analyst" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-tactical", children: c.assignedAnalyst })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: c.status, onValueChange: (v) => handleStatus(c.id, v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 w-36 bg-secondary text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: "Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-6 w-6",
                onClick: () => nudgeProgress(c.id, c.progress, -10),
                disabled: c.progress <= 0,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-10 text-center font-mono text-xs text-muted-foreground", children: [
              c.progress,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-6 w-6",
                onClick: () => nudgeProgress(c.id, c.progress, 10),
                disabled: c.progress >= 100,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: c.progress, className: "h-1.5" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-1.5", children: [
        c.linkedEntityIds.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/60", children: "No linked entities" }),
        c.linkedEntityIds.map((eid) => {
          const entity = entities.find((e) => e.id === eid);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/entities", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "cursor-pointer font-mono text-[10px] transition-colors hover:border-tactical hover:text-tactical", children: [
            eid,
            entity ? `: ${entity.identifier.slice(0, 20)}` : ""
          ] }) }, eid);
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-4 text-[10px] font-mono text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Created: ",
          formatDate(c.createdAt)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Updated: ",
          formatDate(c.updatedAt)
        ] })
      ] })
    ] }, c.id)),
    filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-2 rounded-lg border border-border py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderSearch, { className: "h-8 w-8 text-muted-foreground/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground", children: "No cases in this status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Switch filters to see other cases." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewCaseDialog, { open: newOpen, onOpenChange: setNewOpen }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CaseDetailDialog, { caseId: detailId, open: !!detailId, onOpenChange: (v) => !v && setDetailId(null) })
  ] });
}
function CasesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CasesView, {});
}
export {
  CasesPage as component
};
