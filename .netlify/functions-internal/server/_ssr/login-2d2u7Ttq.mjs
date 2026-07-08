import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { I as Input } from "./input-CIbZo0CB.mjs";
import { u as useAppState, c as cn } from "./router-rFz3Bia9.mjs";
import "../_libs/sonner.mjs";
import { f as Shield, L as Lock, W as Wrench, p as ShieldCheck, u as ArrowRight } from "../_libs/lucide-react.mjs";
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
function LoginPage() {
  const navigate = useNavigate();
  const {
    provisionRole,
    setClearance,
    setOperator
  } = useAppState();
  const [loading, setLoading] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [role, setRoleLocal] = reactExports.useState("analyst");
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const normalizedEmail = email.trim().toLowerCase();
    provisionRole(role);
    setOperator(normalizedEmail || (role === "admin" ? "admin.you" : "analyst.you"));
    setClearance(role === "admin" ? "SECRET" : "CONFIDENTIAL");
    setTimeout(() => navigate({
      to: "/system"
    }), 600);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthShell, { title: "Operator Sign-In", subtitle: "Authenticate to access the console.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Operator ID / Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "analyst@agency.gov", autoComplete: "username", className: "bg-secondary font-mono text-sm" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Access tier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RoleCard, { active: role === "analyst", onClick: () => setRoleLocal("analyst"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4" }), title: "Analyst", desc: "Targets, scans, cases, and triage tools." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RoleCard, { active: role === "admin", onClick: () => setRoleLocal("admin"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }), title: "Admin", desc: "Audit, sessions, system controls, and lockdown." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Passphrase", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", required: true, placeholder: "••••••••••••", autoComplete: "current-password", className: "bg-secondary font-mono text-sm" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "h-3 w-3 rounded border-border bg-secondary" }),
          "Trusted terminal"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-xs text-tactical hover:underline", children: "Reset passphrase" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: loading, className: "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60", children: [
        loading ? "Authenticating…" : "Sign In",
        !loading && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: [
      "No account?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "text-tactical hover:underline", children: "Request access" })
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
function AuthShell({
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.65_0.15_220/0.10),transparent_60%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,oklch(0.25_0.02_250/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.25_0.02_250/0.3)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-8 flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-6 w-6 text-tactical" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-base font-bold tracking-wider", children: "greyLock" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card/90 p-6 shadow-2xl backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-mono text-lg font-bold", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: subtitle })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded border border-border px-2 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3 text-status-white" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] uppercase tracking-widest text-muted-foreground", children: "Secure" })
          ] })
        ] }),
        children
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "All access attempts are logged" })
    ] })
  ] });
}
export {
  AuthShell,
  LoginPage as component
};
