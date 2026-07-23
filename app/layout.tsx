import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FavoritesProvider } from "@/lib/favorites-context";
import { LocationProvider } from "@/lib/location-context";

export const metadata: Metadata = {
  title: "長崎くんちガイド",
  description: "長崎くんち参加者向け 当日案内アプリ",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#faf8f4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/gen-interface-jp@latest/cdn/400.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/gen-interface-jp@latest/cdn/500.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/gen-interface-jp@latest/cdn/700.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <FavoritesProvider>
          <LocationProvider>{children}</LocationProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
