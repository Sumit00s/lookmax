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
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${dragOver ? "bg-violet-100 dark:bg-violet-900/40" : "bg-gray-100 dark:bg-gray-800"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8 transition-colors duration-300 ${dragOver ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div className="text-center px-6">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {dragOver ? "Drop your photo here" : "Upload your photo"}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Drag &amp; drop or click to browse</p>
              <p className="text-[0.65rem] text-gray-400 dark:text-gray-600 mt-2">JPG, PNG, WebP · Max 5MB · Front-facing, well-lit</p>
            </div>
            <div className="px-5 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold tracking-wide hover:opacity-80 transition-opacity">
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
