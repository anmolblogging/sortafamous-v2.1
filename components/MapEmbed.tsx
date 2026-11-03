"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

const ADDRESS =
  "Sorta Famous, Patel Commercial Premises, 203, Off New Link Rd, opp. T-Series, above HDFC bank, Veera Desai Industrial Estate, Andheri West, Mumbai, Maharashtra 400053";

/**
 * Google Maps loads only when asked for. An iframe in the initial HTML costs
 * page speed on every page (it sits in the footer) and is flagged by audits.
 */
export function MapEmbed() {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <iframe
        title="Sorta Famous Location Map"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="group relative flex h-full w-full flex-col items-center justify-center gap-3 bg-cream/[0.04] text-cream/70 transition-colors hover:bg-cream/[0.08] hover:text-cream"
      aria-label="Show Sorta Famous office on Google Maps"
    >
      {/* faint street grid, so the panel still reads as a map */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:28px_28px]"
      />
      <span className="relative grid h-11 w-11 place-items-center rounded-full bg-accent/20 text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
        <MapPin className="h-5 w-5" />
      </span>
      <span className="relative text-sm">Show map · Andheri West, Mumbai</span>
    </button>
  );
}
