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
  description: "Front end developer and designer available to hire as a freelancer.",
  // 'title' is the title of the webpage that is displayed in the tab of a browser.
  title: "Frontend developer & designer",
  generator: "Next.js",
  // 'applicationName' is the name of the web application as it is usually displayed to the user (e.g., among a list of other applications, or as a label for an icon).
  applicationName: "Frontend Developer and Designer",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript", "Typescript", ""],
  colorScheme: "dark",
  creator: "Swaggy Marie",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/icon.png",
    },
  ],
  openGraph: {
    title: "Next.js",
    description: "The React Framework for the Web",
    type: "article",
    publishedTime: "2023-01-01T00:00:00.000Z",
    authors: ["Seb", "Josh"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js",
    description: "The React Framework for the Web",
    siteId: "1467726470533754880",
    creator: "@nextjs",
    creatorId: "1467726470533754880",
    images: ["https://nextjs.org/og.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
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
