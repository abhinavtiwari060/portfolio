import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Skill } from "@/models/Skill";
import { getAdminSession } from "@/lib/auth/session";
import { initialSkills } from "@/lib/mongodb/seedData";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, skills: initialSkills });
    }

    const skills = await Skill.find().sort({ category: 1, displayOrder: 1 });
    return NextResponse.json({ success: true, skills });
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

    if (!data.name || !data.category) {
      return NextResponse.json(
        { success: false, message: "Name and category are required." },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    if (db) {
      const skill = await Skill.create(data);
      return NextResponse.json({ success: true, skill });
    }

    return NextResponse.json({ success: true, skill: { ...data, _id: "dev-temp-id" } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
