"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Sparkles, Users, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { submitLead } from "@/lib/submitLead";

const fields = [
  { id: "name", label: "Your name", type: "text", placeholder: "Jane Doe" },
  { id: "email", label: "Email address", type: "email", placeholder: "you@brand.com" },
  { id: "service", label: "What you need", type: "text", placeholder: "PR · Social · Founder brand" },
];

const perks = [
  { Icon: Sparkles, t: "Free 30 minute consult", d: "Tell us your goals, we'll send back a quick win snapshot. No commitment." },
  { Icon: Users, t: "Talk to strategists", d: "No account managers, you speak directly with the people running your campaigns." },
];

const info = [
  { Icon: Mail, v: "hellothere@sortafamous.in", href: "mailto:hellothere@sortafamous.in" },
  { Icon: Phone, v: "+91 8814 999 939", href: "tel:+918814999939" },
  {
    Icon: MapPin,
    v: "Sorta Famous, Patel Commercial Premises, 203, Off New Link Rd, opp. T-Series, above HDFC bank, Veera Desai Industrial Estate, Andheri West, Mumbai, Maharashtra 400053",
    href: "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Sorta Famous, Patel Commercial Premises, 203, Off New Link Rd, opp. T-Series, above HDFC bank, Veera Desai Industrial Estate, Andheri West, Mumbai, Maharashtra 400053"),
  },
];

type Values = { name: string; email: string; service: string; details: string };

const EMPTY: Values = { name: "", email: "", service: "", details: "" };

/** `isPage` makes the section heading the page's H1, for the standalone /contact page. */
export function Contact({ isPage = false }: { isPage?: boolean }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(v: Values) {
    const errs: Partial<Record<keyof Values, string>> = {};
    if (!v.name.trim()) errs.name = "Please tell us your name.";
    if (!EMAIL_RE.test(v.email)) errs.email = "Enter a valid email address.";
    if (!v.service.trim()) errs.service = "Tell us what you're after.";
    return errs;
  }

  function update(field: keyof Values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "sending") return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    setFormError("");

    const result = await submitLead({
      ...values,
      source: "contact-form",
      submittedAt: new Date().toISOString(),
    });

    if (!result.ok) {
      setStatus("idle");
      setFormError(result.error);
      return;
    }

    setStatus("done");
  }

  return (
    <section
      id="contact"
      className="relative z-[140] bg-cream py-16 md:py-28 px-6 md:px-12 lg:px-16 xl:px-28 border-t border-border"
    >
      <div className="mx-auto max-w-[1480px]">
        <SectionHeader
          eyebrow="Get in touch"
          title="Let's talk"
          as={isPage ? "h1" : "h2"}
          className="mb-12"
        />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          {/* LEFT, image card with headline + perks */}
          <Reveal className="lg:h-full">
            <div className="relative rounded-[2rem] overflow-hidden min-h-[720px] lg:h-full flex flex-col justify-between p-8 md:p-10 bg-ink-gradient">
              <img
                src="/images/art/scene1.jpg"
                alt="Classical landscape painting with a rainbow over a hilltop town and sea"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
              <h2 className="relative serif text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.05] text-cream max-w-md">
                Let&apos;s build a reputation people <span className="serif-italic">remember.</span>
              </h2>
              <div className="relative grid sm:grid-cols-2 gap-3 mt-10">
                {perks.map(({ Icon, t, d }) => (
                  <div
                    key={t}
                    className="rounded-2xl bg-cream/10 backdrop-blur-md border border-cream/15 p-5 text-cream"
                  >
                    <Icon className="h-5 w-5 mb-4" strokeWidth={1.6} />
                    <div className="serif text-lg">{t}</div>
                    <p className="text-cream/70 text-sm mt-1.5 leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* RIGHT, form + contact info */}
          <Reveal delay={100} className="lg:h-full">
            <div className="lg:sticky lg:top-32 flex flex-col">
              {status === "done" ? (
                <div className="py-12 px-6 text-center border border-brand/20 bg-brand/5 rounded-[2rem] flex flex-col items-center justify-center my-auto">
                  <span className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-brand text-cream">
                    <Check className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <h3 className="serif text-3xl leading-tight text-brand">
                    Message sent!
                  </h3>
                  <p className="mt-3 text-base text-ink-soft max-w-md">
                    Thanks, {values.name.split(" ")[0]}. We&apos;ve sent a confirmation email to <span className="font-semibold">{values.email}</span>. A strategist will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="flex flex-col">
                  <div className="space-y-7">
                    {fields.map((f) => (
                      <div key={f.id}>
                        <label htmlFor={f.id} className="block text-base text-ink-soft mb-2.5">
                          {f.label}
                        </label>
                        <input
                          id={f.id}
                          type={f.type}
                          placeholder={f.placeholder}
                          value={values[f.id as keyof Values]}
                          onChange={(e) => update(f.id as keyof Values, e.target.value)}
                          className="w-full bg-transparent border-b border-ink/20 pb-3 text-lg outline-none focus:border-ink transition-colors placeholder:text-ink/30"
                        />
                        {errors[f.id as keyof Values] && (
                          <p role="alert" className="mt-2 text-xs text-red-700">
                            {errors[f.id as keyof Values]}
                          </p>
                        )}
                      </div>
                    ))}
                    <div>
                      <label htmlFor="details" className="block text-base text-ink-soft mb-2.5">
                        Project details
                      </label>
                      <textarea
                        id="details"
                        rows={2}
                        placeholder="Tell us a little about what you're building…"
                        value={values.details}
                        onChange={(e) => update("details", e.target.value)}
                        className="w-full bg-transparent border-b border-ink/20 pb-3 text-lg outline-none focus:border-ink transition-colors resize-none placeholder:text-ink/30"
                      />
                    </div>
                  </div>

                  {formError && (
                    <p role="alert" className="mt-4 text-sm text-red-700">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand text-cream px-8 py-4 text-sm hover:opacity-90 transition cursor-pointer disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      "Sending…"
                    ) : (
                      <>
                        Let&apos;s get Sorta Famous <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}


            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
