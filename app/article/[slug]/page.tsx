import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MOCK_ARTICLES, formatTimeAgo } from "@/lib/articles";
import { CATEGORY_LABELS } from "@/lib/types";
import CategoryBadge from "@/components/ui/CategoryBadge";
import EstimateBadge from "@/components/ui/EstimateBadge";
import { ArrowLeft, ExternalLink, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return MOCK_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = MOCK_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found — SPCX Watch" };
  return {
    title: `${article.title} — SPCX Watch`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: Props) {
  const article = MOCK_ARTICLES.find((a) => a.slug === params.slug);

  if (!article) notFound();

  const categoryLabel = CATEGORY_LABELS[article.category];

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-space-muted hover:text-space-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      {/* Hero image */}
      {article.imageUrl && (
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-space-surface">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <CategoryBadge category={article.category} />
        <EstimateBadge label={article.dataLabel} />
        <span className="text-[11px] text-space-muted">
          {formatTimeAgo(article.publishedAt)}
        </span>
        {article.viewCount && (
          <span className="text-[11px] text-space-muted">
            · {article.viewCount.toLocaleString()} views
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-space-primary leading-tight mb-4">
        {article.title}
      </h1>

      {/* Source */}
      {article.source && (
        <div className="flex items-center gap-1.5 mb-6 pb-6 border-b border-space-border">
          <ExternalLink className="w-3.5 h-3.5 text-space-muted" />
          <span className="text-sm text-space-muted">Source: </span>
          {article.source.url && article.source.url !== "#" ? (
            <a
              href={article.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-space-accent hover:underline"
            >
              {article.source.name}
            </a>
          ) : (
            <span className="text-sm text-space-body">{article.source.name}</span>
          )}
        </div>
      )}

      {/* Body */}
      <div className="space-y-5">
        {article.body && article.body.length > 0 ? (
          article.body.map((paragraph, i) => (
            <p key={i} className="text-base text-space-body leading-[1.8]">
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-base text-space-body leading-[1.8]">
            {article.excerpt}
          </p>
        )}
      </div>

      {/* Data label disclaimer */}
      {(article.dataLabel === "HYPOTHETICAL" ||
        article.dataLabel === "ANALYSIS" ||
        article.dataLabel === "COMMUNITY") && (
        <div className="flex items-start gap-3 mt-8 p-4 rounded-md bg-amber-500/10 border border-amber-500/20">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[12px] text-amber-300 leading-relaxed">
            This article carries a <strong>{article.dataLabel}</strong> label.
            It is{" "}
            {article.dataLabel === "HYPOTHETICAL"
              ? "a speculative scenario"
              : article.dataLabel === "ANALYSIS"
              ? "an analytical model"
              : "a community-submitted hypothesis"}{" "}
            — not an official announcement or confirmed fact. Do not use this content to inform investment decisions.
          </p>
        </div>
      )}

      {/* Category link */}
      <div className="mt-8 pt-6 border-t border-space-border">
        <Link
          href={`/category/${article.category}`}
          className="inline-flex items-center gap-1.5 text-sm text-space-accent hover:underline"
        >
          More {categoryLabel} →
        </Link>
      </div>
    </main>
  );
}
