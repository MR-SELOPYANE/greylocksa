import { useEffect, useRef, useState } from "react";
import { useAppState } from "@/lib/store";
import { runPassiveIntel } from "@/lib/passive-intel.functions";
import { Terminal as TermIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Line = { kind: "in" | "out" | "err" | "sys" | "sim" | "kali" | "ok"; text: string };

const KALI_ART = [
  '....::::::::::::...       greyLock OS 1.0 (rolling) "watchtower"',
  " ..:::::::::::::::::..    Kernel: 6.8.11-greylock-amd64",
  "    .::::::::::::::.      Mode:   passive-recon compliment to Kali",
  "       .::::::::.         Shell:  greylock-sh (kali-compatible verbs)",
];

const BANNER = (op: string) => [
  ...KALI_ART,
  "",
  `Logged in as ${op}. Live sources: whois · dns · headers · shodan · virustotal · crt.sh`,
  "Kali-tool verbs (nmap, msfconsole, hydra, sqlmap…) run in [sim] preview —",
  "active tooling requires the signed scanner-agent (docs/scanner-agent.md).",
  "Type `help` for the tool index. Ctrl+L clears.",
  "",
];

const HELP = `
tool index — kali-style verbs over greyLock data

  core
    help | clear | history | whoami | id | uname | pwd | ls
    targets                     list watchlist targets
    cat targets.txt             dump watchlist to stdout

  live recon (real network calls)
    whois <host>                registrar / dates / ns via RDAP
    dns <host>                  A AAAA MX NS TXT CNAME via DoH
    headers <host>              HTTP+HTTPS security headers
    shodan <host|ip>            exposed services + CVEs
    vt <host|ip>                VirusTotal reputation
    crtsh <domain>              cert-transparency subdomains
    sweep <host>                full passive OSINT sweep (logged)

  kali toolbelt (simulated [sim])
    nmap <flags> <host>         port/service scan
    nikto -h <host>             web server audit
    gobuster dir -u <host>      directory brute force
    whatweb <host>              fingerprint web stack
    theharvester -d <domain>    emails / subdomains / hosts
    dnsenum <domain>            zone walk + records
    subfinder -d <domain>       passive subdomain enum
    msfconsole                  drop into metasploit preview
    searchsploit <term>         exploit-db lookup
    hydra -l <u> -P <wl> <h>    ssh brute force
    medusa -h <h> -M ssh        parallel login audit
    john <hashfile>             password cracking
    hashcat -m 0 <hash>         gpu hash cracking
    sqlmap -u <url>             sql-injection automation
    wpscan --url <host>         wordpress scan
    aircrack-ng <cap>           wifi handshake crack
    enum4linux <host>           smb enumeration
`.trim();

function ts() {
  return new Date().toISOString().slice(11, 19);
}

function fakeNmap(args: string): string {
  const host =
    args
      .split(/\s+/)
      .filter((a) => !a.startsWith("-"))
      .slice(-1)[0] ?? "target";
  const ports = [
    ["22/tcp", "open", "ssh", "OpenSSH 8.9p1 Ubuntu 3ubuntu0.4"],
    ["80/tcp", "open", "http", "nginx 1.24.0"],
    ["443/tcp", "open", "https", "nginx 1.24.0 (TLS 1.3)"],
    ["3306/tcp", "filtered", "mysql", ""],
    ["8080/tcp", "open", "http-proxy", "Envoy 1.29"],
  ];
  return [
    `Starting Nmap 7.94SVN ( https://nmap.org ) at ${new Date().toString()}`,
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

function fakeGobuster(args: string): string {
  const host = args.split(/\s+/).slice(-1)[0] ?? "target";
  return [
    `===============================================================`,
    `Gobuster v3.6`,
    `by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)`,
    `===============================================================`,
    `[+] Url:                     https://${host}`,
    `[+] Method:                  GET`,
    `[+] Threads:                 10`,
    `[+] Wordlist:                /usr/share/wordlists/dirb/common.txt`,
    `===============================================================`,
    `/admin                (Status: 301) [Size: 169]`,
    `/assets               (Status: 301) [Size: 169]`,
    `/backup               (Status: 403) [Size: 277]`,
    `/login                (Status: 200) [Size: 3417]`,
    `/robots.txt           (Status: 200) [Size: 112]`,
    `/server-status        (Status: 403) [Size: 277]`,
    `===============================================================`,
    `Finished`,
  ].join("\n");
}

function fakeWhatweb(args: string): string {
  const host = args.split(/\s+/).slice(-1)[0] ?? "target";
  return `https://${host} [200 OK] Country[UNITED STATES][US], HTML5, HTTPServer[nginx/1.24.0], IP[93.184.216.34], MetaGenerator[Next.js], PoweredBy[React 19], Script[module], Title[${host}], X-Powered-By[Vercel], nginx[1.24.0]`;
}

function fakeHarvester(args: string): string {
  const domain =
    args.split(/\s+/).find((a, i) => i > 0 && args.split(/\s+/)[i - 1] === "-d") ??
    args
      .split(/\s+/)
      .filter((a) => !a.startsWith("-"))
      .slice(-1)[0] ??
    "target.tld";
  return [
    `[*] Target: ${domain}`,
    ``,
    `[*] Searching 500 results across crt.sh, hackertarget, rapiddns…`,
    `[+] Emails found (3):`,
    `    admin@${domain}`,
    `    security@${domain}`,
    `    dev.ops@${domain}`,
    `[+] Hosts found (5):`,
    `    www.${domain}: 93.184.216.34`,
    `    mail.${domain}: 93.184.216.35`,
    `    vpn.${domain}: 93.184.216.40`,
    `    git.${domain}: 93.184.216.51`,
    `    staging.${domain}: 93.184.216.60`,
  ].join("\n");
}

function fakeDnsenum(domain: string): string {
  return [
    `dnsenum VERSION:1.3.1`,
    ``,
    `-----   ${domain}   -----`,
    `Host's addresses:`,
    `${domain.padEnd(40)} 300 IN A 93.184.216.34`,
    `Name Servers:`,
    `ns1.${domain.padEnd(34)} 172800 IN A 198.51.100.53`,
    `ns2.${domain.padEnd(34)} 172800 IN A 198.51.100.54`,
    `Mail (MX) Servers:`,
    `mail.${domain.padEnd(36)} 300 IN A 93.184.216.35`,
    `Trying Zone Transfers and getting Bind Versions:`,
    `Zone Transfer failed (REFUSED) — server hardened.`,
  ].join("\n");
}

function fakeSubfinder(domain: string): string {
  return [
    `[INF] Current subfinder version v2.6.6`,
    `[INF] Loading provider config from ~/.config/subfinder/provider-config.yaml`,
    ...["www", "api", "dev", "staging", "mail", "vpn", "grafana", "jenkins"].map(
      (s) => `${s}.${domain}`,
    ),
    `[INF] Found 8 subdomains for ${domain} in 3 seconds`,
  ].join("\n");
}

function fakeMsf(): string {
  return [
    `      =[ metasploit v6.4.15-dev                          ]`,
    `+ -- --=[ 2440 exploits - 1245 auxiliary - 422 post       ]`,
    `+ -- --=[ 1468 payloads - 47 encoders - 11 nops           ]`,
    `+ -- --=[ 9 evasion                                       ]`,
    ``,
    `Metasploit Documentation: https://docs.metasploit.com/`,
    ``,
    `[sim] This is a preview shell. Live exploitation requires the signed`,
    `[sim] scanner-agent and written authorization on file. No modules loaded.`,
    ``,
    `msf6 > exit`,
    `[*] Stopping the Metasploit Framework console...`,
  ].join("\n");
}

function fakeSearchsploit(term: string): string {
  return [
    `-----------------------------------------------------------------  ---------------------------------`,
    ` Exploit Title                                                   |  Path`,
    `-----------------------------------------------------------------  ---------------------------------`,
    `Apache 2.4.49 - Path Traversal (RCE)                              |  linux/remote/50383.sh`,
    `nginx 1.20 - Alias Traversal Misconfiguration                     |  multiple/remote/50130.py`,
    `OpenSSH 8.9 - Username Enumeration                                |  linux/remote/45939.py`,
    `WordPress Plugin Contact Form 7 5.7 - SQL Injection               |  php/webapps/51250.txt`,
    `-----------------------------------------------------------------  ---------------------------------`,
    `Shellcodes: No Results`,
    `[*] query: ${term || "(all)"}`,
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

function fakeJohn(args: string): string {
  return [
    `Loaded 3 password hashes (sha512crypt, crypt(3) $6$ [SHA512 512/512 AVX2 8x])`,
    `Cost 1 (iteration count) is 5000 for all loaded hashes`,
    `Press 'q' or Ctrl-C to abort, almost any other key for status`,
    `hunter2          (ops)`,
    `letmein          (dev)`,
    `2g 0:00:01:14 DONE 0.02740g/s 4213p/s 8431c/s`,
    `Session completed. (${args})`,
  ].join("\n");
}

function fakeHashcat(args: string): string {
  return [
    `hashcat (v6.2.6) starting`,
    ``,
    `OpenCL API (OpenCL 3.0) - Platform #1 [NVIDIA Corporation]`,
    `* Device #1: GeForce RTX 4090, 24560 MiB`,
    ``,
    `5f4dcc3b5aa765d61d8327deb882cf99:password`,
    `e10adc3949ba59abbe56e057f20f883e:123456`,
    ``,
    `Recovered........: 2/2 (100.00%) Digests`,
    `Status...........: Cracked   (${args})`,
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

function fakeWpscan(args: string): string {
  const host = args.split(/\s+/).slice(-1)[0] ?? "target";
  return [
    `_______________________________________________________________`,
    `        __          _______   _____`,
    `        \\ \\        / /  __ \\ / ____|`,
    `         \\ \\  /\\  / /| |__) | (___   ___  __ _ _ __ ®`,
    `          \\ \\/  \\/ / |  ___/ \\___ \\ / __|/ _\` | '_ \\`,
    `           \\  /\\  /  | |     ____) | (__| (_| | | | |`,
    `            \\/  \\/   |_|    |_____/ \\___|\\__,_|_| |_|`,
    ``,
    `[i] Scanning: https://${host}`,
    `[+] WordPress version 6.5.3 identified (Insecure, 2 releases behind)`,
    `[+] 2 plugins identified: contact-form-7 5.7 (vuln), akismet 5.3`,
    `[+] XML-RPC enabled: https://${host}/xmlrpc.php`,
    `[!] 1 vulnerability in contact-form-7: CVE-2024-XXXX SQLi`,
    `[+] Finished in 8.3s`,
  ].join("\n");
}

function fakeAircrack(args: string): string {
  return [
    `Opening ${args || "capture.cap"}`,
    `Read 182341 packets.`,
    ``,
    `   #  BSSID              ESSID                     Encryption`,
    `   1  00:14:6C:7E:40:80  CORP-SECURE               WPA (1 handshake)`,
    ``,
    `Index 1 chosen.`,
    `                               Aircrack-ng 1.7`,
    `      [00:00:32] 68422/9822769 keys tested (2135.66 k/s)`,
    ``,
    `      KEY FOUND! [ corp-wifi-2024! ]`,
    ``,
    `      Master Key     : 3F 9A ... (redacted)`,
  ].join("\n");
}

function fakeEnum4linux(host: string): string {
  return [
    `Starting enum4linux v0.9.1 ( http://labs.portcullis.co.uk )`,
    `================( Target ${host || "10.0.0.5"} )================`,
    `[+] Server 10.0.0.5 allows sessions using username '', password ''`,
    `[+] Domain: WORKGROUP`,
    `[+] Shares: IPC$, ADMIN$, shared_docs (READ ONLY)`,
    `[+] Users via RID cycling: Administrator, Guest, svc-backup, jdoe`,
    `[+] Password policy: min length 7, lockout 5, no complexity`,
  ].join("\n");
}

export function TerminalView() {
  const {
    operator,
    role,
    clearance,
    entities,
    logCustody,
    runPassiveScan,
    isPassiveEligible,
    lockdown,
  } = useAppState();
  const [lines, setLines] = useState<Line[]>(() =>
    BANNER(operator).map((t) => ({ kind: "sys" as const, text: t })),
  );
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const promptTop = `┌──(${operator}㉿greylock)-[~]`;
  const promptBot = `└─$`;

  const push = (kind: Line["kind"], text: string) =>
    setLines((prev) => [...prev, ...text.split("\n").map((t) => ({ kind, text: t }))]);

  const pushEcho = (line: string) =>
    setLines((prev) => [
      ...prev,
      { kind: "kali", text: promptTop },
      { kind: "in", text: `${promptBot} ${line}` },
    ]);

  const runLive = async (
    label: string,
    host: string,
    pick: (r: Awaited<ReturnType<typeof runPassiveIntel>>) => string,
  ) => {
    push("out", `→ ${label} ${host}  (live)`);
    try {
      const r = await runPassiveIntel({ data: { target: host } });
      push("out", pick(r));
    } catch (e) {
      push("err", `× ${label} failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const sim = (body: string, note?: string) =>
    push("sim", `[sim]${note ? ` ${note}` : ""}\n${body}`);

  const exec = async (raw: string) => {
    const line = raw.trim();
    if (!line) return;
    pushEcho(line);
    setHistory((h) => [...h, line]);
    setHistIdx(null);

    const [cmd, ...rest] = line.split(/\s+/);
    const args = rest.join(" ");
    const host = rest.find((a) => !a.startsWith("-")) ?? "";

    setBusy(true);
    try {
      switch (cmd.toLowerCase()) {
        case "help":
          push("sys", HELP);
          break;
        case "clear":
          setLines([]);
          break;
        case "history":
          push(
            "out",
            history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join("\n") || "(empty)",
          );
          break;
        case "whoami":
          push("out", `${operator}   role=${role}   clearance=${clearance}   lockdown=${lockdown}`);
          break;
        case "id":
          push(
            "out",
            `uid=1000(${operator}) gid=1000(greylock) groups=1000(greylock),27(sudo),998(ops)`,
          );
          break;
        case "uname":
          push(
            "out",
            "Linux greylock 6.8.11-greylock-amd64 #1 SMP PREEMPT_DYNAMIC greyLock OS 1.0 x86_64 GNU/Linux",
          );
          break;
        case "pwd":
          push("out", "/home/" + operator);
          break;
        case "hostname":
          push("out", "greylock");
          break;
        case "ls":
          push("out", "cases/  evidence/  intel/  sweeps/  targets.txt  decoys/  scanner-agent.md");
          break;
        case "cat":
          if ((rest[0] ?? "").includes("targets")) {
            push("out", entities.map((e) => e.identifier).join("\n") || "(empty file)");
          } else {
            push("err", `cat: ${rest[0] ?? ""}: No such file or directory`);
          }
          break;
        case "sudo":
          push(
            "err",
            `${operator} is not in the sudoers file. This incident will be reported to the watch commander.`,
          );
          break;
        case "exit":
          push("sys", "logout — session remains in the custody log.");
          break;
        case "targets":
          push(
            "out",
            entities
              .slice(0, 40)
              .map(
                (e) =>
                  `${e.id.padEnd(10)} ${e.status.padEnd(6)} ${e.type.padEnd(9)} ${e.identifier}`,
              )
              .join("\n") || "(no targets)",
          );
          break;

        case "whois":
          if (!host) {
            push("err", "usage: whois <host>");
            break;
          }
          await runLive("whois", host, (r) => {
            const w = r.report.whois;
            if (!w) return "(no data)";
            return [
              `registrar: ${w.registrar ?? "—"}`,
              `created:   ${w.created ?? "—"}`,
              `updated:   ${w.updated ?? "—"}`,
              `expires:   ${w.expires ?? "—"}`,
              `ns:        ${(w.nameservers ?? []).join(", ") || "—"}`,
              `status:    ${(w.status ?? []).join(", ") || "—"}`,
            ].join("\n");
          });
          break;

        case "dns":
        case "dig":
          if (!host) {
            push("err", "usage: dns <host>");
            break;
          }
          await runLive("dns", host, (r) => {
            const d = r.report.dns;
            if (!d) return "(no data)";
            const rows: string[] = [];
            (["A", "AAAA", "MX", "NS", "TXT", "CNAME"] as const).forEach((t) => {
              const v = (d as Record<string, string[] | undefined>)[t];
              if (v && v.length) rows.push(`${t.padEnd(6)} ${v.join(", ")}`);
            });
            return rows.join("\n") || "(empty)";
          });
          break;

        case "headers":
          if (!host) {
            push("err", "usage: headers <host>");
            break;
          }
          await runLive("headers", host, (r) => {
            const h = r.report.http;
            if (!h) return "(unreachable)";
            const hdrs =
              Object.entries(h.headers ?? {})
                .map(([k, v]) => `  ${k}: ${v}`)
                .join("\n") || "  (no headers)";
            return `${h.scheme.toUpperCase()} ${h.status}\n${hdrs}`;
          });
          break;

        case "shodan":
          if (!host) {
            push("err", "usage: shodan <host|ip>");
            break;
          }
          await runLive("shodan", host, (r) => {
            const s = r.report.shodan;
            if (!s) return "(no shodan data — key missing or no record)";
            return [
              `ip:    ${s.ip ?? "—"}`,
              `org:   ${s.org ?? "—"}`,
              `os:    ${s.os ?? "—"}`,
              `ports: ${s.ports.join(", ") || "—"}`,
              `vulns: ${s.vulns.join(", ") || "none"}`,
              `tags:  ${s.tags.join(", ") || "—"}`,
            ].join("\n");
          });
          break;

        case "vt":
        case "virustotal":
          if (!host) {
            push("err", "usage: vt <host|ip>");
            break;
          }
          await runLive("vt", host, (r) => {
            const v = r.report.virustotal;
            if (!v) return "(no vt data — key missing or no record)";
            return `malicious=${v.malicious}  suspicious=${v.suspicious}  harmless=${v.harmless}  undetected=${v.undetected}  reputation=${v.reputation}  asOwner=${v.asOwner ?? "—"}  country=${v.country ?? "—"}`;
          });
          break;

        case "crtsh":
        case "crt.sh":
          if (!host) {
            push("err", "usage: crtsh <domain>");
            break;
          }
          await runLive("crtsh", host, (r) => {
            const s = r.report.subdomains;
            if (!s || !s.count) return "(no certificates)";
            return `${s.count} subdomains discovered\n${s.sample.slice(0, 100).join("\n")}`;
          });
          break;

        case "sweep": {
          if (!host) {
            push("err", "usage: sweep <host>");
            break;
          }
          if (lockdown) {
            push("err", "× lockdown active — sweeps disabled");
            break;
          }
          const ent = entities.find((e) => e.identifier.toLowerCase().includes(host.toLowerCase()));
          if (!ent) {
            push("err", `× no watchlist target matches "${host}". Add it under Targets first.`);
            break;
          }
          if (!isPassiveEligible(ent)) {
            push("err", "× target is not passive-eligible");
            break;
          }
          push("out", `→ passive sweep on ${ent.identifier} (${ent.id}) …`);
          const s = await runPassiveScan(ent.id, { entity: ent, silent: true });
          if (!s) {
            push("err", "× sweep failed");
            break;
          }
          if (s.status === "failed") {
            push("err", `× ${s.error ?? "sweep failed"}`);
            break;
          }
          push(
            "ok",
            `✓ ${s.id} complete — findings: ${s.summary.critical}C ${s.summary.high}H ${s.summary.medium}M ${s.summary.low}L ${s.summary.info}I`,
          );
          s.findings
            .slice(0, 12)
            .forEach((f) => push("out", `  [${f.severity.toUpperCase().padEnd(8)}] ${f.title}`));
          break;
        }

        // ---- Kali toolbelt (simulated) ----
        case "nmap":
          sim(fakeNmap(args), "active scan — routed through scanner-agent in production.");
          break;
        case "nikto":
          sim(fakeNikto(args));
          break;
        case "gobuster":
          sim(fakeGobuster(args));
          break;
        case "whatweb":
          sim(fakeWhatweb(args));
          break;
        case "theharvester":
          sim(fakeHarvester(args));
          break;
        case "dnsenum":
          sim(fakeDnsenum(host || "target.tld"));
          break;
        case "subfinder":
          sim(fakeSubfinder(host || "target.tld"));
          break;
        case "msfconsole":
          sim(fakeMsf(), "metasploit requires the scanner-agent + written authorization.");
          break;
        case "msf":
          sim(fakeMsf(), "metasploit requires the scanner-agent + written authorization.");
          break;
        case "searchsploit":
          sim(fakeSearchsploit(args));
          break;
        case "hydra":
          sim(fakeHydra(args), "credential brute force requires written authorization.");
          break;
        case "medusa":
          sim(
            fakeMedusa(host || "target"),
            "credential brute force requires written authorization.",
          );
          break;
        case "john":
          sim(fakeJohn(args));
          break;
        case "hashcat":
          sim(fakeHashcat(args));
          break;
        case "sqlmap":
          sim(fakeSqlmap(args));
          break;
        case "wpscan":
          sim(fakeWpscan(args));
          break;
        case "aircrack-ng":
          sim(fakeAircrack(args));
          break;
        case "aircrack":
          sim(fakeAircrack(args));
          break;
        case "enum4linux":
          sim(fakeEnum4linux(host));
          break;

        default:
          push("err", `greylock-sh: ${cmd}: command not found    (try \`help\`)`);
      }
      logCustody({
        entityId: "TERMINAL",
        action: "VIEW",
        reason: `terminal: ${line.slice(0, 160)}`,
      });
    } finally {
      setBusy(false);
      queueMicrotask(() => inputRef.current?.focus());
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setLines([]);
      return;
    }
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
      setHistIdx(idx);
      setInput(history[idx]);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(null);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <TermIcon className="h-4 w-4 text-tactical" />
        <h1 className="font-mono text-sm font-bold text-foreground">greylock-sh</h1>
        <span className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
          kali compliment · {operator} · {clearance}
        </span>
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
              l.kind === "kali" && "font-bold text-tactical",
              l.kind === "in" && "text-foreground",
              l.kind === "out" && "text-foreground/90",
              l.kind === "err" && "text-destructive",
              l.kind === "sys" && "text-muted-foreground",
              l.kind === "sim" && "text-status-grey",
              l.kind === "ok" && "text-status-white",
            )}
          >
            {l.text || "\u00a0"}
          </div>
        ))}
        <div className="mt-1">
          <div className="font-bold text-tactical">{promptTop}</div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-tactical">{promptBot}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              disabled={busy}
              spellCheck={false}
              autoComplete="off"
              className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-50"
              placeholder={busy ? "working…" : "type a command — `help` for the tool index"}
            />
          </div>
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
