export type DataLabel =
  | "REAL"         // 실제 공식 발표 / 확인된 뉴스
  | "PUBLIC DATA"  // 공개 데이터 기반
  | "COMMUNITY"    // 커뮤니티 분석·추정
  | "HYPOTHETICAL" // 가상 시나리오
  | "ANALYSIS"     // 분석 모델
  | "UNVERIFIED";  // 미확인

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  body?: string[]; // 본문 단락 배열 (없으면 excerpt만 표시)
  category: Category;
  dataLabel: DataLabel;
  slug: string;
  publishedAt: string; // ISO string
  imageUrl?: string;
  source?: { name: string; url: string };
  viewCount?: number;
}

export type Category =
  | "launch"
  | "starlink"
  | "starship"
  | "falcon"
  | "nasa"
  | "business"
  | "general";

export const CATEGORY_LABELS: Record<Category, string> = {
  launch:   "Launch",
  starlink: "Starlink",
  starship: "Starship",
  falcon:   "Falcon",
  nasa:     "NASA",
  business: "IPO / Business",
  general:  "General",
};
