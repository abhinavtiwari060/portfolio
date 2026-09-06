import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { WebsiteSettings } from "@/models/WebsiteSettings";

const DEFAULT_SETTINGS = {
  showHero: true,
  showAbout: true,
  showSkills: true,
  showProjects: true,
  showArticles: true,
  showTestimonials: true,
  showContact: true,
  siteTitle: "Abhinav Kumar Tiwari (Abhi) • Full Stack Developer & Builder",
  siteDescription: "Developer • Builder • Problem Solver. Building practical, high-performance web experiences.",
};

export const revalidate = 0; // Always fresh

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, settings: DEFAULT_SETTINGS });
    }

    let settings: any = await WebsiteSettings.findOne().lean();
    if (!settings) {
      settings = await WebsiteSettings.create(DEFAULT_SETTINGS);
    }

    return NextResponse.json({
      success: true,
      settings: {
        showHero: settings.showHero ?? true,
        showAbout: settings.showAbout ?? true,
        showSkills: settings.showSkills ?? true,
        showProjects: settings.showProjects ?? true,
        showArticles: settings.showArticles ?? true,
        showTestimonials: settings.showTestimonials ?? true,
        showContact: settings.showContact ?? true,
        siteTitle: settings.siteTitle || DEFAULT_SETTINGS.siteTitle,
        siteDescription: settings.siteDescription || DEFAULT_SETTINGS.siteDescription,
      },
    });
  } catch (error: any) {
    console.error("[Settings API Error]", error);
    return NextResponse.json({ success: true, settings: DEFAULT_SETTINGS });
  }
}
