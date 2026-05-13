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

        {/* ── Title ── fully server-rendered for SEO crawlers */}
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

        {/* ── Interactive upload + results — client boundary */}
        <AnalysisClient />

        {/* ── Disclaimer — server-rendered for SEO */}
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

        {/* ── SEO Content: How It Works ── visible section for keyword depth */}
        <section
          className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800"
          aria-labelledby="how-it-works-heading"
        >
          <h2
            id="how-it-works-heading"
            className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight"
          >
            How the AI Facial Attractiveness Analyzer Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Upload Your Photo",
                body: "Upload a clear, front-facing photo. JPG, PNG, and WebP formats supported up to 5MB.",
              },
              {
                step: "2",
                title: "AI Analyzes 12 Metrics",
                body: "Our system scores symmetry, jawline, cheekbones, skin texture, eye area, nose harmony, lip proportions, chin, hairline, grooming, and overall harmony.",
              },
              {
                step: "3",
                title: "Get Your Score & Tips",
                body: "Receive an overall attractiveness score out of 10, a detailed per-metric breakdown, and personalized looksmaxxing improvement tips.",
              },
            ].map(({ step, title, body }) => (
              <article
                key={step}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5"
              >
                <span className="inline-block text-xs font-bold tracking-widest text-gray-400 dark:text-gray-600 uppercase mb-2">
                  Step {step}
                </span>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── SEO Content: What We Analyze ── */}
        <section
          className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800"
          aria-labelledby="metrics-heading"
        >
          <h2
            id="metrics-heading"
            className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight"
          >
            12 Facial Metrics We Score
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-2xl">
            Lookmax uses established aesthetic proportion principles to evaluate every major facial
            feature. Each metric is scored out of 10 and contributes to your overall attractiveness
            score.
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Facial Symmetry",
              "Facial Thirds Balance",
              "Eye Area & Brows",
              "Nose Harmony",
              "Lip Proportions",
              "Jawline Definition",
              "Chin Structure",
              "Cheekbone Prominence",
              "Skin Texture & Clarity",
              "Hairline Shape",
              "Grooming Quality",
              "Overall Facial Harmony",
            ].map((metric) => (
              <li
                key={metric}
                className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 shrink-0" aria-hidden="true" />
                {metric}
              </li>
            ))}
          </ul>
        </section>

        {/* ── SEO Content: FAQ ── Matches JSON-LD FAQPage schema */}
        <section
          className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800"
          aria-labelledby="faq-heading"
        >
          <h2
            id="faq-heading"
            className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <dl className="space-y-5">
            {[
              {
                q: "Is Lookmax free to use?",
                a: "Yes. Lookmax is completely free. Upload your photo, sign in with Google, and receive your full detailed facial report instantly.",
              },
              {
                q: "What is looksmaxxing?",
                a: "Looksmaxxing (also spelled looksmaxing) is the practice of maximizing your physical appearance through grooming, skincare, fitness, and lifestyle optimization. Lookmax identifies your strongest features and gives actionable improvement tips to help you look your best.",
              },
              {
                q: "How accurate is the facial attractiveness score?",
                a: "Our scoring is based on established aesthetic proportion principles including the golden ratio, facial thirds theory, and bilateral symmetry research. Results are subjective and intended for personal development purposes, not clinical evaluation.",
              },
              {
                q: "Is my photo stored or shared?",
                a: "Your privacy is our priority. Photos are only stored for authenticated users who choose to sign in, and are never shared with or sold to third parties.",
              },
              {
                q: "What photo should I upload for the best results?",
                a: "Upload a clear, front-facing photo in good lighting. Avoid heavy filters, extreme angles, or heavy makeup for the most accurate analysis.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <dt className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">{q}</dt>
                <dd className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

      </main>
    </div>
  );
}
