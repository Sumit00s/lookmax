// Pure Server Component — no "use client", fully SSR'd for SEO
import { AnalysisClient } from "../components/AnalysisClient";
import { IconShield } from "../components/ResultsPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#121212] py-8 sm:py-16 px-4 sm:px-8 font-sans flex justify-center relative overflow-hidden text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <main
        className="max-w-[1000px] w-full bg-[#faf9f6] dark:bg-[#18181b] rounded-[2rem] p-6 sm:p-12 relative z-10 border border-gray-300 dark:border-gray-800 transition-colors duration-200"
        role="main"
      >

        {/* Title — fully server-rendered for SEO crawlers */}
        <div className="text-center mb-10">
          <h1
            className="text-4xl md:text-6xl font-serif text-gray-900 dark:text-gray-100 mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', Georgia, serif" }}
          >
            Facial Aesthetics Report
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] bg-gray-300 dark:bg-gray-700 flex-1 max-w-[60px] md:max-w-[120px]" aria-hidden="true" />
            <p
              className="text-[0.6rem] md:text-xs font-bold tracking-widest text-gray-600 dark:text-gray-400 uppercase"
              style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', Georgia, serif" }}
            >
              Analysis for Personal Development &amp; Presentation Optimization
            </p>
            <div className="h-[1px] bg-gray-300 dark:bg-gray-700 flex-1 max-w-[60px] md:max-w-[120px]" aria-hidden="true" />
          </div>
        </div>

        {/* Interactive upload + results — client boundary */}
        <AnalysisClient />

        {/* Disclaimer — server-rendered for SEO */}
        <div className="mt-4 pt-5 border-t border-gray-200 dark:border-gray-800 flex items-start gap-3 px-2">
          <div className="mt-[2px] text-gray-500 dark:text-gray-400" aria-hidden="true">
            <IconShield />
          </div>
          <p className="text-[0.55rem] sm:text-[0.6rem] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider leading-[1.6]">
            <span className="font-bold text-gray-700 dark:text-gray-300">Disclaimer:</span>{" "}
            This analysis is for personal development and presentation optimization only. It is not
            a medical assessment or diagnosis. Results are subjective and based on aesthetic
            principles, not clinical standards.
          </p>
        </div>

      </main>
    </div>
  );
}
