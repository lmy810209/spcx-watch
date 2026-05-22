import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MOCK_ARTICLES } from "@/lib/articles";
import { CATEGORY_LABELS } from "@/lib/types";
import type { Category } from "@/lib/types";
import { fetchSpaceXNews } from "@/lib/fetchNews";
import { fetchImagesForCategory, attachOGImages } from "@/lib/fetchImage";
import CategoryBadge from "@/components/ui/CategoryBadge";
import EstimateBadge from "@/components/ui/EstimateBadge";
import { ArrowLeft, ExternalLink, Wifi, WifiOff } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 300;

const VALID_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = CATEGORY_LABELS[params.category as Category];
  if (!label) return { title: "Category Not Found — SPCX Watch" };
  return {
    title: `${label} — SPCX Watch`,
    description: `Latest SpaceX ${label} news and scenario analysis.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = params.category as Category;

  if (!VALID_CATEGORIES.includes(category)) notFound();

  const label = CATEGORY_LABELS[category];

  // Fetch RSS + category images in parallel
  const [rssResult, categoryImages] = await Promise.all([
    fetchSpaceXNews(),
    fetchImagesForCategory(category, 5),
  ]);
  const isLive = rssResult.ok && rssResult.articles.length > 0;

  const rssFiltered = isLive
    ? rssResult.articles.filter((a) => a.category === category)
    : [];

  const mockFiltered = MOCK_ARTICLES.filter((a) => a.category === category);

  const combined = [
    ...rssFiltered,
    ...mockFiltered.filter(
      (m) => !rssFiltered.some((r: { title: string }) => r.title === m.title)
    ),
  ];

  // OG 이미지 먼저, 없으면 Pexels 카테고리 이미지 폴백
  const withOG = await attachOGImages(combined);
  const allArticles = withOG.map((a, i) =>
    a.imageUrl ? a : { ...a, imageUrl: categoryImages[i % categoryImages.length] }
  );

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-space-muted hover:text-space-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <CategoryBadge category={category} />
          <h1 className="text-2xl font-bold text-space-primary mt-2">{label}</h1>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] ${
          isLive
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
        }`}>
          {isLive
            ? <><Wifi className="w-3 h-3" /> Live</>
            : <><WifiOff className="w-3 h-3" /> Cached</>
          }
        </div>
      </div>
      <p className="text-sm text-space-muted mb-8">
        {allArticles.length} articles
      </p>

      {allArticles.length === 0 ? (
        <div className="py-20 text-center text-space-muted">
          <p className="text-sm">No articles found in this category.</p>
          <Link href="/" className="mt-4 inline-block text-space-accent hover:underline text-sm">
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allArticles.map((article) => {
            const isExternal = "externalUrl" in article;
            const href = isExternal
              ? (article as { externalUrl: string }).externalUrl
              : `/article/${article.slug}`;

            return (
              <a
                key={article.id}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="card-space group flex flex-col overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative w-full h-36 bg-space-elevated shrink-0">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-space-elevated to-space-surface" />
                  )}
                </div>
                <div className="flex flex-col gap-2 p-4 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <EstimateBadge label={article.dataLabel} />
                  {isExternal && (
                    <ExternalLink className="w-3 h-3 text-space-muted" />
                  )}
                </div>
                <h3 className="text-sm font-semibold text-space-primary group-hover:text-white leading-snug line-clamp-2 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-space-body line-clamp-2 leading-relaxed flex-1">
                  {article.excerpt}
                </p>
                {article.source && (
                  <span className="text-[10px] text-space-muted mt-auto">
                    {article.source.name}
                    {isExternal && " ↗"}
                  </span>
                )}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </main>
  );
}
