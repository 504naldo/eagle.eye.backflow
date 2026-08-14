/**
 * Business facts, in one place.
 *
 * Everything the site says about Eagle Eye — phone number, email, service
 * area, credentials — is read from here by `build.mjs`. Change a value once
 * and re-run the build rather than editing the generated HTML.
 *
 * Only claims already established by the previous version of the site appear
 * here. Nothing about years in business, customer counts, ratings, or awards
 * is asserted anywhere, because none of it has been verified.
 */

export const site = {
  name: 'Eagle Eye Backflow Services',
  shortName: 'Eagle Eye Backflow',
  url: 'https://eagleeyebackflow.ca',

  phone: {
    /** What visitors read. */
    display: '604-283-3804',
    /** E.164 for `tel:` so it dials from outside Canada too. */
    href: 'tel:+16042833804',
    /** Same number, digits only, for `sms:`. */
    sms: 'sms:+16042833804',
  },

  /**
   * Currently a Gmail address, as supplied.
   *
   * To move to service@ or bookings@ later, change this one value and re-run
   * the build — no template or layout change is needed.
   */
  email: 'eagle.eye.backflow@gmail.com',

  /** Formspree endpoint the booking form posts to. */
  formEndpoint: 'https://formspree.io/f/mwpqwovj',

  /**
   * Google reviews.
   *
   * Left off deliberately: no rating, review count, or customer quote is
   * invented. Set `enabled: true` and fill in the fields below once the real
   * numbers are available from the Google Business Profile, then re-run the
   * build and the review section appears on the homepage.
   */
  reviews: {
    enabled: false,
    rating: null,          // e.g. '5.0'
    count: null,           // e.g. '27'
    profileUrl: '',        // Google Business Profile review link
    featured: [
      // { quote: '…', author: '…', role: '…' },
    ],
  },

  /**
   * Credentials. Each of these was already claimed by the previous site — none
   * is new. Remove any that turn out to be inaccurate rather than adding to it.
   */
  credentials: [
    'BCWWA Certified Tester',
    'Insured',
    'Report Submission Included',
    'Same-Visit Repairs',
  ],

  /**
   * Everywhere Eagle Eye works. `page` links a municipality to its landing
   * page; the rest are listed without one until a page is written for them.
   */
  municipalities: [
    { name: 'Vancouver', page: 'vancouver-backflow-testing' },
    { name: 'Richmond', page: 'richmond-backflow-testing' },
    { name: 'Surrey', page: 'surrey-backflow-testing' },
    { name: 'Delta', page: 'delta-backflow-testing' },
    { name: 'Burnaby', page: 'burnaby-backflow-testing' },
    { name: 'New Westminster' },
    { name: 'Coquitlam' },
    { name: 'Port Coquitlam' },
    { name: 'Port Moody' },
    { name: 'Langley' },
    { name: 'North Vancouver' },
    { name: 'West Vancouver' },
    { name: 'Tsawwassen' },
    { name: 'Ladner' },
  ],

  /** Options for the "number of devices" field on the booking form. */
  deviceCounts: ['1', '2–5', '6–10', '10+', 'Not sure'],

  /** Options for the "service needed" field on the booking form. */
  serviceTypes: [
    'Annual backflow test',
    'Failed device / repair',
    'Retest',
    'Multi-property testing',
    'Not sure',
  ],
};

/**
 * The line used whenever municipal reporting comes up.
 *
 * Reporting is administered differently from city to city, so the site never
 * names a specific system or claims a universal process.
 */
export const REPORTING_LINE =
  'Reporting requirements vary by municipality. Eagle Eye submits the required ' +
  'test documentation through the applicable municipal reporting system on your behalf.';

/**
 * The line used whenever consequences of a missed test come up.
 *
 * Deliberately unquantified: the previous site cited a specific daily fine
 * range that was not tied to a named bylaw.
 */
export const ENFORCEMENT_LINE =
  'Failure to complete required testing may result in enforcement action, fees, ' +
  'or other penalties depending on your municipality.';
