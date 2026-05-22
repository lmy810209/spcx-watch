import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import CategoryBadge from "@/components/ui/CategoryBadge";
import EstimateBadge from "@/components/ui/EstimateBadge";
import { formatTimeAgo } from "@/lib/articles";
import { ExternalLink } from "lucide-react";

export default function MainHeadline({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <article
        className="relative rounded-xl overflow-hidden aspect-[16/10] min-h-[320px]"
        style={{ backgroundColor: "var(--bg-surface)" }}
      >
        {/* Background image */}
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500 opacity-80 group-hover:opacity-90"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-space-surface to-space-elevated" />
        )}

        {/* Gradient overlay — 하단 70%를 덮어 텍스트 가독성 확보 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/95 via-[#0A0F1E]/50 to-transparent" />

        {/* 호버 글로우 테두리 */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 group-hover:ring-space-accent/30 transition-all duration-300" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <CategoryBadge category={article.category} />
            <EstimateBadge label={article.dataLabel} />
            <span className="text-[11px] text-space-body">
              {formatTimeAgo(article.publishedAt)}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-space-primary group-hover:text-white leading-tight transition-colors line-clamp-3">
            {article.title}
          </h1>

          <p className="mt-2 text-sm text-space-body line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>

          {article.source && (
            <div className="mt-3 flex items-center gap-1 text-[11px] text-space-muted">
              <ExternalLink className="w-3 h-3" />
              <span>Source: {article.source.name}</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
