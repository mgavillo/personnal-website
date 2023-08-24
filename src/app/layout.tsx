import Header from "@/components/header/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { Suspense } from "react";
import Loading from "./loading";
import Head from "next/head";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend developer & designer",
  description: "Front end developer and designer available to hire as a freelancer.",
  creator: "Swaggy Marie",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/icon.png",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ height: "100vh" }}>
        <Header />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}
