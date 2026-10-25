import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Bricolage_Grotesque, Onest } from "next/font/google";

/* Card names and display: a chunky, characterful grotesk that reads like
   printed card lettering at small sizes and like a logo at large ones. */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth", "opsz"],
  variable: "--font-display",
  display: "swap",
});

/* Body and card rules text: compact, clear at 11px on a card face. */
const text = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-text",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${text.variable} app`}>
      <Component {...pageProps} />
    </div>
  );
}
