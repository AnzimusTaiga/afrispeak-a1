import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ServiceWorkerRegistrar } from "@/components/pwa/ServiceWorkerRegistrar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AfriSpeak A1 - Apprends l'Anglais",
  description:
    "Application amusante et interactive pour apprendre l'anglais niveau A1. Leçons adaptées au contexte africain : marché, famille, école, santé, transport et plus.",
  keywords: [
    "AfriSpeak",
    "Apprendre l'anglais",
    "A1 anglais",
    "Afrique",
    "Apprentissage",
    "Education",
    "Francophones",
  ],
  authors: [{ name: "AfriSpeak Team" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AfriSpeak A1",
  },
  openGraph: {
    title: "AfriSpeak A1 - Apprends l'Anglais",
    description: "Application A1 d'apprentissage de l'anglais pour les utilisateurs africains francophones",
    type: "website",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#58CC02",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-foreground`}
      >
        {children}
        <Toaster />
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
