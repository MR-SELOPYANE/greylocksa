import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { I as Input } from "./input-CIbZo0CB.mjs";
import { u as useAppState, A as AuthShell, c as cn } from "./router-rFz3Bia9.mjs";
import "../_libs/sonner.mjs";
import { W as Wrench, p as ShieldCheck, u as ArrowRight } from "../_libs/lucide-react.mjs";
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
function SignupPage() {
  const navigate = useNavigate();
  const {
    provisionRole,
    setOperator,
    setClearance
  } = useAppState();
  const [loading, setLoading] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [role, setRoleLocal] = reactExports.useState("analyst");
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    provisionRole(role);
    setOperator(name.trim() || (role === "admin" ? "admin.you" : "analyst.you"));
    setClearance(role === "admin" ? "SECRET" : "CONFIDENTIAL");
    setTimeout(() => navigate({
      to: role === "admin" ? "/system" : "/entities"
    }), 600);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthShell, { title: "Onboarding", subtitle: "Provision a new operator account.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full Name / Callsign", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: name, onChange: (e) => setName(e.target.value), placeholder: "J. Doe", className: "bg-secondary font-mono text-sm" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Work Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", required: true, placeholder: "you@org.io", autoComplete: "username", className: "bg-secondary font-mono text-sm" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RoleCard, { active: role === "analyst", onClick: () => setRoleLocal("analyst"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4" }), title: "Analyst", desc: "Run scans, triage findings, edit targets, work cases." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RoleCard, { active: role === "admin", onClick: () => setRoleLocal("admin"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }), title: "Admin", desc: "All analyst powers + purge, lockdown, audit, system controls." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Passphrase", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", required: true, placeholder: "min. 12 characters", autoComplete: "new-password", className: "bg-secondary font-mono text-sm" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 pt-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", required: true, className: "mt-0.5 h-3 w-3 rounded border-border bg-secondary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "I acknowledge that every action is signed into the chain-of-custody ledger per the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-tactical hover:underline", children: "Operator Use Policy" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: loading, className: "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60", children: [
        loading ? "Provisioning…" : `Enter as ${role === "admin" ? "Admin" : "Analyst"}`,
        !loading && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: [
      "Already onboarded?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-tactical hover:underline", children: "Sign in" })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
    children
  ] });
}
function RoleCard({
  active,
  onClick,
  icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: cn("rounded-md border p-3 text-left transition-colors", active ? "border-tactical bg-tactical/10" : "border-border bg-secondary hover:border-tactical/50"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-tactical", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold uppercase tracking-wider", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px] leading-snug text-muted-foreground", children: desc })
  ] });
}
export {
  SignupPage as component
};
