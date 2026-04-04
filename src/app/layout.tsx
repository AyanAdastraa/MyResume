import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: ["italic", "normal"] });

export const metadata: Metadata = {
  title: "Ayan Khan | Manifesto",
  description: "Digital Atelier of Ayan Khan. Full-Stack AI Integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} ${playfair.variable} antialiased selection:bg-white selection:text-black`}>
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  );
}
