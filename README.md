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
