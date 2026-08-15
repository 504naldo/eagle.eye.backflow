# eagle.eye.backflow

The website for Eagle Eye Backflow Services — certified backflow testing and
repair across Greater Vancouver. Live at
[eagleeyebackflow.ca](https://eagleeyebackflow.ca).

Plain HTML, CSS, and a small amount of vanilla JavaScript. No framework, no
runtime dependencies, and no npm install.

---

## How it is served

GitHub Pages serves the site straight from the repository root on the default
branch — there is no deploy step and no CI. Whatever HTML is committed is what
visitors get.

That constraint shapes everything below: the generated pages are committed
alongside their sources, and every page is independently valid HTML that works
without the build ever running.

---

## The build

```sh
node build.mjs
```

Node 18 or newer. No dependencies. Re-running without a content change rewrites
nothing, so it is safe to run any time.

It does three jobs:

1. **Injects shared chrome** into the hand-written pages, between
   `<!-- @partial name -->` and `<!-- @endpartial -->` markers.
2. **Generates a municipality landing page** for every entry in
   `_data/cities.mjs`.
3. **Writes `sitemap.xml`** from the same page list, so it cannot drift.

**Run it after any change to `_data/`, `_partials/`, or `_templates/`.** Editing
the generated block inside an HTML file works until the next build overwrites
it — change the source instead.

`_data/`, `_partials/`, and `_templates/` are never published: GitHub Pages
skips directories whose name starts with an underscore.

---

## Where to change things

| To change… | Edit | Then |
| --- | --- | --- |
| Phone, email, service area, credentials | `_data/site.mjs` | run the build |
| FAQ questions and answers | `_data/faqs.mjs` | run the build |
| A municipality page's content | `_data/cities.mjs` | run the build |
| Header, footer, booking form, mobile bar | `_partials/*.html` | run the build |
| Municipality page layout | `_templates/city.html` | run the build |
| Page titles, meta descriptions | the `PAGES` map in `build.mjs` | run the build |
| Homepage sections and copy | `index.html` directly | run the build |
| Design, colours, type | `style.css` | nothing |
| Behaviour | `script.js` | nothing |

Hand-written pages can use `{{phoneDisplay}}`, `{{phoneHref}}`, `{{email}}`,
`{{root}}`, `{{reportingLine}}`, and the other values defined in `baseValues()`
in `build.mjs`. The build substitutes them, so the phone number is never
hardcoded into a page.

### Changing the email address

`_data/site.mjs` → `site.email`. Change that one value, run the build, and every
`mailto:` link, the footer, the privacy policy, and the schema all update. No
layout change is needed to move from the Gmail address to `service@` or
`bookings@`.

### Adding a municipality page

1. Add an entry to `_data/cities.mjs` with real content — property mix, local
   conditions, and questions that actually differ for that city.
2. Add the slug to the matching `site.municipalities` entry in `_data/site.mjs`
   so it gets linked from the service-area lists and the footer.
3. Run the build.

Do not copy a page and swap the city name. The existing pages differ in
substance, and a find-and-replace page reads as filler to visitors and to search
engines.

---

## Things deliberately not claimed

The site asserts only what has been verified. Specifically absent:

- **No reviews, rating, or review count.** The section is built and ready — set
  `reviews.enabled = true` in `_data/site.mjs` and fill in the real figures from
  the Google Business Profile. Until then it does not render at all, rather than
  showing invented quotes.
- **No specific fine amounts.** The previous FAQ cited "$250 to $10,000 per
  day" without tying it to a named bylaw. Replaced with the unquantified
  `ENFORCEMENT_LINE` in `_data/site.mjs`.
- **No claim that municipalities verify testers through BSI.** Reporting is
  administered differently city to city. Every mention uses `REPORTING_LINE`,
  which names no system.
- **No street address**, years in business, customer counts, awards, or
  guarantees — including in the structured data.

Credentials that *are* stated (BCWWA certified tester, insured, report
submission, same-visit repairs, no payment until complete) were all claimed by
the previous version of the site. Remove any that turn out to be inaccurate.

---

## Contact form

The booking form posts to [Formspree](https://formspree.io) (`/f/mwpqwovj`).

`script.js` validates it, submits over `fetch` so the visitor stays on the page,
then redirects to `thank-you.html`. If the request fails the visitor is told and
given the phone number — a silent failure was the previous behaviour and it lost
leads. With JavaScript unavailable the plain form POST still works and
Formspree's `_next` field handles the redirect. A hidden `_gotcha` field catches
spam bots.

> **File uploads need a paid Formspree plan.** The upload field (photo of the
> device, municipal notice, or previous report) is built and validated
> client-side — JPG/PNG/PDF up to 10 MB — but Formspree only accepts
> attachments on its paid tiers. On the free tier a submission *with* a file
> attached will be rejected; the visitor sees the failure message and the phone
> number, so nothing is lost silently, but the attachment does not arrive.
> Either upgrade the Formspree plan or remove the field from
> `_partials/booking-form.html`. Submissions without a file are unaffected —
> empty file inputs are stripped before sending.

---

## Analytics

None is installed, and the build adds none — that is a decision with privacy
implications for the owner to make.

The instrumentation is in place though. Every phone link, email link, CTA, and
form submission carries a `data-track` attribute, and `script.js` reports these
through `gtag` or `dataLayer` if either exists, staying silent when neither
does. Events already wired: `phone-click`, `email-click`, `cta-click`,
`form-submit`, `file-upload` — each tagged with the location it fired from
(`hero`, `mobile-bar`, `city-closer-vancouver`, and so on).

To start collecting, add your analytics snippet to `_partials/head.html` and run
the build. Nothing in `script.js` needs to change. Update the privacy policy at
the same time — it currently states that the site sets no tracking cookies.

---

## Design system

The site chrome and the homepage are dark; the interior pages keep a light body
under the same dark header and footer.

Colour lives in the `:root` block at the top of `style.css`. Blue is reserved
for action — buttons, icons, small labels, dividers, hover states — and is never
used as a large fill. On the dark sections, body links step up from `--blue`
(`#1267D6`, only 3.6:1 on the deep ground) to `--accent` (`#2494FF`) to hold
WCAG AA.

Type is **Barlow Semi Condensed** for headings, labels, and buttons, and
**Barlow** for body — a signage grotesk rather than the usual Inter/Poppins
default. Both are self-hosted; see the Fonts section below.

Icons are a single inline SVG sprite (`_partials/icons.html`), referenced as
`<svg><use href="#i-name"></svg>`. Stroke colour and size come from CSS, so one
definition serves every size and surface. No icon font, no icon library.

Motion is limited to a fade-and-lift on scroll (`data-reveal`) and hover states.
The hidden state is guarded behind a `.has-js` class that `script.js` sets, so a
blocked or failed script can never leave the page blank, and
`prefers-reduced-motion` disables it outright.

## Hero image

`images/hero-backflow-*` is a real FEBCO 825Y reduced pressure zone assembly,
taken from the company flyer and colour-graded so it sits on the dark hero: the
pale water backdrop is blended toward `--ink-900` by a smooth luminance weight,
and the edges fade to transparent so the panel dissolves into the page instead
of ending on a rectangle.

The equipment itself is untouched beyond a contrast lift — no markings were
added, removed, or invented, and the grading deliberately protects the brass and
the blue handle so the assembly stays technically credible.

Served as AVIF with WebP and PNG fallbacks at two widths through `<picture>`.
The PNG keeps the alpha edge-fade for browsers without either modern format.

## Logo and icons

`images/logo.png` is the Eagle Eye eagle mark, used in the header, in the
footer, and as the source for every icon. It was lifted from the company flyer
and cleaned up: the flyer's water graphic was painted out of the bottom-left
corner, and the page's off-white ground was normalised to pure white so the mark
sits invisibly on the white masthead.

Two consequences worth knowing:

- **It is raster, at 228×268.** Ample for the header (38px), the footer (41px),
  and the icons, but it will soften if used much larger. If the original vector
  (AI, EPS, or SVG) turns up, drop it in and it will be sharper at any size.
- **It needs a light background.** The eagle's head is white and its outlines
  are navy, so on the dark footer it sits on a white tile rather than dissolving
  into the ground. A proper reversed (light-on-dark) version of the artwork
  would remove the need for that tile — that has to come from the designer, not
  be faked from this file.

Icons (`favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`) are the mark
centred on a white square. **There is deliberately no SVG favicon**: browsers
prefer an SVG over every PNG on offer, so a stale or approximated SVG would
silently override all of them. The previous placeholder `logo.svg` and
`favicon.svg` — a generic shield and water droplet in the old palette — have
been deleted.

To regenerate the icons after replacing the logo, centre `images/logo.png` on a
white square and export at 32px, 180px, and 192px.

## Fonts

Barlow and Barlow Semi Condensed, self-hosted from `fonts/` (Latin subset,
~124 KB across five weights). Serving them from this origin rather than
fonts.googleapis.com removes a third-party render-blocking stylesheet and two
extra connections from the critical path, and the page still renders in its
intended type if Google is unreachable.

Every weight declared in `style.css` must exist in `fonts/`. To add one,
download the Latin `woff2` from Google Fonts into `fonts/` and add an
`@font-face` block.

---

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Homepage |
| `contact.html` | Booking / quote page |
| `service-areas.html` | Service-area hub |
| `faq.html` | FAQ (content from `_data/faqs.mjs`) |
| `privacy-policy.html` | Privacy policy |
| `thank-you.html` | Post-submission confirmation (`noindex`) |
| `*-backflow-testing/` | Generated municipality pages |
| `style.css` | All styling, including `@font-face` |
| `script.js` | Nav, form validation and submit, tracking hooks |
| `build.mjs` | The build |
| `_data/` | Business facts, city content, FAQ content |
| `_partials/` | Shared markup |
| `_templates/` | Municipality page template |
| `fonts/`, `images/` | Assets |
| `sitemap.xml` | Generated — do not edit by hand |
| `CNAME` | Custom domain |

---

## Still needed from the owner

- Real Google reviews (rating, count, profile URL, three quotes)
- Photographs: actual backflow assemblies, a test gauge connected to a device,
  a technician working, Eagle Eye test tags, mechanical rooms. The site
  currently ships one abstract water image used as hero texture — no stock
  photography and no invented Vancouver skyline.
- Google Business Profile link
- Official BCWWA certification artwork, if it may be displayed
- A decision on the branded email address
- Confirmation that every credential listed in `_data/site.mjs` is accurate
- Legal review of `privacy-policy.html` against BC's PIPA
