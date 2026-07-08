import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAppState, B as Button, S as Select, g as SelectTrigger, h as SelectValue, i as SelectContent, j as SelectItem, D as Dialog, b as DialogContent, d as DialogHeader, e as DialogTitle, f as DialogDescription, c as cn, k as DialogFooter } from "./router-rFz3Bia9.mjs";
import { T as TypeBadge, R as RiskScore, S as StatusBadge, C as CaseStatusBadge } from "./StatusBadges-CWKZcZPv.mjs";
import { I as Input } from "./input-CIbZo0CB.mjs";
import { R as Root, T as Track, a as Range, b as Thumb } from "../_libs/radix-ui__react-slider.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { R as Root2, T as Trigger, P as Portal2, C as Content2, I as Item2, S as SubTrigger2, a as SubContent2, b as CheckboxItem2, c as ItemIndicator2, d as RadioItem2, L as Label2, e as Separator2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { S as ScrollArea } from "./scroll-area-BHCPfQz6.mjs";
import { S as Search, $ as Funnel, X, m as Download, v as Plus, C as ChevronDown, T as Trash2, E as Eye, B as Bug, P as Pencil, D as Database, F as FolderSearch, b as Check, g as ChevronRight, a0 as Circle } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "./badge-BlsWwPaG.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-scroll-area.mjs";
const Slider = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Root,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = Root.displayName;
function AddEntityDialog({
  open,
  onOpenChange
}) {
  const { addEntity } = useAppState();
  const [type, setType] = reactExports.useState("web");
  const [identifier, setIdentifier] = reactExports.useState("");
  const [risk, setRisk] = reactExports.useState([50]);
  const [status, setStatus] = reactExports.useState("grey");
  const reset = () => {
    setType("web");
    setIdentifier("");
    setRisk([50]);
    setStatus("grey");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    const created = addEntity({
      type,
      identifier: identifier.trim(),
      riskScore: risk[0],
      status
    });
    toast.success(`Entity provisioned: ${created.id}`, {
      description: `${created.identifier} added to ${status.toUpperCase()} pool`
    });
    reset();
    onOpenChange(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => {
    if (!v) reset();
    onOpenChange(v);
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card sm:max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-mono", children: "Add Entity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Provision a new watchlist entry. Mutation will be audited." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: type, onValueChange: (v) => setType(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "web", children: "Website" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "app", children: "Application" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "platform", children: "Platform" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "domain", children: "Domain" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ip", children: "IP Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "person", children: "Person" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "org", children: "Organization" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Identifier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            required: true,
            value: identifier,
            onChange: (e) => setIdentifier(e.target.value),
            placeholder: type === "person" ? "Full name" : type === "org" ? "Legal entity name" : type === "ip" ? "192.0.2.1" : type === "web" ? "https://example.com" : type === "app" ? "com.example.android.app" : type === "platform" ? "AWS account / GCP project / SaaS tenant" : "example.com",
            className: "bg-secondary font-mono text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Risk Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-tactical", children: risk[0] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { min: 0, max: 100, step: 1, value: risk, onValueChange: setRisk })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Initial Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: status, onValueChange: (v) => setStatus(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "grey", children: "Grey — under review" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "black", children: "Black — blocked" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "white", children: "White — cleared" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "Provision Entity" })
      ] })
    ] })
  ] }) });
}
function EditEntityDialog({
  entity,
  open,
  onOpenChange
}) {
  const { updateEntity, logCustody } = useAppState();
  const [type, setType] = reactExports.useState("web");
  const [identifier, setIdentifier] = reactExports.useState("");
  const [risk, setRisk] = reactExports.useState([50]);
  const [status, setStatus] = reactExports.useState("grey");
  const [reason, setReason] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (entity) {
      setType(entity.type);
      setIdentifier(entity.identifier);
      setRisk([entity.riskScore]);
      setStatus(entity.status);
      setReason("");
    }
  }, [entity]);
  if (!entity) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim() || !reason.trim()) {
      toast.error("Reason is required for chain-of-custody");
      return;
    }
    updateEntity(entity.id, {
      type,
      identifier: identifier.trim(),
      riskScore: risk[0],
      status
    });
    logCustody({
      entityId: entity.id,
      action: "EDIT",
      reason: reason.trim()
    });
    toast.success(`Entity ${entity.id} updated`, { description: "Change recorded in chain-of-custody." });
    onOpenChange(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card sm:max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-mono", children: [
        "Edit ",
        entity.id
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Mutation will be appended to the chain-of-custody ledger." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: type, onValueChange: (v) => setType(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "web", children: "Website" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "app", children: "Application" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "platform", children: "Platform" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "domain", children: "Domain" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ip", children: "IP Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "person", children: "Person" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "org", children: "Organization" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Identifier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            required: true,
            value: identifier,
            onChange: (e) => setIdentifier(e.target.value),
            className: "bg-secondary font-mono text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Risk Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-tactical", children: risk[0] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { min: 0, max: 100, step: 1, value: risk, onValueChange: setRisk })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: status, onValueChange: (v) => setStatus(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "grey", children: "Grey — under review" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "black", children: "Black — blocked" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "white", children: "White — cleared" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Reason (required)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            required: true,
            value: reason,
            onChange: (e) => setReason(e.target.value),
            placeholder: "e.g. New evidence from pentest report #341",
            className: "bg-secondary font-mono text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "Save & Sign" })
      ] })
    ] })
  ] }) });
}
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
function EntitiesView() {
  const { role, entities, cases, scans, updateEntityStatus, deleteEntity, startScan, logCustody, lockdown } = useAppState();
  const navigate = useNavigate();
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [editEntity, setEditEntity] = reactExports.useState(null);
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [search, setSearch] = reactExports.useState("");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [riskRange, setRiskRange] = reactExports.useState([0, 100]);
  const [selectedEntity, setSelectedEntity] = reactExports.useState(null);
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const searchRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      const target = e.target;
      const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setSearch("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const hasActiveFilters = typeFilter !== "all" || statusFilter !== "all" || riskRange[0] !== 0 || riskRange[1] !== 100 || search !== "";
  const resetFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setStatusFilter("all");
    setRiskRange([0, 100]);
  };
  const filtered = reactExports.useMemo(() => {
    return entities.filter((e) => {
      if (search && !e.identifier.toLowerCase().includes(search.toLowerCase()) && !e.id.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter !== "all" && e.type !== typeFilter) return false;
      if (statusFilter !== "all" && e.status !== statusFilter) return false;
      if (e.riskScore < riskRange[0] || e.riskScore > riskRange[1]) return false;
      return true;
    });
  }, [entities, search, typeFilter, statusFilter, riskRange]);
  reactExports.useEffect(() => {
    const openAdd = () => setAddOpen(true);
    const exportCsv = () => exportEntitiesToCsv(filtered);
    const openEntity = (ev) => {
      const id = ev.detail?.id;
      const found = entities.find((x) => x.id === id);
      if (found) setSelectedEntity(found);
    };
    window.addEventListener("greylock:open-add-entity", openAdd);
    window.addEventListener("greylock:export-entities", exportCsv);
    window.addEventListener("greylock:open-entity", openEntity);
    return () => {
      window.removeEventListener("greylock:open-add-entity", openAdd);
      window.removeEventListener("greylock:export-entities", exportCsv);
      window.removeEventListener("greylock:open-entity", openEntity);
    };
  }, [entities, filtered]);
  const toggleOne = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleAll = () => {
    if (selectedIds.size === filtered.length) setSelectedIds(/* @__PURE__ */ new Set());
    else setSelectedIds(new Set(filtered.map((e) => e.id)));
  };
  const clearSelection = () => setSelectedIds(/* @__PURE__ */ new Set());
  const bulkPromote = (status) => {
    const ids = Array.from(selectedIds);
    ids.forEach((id) => updateEntityStatus(id, status, `Bulk promotion to ${status.toUpperCase()}`));
    toast.success(`${ids.length} entities → ${status.toUpperCase()}`);
    clearSelection();
  };
  const bulkDelete = () => {
    const ids = Array.from(selectedIds);
    ids.forEach((id) => deleteEntity(id));
    toast.warning(`${ids.length} entities purged`, { description: "Audit events recorded." });
    clearSelection();
  };
  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  const canMutate = role === "analyst" || role === "admin";
  const canDelete = role === "admin";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            ref: searchRef,
            placeholder: "Search entities...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 pr-16 bg-surface font-mono text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block", children: "/" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => setShowFilters(!showFilters),
          className: "gap-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3.5 w-3.5" }),
            "Filters"
          ]
        }
      ),
      hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: resetFilters, className: "gap-1.5 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
        "Clear"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
        filtered.length,
        " / ",
        entities.length,
        " entities"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => exportEntitiesToCsv(filtered),
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
              "Export CSV"
            ]
          }
        ),
        canMutate && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => setAddOpen(true), className: "gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
          "Add Entity"
        ] })
      ] })
    ] }),
    selectedIds.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 rounded-md border border-tactical/40 bg-tactical/5 px-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-tactical", children: [
        selectedIds.size,
        " selected"
      ] }),
      canMutate && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "h-7 gap-1.5", children: [
          "Promote to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onClick: () => bulkPromote("grey"), children: "Grey (review)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onClick: () => bulkPromote("black"), children: "Black (block)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onClick: () => bulkPromote("white"), children: "White (clear)" })
        ] })
      ] }),
      canDelete && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: bulkDelete,
          className: "h-7 gap-1.5 text-destructive hover:text-destructive",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
            "Purge"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: clearSelection, className: "ml-auto h-7 gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
        "Clear"
      ] })
    ] }),
    showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-4 rounded-lg border border-border bg-surface p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: typeFilter, onValueChange: setTypeFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-32 bg-input text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Types" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "web", children: "Website" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "app", children: "Application" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "platform", children: "Platform" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "domain", children: "Domain" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ip", children: "IP Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "person", children: "Person" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "org", children: "Organization" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-28 bg-input text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "grey", children: "Grey" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "black", children: "Black" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "white", children: "White" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: [
          "Risk Score: ",
          riskRange[0],
          " — ",
          riskRange[1]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Slider,
          {
            min: 0,
            max: 100,
            step: 5,
            value: riskRange,
            onValueChange: setRiskRange,
            className: "py-2"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto rounded-lg border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-surface", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-10 px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: filtered.length > 0 && selectedIds.size === filtered.length,
              onCheckedChange: toggleAll,
              "aria-label": "Select all"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: "ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: "Identifier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: "Risk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: "Updated" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((e) => {
          const scannable = ["web", "app", "platform", "domain", "ip"].includes(e.type);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              onClick: () => {
                setSelectedEntity(e);
                logCustody({ entityId: e.id, action: "VIEW", reason: "Detail panel opened" });
              },
              className: `cursor-pointer border-b border-border transition-colors hover:bg-accent ${selectedIds.has(e.id) ? "bg-tactical/5" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", onClick: (ev) => ev.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    checked: selectedIds.has(e.id),
                    onCheckedChange: () => toggleOne(e.id),
                    "aria-label": `Select ${e.id}`
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-tactical", children: e.id }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: e.type }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: e.identifier }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RiskScore, { score: e.riskScore }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: e.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: formatDate(e.lastUpdated) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-7 w-7", onClick: (ev) => {
                    ev.stopPropagation();
                    setSelectedEntity(e);
                    logCustody({ entityId: e.id, action: "VIEW", reason: "Detail panel opened" });
                  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }) }),
                  scannable && canMutate && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-7 w-7 text-tactical",
                      title: "Run vulnerability scan",
                      onClick: (ev) => {
                        ev.stopPropagation();
                        if (lockdown) {
                          toast.error("System locked down");
                          return;
                        }
                        const scan = startScan(e.id, "active");
                        logCustody({ entityId: e.id, action: "SCAN", reason: "Active scan from row action" });
                        toast.success(`Scan ${scan.id} dispatched`, { description: `View results in Scans tab.` });
                        navigate({ to: "/scans" });
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bug, { className: "h-3.5 w-3.5" })
                    }
                  ),
                  canMutate && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-7 w-7",
                      title: "Edit",
                      onClick: (ev) => {
                        ev.stopPropagation();
                        setEditEntity(e);
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                    }
                  ),
                  canDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-7 w-7 text-destructive",
                      onClick: (ev) => {
                        ev.stopPropagation();
                        if (lockdown) {
                          toast.error("System locked down");
                          return;
                        }
                        const reason = prompt(`Reason for purging ${e.id}:`);
                        if (!reason) return;
                        deleteEntity(e.id);
                        logCustody({ entityId: e.id, action: "DELETE", reason });
                        toast.warning(`Purged ${e.id}`, { description: "Chain-of-custody updated." });
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                    }
                  )
                ] }) })
              ]
            },
            e.id
          );
        }) })
      ] }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-2 py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-8 w-8 text-muted-foreground/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground", children: "No entities match the filter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Adjust your query or clear active filters." }),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: resetFilters, className: "mt-2 gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
          "Reset filters"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedEntity, onOpenChange: () => setSelectedEntity(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-2xl bg-card", children: selectedEntity && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex flex-wrap items-center gap-3 font-mono", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-tactical", children: selectedEntity.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: selectedEntity.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: selectedEntity.type }),
          canMutate && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "ml-auto h-7 gap-1.5",
              onClick: () => {
                const target = selectedEntity;
                setSelectedEntity(null);
                setEditEntity(target);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
                "Edit"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: selectedEntity.identifier })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: "Risk Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RiskScore, { score: selectedEntity.riskScore }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: "Last Updated" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-mono text-xs text-muted-foreground", children: formatDate(selectedEntity.lastUpdated) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: "Metadata" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "overflow-auto rounded-md bg-background p-3 font-mono text-xs text-foreground", children: JSON.stringify(selectedEntity.metadata, null, 2) })
        ] }),
        selectedEntity.evidenceRefs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: "Evidence References" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: selectedEntity.evidenceRefs.map((ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-accent px-2 py-1 font-mono text-xs text-accent-foreground", children: ref }, ref)) })
        ] }),
        selectedEntity.statusHistory.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: "Status History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: selectedEntity.statusHistory.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background p-3 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: h.from }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "→" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: h.to }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-muted-foreground", children: formatDate(h.timestamp) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-muted-foreground", children: [
              "by ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-tactical", children: h.changedBy }),
              " — ",
              h.reason
            ] })
          ] }, i)) })
        ] }),
        (() => {
          const linked = cases.filter((c) => c.linkedEntityIds.includes(selectedEntity.id));
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "mb-2 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FolderSearch, { className: "h-3 w-3" }),
              " Linked Cases (",
              linked.length,
              ")"
            ] }),
            linked.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-muted-foreground/60", children: "Not linked to any case." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: linked.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  setSelectedEntity(null);
                  navigate({ to: "/cases" });
                  setTimeout(() => window.dispatchEvent(new CustomEvent("greylock:open-case", { detail: { id: c.id } })), 80);
                },
                className: "flex w-full items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-left text-xs transition-colors hover:border-tactical hover:text-tactical",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-tactical", children: c.id }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-foreground", children: c.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStatusBadge, { status: c.status })
                ]
              },
              c.id
            )) })
          ] });
        })(),
        (() => {
          const own = scans.filter((s) => s.targetEntityId === selectedEntity.id).slice(0, 5);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "mb-2 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bug, { className: "h-3 w-3" }),
              " Recent Scans (",
              own.length,
              ")"
            ] }),
            own.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-muted-foreground/60", children: "No scans run against this target." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: own.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-tactical", children: s.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono uppercase text-muted-foreground", children: s.profile }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono ${s.status === "running" ? "text-tactical" : "text-muted-foreground"}`, children: s.status }),
              s.status === "complete" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto font-mono text-[10px] text-status-black", children: [
                s.summary.critical,
                "C · ",
                s.summary.high,
                "H"
              ] })
            ] }, s.id)) })
          ] });
        })()
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddEntityDialog, { open: addOpen, onOpenChange: setAddOpen }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditEntityDialog, { entity: editEntity, open: !!editEntity, onOpenChange: (v) => !v && setEditEntity(null) })
  ] });
}
function exportEntitiesToCsv(rows) {
  if (rows.length === 0) {
    toast.error("No entities to export");
    return;
  }
  const headers = ["id", "type", "identifier", "riskScore", "status", "lastUpdated"];
  const escape = (v) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [
    headers.join(","),
    ...rows.map(
      (r) => [r.id, r.type, r.identifier, r.riskScore, r.status, r.lastUpdated].map(escape).join(",")
    )
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `greylock-entities-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast.success(`Exported ${rows.length} entities`);
}
function EntitiesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(EntitiesView, {});
}
export {
  EntitiesPage as component
};
