# Megaannum Capital

Next.js site for Megaannum Capital — institutional asset management.

## Setup

```bash
npm install
```

Copy `.env.example` to `.env.local` if the CMS should supply live copy. Unset, the site uses bundled fallbacks.

```bash
npm run dev
```

## Docker

The image is a Next.js standalone build (`output: "standalone"`). On an Alibaba Cloud simple application server:

```bash
docker compose up -d --build
```

The site listens on port 3000. Point a reverse proxy (or the server firewall) at that port, or change the left-hand side of `ports` in `docker-compose.yml` to `80:3000`.

Optional CMS vars (`CMS_API_BASE_URL`, `CMS_SITE_API_KEY`) can be set in a `.env` next to the compose file. Unset, the site uses bundled copy.

## Stack

- Next.js App Router
- React, TypeScript, Tailwind CSS
- GSAP section reveals (stats, team, contact)
- Looping video hero — no canvas image sequences
