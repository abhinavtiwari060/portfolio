import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";
import { getAdminSession } from "@/lib/auth/session";
import { initialTestimonials } from "@/lib/mongodb/seedData";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: true, testimonials: initialTestimonials });
    }

    const testimonials = await Testimonial.find().sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json({ success: true, testimonials });
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

    if (!data.name || !data.testimonialText) {
      return NextResponse.json(
        { success: false, message: "Name and testimonial text are required." },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    if (db) {
      const testimonial = await Testimonial.create(data);
      return NextResponse.json({ success: true, testimonial });
    }

    return NextResponse.json({ success: true, testimonial: { ...data, _id: "dev-temp-id" } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
