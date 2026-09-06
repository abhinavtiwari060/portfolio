import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { WebsiteSettings } from "@/models/WebsiteSettings";
import { getAdminSession } from "@/lib/auth/session";

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

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, settings: DEFAULT_SETTINGS });
    }

    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create(DEFAULT_SETTINGS);
    }

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const db = await connectToDatabase();

    if (db) {
      const updated = await WebsiteSettings.findOneAndUpdate(
        {},
        { $set: data },
        { new: true, upsert: true }
      );
      return NextResponse.json({ success: true, settings: updated });
    }

    return NextResponse.json({ success: true, settings: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
