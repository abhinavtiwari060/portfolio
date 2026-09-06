import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Project, Article, Skill, Testimonial, ContactMessage } from "@/models";
import { getAdminSession } from "@/lib/auth/session";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to fetch stats." },
        { status: 503 }
      );
    }

    const [
      totalProjects,
      publishedProjects,
      totalArticles,
      publishedArticles,
      totalSkills,
      totalTestimonials,
      unreadMessages,
      totalMessages,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ published: true }),
      Article.countDocuments(),
      Article.countDocuments({ published: true }),
      Skill.countDocuments(),
      Testimonial.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
      ContactMessage.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalProjects,
        publishedProjects,
        totalArticles,
        publishedArticles,
        draftArticles: Math.max(0, totalArticles - publishedArticles),
        totalSkills,
        totalTestimonials,
        unreadMessages,
        totalMessages,
      },
    });
  } catch (error: any) {
    console.error("[Stats Error]", error);
    return NextResponse.json({ success: false, message: "Failed to fetch stats." }, { status: 500 });
  }
}

