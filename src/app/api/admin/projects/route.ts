import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { getAdminSession } from "@/lib/auth/session";
import { initialProjects } from "@/lib/mongodb/seedData";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, projects: initialProjects });
    }

    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json({ success: true, projects });
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

    if (!data.title || !data.shortDescription) {
      return NextResponse.json(
        { success: false, message: "Title and short description are required." },
        { status: 400 }
      );
    }

    // Generate slug if not supplied
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const db = await connectToDatabase();
    if (db) {
      const project = await Project.create(data);
      return NextResponse.json({ success: true, project });
    }

    return NextResponse.json({ success: true, project: { ...data, _id: "dev-temp-id" } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
