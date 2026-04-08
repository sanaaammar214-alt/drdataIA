import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BotpressChat from "@/components/BotpressChat";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: '--font-outfit' });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: '--font-dmsans' });

export const metadata: Metadata = {
  title: "SEHHA DATA - Health-Tech Platform",
  description: "L'intelligence artificielle au service de la santé publique marocaine. Détection et alertes épidémiologiques.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#0B1E3E] text-[#E8F4FD]">
        <div className="fixed inset-0 dot-grid-overlay pointer-events-none z-0"></div>
        <div className="fixed inset-0 radial-glow pointer-events-none z-0"></div>
        <Navbar />
        <main className="flex-grow pt-[73px] relative z-10 w-full max-w-[100vw] overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
