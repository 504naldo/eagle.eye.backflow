#!/usr/bin/env node
/**
 * Injects the shared page chrome from `_partials/` into the HTML files at the
 * repository root, in place.
 *
 * GitHub Pages serves this site straight from the repository with no deploy
 * step, so the generated HTML is committed and every page stays independently
 * valid. The workflow is: edit a partial, run `node build.mjs`, commit the
 * result. Re-running without changing a partial rewrites nothing.
 *
 * `_partials/` itself is never published — Pages (Jekyll) skips directories
 * whose name starts with an underscore.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));

/**
 * Per-page template values.
 *
 * `home` prefixes the links that point at sections of the home page: empty on
 * the home page itself (so they stay same-page anchors), `index.html` elsewhere.
 * `current` marks the nav item for the page being rendered.
 */
const PAGES = {
  'index.html': { home: '', current: 'home' },
  'faq.html': { home: 'index.html', current: 'faq' },
  'thank-you.html': { home: 'index.html', current: null },
};

/** Every page must contain a marker block for each of these. */
const PARTIALS = ['header', 'footer'];

const ARIA_CURRENT = ' aria-current="page"';

const MARKER = /([ \t]*)<!-- @partial (\w+) -->[\s\S]*?<!-- @endpartial -->/g;

async function loadPartials() {
  const entries = await Promise.all(
    PARTIALS.map(async (name) => [
      name,
      await readFile(path.join(root, '_partials', `${name}.html`), 'utf8'),
    ]),
  );
  return new Map(entries);
}

/** Substitutes `{{placeholder}}` values, failing loudly on an unknown key. */
function render(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key) => {
    if (!(key in values)) throw new Error(`unknown placeholder {{${key}}}`);
    return values[key];
  });
}

/** Re-indents a rendered partial to sit at its marker's indentation. */
function indent(block, pad) {
  return block
    .split('\n')
    .map((line) => (line.trim() ? pad + line : ''))
    .join('\n');
}

async function build() {
  const partials = await loadPartials();
  const year = String(new Date().getFullYear());
  let written = 0;

  for (const [file, page] of Object.entries(PAGES)) {
    const filePath = path.join(root, file);
    const original = await readFile(filePath, 'utf8');

    const values = {
      home: page.home,
      year,
      aria_home: page.current === 'home' ? ARIA_CURRENT : '',
      aria_faq: page.current === 'faq' ? ARIA_CURRENT : '',
    };

    let found = 0;
    const updated = original.replace(MARKER, (_match, pad, name) => {
      const template = partials.get(name);
      if (!template) throw new Error(`${file}: no partial named "${name}"`);
      found += 1;
      const body = indent(render(template, values).trimEnd(), pad);
      return `${pad}<!-- @partial ${name} -->\n${body}\n${pad}<!-- @endpartial -->`;
    });

    // A page that lost a marker would silently stop receiving updates.
    if (found !== PARTIALS.length) {
      throw new Error(
        `${file}: expected ${PARTIALS.length} partial markers, found ${found}`,
      );
    }

    if (updated === original) {
      console.log(`  unchanged  ${file}`);
      continue;
    }

    await writeFile(filePath, updated);
    written += 1;
    console.log(`  written    ${file}`);
  }

  console.log(
    `\n${written} of ${Object.keys(PAGES).length} page(s) rewritten.`,
  );
}

build().catch((error) => {
  console.error(`build failed: ${error.message}`);
  process.exitCode = 1;
});
