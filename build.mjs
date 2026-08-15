#!/usr/bin/env node
/**
 * Static build for eagleeyebackflow.ca.
 *
 * GitHub Pages serves this repository straight from the root with no deploy
 * step, so everything this script produces is committed and every page stays
 * independently valid. Nothing here runs at request time.
 *
 * It does three jobs:
 *
 *   1. Injects shared chrome from `_partials/` into the hand-written pages,
 *      between `<!-- @partial name -->` and `<!-- @endpartial -->` markers.
 *   2. Generates a municipality landing page for every entry in
 *      `_data/cities.mjs`, from `_templates/city.html`.
 *   3. Writes `sitemap.xml` from the same page list, so it cannot drift.
 *
 * Usage: `node build.mjs` (Node 18+, no dependencies). Re-running without a
 * content change rewrites nothing.
 *
 * `_data/`, `_partials/`, and `_templates/` are never published — Pages skips
 * directories whose name starts with an underscore.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { site, REPORTING_LINE, ENFORCEMENT_LINE } from './_data/site.mjs';
import { cities } from './_data/cities.mjs';
import { faqs } from './_data/faqs.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));

/* -------------------------------------------------------------------------- */
/* Hand-written pages                                                          */
/* -------------------------------------------------------------------------- */

/**
 * One entry per page that carries partial markers. `nav` highlights the
 * matching item in the navigation; `sitemap: false` keeps a page out of
 * sitemap.xml (used for the pages that are also `noindex`).
 */
const PAGES = {
  'index.html': {
    url: '/',
    nav: 'home',
    title: 'Backflow Testing & Repair Greater Vancouver | Eagle Eye Backflow Services',
    description:
      'Certified backflow testing, repair, and report submission across Greater ' +
      'Vancouver. We test your backflow preventer, file the required documentation for ' +
      'you, and complete many repairs during the same visit. Call or text 604-283-3804.',
    priority: '1.0',
  },
  'service-areas.html': {
    url: '/service-areas.html',
    nav: 'areas',
    title: 'Backflow Testing Service Areas | Greater Vancouver | Eagle Eye Backflow',
    description:
      'Eagle Eye provides certified backflow testing across Vancouver, Richmond, Surrey, ' +
      'Delta, Burnaby, and the wider Greater Vancouver area. Call or text 604-283-3804.',
    priority: '0.8',
  },
  'faq.html': {
    url: '/faq.html',
    nav: 'faq',
    title: 'Backflow Testing FAQ | Greater Vancouver | Eagle Eye Backflow',
    description:
      'Answers about backflow testing: what a backflow preventer is, how often testing ' +
      'is required, what happens if a device fails, and who submits the report.',
    priority: '0.7',
  },
  'contact.html': {
    url: '/contact.html',
    nav: 'contact',
    title: 'Book a Backflow Test | Greater Vancouver | Eagle Eye Backflow',
    description:
      'Book certified backflow testing across Greater Vancouver. Send your property ' +
      'details and we will confirm pricing before any work begins.',
    priority: '0.9',
  },
  'privacy-policy.html': {
    url: '/privacy-policy.html',
    nav: null,
    title: 'Privacy Policy | Eagle Eye Backflow Services',
    description:
      'How Eagle Eye Backflow Services handles the information you send through this ' +
      'website.',
    priority: '0.2',
  },
  'thank-you.html': {
    url: '/thank-you.html',
    nav: null,
    title: 'Request Received | Eagle Eye Backflow Services',
    description: 'Your backflow testing request has been received.',
    noindex: true,
    sitemap: false,
  },
};

/** Partials every page is expected to carry, in addition to `head`. */
const CHROME = ['head', 'header', 'footer', 'mobileCta'];

const PARTIAL_FILES = {
  head: 'head.html',
  header: 'header.html',
  footer: 'footer.html',
  mobileCta: 'mobile-cta.html',
  bookingForm: 'booking-form.html',
  reviews: 'reviews.html',
  icons: 'icons.html',
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Substitutes `{{placeholder}}` values, failing loudly on an unknown key. */
function render(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key) => {
    if (!(key in values)) throw new Error(`unknown placeholder {{${key}}}`);
    return values[key] ?? '';
  });
}

/** Re-indents a rendered block to sit at its marker's indentation. */
function indent(block, pad) {
  return block
    .split('\n')
    .map((line) => (line.trim() ? pad + line : ''))
    .join('\n');
}

const slugToHref = (rootPrefix, slug) => `${rootPrefix}${slug}/`;

/* -------------------------------------------------------------------------- */
/* Shared template values                                                      */
/* -------------------------------------------------------------------------- */

const YEAR = String(new Date().getFullYear());
const TODAY = new Date().toISOString().slice(0, 10);

/** Municipalities that have a landing page, in the order they are declared. */
const linkedCities = site.municipalities.filter((m) => m.page);

/**
 * Values shared by every page. `rootPrefix` is '' for pages at the repository
 * root and '../' for the municipality pages, which live one directory down.
 */
function baseValues(rootPrefix) {
  return {
    root: rootPrefix,
    siteUrl: site.url,
    phoneDisplay: site.phone.display,
    phoneHref: site.phone.href,
    email: site.email,
    formEndpoint: site.formEndpoint,
    year: YEAR,
    reportingLine: REPORTING_LINE,
    enforcementLine: ENFORCEMENT_LINE,

    footerCityLinks: linkedCities
      .map((m) => `<li><a href="${slugToHref(rootPrefix, m.page)}">${m.name}</a></li>`)
      .join('\n                    '),

    credentialItems: site.credentials
      .map((c) => `<li>${c}</li>`)
      .join('\n                '),

    /** Every municipality; the ones with a landing page link to it. */
    allCityLinks: site.municipalities
      .map((m) =>
        m.page
          ? `<li><a href="${slugToHref(rootPrefix, m.page)}">${m.name}</a></li>`
          : `<li><span>${m.name}</span></li>`,
      )
      .join('\n                '),

    municipalityOptions: site.municipalities
      .map((m) => `<option value="${escapeHtml(m.name)}">${m.name}</option>`)
      .join('\n                '),

    deviceOptions: site.deviceCounts
      .map((d) => `<option value="${escapeHtml(d)}">${d}</option>`)
      .join('\n                '),

    serviceOptions: site.serviceTypes
      .map((s) => `<option value="${escapeHtml(s)}">${s}</option>`)
      .join('\n                '),

    // Nav highlighting — overwritten per page below.
    nav_services: '',
    nav_why: '',
    nav_serve: '',
    nav_areas: '',
    nav_resources: '',
  };
}

const ARIA_CURRENT = ' aria-current="page"';

function navValues(current) {
  return {
    nav_services: '',
    nav_why: '',
    nav_serve: '',
    nav_areas: current === 'areas' ? ARIA_CURRENT : '',
    nav_resources: current === 'faq' ? ARIA_CURRENT : '',
  };
}

/* -------------------------------------------------------------------------- */
/* Structured data                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Only verified company information goes into schema. There is deliberately no
 * street address (Eagle Eye does not publish one), no aggregate rating, and no
 * founding date.
 */
function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#business`,
    name: site.name,
    description:
      'Certified backflow assembly testing, repair, and report submission across ' +
      'Greater Vancouver, British Columbia.',
    url: `${site.url}/`,
    telephone: '+1-604-283-3804',
    email: site.email,
    image: `${site.url}/images/og-card.jpg`,
    logo: `${site.url}/images/logo.png`,
    priceRange: '$$',
    areaServed: site.municipalities.map((m) => ({
      '@type': 'City',
      name: m.name,
      containedInPlace: { '@type': 'AdministrativeArea', name: 'British Columbia' },
    })),
    serviceType: [
      'Backflow testing',
      'Backflow preventer repair',
      'Backflow retesting',
      'Cross connection control',
    ],
  };
}

function faqSchema(entries) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function citySchema(city) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Backflow testing in ${city.name}, BC`,
      serviceType: 'Backflow assembly testing and repair',
      provider: { '@id': `${site.url}/#business` },
      areaServed: { '@type': 'City', name: city.name, address: { '@type': 'PostalAddress', addressRegion: 'BC', addressCountry: 'CA' } },
      url: `${site.url}/${city.slug}/`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${site.url}/service-areas.html` },
        { '@type': 'ListItem', position: 3, name: city.name, item: `${site.url}/${city.slug}/` },
      ],
    },
    faqSchema(city.faqs),
  ];
}

/** `</script>` inside JSON would close the tag early, so `<` is escaped. */
const jsonLd = (data) => JSON.stringify(data, null, 4).replace(/</g, '\\u003c');

const scriptTag = (data) =>
  `<script type="application/ld+json">\n${jsonLd(data)}\n</script>`;

/** The visible FAQ list, generated from the same entries as the schema. */
function renderFaqList(entries) {
  return `<div class="faq-list">
${entries
  .map(
    ({ q, a }) => `    <details class="faq">
        <summary><span>${q}</span></summary>
        <div class="faq__body"><p>${a}</p></div>
    </details>`,
  )
  .join('\n')}
</div>`;
}

/* -------------------------------------------------------------------------- */
/* Build                                                                       */
/* -------------------------------------------------------------------------- */

async function loadPartials() {
  const entries = await Promise.all(
    Object.entries(PARTIAL_FILES).map(async ([key, file]) => [
      key,
      await readFile(path.join(root, '_partials', file), 'utf8'),
    ]),
  );
  return Object.fromEntries(entries);
}

/** Renders the review section, or an instructional comment when it is off. */
function renderReviews(partials, values) {
  const { reviews } = site;

  if (!reviews.enabled) {
    return [
      '<!--',
      '    Google review section — intentionally not rendered.',
      '',
      '    No rating, review count, or customer quote is invented here. To turn this',
      '    section on: open _data/site.mjs, set reviews.enabled to true, fill in the',
      '    real rating, count, profile URL, and featured quotes from the Google',
      '    Business Profile, then run `node build.mjs`.',
      '',
      '    The markup itself lives in _partials/reviews.html.',
      '-->',
    ].join('\n');
  }

  const cards = reviews.featured
    .map(
      (r) => `<blockquote class="review">
                    <p class="review__stars" aria-label="5 out of 5">★★★★★</p>
                    <p class="review__quote">${r.quote}</p>
                    <footer class="review__author">${r.author}${r.role ? `<span>${r.role}</span>` : ''}</footer>
                </blockquote>`,
    )
    .join('\n                ');

  return render(partials.reviews, {
    ...values,
    reviewRating: reviews.rating ?? '',
    reviewCount: reviews.count ?? '',
    reviewUrl: reviews.profileUrl,
    reviewCards: cards,
  });
}

/** Fills the partial markers in one hand-written page. */
function injectPartials(source, file, partials, values, expected) {
  const seen = new Set();

  const output = source.replace(
    /([ \t]*)<!-- @partial (\w+) -->[\s\S]*?<!-- @endpartial -->/g,
    (_match, pad, name) => {
      let body;

      if (name === 'reviews') {
        body = renderReviews(partials, values);
      } else if (name === 'bookingForm') {
        body = render(partials.bookingForm, values);
      } else if (name === 'businessSchema') {
        body = scriptTag(businessSchema());
      } else if (name === 'faqSchema') {
        body = scriptTag(faqSchema(faqs));
      } else if (name === 'faqList') {
        body = renderFaqList(faqs);
      } else if (partials[name]) {
        body = render(partials[name], values);
      } else {
        throw new Error(`${file}: no partial named "${name}"`);
      }

      seen.add(name);
      return `${pad}<!-- @partial ${name} -->\n${indent(body.trimEnd(), pad)}\n${pad}<!-- @endpartial -->`;
    },
  );

  const missing = expected.filter((name) => !seen.has(name));
  if (missing.length) {
    throw new Error(`${file}: missing partial marker(s): ${missing.join(', ')}`);
  }

  return output;
}

async function writeIfChanged(filePath, contents, label) {
  let existing = null;
  try {
    existing = await readFile(filePath, 'utf8');
  } catch {
    /* new file */
  }

  if (existing === contents) {
    console.log(`  unchanged  ${label}`);
    return 0;
  }

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, contents);
  console.log(`  written    ${label}`);
  return 1;
}

async function build() {
  const partials = await loadPartials();
  let written = 0;

  console.log('Pages');
  for (const [file, page] of Object.entries(PAGES)) {
    const filePath = path.join(root, file);
    const source = await readFile(filePath, 'utf8');

    const values = {
      ...baseValues(''),
      ...navValues(page.nav),
      title: escapeHtml(page.title),
      description: escapeHtml(page.description),
      canonical: `${site.url}${page.url}`,
      robotsTag: page.noindex ? '<meta name="robots" content="noindex, follow">' : '',
    };

    // The page body is substituted first so hand-written pages can use the
    // shared values too, then the partial markers are filled.
    written += await writeIfChanged(
      filePath,
      injectPartials(render(source, values), file, partials, values, CHROME),
      file,
    );
  }

  console.log('\nMunicipality pages');
  const template = await readFile(path.join(root, '_templates', 'city.html'), 'utf8');

  for (const city of cities) {
    const values = {
      ...baseValues('../'),
      ...navValues('areas'),
      title: escapeHtml(city.title),
      description: escapeHtml(city.description),
      canonical: `${site.url}/${city.slug}/`,
      robotsTag: '',
      slug: city.slug,
      cityName: city.name,
      h1: city.h1,
      lede: city.lede,
      localNote: city.localNote,
      repairs: city.repairs,
      citySchema: jsonLd(citySchema(city)),

      introParagraphs: city.intro
        .map((p) => `<p>${p}</p>`)
        .join('\n                '),

      propertyItems: city.properties
        .map(
          (p) => `<div class="spec">
                    <h3 class="spec__title">${p.title}</h3>
                    <p class="spec__text">${p.text}</p>
                </div>`,
        )
        .join('\n                '),

      faqItems: city.faqs
        .map(
          ({ q, a }) => `<details class="faq">
                    <summary><span>${q}</span></summary>
                    <div class="faq__body"><p>${a}</p></div>
                </details>`,
        )
        .join('\n                '),

      nearbyLinks: city.nearby
        .map((name) => {
          const match = site.municipalities.find((m) => m.name === name);
          return match?.page
            ? `<li><a href="../${match.page}/">${name}</a></li>`
            : `<li><span>${name}</span></li>`;
        })
        .join('\n                '),
    };

    // The chrome partials are rendered first, then dropped into the template.
    values.head = render(partials.head, values);
    values.header = render(partials.header, values);
    values.footer = render(partials.footer, values);
    values.mobileCta = render(partials.mobileCta, values);

    written += await writeIfChanged(
      path.join(root, city.slug, 'index.html'),
      render(template, values),
      `${city.slug}/index.html`,
    );
  }

  console.log('\nSitemap');
  const urls = [
    ...Object.values(PAGES)
      .filter((p) => p.sitemap !== false)
      .map((p) => ({ loc: `${site.url}${p.url}`, priority: p.priority })),
    ...cities.map((c) => ({ loc: `${site.url}/${c.slug}/`, priority: '0.8' })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) => `    <url>
        <loc>${loc}</loc>
        <lastmod>${TODAY}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
    </url>`,
  )
  .join('\n')}
</urlset>
`;

  written += await writeIfChanged(path.join(root, 'sitemap.xml'), sitemap, 'sitemap.xml');

  console.log(`\n${written} file(s) written.`);
}

build().catch((error) => {
  console.error(`\nbuild failed: ${error.message}`);
  process.exitCode = 1;
});
