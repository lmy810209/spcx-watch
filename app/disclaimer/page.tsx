import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer — SPCX Watch",
  description: "Legal disclaimer and terms of use for SPCX Watch.",
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-space-muted hover:text-space-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      <div className="flex items-center gap-2 mb-2">
        <ShieldAlert className="w-5 h-5 text-amber-400" />
        <h1 className="text-2xl font-bold text-space-primary">Disclaimer</h1>
      </div>
      <p className="text-xs text-space-muted mb-8">Last updated: May 2025</p>

      <div className="space-y-8 text-sm text-space-body leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-space-primary mb-2">1. No Affiliation with SpaceX</h2>
          <p>
            SPCX Watch has no affiliation with Space Exploration Technologies Corp. (SpaceX) or Elon Musk,
            and has not been approved, sponsored, or officially endorsed by SpaceX in any way.
            Any SpaceX-related names, logos, or trademarks referenced on this site are used solely for
            informational and educational reporting purposes.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-space-primary mb-2">2. Not Investment Advice</h2>
          <p>
            All content on this site — including articles, analysis models, valuation scenarios, and community
            commentary — is provided for informational and educational purposes only and does not constitute
            investment advice of any kind. SPCX Watch does not provide financial advisory services and is not
            a broker-dealer, investment adviser, or financial institution. Any investment decisions should be
            made only after consulting a qualified financial professional.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-space-primary mb-2">3. IPO Not Confirmed</h2>
          <p>
            SpaceX has not officially announced an initial public offering (IPO) and has not filed a
            registration statement (S-1) with any securities regulator as of the date of this disclaimer.
            All IPO scenarios, valuation models, and share-structure hypotheses discussed on this site are
            community simulations based on publicly available information. They do not represent actual
            financial data or corporate plans of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-space-primary mb-2">4. Information Accuracy</h2>
          <p>
            While SPCX Watch makes reasonable efforts to ensure the accuracy of collected information,
            we do not warrant the completeness, accuracy, or timeliness of content sourced from external
            RSS feeds and public media. Every item carries a data label (REAL / PUBLIC DATA / ANALYSIS /
            HYPOTHETICAL / UNVERIFIED) to indicate its reliability level, and readers should interpret
            content accordingly.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-space-primary mb-2">5. External Links</h2>
          <p>
            This site contains links to articles hosted on third-party websites.
            SPCX Watch assumes no responsibility for the content, accuracy, or privacy practices
            of any external site. The inclusion of a link does not imply endorsement.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-space-primary mb-2">6. Data Collection (IPO Alert List)</h2>
          <p>
            When you join the IPO Alert List, we collect your email address. The collected email is used
            solely to send SPCX Watch-related updates and alerts. Your email will never be sold to or
            shared with third parties for commercial purposes.
          </p>
        </section>

      </div>
    </main>
  );
}
