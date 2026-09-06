import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";
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
    return NextResponse.json({ success: false, message: "Invalid testimonial ID." }, { status: 400 });
  }

  try {
    const data = await req.json();
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to update testimonial." },
        { status: 503 }
      );
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        $set: {
          ...data,
          displayOrder: Number(data.displayOrder) || 0,
          published: data.published !== false,
        },
      },
      { new: true }
    );

    if (!testimonial) {
      return NextResponse.json({ success: false, message: "Testimonial not found." }, { status: 404 });
    }

    try {
      revalidatePath("/");
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, testimonial });
  } catch (error: any) {
    console.error("[Admin Testimonial PUT Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to update testimonial." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: "Invalid testimonial ID." }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed. Unable to delete testimonial." },
        { status: 503 }
      );
    }

    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      return NextResponse.json({ success: false, message: "Testimonial not found or already deleted." }, { status: 404 });
    }

    try {
      revalidatePath("/");
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, message: "Testimonial deleted successfully." });
  } catch (error: any) {
    console.error("[Admin Testimonial DELETE Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to delete testimonial." }, { status: 500 });
  }
}

