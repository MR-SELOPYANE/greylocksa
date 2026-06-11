import { createFileRoute } from "@tanstack/react-router";
import { ScansView } from "@/components/ScansView";

export const Route = createFileRoute("/scans")({
  component: ScansPage,
  head: () => ({
    meta: [
      { title: "Scans — greyLock" },
      { name: "description", content: "Run vulnerability scans against tracked targets." },
    ],
  }),
});

function ScansPage() {
  return <ScansView />;
}
