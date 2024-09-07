import type { Metadata } from "next";
import { Handjet } from "next/font/google";

const inter = Handjet({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Forum Jednorozanum",
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
