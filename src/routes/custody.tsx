import { createFileRoute } from "@tanstack/react-router";
import { CustodyView } from "@/components/CustodyView";

export const Route = createFileRoute("/custody")({
  component: CustodyPage,
  head: () => ({
    meta: [
      { title: "Chain of Custody — greyLock" },
      { name: "description", content: "Append-only access ledger for investigative integrity." },
    ],
  }),
});

function CustodyPage() {
  return <CustodyView />;
}
