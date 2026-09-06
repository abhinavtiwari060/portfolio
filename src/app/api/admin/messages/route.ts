import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { ContactMessage } from "@/models/ContactMessage";
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
        { success: false, message: "Database connection failed. Unable to fetch messages." },
        { status: 503 }
      );
    }

    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    console.error("[Admin Messages GET Error]", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

