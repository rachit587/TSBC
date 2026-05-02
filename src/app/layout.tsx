import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Poppins } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "The Story Begins Cafe | Café in Rampurhat",
  description:
    "The Story Begins Cafe — Rampurhat's favourite café serving beverages, snacks, burgers, pasta, Chinese, sizzlers and more. Order on Zomato or visit us at Kamarpatty More, near Shiv Mandir, Rampurhat.",
  keywords: [
    "Story Begins Cafe Rampurhat",
    "café Rampurhat",
    "best café Rampurhat",
    "coffee shop Rampurhat",
    "food Rampurhat",
    "chicken dynamite",
    "paneer dynamite",
    "Birbhum café",
    "TSB café",
  ],
  metadataBase: new URL("https://thestorybeginscafe.in"),
  robots: { index: true, follow: true },
  openGraph: {
    title: "The Story Begins Cafe | Café in Rampurhat",
    description:
      "Rampurhat's favourite café — multi-cuisine menu, cozy ambience & Zomato delivery.",
    type: "website",
    url: "https://thestorybeginscafe.in",
    siteName: "The Story Begins Cafe",
    images: [
      {
        url: "/a_images/outerlook.webp",
        width: 1200,
        height: 630,
        alt: "The Story Begins Cafe exterior at night",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Story Begins Cafe | Café in Rampurhat",
    description:
      "Rampurhat's favourite café — multi-cuisine menu, cozy ambience & Zomato delivery.",
    images: ["/a_images/outerlook.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D2B1A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "The Story Begins Cafe",
    alternateName: "TSB Cafe",
    url: "https://thestorybeginscafe.in",
    telephone: "+918250116900",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Kamarpatty More, near Shiv Mandir, Joshda Apartment Ground Floor",
      addressLocality: "Rampurhat",
      addressRegion: "West Bengal",
      postalCode: "731224",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.1750926,
      longitude: 87.7887383,
    },
    servesCuisine: [
      "Multi-Cuisine",
      "Indian",
      "Chinese",
      "Continental",
      "Italian",
    ],
    priceRange: "₹₹",
    image: "/a_images/outerlook.webp",
    sameAs: [
      "https://www.instagram.com/thestorybegins2022/",
      "https://www.facebook.com/p/The-Story-Begins-Cafe-100085034447767/",
      "https://www.zomato.com/rampurhat/the-story-begins-cafe-rampurhat-locality/order",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* DNS Prefetch & Preconnect for external resources */}
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.zomato.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload hero image for LCP */}
        <link
          rel="preload"
          as="image"
          href="/a_images/inner sitting.webp"
          type="image/webp"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${inter.variable} ${poppins.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
