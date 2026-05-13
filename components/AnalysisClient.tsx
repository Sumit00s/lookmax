"use client";
import { useState } from "react";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { UploadSection } from "./UploadSection";
import { ResultsPanel } from "./ResultsPanel";
import { BlurredPlaceholder } from "./BlurredPlaceholder";
import { AnalysisResult } from "./types";

type AppState = "idle" | "analyzing" | "done" | "error";

export function AnalysisClient() {
  const { data: session } = useSession();
  const [appState, setAppState] = useState<AppState>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  // Keep a ref to the raw File so we can upload it after analysis
  const pendingFileRef = React.useRef<File | null>(null);

  // Silently upload photo to Supabase Storage (fire-and-forget)
  const uploadPhotoToStorage = async (file: File) => {
    try {
      const fd = new FormData();
      fd.append("image", file);
      await fetch("/api/upload-photo", { method: "POST", body: fd });
    } catch {
      // Non-critical — don't surface storage errors to the user
    }
  };

  // Analysis always runs — no auth gate before upload
  const handleAnalyze = async (file: File, previewUrl: string) => {
    pendingFileRef.current = file;
    setAppState("analyzing");
    setErrorMsg(null);
    setResult(null);
    setImageUrl(previewUrl);
    setRevealed(false);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/analyze", { method: "POST", body: formData });

      let data: Record<string, unknown>;
      try {
        data = await res.json();
      } catch {
        setErrorMsg("Received an unexpected response. Please try again.");
        setAppState("error");
        return;
      }

      if (!res.ok || (data.error && data.error !== null)) {
        setErrorMsg(
          typeof data.message === "string"
            ? data.message
            : "Something went wrong. Please try again."
        );
        setAppState("error");
        return;
      }

      setResult(data as unknown as AnalysisResult);
      setAppState("done");
      setTimeout(() => setRevealed(true), 100);
      // Upload photo to Supabase in the background (only if logged in)
      if (session?.user?.email && pendingFileRef.current) {
        uploadPhotoToStorage(pendingFileRef.current);
      }
    } catch {
      setErrorMsg("A network error occurred. Please check your connection and try again.");
      setAppState("error");
    }
  };

  const handleReset = () => {
    setAppState("idle");
    setResult(null);
    setImageUrl(null);
    setErrorMsg(null);
    setRevealed(false);
  };

  const handleDownload = () => window.print();

  const isAnalyzing = appState === "analyzing";
  const isLoggedIn = !!session;

  return (
    <>
      {/* ── Analyzing spinner ── */}
      {isAnalyzing && imageUrl && (
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-10">
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-800 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Analyzing" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-2 border-white/20" />
                <div className="absolute inset-0 rounded-full border-2 border-t-white animate-spin" />
              </div>
              <p className="text-white text-sm font-semibold">Analyzing your facial aesthetics…</p>
              <p className="text-white/60 text-xs">Running 12 detailed measurements</p>
            </div>
          </div>
          <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-center h-full">
            <h3 className="text-[0.65rem] sm:text-xs font-bold tracking-[0.15em] text-gray-700 dark:text-gray-300 uppercase mb-4 sm:mb-6">What You&apos;ll Get</h3>
            <ul className="space-y-3 mb-6">
              {["Overall attractiveness score & label", "12 detailed facial metrics scored individually", "Photogenic potential rating", "Top strengths & actionable improvement tips", "Professional photo presentation notes"].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[0.75rem] sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                  <span className="mt-0.5 text-gray-400 dark:text-gray-500 shrink-0">✦</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── Error banner ── */}
      {appState === "error" && (
        <div className="mb-6 p-5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-1">Analysis Failed</p>
            <p className="text-xs text-red-600 dark:text-red-500">{errorMsg}</p>
          </div>
          <button onClick={handleReset} className="shrink-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition-colors">
            Try Again
          </button>
        </div>
      )}

      {/* ── Idle: upload box ── */}
      {!isAnalyzing && appState !== "done" && (
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-10">
          <UploadSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-center h-full">
            <h3 className="text-[0.65rem] sm:text-xs font-bold tracking-[0.15em] text-gray-700 dark:text-gray-300 uppercase mb-4 sm:mb-6">What You&apos;ll Get</h3>
            <ul className="space-y-3 mb-6">
              {["Overall attractiveness score & label", "12 detailed facial metrics scored individually", "Photogenic potential rating", "Top strengths & actionable improvement tips", "Professional photo presentation notes"].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[0.75rem] sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                  <span className="mt-0.5 text-gray-400 dark:text-gray-500 shrink-0">✦</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-[0.6rem] text-gray-400 dark:text-gray-600 font-medium uppercase tracking-wide leading-relaxed">
                Lookmax Facial Analysis · Private &amp; secure · No data stored
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Done: action bar (only shown when logged in) ── */}
      {appState === "done" && result && isLoggedIn && (
        <div className="print-hide flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Analysis complete</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 text-xs font-semibold rounded-xl transition-all border border-gray-900 dark:border-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Report
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl transition-colors border border-gray-200 dark:border-gray-700"
            >
              ↺ Analyze Another Photo
            </button>
          </div>
        </div>
      )}

      {/* ── Results area ── */}
      {appState === "done" && result && imageUrl ? (
        <div className="relative">
          {/* Results — always rendered but blurred when not logged in */}
          <div
            id="report-content"
            className={`transition-all duration-700 ${!isLoggedIn ? "blur-[6px] pointer-events-none select-none" : ""
              } ${revealed ? "opacity-100" : "opacity-0"}`}
          >
            <ResultsPanel result={result} imageUrl={imageUrl} revealed={revealed} />
          </div>

          {/* ── Minimal Auth Wall with Face Scan ── */}
          {!isLoggedIn && (
            <div
              className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-4"
              style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
            >
              {/* Face scan widget */}
              <div className="relative mb-10" style={{ width: 140, height: 140 }}>

                {/* Corner brackets */}
                <div style={{ position:"absolute", top:0, left:0, width:22, height:22, borderTop:"1.5px solid rgba(255,255,255,0.65)", borderLeft:"1.5px solid rgba(255,255,255,0.65)" }} />
                <div style={{ position:"absolute", top:0, right:0, width:22, height:22, borderTop:"1.5px solid rgba(255,255,255,0.65)", borderRight:"1.5px solid rgba(255,255,255,0.65)" }} />
                <div style={{ position:"absolute", bottom:0, left:0, width:22, height:22, borderBottom:"1.5px solid rgba(255,255,255,0.65)", borderLeft:"1.5px solid rgba(255,255,255,0.65)" }} />
                <div style={{ position:"absolute", bottom:0, right:0, width:22, height:22, borderBottom:"1.5px solid rgba(255,255,255,0.65)", borderRight:"1.5px solid rgba(255,255,255,0.65)" }} />

                {/* Face SVG outline */}
                <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg"
                  style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
                  <ellipse cx="70" cy="62" rx="30" ry="36" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                  <path d="M55 96 Q52 106 46 112 M85 96 Q88 106 94 112" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M40 60 Q36 66 40 73" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M100 60 Q104 66 100 73" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M62 84 Q70 89 78 84" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
                  <line x1="70" y1="14" x2="70" y2="126" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                  <line x1="14" y1="70" x2="126" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                  <circle cx="70" cy="70" r="1.5" fill="rgba(255,255,255,0.5)" />
                </svg>

                {/* Scan line */}
                <div style={{
                  position:"absolute", left:0, right:0, height:1,
                  background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.7) 30%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 70%, transparent)",
                  animation:"lmscan 2.2s ease-in-out infinite",
                  boxShadow:"0 0 6px rgba(255,255,255,0.5)",
                }} />
              </div>

              {/* Text */}
              <div className="text-center mb-8">
                <h2
                  className="text-2xl sm:text-3xl font-black text-white mb-2.5 tracking-tight leading-snug"
                  style={{ fontFamily:"var(--font-bodoni), 'Bodoni Moda', Georgia, serif" }}
                >
                  Hot people login first<br />to see result 🔥
                </h2>
                <p className="text-xs text-white/35 font-medium tracking-widest uppercase">
                  Sign in to unlock your full report
                </p>
              </div>

              {/* Google button */}
              <button
                onClick={() => signIn("google", { callbackUrl:"/" })}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm text-gray-900 bg-white hover:bg-white/90 transition-all active:scale-[0.97] shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              {/* Try another */}
              <button
                onClick={handleReset}
                className="mt-5 text-[0.68rem] text-white/20 hover:text-white/45 transition-colors tracking-wide"
              >
                ↺ Try a different photo
              </button>

              <style>{`
                @keyframes lmscan {
                  0%   { top: 10px;  opacity: 0; }
                  6%   { opacity: 1; }
                  94%  { opacity: 1; }
                  100% { top: 130px; opacity: 0; }
                }
              `}</style>
            </div>
          )}
        </div>
      ) : (
        !isAnalyzing && <BlurredPlaceholder />
      )}
    </>
  );
}
