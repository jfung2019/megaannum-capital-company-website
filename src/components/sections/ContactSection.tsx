"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";

import { revealOnScroll } from "@/lib/gsap/revealOnScroll";
import {
  CONTACT_CONTENT,
  type ContactContent,
} from "./contact/contact.config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type ContactSectionProps = {
  content?: ContactContent;
  className?: string;
};

export default function ContactSection({
  className = "",
  content = CONTACT_CONTENT,
}: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let disconnectReveal: (() => void) | undefined;
    let revealTl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(content, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.set(content, { y: 48, opacity: 0 });

      revealTl = gsap.timeline({ paused: true });
      revealTl.to(content, {
        y: 0,
        opacity: 1,
        duration: 1.05,
        ease: "power3.out",
      });
    }, section);

    if (revealTl) {
      disconnectReveal = revealOnScroll(section, revealTl, {
        threshold: 0.2,
        rootMargin: "0px 0px -28% 0px",
        syncStartRatio: 0.68,
      });
    }

    return () => {
      disconnectReveal?.();
      ctx.revert();
    };
  }, []);

  const { eyebrow, heading, subhead, details, form } = content;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`w-full bg-[#0b1d36] text-white ${className}`.trim()}
      aria-labelledby="contact-heading"
    >
      <div className="w-full px-6 py-24 md:px-10 md:py-28 lg:px-14 lg:py-32 xl:px-20">
        <div className="mx-auto max-w-2xl">
          <div ref={contentRef} className="text-center opacity-0">
            <p className="font-mono text-[11px] font-medium tracking-[0.22em] text-white/45 uppercase">
              {eyebrow}
            </p>
            <h2
              id="contact-heading"
              className={`${playfair.className} mx-auto mt-5 max-w-xl text-3xl leading-[1.1] font-medium tracking-tight md:text-4xl lg:text-[2.75rem]`}
            >
              {heading}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/65 md:text-[1.05rem] md:leading-8">
              {subhead}
            </p>

            <ul className="mt-10 space-y-5 border-t border-white/10 pt-10">
              {details.map((item) => (
                <li key={item.label}>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 inline-block text-base text-white underline-offset-4 transition hover:text-[#ed7d24] hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-base text-white">{item.value}</p>
                  )}
                </li>
              ))}
            </ul>

            {/* <form
              className="mt-12 space-y-5 text-left"
              onSubmit={(e) => e.preventDefault()}
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-medium tracking-wide text-white/50 uppercase">
                    {form.nameLabel}
                  </span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    className="w-full border border-white/15 bg-white px-4 py-3 text-sm text-[#1a1714] outline-none transition focus:border-[#ed7d24]/60 focus:ring-2 focus:ring-[#ed7d24]/15"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-medium tracking-wide text-white/50 uppercase">
                    {form.emailLabel}
                  </span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="w-full border border-white/15 bg-white px-4 py-3 text-sm text-[#1a1714] outline-none transition focus:border-[#ed7d24]/60 focus:ring-2 focus:ring-[#ed7d24]/15"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-xs font-medium tracking-wide text-white/50 uppercase">
                  {form.companyLabel}
                </span>
                <input
                  type="text"
                  name="company"
                  autoComplete="organization"
                  className="w-full border border-white/15 bg-white px-4 py-3 text-sm text-[#1a1714] outline-none transition focus:border-[#ed7d24]/60 focus:ring-2 focus:ring-[#ed7d24]/15"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-medium tracking-wide text-white/50 uppercase">
                  {form.messageLabel}
                </span>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full resize-y border border-white/15 bg-white px-4 py-3 text-sm text-[#1a1714] outline-none transition focus:border-[#ed7d24]/60 focus:ring-2 focus:ring-[#ed7d24]/15"
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[#ed7d24] px-8 py-3.5 text-sm font-medium text-white transition hover:bg-[#d66e1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ed7d24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1d36]"
              >
                {form.submitLabel}
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </section>
  );
}
