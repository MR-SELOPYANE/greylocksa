# greylocksa

Build a secure, government-grade web dashboard for managing a watchlist intelligence system called "greyLock". Use React 18, TypeScript, Tailwind CSS, and shadcn/ui components. 

Core Features:

- Multi-tab layout: Entities, Cases, Audit Log, System Status

- Entities table with columns: ID, Type (person/org/ip/domain), Identifier, Risk Score (0-100), Status (grey/black/white), Last Updated, Actions

- Status badges with distinct colors: grey (amber), black (red), white (green)

- Advanced filtering: risk score range, type dropdown, status toggle, free-text search

- Clicking a row opens a detail modal showing metadata (JSON), evidence references, and status history

- Cases view: list of investigations with assigned analyst, status, linked entities, and progress bar

- Audit log: immutable-style table showing actor, action, entity ID, timestamp, IP (mock)

- Role simulation toggle at top-right: "Viewer | Analyst | Admin" that conditionally shows/hides edit/delete buttons

- Dark mode by default, tactical/enterprise UI aesthetic, zero telemetry indicators

Data: Use mock JSON with 30+ realistic entries. Structure state with React Query or SWR for API readiness.

Output: Fully responsive, production-UI-ready React app. Export OpenAPI-ready fetch hooks. Include TypeScript interfaces for all entities.Build a secure, offline-ready AI assistant web interface called "Sentinel" for a government Linux OS. Use React 18, TypeScript, Tailwind CSS, and react-markdown.

Core Features:

- Split layout: left sidebar (command history, clearance level indicator, system status), right main chat area

- Chat UI with streaming-style message rendering, markdown support, and code block syntax highlighting

- Input bar with: text input, voice toggle (UI only for now), send button, and clear context button

- Clearance-aware UI: show a badge indicating user clearance (UNCLASSIFIED / CONFIDENTIAL / SECRET). If user tries to run a classified command in UI, show a polite denial modal.

- Audit panel: toggleable drawer showing last 10 AI interactions with timestamps, redacted context tags, and approval status

- Simulate local AI responses using a mock handler that returns realistic system/analyst-style replies based on keywords like "status", "greylock", "audit", "network"

- Strictly NO external API calls. All data stays client-side. Use localStorage for session persistence only.

- Dark tactical theme, monospace accents, accessible contrast, keyboard shortcuts (Ctrl+Enter to send, Esc to clear)

Output: Fully functional React component tree. Export clear mock API interface so it can later connect to a local D-Bus → HTTP bridge.Build a production-ready backend API for the "greyLock" watchlist system using FastAPI, SQLAlchemy, Pydantic v2, and Supabase. Include JWT auth with role-based access control.

Core Endpoints:

- GET /entities → paginated list with filters (risk_score_min/max, type, status)

- POST /entities → create new entity (requires Analyst+ role)

- PATCH /entities/{id} → update status/score (requires Admin role)

- GET /cases → list investigations with linked entities

- POST /audit/log → append-only audit entry (auto-called on state changes)

- GET /health → service status, DB connection, uptime

Architecture:

- Pydantic models with strict validation & typing

- JWT middleware that checks `role` and `clearance` before allowing mutations

- Soft deletes, UUID primary keys, `created_at`/`updated_at` timestamps

- SQLAlchemy async engine with connection pooling

- Auto-generated OpenAPI docs at /docs

- Include a `docker-compose.yml` with PostgreSQL + pgAdmin, and a `Makefile` for setup

Security:

- No hardcoded secrets. Use env vars.

- Rate limiting stub on auth endpoint.

- Audit all POST/PATCH/DELETE actions automatically.

Output: Clean, documented, production-structured FastAPI project ready for containerization.

also this is for personal use no need for login or sign

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/de1d3c79-aa05-4aa5-a9ac-95522bb0a0e7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
