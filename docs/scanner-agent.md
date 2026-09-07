# greyLock Scanner-Agent Architecture

> Design spec for the active-scan companion. **Not yet implemented in-app** —
> it lives here so you (the operator) can stand it up in your own
> infrastructure and legally authorized target scope. The greyLock app only
> orchestrates jobs and stores results; it never runs nmap/nuclei itself.

## Why an agent

Cloudflare Workers (the serverless runtime the app runs on) cannot spawn
native binaries, hold raw sockets, or send anything but outbound HTTPS. Real
active scanning (`nmap -sV`, `nuclei -t cves/`, `httpx`, `naabu`, custom
exploit modules) requires a real host you control. The Scanner-Agent is that
host — a small container you run in a network that's allowed to touch the
target.

## Trust model

* **greyLock cloud** issues jobs, stores results, is the source of truth for
  what a "case" contains.
* **Agent** is trusted to execute jobs against targets in its own allow-list;
  greyLock does not implicitly trust an agent — every result is verified.
* **Every wire message is HMAC-signed**. Both directions. Replay-protected.
* The agent's allow-list is defined **at the agent**, not the cloud. The
  cloud can request `scan(foo.example)`; the agent refuses if `foo.example`
  is not in its `--allowlist` file. This is the legal firewall.

```text
┌─────────────┐   1. enqueue job         ┌───────────┐
│   greyLock  │──────────────────────────►│  Job API  │
│   (cloud)   │◄──────────────────────────│ (public)  │
└──────┬──────┘   4. signed result POST   └─────▲─────┘
       │                                        │
       │ 5. verify + store                      │ 2. poll
       ▼                                        │ 3. run tool
┌─────────────┐                          ┌──────┴──────┐
│  Scan DB    │                          │  Agent      │
│  + Custody  │                          │  (docker)   │
└─────────────┘                          └─────────────┘
```

## Wire protocol

Two endpoints, both under `/api/public/agent/` (public prefix — auth is
per-request HMAC, not a Lovable session).

### `POST /api/public/agent/claim`

Agent long-polls for work.

Request:

```json
{
  "agent_id": "agent-lab-01",
  "capabilities": ["nmap", "nuclei", "httpx"],
  "ts": 1737504821
}
```

Response (200, one job) or 204 (nothing to do):

```json
{
  "job_id": "JOB-01HXYZ...",
  "kind": "nmap",
  "target": "203.0.113.7",
  "args": { "profile": "top-1000-tcp", "service_detect": true },
  "deadline": 1737505421,
  "callback_url": "https://project--<id>.lovable.app/api/public/agent/result",
  "nonce": "b8f9…"
}
```

### `POST /api/public/agent/result`

Agent posts findings.

```json
{
  "job_id": "JOB-01HXYZ...",
  "agent_id": "agent-lab-01",
  "started_at": "2026-07-20T18:00:00Z",
  "finished_at": "2026-07-20T18:04:12Z",
  "status": "complete",
  "tool_output_sha256": "…",
  "findings": [
    { "id": "F-001", "title": "SSH weak host key", "severity": "medium",
      "cwe": "CWE-326", "evidence": "…", "remediation": "…" }
  ],
  "raw_url": "s3://.../JOB-01HXYZ.xml.gz",
  "nonce": "5c72…"
}
```

### HMAC signing

Every request carries:

```
X-Agent-Id: agent-lab-01
X-Signature-Ts: 1737504821
X-Signature: sha256=<hex>
```

Where `<hex> = HMAC_SHA256(shared_secret, f"{ts}.{method}.{path}.{sha256(body)}")`.

Server rules:
* Reject if `|now - ts| > 60s` (replay window).
* Reject if `(agent_id, nonce)` seen in the last hour (idempotency).
* Constant-time compare on the signature.
* Secret rotates via `agent_secrets` table; both old and new keys accepted
  for a 24h overlap window.

## Job kinds (v1)

| kind      | Tool         | Purpose                                | Destructive? |
|-----------|--------------|----------------------------------------|--------------|
| `nmap`    | nmap         | Port + service discovery               | no           |
| `httpx`   | projectdiscovery/httpx | Web fingerprinting          | no           |
| `nuclei`  | projectdiscovery/nuclei | Templated CVE / misconfig checks | no (with `-severity low,medium,high,critical -exclude-tags dos,intrusive`) |
| `sslscan` | sslscan      | TLS cipher / cert audit                | no           |
| `dirb`    | ffuf         | Content discovery (opt-in only)        | mild         |

Adding a kind is: (a) whitelist it on the agent, (b) add a parser that emits
`VulnFinding[]`, (c) register it in the cloud's `job_kinds` table.

## Python agent — reference implementation

`Dockerfile`:

```dockerfile
FROM python:3.12-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
      nmap curl ca-certificates && rm -rf /var/lib/apt/lists/*
# Nuclei + httpx binaries
RUN curl -sSL https://github.com/projectdiscovery/nuclei/releases/latest/download/nuclei_linux_amd64.zip -o /tmp/n.zip \
    && unzip /tmp/n.zip -d /usr/local/bin/ && rm /tmp/n.zip \
    && curl -sSL https://github.com/projectdiscovery/httpx/releases/latest/download/httpx_linux_amd64.zip -o /tmp/h.zip \
    && unzip /tmp/h.zip -d /usr/local/bin/ && rm /tmp/h.zip
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY agent.py .
ENTRYPOINT ["python", "agent.py"]
```

`requirements.txt`:

```
httpx==0.28.*
pydantic==2.*
python-libnmap==0.7.*
```

`agent.py` (skeleton):

```python
import hashlib, hmac, json, os, subprocess, sys, time, uuid
from pathlib import Path
from typing import Any
import httpx

CLOUD = os.environ["GREYLOCK_CLOUD"]         # e.g. https://project--<id>.lovable.app
AGENT_ID = os.environ["GREYLOCK_AGENT_ID"]
SECRET = os.environ["GREYLOCK_AGENT_SECRET"].encode()
ALLOWLIST = {l.strip() for l in Path("/etc/greylock/allowlist").read_text().splitlines() if l.strip()}

def sign(method: str, path: str, body: bytes) -> dict[str, str]:
    ts = str(int(time.time()))
    digest = hashlib.sha256(body).hexdigest()
    msg = f"{ts}.{method.upper()}.{path}.{digest}".encode()
    sig = hmac.new(SECRET, msg, hashlib.sha256).hexdigest()
    return {"X-Agent-Id": AGENT_ID, "X-Signature-Ts": ts, "X-Signature": f"sha256={sig}"}

def call(method: str, path: str, body: dict[str, Any] | None):
    raw = json.dumps(body or {}, separators=(",", ":")).encode()
    headers = {"Content-Type": "application/json", **sign(method, path, raw)}
    return httpx.request(method, f"{CLOUD}{path}", content=raw, headers=headers, timeout=30)

def target_allowed(target: str) -> bool:
    return target in ALLOWLIST or any(target.endswith("." + d) for d in ALLOWLIST)

def run_nmap(target: str, args: dict) -> list[dict]:
    cmd = ["nmap", "-T3", "--top-ports", "1000"]
    if args.get("service_detect"): cmd.append("-sV")
    cmd += ["-oX", "-", target]
    proc = subprocess.run(cmd, capture_output=True, text=True, timeout=600)
    # parse proc.stdout XML into VulnFinding-shaped dicts …
    return []

def loop():
    while True:
        r = call("POST", "/api/public/agent/claim",
                 {"agent_id": AGENT_ID, "capabilities": ["nmap", "nuclei", "httpx"], "ts": int(time.time())})
        if r.status_code == 204:
            time.sleep(5); continue
        job = r.json()
        if not target_allowed(job["target"]):
            call("POST", "/api/public/agent/result",
                 {"job_id": job["job_id"], "agent_id": AGENT_ID, "status": "refused",
                  "reason": "target not in local allowlist", "nonce": uuid.uuid4().hex})
            continue
        findings = {"nmap": run_nmap}[job["kind"]](job["target"], job.get("args", {}))
        call("POST", "/api/public/agent/result",
             {"job_id": job["job_id"], "agent_id": AGENT_ID, "status": "complete",
              "started_at": job["deadline"], "findings": findings, "nonce": uuid.uuid4().hex})

if __name__ == "__main__":
    loop()
```

Run:

```bash
docker run --rm \
  -e GREYLOCK_CLOUD=https://project--<id>.lovable.app \
  -e GREYLOCK_AGENT_ID=agent-lab-01 \
  -e GREYLOCK_AGENT_SECRET=<32-byte hex> \
  -v $(pwd)/allowlist:/etc/greylock/allowlist:ro \
  greylock/agent:latest
```

## Cloud-side implementation checklist

When you're ready to build the cloud half in-app, the pieces are:

1. `src/routes/api/public/agent/claim.ts` — server route, HMAC verify,
   dequeues one job from `scan_jobs` (status=`queued`, dispatch to caller,
   mark `assigned`).
2. `src/routes/api/public/agent/result.ts` — server route, HMAC verify +
   nonce check, converts `findings[]` into a `Scan` row, appends
   chain-of-custody, closes the job.
3. Tables: `scan_jobs (id, kind, target, args, status, agent_id, ...)`,
   `agent_secrets (agent_id, secret, valid_from, valid_to)`,
   `agent_nonces (agent_id, nonce, seen_at)`.
4. UI: "Dispatch to agent" button on the Scans page, agent status widget on
   `/system`, per-agent activity feed.

Legal reminder: **only scan hosts you own or have written authorization
for.** The agent's allow-list is your last line of defense — configure it
before the first `docker run`.
