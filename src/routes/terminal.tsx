import { createFileRoute } from "@tanstack/react-router";
import { TerminalView } from "@/components/TerminalView";

export const Route = createFileRoute("/terminal")({
  component: TerminalPage,
  head: () => ({
    meta: [
      { title: "Terminal — greyLock" },
      { name: "description", content: "Operator terminal for live OSINT sweeps and pen-test tooling." },
    ],
  }),
});

function TerminalPage() {
  return <TerminalView />;
}
