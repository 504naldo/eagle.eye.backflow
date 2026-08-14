/**
 * FAQ content.
 *
 * This is the single source for both the visible FAQ page and its FAQPage
 * structured data — Google requires the two to match, and generating them from
 * one list is the only reliable way to guarantee that.
 *
 * Answers are plain text (no markup) so the same string is valid in both.
 *
 * Two claims from the previous version of this page were removed deliberately:
 *
 *   - A specific fine range ("$250 to $10,000 per day") that was not tied to a
 *     named municipality or bylaw.
 *   - A blanket statement that every municipality verifies testers through BSI.
 *
 * Both are replaced with the hedged wording in `_data/site.mjs`. Do not
 * reintroduce specifics unless they can be cited to a named bylaw.
 */

export const faqs = [
  {
    q: 'What is a backflow preventer?',
    a:
      'A backflow preventer is a valve assembly installed on a water line to stop water ' +
      'flowing backwards into the drinking water supply. If pressure in the system drops ' +
      'or reverses, whatever is on the far side of that connection — irrigation water, ' +
      'boiler treatment, chemicals, process water — can be drawn back toward the mains. ' +
      'The assembly is what stands between that and the potable supply.',
  },
  {
    q: 'Why does a backflow preventer need testing?',
    a:
      'Because it is a mechanical device with moving parts, springs, and seals, and it ' +
      'fails silently. A backflow assembly that has stopped working looks exactly like ' +
      'one that is working. Testing is the only way to confirm it still holds, which is ' +
      'why testing is required rather than optional.',
  },
  {
    q: 'How often does backflow testing need to be completed?',
    a:
      'Annual testing is the general standard for backflow assemblies, and some ' +
      'installations are required to be tested more frequently depending on the hazard ' +
      'and the property. The requirement that applies to your property is set by your ' +
      'municipality. If you have received a notice, it will state the deadline — send it ' +
      'to us and we will work to it.',
  },
  {
    q: 'How long does a backflow test take?',
    a:
      'The test itself is normally quick — often around 20 to 30 minutes per assembly ' +
      'once we have access to it and the paperwork is prepared. Finding the device and ' +
      'getting into the space it lives in is frequently the longer part of the visit, ' +
      'which is why access details help so much when you book.',
  },
  {
    q: 'Does Eagle Eye submit the test report?',
    a:
      'Yes. Reporting requirements vary by municipality, and Eagle Eye submits the ' +
      'required test documentation through the applicable municipal reporting system on ' +
      'your behalf. You do not need to understand or navigate the reporting process ' +
      'yourself.',
  },
  {
    q: 'What happens if my backflow device fails the test?',
    a:
      'A failed assembly needs to be repaired or replaced and then retested. We will tell ' +
      'you at the time what has failed, whether it is repairable, and what it will cost ' +
      'before any repair work goes ahead.',
  },
  {
    q: 'Can you repair the device during the same visit?',
    a:
      'Often, yes. We carry common replacement parts and rebuild kits, so many typical ' +
      'failures — fouled check valves, worn relief valves, perished seals — can be ' +
      'repaired and the assembly retested before we leave. Larger assemblies and less ' +
      'common devices sometimes need a part ordered in, and we will tell you that on the ' +
      'spot rather than afterwards.',
  },
  {
    q: 'Do I need to be on site during the test?',
    a:
      'Usually not. What we need is access to the assembly. If a caretaker, building ' +
      'manager, tenant, or concierge can let us in, most tests are completed without the ' +
      'owner or strata council present.',
  },
  {
    q: 'Will the water be shut off?',
    a:
      'Briefly, to the line the assembly protects — normally a matter of minutes per ' +
      'device. Where that matters, such as a restaurant mid-service or a medical office, ' +
      'tell us when you book and we will schedule around it.',
  },
  {
    q: 'How much does backflow testing cost?',
    a:
      'It depends on the number of assemblies, their size and type, and how accessible ' +
      'they are — which is why we quote rather than publish a single figure. Send us a ' +
      'photo of the device or your municipal notice and we will give you clear pricing ' +
      'before any work begins. You do not pay until the work is complete.',
  },
  {
    q: 'What happens if testing is not completed?',
    a:
      'Failure to complete required testing may result in enforcement action, fees, or ' +
      'other penalties depending on your municipality. The specifics differ from one ' +
      'city to the next, so check the notice you received or ask us and we will point ' +
      'you to the right place.',
  },
  {
    q: 'Which municipalities do you service?',
    a:
      'Eagle Eye covers Greater Vancouver: Vancouver, Richmond, Surrey, Delta including ' +
      'Ladner and Tsawwassen, Burnaby, New Westminster, Coquitlam, Port Coquitlam, Port ' +
      'Moody, Langley, North Vancouver, and West Vancouver. If your community is nearby ' +
      'but not listed, ask — we will tell you straight away whether we can attend.',
  },
  {
    q: 'Do you work with strata corporations and property managers?',
    a:
      'Yes, and a large part of the work is exactly that. We can work to your access ' +
      'procedures, coordinate with caretakers directly, and provide documentation in the ' +
      'form your records need.',
  },
  {
    q: 'Can you handle testing across multiple properties?',
    a:
      'Yes. Send the full address list rather than booking one at a time and we will ' +
      'group the testing into as few visits as the geography allows, complete repairs ' +
      'where we can, and handle report submission across the whole portfolio.',
  },
];
