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
      return NextResponse.json({
        success: true,
        stats: {
          totalProjects: 4,
          publishedProjects: 4,
          totalArticles: 3,
          publishedArticles: 3,
          draftArticles: 0,
          totalSkills: 15,
          totalTestimonials: 2,
          unreadMessages: 0,
          totalMessages: 0,
        },
      });
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
        draftArticles: totalArticles - publishedArticles,
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
