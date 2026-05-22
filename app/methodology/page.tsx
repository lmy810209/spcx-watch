import Link from "next/link";
import { ArrowLeft, Database, Tag, Rss, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Methodology — SPCX Watch",
  description: "How SPCX Watch collects, classifies, and labels SpaceX IPO-related information.",
};

const LABELS = [
  {
    label: "REAL",
    color: "bg-emerald-400",
    desc: "Directly verified from official announcements, press releases, or regulatory filings by SpaceX, NASA, FAA, FCC, or other authoritative bodies.",
  },
  {
    label: "PUBLIC DATA",
    color: "bg-sky-400",
    desc: "Sourced from credible, publicly available outlets such as Reuters, Bloomberg, and SpaceNews. The original source is always cited.",
  },
  {
    label: "ANALYSIS",
    color: "bg-blue-400",
    desc: "Analysis models or commentary produced by the editorial team or community members, built on public data. Assumptions and inputs are stated explicitly.",
  },
  {
    label: "COMMUNITY",
    color: "bg-violet-400",
    desc: "Scenarios or analysis submitted by community members. Content is reviewed before publication and is clearly distinguished from official information.",
  },
  {
    label: "HYPOTHETICAL",
    color: "bg-amber-400",
    desc: "Speculative scenarios that have not materialized. These are thought experiments framed as \"What if?\" — not forecasts or predictions.",
  },
  {
    label: "UNVERIFIED",
    color: "bg-zinc-400",
    desc: "Content whose source or factual accuracy has not been fully confirmed. Additional verification is needed — read with caution.",
  },
];

export default function MethodologyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-space-muted hover:text-space-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      <h1 className="text-2xl font-bold text-space-primary mb-2">Data Methodology</h1>
      <p className="text-sm text-space-body mb-10 leading-relaxed">
        SPCX Watch labels every piece of SpaceX-related information by its nature and reliability.
        The badge displayed on each item lets readers instantly determine whether content is an official announcement,
        a data-driven analysis, or a community scenario.
      </p>

      {/* Data sources */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Rss className="w-4 h-4 text-space-accent" />
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted">
            Data Collection
          </h2>
        </div>
        <div className="space-y-3">
          {[
            {
              icon: Database,
              title: "Google News RSS",
              desc: "The latest SpaceX-related articles are ingested via Google News RSS every 5 minutes. The original source outlet is displayed on every item.",
            },
            {
              icon: ShieldCheck,
              title: "Official Sources First",
              desc: "Content published by spacex.com, nasa.gov, faa.gov, and fcc.gov is automatically assigned the REAL label, indicating primary-source verification.",
            },
            {
              icon: Tag,
              title: "Keyword Category Classification",
              desc: "Articles are automatically classified by keywords such as Starship, Starlink, and Falcon 9. Items that do not match a category are placed in the general bucket.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-space p-4 flex gap-3">
              <Icon className="w-4 h-4 text-space-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-space-primary mb-1">{title}</p>
                <p className="text-[12px] text-space-body leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Label guide */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-4 h-4 text-space-accent" />
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted">
            Data Label Definitions
          </h2>
        </div>
        <div className="space-y-3">
          {LABELS.map(({ label, color, desc }) => (
            <div key={label} className="card-space p-4 flex gap-3">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${color}`} />
              <div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-space-primary mb-1">
                  {label}
                </p>
                <p className="text-[12px] text-space-body leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
