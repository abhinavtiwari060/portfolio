import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import { Skill } from "@/models/Skill";
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
    return NextResponse.json({ success: false, message: "Invalid skill ID." }, { status: 400 });
  }

  try {
    const data = await req.json();
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to update skill." },
        { status: 503 }
      );
    }

    const skill = await Skill.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name?.trim(),
          category: data.category,
          icon: data.icon,
          proficiency: Number(data.proficiency),
          displayOrder: Number(data.displayOrder),
        },
      },
      { new: true }
    );

    if (!skill) {
      return NextResponse.json({ success: false, message: "Skill not found." }, { status: 404 });
    }

    try {
      revalidatePath("/");
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, skill });
  } catch (error: any) {
    console.error("[Admin Skill PUT Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to update skill." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: "Invalid skill ID." }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to delete skill." },
        { status: 503 }
      );
    }

    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return NextResponse.json({ success: false, message: "Skill not found or already deleted." }, { status: 404 });
    }

    try {
      revalidatePath("/");
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, message: "Skill deleted successfully." });
  } catch (error: any) {
    console.error("[Admin Skill DELETE Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to delete skill." }, { status: 500 });
  }
}

