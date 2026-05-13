import { NextRequest } from "next/server";
import Razorpay from "razorpay";
import { auth } from "../../../../auth";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Pricing plans
export const PLANS = {
  basic: { credits: 1, amountPaise: 100, label: "1 Credit" },   // ₹1
  value: { credits: 10, amountPaise: 900, label: "10 Credits" }, // ₹9
};

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { planId } = await req.json() as { planId: "basic" | "value" };
  const plan = PLANS[planId];
  if (!plan) {
    return Response.json({ error: "INVALID_PLAN" }, { status: 400 });
  }

  try {
    const order = await razorpay.orders.create({
      amount: plan.amountPaise,
      currency: "INR",
      receipt: `lookmax_${Date.now()}`,
      notes: {
        email: session.user.email,
        planId,
        credits: String(plan.credits),
      },
    });

    return Response.json({
      orderId: order.id,
      amount: plan.amountPaise,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID,
      credits: plan.credits,
      label: plan.label,
    });
  } catch (err) {
    console.error("[create-order] error:", err);
    return Response.json({ error: "ORDER_FAILED" }, { status: 500 });
  }
}
