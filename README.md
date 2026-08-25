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

The image is a Next.js standalone build (`output: "standalone"`). Caddy sits in front on 80/443 and issues HTTPS for `megaannumcap.com`.

On the Alibaba server:

```bash
cd /opt/megaannum-capital-company-website
git pull
docker compose up -d --build
```

Do not publish port 3000. Firewall should allow 80 and 443 only (plus 22 for SSH).

If `www.megaannumcap.com` is not in DNS, remove that name from `Caddyfile`.

Optional CMS vars (`CMS_API_BASE_URL`, `CMS_SITE_API_KEY`) can be set in a `.env` next to the compose file. Unset, the site uses bundled copy.

## Stack

- Next.js App Router
- React, TypeScript, Tailwind CSS
- GSAP section reveals (stats, team, contact)
- Looping video hero — no canvas image sequences
