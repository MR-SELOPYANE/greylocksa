import { createFileRoute } from "@tanstack/react-router";
import { EntitiesView } from "@/components/EntitiesView";

export const Route = createFileRoute("/entities")({
  component: EntitiesPage,
  head: () => ({
    meta: [
      { title: "Entities — greyLock" },
      { name: "description", content: "Watchlist entity management and intelligence system" },
    ],
  }),
});

function EntitiesPage() {
  return <EntitiesView />;
}
