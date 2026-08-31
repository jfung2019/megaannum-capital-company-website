"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

import { revealOnScroll } from "@/lib/gsap/revealOnScroll";
import { STRATEGIES_CONTENT, type StrategiesContent } from "./strategies/strategies.config";

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
      const cards = gsap.utils.toArray<HTMLElement>("[data-strategy-card]", contentEl);
      if (reducedMotion) {
        gsap.set([contentEl, ...cards], { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.set(contentEl.querySelector("[data-strategy-header]"), {
        y: 40,
        opacity: 0,
      });
      gsap.set(cards, { y: 36, opacity: 0 });

      revealTl = gsap.timeline({ paused: true });
      revealTl
        .to("[data-strategy-header]", {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
        })
        .to(
          cards,
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
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

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/core-strengths/${item.id}`}
              data-strategy-card
              className="group flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white opacity-0 transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:border-black/20 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-lg active:scale-[0.98]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3
                    className={`${playfair.className} text-lg leading-snug font-medium tracking-tight`}
                  >
                    {item.heading}
                  </h3>
                  <span
                    aria-hidden
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ed7d24]/30 text-[#ed7d24] transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-[#ed7d24] [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-[#ed7d24] [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-white"
                  >
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
