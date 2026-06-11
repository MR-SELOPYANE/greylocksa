import { useState, useRef, useEffect, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askSentinel } from "@/lib/sentinel.functions";
import { useAppState } from "@/lib/store";
import { toast } from "sonner";
import type { ChatMessage } from "@/lib/types";
import { Input } from "@/components/ui/input";
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
import { Send, Trash2, FileText, Lock } from "lucide-react";

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export function SentinelView() {
  const { clearance } = useAppState();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "sys-0",
      role: "system",
      content: "**SENTINEL AI Assistant** — Clearance: " + clearance + "\n\nLocal processing mode active. No external API calls. Type `help` for available commands.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDenial, setShowDenial] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const classifiedKeywords = ["launch", "nuke", "classified", "top secret", "ts/sci"];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

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
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getMockResponse(trimmed);
      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
        redactedTags: Math.random() > 0.5 ? ["FOUO"] : undefined,
        approvalStatus: "approved",
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSend();
    }
    if (e.key === "Escape") {
      setInput("");
    }
  };

  const auditEntries = messages.filter((m) => m.role !== "system").slice(-10);

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-status-white animate-pulse-glow" />
          <span className="font-mono text-sm font-bold tracking-wider text-card-foreground">SENTINEL</span>
          <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">
            <Lock className="mr-1 h-2.5 w-2.5" />
            {clearance}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
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
                  <div key={m.id} className="rounded-md border border-border bg-background p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-mono text-[10px] uppercase">{m.role}</Badge>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {new Date(m.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="mt-1.5 text-muted-foreground line-clamp-2">{m.content.slice(0, 100)}...</p>
                    <div className="mt-1.5 flex gap-2">
                      {m.redactedTags?.map((t) => (
                        <span key={t} className="rounded bg-status-grey/20 px-1.5 py-0.5 font-mono text-[9px] text-status-grey">{t}</span>
                      ))}
                      {m.approvalStatus && (
                        <span className="rounded bg-status-white/20 px-1.5 py-0.5 font-mono text-[9px] text-status-white">{m.approvalStatus}</span>
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
            onClick={() => setMessages([messages[0]])}
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
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
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
                  {msg.content.split(/(\*\*.*?\*\*|`[^`]+`|```[\s\S]*?```)/g).map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return <strong key={i}>{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith("```") && part.endsWith("```")) {
                      const code = part.slice(3, -3).replace(/^\w+\n/, "");
                      return <pre key={i} className="my-2 rounded bg-background p-2 text-[11px]">{code}</pre>;
                    }
                    if (part.startsWith("`") && part.endsWith("`")) {
                      return <code key={i} className="rounded bg-background px-1 py-0.5 text-tactical">{part.slice(1, -1)}</code>;
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </div>
                <div className="mt-1 text-right font-mono text-[9px] opacity-50">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-accent px-4 py-3">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-glow" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-glow" style={{ animationDelay: "200ms" }} />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-glow" style={{ animationDelay: "400ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter command... (Ctrl+Enter to send)"
            className="flex-1 bg-surface font-mono text-sm"
          />
          <Button onClick={handleSend} disabled={!input.trim() || isTyping} size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-1.5 text-[10px] font-mono text-muted-foreground">
          Ctrl+Enter: send · Esc: clear · All interactions logged
        </p>
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
              This query references classified material above your current clearance level.
              The request has been logged and cannot be processed in this session.
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
