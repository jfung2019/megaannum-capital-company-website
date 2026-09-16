"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

import { revealOnScroll } from "@/lib/gsap/revealOnScroll";
import ShimmerImage from "@/components/ShimmerImage";
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
        const header = contentEl.querySelector("[data-strategy-header]");
        gsap.set([header, ...cards], { opacity: 1, y: 0 });
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
      className={`w-full bg-[#0b1d36] text-white ${className}`.trim()}
      aria-labelledby="platform-heading"
    >
      <div
        ref={contentRef}
        className="w-full px-6 py-24 md:px-10 md:py-28 lg:px-14 lg:py-32 xl:px-20"
      >
        <header data-strategy-header className="max-w-6xl opacity-0">
          <p className="font-mono text-[11px] font-medium tracking-[0.28em] text-white/45 uppercase">
            {eyebrow}
          </p>
          <h2
            id="platform-heading"
            className={`${playfair.className} mt-5 text-4xl leading-[1.08] font-medium tracking-tight md:text-5xl lg:text-[3.25rem]`}
          >
            {heading}
          </h2>
          <p className="mt-6 max-w-5xl text-base leading-relaxed text-white/65 md:text-[1.05rem] md:leading-8">
            {intro}
          </p>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/core-strengths/${item.id}`}
              data-strategy-card
              className="group relative flex aspect-[4/3] w-full flex-col justify-end overflow-hidden rounded-xl border border-white/10 opacity-0 transition-[border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#ed7d24]/40 active:scale-[0.98]"
            >
              <ShimmerImage
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[#0b1d36] mix-blend-color opacity-70"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(11,29,54,0.95)_0%,rgba(11,29,54,0.35)_55%,transparent_100%)]"
                aria-hidden
              />
              <div className="relative flex items-end justify-between gap-3 p-5">
                <h3
                  className={`${playfair.className} text-lg leading-snug font-medium tracking-tight text-white`}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
