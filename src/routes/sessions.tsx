import { createFileRoute } from "@tanstack/react-router";
import { SessionsView } from "@/components/SessionsView";

export const Route = createFileRoute("/sessions")({
  component: SessionsPage,
  head: () => ({
    meta: [
      { title: "Sessions — greyLock" },
      { name: "description", content: "Active session monitor with anomaly detection." },
    ],
  }),
});

function SessionsPage() {
  return <SessionsView />;
}
