"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";

import { revealOnScroll } from "@/lib/gsap/revealOnScroll";
import {
  WORKING_HERE_CONTENT,
  type WorkingHereContent,
} from "./working-here/working-here.config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type WorkingHereSectionProps = {
  className?: string;
  content?: WorkingHereContent;
};

export default function WorkingHereSection({
  className = "",
  content = WORKING_HERE_CONTENT,
}: WorkingHereSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const contentEl = contentRef.current;
    if (!section || !contentEl) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let disconnectReveal: (() => void) | undefined;
    let revealTl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(contentEl, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.set(contentEl, { y: 40, opacity: 0 });
      revealTl = gsap.timeline({ paused: true });
      revealTl.to(contentEl, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });
    }, section);

    if (revealTl) {
      disconnectReveal = revealOnScroll(section, revealTl, {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      });
    }

    return () => {
      disconnectReveal?.();
      ctx.revert();
    };
  }, []);

  const { eyebrow, heading, intro, pillars, cta } = content;

  return (
    <section
      ref={sectionRef}
      id="working-here"
      className={`relative w-full overflow-hidden bg-[#0b1d36] text-white ${className}`.trim()}
      aria-labelledby="working-here-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(237,125,36,0.14),transparent_55%)]"
        aria-hidden
      />
      <div
        ref={contentRef}
        className="relative w-full px-6 py-24 opacity-0 md:px-10 md:py-28 lg:px-14 lg:py-32 xl:px-20"
      >
        <header className="max-w-6xl">
          <p className="font-mono text-[11px] font-medium tracking-[0.28em] text-white/45 uppercase">
            {eyebrow}
          </p>
          <h2
            id="working-here-heading"
            className={`${playfair.className} mt-5 text-4xl leading-[1.08] font-medium tracking-tight md:text-5xl lg:text-[3.25rem]`}
          >
            {heading}
          </h2>
          <p className="mt-6 max-w-5xl text-base leading-relaxed text-white/65 md:text-[1.05rem] md:leading-8">
            {intro}
          </p>
        </header>

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-14 md:mt-20 md:grid-cols-2 md:gap-14 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-auto md:h-full">
            <Image
              src="/images/working_here.png"
              alt="The Megaannum Capital team collaborating around a laptop"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.id}
                className={index > 0 ? "mt-10 border-t border-white/10 pt-10" : ""}
              >
                <p className="font-mono text-[11px] tracking-[0.22em] text-[#ed7d24] uppercase">
                  {pillar.eyebrow}
                </p>
                <h3
                  className={`${playfair.className} mt-4 text-2xl font-medium tracking-tight md:text-[1.65rem]`}
                >
                  {pillar.heading}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/65 md:leading-8">
                  {pillar.body}
                </p>
              </article>
            ))}

            <a
              href={cta.href}
              className="mt-10 inline-flex w-fit items-center justify-center rounded-full bg-[#ed7d24] px-8 py-3.5 text-sm font-medium text-white transition hover:bg-[#d66e1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ed7d24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1d36]"
            >
              {cta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
