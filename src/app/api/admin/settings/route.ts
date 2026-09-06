import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to fetch settings." },
        { status: 503 }
      );
    }

    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create(DEFAULT_SETTINGS);
    }

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error("[Admin Settings GET Error]", error);
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
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to save settings." },
        { status: 503 }
      );
    }

    const updated = await WebsiteSettings.findOneAndUpdate(
      {},
      { $set: data },
      { new: true, upsert: true }
    );

    try {
      revalidatePath("/", "layout");
      revalidatePath("/projects");
      revalidatePath("/articles");
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    console.error("[Admin Settings PUT Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to save settings." }, { status: 500 });
  }
}

