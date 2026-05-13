import { NextRequest } from "next/server";
import crypto from "crypto";
import { auth } from "../../../../auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, credits } =
    await req.json() as {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      credits: number;
    };

  // ── Verify signature ─────────────────────────────────────────────────────
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return Response.json({ error: "SIGNATURE_MISMATCH" }, { status: 400 });
  }

  // ── Top up credits in Supabase ───────────────────────────────────────────
  // Fetch current credits first
  const { data: user } = await supabase
    .from("users")
    .select("credits")
    .eq("email", session.user.email)
    .single();

  const currentCredits = user?.credits ?? 0;
  const newCredits = currentCredits + credits;

  const { error } = await supabase
    .from("users")
    .update({ credits: newCredits, updated_at: new Date().toISOString() })
    .eq("email", session.user.email);

  if (error) {
    console.error("[verify-payment] supabase error:", error);
    return Response.json({ error: "DB_UPDATE_FAILED" }, { status: 500 });
  }

  return Response.json({ success: true, newCredits });
}
