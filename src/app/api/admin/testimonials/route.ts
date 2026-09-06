import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";
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
        { success: false, message: "Database connection failed. Unable to fetch testimonials." },
        { status: 503 }
      );
    }

    const testimonials = await Testimonial.find().sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json({ success: true, testimonials });
  } catch (error: any) {
    console.error("[Admin Testimonials GET Error]", error);
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

    if (!data.name?.trim() || !data.testimonialText?.trim()) {
      return NextResponse.json(
        { success: false, message: "Name and testimonial quote are required." },
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

    const testimonial = await Testimonial.create({
      ...data,
      name: data.name.trim(),
      testimonialText: data.testimonialText.trim(),
      published: data.published !== false,
      displayOrder: Number(data.displayOrder) || 0,
    });

    try {
      revalidatePath("/");
    } catch (revalErr) {
      console.warn("[Revalidation Warning]", revalErr);
    }

    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch (error: any) {
    console.error("[Admin Testimonials POST Error]", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to create testimonial." }, { status: 500 });
  }
}

