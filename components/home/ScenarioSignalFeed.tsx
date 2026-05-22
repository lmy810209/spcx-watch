import { Activity, RefreshCw, FileText, Users, TrendingUp, AlertTriangle } from "lucide-react";

type SignalType = "scenario_update" | "model_change" | "public_article" | "community_input" | "valuation_shift" | "risk_flag";

interface ScenarioSignal {
  id: string;
  type: SignalType;
  title: string;
  detail: string;
  timestamp: string;
  badge?: string;
}

const ICON_MAP: Record<SignalType, React.ElementType> = {
  scenario_update:  RefreshCw,
  model_change:     TrendingUp,
  public_article:   FileText,
  community_input:  Users,
  valuation_shift:  Activity,
  risk_flag:        AlertTriangle,
};

const COLOR_MAP: Record<SignalType, string> = {
  scenario_update:  "text-sky-400   bg-sky-500/10   border-sky-500/20",
  model_change:     "text-blue-400  bg-blue-500/10  border-blue-500/20",
  public_article:   "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  community_input:  "text-violet-400 bg-violet-500/10 border-violet-500/20",
  valuation_shift:  "text-amber-400 bg-amber-500/10  border-amber-500/20",
  risk_flag:        "text-red-400   bg-red-500/10   border-red-500/20",
};

const LABEL_MAP: Record<SignalType, string> = {
  scenario_update:  "Scenario updated",
  model_change:     "Model revised",
  public_article:   "Public article",
  community_input:  "Community input",
  valuation_shift:  "Valuation shift",
  risk_flag:        "Risk flag",
};

const SIGNALS: ScenarioSignal[] = [
  {
    id: "sig-1",
    type: "scenario_update",
    title: "Starship orbital scenario updated post-IFT-9 data",
    detail: "Community timeline model adjusted — commercial payload ops window moved to 2026 Q2",
    timestamp: "2h ago",
    badge: "STARSHIP",
  },
  {
    id: "sig-2",
    type: "valuation_shift",
    title: "Community median valuation: $1.85T → $1.92T",
    detail: "Revised upward after public Starlink subscriber data incorporated into DCF inputs",
    timestamp: "5h ago",
    badge: "VALUATION",
  },
  {
    id: "sig-3",
    type: "public_article",
    title: "WSJ: SpaceX expands internal share trading program",
    detail: "Public article ingested — routed into investor liquidity scenario inputs",
    timestamp: "8h ago",
    badge: "PUBLIC DATA",
  },
  {
    id: "sig-4",
    type: "model_change",
    title: "[Model] Dual-class voting assumption revised to 20:1",
    detail: "Extended from 10:1 — founder control simulation updated across all share scenarios",
    timestamp: "1d ago",
    badge: "ANALYSIS",
  },
  {
    id: "sig-5",
    type: "community_input",
    title: "Community request: add NASA Artemis contract extension to revenue model",
    detail: "Under review — public contract data being verified before incorporation",
    timestamp: "1d ago",
    badge: "COMMUNITY",
  },
  {
    id: "sig-6",
    type: "risk_flag",
    title: "FCC Gen3 spectrum delay — potential Starlink revenue risk",
    detail: "[Scenario] Registered as regulatory risk factor. Not a confirmed outcome.",
    timestamp: "2d ago",
    badge: "HYPOTHETICAL",
  },
];

export default function ScenarioSignalFeed() {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-space-accent" />
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted">
            Scenario Signal Feed
          </h2>
        </div>
        <span className="text-[9px] text-space-muted uppercase tracking-widest">
          Simulation only — not official disclosures
        </span>
      </div>

      <div className="space-y-2">
        {SIGNALS.map((signal) => {
          const Icon = ICON_MAP[signal.type];
          const colorClasses = COLOR_MAP[signal.type].split(" ");
          const iconColor   = colorClasses[0];
          const bgColor     = colorClasses[1];
          const borderColor = colorClasses[2];

          return (
            <div
              key={signal.id}
              className={`flex items-start gap-3 p-3 rounded-md border ${bgColor} ${borderColor}`}
            >
              <span className={`mt-0.5 shrink-0 ${iconColor}`}>
                <Icon className="w-3.5 h-3.5" />
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                  <span className={`text-[9px] font-bold tracking-widest uppercase ${iconColor}`}>
                    {LABEL_MAP[signal.type]}
                  </span>
                  {signal.badge && (
                    <span className="text-[8px] px-1 py-px border rounded-sm border-space-border text-space-muted tracking-wider">
                      {signal.badge}
                    </span>
                  )}
                </div>
                <p className="text-[12px] font-medium text-space-primary leading-snug line-clamp-1">
                  {signal.title}
                </p>
                <p className="text-[11px] text-space-body leading-snug mt-0.5 line-clamp-1">
                  {signal.detail}
                </p>
              </div>

              <span className="text-[10px] text-space-muted shrink-0 self-start mt-0.5">
                {signal.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
