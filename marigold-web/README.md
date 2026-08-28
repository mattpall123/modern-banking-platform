# Marigold Bank — Frontend

React + TypeScript + Vite + Tailwind CSS frontend for Marigold Bank, talking to the Spring Boot backend in `../marigoldapi`.

## Running locally

1. Start the backend first (see `../marigoldapi`) — it must be running on `http://localhost:8080`.
2. Install and run:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:5173`.

`vite.config.ts` proxies `/api/*` to `http://localhost:8080`, so the browser only ever talks to one origin in dev — no CORS configuration needed on the backend for local development.

## Demo logins (seeded by the backend's dev profile)

| Role | Email | Password |
|---|---|---|
| Customer | `alice@marigoldbank.test` | `password123` |
| Analyst | `priya.analyst@marigoldbank.test` | `analyst123` |

Alice has a seeded high-value "unfamiliar payee" transfer that should already show up in the Fraud Queue for the analyst account.

## Known tradeoffs (documented, not bugs)

- **JWT stored in `localStorage`**, not memory-only. This keeps the session alive across a page refresh, which matters for a demo/portfolio app. The tradeoff is slightly weaker XSS hardening than an in-memory-only token; a production version would use httpOnly cookies + a refresh-token flow instead.
- **No conversation memory** on the AI Assistant page — each chat message is a stateless call to the backend, matching how the backend itself works. Refreshing the page clears the visible conversation.
- **Transfers are entered by numeric account ID**, not by searching a recipient — the backend has no account-search endpoint.
