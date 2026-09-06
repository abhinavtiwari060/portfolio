import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { getAdminSession } from "@/lib/auth/session";

interface RouteParams {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: "Invalid article ID." }, { status: 400 });
  }

  try {
    const data = await req.json();
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to update article." },
        { status: 503 }
      );
    }

    const existing = await Article.findById(id);
    if (!existing) {
      return NextResponse.json({ success: false, message: "Article not found." }, { status: 404 });
    }

    // Slug formatting and uniqueness check if slug changed
    if (data.slug && data.slug !== existing.slug) {
      const cleanSlug = data.slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const slugConflict = await Article.findOne({ slug: cleanSlug, _id: { $ne: id } });
      if (slugConflict) {
        return NextResponse.json(
          { success: false, message: `The slug "${cleanSlug}" is already in use by another article.` },
          { status: 400 }
        );
      }
      data.slug = cleanSlug;
    }

    const updatePayload = {
      ...data,
      tags: Array.isArray(data.tags) ? data.tags : existing.tags,
    };

    const article = await Article.findByIdAndUpdate(id, { $set: updatePayload }, { new: true });

    try {
      revalidatePath("/");
      revalidatePath("/articles");
      if (existing.slug) revalidatePath(`/articles/${existing.slug}`);
      if (article?.slug && article.slug !== existing.slug) {
        revalidatePath(`/articles/${article.slug}`);
      }
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    console.error("[Admin Article PUT Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to update article." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: "Invalid article ID." }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to delete article." },
        { status: 503 }
      );
    }

    const article = await Article.findById(id);
    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article not found or already deleted." },
        { status: 404 }
      );
    }

    await Article.findByIdAndDelete(id);

    try {
      revalidatePath("/");
      revalidatePath("/articles");
      if (article.slug) {
        revalidatePath(`/articles/${article.slug}`);
      }
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, message: "Article deleted successfully." });
  } catch (error: any) {
    console.error("[Admin Article DELETE Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to delete article." }, { status: 500 });
  }
}

