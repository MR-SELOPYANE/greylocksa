import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./index.mjs";
import { c as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
import { g as generateText } from "../_libs/ai.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { h as objectType, k as stringType, q as enumType, m as arrayType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function createLovableAiGatewayProvider(lovableApiKey) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": lovableApiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk"
    }
  });
}
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
const sentinelTurnSchema = objectType({
  role: enumType(["user", "assistant"]),
  content: stringType().trim().min(1).max(8e3)
});
const sentinelInputSchema = objectType({
  messages: arrayType(sentinelTurnSchema).min(1).max(20),
  clearance: enumType(["UNCLASSIFIED", "CONFIDENTIAL", "SECRET"]).optional()
});
const askSentinel_createServerFn_handler = createServerRpc({
  id: "46976752a79ad20314a277635f85391ade236fe1dbd4dc85013e5e1867526df8",
  name: "askSentinel",
  filename: "src/lib/sentinel.functions.ts"
}, (opts) => askSentinel.__executeServer(opts));
const askSentinel = createServerFn({
  method: "POST"
}).inputValidator((input) => sentinelInputSchema.parse(input)).handler(askSentinel_createServerFn_handler, async ({
  data
}) => {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Sentinel AI is not configured (missing API key).");
  const gateway = createLovableAiGatewayProvider(key);
  const system = data.clearance ? `${SYSTEM_PROMPT}

Operator clearance level: ${data.clearance}.` : SYSTEM_PROMPT;
  const modelMessages = data.messages.map((m) => ({
    role: m.role,
    content: m.content
  }));
  try {
    const {
      text
    } = await generateText({
      model: gateway("google/gemini-3-flash-preview"),
      system,
      messages: modelMessages
    });
    return {
      text
    };
  } catch (err) {
    const status = err?.statusCode ?? err?.status;
    if (status === 429) throw new Error("RATE_LIMIT");
    if (status === 402) throw new Error("CREDITS_EXHAUSTED");
    throw new Error("Sentinel encountered an upstream error. Try again.");
  }
});
export {
  askSentinel_createServerFn_handler
};
