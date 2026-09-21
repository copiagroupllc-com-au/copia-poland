import "./globals.css";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const syne    = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap" });

export const metadata = {
  metadataBase: new URL("https://copiagroupllc.com.au"),
  title: {
    default:  "Copia Group | Investment, Web3 & Real Estate — Australia",
    template: "%s | Copia Group Australia",
  },
  description:
    "Copia Group is a Poland-based innovation hub driving investment and innovation across fintech, payments, Web3, AI, real estate, and gaming — building the next generation of digital finance and technology.",
  keywords: ["Copia Group","investment","fintech","payments","Web3","AI","real estate","gaming","Australia","blockchain"],
  authors: [{ name: "Copia Group LLC", url: "https://copiagroupllc.com" }],
  icons: {
    icon:     "/favicon.png",
    shortcut: "/favicon.png",
    apple:    "/favicon.png",
  },
  openGraph: {
    type:        "website",
    locale:      "en_AU",
    url:         "https://copiagroupllc.com.au",
    siteName:    "Copia Group Australia",
    title:       "Copia Group | Investment, Web3 & Real Estate — Australia",
    description: "Copia Group is a Poland-based innovation hub driving investment and innovation across fintech, payments, Web3, AI, real estate, and gaming — building the next generation of digital finance and technology.",
    images: [{ url: "/copia-logo.png", width: 512, height: 512, alt: "Copia Group" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Copia Group | Investment, Web3 & Real Estate — Australia",
    description: "Copia Group is a Poland-based innovation hub driving investment and innovation across fintech, payments, Web3, AI, real estate, and gaming — building the next generation of digital finance and technology.",
    images:      ["/copia-logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className={`${jakarta.variable} ${syne.variable}`}>
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
