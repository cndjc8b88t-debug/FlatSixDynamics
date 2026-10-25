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
  impressum.njk          /impressum/  (de, § 5 DDG)
  support.njk            /support/    (App Store Support URL target)
  notes.njk              /notes/
  robots.txt             served at /
```

## Voice notes

US English everywhere except `/impressum/`, which is the only German page (legal requirement, § 5 DDG). The brand voice is restrained and precise, never marketing-loud: keep prose short, technical when needed, never apologetic.
