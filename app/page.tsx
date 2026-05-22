import { getTrendingArticles, getMainHeadline, MOCK_ARTICLES } from "@/lib/articles";
import { fetchSpaceXNews } from "@/lib/fetchNews";
import { fetchCategoryImageMap, attachOGImages } from "@/lib/fetchImage";
import type { Article, Category } from "@/lib/types";
import TrendingSection from "@/components/home/TrendingSection";
import MainHeadline from "@/components/home/MainHeadline";
import LatestSection from "@/components/home/LatestSection";
import ScenarioSignalFeed from "@/components/home/ScenarioSignalFeed";
import WaitlistForm from "@/components/home/WaitlistForm";
import CategoryBadge from "@/components/ui/CategoryBadge";
import EstimateBadge from "@/components/ui/EstimateBadge";
import { Wifi, WifiOff, ExternalLink } from "lucide-react";

export const revalidate = 300;

function attachImages<T extends Article>(
  articles: T[],
  imageMap: Partial<Record<Category, string[]>>
): T[] {
  const counters: Partial<Record<Category, number>> = {};
  return articles.map((a) => {
    if (a.imageUrl) return a;
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

  // Right column: latest 10
  const rawLatest: Article[] = isLive
    ? rssResult.articles.slice(0, 10)
    : MOCK_ARTICLES.slice(0, 6);

  // Center column below hero: next 8 RSS + mock analysis
  const rawMore: Article[] = isLive
    ? [
        ...rssResult.articles.slice(10, 18),
        ...MOCK_ARTICLES.filter((a) => a.dataLabel === "ANALYSIS"),
      ].slice(0, 8)
    : MOCK_ARTICLES;

  // Step 1: OG 이미지 — RSS 기사 대상으로만 병렬 추출 (24h 캐시)
  const [latestWithOG, moreWithOG] = await Promise.all([
    attachOGImages(rawLatest),
    attachOGImages(rawMore),
  ]);

  // Step 2: OG 이미지 없는 기사 → Pexels 카테고리 이미지 폴백
  const allArticles = [...latestWithOG, ...moreWithOG, ...trending, headline];
  const categorySet = new Set<Category>();
  allArticles.filter((a) => !a.imageUrl).forEach((a) => categorySet.add(a.category));

  const imageMap = categorySet.size > 0
    ? await fetchCategoryImageMap(Array.from(categorySet))
    : {};

  const latestArticles  = attachImages(latestWithOG, imageMap);
  const moreStories     = attachImages(moreWithOG, imageMap);
  const trendingWithImg = attachImages(trending, imageMap);
  const headlineWithImg = attachImages([headline], imageMap)[0];

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
            <div className="flex items-center justify-between mb-3 px-0.5">
              <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted">
                More Stories
              </h2>
              {isLive && (
                <span className="text-[10px] text-emerald-400/70">● LIVE</span>
              )}
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
                    className="card-space group flex flex-col gap-2 p-3"
                  >
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <CategoryBadge category={article.category} />
                      <EstimateBadge label={article.dataLabel} />
                    </div>
                    <h3 className="text-sm font-semibold text-space-primary group-hover:text-white leading-snug line-clamp-2 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-space-body line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                    {article.source && (
                      <span className="text-[10px] text-space-muted mt-auto flex items-center gap-1">
                        {article.source.name}
                        {isExternal && <ExternalLink className="w-2.5 h-2.5" />}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
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
