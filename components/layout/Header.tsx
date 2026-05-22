import Link from "next/link";
import { Search, Rocket } from "lucide-react";

const NAV_LINKS = [
  { label: "IPO News",  href: "/category/business" },
  { label: "Starship",  href: "/category/starship"  },
  { label: "Starlink",  href: "/category/starlink"  },
  { label: "Valuation", href: "/category/general"   },
  { label: "Scenarios", href: "/community"          },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-space-base/95 backdrop-blur border-b border-space-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Rocket className="w-5 h-5 text-space-accent" />
          <span className="font-bold text-space-primary tracking-tight text-lg leading-none">
            SPCX<span className="text-space-accent">WATCH</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-space-body hover:text-space-primary hover:bg-space-surface rounded transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <button className="p-2 text-space-body hover:text-space-primary hover:bg-space-surface rounded transition-colors">
          <Search className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
