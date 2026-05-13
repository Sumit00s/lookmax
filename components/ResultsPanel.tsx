"use client";
import { GiNoseFront, GiLips, GiComb } from "react-icons/gi";
import { FaRegEye } from "react-icons/fa";
import { MdDiamond, MdOutlineWaterDrop } from "react-icons/md";
import { AnalysisResult } from "./types";

// --- Icon Components ---
const IconScales = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
  </svg>
);
const IconFace = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M5 8v5a7 7 0 0 0 14 0V8a7 7 0 0 0-14 0Z"/><path d="M12 21v-8"/><path d="M8 13h8"/>
  </svg>
);
const IconJawline = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M5 8v5a7 7 0 0 0 14 0V8"/>
  </svg>
);
const IconChin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M9 20c1 1 2 2 3 2s2-1 3-2"/>
  </svg>
);
const IconGrooming = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M5 4h14M7 4v16M17 4v16"/>
  </svg>
);
const IconSparkle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
  </svg>
);
export const IconCamera = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);
export const IconStar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
export const IconTrendingUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);
export const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const METRIC_META: { key: keyof AnalysisResult["metrics"]; label: string; icon: React.ReactNode }[] = [
  { key: "symmetry", label: "Symmetry", icon: <IconScales /> },
  { key: "facial_thirds", label: "Facial Thirds & Proportions", icon: <IconFace /> },
  { key: "eye_area", label: "Eye Area", icon: <FaRegEye className="w-7 h-7" /> },
  { key: "nose_harmony", label: "Nose Harmony", icon: <GiNoseFront className="w-7 h-7" /> },
  { key: "lip_proportions", label: "Lip Proportions", icon: <GiLips className="w-7 h-7" /> },
  { key: "jawline", label: "Jawline", icon: <IconJawline /> },
  { key: "chin", label: "Chin", icon: <IconChin /> },
  { key: "cheekbone_structure", label: "Cheekbone Structure", icon: <MdDiamond className="w-7 h-7" /> },
  { key: "skin_texture", label: "Skin Texture & Tone", icon: <MdOutlineWaterDrop className="w-7 h-7" /> },
  { key: "hairline", label: "Hairline & Hairstyle", icon: <GiComb className="w-7 h-7" /> },
  { key: "grooming", label: "Grooming", icon: <IconGrooming /> },
  { key: "overall_harmony", label: "Overall Facial Harmony", icon: <IconSparkle /> },
];

interface ResultsPanelProps {
  result: AnalysisResult;
  imageUrl: string;
  revealed: boolean;
}



export function ResultsPanel({ result, imageUrl, revealed }: ResultsPanelProps) {
  return (
    <div className={`transition-all duration-700 ${revealed ? "opacity-100" : "opacity-0"}`}>
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-10">
        {/* Image with annotations */}
        <div className="border border-gray-300 dark:border-gray-800 rounded-2xl h-[400px] sm:h-auto min-h-[400px] relative overflow-hidden shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Analysis Subject" className="w-full h-full object-cover absolute inset-0" />
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="5" y1="35" x2="95" y2="35" stroke="white" strokeWidth="0.5" strokeDasharray="2 2"/>
            <line x1="25" y1="65" x2="75" y2="65" stroke="white" strokeWidth="0.5" strokeDasharray="2 2"/>
            <line x1="30" y1="63" x2="30" y2="67" stroke="white" strokeWidth="0.5"/>
            <line x1="70" y1="63" x2="70" y2="67" stroke="white" strokeWidth="0.5"/>
            <line x1="30" y1="75" x2="70" y2="75" stroke="white" strokeWidth="0.5" strokeDasharray="2 2"/>
            <path d="M 25 45 Q 50 110 75 45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2"/>
          </svg>
          <div className="absolute inset-0 z-20 pointer-events-none p-3 sm:p-4">
            <div className="absolute top-[12%] left-3 sm:left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] leading-[1.2] tracking-wide border border-white/50 dark:border-white/10 shadow-sm">
              <span className="font-bold text-gray-800 dark:text-gray-200">UPPER THIRD</span><br/><span className="text-gray-500 dark:text-gray-400">(Forehead to<br/>brow line)</span>
            </div>
            <div className="absolute top-[45%] left-3 sm:left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] leading-[1.2] tracking-wide border border-white/50 dark:border-white/10 shadow-sm">
              <span className="font-bold text-gray-800 dark:text-gray-200">MIDDLE THIRD</span><br/><span className="text-gray-500 dark:text-gray-400">(Brow line to<br/>base of nose)</span>
            </div>
            <div className="absolute top-[78%] left-3 sm:left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] leading-[1.2] tracking-wide border border-white/50 dark:border-white/10 shadow-sm">
              <span className="font-bold text-gray-800 dark:text-gray-200">LOWER THIRD</span><br/><span className="text-gray-500 dark:text-gray-400">(Base of nose to<br/>chin)</span>
            </div>
            <div className="absolute top-[33.5%] right-3 sm:right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] font-bold text-gray-800 dark:text-gray-200 tracking-wider border border-white/50 dark:border-white/10 shadow-sm">EYE LINE</div>
            <div className="absolute top-[63.5%] right-3 sm:right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] font-bold text-gray-800 dark:text-gray-200 tracking-wider border border-white/50 dark:border-white/10 shadow-sm">NOSE WIDTH</div>
            <div className="absolute top-[73.5%] right-3 sm:right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] font-bold text-gray-800 dark:text-gray-200 tracking-wider border border-white/50 dark:border-white/10 shadow-sm">LIP LINE</div>
            <div className="absolute top-[86%] right-3 sm:right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] font-bold text-gray-800 dark:text-gray-200 tracking-wider leading-[1.2] text-right border border-white/50 dark:border-white/10 shadow-sm">CHIN CENTER<br/>&amp; JAW OUTLINE</div>
          </div>
        </div>

        {/* Score card */}
        <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-center h-full">
          <h3 className="text-[0.65rem] sm:text-xs font-bold tracking-[0.15em] text-gray-700 dark:text-gray-300 uppercase mb-4 sm:mb-6">Overall Attractiveness Potential</h3>
          <div className="flex flex-col items-start mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-6xl sm:text-7xl font-serif text-gray-900 dark:text-gray-100 leading-none tracking-tight">{result.overall_score.toFixed(1)}</span>
              <span className="text-xl sm:text-2xl text-gray-400 dark:text-gray-500 font-serif">/10</span>
            </div>
            <div className="flex items-center w-full max-w-[240px] gap-4">
              <div className="h-[1px] flex-1 bg-gray-300 dark:bg-gray-700"/>
              <div className="text-[0.65rem] sm:text-xs font-bold tracking-[0.2em] text-gray-600 dark:text-gray-400 uppercase">{result.rating_label}</div>
              <div className="h-[1px] flex-1 bg-gray-300 dark:bg-gray-700"/>
            </div>
          </div>
          <h4 className="text-[0.65rem] sm:text-xs font-bold tracking-wider text-gray-700 dark:text-gray-300 uppercase mb-3">Summary Assessment</h4>
          <p className="text-[0.75rem] sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{result.summary}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {METRIC_META.map((m) => {
          const metric = result.metrics[m.key];
          return (
            <div key={m.key} className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-4 flex flex-col">
              <div className="flex items-start gap-4 mb-3">
                <div className="mt-0.5 text-gray-600 dark:text-gray-400">{m.icon}</div>
                <div className="flex flex-col">
                  <span className="text-[0.6rem] font-bold tracking-wider text-gray-800 dark:text-gray-200 uppercase leading-[1.2] max-w-[120px]">{m.label}</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-[1.35rem] font-serif text-gray-900 dark:text-gray-100 leading-none">{metric.score.toFixed(1)}</span>
                    <span className="text-[0.65rem] text-gray-500 dark:text-gray-400 font-serif">/10</span>
                  </div>
                </div>
              </div>
              <p className="text-[0.65rem] sm:text-[0.7rem] text-gray-700 dark:text-gray-300 leading-relaxed font-medium mt-2">{metric.description}</p>
            </div>
          );
        })}
      </div>

      {/* Photogenic Potential */}
      <div className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-4 sm:p-5 flex flex-col md:flex-row items-center gap-4 sm:gap-6 mb-8">
        <div className="flex items-center gap-4 w-full md:w-auto md:min-w-[300px] flex-shrink-0">
          <div className="bg-gray-100 dark:bg-[#27272a] p-2.5 rounded-xl border border-gray-200 dark:border-gray-700">
            <IconCamera className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <div className="text-[0.6rem] sm:text-[0.65rem] font-bold tracking-wider text-gray-800 dark:text-gray-200 uppercase leading-[1.2] mb-1">Photogenic<br/>Potential</div>
          </div>
          <div className="flex items-baseline gap-1 ml-auto md:ml-4">
            <span className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-gray-100 leading-none tracking-tight">{result.photogenic_potential.score.toFixed(1)}</span>
            <span className="text-[0.65rem] sm:text-sm text-gray-500 dark:text-gray-400 font-serif">/10</span>
          </div>
        </div>
        <div className="hidden md:block w-[1px] h-12 bg-gray-300 dark:bg-gray-700 shrink-0"/>
        <p className="text-[0.7rem] sm:text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed w-full">{result.photogenic_potential.description}</p>
      </div>

      {/* Bottom 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Strengths */}
        <div className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5 text-gray-700 dark:text-gray-300">
            <IconStar />
            <h4 className="text-[0.65rem] font-bold tracking-[0.15em] text-gray-800 dark:text-gray-200 uppercase">Strengths</h4>
          </div>
          <ul className="space-y-2.5">
            {result.strengths.map((s, i) => (
              <li key={i} className="text-[0.65rem] sm:text-[0.7rem] text-gray-700 dark:text-gray-300 font-medium flex items-start">
                <span className="mr-2 text-gray-400 dark:text-gray-600 text-lg leading-none mt-[-2px]">•</span>
                <span className="leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5 text-gray-700 dark:text-gray-300">
            <IconTrendingUp />
            <h4 className="text-[0.65rem] font-bold tracking-[0.15em] text-gray-800 dark:text-gray-200 uppercase">Priority Improvements</h4>
          </div>
          <ul className="space-y-3.5">
            {result.improvements.map((imp, i) => (
              <li key={i} className="text-[0.65rem] sm:text-[0.7rem] text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                <span className="font-bold text-gray-900 dark:text-gray-100 mr-1">{imp.rank}. {imp.title}:</span>
                {imp.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Photo Tips */}
        <div className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5 text-gray-700 dark:text-gray-300">
            <IconCamera className="w-4 h-4" />
            <h4 className="text-[0.65rem] font-bold tracking-[0.15em] text-gray-800 dark:text-gray-200 uppercase">Photo Presentation Notes</h4>
          </div>
          <ul className="space-y-2.5">
            {result.photo_tips.map((tip, i) => (
              <li key={i} className="text-[0.65rem] sm:text-[0.7rem] text-gray-700 dark:text-gray-300 font-medium leading-relaxed flex items-start">
                <span className="mr-2 text-gray-400 dark:text-gray-600 text-lg leading-none mt-[-2px]">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
