import Link from "next/link";
import { ArrowLeft, Rocket, Database, Users, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — SPCX Watch",
  description: "SPCX Watch is an independent SpaceX IPO intelligence and scenario analysis platform.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-space-muted hover:text-space-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      {/* Hero */}
      <div className="flex items-center gap-3 mb-3">
        <Rocket className="w-6 h-6 text-space-accent" />
        <h1 className="text-2xl font-bold text-space-primary">
          About <span className="text-space-accent">SPCX Watch</span>
        </h1>
      </div>
      <p className="text-sm text-space-body leading-relaxed mb-10">
        SPCX Watch is an independent media project delivering SpaceX IPO intelligence —
        tracking valuation scenarios, share structure analysis, lock-up risk, and investor dynamics
        alongside the community as the story develops.
      </p>

      {/* Values */}
      <section className="mb-10">
        <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted mb-4">
          Core Principles
        </h2>
        <div className="space-y-3">
          {[
            {
              icon: ShieldCheck,
              title: "Transparent Labeling",
              desc: "Every piece of content carries a data label — REAL, PUBLIC DATA, ANALYSIS, or HYPOTHETICAL — so readers always know what they are looking at and can assess it accordingly.",
            },
            {
              icon: Database,
              title: "Real-Time Data + Scenario Analysis",
              desc: "The latest SpaceX articles are ingested via Google News RSS every 5 minutes, while community scenario models and valuation analyses are layered on top for deeper context.",
            },
            {
              icon: Users,
              title: "Community-Driven",
              desc: "Readers can submit scenarios and vote on them through the Community Scenario Tracker. The goal is collective, evidence-based analysis built entirely on public information.",
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

      {/* Disclaimer note */}
      <section className="p-4 rounded-md bg-amber-500/10 border border-amber-500/20 text-[12px] text-amber-300 leading-relaxed">
        SPCX Watch is an independent project with no affiliation to SpaceX.
        All scenarios and analyses on this site are for simulation purposes only and do not constitute investment advice.{" "}
        <Link href="/disclaimer" className="underline hover:text-amber-200">
          Read the full disclaimer
        </Link>
      </section>
    </main>
  );
}
