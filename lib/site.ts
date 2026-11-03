// Shared site identity, used by metadata, structured data, sitemap and llms.txt.
export const SITE_URL = "https://sortafamous.in";
export const SITE_NAME = "Sorta Famous";

export const BUSINESS = {
  name: SITE_NAME,
  description:
    "Sorta Famous is a 360° marketing and PR agency in Mumbai, India, offering public relations, social media marketing, brand management, performance marketing and personal branding.",
  email: "hellothere@sortafamous.in",
  phone: "+91-8814999939",
  logo: `${SITE_URL}/logo-600.png`,
  image: `${SITE_URL}/og-default.jpg`,
  address: {
    streetAddress:
      "203, Patel Commercial Premises, Off New Link Rd, opp. T-Series, above HDFC Bank, Veera Desai Industrial Estate, Andheri West",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400053",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/sortafamous.in/",
    "https://www.linkedin.com/company/sortaa-famous/",
  ],
};

/** Default social share image, applied wherever a page has no image of its own. */
export const OG_IMAGE = { url: "/og-default.jpg", width: 1200, height: 630, alt: "Sorta Famous · 360° Marketing & PR Agency" };

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: BUSINESS.name,
  url: SITE_URL,
  description: BUSINESS.description,
  email: BUSINESS.email,
  telephone: BUSINESS.phone,
  logo: BUSINESS.logo,
  image: BUSINESS.image,
  address: { "@type": "PostalAddress", ...BUSINESS.address },
  areaServed: { "@type": "Country", name: "India" },
  sameAs: BUSINESS.sameAs,
};

/**
 * Open Graph fields every page shares. A page's own `openGraph` replaces the
 * layout's object entirely, so pages spread these in rather than inherit them.
 */
export const ogDefaults = {
  siteName: SITE_NAME,
  locale: "en_IN",
  type: "website" as const,
  images: [OG_IMAGE],
};

export const GA_MEASUREMENT_ID = "G-0QMZDRK92R";
