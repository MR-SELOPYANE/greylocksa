import { createFileRoute } from "@tanstack/react-router";
import { SentinelView } from "@/components/SentinelView";

export const Route = createFileRoute("/sentinel")({
  component: SentinelPage,
  head: () => ({
    meta: [
      { title: "Sentinel AI — greyLock" },
      {
        name: "description",
        content: "Live AI assistant for intelligence analysis and threat triage",
      },
    ],
  }),
});

function SentinelPage() {
  return <SentinelView />;
}
