import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { GA_MEASUREMENT_ID, SITE_URL, ogDefaults, organizationSchema } from "@/lib/site";
import { websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2ece0",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sorta Famous · 360° Marketing & PR Agency in India",
    template: "%s · Sorta Famous",
  },
  description:
    "Fame is earned. We manage the rest. Insight led 360° marketing, PR, brand, social and content, visibility that lasts longer than the news cycle.",
  openGraph: {
    ...ogDefaults,
    title: "Sorta Famous · 360° Marketing & PR Agency",
    description:
      "Visibility that lasts longer than the news cycle, no clout chasing, just status with substance.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${geist.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Hides the intro loader before first paint on repeat views in a session. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("sf:intro-seen")==="1")document.documentElement.dataset.introSeen="1"}catch(e){}`,
          }}
        />
        <JsonLd data={{ "@context": "https://schema.org", "@graph": [organizationSchema, websiteSchema] }} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '917020514406906');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=917020514406906&ev=PageView&noscript=1"
            alt="Meta Pixel"
          />
        </noscript>
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
