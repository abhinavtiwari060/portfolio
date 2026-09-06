import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { getAdminSession } from "@/lib/auth/session";
import { initialArticles } from "@/lib/mongodb/seedData";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, articles: initialArticles });
    }

    const articles = await Article.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, articles });
  } catch (error: any) {
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

    if (!data.title || !data.excerpt || !data.content) {
      return NextResponse.json(
        { success: false, message: "Title, excerpt, and content are required." },
        { status: 400 }
      );
    }

    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const db = await connectToDatabase();
    if (db) {
      const article = await Article.create(data);
      return NextResponse.json({ success: true, article });
    }

    return NextResponse.json({ success: true, article: { ...data, _id: "dev-temp-id" } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
