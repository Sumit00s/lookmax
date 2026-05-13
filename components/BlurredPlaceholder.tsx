"use client";
import { GiNoseFront, GiLips, GiComb } from "react-icons/gi";
import { FaRegEye } from "react-icons/fa";
import { MdDiamond, MdOutlineWaterDrop } from "react-icons/md";
import { IconCamera, IconStar, IconTrendingUp } from "./ResultsPanel";

/** A blurred placeholder that mimics the real results layout — NO card overlay */
export function BlurredPlaceholder() {
  const demoMetrics = [
    { label: "Symmetry", score: "8.6", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg> },
    { label: "Facial Thirds", score: "8.3", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7"><path d="M5 8v5a7 7 0 0 0 14 0V8a7 7 0 0 0-14 0Z"/><path d="M12 21v-8"/><path d="M8 13h8"/></svg> },
    { label: "Eye Area", score: "8.9", icon: <FaRegEye className="w-7 h-7" /> },
    { label: "Nose Harmony", score: "8.2", icon: <GiNoseFront className="w-7 h-7" /> },
    { label: "Lip Proportions", score: "8.7", icon: <GiLips className="w-7 h-7" /> },
    { label: "Jawline", score: "8.2", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7"><path d="M5 8v5a7 7 0 0 0 14 0V8"/></svg> },
    { label: "Chin", score: "8.1", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7"><path d="M9 20c1 1 2 2 3 2s2-1 3-2"/></svg> },
    { label: "Cheekbones", score: "8.6", icon: <MdDiamond className="w-7 h-7" /> },
    { label: "Skin Texture", score: "8.2", icon: <MdOutlineWaterDrop className="w-7 h-7" /> },
    { label: "Hairline", score: "8.4", icon: <GiComb className="w-7 h-7" /> },
    { label: "Grooming", score: "8.6", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7"><path d="M5 4h14M7 4v16M17 4v16"/></svg> },
    { label: "Overall Harmony", score: "8.7", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg> },
  ];

  return (
    /* Only blur — no card overlay on top */
    <div className="blur-[6px] pointer-events-none select-none">
      {/* Score card placeholder */}
      <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-center mb-6">
        <h3 className="text-[0.65rem] font-bold tracking-[0.15em] text-gray-700 dark:text-gray-300 uppercase mb-4">Overall Attractiveness Potential</h3>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-7xl font-serif text-gray-900 dark:text-gray-100 leading-none">?.?</span>
          <span className="text-2xl text-gray-400 font-serif">/10</span>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] flex-1 bg-gray-300 dark:bg-gray-700"/>
          <span className="text-xs font-bold tracking-widest text-gray-600 dark:text-gray-400 uppercase">???</span>
          <div className="h-[1px] flex-1 bg-gray-300 dark:bg-gray-700"/>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">Your detailed facial aesthetics summary will appear here after analysis. Upload your photo to unlock your personalized report.</p>
      </div>

      {/* Metrics Grid placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {demoMetrics.map((m, i) => (
          <div key={i} className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-4 flex flex-col">
            <div className="flex items-start gap-4 mb-3">
              <div className="mt-0.5 text-gray-600 dark:text-gray-400">{m.icon}</div>
              <div className="flex flex-col">
                <span className="text-[0.6rem] font-bold tracking-wider text-gray-800 dark:text-gray-200 uppercase leading-[1.2] max-w-[120px]">{m.label}</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-[1.35rem] font-serif text-gray-900 dark:text-gray-100 leading-none">{m.score}</span>
                  <span className="text-[0.65rem] text-gray-500 font-serif">/10</span>
                </div>
              </div>
            </div>
            <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full mt-2">
              <div className="h-full rounded-full bg-gray-300 dark:bg-gray-600" style={{ width: `${parseFloat(m.score) * 10}%` }}/>
            </div>
            <p className="text-[0.65rem] text-gray-700 dark:text-gray-300 leading-relaxed font-medium mt-3">Your personalized analysis will appear here.</p>
          </div>
        ))}
      </div>

      {/* Photogenic bar placeholder */}
      <div className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-4 flex items-center gap-6 mb-8">
        <div className="flex items-center gap-4 min-w-[300px]">
          <div className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700">
            <IconCamera className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </div>
          <div className="text-[0.65rem] font-bold tracking-wider text-gray-800 dark:text-gray-200 uppercase">Photogenic Potential</div>
          <div className="flex items-baseline gap-1 ml-auto">
            <span className="text-4xl font-serif text-gray-900 dark:text-gray-100">?.?</span>
            <span className="text-sm text-gray-400 font-serif">/10</span>
          </div>
        </div>
        <p className="text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed">Your photogenic potential score and tips will be revealed after analysis.</p>
      </div>

      {/* Bottom columns placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-5">
          <div className="flex items-center gap-3 mb-5 text-gray-700 dark:text-gray-300"><IconStar /><h4 className="text-[0.65rem] font-bold tracking-[0.15em] uppercase">Strengths</h4></div>
          {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-3"/>)}
        </div>
        <div className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-5">
          <div className="flex items-center gap-3 mb-5 text-gray-700 dark:text-gray-300"><IconTrendingUp /><h4 className="text-[0.65rem] font-bold tracking-[0.15em] uppercase">Priority Improvements</h4></div>
          {[1,2,3,4].map(i => <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-3"/>)}
        </div>
        <div className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-5">
          <div className="flex items-center gap-3 mb-5 text-gray-700 dark:text-gray-300"><IconCamera className="w-4 h-4"/><h4 className="text-[0.65rem] font-bold tracking-[0.15em] uppercase">Photo Tips</h4></div>
          {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-3"/>)}
        </div>
      </div>
    </div>
  );
}
