import { useEffect, useRef, useState } from "react";
import { useAppState } from "@/lib/store";
import { runPassiveIntel } from "@/lib/passive-intel.functions";
import { Terminal as TermIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Line = { kind: "in" | "out" | "err" | "sys" | "sim"; text: string };

const BANNER = [
  "greyLock // Operator Terminal  v1.0",
  "──────────────────────────────────────────────────────────",
  "Live sources : whois · dns · headers · shodan · virustotal · crt.sh",
  "Simulated    : nmap · nikto · medusa · hydra · sqlmap  (marked [sim])",
  "Active tooling requires the signed scanner-agent (see docs/scanner-agent.md).",
  "Type `help` to list commands.  Ctrl+L to clear.",
  "",
];

const HELP = `
Available commands
  help                       show this help
  clear                      clear the buffer
  history                    recent commands
  targets                    list watchlist targets
  whoami                     current operator / role / clearance

Live intel (real network calls)
  whois     <host>
  dns       <host>
  headers   <host>           HTTP + HTTPS response headers
  shodan    <host|ip>
  vt        <host|ip>        VirusTotal reputation
  crtsh     <domain>         certificate transparency subdomains
  sweep     <host>           full passive OSINT sweep (logs a scan)

Simulated (offline preview of what the agent would return)
  nmap      <flags> <host>
  nikto     -h <host>
  medusa    -h <host> -u <user> -P <wordlist> -M <service>
  hydra     -l <user> -P <wordlist> <host> <service>
  sqlmap    -u <url> [--dbs|--tables|--dump]
`.trim();

function ts() { return new Date().toISOString().slice(11, 19); }

function fakeNmap(args: string): string {
  const host = args.split(/\s+/).filter((a) => !a.startsWith("-")).slice(-1)[0] ?? "target";
  const ports = [
    ["22/tcp",  "open",   "ssh",     "OpenSSH 8.9p1 Ubuntu 3ubuntu0.4"],
    ["80/tcp",  "open",   "http",    "nginx 1.24.0"],
    ["443/tcp", "open",   "https",   "nginx 1.24.0 (TLS 1.3)"],
    ["3306/tcp","filtered","mysql",  ""],
    ["8080/tcp","open",   "http-proxy","Envoy 1.29"],
  ];
  return [
    `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toString()}`,
    `Nmap scan report for ${host}`,
    `Host is up (0.021s latency).`,
    `Not shown: 995 closed tcp ports (reset)`,
    `PORT     STATE    SERVICE     VERSION`,
    ...ports.map((p) => `${p[0].padEnd(9)}${p[1].padEnd(9)}${p[2].padEnd(12)}${p[3]}`),
    ``,
    `Nmap done: 1 IP address (1 host up) scanned in 4.82 seconds`,
  ].join("\n");
}

function fakeNikto(args: string): string {
  const host = args.split(/\s+/).slice(-1)[0] ?? "target";
  return [
    `- Nikto v2.5.0`,
    `+ Target IP:          93.184.216.34`,
    `+ Target Hostname:    ${host}`,
    `+ Target Port:        443`,
    `+ Start Time:         ${new Date().toISOString()}`,
    `+ Server: nginx`,
    `+ /: The X-Content-Type-Options header is not set.`,
    `+ /: The site uses TLS and Strict-Transport-Security is not enforced.`,
    `+ /admin/: Admin login page/section found.`,
    `+ /robots.txt: Entry '/private/' is returned a non-forbidden response.`,
    `+ 8071 requests: 0 error(s) and 4 item(s) reported.`,
  ].join("\n");
}

function fakeMedusa(args: string): string {
  return [
    `Medusa v2.2 [http://foofus.net] (C) JoMo-Kun / Foofus Networks`,
    `ACCOUNT CHECK: [ssh] Host: ${args} User: root Password: 123456 (1/500)`,
    `ACCOUNT CHECK: [ssh] Host: ${args} User: root Password: password (2/500)`,
    `ACCOUNT CHECK: [ssh] Host: ${args} User: root Password: toor (3/500)`,
    `ACCOUNT FOUND: [ssh] Host: ${args} User: admin Password: Summer2024! [SUCCESS]`,
    ``,
    `1 valid credential located.`,
  ].join("\n");
}

function fakeHydra(args: string): string {
  return [
    `Hydra v9.5 (c) 2024 by van Hauser/THC & David Maciejak`,
    `[DATA] max 16 tasks per 1 server, overall 16 tasks, 1400 login tries`,
    `[STATUS] 892.00 tries/min, 892 tries in 00:01h`,
    `[22][ssh] host: target  login: admin  password: Summer2024!`,
    `1 of 1 target successfully completed, 1 valid password found`,
    `(${args})`,
  ].join("\n");
}

function fakeSqlmap(args: string): string {
  return [
    `        ___`,
    `       __H__`,
    ` ___ ___[.]_____ ___ ___  {1.8.3#stable}`,
    `|_ -| . [']     | .'| . |`,
    `|___|_  [.]_|_|_|__,|  _|`,
    `      |_|V...       |_|`,
    ``,
    `[*] starting @ ${ts()}`,
    `[INFO] testing connection to the target URL`,
    `[INFO] GET parameter 'id' appears to be 'AND boolean-based blind' injectable`,
    `[INFO] the back-end DBMS is MySQL`,
    `web application technology: nginx, PHP 8.2`,
    `back-end DBMS: MySQL >= 5.6`,
    `[INFO] fetching database names`,
    `available databases [3]:`,
    `[*] information_schema`,
    `[*] app_prod`,
    `[*] wp_legacy`,
    `[*] ended @ ${ts()}  (args: ${args})`,
  ].join("\n");
}

export function TerminalView() {
  const { operator, role, clearance, entities, logCustody, runPassiveScan, isPassiveEligible, lockdown } = useAppState();
  const [lines, setLines] = useState<Line[]>(() => BANNER.map((t) => ({ kind: "sys" as const, text: t })));
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const push = (kind: Line["kind"], text: string) =>
    setLines((prev) => [...prev, ...text.split("\n").map((t) => ({ kind, text: t }))]);

  const runLive = async (label: string, host: string, pick: (r: Awaited<ReturnType<typeof runPassiveIntel>>) => string) => {
    push("out", `→ ${label} ${host}  (live)`);
    try {
      const r = await runPassiveIntel({ data: { target: host } });
      push("out", pick(r));
    } catch (e) {
      push("err", `× ${label} failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const exec = async (raw: string) => {
    const line = raw.trim();
    if (!line) return;
    push("in", `${operator}@greylock:~$ ${line}`);
    setHistory((h) => [...h, line]);
    setHistIdx(null);

    const [cmd, ...rest] = line.split(/\s+/);
    const args = rest.join(" ");
    const host = rest.find((a) => !a.startsWith("-")) ?? "";

    setBusy(true);
    try {
      switch (cmd.toLowerCase()) {
        case "help": push("sys", HELP); break;
        case "clear": setLines([]); break;
        case "history": push("out", history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join("\n") || "(empty)"); break;
        case "whoami": push("out", `${operator}   role=${role}   clearance=${clearance}   lockdown=${lockdown}`); break;
        case "targets":
          push("out", entities.slice(0, 40).map((e) => `${e.id.padEnd(10)} ${e.status.padEnd(6)} ${e.type.padEnd(9)} ${e.identifier}`).join("\n") || "(no targets)");
          break;

        case "whois":
          if (!host) { push("err", "usage: whois <host>"); break; }
          await runLive("whois", host, (r) => {
            const w = r.report.whois;
            if (!w) return "(no data)";
            return [`registrar: ${w.registrar ?? "—"}`, `created:   ${w.created ?? "—"}`, `updated:   ${w.updated ?? "—"}`, `expires:   ${w.expires ?? "—"}`, `ns:        ${(w.nameservers ?? []).join(", ") || "—"}`, `status:    ${(w.status ?? []).join(", ") || "—"}`].join("\n");
          });
          break;

        case "dns":
          if (!host) { push("err", "usage: dns <host>"); break; }
          await runLive("dns", host, (r) => {
            const d = r.report.dns; if (!d) return "(no data)";
            const rows: string[] = [];
            (["A","AAAA","MX","NS","TXT","CNAME"] as const).forEach((t) => {
              const v = (d as Record<string, string[] | undefined>)[t];
              if (v && v.length) rows.push(`${t.padEnd(6)} ${v.join(", ")}`);
            });
            return rows.join("\n") || "(empty)";
          });
          break;

        case "headers":
          if (!host) { push("err", "usage: headers <host>"); break; }
          await runLive("headers", host, (r) => {
            const h = r.report.http; if (!h) return "(unreachable)";
            const hdrs = Object.entries(h.headers ?? {}).map(([k, v]) => `  ${k}: ${v}`).join("\n") || "  (no headers)";
            return `${h.scheme.toUpperCase()} ${h.status}\n${hdrs}`;
          });
          break;

        case "shodan":
          if (!host) { push("err", "usage: shodan <host|ip>"); break; }
          await runLive("shodan", host, (r) => {
            const s = r.report.shodan; if (!s) return "(no shodan data — key missing or no record)";
            const vulns = Array.isArray(s.vulns) ? s.vulns : Object.keys(s.vulns ?? {});
            return [`ip:    ${s.ip_str ?? "—"}`, `org:   ${s.org ?? "—"}`, `os:    ${s.os ?? "—"}`, `ports: ${(s.ports ?? []).join(", ") || "—"}`, `vulns: ${vulns.join(", ") || "none"}`, `tags:  ${(s.tags ?? []).join(", ") || "—"}`].join("\n");
          });
          break;

        case "vt":
          if (!host) { push("err", "usage: vt <host|ip>"); break; }
          await runLive("vt", host, (r) => {
            const v = r.report.virustotal; if (!v) return "(no vt data — key missing or no record)";
            return `malicious=${v.malicious}  suspicious=${v.suspicious}  harmless=${v.harmless}  undetected=${v.undetected}  reputation=${v.reputation}  asOwner=${v.asOwner ?? "—"}  country=${v.country ?? "—"}`;
          });
          break;

        case "crtsh":
          if (!host) { push("err", "usage: crtsh <domain>"); break; }
          await runLive("crtsh", host, (r) => {
            const s = r.report.subdomains;
            if (!s || !s.count) return "(no certificates)";
            return `${s.count} subdomains discovered\n${s.sample.slice(0, 100).join("\n")}`;
          });
          break;

        case "sweep": {
          if (!host) { push("err", "usage: sweep <host>"); break; }
          if (lockdown) { push("err", "× lockdown active — sweeps disabled"); break; }
          const ent = entities.find((e) => e.identifier.toLowerCase().includes(host.toLowerCase()));
          if (!ent) { push("err", `× no watchlist target matches "${host}". Add it under Targets first.`); break; }
          if (!isPassiveEligible(ent)) { push("err", "× target is not passive-eligible"); break; }
          push("out", `→ passive sweep on ${ent.identifier} (${ent.id}) …`);
          const s = await runPassiveScan(ent.id, { entity: ent, silent: true });
          if (!s) { push("err", "× sweep failed"); break; }
          if (s.status === "failed") { push("err", `× ${s.error ?? "sweep failed"}`); break; }
          push("out", `✓ ${s.id} complete — findings: ${s.summary.critical}C ${s.summary.high}H ${s.summary.medium}M ${s.summary.low}L ${s.summary.info}I`);
          s.findings.slice(0, 12).forEach((f) => push("out", `  [${f.severity.toUpperCase().padEnd(8)}] ${f.title}`));
          break;
        }

        case "nmap":   push("sim", `[sim] active scan — routed through scanner-agent in production.\n${fakeNmap(args)}`); break;
        case "nikto":  push("sim", `[sim] ${fakeNikto(args)}`); break;
        case "medusa": push("sim", `[sim] credential brute force requires written authorization.\n${fakeMedusa(host || "target")}`); break;
        case "hydra":  push("sim", `[sim] ${fakeHydra(args)}`); break;
        case "sqlmap": push("sim", `[sim] ${fakeSqlmap(args)}`); break;

        default:
          push("err", `command not found: ${cmd}    (try \`help\`)`);
      }
      logCustody({ entityId: "TERMINAL", action: "VIEW", reason: `terminal: ${line.slice(0, 160)}` });
    } finally {
      setBusy(false);
      queueMicrotask(() => inputRef.current?.focus());
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") { e.preventDefault(); setLines([]); return; }
    if (e.key === "Enter") {
      e.preventDefault();
      const val = input;
      setInput("");
      void exec(val);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx); setInput(history[idx]);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const idx = histIdx + 1;
      if (idx >= history.length) { setHistIdx(null); setInput(""); }
      else { setHistIdx(idx); setInput(history[idx]); }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <TermIcon className="h-4 w-4 text-tactical" />
        <h1 className="font-mono text-sm font-bold text-foreground">Operator Terminal</h1>
        <span className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">{operator} · {clearance}</span>
        <button
          onClick={() => setLines([])}
          className="ml-auto inline-flex items-center gap-1.5 rounded border border-border bg-surface px-2 py-1 font-mono text-[10px] uppercase text-muted-foreground hover:text-foreground"
        >
          <Trash2 className="h-3 w-3" /> clear
        </button>
      </div>

      <div
        className="h-[70vh] overflow-y-auto rounded-lg border border-border bg-black p-3 font-mono text-[12px] leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className={cn(
              "whitespace-pre-wrap break-words",
              l.kind === "in" && "text-tactical",
              l.kind === "out" && "text-foreground/90",
              l.kind === "err" && "text-destructive",
              l.kind === "sys" && "text-muted-foreground",
              l.kind === "sim" && "text-status-grey",
            )}
          >{l.text || "\u00a0"}</div>
        ))}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-tactical">{operator}@greylock:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            disabled={busy}
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-50"
            placeholder={busy ? "working…" : "type a command — `help` for the list"}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
