import type { Metadata } from "next";
import { Handjet, Share_Tech_Mono } from "next/font/google";
import "./global.sass";

const inter = Handjet({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
  adjustFontFallback: false,
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Forum Jednorozanum",
  description: "Forum Jednorozanum",
  keywords: ["Forum", "Jednorozanum", "Forum Jednorozanum"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
