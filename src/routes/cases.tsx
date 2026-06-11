import { createFileRoute } from "@tanstack/react-router";
import { CasesView } from "@/components/CasesView";

export const Route = createFileRoute("/cases")({
  component: CasesPage,
  head: () => ({
    meta: [
      { title: "Cases — greyLock" },
      { name: "description", content: "Investigation case management" },
    ],
  }),
});

function CasesPage() {
  return <CasesView />;
}
