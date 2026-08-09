import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Nterior | The Complete CRM for Interior Work Companies",
  description:
    "Manage projects, clients, and invoicing in one place. Start your 2-month free trial today.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden bg-slate-50 text-slate-900 antialiased font-sans">
        <Providers>
          <Navbar />
          <main className="flex-1 w-full overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </Providers>
        <Script id="disable-number-wheel" strategy="afterInteractive">
          {`
            document.addEventListener("wheel", function () {
              const active = document.activeElement;
              if (
                active &&
                active.tagName === "INPUT" &&
                active.getAttribute("type") === "number"
              ) {
                active.blur();
              }
            }, { passive: true });
          `}
        </Script>
      </body>
    </html>
  );
}