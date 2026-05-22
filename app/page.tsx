import Image from "next/image";
import Link from "next/link";
import { getTrendingArticles, getMainHeadline, MOCK_ARTICLES } from "@/lib/articles";
import { fetchSpaceXNews } from "@/lib/fetchNews";
import { fetchCategoryImageMap, attachOGImages } from "@/lib/fetchImage";
import type { Article, Category } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import TrendingSection from "@/components/home/TrendingSection";
import MainHeadline from "@/components/home/MainHeadline";
import LatestSection from "@/components/home/LatestSection";
import ScenarioSignalFeed from "@/components/home/ScenarioSignalFeed";
import WaitlistForm from "@/components/home/WaitlistForm";
import EstimateBadge from "@/components/ui/EstimateBadge";
import { Wifi, WifiOff, ExternalLink } from "lucide-react";
import { formatTimeAgo } from "@/lib/articles";

export const revalidate = 300;

const MUSK_PATTERN = /\belon\b|\bmusk\b/i;

// Wikimedia Commons — CC-BY / CC-BY-SA public-domain portraits
const MUSK_IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Elon_Musk_%28cropped%29.jpg/640px-Elon_Musk_%28cropped%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Elon_Musk_2015.jpg/640px-Elon_Musk_2015.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/640px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg",
];

function attachImages<T extends Article>(
  articles: T[],
  imageMap: Partial<Record<Category, string[]>>,
  muskImages: string[] = []
): T[] {
  const counters: Partial<Record<Category, number>> = {};
  let muskCounter = 0;
  return articles.map((a) => {
    if (a.imageUrl) return a;
    if (muskImages.length > 0 && MUSK_PATTERN.test(a.title)) {
      const idx = muskCounter % muskImages.length;
      muskCounter++;
      return { ...a, imageUrl: muskImages[idx] };
    }
    const imgs = imageMap[a.category];
    if (!imgs || imgs.length === 0) return a;
    const i = counters[a.category] ?? 0;
    counters[a.category] = i + 1;
    return { ...a, imageUrl: imgs[i % imgs.length] };
  });
}

export default async function HomePage() {
  const [rssResult, trending, headline] = await Promise.all([
    fetchSpaceXNews(),
    Promise.resolve(getTrendingArticles(5)),
    Promise.resolve(getMainHeadline()),
  ]);

  const isLive = rssResult.ok && rssResult.articles.length > 0;

  const rawLatest: Article[] = isLive
    ? rssResult.articles.slice(0, 12)
    : MOCK_ARTICLES.slice(0, 8);

  const rawMore: Article[] = isLive
    ? [
        ...rssResult.articles.slice(12, 22),
        ...MOCK_ARTICLES.filter((a) => a.dataLabel === "ANALYSIS"),
      ].slice(0, 10)
    : MOCK_ARTICLES;

  const [latestWithOG, moreWithOG] = await Promise.all([
    attachOGImages(rawLatest),
    attachOGImages(rawMore),
  ]);

  const allArticles = [...latestWithOG, ...moreWithOG, ...trending, headline];
  const categorySet = new Set<Category>();
  allArticles.filter((a) => !a.imageUrl).forEach((a) => categorySet.add(a.category));

  const imageMap = categorySet.size > 0
    ? await fetchCategoryImageMap(Array.from(categorySet))
    : {};

  const latestArticles  = attachImages(latestWithOG, imageMap, MUSK_IMAGES);
  const moreStories     = attachImages(moreWithOG, imageMap, MUSK_IMAGES);
  const trendingWithImg = attachImages(trending, imageMap, MUSK_IMAGES);
  const headlineWithImg = attachImages([headline], imageMap, MUSK_IMAGES)[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      {/* Status banner */}
      <div className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-md text-[11px] w-fit ${
        isLive
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
      }`}>
        {isLive
          ? <><Wifi className="w-3 h-3" /> Live RSS — {rssResult.articles.length} articles</>
          : <><WifiOff className="w-3 h-3" /> RSS unavailable — showing cached data</>
        }
      </div>

      {/* ── 3-Column Grid ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_260px] gap-6 items-start">

        {/* LEFT: Trending + IPO Alert */}
        <div className="flex flex-col gap-4">
          <TrendingSection articles={trendingWithImg} />
          <div className="card-space p-4">
            <WaitlistForm />
          </div>
        </div>

        {/* CENTER: Hero + More Stories */}
        <div className="flex flex-col gap-4">
          <MainHeadline article={headlineWithImg} />

          {/* More Stories */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted">
                More Stories
              </h2>
              {isLive && <span className="text-[10px] text-emerald-400/70">● LIVE</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {moreStories.map((article) => {
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
                    className="card-space group overflow-hidden flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full h-32 bg-space-elevated overflow-hidden shrink-0">
                      {article.imageUrl ? (
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-space-elevated to-space-surface" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-space-surface/60 to-transparent" />
                    </div>

                    {/* Text */}
                    <div className="p-3 flex flex-col gap-1.5 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] font-bold tracking-widest uppercase text-space-accent">
                          {CATEGORY_LABELS[article.category]}
                        </span>
                        <span className="text-[9px] text-space-muted">
                          {formatTimeAgo(article.publishedAt)}
                        </span>
                        <EstimateBadge label={article.dataLabel} />
                        {isExternal && <ExternalLink className="w-2.5 h-2.5 text-space-muted" />}
                      </div>
                      <h3 className="text-[13px] font-bold text-space-primary group-hover:text-white leading-snug line-clamp-2 transition-colors">
                        {article.title}
                      </h3>
                      {article.source && (
                        <span className="text-[10px] text-space-muted mt-auto">
                          {article.source.name}
                        </span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>

            <Link
              href="/latest"
              className="mt-3 block py-2.5 text-center text-xs text-space-muted hover:text-space-accent border border-space-border hover:border-space-accent/40 rounded-lg transition-colors"
            >
              View all articles →
            </Link>
          </div>
        </div>

        {/* RIGHT: Latest */}
        <LatestSection articles={latestArticles} />
      </div>

      {/* ── Scenario Signal Feed ─────────────────────────────────────────── */}
      <ScenarioSignalFeed />

    </main>
  );
}
