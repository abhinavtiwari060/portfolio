"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import ArticleCard, { ArticleCardData } from "../ui/ArticleCard";
import ClayButton from "../ui/ClayButton";

interface ArticlesSectionProps {
  articles: ArticleCardData[];
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => {
  return (
    <section id="articles" className="py-24 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badgeText="Articles & Notes"
          title="Technical Writing & Engineering Thoughts"
          subtitle="Deep dives into full-stack architecture, software design patterns, and lessons learned while building."
        />

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {articles.map((article, idx) => (
            <ArticleCard key={article._id || article.slug || idx} article={article} />
          ))}
        </div>

        {/* View All Articles CTA */}
        <div className="flex justify-center">
          <Link href="/articles">
            <ClayButton
              variant="secondary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4 text-orange-400" />}
            >
              Explore All Articles
            </ClayButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
