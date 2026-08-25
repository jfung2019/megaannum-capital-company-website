"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";

import { HERO_CONTENT, NAV_LINKS, type HeroContent } from "./hero.config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type HeroOverlayProps = {
  className?: string;
  content?: HeroContent;
};

export default function HeroOverlay({
  className = "",
  content = HERO_CONTENT,
}: HeroOverlayProps) {
  const { logo, brand, headingLines: lines, body, cta } = content;
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingLineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const headingLines = headingLineRefs.current.filter(Boolean);
    if (!root || !panel || headingLines.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([...headingLines, panel], { clearProps: "all", opacity: 1 });
        return;
      }

      gsap.set(headingLines, { y: 36, opacity: 0 });
      gsap.set(panel, { y: 28, opacity: 0 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(headingLines, {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.12,
        })
        .to(
          panel,
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
          },
          "-=0.35",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      ref={rootRef}
      className={`pointer-events-none absolute inset-0 z-10 flex h-full flex-col ${className}`.trim()}
    >
      <nav className="pointer-events-auto flex items-center justify-between px-6 py-6 md:px-10 md:py-8 lg:px-14 xl:px-20">
        {logo ? (
          <Image
            src={logo.url}
            alt={brand}
            width={logo.width}
            height={logo.height}
            className="h-7 w-auto object-contain md:h-8"
            priority
            unoptimized={logo.mime === "image/svg+xml"}
          />
        ) : (
          <a
            href="#home"
            className="text-lg font-bold text-[#ed7d24] uppercase"
          >
            {brand}
          </a>
        )}

        <div className="hidden items-center gap-4 text-sm text-white/70 lg:flex xl:gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-4 bg-current transition ${menuOpen ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-current transition ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-current transition ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="pointer-events-auto absolute inset-x-0 top-[4.75rem] z-20 mx-6 rounded-lg border border-white/10 bg-[#0b1d36]/95 p-6 shadow-2xl backdrop-blur-xl md:mx-10 lg:hidden"
        >
          <ul className="flex flex-col gap-4 text-sm text-white/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-1 transition-colors hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="relative flex flex-1 flex-col px-6 pt-10 pb-48 md:px-10 md:pt-14 md:pb-56 lg:px-14 xl:px-20">
        <div className="mt-6 max-w-3xl md:mt-10 lg:mt-14">
          <h1
            className={`${playfair.className} text-5xl leading-[1.03] font-medium tracking-tight text-white md:text-6xl lg:text-7xl xl:text-[5.75rem]`}
          >
            {lines.map((line, index) => (
              <span
                key={`${line.text}-${index}`}
                ref={(el) => {
                  headingLineRefs.current[index] = el;
                }}
                className="block opacity-0"
                style={{ color: line.color }}
              >
                {line.text}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div
        ref={panelRef}
        className="pointer-events-auto absolute inset-x-0 bottom-0 border-y border-white/10 bg-[#0b1d36]/40 px-6 py-8 text-white opacity-0 shadow-2xl shadow-black/25 backdrop-blur-xl md:px-10 md:py-10 lg:px-14 xl:px-20"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 text-base leading-relaxed text-white/85 md:w-3/4 md:text-lg md:leading-8">
            {body.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <a
              href={cta.href}
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#0b1d36] transition hover:bg-[#f6f3ec]"
            >
              {cta.label}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
