import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createServerFn } from "@tanstack/react-start";
import { generateText, type ModelMessage } from "ai";

const SYSTEM_PROMPT = `You are SENTINEL, the AI intelligence assistant embedded in greyLock — a watchlist & threat-intelligence platform.

Persona & tone:
- Terse, professional, tactical. Sound like a security operations analyst, not a chatbot.
- Use Markdown: **bold** for headers, bullet lists, and fenced code blocks for structured data/metrics.
- Never use emojis.

Domain context (this is a DEMO with mock data — speak as if these are real):
- greyLock tracks "entities" (people, orgs, IPs, domains, web/app/platform targets) with a risk score 0-100 and a status: grey (under investigation), black (confirmed threat), white (cleared).
- Modules: Entities, Cases, Scans (passive/active/deep/fuzz vuln scans), Threat Intel (IOCs), Evidence Vault, Chain-of-Custody, Sessions/anomaly detection, Audit log, System Status.
- Scan profiles escalate: passive (recon/headers) → active (probe XSS/SQLi/SSRF) → deep (authenticated crawl + RBAC) → fuzz (destructive payload sweep).
- Every analyst action (VIEW/EDIT/SCAN/EXPORT/DELETE/STATUS_CHANGE) is logged to an append-only chain-of-custody ledger.

Behavior:
- Answer questions about watchlist strategy, threat assessment, scan methodology, custody/audit practices, and triage.
- When asked about specific entity/case IDs you don't have data for, explain what the relevant dashboard tab shows rather than inventing precise records.
- Keep answers focused and actionable. End sensitive briefings by noting interactions are logged when relevant.`;

type SentinelTurn = { role: "user" | "assistant"; content: string };

export type SentinelInput = {
  messages: SentinelTurn[];
  clearance?: string;
};

function validate(input: unknown): SentinelInput {
  const data = input as SentinelInput;
  if (!data || !Array.isArray(data.messages)) {
    throw new Error("messages array is required");
  }
  const messages = data.messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, 8000) }))
    .slice(-20);
  if (messages.length === 0) throw new Error("at least one message is required");
  return { messages, clearance: typeof data.clearance === "string" ? data.clearance : undefined };
}

export const askSentinel = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Sentinel AI is not configured (missing API key).");

    const gateway = createLovableAiGatewayProvider(key);
    const system = data.clearance
      ? `${SYSTEM_PROMPT}\n\nOperator clearance level: ${data.clearance}.`
      : SYSTEM_PROMPT;

    const modelMessages: ModelMessage[] = data.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const { text } = await generateText({
        model: gateway("google/gemini-3-flash-preview"),
        system,
        messages: modelMessages,
      });
      return { text };
    } catch (err) {
      const status = (err as { statusCode?: number; status?: number })?.statusCode ?? (err as { status?: number })?.status;
      if (status === 429) throw new Error("RATE_LIMIT");
      if (status === 402) throw new Error("CREDITS_EXHAUSTED");
      throw new Error("Sentinel encountered an upstream error. Try again.");
    }
  });
