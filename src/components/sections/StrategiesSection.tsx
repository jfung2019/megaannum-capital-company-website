"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";

import { revealOnScroll } from "@/lib/gsap/revealOnScroll";
import {
  STRATEGIES_CONTENT,
  type StrategiesContent,
} from "./strategies/strategies.config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type StrategiesSectionProps = {
  className?: string;
  content?: StrategiesContent;
};

export default function StrategiesSection({
  className = "",
  content = STRATEGIES_CONTENT,
}: StrategiesSectionProps) {
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
      const items = gsap.utils.toArray<HTMLElement>("[data-strategy-row]", contentEl);
      if (reducedMotion) {
        gsap.set([contentEl, ...items], { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.set(contentEl.querySelector("[data-strategy-header]"), {
        y: 40,
        opacity: 0,
      });
      gsap.set(items, { y: 36, opacity: 0 });

      revealTl = gsap.timeline({ paused: true });
      revealTl
        .to("[data-strategy-header]", {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
        })
        .to(
          items,
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.45",
        );
    }, section);

    if (revealTl) {
      disconnectReveal = revealOnScroll(section, revealTl, {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px",
      });
    }

    return () => {
      disconnectReveal?.();
      ctx.revert();
    };
  }, []);

  const { eyebrow, heading, intro, items } = content;

  return (
    <section
      ref={sectionRef}
      id="platform"
      className={`w-full bg-[#f6f3ec] text-[#1a1714] ${className}`.trim()}
      aria-labelledby="platform-heading"
    >
      <div
        ref={contentRef}
        className="w-full px-6 py-24 md:px-10 md:py-28 lg:px-14 lg:py-32 xl:px-20"
      >
        <header data-strategy-header className="max-w-6xl opacity-0">
          <p className="font-mono text-[11px] font-medium tracking-[0.28em] text-black/45 uppercase">
            {eyebrow}
          </p>
          <h2
            id="platform-heading"
            className={`${playfair.className} mt-5 text-4xl leading-[1.08] font-medium tracking-tight md:text-5xl lg:text-[3.25rem]`}
          >
            {heading}
          </h2>
          <p className="mt-6 max-w-5xl text-base leading-relaxed text-black/60 md:text-[1.05rem] md:leading-8">
            {intro}
          </p>
        </header>

        <ul className="mt-16 border-t border-black/10 md:mt-20">
          {items.map((item) => (
            <li
              key={item.id}
              data-strategy-row
              className="grid gap-4 border-b border-black/10 py-10 opacity-0 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10 md:py-12 lg:grid-cols-[minmax(0,18rem)_1fr]"
            >
              <h3
                className={`${playfair.className} text-2xl font-medium tracking-tight md:text-[1.75rem]`}
              >
                {item.heading}
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-black/65 md:text-[1.05rem] md:leading-8">
                {item.body.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
