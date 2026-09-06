import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import { Project } from "@/models/Project";
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
    return NextResponse.json({ success: false, message: "Invalid project ID." }, { status: 400 });
  }

  try {
    const data = await req.json();
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to update project." },
        { status: 503 }
      );
    }

    const existing = await Project.findById(id);
    if (!existing) {
      return NextResponse.json({ success: false, message: "Project not found." }, { status: 404 });
    }

    // Slug formatting and uniqueness validation if slug changed
    if (data.slug && data.slug !== existing.slug) {
      const cleanSlug = data.slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const slugConflict = await Project.findOne({ slug: cleanSlug, _id: { $ne: id } });
      if (slugConflict) {
        return NextResponse.json(
          { success: false, message: `The slug "${cleanSlug}" is already in use by another project.` },
          { status: 400 }
        );
      }
      data.slug = cleanSlug;
    }

    const updatePayload = {
      ...data,
      features: Array.isArray(data.features) ? data.features : existing.features,
      technologies: Array.isArray(data.technologies) ? data.technologies : existing.technologies,
      images: Array.isArray(data.images) ? data.images : data.imageUrl ? [data.imageUrl] : existing.images,
    };

    const project = await Project.findByIdAndUpdate(id, { $set: updatePayload }, { new: true });

    try {
      revalidatePath("/");
      revalidatePath("/projects");
      if (existing.slug) revalidatePath(`/projects/${existing.slug}`);
      if (project?.slug && project.slug !== existing.slug) {
        revalidatePath(`/projects/${project.slug}`);
      }
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error("[Admin Project PUT Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to update project." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: "Invalid project ID." }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to delete project." },
        { status: 503 }
      );
    }

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found or already deleted." },
        { status: 404 }
      );
    }

    await Project.findByIdAndDelete(id);

    try {
      revalidatePath("/");
      revalidatePath("/projects");
      if (project.slug) {
        revalidatePath(`/projects/${project.slug}`);
      }
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully." });
  } catch (error: any) {
    console.error("[Admin Project DELETE Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to delete project." }, { status: 500 });
  }
}

