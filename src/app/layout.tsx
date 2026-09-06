import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/components/ui/ToastNotification";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Abhinav Kumar Tiwari (Abhi) • Full Stack Developer & Builder",
    template: "%s | Abhinav Kumar Tiwari",
  },
  description:
    "Personal developer portfolio of Abhinav Kumar Tiwari (Abhi). Specializing in Next.js, Node.js, MongoDB, distributed systems, and tactile Claymorphism interfaces.",
  keywords: [
    "Abhinav Kumar Tiwari",
    "Abhi",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Chai Code",
    "Claymorphism",
    "Portfolio",
  ],
  authors: [{ name: "Abhinav Kumar Tiwari" }],
  creator: "Abhinav Kumar Tiwari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Abhinav Kumar Tiwari (Abhi) • Developer Portfolio",
    description:
      "Developer • Builder • Problem Solver. Building practical, high-performance web experiences with modern architecture.",
    siteName: "Abhinav Kumar Tiwari Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Abhinav Kumar Tiwari Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Kumar Tiwari • Developer Portfolio",
    description:
      "Developer • Builder • Problem Solver. Full Stack Web Applications & Tactile 3D Interfaces.",
    creator: "@abhinavtiwari",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans selection:bg-orange-500 selection:text-white antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
