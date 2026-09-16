"use client";

import { useEffect, useRef } from "react";
import { Atom, Bot, Cpu, Server, Zap, type LucideIcon } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";

import { revealOnScroll } from "@/lib/gsap/revealOnScroll";
import type { Sector, SectorIcon } from "@/components/sections/strategies/strategies.config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SECTOR_ICONS: Record<SectorIcon, LucideIcon> = {
  ai: Cpu,
  manufacturing: Bot,
  energy: Zap,
  semiconductors: Server,
  frontier: Atom,
};

export default function StrengthSectorGrid({ sectors }: { sectors: Sector[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let disconnectReveal: (() => void) | undefined;
    let revealTl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-sector-card]", grid);
      if (reducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(cards, { y: 28, opacity: 0 });
      revealTl = gsap.timeline({ paused: true });
      revealTl.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, grid);

    if (revealTl) {
      disconnectReveal = revealOnScroll(grid, revealTl, {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      });
    }

    return () => {
      disconnectReveal?.();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={gridRef} className="mt-8">
      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {sectors.map((sector) => {
          const Icon = SECTOR_ICONS[sector.icon];
          const tags = sector.items.join(" | ");
          return (
            <div
              key={sector.id}
              data-sector-card
              className="group relative overflow-hidden rounded-lg border border-transparent bg-[#f1efe8] p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:border-[#ed7d24]/25 hover:bg-white hover:shadow-xl hover:shadow-black/[0.06] sm:min-h-[220px] sm:p-7 md:p-8"
            >
              <Icon
                strokeWidth={1}
                aria-hidden
                className="pointer-events-none absolute -right-4 -bottom-4 h-28 w-28 text-[#ed7d24]/10 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 sm:h-36 sm:w-36"
              />
              <div className="relative">
                <p
                  className={`${playfair.className} text-base leading-snug font-medium tracking-tight text-[#1a1714] sm:text-lg`}
                >
                  {sector.heading}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-black/50">{tags}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
