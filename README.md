<h1 align="center">OpenStroid</h1>

<p align="center">
  <img src="logo.svg" alt="OpenStroid logo" width="180" />
</p>

<p align="center">
  <strong>An open-source desktop client for Boosteroid.</strong>
</p>

<p align="center">
  Browse your library, tune your stream, and launch sessions from a community-built app.
</p>

<p align="center">
  <a href="https://github.com/OpenCloudGaming/OpenStroid/releases">
    <img src="https://img.shields.io/github/v/tag/OpenCloudGaming/OpenStroid?style=for-the-badge&label=Download&color=brightgreen" alt="Download">
  </a>
  <a href="#development">
    <img src="https://img.shields.io/badge/Docs-Development-blue?style=for-the-badge" alt="Development">
  </a>
  <a href="https://github.com/OpenCloudGaming/OpenStroid/issues">
    <img src="https://img.shields.io/github/issues/OpenCloudGaming/OpenStroid?style=for-the-badge&label=Issues" alt="Issues">
  </a>
  <a href="https://discord.gg/8EJYaJcNfD">
    <img src="https://img.shields.io/badge/Discord-Join%20Us-7289da?style=for-the-badge&logo=discord&logoColor=white" alt="Discord">
  </a>
</p>

<p align="center">
  <a href="https://github.com/OpenCloudGaming/OpenStroid/stargazers">
    <img src="https://img.shields.io/github/stars/OpenCloudGaming/OpenStroid?style=flat-square" alt="Stars">
  </a>
  <a href="https://github.com/OpenCloudGaming/OpenStroid/releases">
    <img src="https://img.shields.io/github/downloads/OpenCloudGaming/OpenStroid/total?style=flat-square" alt="Downloads">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/OpenCloudGaming/OpenStroid?style=flat-square" alt="License">
  </a>
</p>

> [!WARNING]
> OpenStroid is under active development. Expect occasional bugs, rough edges, and platform-specific issues while the client matures.
>
> QR login, WebRTC streaming, and gamepad input are still evolving. Report problems on [GitHub Issues](https://github.com/OpenCloudGaming/OpenStroid/issues) or [Discord](https://discord.gg/8EJYaJcNfD).

> [!IMPORTANT]
> OpenStroid is an independent community project and is not affiliated with, endorsed by, or sponsored by Boosteroid. Boosteroid is a trademark of its respective owner. You must use your own Boosteroid account.

## Overview

OpenStroid is a desktop app for Boosteroid. One Electron window handles QR login, your game library, and WebRTC streaming — no separate server to install or run.

## Downloads

Grab the latest desktop build from [GitHub Releases](https://github.com/OpenCloudGaming/OpenStroid/releases) when available. Until packaged releases ship, build and run the client locally — see [Development](#development) below.

## Development

### Getting started

```bash
bun install
cp .env.example .env
bun run dev
```

What runs in development:

- The OpenStroid desktop app (Electron + UI + embedded backend on one port)

Use `bun run dev:backend` only when debugging the embedded backend without launching the app window.

### QR login flow

1. Open OpenStroid Desktop and go to the login screen.
2. Scan the QR code with your phone or the Boosteroid app, or click **Login to Boosteroid** to finish in your browser.
3. After Boosteroid verifies the QR code, OpenStroid establishes a local session.
4. The app transitions into the game library.

### Scripts

| Command | Description |
|---|---|
| `bun run dev` | Launch the OpenStroid desktop app |
| `bun run dev:web` | Start the UI only (browser preview) |
| `bun run dev:backend` | Run the embedded backend without the app window (debug) |
| `bun run build` | Type-check and build the app |
| `bun run start` | Run the built desktop app |
| `bun run start:backend` | Run the built embedded backend only (debug) |
| `bun run preview` | Preview the frontend build |
| `bun run lint` | Run ESLint |

### Environment variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | *(empty)* | Renderer API origin. Leave empty in local Electron dev so the renderer keeps using first-party routes. Never point this at a Boosteroid origin. |
| `SERVER_PORT` | `3001` | Internal port used by the embedded app backend in dev. |
| `UPSTREAM_BASE_URL` | `https://cloud.boosteroid.com` | Upstream Boosteroid base URL. |
| `SESSION_SECRET` | `openstroid-development-session-secret` | Secret used to encrypt/authenticate the OpenStroid session cookie. Replace in production. |
| `SESSION_COOKIE_NAME` | `openstroid_session` | First-party auth cookie name. |
| `SESSION_TTL_SECONDS` | `2592000` | Cookie/session lifetime in seconds. |
| `COOKIE_SECURE` | `false` in dev, `true` in production | Whether to mark the auth cookie as `Secure`. |
| `APP_ORIGIN` | *(unset)* | Optional allowed renderer origin for split dev setups. |

## Repository Layout

```text
.
├── electron/                  Electron main process and app window
├── server/                    Embedded backend (auth, library proxy, stream launch)
├── src/                       Desktop UI, auth, and streaming client
├── public/                    Static assets and favicon
├── tools/                     Dev/build helper scripts
├── LICENSE                    Project license
└── logo.svg                   Project logo
```

## Contributing

Contributions are welcome. Open a focused pull request, explain user-facing impact clearly, and keep changes scoped to the problem you are solving.

## Star History

<a href="https://www.star-history.com/?repos=OpenCloudGaming%2FOpenStroid&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/image?repos=OpenCloudGaming/OpenStroid&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/image?repos=OpenCloudGaming/OpenStroid&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/image?repos=OpenCloudGaming/OpenStroid&type=date&legend=top-left" />
 </picture>
</a>

## License

OpenStroid is licensed under the [Apache License 2.0](LICENSE).
