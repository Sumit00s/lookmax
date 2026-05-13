import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

// Use service-role key server-side so RLS doesn't block uploads
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BUCKET = "lookmax_photos";
const FOLDER = "Photos";

export async function POST(req: NextRequest) {
  // 1. Verify the user is authenticated
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json(
      { error: "UNAUTHORIZED", message: "You must be signed in to upload photos." },
      { status: 401 }
    );
  }

  const email = session.user.email;

  // 2. Parse the multipart form
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return Response.json(
      { error: "BAD_REQUEST", message: "Invalid form data." },
      { status: 400 }
    );
  }

  const file = formData.get("image") as File | null;
  if (!file) {
    return Response.json(
      { error: "NO_IMAGE", message: "No image file provided." },
      { status: 400 }
    );
  }

  // 3. Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
  if (!allowedTypes.includes(file.type)) {
    return Response.json(
      { error: "INVALID_TYPE", message: "Please upload a JPG, PNG, or WebP image." },
      { status: 400 }
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return Response.json(
      { error: "FILE_TOO_LARGE", message: "Image must be under 5MB." },
      { status: 400 }
    );
  }

  // 4. Build a unique file path: Photos/<sanitised-email>_<timestamp>.<ext>
  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const sanitisedEmail = email.replace(/[^a-zA-Z0-9._-]/g, "_");
  const timestamp = Date.now();
  const filePath = `${FOLDER}/${sanitisedEmail}_${timestamp}.${ext}`;

  // 5. Upload to Supabase Storage
  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(filePath, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("[upload-photo] Supabase upload error:", uploadError);
    return Response.json(
      { error: "UPLOAD_FAILED", message: uploadError.message },
      { status: 500 }
    );
  }

  // 6. Return the public URL
  const { data: urlData } = supabaseAdmin.storage
    .from(BUCKET)
    .getPublicUrl(filePath);

  return Response.json({ success: true, path: filePath, url: urlData.publicUrl });
}
