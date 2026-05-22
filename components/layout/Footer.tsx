import { ShieldAlert } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-space-border bg-space-base">
      {/* Risk Disclosure Banner */}
      <div className="border-b border-amber-500/20 bg-amber-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-300/80 leading-relaxed">
            <span className="font-bold text-amber-400">DISCLAIMER:</span>{" "}
            SPCX Watch is not affiliated with, endorsed by, or sponsored by Space Exploration
            Technologies Corp. (SpaceX) or Elon Musk. No IPO filing has been confirmed by SpaceX.
            All scenario models, valuations, and analyses are for educational and informational
            purposes only and do not constitute investment advice. Content labeled{" "}
            <span className="font-semibold">HYPOTHETICAL</span>,{" "}
            <span className="font-semibold">ANALYSIS</span>, or{" "}
            <span className="font-semibold">COMMUNITY</span> is not sourced from official
            disclosures. Always consult a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white tracking-tight">
            SPCX<span className="text-blue-400">WATCH</span>
          </span>
          <span className="text-space-muted text-xs">/ SpaceX IPO Intelligence</span>
        </div>

        <nav className="flex items-center gap-4 text-xs text-space-muted">
          <a href="/methodology" className="hover:text-space-primary transition-colors">Methodology</a>
          <a href="/disclaimer"  className="hover:text-space-primary transition-colors">Disclaimer</a>
          <a href="/about"       className="hover:text-space-primary transition-colors">About</a>
        </nav>

        <p className="text-[10px] text-space-muted">
          © {new Date().getFullYear()} SPCX Watch · Independent IPO tracker ·{" "}
          <span className="text-space-muted/60">Not investment advice</span>
        </p>
      </div>
    </footer>
  );
}
