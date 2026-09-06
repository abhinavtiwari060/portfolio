import { NextRequest, NextResponse } from "next/server";
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

  try {
    const data = await req.json();
    const db = await connectToDatabase();

    if (db) {
      const skill = await Skill.findByIdAndUpdate(params.id, { $set: data }, { new: true });
      return NextResponse.json({ success: true, skill });
    }

    return NextResponse.json({ success: true, skill: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();
    if (db) {
      await Skill.findByIdAndDelete(params.id);
    }
    return NextResponse.json({ success: true, message: "Skill deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
