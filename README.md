# FlatSixDynamics Website

Static site for `flatsixdynamics.com`. Eleventy 3.x, no framework, no JS bundling, no tracker. Deploys to GitHub Pages (or any static host that serves the `_site/` build folder).

## Local development

Requires Node ≥ 20. If `npm` is not installed:

```bash
brew install node
```

Then from this folder:

```bash
npm install
npm run serve     # http://localhost:8081
```

## Build

```bash
npm run build     # writes to _site/
```

## Structure

```
src/
  _data/site.json        site-wide variables
  _layouts/base.njk      page wrapper
  _includes/             header, footer partials
  assets/css/site.css    single stylesheet
  index.njk              /
  app.njk                /app/
  privacy.njk            /privacy/    (required by App Store)
  terms.njk              /terms/
  impressum.njk          /impressum/  (de, §5 TMG)
  support.njk            /support/    (App Store Support URL target)
  notes.njk              /notes/
  robots.txt             served at /
```

## Before the site goes live

- [ ] **Impressum** — Vera fills the placeholders in `src/impressum.njk` using the checklist at `/MeinOrdner/Compliance/impressum_checklist.md`. The page must not be public while the bracketed placeholders are present.
- [ ] **Privacy controller block** — replace the `[Gewerbe street address — see Impressum]` placeholder in `src/privacy.njk` with the same address used in the Impressum.
- [ ] **App Store URL** — once the App is live, update `appStoreUrl` in `src/_data/site.json` to point to the actual App Store listing.
- [ ] **Photography** — the homepage and `/app/` page are text-only on purpose. When Jürgen has 911 photos ready (per `project_website_brand`: own photos only, no stock), Holland will add them.
- [ ] **Sitemap & favicon** — out of scope for v0.1; trivial to add when needed.

## Voice notes

US English everywhere except `/impressum/`, which is the only German page (legal requirement, §5 TMG). The brand voice is restrained, aviation/watch-coded, never marketing-loud — keep prose short, technical when needed, never apologetic. See memory `project_website_brand` for the full set of constraints.

## Compliance cross-reference

The legal pages here mirror the source documents in `/MeinOrdner/Compliance/`. The website is the canonical published version; the markdown source is the editable working draft. Keep them in sync when changes are needed.
