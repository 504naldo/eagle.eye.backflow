# eagle.eye.backflow

The website for Eagle Eye Backflow — backflow testing and repair in Metro
Vancouver. Live at [eagleeyebackflow.ca](https://eagleeyebackflow.ca).

Plain HTML, CSS, and a small amount of vanilla JavaScript. No framework, no
dependencies.

## How it is served

GitHub Pages serves the site straight from the repository root on the default
branch — there is no deploy step and no CI. Whatever HTML is committed is what
visitors get, so the generated pages are committed alongside their sources and
every page stays independently valid.

## Editing the shared header and footer

The call bar, navigation, and footer appear on all three pages. They are **not**
edited in the HTML files — those copies are generated. Edit the partial and
re-run the build:

```
_partials/header.html    call bar + navigation
_partials/footer.html    footer
```

```sh
node build.mjs
```

The script rewrites the region between the `<!-- @partial name -->` and
`<!-- @endpartial -->` markers in each page, then you commit the result.
Re-running without changing a partial rewrites nothing. Node 18 or newer; no
`npm install` required.

Editing the generated block directly in an HTML file works until the next build
overwrites it — change the partial instead.

Partials use two placeholders, both filled in by `build.mjs`:

- `{{home}}` — empty on the home page so the nav links stay same-page anchors,
  `index.html` elsewhere.
- `{{aria_home}}` / `{{aria_faq}}` — marks the current page in the nav.

To add a page, add it to the `PAGES` map in `build.mjs` and put both marker
pairs in its HTML. The build fails loudly if a page is missing a marker.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Home — services, service area, process, contact form |
| `faq.html` | Frequently asked questions |
| `thank-you.html` | Post-submission confirmation (`noindex`) |
| `style.css` | All styling |
| `script.js` | Nav toggle, footer year, contact form submission |
| `build.mjs` | Injects `_partials/` into the pages |
| `_partials/` | Shared markup — not published (Pages skips `_` directories) |
| `CNAME` | Custom domain |

## Contact form

The form posts to [Formspree](https://formspree.io) (`/f/mwpqwovj`).
`script.js` submits it over `fetch` so the visitor stays on the page, then
redirects to `thank-you.html`; if the request fails, the visitor is told and the
button is re-enabled. With JavaScript unavailable the plain form POST still
works and Formspree's `_next` field handles the redirect. A hidden `_gotcha`
field catches spam bots.
