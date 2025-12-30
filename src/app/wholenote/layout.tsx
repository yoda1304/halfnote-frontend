import { NavBar } from "../components/Navbar";
import "../globals.css";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import TranslationProvider from "../providers/TranslationProvider";
import ReactQueryProvider from "../providers/QueryProvider";

// Font imports
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
  weight: ["400"],
  fallback: ["system-ui", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
