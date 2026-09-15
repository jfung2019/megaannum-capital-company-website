"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";

import { revealOnScroll } from "@/lib/gsap/revealOnScroll";
import { MISSION_CONTENT, type MissionContent } from "./mission/mission.config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type MissionSectionProps = {
  className?: string;
  content?: MissionContent;
};

export default function MissionSection({
  className = "",
  content = MISSION_CONTENT,
}: MissionSectionProps) {
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

  const { heading, paragraphs } = content;

  return (
    <section
      ref={sectionRef}
      id="mission"
      className={`w-full bg-[#f6f3ec] text-[#1a1714] ${className}`.trim()}
      aria-labelledby="mission-heading"
    >
      <div
        ref={contentRef}
        className="w-full px-6 py-24 opacity-0 md:px-10 md:py-28 lg:px-14 lg:py-32 xl:px-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="mission-heading"
            className={`${playfair.className} text-4xl leading-[1.1] font-medium tracking-tight md:text-[2.65rem]`}
          >
            {heading}
          </h2>

          <div className="mt-8 flex flex-col gap-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-black/65 md:text-[1.05rem] md:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
