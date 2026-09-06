import React from "react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import ArticleCard from "@/components/ui/ArticleCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { getPortfolioData } from "@/lib/data/portfolio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles & Engineering Notes",
  description:
    "Technical articles, architectural deep-dives, and tutorials by Abhinav Kumar Tiwari.",
};

export const revalidate = 0;

export default async function ArticlesPage() {
  const { articles } = await getPortfolioData();

  return (
    <main className="min-h-screen bg-charcoal-950 text-white flex flex-col pt-32 pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <SectionHeading
          badgeText="Writing"
          title="Articles & Engineering Notes"
          subtitle="Thoughts on full-stack architecture, design systems, database design, and software engineering craft."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article: any, idx: number) => (
            <ArticleCard key={article._id || article.slug || idx} article={article} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
