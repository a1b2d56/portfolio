# Portfolio

Personal portfolio site. Vite + React 19 + TypeScript + Tailwind v4 + React Router.

## Run locally

```
npm install
npm run dev
```

## Build

```
npm run build
```

Outputs to `dist/`.

## Deploy (Vercel)

1. Push this to a GitHub repo.
2. Import the repo in Vercel — it auto-detects Vite, no config needed.
3. `vercel.json` handles SPA rewrites so `/work/spectre` etc. don't 404 on direct load.

## Edit content

Project data lives in `src/data/projects.ts`. Case study copy (Spectre, Planora)
lives in `src/data/caseStudies.ts`. Design tokens (colors, fonts) are in
`src/index.css` under `@theme`.
