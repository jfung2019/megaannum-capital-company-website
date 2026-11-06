"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { revealOnScroll } from "@/lib/gsap/revealOnScroll";
import { PARTNERS_CONTENT, type PartnersContent } from "./partners/partners.config";

type PartnersSectionProps = {
  className?: string;
  content?: PartnersContent;
};

export default function PartnersSection({
  className = "",
  content = PARTNERS_CONTENT,
}: PartnersSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const { label, collaborators } = content;

  useEffect(() => {
    const section = sectionRef.current;
    const row = rowRef.current;
    if (!section || !row) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let disconnectReveal: (() => void) | undefined;
    let revealTl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(row, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(row, { y: 30, opacity: 0 });
      revealTl = gsap.timeline({ paused: true });
      revealTl.to(row, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      });
    }, section);

    if (revealTl) {
      disconnectReveal = revealOnScroll(section, revealTl, {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      });
    }

    return () => {
      disconnectReveal?.();
      ctx.revert();
    };
  }, []);

  if (collaborators.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="partners"
      className={`w-full bg-[#f6f3ec] text-[#1a1714] ${className}`.trim()}
      aria-label="Partners"
    >
      <div className="w-full px-6 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28 xl:px-20">
        <div
          ref={rowRef}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <p className="font-mono text-xs font-medium tracking-[0.3em] text-black/45 uppercase">
            {label}
          </p>
          <ul className="mt-7 flex flex-col items-center gap-10">
            {collaborators.map((collaborator) => (
              <li key={collaborator.id}>
                <p lang="zh-Hans" className="text-xl font-medium md:text-2xl">
                  {collaborator.nameZh}
                </p>
                <p className="mt-2 text-sm text-black/60 md:text-base">
                  {collaborator.nameEn}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
