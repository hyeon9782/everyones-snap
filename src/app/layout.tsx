import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DefaultLayout from "@/shared/ui/default-layout";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import { QueryProvider } from "@/shared/ui/query-provider";
import { AuthProvider } from "@/shared/ui/auth-provider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "모두의스냅",
  description: "클라우드 기반 사진 공유 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://pay.nicepay.co.kr/v1/js/"
          strategy="beforeInteractive"
        />
        <QueryProvider>
          <AuthProvider>
            <DefaultLayout>
              <Header />
              {children}
              <Footer />
            </DefaultLayout>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
