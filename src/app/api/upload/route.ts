import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If Cloudinary configured, upload to Cloudinary
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      try {
        const result = await uploadToCloudinary(buffer, "portfolio");
        return NextResponse.json({
          success: true,
          url: result.url,
          publicId: result.publicId,
        });
      } catch (uploadError: any) {
        console.warn("[Cloudinary Upload Error]", uploadError.message);
      }
    }

    // Fallback for local development when Cloudinary keys are not yet provided:
    // Convert to high-efficiency data URI for immediate instant local previews
    const mimeType = file.type || "image/jpeg";
    const base64Data = buffer.toString("base64");
    const dataUri = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({
      success: true,
      url: dataUri,
      message: "Uploaded as development data URI (configure Cloudinary for production).",
    });
  } catch (error: any) {
    console.error("[Upload Error]", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload file." },
      { status: 500 }
    );
  }
}
