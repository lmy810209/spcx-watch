import type { Article } from "./types";

export const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "[Analysis] What Full Starship Reusability Means for SpaceX's Unit Economics",
    excerpt:
      "Community model: If Starship IFT-9 confirms controlled reentry of both stages, the path to sub-$10M marginal launch costs becomes credible — reshaping every valuation input.",
    body: [
      "SpaceX has now completed eight integrated Starship flight tests. Starting from IFT-5, the Super Heavy booster successfully demonstrated mechanical arm ('Mechazilla') catch for the first time, making full reusability no longer theoretical. This analysis models what IFT-9 confirmation of Ship reentry would mean for long-term cost structure.",
      "If full reusability is validated, the marginal cost per launch could converge toward $10–20M — roughly one-tenth of current Falcon 9 economics. This figure is derived from publicly available propellant cost estimates, manufacturing disclosures, and recovery infrastructure operating cost benchmarks. Actual costs will vary significantly based on reflight cadence and maintenance intervals.",
      "The orbital insertion milestone matters beyond the technical milestone itself because it signals a commercial inflection point. Falcon 9/Heavy currently achieves approximately 80–90% booster reuse rates. Starship targets same-day recovery of both stages. If achieved at scale, annual launch capacity could theoretically expand several-fold over current Falcon 9 rates of ~100 missions per year.",
      "Key uncertainties in this model: thermal protection system (TPS) tile durability, engine recertification intervals, FAA licensing cadence, and ground infrastructure scaling. Regardless of IFT-9 outcome, this analysis is a community scenario built on public technical data and SpaceX's stated goals — not an official SpaceX roadmap.",
      "Model conclusion: IFT-9 controlled reentry confirmation would meaningfully reduce downside risk in launch revenue forecasts used by community valuation models, potentially shifting the base-case SpaceX enterprise value range upward by $100–300B depending on assumed Starship ramp timelines.",
    ],
    category: "starship",
    dataLabel: "ANALYSIS",
    slug: "starship-flight-9-reusability-model",
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: { name: "SPCX Watch / Community Model", url: "#" },
    viewCount: 48200,
  },
  {
    id: "2",
    title: "Starlink Crosses 4M Subscribers: The Revenue Engine Behind a SpaceX IPO",
    excerpt:
      "Multiple outlets report Starlink has exceeded 4 million subscribers. Maritime, aviation, and enterprise plans are driving ARPU well above consumer tiers — a critical input for IPO valuation models.",
    body: [
      "Following Elon Musk's public statements and subsequent reporting by multiple outlets, Starlink is estimated to have surpassed 4 million subscribers. This figure is not from an official SpaceX financial disclosure — the company remains private — but is derived from public interviews and press coverage. Actual figures may differ.",
      "The growth story has shifted from consumer residential to high-ARPU verticals. Starlink Maritime, Aviation, and Business plans carry monthly fees ranging from $250 to over $5,000, compared to the $120 residential tier. If enterprise and mobility customers account for a growing share of the subscriber base, total revenue growth may be outpacing raw subscriber growth.",
      "For IPO valuation purposes, Starlink's addressable market is frequently cited as the key variable separating bear-case ($800B) from bull-case ($2.5T+) SpaceX valuations. At 4M subscribers and assuming a blended ARPU of $150–200/month, Starlink's annualized revenue run rate approaches $7–10B — a figure that alone would justify a $100–150B standalone valuation at typical SaaS multiples.",
      "Critical caveat: SpaceX does not publicly report financial results. All revenue estimates in community models — including this one — are derived from subscriber counts, publicly disclosed pricing, and industry analyst estimates. These figures should not be treated as confirmed financial data. When SpaceX eventually files an S-1, actual Starlink economics may differ substantially from current community models.",
    ],
    category: "starlink",
    dataLabel: "PUBLIC DATA",
    slug: "starlink-4-million-subscribers",
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: { name: "Reuters / Bloomberg (cited)", url: "https://www.reuters.com" },
    viewCount: 31500,
  },
  {
    id: "3",
    title: "Falcon 9 Logs 300+ Consecutive Successes: Why Reliability Is a Balance Sheet Asset",
    excerpt:
      "SpaceX's workhorse rocket has set an unprecedented reliability record. For IPO investors, consistent launch success translates directly into contracted backlog security and insurance cost advantages.",
    body: [
      "Falcon 9 has now achieved over 300 consecutive successful launches — a reliability record without precedent in commercial rocketry. As of 2024–2025, the vehicle's cumulative mission success rate exceeds 98% across its total flight history, with booster B1058 completing its 18th flight to deploy a Starlink batch.",
      "For a pre-IPO company, demonstrated operational reliability is more than a marketing metric — it directly supports contracted backlog confidence. Launch services customers sign multi-year agreements based on expected delivery reliability. Falcon 9's track record reduces the 'execution risk' discount that public market investors typically apply to capital-intensive aerospace companies.",
      "From an underwriting perspective, Falcon 9's reliability also compresses insurance premiums for payload customers. Lower insurance costs improve the effective economics of SpaceX's launch pricing, reinforcing its competitive position against Arianespace, Rocket Lab, and future competitors including Blue Origin's New Glenn.",
      "The high-reliability record also informs the Starship transition timeline. As long as Falcon 9 continues to perform, SpaceX faces no operational pressure to accelerate Starship's commercial ramp before it is ready. Falcon 9's ~$67M list price per launch at current cadence generates sufficient cash flow to internally fund Starship development — a factor that has historically allowed SpaceX to avoid dilutive equity raises.",
    ],
    category: "falcon",
    dataLabel: "PUBLIC DATA",
    slug: "falcon-9-300th-mission",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { name: "NASASpaceFlight", url: "https://www.nasaspaceflight.com" },
    viewCount: 27800,
  },
  {
    id: "4",
    title: "NASA Extends Artemis HLS Contract: SpaceX Secures Government Revenue Through the Decade",
    excerpt:
      "NASA officially extended its Human Landing System contract with SpaceX to cover Artemis IV and V. Starship HLS is now the designated lunar surface transport through at least the late 2020s.",
    body: [
      "NASA has officially announced the extension of its Human Landing System (HLS) contract with SpaceX, designating Starship HLS as the crewed lunar lander for Artemis IV and V missions. This extends SpaceX's role as NASA's primary lunar surface transport partner well into the late 2020s and potentially beyond.",
      "Starship HLS is a purpose-built derivative of the orbital Starship variant, incorporating vacuum-optimized Raptor engines, extended propellant tanks, and surface landing legs. Operationally, it docks with the Orion capsule in lunar orbit before transporting crew to the surface — a sequence that also requires SpaceX to demonstrate in-space propellant transfer, a capability it is developing in parallel.",
      "The initial Artemis III contract was valued at approximately $2.9 billion. The Artemis IV–V extension adds further value that has not been fully disclosed, but industry estimates place the total HLS program value at several billion dollars across all missions. For IPO modeling purposes, NASA contracts represent stable, contracted government revenue that reduces earnings volatility — a characteristic that typically commands premium valuation multiples in public markets.",
      "The contract also has strategic significance: it validates Starship as a mission-critical national asset, which reduces FAA and regulatory risk around Starship's commercial launch licensing. For investors modeling SpaceX's path to IPO, government contract backlog depth is a key de-risking factor that supports higher enterprise value floors in discounted cash flow scenarios.",
    ],
    category: "nasa",
    dataLabel: "REAL",
    slug: "nasa-spacex-artemis-contract",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: { name: "NASA Official Release", url: "https://www.nasa.gov" },
    viewCount: 19300,
  },
  {
    id: "5",
    title: "[Scenario] Starlink Direct-to-Cell Expands to Legacy Devices: A $100B+ TAM Expansion",
    excerpt:
      "Hypothetical: If SpaceX's Direct-to-Cell technology extends beyond smartphones to standard LTE feature phones, the addressable market expands to 1.5B+ unconnected devices — primarily in emerging markets.",
    body: [
      "This is a hypothetical scenario, not confirmed product roadmap. Starlink Direct-to-Cell (DTC) is currently in beta testing for SMS connectivity with unmodified smartphones via a T-Mobile partnership in the United States. Voice and data service expansion is planned. This scenario models what happens if the technology extends further to standard LTE feature phones.",
      "Approximately 1.5 billion feature phones remain in active use globally, concentrated in Sub-Saharan Africa, South and Southeast Asia — regions with limited terrestrial cellular infrastructure. If DTC technology achieves compatibility with LTE Band 25 feature phones (not just modern smartphones), Starlink's potential subscriber universe expands dramatically from current premium broadband customers to mass-market connectivity.",
      "The commercial model in this scenario would likely depend on carrier partnerships — similar to the T-Mobile arrangement — rather than direct consumer billing. Revenue per user would be lower than maritime or enterprise plans, but volume could be transformative. At even $2–5/month per connected user across 100M feature phone adopters, the incremental annual revenue exceeds $2–6B.",
      "Three technical and regulatory preconditions must be met for this scenario: First, Gen2 Starlink DTC payload capability must support feature phone spectrum compatibility. Second, national regulators in target markets must approve spectrum use. Third, local carrier roaming agreements must be extended globally. All three are in progress but none are confirmed on a clear timeline. This scenario should be treated as a long-term upside case — not a near-term product announcement.",
    ],
    category: "starlink",
    dataLabel: "HYPOTHETICAL",
    slug: "starlink-direct-to-cell-scenario",
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    source: { name: "Community Scenario / Unverified", url: "#" },
    viewCount: 14900,
  },
  {
    id: "6",
    title: "[Analysis] Raptor 3 Economics: Modeling the Path to Sub-$10M Launch Costs",
    excerpt:
      "If Raptor 3 achieves 280tf+ thrust as publicly targeted, community models suggest engine manufacturing cost reductions of 10–15% per flight — compounding into meaningful per-launch savings at scale.",
    body: [
      "Raptor 3 is SpaceX's third-generation methane-oxygen engine, targeting simplified manufacturing and higher thrust relative to Raptor 2. Publicly, Elon Musk has referenced a 280tf+ sea-level thrust target — approximately 22% above Raptor 2's ~230tf output. Note: these figures come from social media statements, not official technical specifications.",
      "If Raptor 3 achieves 280tf, the Super Heavy booster's aggregate thrust (33 engines) rises from approximately 7,590tf to ~9,240tf. This opens three optimization pathways: increased payload capacity, greater fuel margin for recovery, or reduced engine count with equivalent thrust. If SpaceX reduces engine count, per-flight engine maintenance costs decline structurally.",
      "Launch cost model: Falcon 9's marginal cost is estimated at $15–30M per flight. Starship's target marginal cost with full reusability is below $10M. Raptor 3 adoption with a 10–15% engine manufacturing cost reduction, combined with extended maintenance intervals, could reduce per-engine costs by $50–100K — across 28–33 engines per flight, this compounds to $1.5–3.3M per-flight savings at scale.",
      "Model limitations: Engine thrust improvement does not automatically translate to lower launch costs. TPS replacement costs, ground operations, fuel loading, and flight rate all independently drive unit economics. Raptor 3's production reliability and maintenance certification timelines remain unconfirmed. This analysis is a community model using public data and SpaceX statements — actual internal cost structures are unknown.",
    ],
    category: "starship",
    dataLabel: "ANALYSIS",
    slug: "raptor-3-economics-model",
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    source: { name: "Community Analysis (Unverified)", url: "#" },
    viewCount: 11600,
  },
  // ── Added historical articles ──────────────────────────────────────────────
  {
    id: "8",
    title: "SpaceX $350B Secondary Market Valuation: What Private Trades Reveal",
    excerpt:
      "Tender offers and secondary-market transactions in SpaceX equity have consistently cleared at valuations between $300–350B, making it the most valuable private company in history by most measures.",
    body: [
      "SpaceX has raised multiple rounds of funding at escalating valuations, with the most recent insider-led tender offer clearing at approximately $350 billion. This valuation was reported by multiple outlets including the Wall Street Journal and Bloomberg, citing investor participation documents. SpaceX has not confirmed this figure officially, and it is derived from secondary market activity — not a formal financial statement.",
      "For context: $350B places SpaceX ahead of Boeing ($120B), Lockheed Martin ($110B), and Northrop Grumman ($70B) combined in enterprise value. The premium reflects anticipated Starlink growth, Starship's potential to expand the total addressable launch market, and the optionality of a future IPO exit at potentially higher multiples.",
      "Secondary market valuation is inherently imprecise. Tender offers involve a small float relative to fully diluted shares, are subject to seller liquidity pressure, and do not reflect a public market equilibrium price. Community models that use $350B as a starting point for IPO pricing should apply a standard 10–20% IPO discount range to account for public market pricing dynamics, lock-up overhang, and market conditions at the time of listing.",
      "The rapid valuation progression — from $46B in 2020 to $350B+ in 2025 — is driven primarily by Starlink subscriber growth and enterprise contract wins, not launch business expansion alone. This has implications for how IPO roadshow materials would frame SpaceX's investment thesis: as a connectivity infrastructure company first, and a launch services company second.",
    ],
    category: "business",
    dataLabel: "PUBLIC DATA",
    slug: "spacex-350b-secondary-valuation",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "WSJ / Bloomberg (cited)", url: "https://www.wsj.com" },
    viewCount: 38700,
  },
  {
    id: "9",
    title: "Starship IFT-7: Booster Catch Confirmed, Ship High-Altitude Reentry Next",
    excerpt:
      "Integrated Flight Test 7 successfully demonstrated a second mechanical arm catch of the Super Heavy booster at Starbase. The Ship stage completed a controlled splashdown, setting the stage for IFT-8 land recovery.",
    body: [
      "SpaceX's seventh integrated Starship flight test achieved its primary objectives: Super Heavy booster caught by the Mechazilla mechanical arm for the second consecutive time, and Ship completed a controlled atmospheric reentry and splashdown in the Indian Ocean. Both stages were recovered — a milestone that no orbital-class launch vehicle has achieved at this scale.",
      "IFT-7's significance for IPO analysis centers on two areas. First, the repeatability of the booster catch removes execution risk from the most capital-intensive element of reusability. A one-off catch could be luck; two consecutive catches begins to establish a reliability baseline. Second, Ship's controlled splashdown — while not a land recovery — demonstrates that the Ship stage can be guided to a precise target under powered descent.",
      "The next flight test (IFT-8) is expected to attempt Ship recovery at or near the Starbase launch site. Achieving this milestone would complete the full reusability demonstration cycle, at which point SpaceX could accelerate Starship's commercial launch manifest. The first commercial payload customers include NASA Artemis and Starlink V3 deployment batches.",
      "Community valuation models have generally applied a 2026–2027 commercial ramp assumption for Starship. IFT-7 results suggest this timeline is achievable, though regulatory licensing from the FAA remains a potential gating factor. The FAA has expanded its environmental review scope for Starbase operations, which could extend approval timelines beyond SpaceX's internal targets.",
    ],
    category: "starship",
    dataLabel: "PUBLIC DATA",
    slug: "starship-ift7-booster-catch",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "SpaceNews", url: "https://spacenews.com" },
    viewCount: 33400,
  },
  {
    id: "10",
    title: "[Analysis] Dual-Class Share Structure: How Musk Could Retain Control Post-IPO",
    excerpt:
      "Community model: A 10:1 or 20:1 super-voting share structure, similar to Google's and Meta's IPO architecture, would allow Elon Musk to retain majority voting control with a minority economic stake.",
    body: [
      "When and if SpaceX goes public, corporate governance structure will be among the most scrutinized elements of its S-1 filing. Based on precedents set by Alphabet (Google), Meta, Snap, and Lyft, SpaceX would likely propose a multi-class share structure to preserve founder control. This is a community analysis of what that structure might look like — SpaceX has not disclosed any IPO plans.",
      "Under a 10:1 structure (similar to Alphabet), each founder share carries 10 votes versus 1 vote for public Class A shares. If Musk holds approximately 40–45% of SpaceX equity, 10:1 voting would give him roughly 85–88% of voting power. At 20:1 (Snap's structure), a 20% economic stake translates to approximately 80% voting control — providing similar insulation from activist shareholders.",
      "For public investors, dual-class structures present a trade-off. The positive case: founder-led companies with controlled governance have historically outperformed indices over 5–10 year horizons (Alphabet, Amazon, Meta). The negative case: no board accountability mechanism exists if the founder's decisions diverge from shareholder interests, and proxy advisory firms (ISS, Glass Lewis) typically recommend voting against dual-class structure proposals.",
      "Institutional investors like Fidelity and Wellington have pre-existing policies against dual-class IPOs and may decline to participate if voting rights are too asymmetric. This could affect IPO pricing and post-listing index inclusion — S&P 500 inclusion requires free float and governance criteria that some dual-class structures violate. These governance dynamics will be central to any SpaceX IPO roadshow debate.",
    ],
    category: "business",
    dataLabel: "ANALYSIS",
    slug: "spacex-dual-class-voting-structure",
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "SPCX Watch / Community Analysis", url: "#" },
    viewCount: 29100,
  },
  {
    id: "11",
    title: "Starlink Aviation Crosses 10,000 Aircraft: Delta and United Signal Fleet-Wide Rollout",
    excerpt:
      "Starlink's aviation segment has passed 10,000 connected aircraft globally. Deals with Delta and United Airlines, if confirmed fleet-wide, would add tens of thousands of daily connected passengers.",
    body: [
      "Starlink Aviation connectivity has been deployed on more than 10,000 commercial and business aircraft globally, according to reporting from multiple aviation industry outlets. The figure represents a rapid acceleration from fewer than 1,000 aircraft in early 2023. Major carrier agreements with Delta, United, and Hawaiian Airlines have been publicly announced, with fleet-wide rollout timelines stretching through 2026.",
      "Aviation connectivity represents one of Starlink's highest-ARPU segments. Airline operators typically pay in the range of $12,000–25,000 per month per aircraft for premium high-speed service, depending on bandwidth tier and coverage area. At 10,000 aircraft, the implied monthly revenue run rate for aviation alone approaches $1.5–2.5B annually — before accounting for passenger Wi-Fi fee sharing arrangements.",
      "The aviation market has historically been dominated by Viasat and Intelsat's Gogo business aviation division. Starlink's low-earth orbit architecture offers a structural latency advantage (20–40ms vs. 600ms+ for GEO competitors), enabling real-time applications including video conferencing that geosynchronous systems cannot support. This technology advantage is driving accelerated carrier defection from legacy providers.",
      "For SpaceX IPO modeling, aviation contract visibility is particularly valuable because airline fleet contracts are multi-year commitments that generate predictable recurring revenue. Community revenue models now regularly include aviation as a separate line item, with estimates ranging from $2–5B annual revenue by 2027 for this vertical alone.",
    ],
    category: "starlink",
    dataLabel: "PUBLIC DATA",
    slug: "starlink-aviation-10000-aircraft",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "Aviation Week", url: "https://aviationweek.com" },
    viewCount: 24600,
  },
  {
    id: "12",
    title: "[Scenario] Starlink Carve-Out IPO: The Two-Stage Listing Theory",
    excerpt:
      "Widely discussed in the investment community: SpaceX lists Starlink as a standalone entity first, capturing a premium SaaS multiple, before a subsequent SpaceX parent listing captures the remaining aerospace value.",
    body: [
      "This is a community scenario, not a confirmed SpaceX plan. One of the most debated IPO structure hypotheses involves a two-stage listing: Starlink Internet Services first, SpaceX Exploration Technologies second. The logic is driven by valuation architecture — telecom and SaaS-adjacent recurring revenue businesses receive fundamentally different multiples than aerospace/launch companies.",
      "Starlink as a standalone business would likely be benchmarked against satellite internet peers (Viasat, Eutelsat OneWeb) and high-growth connectivity platforms (though neither is a perfect comparable). At 4M+ subscribers with 20%+ annual growth, a premium multiple in the 8–15x forward revenue range is not unreasonable. This implies a standalone Starlink enterprise value of $80–200B depending on growth expectations and profitability trajectory.",
      "The SpaceX parent entity — stripped of Starlink's recurring revenue — would be valued more like an aerospace/defense contractor plus deep-tech option. Launch services, government contracts, and Starship development optionality would form the core. This business might command 3–6x revenue, yielding a $100–200B standalone value at current launch revenue levels, with Starship upside as an unpredictable option.",
      "Combined, the two-stage listing scenario could unlock more total value than a single consolidated IPO, if the market applies full category multiples to each business independently. The primary execution risks: SpaceX's internal operations are deeply integrated between launch and Starlink (shared facilities, manufacturing, workforce); separation cost and complexity could be substantial. Legal, regulatory, and tax restructuring for the carve-out would also add 1–2 years of delay versus a direct consolidated listing.",
    ],
    category: "business",
    dataLabel: "HYPOTHETICAL",
    slug: "starlink-carve-out-ipo-scenario",
    publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "Community Scenario", url: "#" },
    viewCount: 21800,
  },
  {
    id: "13",
    title: "SpaceX DoD Contracts: National Security Launch as the Revenue Floor",
    excerpt:
      "Department of Defense launch contracts — including classified NSSL missions — provide SpaceX with a baseline of predictable government revenue that acts as a valuation floor independent of Starlink growth.",
    body: [
      "SpaceX has secured a significant and growing share of the U.S. National Security Space Launch (NSSL) program, competing against United Launch Alliance (ULA) for classified and priority government payloads. NSSL Phase 2 awarded SpaceX approximately 40% of launch task order volume between 2020–2027, representing an estimated $900M–1.2B in contracted launches. NSSL Phase 3 competition is ongoing.",
      "Beyond NSSL, SpaceX holds contracts with the U.S. Space Force for dedicated Falcon 9 and Falcon Heavy missions carrying intelligence community payloads, GPS constellation satellites, and military communications hardware. These contracts are fixed-price arrangements that provide revenue certainty regardless of commercial launch market fluctuations.",
      "From an IPO investor perspective, government revenue carries a different quality premium than commercial revenue. Defense and intelligence community contracts are subject to multi-year appropriations processes with low cancellation risk, and are often cost-plus or firm-fixed-price structures with favorable payment terms. Comparable defense contractors (Lockheed, Northrop, L3Harris) trade at 15–20x EBITDA multiples in part due to government revenue predictability.",
      "The risk factor most relevant to IPO investors is single-customer concentration: if NASA and DoD contracts represent 35–45% of SpaceX's total revenue, a shift in government priorities or budget sequestration could materially impact earnings. SpaceX's commercial diversification trajectory — primarily Starlink — is therefore not just a growth story but also a revenue quality story that reduces this concentration risk over time.",
    ],
    category: "business",
    dataLabel: "PUBLIC DATA",
    slug: "spacex-dod-nssl-contracts",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "Defense News", url: "https://defensenews.com" },
    viewCount: 18900,
  },
  {
    id: "14",
    title: "Starship IFT-6: Ship Reentry Breakthrough Marks Program Turning Point",
    excerpt:
      "IFT-6 achieved the first successful Starship Ship reentry through peak heating, with a controlled splashdown in the Indian Ocean. The milestone removed the most significant technical uncertainty from the reusability roadmap.",
    body: [
      "Integrated Flight Test 6 marked a qualitative shift in the Starship program's technical trajectory. The Ship stage successfully navigated peak atmospheric reentry heating — historically the most technically challenging aspect of any reusable spacecraft — and completed a controlled splashdown in the Indian Ocean. The thermal protection system (TPS) survived intact, and the header tank propellant fed Raptor engines for a terminal burn.",
      "Prior to IFT-6, the critical outstanding technical question for the Starship program was whether the TPS could withstand the heating environment of a fully loaded Ship at orbital velocity. The vehicle is substantially larger and heavier than the Space Shuttle's orbiter, generating a unique thermal environment. IFT-6 demonstrated sufficient TPS performance to proceed toward land recovery attempts.",
      "For investors tracking the SpaceX IPO timeline, IFT-6 was the inflection point that made 2027 Starship commercial operations a credible baseline assumption. Prior to this flight, many community models used 2028–2029 as the conservative case for significant Starship commercial contribution. Post-IFT-6, the distribution of probability has shifted meaningfully toward 2026–2027 ramp.",
      "The immediate follow-on milestone is Ship landing at or near Starbase, demonstrating full site reuse infrastructure. Achieving rapid turnaround — SpaceX's stated goal of launch-to-relaunch in under 24 hours — remains years away from regular demonstration, but the TPS survivability data from IFT-6 makes the engineering path clearer than at any prior point in the program.",
    ],
    category: "starship",
    dataLabel: "PUBLIC DATA",
    slug: "starship-ift6-reentry-milestone",
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "NASASpaceFlight", url: "https://www.nasaspaceflight.com" },
    viewCount: 16700,
  },
  {
    id: "15",
    title: "[Analysis] Lock-Up Cliff Risk: Coinbase, Rivian, and the SpaceX Parallel",
    excerpt:
      "Post-IPO lock-up expiry events have been catastrophic for some high-profile companies. A hypothetical SpaceX lock-up analysis models 90-day and 180-day cliff supply shocks given employee equity scale.",
    body: [
      "Lock-up agreements restrict insiders — employees, early investors, and executives — from selling shares for a defined period post-IPO, typically 90–180 days. When lock-ups expire, the supply of tradeable shares increases sharply, often creating downward price pressure. Historical precedents are instructive: Coinbase fell approximately 65% from its direct listing price to the 6-month lock-up expiry. Rivian declined over 80% within 6 months of its IPO. These are not outliers — they reflect a structural dynamic.",
      "For a company the size of SpaceX, the lock-up cliff scale is unusual. SpaceX employs approximately 13,000 people, many of whom have received substantial equity compensation over multiple funding rounds at pre-IPO values. If the IPO is priced at $300–400B valuation and employee equity represents even 5–8% of fully diluted shares, the lock-up cliff involves $15–32B of potential supply. This is a materially larger relative overhang than most IPOs.",
      "The market absorption question is the key variable. For a company with high retail investor demand and strong fundamental conviction, $15–30B of additional supply over 90–180 days may be absorbed without severe price dislocation. Tesla and Google both sustained post-IPO price appreciation through lock-up periods. The difference: both companies had established profitability and lower perceived execution risk than SpaceX at the point of any plausible listing.",
      "Community models that account for lock-up risk typically apply a 15–25% post-IPO discount to first-year price estimates, with a recovery trajectory modeled over 12–24 months post-cliff. This is a hypothetical scenario analysis — the actual market impact depends on investor demand, market conditions, and SpaceX's financial performance at time of IPO. Treat lock-up risk as a timing consideration, not a fundamental valuation impairment.",
    ],
    category: "business",
    dataLabel: "ANALYSIS",
    slug: "lockup-cliff-risk-spacex-analysis",
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "SPCX Watch / Community Analysis", url: "#" },
    viewCount: 15200,
  },
  {
    id: "16",
    title: "SpaceX Raises $750M at $180B Valuation: A History of Private Funding Rounds",
    excerpt:
      "SpaceX has raised over $10B across 25+ private funding rounds since 2002. Tracking the valuation progression from $100M to $350B illuminates how Starlink transformed the company's financial profile.",
    body: [
      "SpaceX's funding history reveals a company that grew primarily on government contracts in its first decade before the Starlink product line transformed it into one of the highest-valued private companies in history. The early rounds — a 2012 raise at $2.4B valuation, a 2015 round at $12B — were driven by Falcon 9 launch cadence growth and NASA cargo resupply contract wins.",
      "The inflection point came in 2021 when Starlink subscriber growth accelerated, driving a $74B valuation round followed rapidly by subsequent rounds at $100B, $137B, and ultimately $150B–180B ranges through 2022–2023. These valuations reflected the market repricing SpaceX from a launch company to a connectivity platform — a shift that fundamentally changed the applicable valuation framework.",
      "The most recent reported tender offers have cleared at $250–350B, a valuation range that implies Starlink alone accounts for $150–250B of enterprise value at typical satellite internet multiples. This progression matters for IPO analysis because it suggests the public market entry point — whenever it occurs — would be pricing a business that is already well-understood by institutional investors, reducing the traditional IPO pricing uncertainty.",
      "Historical funding round data suggests SpaceX has been deliberately conservative about external capital, raising only when needed for Starship development and Starlink constellation expansion. This financial discipline, combined with self-funding through launch revenue and government contracts, means SpaceX would likely approach its IPO from a position of strength rather than necessity — a characteristic that typically supports premium pricing.",
    ],
    category: "business",
    dataLabel: "PUBLIC DATA",
    slug: "spacex-funding-round-history",
    publishedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "Crunchbase / Bloomberg", url: "https://www.bloomberg.com" },
    viewCount: 13900,
  },
  {
    id: "17",
    title: "Starlink Direct-to-Cell Goes Live: T-Mobile Partnership Marks Mass Market Pivot",
    excerpt:
      "Starlink's Direct-to-Cell service began commercial beta testing via T-Mobile, enabling unmodified smartphones to send and receive SMS from satellites. Voice and data follow in subsequent phases.",
    body: [
      "SpaceX's Starlink Direct-to-Cell technology entered commercial beta testing through a partnership with T-Mobile, allowing standard LTE smartphones to connect directly to Starlink satellites without hardware modification. The initial service phase supports SMS messaging; voice and broadband data connectivity are planned for subsequent phases pending FCC approval and additional satellite deployments.",
      "The technical achievement is significant: previous satellite phone connectivity required specialized handsets operating in dedicated spectrum bands. DTC uses standard LTE Band 25 spectrum already allocated to T-Mobile, with Starlink satellites acting as cell towers in orbit. The system requires Line-of-sight to sky and is designed for dead zones — areas with no terrestrial cellular coverage — rather than dense urban use cases.",
      "The commercial arrangement with T-Mobile involves revenue sharing from existing subscriber plans, meaning consumers don't need a separate subscription. T-Mobile markets this as an extension of coverage rather than a new product. For SpaceX, the operator partnership model is strategically significant: it provides revenue without the customer acquisition costs of a direct-to-consumer satellite broadband business, and creates a pathway to replicate similar agreements with other carriers globally.",
      "The DTC market opportunity is most compelling in the context of global carrier expansion. T-Mobile covers the U.S. market; SpaceX has announced or is in discussions with carriers in over 30 countries for equivalent agreements. Each carrier partnership expands the revenue base without proportional cost increases, since the satellite infrastructure is shared across all carrier agreements. This asset-light expansion model carries SaaS-like margin characteristics at scale.",
    ],
    category: "starlink",
    dataLabel: "PUBLIC DATA",
    slug: "starlink-direct-to-cell-launch",
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "The Verge", url: "https://www.theverge.com" },
    viewCount: 12400,
  },
  {
    id: "18",
    title: "Crew Dragon 10th Mission: Human Spaceflight as a Durable Revenue Stream",
    excerpt:
      "SpaceX's Crew Dragon has completed its 10th crewed mission to the International Space Station, establishing human spaceflight as a reliable revenue stream and validating SpaceX's safety track record.",
    body: [
      "SpaceX's Crew Dragon capsule has now completed 10 crewed missions to the International Space Station under NASA's Commercial Crew Program (CCP), with no mission failures and an unbroken perfect safety record across all crewed flights. This milestone firmly establishes human spaceflight as a recurring revenue segment for SpaceX alongside its commercial launch business.",
      "The Commercial Crew Program represents approximately $2.6B in contracted value for SpaceX across Crew Transportation Capability (CCtCap) and mission task orders. With Boeing's Starliner facing extended delays and technical certification challenges, SpaceX has effectively become the sole operational provider of U.S. government crewed access to the ISS — a position that likely strengthens its bargaining position for future crew contract renewals.",
      "Human spaceflight also generates significant commercial revenue beyond NASA missions. Axiom Space, private astronaut missions, and future commercial destination agreements add to the mission manifest. Private astronaut missions aboard Crew Dragon have been reported at approximately $55M per seat, consistent with an overall mission pricing framework for orbital destinations.",
      "For IPO analysis, human spaceflight revenue carries high-quality attributes: long lead times that require advance booking, government certification that provides competitive barriers, and symbolic branding value that strengthens SpaceX's public perception. The safety record across 10+ crewed missions also reduces the liability tail risk that public market investors would otherwise apply when pricing a company with active human spaceflight operations.",
    ],
    category: "nasa",
    dataLabel: "REAL",
    slug: "crew-dragon-10th-mission",
    publishedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "NASA Official", url: "https://www.nasa.gov" },
    viewCount: 11300,
  },
  {
    id: "19",
    title: "[Analysis] SpaceX Comparable Valuation: No Perfect Peer Exists",
    excerpt:
      "A community attempt to build a comparable company analysis for SpaceX. The challenge: no public company combines orbital launch, satellite internet, government contracts, and reusable vehicle R&D at this scale.",
    body: [
      "Traditional equity valuation relies heavily on comparable company analysis — benchmarking a target company's multiples against publicly traded peers. For SpaceX, this approach faces a fundamental challenge: no single public company combines SpaceX's unique combination of orbital launch services, satellite internet, government contracting, and deep-tech reusable vehicle development at comparable scale.",
      "The closest launch comparables are Rocket Lab (RKLB) and Arianespace (private). Rocket Lab trades at approximately 8–12x forward revenue — but at sub-$1B revenue scale, entirely different from SpaceX. Mature defense contractors (Lockheed, Northrop) trade at 15–20x EBITDA but lack SpaceX's growth profile. Satellite internet peers like Viasat trade at distressed multiples given competitive pressure from SpaceX itself.",
      "A sum-of-parts approach is arguably more rigorous. Assigning Starlink a SaaS-comparable 10x forward revenue multiple yields $100–200B depending on revenue projections. Launch services at aerospace contractor multiples of 4–6x revenue yield $50–80B. Starship R&D optionality adds an open-ended upside case. Combined, community sum-of-parts models cluster between $250–450B for a 2025–2026 IPO scenario.",
      "The most important caveat: SpaceX's actual financials are unknown. Community models use estimates, analyst projections, and public proxy data. When SpaceX does file its S-1, actual revenue, margins, and capex figures will likely cause significant model revisions in both directions. This analysis is an exercise in hypothesis testing — not a prediction of actual IPO pricing.",
    ],
    category: "business",
    dataLabel: "ANALYSIS",
    slug: "spacex-comparable-valuation-analysis",
    publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "SPCX Watch / Community Analysis", url: "#" },
    viewCount: 10800,
  },
  {
    id: "20",
    title: "Raptor Engine Production Hits 1,000 Units: Factory Scale as Competitive Moat",
    excerpt:
      "SpaceX has manufactured over 1,000 Raptor engines at its Hawthorne facility, according to Elon Musk's public statements. This production scale enables cost reductions and rapid flight test cadence that competitors cannot match.",
    body: [
      "Elon Musk stated publicly that SpaceX has produced more than 1,000 Raptor engines at its Hawthorne, California manufacturing facility. This figure has not been independently verified through financial filings, but is consistent with the observed Starship test article inventory and flight cadence at Boca Chica. The statement was made via social media — not an official corporate disclosure.",
      "The production scale matters for several reasons beyond raw capability. Manufacturing 1,000+ units of a complex methalox engine at a single facility creates learning curve efficiencies — estimated at 15–20% cost reduction per production volume doubling in aerospace engine manufacturing. If the 1,000-unit figure is accurate, SpaceX has traveled far down this learning curve relative to any competitor in the heavy-lift segment.",
      "Raptor's production volume also enables a rapid test flight cadence that is unusual in the industry. Traditional aerospace engine development involves 50–100 test units over 5–10 years. SpaceX's philosophy of building many units and testing iteratively allows faster failure-mode identification and resolution. This approach carries higher initial cost but compresses the overall development timeline.",
      "From an investor perspective, manufacturing capability at this scale represents a capital-efficient moat. The tooling, supply chain, and skilled workforce required to produce Raptor engines at 1,000-unit scale took years to build and would require years and billions of dollars for a competitor to replicate. This creates a structural barrier to competition in the heavy-lift reusable launch market for the foreseeable future.",
    ],
    category: "starship",
    dataLabel: "UNVERIFIED",
    slug: "raptor-engine-1000-production",
    publishedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "Elon Musk / X (Unverified)", url: "#" },
    viewCount: 9400,
  },
  {
    id: "21",
    title: "Falcon 9 Block 5: 10 Flights Per Booster and the Economics of Reuse",
    excerpt:
      "With boosters now routinely flying 10–20 missions, Falcon 9's reuse economics have exceeded original projections. Each additional reflght compresses the per-launch cost curve further.",
    body: [
      "Falcon 9 Block 5, introduced in 2018, was designed for a minimum of 10 reflights with limited refurbishment. Six years later, multiple boosters have surpassed 20 flights, with B1058 reaching 18+ missions before retirement. The actual reuse performance has substantially exceeded the original design specification — a characteristic that directly improves the economics of each launch.",
      "The cost structure improvement is compounded: the first flight of a new Falcon 9 booster costs SpaceX approximately $35–40M in manufacturing cost. At 10 reuses, the amortized per-flight cost falls to $3.5–4M. At 20 reuses, the marginal per-flight cost is dominated by propellant (~$1.5M), refurbishment labor, and landing infrastructure — not hardware. This is why SpaceX's list price of $67M per launch carries structural margins that competitors launching on expendable vehicles cannot match.",
      "For IPO analysis, Falcon 9's reuse economics validate the broader thesis that SpaceX applies to Starship: launch cost is primarily a refurbishment and propellant problem once hardware manufacturing cost is amortized across many flights. Falcon 9's demonstrated 10–20 reflights translate into an internal rate of return on the capital invested in the first booster manufacture that makes subsequent launches extremely high-margin.",
      "The block 5 production line is reportedly winding down as Starship's commercial ramp approaches. SpaceX has stated it intends to continue flying existing Falcon 9 vehicles until Starship can serve the full commercial manifest. The transition represents both a cost management challenge and a revenue continuity opportunity: maintaining Falcon 9 reliability while scaling Starship before any Starship anomaly disrupts launch cadence.",
    ],
    category: "falcon",
    dataLabel: "PUBLIC DATA",
    slug: "falcon-9-block5-reuse-economics",
    publishedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "Ars Technica", url: "https://arstechnica.com" },
    viewCount: 8700,
  },
  {
    id: "22",
    title: "[Scenario] Direct Listing vs. Traditional IPO: Which Path Would SpaceX Choose?",
    excerpt:
      "Community scenario: Coinbase and Spotify chose direct listings to avoid dilution and lock-up mechanics. Would SpaceX's brand strength and investor demand support a direct listing over traditional underwritten IPO?",
    body: [
      "This is a hypothetical scenario — SpaceX has not publicly discussed its IPO structure preference. There are two primary mechanisms through which SpaceX could access public markets: a traditional underwritten IPO or a direct listing. Each carries different incentive structures, dilution implications, and market reception dynamics.",
      "A traditional IPO involves investment bank underwriters who set the initial offering price, build an institutional order book, and allocate shares to investors before trading begins. This process typically includes a 'greenshoe' over-allotment option and results in a structured price discovery. For SpaceX, an underwritten IPO would likely be executed by Goldman Sachs and Morgan Stanley based on their existing private market relationships. The risk: underwriters systematically underprice IPOs to generate first-day 'pop' — at SpaceX's scale, even a 10% underpricing represents $30–50B in value left on the table.",
      "A direct listing — as executed by Spotify (2018), Slack (2019), Coinbase (2021), and Roblox (2021) — allows existing shareholders to sell directly into the public market without issuing new shares. This eliminates the underwriting discount, removes lock-up restrictions for existing shareholders from day one, and avoids dilution. However, there is no formal book-building process, making price discovery more volatile. Coinbase's direct listing opened at $381 before declining substantially.",
      "The SpaceX-specific factors favoring a direct listing: SpaceX has sufficient name recognition that traditional investor education during a roadshow may be unnecessary. Employee and early investor liquidity needs are significant after years of private illiquidity. The company does not need to raise primary capital urgently. Arguments against: Starship execution risk means investors may demand a lower initial price in an unstructured process; a traditional IPO provides more controlled price establishment. Community scenario models generally assume a traditional IPO as the base case given SpaceX's preference for controlled processes.",
    ],
    category: "business",
    dataLabel: "HYPOTHETICAL",
    slug: "spacex-direct-listing-vs-ipo",
    publishedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "Community Scenario", url: "#" },
    viewCount: 8200,
  },
  {
    id: "23",
    title: "Starlink Maritime Passes 10,000 Vessels: Shipping Industry Goes Low-Orbit",
    excerpt:
      "Starlink's maritime segment has connected over 10,000 commercial and leisure vessels, displacing Viasat and Inmarsat in a market previously dominated by geosynchronous providers charging 10x higher prices.",
    body: [
      "Starlink's maritime connectivity service has surpassed 10,000 active vessel installations according to industry tracking from maritime data firms. The segment spans commercial cargo shipping, cruise vessels, offshore oil platforms, fishing fleets, and leisure yachts. The rapid adoption reflects SpaceX's pricing advantage over legacy GEO providers: Starlink Maritime starts at $250/month versus several thousand dollars monthly for comparable Viasat or Inmarsat services.",
      "The shipping industry's digital transformation is driving structural demand for always-on, low-latency connectivity. Modern container vessels run IoT sensor networks, video monitoring systems, and crew welfare connectivity requirements that were not economically viable with legacy satellite systems. Starlink's low-earth orbit architecture resolves the latency issue that previously made GEO satellite connectivity unsuitable for real-time applications.",
      "Revenue analysis: If 10,000 vessels pay an average $500/month (blended commercial and maritime premium tiers), the annualized maritime revenue run rate approaches $600M. This figure will grow as fleet penetration increases — the global commercial shipping fleet numbers over 50,000 vessels, suggesting maritime connectivity alone could eventually represent a $2–3B annual revenue line for Starlink.",
      "The competitive dynamics in maritime are particularly favorable for SpaceX. Viasat and Inmarsat are GEO-dependent, meaning they cannot match Starlink's latency or pricing without replacing their entire satellite infrastructure — a capital investment that neither appears positioned to make at the required scale. This creates a multi-year runway during which Starlink can compound maritime market share without competitive disruption.",
    ],
    category: "starlink",
    dataLabel: "PUBLIC DATA",
    slug: "starlink-maritime-10000-vessels",
    publishedAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "The Maritime Executive", url: "https://maritime-executive.com" },
    viewCount: 7600,
  },
  {
    id: "24",
    title: "SpaceX Launch Cadence Hits 100+ Missions: The Backbone of Cash Flow",
    excerpt:
      "SpaceX surpassed 100 orbital launch missions in a single calendar year for the first time, driven primarily by internal Starlink deployment flights and a growing commercial manifest.",
    body: [
      "SpaceX completed more than 100 orbital launch missions in a single calendar year — a record for any commercial launch provider and a pace that the entire global launch industry outside SpaceX cannot match in aggregate. The milestone reflects the company's vertically integrated model: Starlink deployment flights serve as internal customers that keep the production line at high cadence, while commercial and government manifest fills the remaining capacity.",
      "The composition of the launch manifest is relevant for revenue analysis. Internal Starlink deployment flights do not generate external revenue — they are capital expenditures for the satellite constellation asset. Commercial and government launches, which constitute roughly 30–40% of total missions at current cadence, generate the cash flow that funds ongoing operations and Starship development.",
      "At $67M list price per Falcon 9 commercial launch and 30–40 external missions annually, SpaceX's launch segment alone generates approximately $2–3B in annual external revenue. With estimated gross margins of 40–60% based on Falcon 9's documented reuse economics, launch services contributes approximately $800M–1.8B in gross profit — a meaningful contributor to the overall business even as Starlink grows faster.",
      "The 100-launch-per-year cadence also demonstrates organizational scalability. Managing 100+ mission campaigns annually requires supply chain, range operations, flight software, and mission assurance processes that are fundamentally different from a 10–20 launch per year organization. The operational infrastructure SpaceX has built to support this cadence is itself a competitive asset that took years to develop and cannot be quickly replicated.",
    ],
    category: "launch",
    dataLabel: "PUBLIC DATA",
    slug: "spacex-100-launches-cadence",
    publishedAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "SpaceNews", url: "https://spacenews.com" },
    viewCount: 7100,
  },
  {
    id: "25",
    title: "[Analysis] SpaceX Revenue Model: Community Estimate Using Public Data",
    excerpt:
      "A community-built revenue model using public launch contracts, Starlink subscriber counts, and disclosed government contract values. All figures are estimates — SpaceX does not publish financials.",
    body: [
      "This is a community revenue model built entirely from public sources. SpaceX does not report financial results publicly. The following estimates are derived from launch contract disclosures, subscriber count reporting, NASA contract values, and industry analyst estimates. Actual revenues and margins will differ — potentially significantly — when SpaceX eventually files public financial documents.",
      "Launch Services (External): Approximately 30–40 commercial and government launches annually at $45–100M average contract value yields an estimated $1.5–3.5B in annual external launch revenue. Falcon Heavy premium missions (DoD payloads, large GEO satellites) carry list prices exceeding $150M, while some commercial Falcon 9 missions are contracted below list price. Best estimate: $2–2.5B annually.",
      "Starlink Subscriptions: 4M+ subscribers at an estimated $150–180 blended ARPU (residential + mobility + enterprise blend) yields approximately $7–9B annualized revenue run rate. Note: this is a run-rate estimate, not confirmed annual revenue. Enterprise and mobility tiers skew the blended ARPU higher than the residential list price suggests.",
      "Government Contracts: NASA CCP, NSSL, and other government awards provide approximately $1–2B in annual revenue based on disclosed contract values spread across performance periods. Combined total community estimate: $10–14B in 2024–2025 annualized revenue, with Starlink accounting for 60–70% of the total. Importantly, Starlink is also the growth engine: if subscriber count doubles over two years, total company revenue could approach $15–20B before any Starship commercial contribution.",
    ],
    category: "business",
    dataLabel: "ANALYSIS",
    slug: "spacex-revenue-model-community",
    publishedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "SPCX Watch / Community Model", url: "#" },
    viewCount: 6800,
  },
  {
    id: "26",
    title: "Falcon Heavy Launches X-37B: Classified Missions as a Revenue Premium",
    excerpt:
      "SpaceX's Falcon Heavy carried the U.S. Space Force's X-37B orbital test vehicle on a classified multi-year mission. Classified national security launches represent some of SpaceX's highest per-mission contract values.",
    body: [
      "SpaceX's Falcon Heavy launched the U.S. Space Force's X-37B Orbital Test Vehicle (OTV-7) on a classified long-duration mission. The X-37B is an uncrewed reusable spaceplane operated by the Space Force for classified experimentation in orbit; its mission objectives are not publicly disclosed. The Falcon Heavy contract for this mission is estimated to exceed $150M based on comparable EELV/NSSL contract valuations.",
      "Falcon Heavy's unique three-core architecture enables delivery of very large payloads to high-energy orbits — geostationary transfer orbit, geosynchronous orbit, and cislunar space — that Falcon 9 cannot reach with heavy payloads. This capability captures a specific market segment: large government intelligence community satellites, heavy commercial GEO communication satellites, and deep space science missions.",
      "The classified mission profile adds a revenue quality premium. National security space launches are subject to classification requirements that preclude competitive public bidding for many mission types. United Launch Alliance's Atlas V competed for some EELV missions until its Vulcan Centaur delays; in the interim, SpaceX has captured a larger share of the classified manifest. This competitive positioning is unlikely to change materially in the near term given ULA's production delays.",
      "For IPO modeling, classified mission revenue is high-quality: national security customers are less price-sensitive than commercial customers, contracts are typically sole-source for certified vehicles, and payment terms are favorable. However, classified revenue also carries opacity risk — investors cannot independently assess mission success or contract renewal probability. This information asymmetry is a factor that IPO investors would need to discount appropriately.",
    ],
    category: "falcon",
    dataLabel: "PUBLIC DATA",
    slug: "falcon-heavy-x37b-classified",
    publishedAt: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "Space Force / NASASpaceFlight", url: "https://www.nasaspaceflight.com" },
    viewCount: 6300,
  },
  {
    id: "27",
    title: "SpaceX S-1 IPO Filing: What Investors Should Expect in the Prospectus",
    excerpt:
      "When SpaceX eventually files its S-1, certain disclosures will be mandatory. A preview of what the prospectus would need to reveal — and what uncertainties remain even after filing.",
    body: [
      "SpaceX has not filed an S-1 registration statement. This article is a forward-looking preview of what a SpaceX S-1 would be required to disclose under SEC Regulation S-K, based on standard IPO prospectus requirements. The information presented here is not from actual SpaceX financial documents.",
      "An S-1 would require disclosure of: (1) Audited financial statements for the past 3 years, including revenue breakdown by segment (launch services, Starlink, other). (2) Risk factors — mandatory disclosure of key business risks including Starship development delays, regulatory dependencies, concentration of government customers, founder control via dual-class shares, and the competitive landscape. (3) Use of proceeds — if primary shares are issued, how the capital would be deployed. (4) Management's Discussion and Analysis (MD&A) — narrative explanation of financial results and operational trends.",
      "The most anticipated disclosures would be Starlink's actual financials: subscriber count, ARPU, churn rate, customer acquisition cost, and segment profitability. These figures are currently estimated by community models; the actual data could cause significant valuation revision in either direction depending on whether margins match estimates.",
      "Critical uncertainties that an S-1 cannot fully resolve: the timing and scale of Starship commercial operations (which significantly affects long-term growth models); the regulatory trajectory for Starlink spectrum in key international markets; and the governance implications of dual-class voting structure on board accountability. An S-1 filing marks the beginning of investor due diligence, not its completion.",
    ],
    category: "business",
    dataLabel: "HYPOTHETICAL",
    slug: "spacex-s1-ipo-filing-preview",
    publishedAt: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "Community Scenario / Hypothetical", url: "#" },
    viewCount: 5900,
  },
  {
    id: "7",
    title: "FCC Approves 7,500 Additional Starlink V3 Satellites: The Infrastructure Moat Deepens",
    excerpt:
      "The FCC has approved SpaceX's request to deploy 7,500 Gen2 Starlink satellites, according to multiple outlets. At full build-out, the constellation becomes the world's largest broadband infrastructure asset.",
    body: [
      "The U.S. Federal Communications Commission has approved SpaceX's application to deploy an additional 7,500 second-generation Starlink (Gen2) satellites, per reporting by multiple technology and space news outlets. These V3-platform satellites are larger and higher-capacity than Gen1, designed for launch aboard Starship. The approval represents a key regulatory milestone in SpaceX's long-term constellation build-out.",
      "SpaceX currently operates over 6,000 active Starlink satellites — already the world's largest satellite constellation by count. The ultimate authorized constellation size exceeds 42,000 satellites across multiple orbital shells. At full deployment, Starlink would be capable of delivering hundreds of Mbps to virtually any point on Earth, including polar regions and equatorial zones currently underserved by GEO satellite systems.",
      "From an IPO valuation standpoint, the constellation authorization depth represents a regulatory moat. Competitors including Amazon's Project Kuiper, OneWeb (now Eutelsat OneWeb), and Telesat Lightspeed face significant capital and timeline gaps to match SpaceX's authorized and deployed capacity. This creates a durable first-mover advantage that typically commands premium infrastructure multiples in public market comparables.",
      "Key remaining risks: Starship commercial operations must begin before V3 satellite deployment can accelerate at scale, since the large V3 satellites cannot be launched on Falcon 9. Additionally, ITU frequency coordination with international regulators and spectrum conflict resolution with European operators remain active processes. FCC approval is a necessary but not sufficient condition for full build-out.",
    ],
    category: "starlink",
    dataLabel: "PUBLIC DATA",
    slug: "fcc-v3-constellation-approval",
    publishedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    source: { name: "SpaceNews / FCC (cited)", url: "https://spacenews.com" },
    viewCount: 9800,
  },
];

export function getTrendingArticles(limit = 3): Article[] {
  return [...MOCK_ARTICLES]
    .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
    .slice(0, limit);
}

export function getMainHeadline(): Article {
  return MOCK_ARTICLES[0];
}

export function getLatestArticles(limit = 6): Article[] {
  return [...MOCK_ARTICLES]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function formatTimeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
