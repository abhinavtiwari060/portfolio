import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import { hashPassword, verifyPassword, signSessionToken, setSessionCookie } from "@/lib/auth/session";

const REQUIRED_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "abhitiwariaj@gmail.com").toLowerCase().trim();
const REQUIRED_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "abhi@1234#tiwari";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const isRequiredAdmin =
      normalizedEmail === REQUIRED_ADMIN_EMAIL && password === REQUIRED_ADMIN_PASSWORD;

    // Try database authentication first
    try {
      const db = await connectToDatabase();
      if (db) {
        let admin = await Admin.findOne({ email: normalizedEmail });

        // If logging in with the required admin credentials for the first time and not in DB, create it
        if (!admin && isRequiredAdmin) {
          try {
            const passwordHash = await hashPassword(REQUIRED_ADMIN_PASSWORD);
            admin = await Admin.create({
              email: REQUIRED_ADMIN_EMAIL,
              passwordHash,
              role: "admin",
            });
          } catch (seedErr) {
            console.warn("Could not insert admin to DB:", seedErr);
          }
        }

        if (admin) {
          const isValid = await verifyPassword(password, admin.passwordHash);
          if (isValid || isRequiredAdmin) {
            const token = await signSessionToken({
              userId: admin._id ? admin._id.toString() : "admin-root-id",
              email: admin.email,
              role: admin.role || "admin",
            });

            const response = NextResponse.json({
              success: true,
              message: "Login successful.",
              user: { email: admin.email, role: admin.role || "admin" },
            });

            setSessionCookie(response, token);
            return response;
          }
        }
      }
    } catch (dbErr) {
      console.warn("[Login DB Warning - proceeding with credential fallback]", dbErr);
    }

    // Direct fallback if database is temporarily offline or DNS unresolved
    if (isRequiredAdmin) {
      const token = await signSessionToken({
        userId: "admin-root-id",
        email: REQUIRED_ADMIN_EMAIL,
        role: "admin",
      });

      const response = NextResponse.json({
        success: true,
        message: "Login successful.",
        user: { email: REQUIRED_ADMIN_EMAIL, role: "admin" },
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
      { success: false, message: "An error occurred during authentication." },
      { status: 500 }
    );
  }
}
