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
  openGraph: {
    title: "Kahunas - All-in-One Coaching Platform",
    description: "The digital home for your coaching business. Streamline client management, scheduling, and communication.",
    siteName: "Kahunas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kahunas - All-in-One Coaching Platform",
    description: "The digital home for your coaching business. Streamline client management, scheduling, and communication.",
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
