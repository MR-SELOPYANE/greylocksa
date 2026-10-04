import { createFileRoute } from "@tanstack/react-router";
import { ActivityTimelineView } from "@/components/ActivityTimelineView";

export const Route = createFileRoute("/activity")({
  component: ActivityPage,
  head: () => ({
    meta: [
      { title: "Activity Timeline — greyLock" },
      {
        name: "description",
        content: "Unified feed of custody events, scans, and status changes across the platform.",
      },
    ],
  }),
});

function ActivityPage() {
  return <ActivityTimelineView />;
}
