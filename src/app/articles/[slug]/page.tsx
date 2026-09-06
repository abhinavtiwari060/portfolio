import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Share2, Tag, User } from "lucide-react";
import { marked } from "marked";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import ClayBadge from "@/components/ui/ClayBadge";
import ClayCard from "@/components/ui/ClayCard";
import { getArticleBySlug, getPortfolioData } from "@/lib/data/portfolio";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
      images: article.coverImage ? [{ url: article.coverImage }] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const [article, { settings }] = await Promise.all([
    getArticleBySlug(params.slug),
    getPortfolioData(),
  ]);

  if (!article) {
    notFound();
  }

  const htmlContent = marked.parse(article.content || "");

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Published";

  return (
    <main className="min-h-screen bg-charcoal-950 text-white flex flex-col pt-28 pb-20">
      <Navbar settings={settings} />


      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Back Link */}
        <Link
          href="/#articles"
          className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-400 hover:text-orange-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        {/* Article Meta */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {article.category && (
              <ClayBadge variant="orange" size="md">
                {article.category}
              </ClayBadge>
            )}
            <div className="flex items-center gap-3 text-xs text-charcoal-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime || "5 min read"}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-charcoal-300 leading-relaxed max-w-2xl">
            {article.excerpt}
          </p>
        </div>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="relative w-full h-64 sm:h-96 rounded-3xl overflow-hidden shadow-clay-card border border-white/10 mb-12 bg-charcoal-900">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-center"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-invert prose-orange max-w-none text-charcoal-200 text-base sm:text-lg leading-relaxed space-y-6
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:text-charcoal-300
              prose-code:text-orange-400 prose-code:bg-charcoal-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
              prose-pre:bg-charcoal-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:p-4
              prose-ul:list-disc prose-ul:pl-6 prose-li:text-charcoal-300
              prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-charcoal-900/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-xl prose-blockquote:italic"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-10 mt-10 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-orange-400" />
                Tags:
              </span>
              {article.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs rounded-full bg-charcoal-850 text-charcoal-300 border border-white/5"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Card */}
          <ClayCard className="mt-12 p-6 sm:p-8 flex items-center gap-5 border border-white/5 bg-charcoal-900/80">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-orange-500/30 shrink-0 bg-charcoal-800 flex items-center justify-center text-orange-400">
              <User className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                Written by
              </span>
              <h3 className="text-lg font-bold text-white mb-1">
                {article.author || "Abhinav Kumar Tiwari"}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-400 leading-relaxed">
                Full-stack developer focused on building scalable, tactile, and resilient web applications.
              </p>
            </div>
          </ClayCard>
        </div>
      </article>

      <Footer settings={settings} />
    </main>
  );
}

