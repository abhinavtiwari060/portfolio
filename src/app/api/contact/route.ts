import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { ContactMessage } from "@/models/ContactMessage";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, honeypot } = await req.json();

    // Honeypot spam check
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Message submitted successfully." });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please provide your name, email, and message." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    if (db) {
      await ContactMessage.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        read: false,
      });
    } else {
      console.log("[Dev Contact Fallback] Received message from:", name, email);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been received.",
    });
  } catch (error: any) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { success: false, message: "Unable to send message at this time." },
      { status: 500 }
    );
  }
}
