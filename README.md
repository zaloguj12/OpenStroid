# OpenStroid

Open-source cloud gaming client. Built with React, TypeScript, Mantine, and Vite.

## Quick start

```bash
npm install
npm run dev
```

The dev server starts on [http://localhost:3000](http://localhost:3000).

## API proxy (local development)

In development the Vite dev server proxies all `/api` requests to
`https://cloud.boosteroid.com` so that login and other API calls behave as
same-origin requests — matching the original client's request model and
avoiding cross-origin 403 rejections.

No extra configuration is required for local dev. If you need to point at a
different backend, set `VITE_API_BASE_URL` in a `.env` file:

```bash
cp .env.example .env
# edit .env — set VITE_API_BASE_URL only for non-local deployments
```

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | *(empty — uses relative paths + Vite proxy)* | Full API origin for deployed builds |
| `VITE_TURNSTILE_SITE_KEY` | `0x4AAAAAAB83Vz-GpH08brQi` (production) | Cloudflare Turnstile site key. Use `1x00000000000000000000AA` for local dev. |

## Project structure

```
src/
├── api/          # API client, config, endpoint wrappers
├── auth/         # Token storage, login adapter, AuthContext
├── components/   # Shared UI components
├── hooks/        # Custom React hooks
├── layouts/      # Page layout shells
├── pages/        # Route-level page components
├── theme/        # Mantine theme customization
└── types/        # Shared TypeScript interfaces
```

## Current features (v0.1)

- **Login** — email/password authentication with Cloudflare Turnstile captcha, "Remember me" option, validation, loading states, and server error handling (422 + 403)
- **Session restore** — persisted tokens are validated on startup so users stay signed in
- **My Games library** — fetches installed games from the API with skeleton loading, empty state, and error recovery
- **Logout** — clears session and returns to login
- **Token refresh** — automatic silent refresh on 401 responses with request queuing
- **Vite dev proxy** — `/api` requests are proxied to `cloud.boosteroid.com` for same-origin behavior in development

## Architecture notes

- Auth tokens are stored in `localStorage` (`access_token`, `refresh_token`).
- `boosteroid_auth` stores the `user_data` object returned by the login endpoint, matching the original client behavior.
- The `Authorization` header sends the raw access token (no `Bearer` prefix), matching the observed protocol.
- Login payload construction is isolated in `src/auth/login-adapter.ts` — if field names need to change, only that file is touched.
- The login request includes `cf-turnstile-response` (Cloudflare Turnstile captcha token) and `remember_me`, matching the official client's payload shape.
- The Turnstile site key is configurable via `VITE_TURNSTILE_SITE_KEY`. For local dev, use the Cloudflare always-pass test key (`1x00000000000000000000AA`) in `.env`.
- The Vite proxy rewrites cookie domains from `cloud.boosteroid.com` to `localhost` so server-set cookies work in development.
- The API client in `src/api/client.ts` handles automatic token refresh with a queue for concurrent 401s.
- Response parsing is envelope-resilient (handles both `{ access_token, ... }` and `{ data: { access_token, ... } }`).
- Route protection is handled by `RequireAuth`, which shows a loading spinner during session bootstrap and redirects unauthenticated users.
- In dev, API base URL defaults to empty (relative), and Vite proxies `/api` to the upstream origin. In production builds, set `VITE_API_BASE_URL` to the full API origin.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (with API proxy) |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

Apache-2.0 — see [LICENSE](LICENSE).
