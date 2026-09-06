import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import { Skill } from "@/models/Skill";
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
        { success: false, message: "Database connection failed. Unable to fetch skills." },
        { status: 503 }
      );
    }

    const skills = await Skill.find().sort({ category: 1, displayOrder: 1 });
    return NextResponse.json({ success: true, skills });
  } catch (error: any) {
    console.error("[Admin Skills GET Error]", error);
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

    if (!data.name?.trim() || !data.category?.trim()) {
      return NextResponse.json(
        { success: false, message: "Name and category are required." },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection unavailable. Changes not saved." },
        { status: 503 }
      );
    }

    const skill = await Skill.create({
      name: data.name.trim(),
      category: data.category,
      icon: data.icon || "Code",
      proficiency: Number(data.proficiency) || 85,
      displayOrder: Number(data.displayOrder) || 0,
    });

    try {
      revalidatePath("/");
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, skill }, { status: 201 });
  } catch (error: any) {
    console.error("[Admin Skills POST Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to create skill." }, { status: 500 });
  }
}

