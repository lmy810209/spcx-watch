import { Users, MessageSquare, TrendingUp, AlertTriangle, BookOpen } from "lucide-react";
import WaitlistForm from "@/components/home/WaitlistForm";
import ShareButton from "@/components/community/ShareButton";

export const metadata = {
  title: "Community Scenario Tracker — SPCX Watch",
  description: "Analyze and discuss SpaceX IPO scenarios with the community. All content is for simulation purposes only.",
};

interface CommunityScenario {
  id: string;
  title: string;
  description: string;
  votes: number;
  tag: string;
  tagColor: string;
  author: string;
  updatedAt: string;
}

const COMMUNITY_SCENARIOS: CommunityScenario[] = [
  {
    id: "cs-1",
    title: "[Scenario] Starlink Carve-Out IPO Before SpaceX Parent Listing",
    description:
      "A two-stage structure in which Starlink is spun off via a separate carve-out IPO before the SpaceX parent company goes public. Widely discussed as a valuation-maximization strategy — the most debated scenario in the community.",
    votes: 284,
    tag: "Structure Scenario",
    tagColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    author: "community",
    updatedAt: "2 days ago",
  },
  {
    id: "cs-2",
    title: "[Analysis Model] 2027 Listing Assumption — DCF Valuation Range",
    description:
      "A community DCF model using publicly available Starlink subscriber counts, total launch contract values, and Starship development costs as inputs. Conservative estimate: $1.2T — bull case: $2.8T.",
    votes: 198,
    tag: "Valuation Model",
    tagColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    author: "community",
    updatedAt: "3 days ago",
  },
  {
    id: "cs-3",
    title: "[Scenario] 20:1 Dual-Class Voting Structure — Founder Control Preservation",
    description:
      "Super-voting shares for the founder, modeled on the Google/Facebook playbook. At a 20:1 voting ratio, a ~15% equity stake could give Musk 60%+ voting control, preserving decision-making authority post-IPO.",
    votes: 156,
    tag: "Governance",
    tagColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    author: "community",
    updatedAt: "4 days ago",
  },
  {
    id: "cs-4",
    title: "[Risk Analysis] Lock-Up Cliff Risk — 90/180-Day Supply Shock",
    description:
      "Referencing Coinbase (−65%) and Rivian (−85%) post-lock-up performance. Simulation of the share supply overhang at lock-up expiry, accounting for the scale of SpaceX employee equity compensation.",
    votes: 134,
    tag: "Risk Scenario",
    tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    author: "community",
    updatedAt: "5 days ago",
  },
  {
    id: "cs-5",
    title: "[Scenario] Valuation Remodel If Starship Orbital Success Rate Reaches 90%+",
    description:
      "Assumes a fully reusable Starship achieves cost-per-payload one-tenth that of the current Falcon 9. Recalculates launch market share and total addressable market under this cost-structure scenario.",
    votes: 112,
    tag: "Technology Scenario",
    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    author: "community",
    updatedAt: "1 week ago",
  },
  {
    id: "cs-6",
    title: "[Hypothesis] Government Contract Concentration Risk — Single-Customer Dependency",
    description:
      "If NASA and DoD contracts represent 40%+ of revenue, SpaceX may face a valuation discount in public markets. Scenarios modeling the pace of commercial diversification and its effect on multiple expansion.",
    votes: 89,
    tag: "Risk Scenario",
    tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    author: "community",
    updatedAt: "1 week ago",
  },
];

export default function CommunityPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-space-accent" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted">
            Community
          </span>
        </div>
        <h1 className="text-2xl font-bold text-space-primary mb-2">
          Community Scenario Tracker
        </h1>
        <p className="text-sm text-space-body leading-relaxed max-w-2xl">
          A community simulation space for multi-angle analysis of the SpaceX IPO outlook.
          All scenarios are based on public data and community hypotheses —
          <span className="text-amber-400"> none of this constitutes investment advice or official announcements.</span>
        </p>
      </div>

      {/* ── Disclaimer Banner ─────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 p-4 mb-8 rounded-md bg-amber-500/10 border border-amber-500/20">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-[12px] text-amber-300 leading-relaxed">
          <strong>For simulation purposes only.</strong> All scenarios, figures, and models on this page are
          hypothetical analyses written by community members based on publicly available information.
          SpaceX has not officially announced an IPO. This site is not affiliated with SpaceX in any way.
          Do not use any content here to inform investment decisions.
        </div>
      </div>

      {/* ── 2-Column Layout ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

        {/* LEFT — Community Scenario List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-space-accent" />
              <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted">
                Top Scenarios
              </h2>
            </div>
            <span className="text-[10px] text-space-muted">
              {COMMUNITY_SCENARIOS.length} scenarios
            </span>
          </div>

          <div className="space-y-3">
            {COMMUNITY_SCENARIOS.map((scenario) => (
              <div key={scenario.id} className="card-space p-4 group">
                <div className="flex items-start gap-3">

                  {/* Vote count */}
                  <div className="flex flex-col items-center gap-0.5 shrink-0 min-w-[40px]">
                    <TrendingUp className="w-3 h-3 text-space-muted" />
                    <span className="text-[13px] font-bold text-space-primary">{scenario.votes}</span>
                    <span className="text-[9px] text-space-muted">votes</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      <span className={`text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 border rounded-sm ${scenario.tagColor}`}>
                        {scenario.tag}
                      </span>
                      <span className="text-[10px] text-space-muted">{scenario.updatedAt}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-space-primary group-hover:text-white leading-snug mb-1.5 transition-colors">
                      {scenario.title}
                    </h3>
                    <p className="text-[12px] text-space-body leading-relaxed line-clamp-2">
                      {scenario.description}
                    </p>
                  </div>

                  {/* Share button */}
                  <ShareButton scenarioId={scenario.id} />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Scenario CTA */}
          <div className="mt-6 p-4 rounded-md border border-dashed border-space-border text-center">
            <BookOpen className="w-5 h-5 text-space-muted mx-auto mb-2" />
            <p className="text-sm font-medium text-space-primary mb-1">Submit a Scenario</p>
            <p className="text-[12px] text-space-body mb-3">
              Have a SpaceX IPO scenario grounded in public data? Send it our way.<br />
              After review, accepted submissions will appear in the community feed.
            </p>
            <a
              href="mailto:contact@orbitnews.vercel.app?subject=SpaceX Scenario Submission"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold bg-space-accent text-white rounded-md hover:bg-blue-400 transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              Submit via Email
            </a>
          </div>
        </section>

        {/* RIGHT — Sidebar */}
        <aside className="space-y-6">

          {/* IPO Alert List / Waitlist */}
          <div className="card-space p-5">
            <WaitlistForm />
          </div>

          {/* Community Guidelines */}
          <div className="card-space p-4">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted mb-3">
              Community Guidelines
            </h3>
            <ul className="space-y-2 text-[12px] text-space-body leading-relaxed">
              {[
                "Cite public data and provide sources",
                "Clearly distinguish between hypothesis and established fact",
                "Investment advice and price predictions are not permitted",
                "Sharing purported SpaceX insider information is strictly prohibited",
                "Keep discussions respectful and constructive",
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-space-accent shrink-0 mt-0.5">·</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Data Label Guide */}
          <div className="card-space p-4">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted mb-3">
              Data Label Guide
            </h3>
            <div className="space-y-2">
              {[
                { label: "REAL",         color: "bg-emerald-400", desc: "Verified official announcements or filings" },
                { label: "PUBLIC DATA",  color: "bg-sky-400",     desc: "Sourced from published third-party reporting" },
                { label: "ANALYSIS",     color: "bg-blue-400",    desc: "Model or analysis built on public data" },
                { label: "COMMUNITY",    color: "bg-violet-400",  desc: "Community-submitted scenario or hypothesis" },
                { label: "HYPOTHETICAL", color: "bg-amber-400",   desc: "Speculative simulation — not a prediction" },
              ].map(({ label, color, desc }) => (
                <div key={label} className="flex items-center gap-2 text-[11px]">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
                  <span className="font-bold text-space-muted tracking-wider w-24">{label}</span>
                  <span className="text-space-body">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
