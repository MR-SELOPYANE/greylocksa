import { createFileRoute } from "@tanstack/react-router";
import { ThreatIntelView } from "@/components/ThreatIntelView";

export const Route = createFileRoute("/threats")({
  component: ThreatsPage,
  head: () => ({
    meta: [
      { title: "Threat Intel — greyLock" },
      { name: "description", content: "Live IOC feed auto-correlated against watchlist targets." },
    ],
  }),
});

function ThreatsPage() {
  return <ThreatIntelView />;
}
