import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Profile } from "@/models/Profile";
import { getAdminSession } from "@/lib/auth/session";
import { initialProfile } from "@/lib/mongodb/seedData";

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, profile: initialProfile });
    }

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(initialProfile);
    }

    return NextResponse.json({ success: true, profile });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const db = await connectToDatabase();

    if (db) {
      const updated = await Profile.findOneAndUpdate({}, { $set: data }, { new: true, upsert: true });
      return NextResponse.json({ success: true, profile: updated });
    }

    return NextResponse.json({ success: true, profile: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
