import { createFileRoute } from "@tanstack/react-router";
import { SentinelView } from "@/components/SentinelView";

export const Route = createFileRoute("/sentinel")({
  component: SentinelPage,
  head: () => ({
    meta: [
      { title: "Sentinel AI — greyLock" },
      { name: "description", content: "Secure offline AI assistant for intelligence analysis" },
    ],
  }),
});

function SentinelPage() {
  return <SentinelView />;
}
