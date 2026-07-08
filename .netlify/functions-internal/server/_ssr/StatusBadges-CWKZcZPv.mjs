import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Badge } from "./badge-BlsWwPaG.mjs";
import { c as cn } from "./router-rFz3Bia9.mjs";
function StatusBadge({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      className: cn(
        "font-mono text-[10px] uppercase tracking-wider border-0",
        status === "grey" && "bg-status-grey text-status-grey-foreground",
        status === "black" && "bg-status-black text-status-black-foreground",
        status === "white" && "bg-status-white text-status-white-foreground"
      ),
      children: status
    }
  );
}
function TypeBadge({ type }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "font-mono text-[10px] uppercase tracking-wider", children: type });
}
function RiskScore({ score }) {
  const color = score >= 80 ? "text-status-black" : score >= 50 ? "text-status-grey" : "text-status-white";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("font-mono text-sm font-bold", color), children: score });
}
function PriorityBadge({ priority }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      className: cn(
        "font-mono text-[10px] uppercase tracking-wider border-0",
        priority === "critical" && "bg-status-black text-status-black-foreground",
        priority === "high" && "bg-status-grey text-status-grey-foreground",
        priority === "medium" && "bg-primary text-primary-foreground",
        priority === "low" && "bg-secondary text-secondary-foreground"
      ),
      children: priority
    }
  );
}
function CaseStatusBadge({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: cn(
        "font-mono text-[10px] uppercase tracking-wider",
        status === "escalated" && "border-status-black text-status-black",
        status === "in_progress" && "border-tactical text-tactical",
        status === "open" && "border-status-grey text-status-grey",
        status === "closed" && "border-status-white text-status-white"
      ),
      children: status.replace("_", " ")
    }
  );
}
export {
  CaseStatusBadge as C,
  PriorityBadge as P,
  RiskScore as R,
  StatusBadge as S,
  TypeBadge as T
};
