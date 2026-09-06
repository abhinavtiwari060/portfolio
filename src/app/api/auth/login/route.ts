import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import { hashPassword, verifyPassword, signSessionToken, setSessionCookie } from "@/lib/auth/session";

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@abhinav.dev";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@Chai123";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if database is connected
    const db = await connectToDatabase();

    if (db) {
      // Find or bootstrap default admin
      let admin = await Admin.findOne({ email: normalizedEmail });

      if (!admin && normalizedEmail === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
        const passwordHash = await hashPassword(DEFAULT_ADMIN_PASSWORD);
        admin = await Admin.create({
          email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
          passwordHash,
          role: "admin",
        });
      }

      if (admin) {
        const isValid = await verifyPassword(password, admin.passwordHash);
        if (!isValid) {
          return NextResponse.json(
            { success: false, message: "Invalid email or password." },
            { status: 401 }
          );
        }

        const token = await signSessionToken({
          userId: admin._id.toString(),
          email: admin.email,
          role: admin.role,
        });

        const response = NextResponse.json({
          success: true,
          message: "Login successful.",
          user: { email: admin.email, role: admin.role },
        });

        setSessionCookie(response, token);
        return response;
      }
    }

    // Dev fallback if MongoDB is not running locally
    if (
      normalizedEmail === DEFAULT_ADMIN_EMAIL.toLowerCase() &&
      password === DEFAULT_ADMIN_PASSWORD
    ) {
      const token = await signSessionToken({
        userId: "dev-admin-id",
        email: DEFAULT_ADMIN_EMAIL,
        role: "admin",
      });

      const response = NextResponse.json({
        success: true,
        message: "Login successful (Dev Session).",
        user: { email: DEFAULT_ADMIN_EMAIL, role: "admin" },
      });

      setSessionCookie(response, token);
      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid email or password." },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("[Login Error]", error);
    return NextResponse.json(
      { success: false, message: "An unexpected authentication error occurred." },
      { status: 500 }
    );
  }
}
