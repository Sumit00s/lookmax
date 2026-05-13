"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";
import { Moon, Sun } from "lucide-react";
import { PricingModal } from "./PricingModal";

export function Header() {
  const { setTheme, theme } = useTheme();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [showPricing, setShowPricing] = React.useState(false);
  const [credits, setCredits] = React.useState<number | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch credits whenever user logs in
  React.useEffect(() => {
    if (!session?.user?.email) {
      setCredits(null);
      return;
    }
    fetchCredits();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email]);

  const fetchCredits = async () => {
    try {
      const res = await fetch("/api/credits/get");
      if (res.ok) {
        const data = await res.json() as { credits: number };
        setCredits(data.credits);
      }
    } catch {
      // silently ignore
    }
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Listen for credit refresh events from AnalysisClient
  React.useEffect(() => {
    const handler = (e: CustomEvent<{ credits: number }>) => {
      setCredits(e.detail.credits);
    };
    window.addEventListener("credits-updated", handler as EventListener);
    return () => window.removeEventListener("credits-updated", handler as EventListener);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-[#faf9f6] dark:bg-[#1a1a1a] transition-colors duration-200">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">

          {/* Logo */}
          <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-gray-100">
            Lookmax
          </span>

          <div className="flex items-center gap-3">

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            {/* ── Auth: loading skeleton ── */}
            {status === "loading" && (
              <div className="h-9 w-24 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            )}

            {/* ── Auth: NOT logged in → Sign In ── */}
            {status !== "loading" && !session && (
              <button
                onClick={() => signIn("google")}
                id="signin-btn"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold hover:opacity-85 transition-all active:scale-[0.97] shadow-sm"
              >
                {/* Google G logo */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign In
              </button>
            )}

            {/* ── Auth: logged in → credits badge + avatar + dropdown ── */}
            {status !== "loading" && session && (
              <>
                {/* Credits badge + buy button */}
                {credits !== null && (
                  <button
                    onClick={() => setShowPricing(true)}
                    id="credits-btn"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-amber-400 dark:hover:border-amber-500 transition-all group"
                    title="Buy more credits"
                  >
                    <span className="text-amber-500 text-sm">✦</span>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      {credits}
                    </span>
                    <span className="text-[0.6rem] font-semibold text-gray-400 dark:text-gray-600 hidden sm:block">
                      credits
                    </span>
                    <span className="text-[0.55rem] font-bold text-amber-500 border border-amber-300 dark:border-amber-700 rounded-full px-1.5 py-0.5 ml-1 opacity-70 group-hover:opacity-100 transition-opacity hidden sm:block">
                      + Buy
                    </span>
                  </button>
                )}

                <div className="relative" ref={dropdownRef}>
                  <button
                    id="user-menu-btn"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {session.user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={session.user.image}
                        alt={session.user.name ?? "User"}
                        className="h-7 w-7 rounded-full object-cover ring-2 ring-violet-400/30"
                      />
                    ) : (
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                        {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                      </div>
                    )}
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 max-w-[80px] truncate hidden sm:block">
                      {session.user?.name?.split(" ")[0]}
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#faf9f6] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden animate-fade-in">
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
                        {session.user?.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={session.user.image} alt="" className="h-8 w-8 rounded-full shrink-0" />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">{session.user?.name}</p>
                          <p className="text-[0.62rem] text-gray-400 dark:text-gray-500 truncate">{session.user?.email}</p>
                        </div>
                      </div>

                      {/* Credits inside dropdown */}
                      {credits !== null && (
                        <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="text-amber-500 text-sm">✦</span>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{credits} credits</span>
                          </div>
                          <button
                            onClick={() => { setDropdownOpen(false); setShowPricing(true); }}
                            className="text-[0.6rem] font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors"
                          >
                            Buy More →
                          </button>
                        </div>
                      )}

                      {/* Sign out */}
                      <button
                        id="signout-btn"
                        onClick={() => { setDropdownOpen(false); signOut({ callbackUrl: "/" }); }}
                        className="w-full text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors flex items-center gap-2.5"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.15s ease forwards; }
        `}</style>
      </header>

      {/* Pricing Modal */}
      {showPricing && (
        <PricingModal
          reason="buy_more"
          onClose={() => setShowPricing(false)}
          onSuccess={(newCredits) => {
            setCredits(newCredits);
            setShowPricing(false);
            // Also notify AnalysisClient
            window.dispatchEvent(new CustomEvent("credits-updated", { detail: { credits: newCredits } }));
          }}
        />
      )}
    </>
  );
}
