import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import { ContactMessage } from "@/models/ContactMessage";
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
    return NextResponse.json({ success: false, message: "Invalid message ID." }, { status: 400 });
  }

  try {
    const data = await req.json();
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to update message." },
        { status: 503 }
      );
    }

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { $set: { read: !!data.read } },
      { new: true }
    );

    if (!message) {
      return NextResponse.json({ success: false, message: "Message not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    console.error("[Admin Message PUT Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to update message." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: "Invalid message ID." }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to delete message." },
        { status: 503 }
      );
    }

    const message = await ContactMessage.findByIdAndDelete(id);
    if (!message) {
      return NextResponse.json({ success: false, message: "Message not found or already deleted." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Message deleted successfully." });
  } catch (error: any) {
    console.error("[Admin Message DELETE Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to delete message." }, { status: 500 });
  }
}

