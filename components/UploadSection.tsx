"use client";
import { useRef, useState, useCallback } from "react";

interface UploadSectionProps {
  onAnalyze: (file: File, previewUrl: string) => void;
  isAnalyzing: boolean;
}

export function UploadSection({ onAnalyze, isAnalyzing }: UploadSectionProps) {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (file: File): string | null => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/heic"];
    if (!allowed.includes(file.type)) return "Please upload a JPG, PNG, or WebP image.";
    if (file.size > 5 * 1024 * 1024) return "Image must be under 5MB.";
    return null;
  };

  const handleFile = useCallback((file: File) => {
    const err = validate(file);
    if (err) { setError(err); return; }
    setError(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    // Auto-trigger analysis immediately on upload
    onAnalyze(file, url);
  }, [onAnalyze]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Fixed-height photo box — never grows beyond this */}
      <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1f]">
        {preview ? (
          /* Photo fills the box with object-cover — size NEVER changes */
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Your photo"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay to change photo */}
            {!isAnalyzing && (
              <div
                className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                onClick={() => inputRef.current?.click()}
              >
                <span className="px-4 py-2 bg-white/90 text-gray-900 rounded-full text-xs font-semibold">
                  Change Photo
                </span>
              </div>
            )}
          </>
        ) : (
          /* Upload drop zone */
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => !isAnalyzing && inputRef.current?.click()}
            className={`absolute inset-0 flex flex-col items-center justify-center gap-5 cursor-pointer select-none transition-all duration-300
              ${dragOver
                ? "border-violet-500 bg-violet-50 dark:bg-violet-950/20"
                : "hover:border-violet-400 hover:bg-violet-50/30 dark:hover:bg-violet-950/10"
              }`}
          >
            {/* ── Face scan background animation ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

              {/* Corner brackets */}
              <div style={{ position:"absolute", top:16, left:16, width:28, height:28, borderTop:"1.5px solid rgba(128,128,128,0.45)", borderLeft:"1.5px solid rgba(128,128,128,0.45)" }} />
              <div style={{ position:"absolute", top:16, right:16, width:28, height:28, borderTop:"1.5px solid rgba(128,128,128,0.45)", borderRight:"1.5px solid rgba(128,128,128,0.45)" }} />
              <div style={{ position:"absolute", bottom:16, left:16, width:28, height:28, borderBottom:"1.5px solid rgba(128,128,128,0.45)", borderLeft:"1.5px solid rgba(128,128,128,0.45)" }} />
              <div style={{ position:"absolute", bottom:16, right:16, width:28, height:28, borderBottom:"1.5px solid rgba(128,128,128,0.45)", borderRight:"1.5px solid rgba(128,128,128,0.45)" }} />

              {/* Face SVG — centered, large, fills most of the card */}
              <svg
                viewBox="0 0 200 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position:"absolute",
                  top:"50%", left:"50%",
                  transform:"translate(-50%, -50%)",
                  width:180, height:230,
                  opacity: 0.13,
                }}
              >
                {/* Head oval */}
                <ellipse cx="100" cy="100" rx="58" ry="72" stroke="currentColor" strokeWidth="1.5" />
                {/* Neck */}
                <path d="M76 168 Q72 190 62 204 M124 168 Q128 190 138 204" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Left ear */}
                <path d="M42 94 Q34 106 42 118" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Right ear */}
                <path d="M158 94 Q166 106 158 118" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Lips */}
                <path d="M84 142 Q100 150 116 142" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                {/* Nose */}
                <path d="M100 116 L100 134" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                {/* Crosshair V */}
                <line x1="100" y1="10" x2="100" y2="250" stroke="currentColor" strokeWidth="0.8" />
                {/* Crosshair H */}
                <line x1="10" y1="130" x2="190" y2="130" stroke="currentColor" strokeWidth="0.8" />
                {/* Centre dot */}
                <circle cx="100" cy="130" r="2.5" fill="currentColor" />
              </svg>

              {/* Scan line — sweeps full card height */}
              <div style={{
                position:"absolute", left:0, right:0, height:1,
                background:"linear-gradient(90deg, transparent, rgba(120,120,120,0.6) 30%, rgba(160,160,160,0.9) 50%, rgba(120,120,120,0.6) 70%, transparent)",
                animation:"uploadscan 3s ease-in-out infinite",
                boxShadow:"0 0 8px rgba(160,160,160,0.3)",
              }} />

              <style>{`
                @keyframes uploadscan {
                  0%   { top: 16px;  opacity: 0; }
                  5%   { opacity: 1; }
                  95%  { opacity: 1; }
                  100% { top: calc(100% - 16px); opacity: 0; }
                }
              `}</style>
            </div>



            <div className="relative z-10 text-center px-6">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {dragOver ? "Drop your photo here" : "Upload your photo"}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Drag &amp; drop or click to browse</p>
              <p className="text-[0.65rem] text-gray-400 dark:text-gray-600 mt-2">JPG, PNG, WebP · Max 5MB · Front-facing, well-lit</p>
            </div>
            <div className="relative z-10 px-5 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold tracking-wide hover:opacity-80 transition-opacity">
              Choose Photo
            </div>
          </div>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/heic" className="hidden" onChange={onInputChange} />

      {error && (
        <div className="mt-3 px-4 py-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-600 dark:text-red-400 font-medium">
          {error}
        </div>
      )}
    </div>
  );
}
