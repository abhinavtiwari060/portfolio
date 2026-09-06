import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import { Article } from "@/models/Article";
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
        { success: false, message: "Database connection failed. Unable to fetch articles." },
        { status: 503 }
      );
    }

    const articles = await Article.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, articles });
  } catch (error: any) {
    console.error("[Admin Articles GET Error]", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.title?.trim() || !data.excerpt?.trim() || !data.content?.trim()) {
      return NextResponse.json(
        { success: false, message: "Title, excerpt, and content are required." },
        { status: 400 }
      );
    }

    let slug = data.slug
      ? data.slug
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      : data.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

    if (!slug) {
      slug = `article-${Date.now()}`;
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection unavailable. Changes not saved." },
        { status: 503 }
      );
    }

    // Slug uniqueness check
    const existingSlug = await Article.findOne({ slug });
    if (existingSlug) {
      return NextResponse.json(
        { success: false, message: `An article with the slug "${slug}" already exists. Please choose another slug.` },
        { status: 400 }
      );
    }

    const articleData = {
      ...data,
      slug,
      tags: Array.isArray(data.tags) ? data.tags : [],
      published: data.published !== false,
      publishedAt: data.published !== false ? data.publishedAt || new Date() : new Date(),
    };

    const article = await Article.create(articleData);

    try {
      revalidatePath("/");
      revalidatePath("/articles");
      revalidatePath(`/articles/${article.slug}`);
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error: any) {
    console.error("[Admin Articles POST Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to publish article." }, { status: 500 });
  }
}

