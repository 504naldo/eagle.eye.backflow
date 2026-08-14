/**
 * Municipality landing pages.
 *
 * Each entry is written from scratch. The property mix, local conditions, and
 * questions differ genuinely between these cities, and the pages say so — a
 * page that only swapped the city name would read as filler to both visitors
 * and search engines.
 *
 * What is deliberately NOT here: named bylaws, testing frequencies, fine
 * amounts, or the name of any municipality's reporting system. Those vary and
 * none has been verified, so every page falls back to the hedged wording in
 * `_data/site.mjs`.
 *
 * To add a municipality: copy an entry, write real content for it, and add the
 * slug to `site.municipalities` so it is linked from the service-area lists.
 */

export const cities = [
  {
    slug: 'vancouver-backflow-testing',
    name: 'Vancouver',
    title: 'Backflow Testing Vancouver | Certified Tester | Eagle Eye Backflow',
    description:
      'Certified backflow testing and repair in Vancouver. We test your device, ' +
      'handle the documentation, and repair many failures during the same visit. ' +
      'Call or text 604-283-3804.',
    h1: 'Backflow Testing in Vancouver',
    lede:
      'Certified testing for strata towers, restaurants, retail, and commercial ' +
      'buildings across the city — with the reporting handled for you.',

    intro: [
      'Vancouver has one of the densest concentrations of backflow assemblies in the ' +
      'province, and very little of it sits in an easy location. Downtown and West End ' +
      'towers keep their assemblies in below-grade parkade mechanical rooms. Restaurants ' +
      'along Main, Commercial, Denman, and through Gastown often have devices tucked ' +
      'behind kitchen equipment or in shared service corridors.',

      'Older buildings through Strathcona, Mount Pleasant, and Kitsilano add a further ' +
      'wrinkle: assemblies retrofitted into buildings that were never designed around ' +
      'them, sometimes in a crawlspace or a closet that nobody has opened in a year. ' +
      'Eagle Eye is used to finding them. If you are not sure where your device is or ' +
      'whether you even have one, send us the address and we will work it out.',
    ],

    properties: [
      {
        title: 'Strata towers and mixed-use buildings',
        text:
          'High-rise residential with commercial at grade, where the residential and ' +
          'commercial services are often protected separately and both need testing.',
      },
      {
        title: 'Restaurants and food service',
        text:
          'Carbonation, dish, and combi-oven connections in tight kitchens, tested with ' +
          'as little disruption to service as we can manage.',
      },
      {
        title: 'Office and retail',
        text:
          'Tower mechanical rooms, ground-floor retail units, and tenant improvements ' +
          'that added a device without anyone tracking it.',
      },
      {
        title: 'Hotels and hospitality',
        text:
          'Multiple assemblies across laundry, kitchen, pool, and irrigation services in ' +
          'a single property.',
      },
      {
        title: 'Medical and dental offices',
        text:
          'Chair units and sterilization equipment, where continuity of the schedule ' +
          'matters as much as the test itself.',
      },
      {
        title: 'Irrigation systems',
        text:
          'Landscaped strata grounds, boulevards, and courtyards, typically tested in ' +
          'the spring once the system is charged.',
      },
    ],

    localNote:
      'Access is the single biggest cause of a rescheduled test in Vancouver. Parkade ' +
      'mechanical rooms, locked service corridors, and restaurants that can only give ' +
      'access outside service hours all need arranging in advance. Tell us up front what ' +
      'the access situation is and we will book a window that works — for most buildings ' +
      'you do not need to be there yourself, as long as we can get in.',

    repairs:
      'Downtown buildings are exactly where a second appointment hurts most, because ' +
      'coordinating access twice can take longer than the repair. We carry common ' +
      'replacement parts and rebuild kits, so where a device fails on a serviceable ' +
      'fault we will usually repair and retest it before we leave.',

    faqs: [
      {
        q: 'Do I need to be on site for the test in Vancouver?',
        a:
          'Usually not. What we need is access. If a building manager, concierge, or ' +
          'caretaker can let us into the mechanical room, most tests are completed ' +
          'without the owner or strata council present.',
      },
      {
        q: 'Can you test outside restaurant service hours?',
        a:
          'In most cases, yes. Tell us your service window when you book and we will ' +
          'schedule around it wherever the building allows access at that time.',
      },
      {
        q: 'My building has several assemblies. Is that one visit?',
        a:
          'Normally yes. Multiple devices at one address are tested in a single visit, ' +
          'and each one is documented and submitted separately as required.',
      },
      {
        q: 'The water will be off during the test?',
        a:
          'Briefly, to the line the device protects — usually a matter of minutes per ' +
          'assembly. For restaurants and medical offices we will confirm the timing with ' +
          'you before we shut anything down.',
      },
    ],

    nearby: ['Burnaby', 'Richmond', 'North Vancouver', 'West Vancouver', 'New Westminster'],
  },

  {
    slug: 'richmond-backflow-testing',
    name: 'Richmond',
    title: 'Backflow Testing Richmond BC | Certified Tester | Eagle Eye Backflow',
    description:
      'Certified backflow testing and repair in Richmond, BC — restaurants, warehouses, ' +
      'farms, and strata properties. Documentation handled. Call or text 604-283-3804.',
    h1: 'Backflow Testing in Richmond, BC',
    lede:
      'Testing for Richmond’s restaurants, industrial buildings, agricultural ' +
      'properties, and City Centre towers.',

    intro: [
      'Richmond has an unusually varied mix of backflow assemblies for a city its size. ' +
      'The Golden Village restaurant density around Alexandra Road and Aberdeen puts a ' +
      'large number of food-service devices into a small area. A few kilometres away, the ' +
      'industrial blocks around Bridgeport and the airport lands run warehouse and ' +
      'processing assemblies on a completely different scale.',

      'Then there is the farmland. Much of Richmond sits inside the Agricultural Land ' +
      'Reserve, where irrigation systems, greenhouses, and chemical injection setups all ' +
      'carry backflow protection requirements that owners of a single-family home never ' +
      'encounter. Sitting on the Fraser delta with a high water table, a good number of ' +
      'these assemblies live in pits and vaults that flood.',
    ],

    properties: [
      {
        title: 'Restaurants and food processing',
        text:
          'From small Golden Village kitchens to Steveston seafood processing, where ' +
          'wash-down and equipment connections both need protection.',
      },
      {
        title: 'Warehouses and distribution',
        text:
          'Bridgeport, Crestwood, and the airport lands — often large fire and domestic ' +
          'assemblies in a single building.',
      },
      {
        title: 'Agricultural and greenhouse',
        text:
          'Irrigation mains, greenhouse feeds, and chemical injection systems on ALR ' +
          'properties, tested when the system is charged.',
      },
      {
        title: 'City Centre strata',
        text:
          'Newer residential towers around Richmond Centre and Brighouse, most with ' +
          'assemblies in an accessible mechanical room.',
      },
      {
        title: 'Hotels near YVR',
        text:
          'Multiple assemblies across kitchen, laundry, pool, and irrigation services in ' +
          'one property.',
      },
      {
        title: 'Retail and auto',
        text:
          'Shopping centres, car washes, and service bays, where wash-water connections ' +
          'are the usual point of protection.',
      },
    ],

    localNote:
      'Richmond’s water table is the practical thing to know about. Assemblies in ' +
      'below-grade pits and vaults are common here, and they flood. A device sitting in ' +
      'water cannot be tested properly and tends to corrode faster than the same unit ' +
      'installed above grade. If yours is in a pit, mention it when you book — we will ' +
      'bring what we need to pump and clear it rather than turning up and rescheduling.',

    repairs:
      'Agricultural and industrial assemblies in Richmond are frequently larger than the ' +
      'domestic devices found in a house, and the failure is often a fouled check or a ' +
      'perished relief valve rather than anything structural. Where the fault is ' +
      'serviceable and we have the parts on the van, we repair and retest in the same ' +
      'visit. On the larger assemblies, some parts are order-in, and we will tell you ' +
      'that on the spot rather than after the fact.',

    faqs: [
      {
        q: 'My backflow device is in a flooded pit. Can you still test it?',
        a:
          'In most cases yes, but tell us when you book. The pit needs to be pumped and ' +
          'cleared before the assembly can be tested properly, and knowing in advance ' +
          'means we arrive equipped instead of rescheduling.',
      },
      {
        q: 'Do irrigation systems on farm properties need testing?',
        a:
          'Agricultural irrigation commonly carries backflow protection, particularly ' +
          'where fertiliser or chemical injection is involved. Requirements depend on the ' +
          'installation and your municipality — send us photos of the setup and we will ' +
          'tell you what we see.',
      },
      {
        q: 'Can you test a whole industrial building in one visit?',
        a:
          'Normally yes. Multiple assemblies at one address are tested together and each ' +
          'is documented separately.',
      },
      {
        q: 'When should irrigation systems be tested?',
        a:
          'Once the system is charged for the season. Testing a drained irrigation line ' +
          'is not a valid test, so spring start-up is generally the practical window.',
      },
    ],

    nearby: ['Vancouver', 'Delta', 'Burnaby', 'Surrey', 'New Westminster'],
  },

  {
    slug: 'surrey-backflow-testing',
    name: 'Surrey',
    title: 'Backflow Testing Surrey BC | Certified Tester | Eagle Eye Backflow',
    description:
      'Certified backflow testing and repair across Surrey — Whalley, Guildford, Newton, ' +
      'Cloverdale, and South Surrey. Reporting handled. Call or text 604-283-3804.',
    h1: 'Backflow Testing in Surrey, BC',
    lede:
      'Coverage across the whole city, from City Centre towers to Cloverdale acreage and ' +
      'the Campbell Heights industrial blocks.',

    intro: [
      'Surrey is geographically enormous and it does not behave like one city. Whalley ' +
      'and City Centre are densifying fast, with new towers going up and new assemblies ' +
      'going in with them. Newton and Guildford are dominated by retail and older ' +
      'commercial strip development. Cloverdale and the eastern edge are still ' +
      'substantially rural, on acreage with irrigation.',

      'That spread matters when you are booking. A tester who works mostly in one corner ' +
      'of the Lower Mainland will treat South Surrey as a long trip. Eagle Eye covers the ' +
      'city as a whole, and for property managers with buildings in more than one part of ' +
      'Surrey, testing can normally be grouped so the whole portfolio is handled together.',
    ],

    properties: [
      {
        title: 'New multi-family and townhome complexes',
        text:
          'A large share of Surrey’s recent construction, most with both domestic ' +
          'and irrigation assemblies on site.',
      },
      {
        title: 'Big-box and strip retail',
        text:
          'Guildford, Newton, and Fleetwood commercial development, including food ' +
          'tenants added after the original build.',
      },
      {
        title: 'Industrial and warehouse',
        text:
          'Port Kells, Campbell Heights, and Bridgeview — typically larger assemblies on ' +
          'fire and process water.',
      },
      {
        title: 'Restaurants and quick service',
        text:
          'Standalone and in-mall food tenants, tested around service hours where the ' +
          'landlord allows.',
      },
      {
        title: 'Agricultural and acreage irrigation',
        text:
          'Cloverdale and east Surrey properties running irrigation from a protected ' +
          'connection.',
      },
      {
        title: 'Car washes and auto service',
        text:
          'Wash-water and equipment connections, a common protection point across ' +
          'Surrey’s auto corridors.',
      },
    ],

    localNote:
      'Because Surrey covers so much ground, scheduling is where the time is won or lost. ' +
      'If you manage several buildings across Whalley, Newton, and South Surrey, tell us ' +
      'all of the addresses at once rather than booking them one at a time — grouping the ' +
      'route usually means fewer visits, less coordination on your end, and a faster ' +
      'turnaround on the whole set.',

    repairs:
      'Newer Surrey construction tends to fail in predictable ways: debris from ' +
      'commissioning fouling a check valve, or a relief valve that has never seated ' +
      'properly since installation. Both are usually serviceable on the spot. On ' +
      'irrigation assemblies that have sat through a winter, freeze damage is the more ' +
      'common finding, and that sometimes needs a part we order in.',

    faqs: [
      {
        q: 'Do you cover all of Surrey, including South Surrey and Cloverdale?',
        a:
          'Yes — Whalley, City Centre, Guildford, Newton, Fleetwood, Cloverdale, and ' +
          'South Surrey. The whole city is in our regular service area.',
      },
      {
        q: 'I manage buildings in several parts of Surrey. Can they be done together?',
        a:
          'Yes, and it is worth asking for. Send the full address list and we will group ' +
          'the testing into as few visits as the geography allows.',
      },
      {
        q: 'My irrigation system failed after the winter. Can it be repaired?',
        a:
          'Often, yes. Freeze damage ranges from a cracked relief valve to a split body. ' +
          'The first is usually a same-visit repair; the second may need a part ordered ' +
          'in. We will tell you which it is at the time of the test.',
      },
      {
        q: 'Does a townhome complex need testing?',
        a:
          'If the complex has a backflow assembly protecting its domestic or irrigation ' +
          'service, it generally does. Strata-managed complexes usually hold this at the ' +
          'corporation level rather than with individual owners.',
      },
    ],

    nearby: ['Delta', 'Langley', 'New Westminster', 'Burnaby', 'Richmond'],
  },

  {
    slug: 'delta-backflow-testing',
    name: 'Delta',
    title: 'Backflow Testing Delta BC | Ladner, Tsawwassen, North Delta | Eagle Eye',
    description:
      'Certified backflow testing and repair in Delta, BC — Ladner, Tsawwassen, North ' +
      'Delta, and Tilbury. Documentation handled. Call or text 604-283-3804.',
    h1: 'Backflow Testing in Delta, BC',
    lede:
      'Serving Ladner, Tsawwassen, North Delta, and the Tilbury industrial area.',

    intro: [
      'Delta is really three communities with very little in common, and backflow work ' +
      'here reflects that. Ladner is a village core with restaurants, small commercial ' +
      'buildings, and the marina. Tsawwassen runs to residential with irrigation, plus ' +
      'the newer large-format retail and commercial development out toward the ferry ' +
      'terminal. North Delta is largely residential and suburban commercial.',

      'Layered over all of it is agriculture and heavy industry. Delta holds some of the ' +
      'most productive farmland in the province, with greenhouses and field irrigation ' +
      'that carry backflow protection, and the Tilbury industrial area and port lands run ' +
      'assemblies at an industrial scale. Eagle Eye works across all of it.',
    ],

    properties: [
      {
        title: 'Greenhouses and agricultural irrigation',
        text:
          'Field and greenhouse systems, including chemical and fertiliser injection ' +
          'setups that require protection.',
      },
      {
        title: 'Tilbury industrial',
        text:
          'Warehousing, processing, and cold storage, generally with larger fire and ' +
          'process-water assemblies.',
      },
      {
        title: 'Ladner village commercial',
        text:
          'Restaurants, cafés, and small commercial units in and around the village core.',
      },
      {
        title: 'Tsawwassen retail and commercial',
        text:
          'Large-format retail and newer commercial development toward the ferry ' +
          'terminal and Tsawwassen Mills.',
      },
      {
        title: 'Residential irrigation',
        text:
          'Tsawwassen and North Delta properties running irrigation from a protected ' +
          'connection.',
      },
      {
        title: 'Marine and marina facilities',
        text:
          'Dock services and wash-down connections around Ladner’s waterfront.',
      },
    ],

    localNote:
      'Delta’s agricultural assemblies are seasonal in a way that most commercial ' +
      'devices are not. Irrigation cannot be tested while the system is drained, so the ' +
      'practical window is once it is charged for the growing season — and that window is ' +
      'busy for everyone. Booking early is worth doing. Greenhouse operations with ' +
      'injection systems should also expect more than one assembly on site.',

    repairs:
      'Agricultural and industrial devices in Delta tend to be larger and to have worked ' +
      'harder than a domestic assembly, and sediment is a routine cause of failure on ' +
      'field irrigation. Fouled checks and worn relief valves are usually rebuildable in ' +
      'the same visit. Larger Tilbury assemblies occasionally need an ordered part, which ' +
      'we will confirm at the time of the test rather than leaving you guessing.',

    faqs: [
      {
        q: 'Do you cover Ladner and Tsawwassen as well as North Delta?',
        a:
          'Yes. All three, plus the Tilbury industrial area and the surrounding ' +
          'agricultural land.',
      },
      {
        q: 'When can agricultural irrigation be tested?',
        a:
          'Once the system is charged. A drained line cannot be tested meaningfully, so ' +
          'spring start-up is generally the window — and it fills up, so book ahead of it ' +
          'if you can.',
      },
      {
        q: 'My greenhouse uses fertiliser injection. Does that change anything?',
        a:
          'It usually means a higher level of protection at that connection, and often ' +
          'more than one assembly on the property. Send photos of the setup and we will ' +
          'tell you what we can see before attending.',
      },
      {
        q: 'Can you handle several assemblies on one industrial site?',
        a:
          'Yes. Multiple devices at one address are tested in a single visit and ' +
          'documented individually.',
      },
    ],

    nearby: ['Richmond', 'Surrey', 'Vancouver', 'Burnaby', 'New Westminster'],
  },

  {
    slug: 'burnaby-backflow-testing',
    name: 'Burnaby',
    title: 'Backflow Testing Burnaby BC | Certified Tester | Eagle Eye Backflow',
    description:
      'Certified backflow testing and repair in Burnaby — Metrotown, Brentwood, ' +
      'Lougheed, and Big Bend. Reporting handled. Call or text 604-283-3804.',
    h1: 'Backflow Testing in Burnaby, BC',
    lede:
      'Testing for Burnaby’s town centre towers, office parks, and the Big Bend ' +
      'industrial lands.',

    intro: [
      'Burnaby concentrates around three town centres — Metrotown, Brentwood, and ' +
      'Lougheed — and all three have been building towers steadily for years. That means ' +
      'a large and growing number of relatively new assemblies in purpose-built ' +
      'mechanical rooms, which is the easiest kind of backflow work there is when the ' +
      'building is organised about access.',

      'The rest of the city is more varied. Still Creek and the Willingdon corridor hold ' +
      'office parks and light industrial. Big Bend, along the Fraser, is industrial and ' +
      'agricultural land at a scale most people do not associate with Burnaby. Burnaby ' +
      'Heights and the older apartment stock along Kingsway add retrofitted assemblies in ' +
      'buildings that predate them.',
    ],

    properties: [
      {
        title: 'Town centre strata towers',
        text:
          'Metrotown, Brentwood, and Lougheed residential high-rises, usually with ' +
          'accessible mechanical rooms and often more than one assembly.',
      },
      {
        title: 'Office parks',
        text:
          'Still Creek, Willingdon, and Glenlyon buildings, including tenant fit-outs ' +
          'that added a device later.',
      },
      {
        title: 'Big Bend industrial and agricultural',
        text:
          'Larger process, fire, and irrigation assemblies on the Fraser flats.',
      },
      {
        title: 'Institutional properties',
        text:
          'Campus and institutional buildings, typically with several assemblies across ' +
          'a site and a facilities team coordinating access.',
      },
      {
        title: 'Mall and restaurant tenants',
        text:
          'Food service inside and around the town centre malls, tested around trading ' +
          'hours where the landlord permits.',
      },
      {
        title: 'Older apartment buildings',
        text:
          'Kingsway and Burnaby Heights walk-ups with assemblies retrofitted into ' +
          'existing service rooms.',
      },
    ],

    localNote:
      'Burnaby’s newer towers are generally straightforward, and the thing that ' +
      'slows them down is not the plumbing but the paperwork around access — strata ' +
      'approval, a caretaker’s schedule, or a property manager who needs notice ' +
      'before a contractor attends. Give us the access contact when you book and most ' +
      'buildings are done in one visit without anyone from the council needing to be ' +
      'present.',

    repairs:
      'On newer Burnaby construction the common finding is commissioning debris fouling a ' +
      'check valve — annoying, but usually a same-visit clean and rebuild. Older ' +
      'retrofitted assemblies in the Kingsway and Heights stock are the ones more likely ' +
      'to need a part ordered in, simply because of their age. Either way you will know ' +
      'which situation you are in before we leave the site.',

    faqs: [
      {
        q: 'Our strata needs council approval before a contractor attends. Is that a problem?',
        a:
          'Not at all — it is the norm. Book when you are ready and give us the access ' +
          'contact. We will coordinate the visit with the caretaker or manager directly.',
      },
      {
        q: 'How many assemblies does a tower usually have?',
        a:
          'It varies with the building. Mixed-use towers frequently protect residential, ' +
          'commercial, and irrigation services separately. All devices at one address are ' +
          'tested in a single visit and documented individually.',
      },
      {
        q: 'Do you work with facilities teams on larger sites?',
        a:
          'Yes. For campus and institutional properties we will work to your access ' +
          'procedures and provide documentation in the format your records require.',
      },
      {
        q: 'Is testing needed on an older apartment building?',
        a:
          'If the building has a backflow assembly, it generally requires testing ' +
          'regardless of the building’s age. Retrofitted devices in older stock are ' +
          'common across Burnaby.',
      },
    ],

    nearby: ['Vancouver', 'New Westminster', 'Coquitlam', 'Richmond', 'Port Moody'],
  },
];
