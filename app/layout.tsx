import type { Metadata } from "next";
import { Delius } from "next/font/google"; // Updated font import
import "./globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import Loading from "./loading";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "./_components/scroll-to-top";

const delius = Delius({
  variable: "--font-delius",
  subsets: ["latin"],
  weight: ["400"], // Delius only has 400 weight
});
export const metadata: Metadata = {
  title: "StoryCareer",
  description:
    "Explore real stories and authentic voices. Whether you're a storyteller or a reader, share, discover, and connect through powerful narratives. Save your favorites, follow inspiring writers, and join a community built on empathy, creativity, and meaningful connections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="apple-touch-icon"
            href="/apple-touch-icon.png"
            type="image/png"
            sizes="180x180"
          />
          <link rel="manifest" href="/site.webmanifest" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <meta name="darkreader-lock" />
        </head>
        <body
          className={`${delius.className}  antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClerkLoading>
              <Loading />
            </ClerkLoading>
            <ClerkLoaded>
              {children}
              <ScrollToTop />
              <Toaster richColors />
            </ClerkLoaded>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
