import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import { Project } from "@/models/Project";
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
        { success: false, message: "Database connection failed. Unable to fetch projects." },
        { status: 503 }
      );
    }

    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    console.error("[Admin Projects GET Error]", error);
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

    if (!data.title?.trim() || !data.shortDescription?.trim()) {
      return NextResponse.json(
        { success: false, message: "Title and short description are required." },
        { status: 400 }
      );
    }

    // Generate slug if not supplied
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
      slug = `project-${Date.now()}`;
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection unavailable. Changes not saved." },
        { status: 503 }
      );
    }

    // Check slug uniqueness
    const existingSlug = await Project.findOne({ slug });
    if (existingSlug) {
      return NextResponse.json(
        { success: false, message: `A project with the slug "${slug}" already exists. Please choose another slug.` },
        { status: 400 }
      );
    }

    const projectData = {
      ...data,
      slug,
      features: Array.isArray(data.features) ? data.features : [],
      technologies: Array.isArray(data.technologies) ? data.technologies : [],
      images: Array.isArray(data.images) ? data.images : data.imageUrl ? [data.imageUrl] : [],
      published: data.published !== false,
      featured: !!data.featured,
    };

    const project = await Project.create(projectData);

    // Trigger Next.js targeted revalidations
    try {
      revalidatePath("/");
      revalidatePath("/projects");
      revalidatePath(`/projects/${project.slug}`);
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error: any) {
    console.error("[Admin Projects POST Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to create project." }, { status: 500 });
  }
}

