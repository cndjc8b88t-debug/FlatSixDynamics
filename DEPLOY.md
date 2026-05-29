# Deploying the FlatSixDynamics website to GitHub Pages

This site is built with Eleventy (`npm run build` → `_site/`) and published by
the GitHub Actions workflow in `.github/workflows/deploy.yml`. You do **not**
build locally for production — GitHub builds it on every push to `main`.

Target repo: **`cndjc8b88t-debug/FlatSixDynamics`**
Live URL (project site): **https://cndjc8b88t-debug.github.io/FlatSixDynamics/**

---

## ⚠️ Before you push — check the repo isn't already populated

If `cndjc8b88t-debug/FlatSixDynamics` **already contains the iOS app code**
(or anything else), a fresh `git push` of this website will **conflict** /
overwrite or be rejected. Pick ONE of these:

- **Recommended:** use a **dedicated repo** just for the website
  (e.g. `cndjc8b88t-debug/flatsixdynamics-web`) and adjust the `remote add`
  URL below accordingly. The live URL then becomes
  `https://cndjc8b88t-debug.github.io/flatsixdynamics-web/` — if you change
  the repo name, also change `PATH_PREFIX` in `deploy.yml` to match the new
  subpath (`/flatsixdynamics-web/`).
- **Or** if you intend to keep everything in the one repo: do NOT run
  `git init` here. Instead clone the existing repo, copy these website files
  into a subfolder, and rework paths — more work, ask Wren/Larry first.

Open the repo on github.com first and confirm whether it's empty.

---

## Step 1 — push the site (copy-paste)

```bash
cd /Users/juergen/Desktop/Claude22/MeinOrdner/Website
git init
git add .
git commit -m "FlatSixDynamics marketing site — Eleventy + GitHub Pages"
git branch -M main
git remote add origin https://github.com/cndjc8b88t-debug/FlatSixDynamics.git
git push -u origin main
```

If GitHub rejects the push because the remote already has commits:

```bash
git pull --rebase origin main   # reconcile, resolve any conflicts, then:
git push -u origin main
```

(Authentication: when prompted, use your GitHub username + a Personal Access
Token as the password, or a configured credential helper / SSH remote.)

## Step 2 — turn on Pages (one time)

1. GitHub → the repo → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
   (NOT "Deploy from a branch" — this site is built by the Actions workflow.)
3. Go to the **Actions** tab and watch the "Deploy Eleventy site to GitHub
   Pages" run. When it goes **green**, the site is live.

## Step 3 — verify

Open: **https://cndjc8b88t-debug.github.io/FlatSixDynamics/**
CSS, nav links, and all pages should load (no 404s). If CSS is missing, the
`PATH_PREFIX` doesn't match the repo subpath — see the env in `deploy.yml`.

---

## Privacy-policy URL (for the App Store)

Apple requires a reachable privacy-policy URL. After deploy it is:

> **https://cndjc8b88t-debug.github.io/FlatSixDynamics/privacy/**

This works immediately on the `.github.io` project URL — no DNS needed — and
is a valid App-Store privacy-policy URL. Launch on this URL first; you can move
to the custom domain later without breaking it (set up a redirect if needed).

Other legal pages: `/terms/`, `/impressum/`, `/support/` (same prefix).

---

## Local development

```bash
# Local preview at the ROOT path (links work locally), default PATH_PREFIX="/":
npm run serve            # http://localhost:8081/

# Reproduce the EXACT production build (subpath links) locally:
PATH_PREFIX="/FlatSixDynamics/" npm run build
npx http-server _site    # then open .../FlatSixDynamics/ — or just inspect _site/
```

The default `PATH_PREFIX` is `/`, so `npm run serve` and a plain `npm run build`
keep root-absolute links and behave like before. Production deploys override it
to `/FlatSixDynamics/` via the workflow env.

---

## Later: switch to the custom domain flatsixdynamics.com

When DNS is ready and you want the site at the apex domain (no subpath):

1. **Flip off the path prefix.** In `.github/workflows/deploy.yml`, change the
   build step env to `PATH_PREFIX: "/"` (or delete the `env:` block — the
   config default is already `/`). This makes all links root-absolute again.
2. **Tell Pages the domain.** Repo → Settings → Pages → **Custom domain** →
   enter `flatsixdynamics.com` → Save. GitHub writes a `CNAME` file into the
   published artifact for you. (If you prefer to commit it yourself, add a file
   named `CNAME` at the repo root containing the single line
   `flatsixdynamics.com` and ensure it's copied into `_site/` — but the Pages
   UI setting is the simplest path. Do NOT add a CNAME now; DNS isn't ready.)
3. **DNS records** at your domain registrar:
   - Apex `flatsixdynamics.com` → four **A** records to GitHub Pages:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (and the matching **AAAA** records if you want IPv6).
   - `www.flatsixdynamics.com` → **CNAME** → `cndjc8b88t-debug.github.io`
4. In Pages settings, wait for the DNS check, then enable **Enforce HTTPS**.
5. Update `src/_data/site.json` `baseUrl` if needed (already
   `https://flatsixdynamics.com`) so canonical links match.

After this the site serves at `https://flatsixdynamics.com/` and the privacy
URL becomes `https://flatsixdynamics.com/privacy/`.
