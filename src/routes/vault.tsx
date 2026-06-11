import { createFileRoute } from "@tanstack/react-router";
import { EvidenceVaultView } from "@/components/EvidenceVaultView";

export const Route = createFileRoute("/vault")({
  component: VaultPage,
  head: () => ({
    meta: [
      { title: "Evidence Vault — greyLock" },
      { name: "description", content: "Sealed evidence with SHA-256 integrity and honeytoken alerts." },
    ],
  }),
});

function VaultPage() {
  return <EvidenceVaultView />;
}
