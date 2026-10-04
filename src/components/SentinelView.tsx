import { useState, useRef, useEffect, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askSentinel } from "@/lib/sentinel.functions";
import { useAppState } from "@/lib/store";
import { toast } from "sonner";
import type { ChatMessage } from "@/lib/types";
import { Timestamp } from "@/components/Timestamp";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Send, Trash2, FileText, Lock, Copy, RotateCcw, Download, Sparkles } from "lucide-react";

const MAX_INPUT = 2000;

const SUGGESTED_PROMPTS = [
  "Give me a current threat assessment summary.",
  "Which scan profile should I run on a new web target?",
  "Explain the chain-of-custody model and why it matters.",
  "Summarize this week's watchlist triage priorities.",
];

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function renderMarkdown(content: string) {
  return content.split(/(\*\*.*?\*\*|`[^`]+`|```[\s\S]*?```)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("```") && part.endsWith("```")) {
      const code = part.slice(3, -3).replace(/^\w+\n/, "");
      return (
        <pre key={i} className="my-2 overflow-x-auto rounded bg-background p-2 text-[11px]">
          {code}
        </pre>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-background px-1 py-0.5 text-tactical">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function SentinelView() {
  const { clearance } = useAppState();
  const callSentinel = useServerFn(askSentinel);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "sys-0",
      role: "system",
      content:
        "**SENTINEL AI Assistant** — Clearance: " +
        clearance +
        "\n\nLive AI analysis mode active. Ask about watchlist strategy, threat assessment, scans, or custody. Type `help` for guidance.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDenial, setShowDenial] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const classifiedKeywords = ["launch", "nuke", "classified", "top secret", "ts/sci"];
  const isEmptyConversation = messages.filter((m) => m.role !== "system").length === 0;
  const overLimit = input.length > MAX_INPUT;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Auto-grow the composer textarea.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  const requestCompletion = useCallback(
    async (convo: ChatMessage[]) => {
      setIsTyping(true);
      const history = convo
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-20)
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

      try {
        const { text } = await callSentinel({ data: { messages: history, clearance } });
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            role: "assistant",
            content: text,
            timestamp: new Date().toISOString(),
            approvalStatus: "approved",
          },
        ]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "";
        const friendly =
          msg === "RATE_LIMIT"
            ? "Rate limit reached. Wait a moment and try again."
            : msg === "CREDITS_EXHAUSTED"
              ? "AI credits exhausted. Add credits in your workspace settings to continue."
              : "Sentinel could not reach the AI service. Try again.";
        toast.error(friendly);
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            role: "system",
            content: "**Connection error** — " + friendly,
            timestamp: new Date().toISOString(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [callSentinel, clearance],
  );

  const submitQuery = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed || isTyping) return;
      if (trimmed.length > MAX_INPUT) {
        toast.error(`Query too long. Keep it under ${MAX_INPUT} characters.`);
        return;
      }
      if (classifiedKeywords.some((k) => trimmed.toLowerCase().includes(k))) {
        setShowDenial(true);
        return;
      }

      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: trimmed,
        timestamp: new Date().toISOString(),
      };
      setInput("");
      setMessages((prev) => {
        const next = [...prev, userMsg];
        void requestCompletion(next);
        return next;
      });
    },
    [isTyping, requestCompletion],
  );

  const handleRegenerate = useCallback(() => {
    if (isTyping) return;
    const lastUserIndex = [...messages].reverse().findIndex((m) => m.role === "user");
    if (lastUserIndex === -1) return;
    const cutIndex = messages.length - 1 - lastUserIndex;
    const trimmedConvo = messages.slice(0, cutIndex + 1);
    setMessages(trimmedConvo);
    void requestCompletion(trimmedConvo);
  }, [isTyping, messages, requestCompletion]);

  const handleCopy = useCallback((content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Could not copy"));
  }, []);

  const handleExport = useCallback(() => {
    const transcript = messages
      .map((m) => {
        const stamp = new Date(m.timestamp).toLocaleString();
        return `### ${m.role.toUpperCase()} — ${stamp}\n\n${m.content}`;
      })
      .join("\n\n---\n\n");
    const header = `# SENTINEL Transcript\n\nClearance: ${clearance}\nExported: ${new Date().toLocaleString()}\n\n---\n\n`;
    const blob = new Blob([header + transcript], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sentinel-transcript-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Transcript exported");
  }, [messages, clearance]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitQuery(input);
    }
    if (e.key === "Escape") {
      setInput("");
    }
  };

  const auditEntries = messages.filter((m) => m.role !== "system").slice(-10);
  const canRegenerate = !isTyping && messages.some((m) => m.role === "user");

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-status-white animate-pulse-glow" />
          <span className="font-mono text-sm font-bold tracking-wider text-card-foreground">
            SENTINEL
          </span>
          <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">
            <Lock className="mr-1 h-2.5 w-2.5" />
            {clearance}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={handleRegenerate}
            disabled={!canRegenerate}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Regenerate
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={handleExport}
            disabled={isEmptyConversation}
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <FileText className="h-3.5 w-3.5" />
                Audit
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] bg-card">
              <SheetHeader>
                <SheetTitle className="font-mono">Audit Trail</SheetTitle>
                <SheetDescription>Last 10 AI interactions</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                {auditEntries.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-md border border-border bg-background p-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-mono text-[10px] uppercase">
                        {m.role}
                      </Badge>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        <Timestamp iso={m.timestamp} format="clock" />
                      </span>
                    </div>
                    <p className="mt-1.5 text-muted-foreground line-clamp-2">
                      {m.content.slice(0, 100)}...
                    </p>
                    <div className="mt-1.5 flex gap-2">
                      {m.redactedTags?.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-status-grey/20 px-1.5 py-0.5 font-mono text-[9px] text-status-grey"
                        >
                          {t}
                        </span>
                      ))}
                      {m.approvalStatus && (
                        <span className="rounded bg-status-white/20 px-1.5 py-0.5 font-mono text-[9px] text-status-white">
                          {m.approvalStatus}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {auditEntries.length === 0 && (
                  <p className="text-center text-xs text-muted-foreground">No interactions yet.</p>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => setMessages((prev) => [prev[0]])}
            disabled={isEmptyConversation}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`group flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-tactical text-tactical-foreground"
                    : msg.role === "system"
                      ? "border border-border bg-surface text-surface-foreground"
                      : "bg-accent text-accent-foreground"
                }`}
              >
                <div className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
                  {renderMarkdown(msg.content)}
                </div>
                <div className="mt-1 flex items-center justify-end gap-2">
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => handleCopy(msg.content)}
                      className="opacity-0 transition-opacity group-hover:opacity-60 hover:!opacity-100"
                      aria-label="Copy message"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  )}
                  <span className="font-mono text-[9px] opacity-50">
                    <Timestamp iso={msg.timestamp} format="clock" />
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Suggested prompts when conversation is fresh */}
          {isEmptyConversation && !isTyping && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                Suggested queries
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => submitQuery(p)}
                    className="rounded-md border border-border bg-surface px-3 py-2 text-left font-mono text-xs text-surface-foreground transition-colors hover:border-tactical hover:bg-accent"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-accent px-4 py-3">
                <div className="flex gap-1">
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-glow"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-glow"
                    style={{ animationDelay: "200ms" }}
                  />
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-glow"
                    style={{ animationDelay: "400ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Enter command... (Enter to send, Shift+Enter for newline)"
            className={`max-h-40 min-h-[40px] flex-1 resize-none bg-surface font-mono text-sm ${
              overLimit ? "border-status-black focus-visible:ring-status-black" : ""
            }`}
          />
          <Button
            onClick={() => submitQuery(input)}
            disabled={!input.trim() || isTyping || overLimit}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-[10px] font-mono text-muted-foreground">
            Enter: send · Shift+Enter: newline · Esc: clear · All interactions logged
          </p>
          <span
            className={`font-mono text-[10px] ${overLimit ? "text-status-black" : "text-muted-foreground"}`}
          >
            {input.length}/{MAX_INPUT}
          </span>
        </div>
      </div>

      {/* Denial Modal */}
      <Dialog open={showDenial} onOpenChange={setShowDenial}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-mono text-status-black">
              <Lock className="h-5 w-5" />
              Access Denied
            </DialogTitle>
            <DialogDescription>
              This query references classified material above your current clearance level. The
              request has been logged and cannot be processed in this session.
            </DialogDescription>
          </DialogHeader>
          <Button variant="outline" onClick={() => setShowDenial(false)} className="mt-2">
            Acknowledged
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
