"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { ClayCard } from "./ClayCard";
import { ClayBadge } from "./ClayBadge";

export interface ArticleCardData {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
  publishedAt?: Date | string;
}

export const ArticleCard: React.FC<{ article: ArticleCardData }> = ({ article }) => {
  const coverImage =
    article.coverImage ||
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Published";

  return (
    <ClayCard
      variant="interactive"
      className="group relative flex flex-col h-full overflow-hidden p-0 border border-white/5 hover:border-orange-500/40"
    >
      {/* Cover Image */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-[26px] bg-charcoal-900">
        <Image
          src={coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />

        {article.category && (
          <div className="absolute top-4 left-4 z-10">
            <ClayBadge variant="orange" size="sm">
              {article.category}
            </ClayBadge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Meta details */}
        <div className="flex items-center gap-4 text-xs text-charcoal-400 mb-3">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            {formattedDate}
          </span>
          {article.readingTime && (
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-charcoal-400" />
              {article.readingTime}
            </span>
          )}
        </div>

        <Link href={`/articles/${article.slug}`} className="focus:outline-none">
          <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2 mb-2.5">
            {article.title}
          </h3>
        </Link>

        <p className="text-sm text-charcoal-300 leading-relaxed line-clamp-2 mb-5">
          {article.excerpt}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {article.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs rounded-md bg-charcoal-800 text-charcoal-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors group/link"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </ClayCard>
  );
};

export default ArticleCard;
