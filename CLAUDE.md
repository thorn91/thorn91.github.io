# thomashorn.info — Tom's personal site

Handoff written 2026-08-28 by the session that split this site's coaching page off into
its own company. Everything below was true and verified on that date.

## What this is

Tom Horn's personal site: a grab-bag of pages under one roof — a landing page, a page
for his son Alex, a party invitation, a Three.js maze game, and a redirect stub where
the Pretty Good Video Coaching page used to live. It is deliberately low-stakes and
personal. It is NOT the company site (see "Related repos" — do not blur them).

## Stack and deploy

- **Astro 4** + `@astrojs/tailwind` (though existing pages mostly use hand-rolled
  scoped CSS, some `lang="scss"`), Node/npm. `npm run dev` / `npm run build`.
- **GitHub Pages user site**: repo `thorn91/thorn91.github.io`, deployed by
  `.github/workflows/deploy.yml` (withastro/action) **on every push to `main`** —
  pushing IS publishing, there is no staging. Check a deploy with
  `gh run watch $(gh run list --workflow=deploy.yml --limit 1 --json databaseId -q '.[0].databaseId')`.
- **Custom domain**: `thomashorn.info` via `public/CNAME`. One custom domain per repo —
  this file is why the repo can't also serve any other domain. DNS lives at Porkbun.
- Site URL is set in `astro.config.mjs` (`site: 'https://thomashorn.info'`). No `base`
  — a user site with a custom domain serves from root. Don't add one.

## Pages inventory

| Page | What it is |
|---|---|
| `index.astro` | Landing page |
| `alexhorn.astro` | Page for Alex (profile photo in `src/assets/images/`) |
| `annvitation.astro` | Party invitation |
| `lightsoutmaze.astro` | ~1,250-line Three.js maze game (find torches, find the exit). Committed 2026-08-28 after sitting uncommitted for a long while; live but lightly reviewed. Imports three@0.120 off unpkg inside a `<script>`. |
| `coaching.astro` | **A redirect stub, on purpose — read the next section before touching it** |

## The /coaching contract (important)

`/coaching` was the Pretty Good Video Coaching product page. On 2026-08-28 it moved to
its own domain and this page became a redirect (meta refresh + `location.replace` +
canonical — GitHub Pages can't emit real 301s). Two rules:

1. **Never resurrect content at `/coaching`** — the product page lives in the
   `prettygoodsoftware-coaching` repo now. Edits to coaching content go there.
2. **Never delete `public/coaching/*.jpg`.** Link previews sent before the move
   (iMessage, Slack) still fetch `og:image` = `thomashorn.info/coaching/icon.jpg` from
   THIS host, and iMessage caches scraped URLs for a long time. The images are a
   compatibility shim, not cruft.

## Related repos — do not cross the streams

Same GitHub account hosts three Pages sites (unlimited *project* sites is the rule;
only the `<user>.github.io` *user* site is one-per-account):

- `~/Source/prettygoodsoftware-www` → **prettygoodsoftware.llc** (company page; Riso
  Press design — oat `#F3EBDA`, vermilion `#E14424` + grape `#4B3A8C` overprint
  circles, Bricolage Grotesque + Newsreader)
- `~/Source/prettygoodsoftware` → **coaching.prettygoodsoftware.llc** (product page)
- This repo → **thomashorn.info**

The personal site owes the company sites nothing stylistically. If Tom asks for
company/product changes in a personal-site session, the answer is "that lives in the
other repo," not a cross-repo edit from here.

## Gotchas that cost real time (learned the hard way)

- **GitHub Pages TLS certs can wedge silently** ("not issued yet" for hours). Fix that
  worked instantly: remove and re-add the custom domain —
  `echo '{"cname":null}' | gh api -X PUT repos/thorn91/<repo>/pages --input -` then
  PUT the real cname back, then `-F https_enforced=true` once issued.
- **Porkbun DNS edit screen**: "Do not delete existing records" must STAY CHECKED or
  submitting wipes the whole zone, including the MX records that route
  `@prettygoodsoftware.llc` mail. A specific-host record beats the wildcard, so add,
  don't replace.
- **Headless-Chrome screenshots of pages using Google Fonts race the font load** —
  `display:block` hides text until the font arrives, so a too-early screenshot ships
  images with missing text. Inline the font as base64 for asset renders, and note
  Google's CSS lists the **Vietnamese subset first** — grab the LAST
  fonts.gstatic.com URL for latin. Pixel-check text regions before accepting a render.
- **Headless Chrome `--window-size` is not a mobile viewport.** It produced a
  false-broken mobile screenshot here. Verify mobile layouts with a real viewport
  emulation (the in-app browser's mobile preset), not window flags.
- **Global `img { max-width:100% }` needs `height:auto`** when imgs carry
  width/height attributes, or capped images stretch vertically.
- GitHub Pages caches HTML ~10 min — "it's not fixed" right after a deploy usually
  means cache, so hard-refresh before debugging.

## Working with Tom

Persistent memory exists at `~/Documents/Tom/Agent/memory/` (see `MEMORY.md` index) —
the entries that matter most here: **copy-voice** (do less; never absolute or
foreclosing; facts, not claimed virtue; his failure-mode callout is always "too much,"
never "too plain"), **ask-before-irreversible-actions**, and **polish-bar** (MVPs must
be polished; a bare scaffold is a bug). He's a senior engineer (Java/Spring, Angular,
Python) — explain web/Astro specifics briefly, skip programming basics. Iterate copy
WITH him in short rounds; when he supplies a phrasing, use it near-verbatim. He says
"push" when he means commit+push+deploy — but pushing this repo publishes instantly,
so surface anything unexpected sitting in the working tree before sweeping it into a
commit.
