import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import { Profile } from "@/models/Profile";
import { getAdminSession } from "@/lib/auth/session";
import { initialProfile } from "@/lib/mongodb/seedData";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to fetch profile." },
        { status: 503 }
      );
    }

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(initialProfile);
    }

    return NextResponse.json({ success: true, profile });
  } catch (error: any) {
    console.error("[Admin Profile GET Error]", error);
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
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to save profile." },
        { status: 503 }
      );
    }

    const updated = await Profile.findOneAndUpdate(
      {},
      { $set: data },
      { new: true, upsert: true }
    );

    try {
      revalidatePath("/");
      revalidatePath("/projects");
      revalidatePath("/articles");
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, profile: updated });
  } catch (error: any) {
    console.error("[Admin Profile PUT Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to save profile." }, { status: 500 });
  }
}

