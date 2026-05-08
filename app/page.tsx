import Image from "next/image";
import personImage from "./assets/cristiano-ronaldo.webp";
import { GiNoseFront, GiLips, GiComb } from "react-icons/gi";
import { FaRegEye } from "react-icons/fa";
import { MdDiamond, MdOutlineWaterDrop } from "react-icons/md";

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-[#faf9f6] dark:bg-[#121212] py-8 sm:py-16 px-4 sm:px-8 font-sans flex justify-center relative overflow-hidden text-gray-900 dark:text-gray-100 transition-colors duration-200"
    >
      <main className="max-w-[1000px] w-full bg-[#faf9f6] dark:bg-[#18181b] rounded-[2rem] p-6 sm:p-12 relative z-10 border border-gray-300 dark:border-gray-800 transition-colors duration-200">
        
        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-serif text-gray-900 dark:text-gray-100 mb-6 tracking-tight">Facial Aesthetics Report</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] bg-gray-300 dark:bg-gray-700 flex-1 max-w-[60px] md:max-w-[120px]"></div>
            <p className="text-[0.6rem] md:text-xs font-bold tracking-widest text-gray-600 dark:text-gray-400 uppercase">Analysis for Personal Development & Presentation Optimization</p>
            <div className="h-[1px] bg-gray-300 dark:bg-gray-700 flex-1 max-w-[60px] md:max-w-[120px]"></div>
          </div>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-10">
          
          {/* Image & Annotations */}
          <div className="border border-gray-300 dark:border-gray-800 rounded-2xl h-[400px] sm:h-auto min-h-[400px] relative overflow-hidden shadow-sm transition-colors duration-200">
            <Image src={personImage} alt="Analysis Subject" fill className="object-cover" />
            
            {/* Overlay lines on the face */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="5" y1="35" x2="95" y2="35" stroke="white" strokeWidth="0.5" strokeDasharray="2 2"/>
              <line x1="25" y1="65" x2="75" y2="65" stroke="white" strokeWidth="0.5" strokeDasharray="2 2"/>
              <line x1="30" y1="63" x2="30" y2="67" stroke="white" strokeWidth="0.5"/>
              <line x1="70" y1="63" x2="70" y2="67" stroke="white" strokeWidth="0.5"/>
              <line x1="30" y1="75" x2="70" y2="75" stroke="white" strokeWidth="0.5" strokeDasharray="2 2"/>
              <path d="M 25 45 Q 50 110 75 45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2"/>
            </svg>

            {/* Labels as Overlays */}
            <div className="absolute inset-0 z-20 pointer-events-none p-3 sm:p-4">
               {/* Left Labels */}
               <div className="absolute top-[12%] left-3 sm:left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] leading-[1.2] tracking-wide border border-white/50 dark:border-white/10 shadow-sm transition-colors duration-200">
                 <span className="font-bold text-gray-800 dark:text-gray-200">UPPER THIRD</span><br/><span className="text-gray-500 dark:text-gray-400">(Forehead to<br/>brow line)</span>
               </div>
               <div className="absolute top-[45%] left-3 sm:left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] leading-[1.2] tracking-wide border border-white/50 dark:border-white/10 shadow-sm transition-colors duration-200">
                 <span className="font-bold text-gray-800 dark:text-gray-200">MIDDLE THIRD</span><br/><span className="text-gray-500 dark:text-gray-400">(Brow line to<br/>base of nose)</span>
               </div>
               <div className="absolute top-[78%] left-3 sm:left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] leading-[1.2] tracking-wide border border-white/50 dark:border-white/10 shadow-sm transition-colors duration-200">
                 <span className="font-bold text-gray-800 dark:text-gray-200">LOWER THIRD</span><br/><span className="text-gray-500 dark:text-gray-400">(Base of nose to<br/>chin)</span>
               </div>

               {/* Right Labels */}
               <div className="absolute top-[33.5%] right-3 sm:right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] font-bold text-gray-800 dark:text-gray-200 tracking-wider border border-white/50 dark:border-white/10 shadow-sm transition-colors duration-200">
                 EYE LINE
               </div>
               <div className="absolute top-[63.5%] right-3 sm:right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] font-bold text-gray-800 dark:text-gray-200 tracking-wider border border-white/50 dark:border-white/10 shadow-sm transition-colors duration-200">
                 NOSE WIDTH
               </div>
               <div className="absolute top-[73.5%] right-3 sm:right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] font-bold text-gray-800 dark:text-gray-200 tracking-wider border border-white/50 dark:border-white/10 shadow-sm transition-colors duration-200">
                 LIP LINE
               </div>
               <div className="absolute top-[86%] right-3 sm:right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1.5 rounded-md text-[0.55rem] font-bold text-gray-800 dark:text-gray-200 tracking-wider leading-[1.2] text-right border border-white/50 dark:border-white/10 shadow-sm transition-colors duration-200">
                 CHIN CENTER<br/>& JAW OUTLINE
               </div>
            </div>
          </div>

          {/* Right Text Block */}
          <div className="border border-gray-300 dark:border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-center h-full transition-colors duration-200">
            <h3 className="text-[0.65rem] sm:text-xs font-bold tracking-[0.15em] text-gray-700 dark:text-gray-300 uppercase mb-4 sm:mb-6">
              Overall Attractiveness Potential
            </h3>
            <div className="flex flex-col items-start mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl sm:text-7xl font-serif text-gray-900 dark:text-gray-100 leading-none tracking-tight">8.6</span>
                <span className="text-xl sm:text-2xl text-gray-400 dark:text-gray-500 font-serif">/10</span>
              </div>
              <div className="flex items-center w-full max-w-[240px] gap-4">
                <div className="h-[1px] flex-1 bg-gray-300 dark:bg-gray-700"></div>
                <div className="text-[0.65rem] sm:text-xs font-bold tracking-[0.2em] text-gray-600 dark:text-gray-400 uppercase">High</div>
                <div className="h-[1px] flex-1 bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>

            <h4 className="text-[0.65rem] sm:text-xs font-bold tracking-wider text-gray-700 dark:text-gray-300 uppercase mb-3">
              Summary Assessment
            </h4>
            <div className="space-y-4">
              <p className="text-[0.75rem] sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                Your facial aesthetics are well-balanced with strong features and good overall harmony.
              </p>
              <p className="text-[0.75rem] sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                You have expressive eyes, defined brows, proportional lips, and a naturally refined bone structure. Minor enhancements to skin quality, brow definition, and jawline contour could elevate your look further.
              </p>
              <p className="text-[0.75rem] sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                Overall, you have a strong aesthetic foundation with high potential.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           {metrics.map((m, i) => (
             <div key={i} className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-4 flex flex-col transition-colors duration-200">
                <div className="flex items-start gap-4 mb-3">
                  <div className="mt-0.5 text-gray-600 dark:text-gray-400">
                    {m.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.6rem] font-bold tracking-wider text-gray-800 dark:text-gray-200 uppercase leading-[1.2] max-w-[120px]">{m.title}</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-[1.35rem] font-serif text-gray-900 dark:text-gray-100 leading-none">{m.score}</span>
                      <span className="text-[0.65rem] text-gray-500 dark:text-gray-400 font-serif">/10</span>
                    </div>
                  </div>
                </div>
                <p className="text-[0.65rem] sm:text-[0.7rem] text-gray-700 dark:text-gray-300 leading-relaxed font-medium mt-auto">
                  {m.desc}
                </p>
             </div>
           ))}
        </div>

        {/* Photogenic Potential */}
        <div className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-4 sm:p-5 flex flex-col md:flex-row items-center gap-4 sm:gap-6 mb-8 transition-colors duration-200">
          <div className="flex items-center gap-4 w-full md:w-auto md:min-w-[300px] flex-shrink-0">
            <div className="bg-gray-100 dark:bg-[#27272a] p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <IconCamera className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <div className="text-[0.6rem] sm:text-[0.65rem] font-bold tracking-wider text-gray-800 dark:text-gray-200 uppercase leading-[1.2] mb-1">Photogenic<br/>Potential</div>
            </div>
            <div className="flex items-baseline gap-1 ml-auto md:ml-4">
              <span className="text-3xl sm:text-4xl font-serif text-gray-900 dark:text-gray-100 leading-none tracking-tight">8.8</span>
              <span className="text-[0.65rem] sm:text-sm text-gray-500 dark:text-gray-400 font-serif">/10</span>
            </div>
          </div>
          <div className="hidden md:block w-[1px] h-12 bg-gray-300 dark:bg-gray-700 shrink-0 transition-colors duration-200"></div>
          <p className="text-[0.7rem] sm:text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed w-full">
            Strong photogenic potential with expressive eyes and balanced features. Optimized lighting, angles, and styling can deliver exceptional results.
          </p>
        </div>

        {/* Bottom 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-5 sm:p-6 transition-colors duration-200">
            <div className="flex items-center gap-3 mb-5 text-gray-700 dark:text-gray-300">
              <IconStar />
              <h4 className="text-[0.65rem] font-bold tracking-[0.15em] text-gray-800 dark:text-gray-200 uppercase">Strengths</h4>
            </div>
            <ul className="space-y-2.5">
              {strengths.map((s, i) => (
                <li key={i} className="text-[0.65rem] sm:text-[0.7rem] text-gray-700 dark:text-gray-300 font-medium flex items-start">
                  <span className="mr-2 text-gray-400 dark:text-gray-600 text-lg leading-none mt-[-2px]">•</span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-5 sm:p-6 transition-colors duration-200">
            <div className="flex items-center gap-3 mb-5 text-gray-700 dark:text-gray-300">
              <IconTrendingUp />
              <h4 className="text-[0.65rem] font-bold tracking-[0.15em] text-gray-800 dark:text-gray-200 uppercase">Priority Improvements</h4>
            </div>
            <ul className="space-y-3.5">
              {improvements.map((imp, i) => (
                <li key={i} className="text-[0.65rem] sm:text-[0.7rem] text-gray-700 dark:text-gray-300 font-medium leading-relaxed flex flex-col">
                  <div>
                    <span className="font-bold text-gray-900 dark:text-gray-100 mr-1">{i + 1}. {imp.title}:</span>
                    {imp.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-300 dark:border-gray-800 rounded-[1.25rem] p-5 sm:p-6 transition-colors duration-200">
            <div className="flex items-center gap-3 mb-5 text-gray-700 dark:text-gray-300">
              <IconCamera className="w-4 h-4" />
              <h4 className="text-[0.65rem] font-bold tracking-[0.15em] text-gray-800 dark:text-gray-200 uppercase">Photo Presentation Notes</h4>
            </div>
            <ul className="space-y-2.5">
              {photoNotes.map((note, i) => (
                <li key={i} className="text-[0.65rem] sm:text-[0.7rem] text-gray-700 dark:text-gray-300 font-medium leading-relaxed flex items-start">
                  <span className="mr-2 text-gray-400 dark:text-gray-600 text-lg leading-none mt-[-2px]">•</span>
                  <span><span className="font-bold text-gray-900 dark:text-gray-100">{note.title}:</span> {note.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 pt-5 border-t border-gray-200 dark:border-gray-800 flex items-start gap-3 px-2 transition-colors duration-200">
           <div className="mt-[2px] text-gray-500 dark:text-gray-400">
             <IconShield />
           </div>
           <p className="text-[0.55rem] sm:text-[0.6rem] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider leading-[1.6]">
             <span className="font-bold text-gray-700 dark:text-gray-300">Disclaimer:</span> This analysis is for personal development and presentation optimization only. It is not a medical assessment or diagnosis. Results are subjective and based on aesthetic principles, not clinical standards.
           </p>
        </div>

      </main>
    </div>
  );
}

// --- Data & SVG Icons below ---

const strengths = [
  "Expressive, well-shaped eyes",
  "Strong brows with good arch",
  "High cheekbones and balanced bone structure",
  "Proportional lips with natural shape",
  "Clear skin with even tone",
  "Good overall facial harmony",
  "Healthy hair with natural shine"
];

const improvements = [
  { title: "Skin Refinement", desc: "Maintain consistency with skincare (hydration, SPF, gentle actives) to enhance radiance and texture." },
  { title: "Subtle Jawline Definition", desc: "Consider facial toning through lean mass, posture, and possibly non-invasive contouring (e.g., RF, jawline treatments)." },
  { title: "Brow Enhancement", desc: "Slightly define and lift the tail for a more open, youthful appearance." },
  { title: "Lip Enhancement (Optional)", desc: "Hydration and subtle enhancement can improve definition and fullness." }
];

const photoNotes = [
  { title: "Best angles", desc: "Slight 3/4 angle, camera at or slightly above eye level" },
  { title: "Lighting", desc: "Soft, natural light (window light) - avoid harsh overheads" },
  { title: "Expression", desc: "Soft, relaxed smile or neutral with engaged eyes" },
  { title: "Hair", desc: "Add volume at the crown; soft waves frame the face beautifully" },
  { title: "Styling", desc: "Simple, elegant outfits; solid colors work best on camera" },
  { title: "Posture", desc: "Shoulders back, elongate neck, relaxed jaw for a confident look" }
];

const IconScales = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="M7 21h10"/><path d="M12 3v18"/>
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
  </svg>
);

const IconFace = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M5 8v5a7 7 0 0 0 14 0V8a7 7 0 0 0-14 0Z"/><path d="M12 21v-8"/><path d="M8 13h8"/>
  </svg>
);

const IconEye = () => <FaRegEye className="w-7 h-7" />;

const IconNose = () => <GiNoseFront className="w-7 h-7" />;

const IconLips = () => <GiLips className="w-7 h-7" />;

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

const IconDiamond = () => <MdDiamond className="w-7 h-7" />;

const IconDrop = () => <MdOutlineWaterDrop className="w-7 h-7" />;

const IconHair = () => <GiComb className="w-7 h-7" />;

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

const IconCamera = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

const IconStar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconTrendingUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);

const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const metrics = [
  { title: "Symmetry", score: "8.6", desc: "Good overall facial symmetry. Minor natural asymmetries present but not distracting.", icon: <IconScales /> },
  { title: "Facial Thirds & Proportions", score: "8.3", desc: "Well-proportioned thirds with balanced vertical distribution and pleasing facial ratios.", icon: <IconFace /> },
  { title: "Eye Area", score: "8.9", desc: "Large, almond-shaped eyes with good shape and spacing. Bright, engaging and expressive.", icon: <IconEye /> },
  { title: "Nose Harmony", score: "8.2", desc: "Nose is well-proportioned with a straight bridge and suitable width.", icon: <IconNose /> },
  { title: "Lip Proportions", score: "8.7", desc: "Well-shaped with good volume and balance. Defined cupid's bow and pleasing symmetry.", icon: <IconLips /> },
  { title: "Jawline", score: "8.2", desc: "Well-defined jawline with good structure. Could be more sculpted subtly.", icon: <IconJawline /> },
  { title: "Chin", score: "8.1", desc: "Chin is proportional and aligned. Slight enhancement could improve definition.", icon: <IconChin /> },
  { title: "Cheekbone Structure", score: "8.6", desc: "High cheekbones with good projection and natural contouring.", icon: <IconDiamond /> },
  { title: "Skin Texture & Tone", score: "8.2", desc: "Clear, even tone with a healthy glow. Minor texture refinement could enhance radiance.", icon: <IconDrop /> },
  { title: "Hairline & Hairstyle", score: "8.4", desc: "Good hair density and natural hairline. Style frames the face well with soft layers.", icon: <IconHair /> },
  { title: "Grooming", score: "8.6", desc: "Well-groomed overall. Brows are neat and suit your features well.", icon: <IconGrooming /> },
  { title: "Overall Facial Harmony", score: "8.7", desc: "Features work well together creating a balanced and pleasing overall impression.", icon: <IconSparkle /> }
];
