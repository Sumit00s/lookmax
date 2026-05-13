import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Header } from "../components/Header";
import { AuthProvider } from "../components/AuthProvider";

// ── Fonts ──────────────────────────────────────────────────────────────────
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// ── Site constants ─────────────────────────────────────────────────────────
const BASE_URL = "https://facereport.vercel.app";
const SITE_NAME = "Lookmax";
const TITLE = "Lookmax — Free AI Facial Attractiveness Analyzer & Score";
const DESCRIPTION =
  "Get a free, instant facial attractiveness score powered by AI. Lookmax analyzes 12 facial metrics — symmetry, jawline, cheekbones, skin & more — and gives personalized tips to maximize your looks.";

// ── Metadata ───────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,

  keywords: [
    "facial aesthetics analyzer",
    "attractiveness score",
    "lookmax",
    "looksmaxxing",
    "face rating AI",
    "facial symmetry test",
    "jawline analysis",
    "cheekbone score",
    "how attractive am I",
    "AI face rating",
    "facial analysis tool",
    "looksmaxxing tips",
    "face attractiveness calculator",
    "facial harmony score",
    "photogenic rating",
    "free face analyzer",
    "face score app",
    "rate my face AI",
  ],
  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Beauty & Personal Care",

  // ── Icons / Favicon ────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32",   type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },

  alternates: { canonical: "/" },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lookmax — AI Facial Aesthetics Analyzer",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Get your facial attractiveness score in seconds. AI analyzes symmetry, jawline, cheekbones & more. Free & instant.",
    images: ["/og-image.png"],
    creator: "@lookmax_app",
    site: "@lookmax_app",
  },

  // Uncomment and fill in after verifying in Google Search Console:
  // verification: {
  //   google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
  // },
};

// ── JSON-LD Structured Data ────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: SITE_NAME,
      description: "Free AI facial attractiveness analyzer and looksmaxxing guide.",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebApplication",
      "@id": `${BASE_URL}/#webapp`,
      name: TITLE,
      url: BASE_URL,
      description:
        "Free AI-powered facial attractiveness analyzer. Upload a photo and receive a detailed score across 12 facial metrics including symmetry, jawline, cheekbones, skin quality, and personalized looksmaxxing tips.",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Facial symmetry analysis",
        "Jawline scoring",
        "Cheekbone structure analysis",
        "Skin texture rating",
        "Overall attractiveness score out of 10",
        "12 detailed facial metrics",
        "Personalized looksmaxxing improvement tips",
        "Photogenic potential rating",
      ],
      screenshot: `${BASE_URL}/og-image.png`,
      creator: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Lookmax?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lookmax is a free AI-powered facial aesthetics analyzer that scores your facial attractiveness across 12 detailed metrics — symmetry, jawline definition, cheekbone structure, skin quality, and more — and gives personalized tips to maximize your looks.",
          },
        },
        {
          "@type": "Question",
          name: "How does the facial attractiveness score work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Upload a clear photo of your face. Our AI analyzes 12 facial metrics — symmetry, facial thirds balance, eye area, nose harmony, lip proportions, jawline, chin, cheekbones, skin texture, hairline, grooming, and overall harmony — and generates an attractiveness score out of 10.",
          },
        },
        {
          "@type": "Question",
          name: "Is Lookmax free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Lookmax is completely free. Upload your photo, sign in with Google, and receive your full detailed facial report instantly.",
          },
        },
        {
          "@type": "Question",
          name: "What is looksmaxxing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Looksmaxxing (also spelled looksmaxing) is the practice of maximizing your physical appearance through grooming, skincare, fitness, and lifestyle optimization. Lookmax helps you identify your strongest facial features and gives actionable improvement tips.",
          },
        },
        {
          "@type": "Question",
          name: "Is my photo stored or shared?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your privacy is our priority. Photos are only stored for authenticated users who sign in, and are never shared with or sold to third parties.",
          },
        },
        {
          "@type": "Question",
          name: "What facial features does Lookmax analyze?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lookmax analyzes 12 features: facial symmetry, facial thirds proportion, eye area, nose harmony, lip proportions, jawline definition, chin structure, cheekbone prominence, skin texture, hairline shape, grooming quality, and overall facial harmony.",
          },
        },
      ],
    },
  ],
};

// ── Root Layout ────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.variable} ${bricolage.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col transition-colors duration-200">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
