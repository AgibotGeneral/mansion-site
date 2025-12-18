# MANSION Website (Docs + Landing)

This is a **Docusaurus** site that mirrors the *docs-first, API-reference* style used by AI2-THOR and the dataset-focused feel of ProcTHOR.

## Requirements
- Node.js >= 18

## Install
```bash
npm install
```

## Local dev
```bash
npm run start
```
Then open http://localhost:3000

## Build
```bash
npm run build
npm run serve
```

## Deploy
- GitHub Pages / Netlify / Vercel all work (static output in `build/`).

## What to edit first
- `src/pages/index.js` (homepage copy + hero)
- `docs/` (documentation pages)
- `docusaurus.config.js` (links, repo, paper, domain)
