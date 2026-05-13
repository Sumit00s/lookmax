"use client";

import { useState, useEffect } from "react";

interface PricingModalProps {
  onClose: () => void;
  onSuccess: (newCredits: number) => void;
  reason?: "no_credits" | "buy_more";
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

const PLANS = [
  {
    id: "basic" as const,
    credits: 1,
    price: "₹1",
    label: "Starter",
    sublabel: "1 Credit",
    perCredit: "₹1 / credit",
    badge: null,
    highlight: false,
  },
  {
    id: "value" as const,
    credits: 10,
    price: "₹9",
    label: "Value Pack",
    sublabel: "10 Credits",
    perCredit: "₹0.90 / credit",
    badge: "Save 10%",
    highlight: true,
  },
];

export function PricingModal({ onClose, onSuccess, reason = "buy_more" }: PricingModalProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [sdkReady, setSdkReady] = useState(false);

  // Load Razorpay SDK
  useEffect(() => {
    if (typeof window.Razorpay !== "undefined") {
      setSdkReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);
  }, []);

  const handlePurchase = async (planId: "basic" | "value") => {
    if (!sdkReady) return;
    setLoading(planId);

    try {
      // 1. Create order on server
      const orderRes = await fetch("/api/credits/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const order = await orderRes.json() as {
        orderId: string;
        amount: number;
        currency: string;
        keyId: string;
        credits: number;
        label: string;
        error?: string;
      };

      if (order.error) {
        alert("Failed to create order. Please try again.");
        setLoading(null);
        return;
      }

      // 2. Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Lookmax",
        description: `${order.label} — Facial Analysis Credits`,
        order_id: order.orderId,
        theme: { color: "#111111" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          // 3. Verify payment and top up credits
          const verifyRes = await fetch("/api/credits/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              credits: order.credits,
            }),
          });
          const result = await verifyRes.json() as { success: boolean; newCredits: number; error?: string };

          if (result.success) {
            onSuccess(result.newCredits);
          } else {
            alert("Payment verified but credit update failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => setLoading(null),
        },
      });

      rzp.open();
    } catch (e) {
      console.error("[purchase]", e);
      alert("Something went wrong. Please try again.");
      setLoading(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.80)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md bg-[#faf9f6] dark:bg-[#18181b] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-lg"
          >
            ✕
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-lg font-bold shadow-lg">
              ✦
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                {reason === "no_credits" ? "Out of Credits" : "Buy Credits"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {reason === "no_credits"
                  ? "Top up to generate more reports"
                  : "1 credit = 1 facial analysis report"}
              </p>
            </div>
          </div>
          {reason === "no_credits" && (
            <p className="text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2.5 font-medium">
              You&apos;ve used all your credits. Buy more below to continue.
            </p>
          )}
        </div>

        {/* Plans */}
        <div className="px-8 py-6 space-y-3">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => handlePurchase(plan.id)}
              disabled={loading !== null || !sdkReady}
              className={`w-full relative flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all duration-200 group
                ${plan.highlight
                  ? "border-gray-900 dark:border-gray-100 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500"
                }
                ${loading !== null ? "opacity-60 cursor-not-allowed" : "cursor-pointer active:scale-[0.98]"}
              `}
            >
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-black text-base">{plan.label}</span>
                  {plan.badge && (
                    <span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full
                      ${plan.highlight
                        ? "bg-white/20 text-white dark:bg-gray-900/20 dark:text-gray-900"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      }`}>
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className={`text-xs mt-0.5 font-medium ${plan.highlight ? "text-white/70 dark:text-gray-900/60" : "text-gray-500 dark:text-gray-400"}`}>
                  {plan.sublabel} · {plan.perCredit}
                </p>
              </div>
              <div className="text-right">
                {loading === plan.id ? (
                  <div className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  <>
                    <span className="font-black text-2xl">{plan.price}</span>
                    <p className={`text-[0.6rem] font-bold mt-0.5 ${plan.highlight ? "text-white/60 dark:text-gray-900/50" : "text-gray-400"}`}>
                      INR
                    </p>
                  </>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-[0.6rem] text-gray-400 dark:text-gray-600 font-medium uppercase tracking-wide">
            Secured by Razorpay · Test Mode Active
          </p>
        </div>
      </div>
    </div>
  );
}
