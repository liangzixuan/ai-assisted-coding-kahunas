import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { auth } from "@/lib/auth";
import AuthSessionProvider from "@/components/providers/session-provider";
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
  title: "Kahunas - All-in-One Coaching Platform",
  description: "Streamline your coaching business with Kahunas. Manage clients, schedule sessions, and communicate seamlessly in one professional platform designed for coaches and their clients.",
  keywords: "coaching platform, client management, appointment scheduling, video conferencing, coach software",
  authors: [{ name: "Kahunas Team" }],
  icons: {
    icon: [
      { url: "/kahunas-icon.png", sizes: "any" },
      { url: "/kahunas-icon.png", sizes: "32x32", type: "image/png" },
      { url: "/kahunas-icon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/kahunas-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/kahunas-icon.png",
  },
  openGraph: {
    title: "Kahunas - All-in-One Coaching Platform",
    description: "The digital home for your coaching business. Streamline client management, scheduling, and communication.",
    siteName: "Kahunas",
    type: "website",
    images: [
      {
        url: "/kahunas-icon.png",
        width: 1200,
        height: 630,
        alt: "Kahunas - All-in-One Coaching Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kahunas - All-in-One Coaching Platform",
    description: "The digital home for your coaching business. Streamline client management, scheduling, and communication.",
    images: ["/kahunas-icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider session={session}>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
