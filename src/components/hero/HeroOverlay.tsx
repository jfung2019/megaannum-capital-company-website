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
  const { logo, brand, slides, body } = content;
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingLineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const slide = slides[activeSlide];
  const SLIDE_INTERVAL_MS = 7000;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Pinned as an overlay on desktop, always -- the panel was shortened
  // specifically so it reliably fits without reaching the heading or the
  // carousel dots, even on a short (non-fullscreen) desktop window. Below lg,
  // there isn't room for an overlay at any content length, so it stays in
  // normal flow as its own section beneath the video instead.
  const [pinPanel, setPinPanel] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setPinPanel(desktopQuery.matches);
    update();
    desktopQuery.addEventListener("change", update);
    return () => desktopQuery.removeEventListener("change", update);
  }, []);

  // Panel entrance: once, on mount -- its content doesn't change per slide.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(panel, { clearProps: "all", opacity: 1 });
        return;
      }
      gsap.set(panel, { y: 28, opacity: 0 });
      gsap.to(panel, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        delay: 0.6,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Heading entrance: on mount, and again each time the active slide changes.
  useEffect(() => {
    const headingLines = headingLineRefs.current.filter(Boolean);
    if (headingLines.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(headingLines, { clearProps: "all", opacity: 1 });
        return;
      }
      gsap.set(headingLines, { y: 36, opacity: 0 });
      gsap.to(headingLines, {
        y: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [activeSlide]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const goToSlide = (index: number) => {
    headingLineRefs.current = [];
    setActiveSlide(index);
  };

  // Crossfading between videos means the transition can't wait for an
  // "ended" event -- both clips loop continuously in the background, and a
  // fixed interval decides when the next one fades in.
  useEffect(() => {
    if (slides.length < 2 || paused) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const id = window.setInterval(() => {
      headingLineRefs.current = [];
      setActiveSlide((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length, paused]);

  return (
    <div ref={rootRef} className={`relative w-full ${className}`.trim()}>
      <div
        className="relative h-svh w-full overflow-hidden bg-[#0b1d36]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* All slides mounted and looping at once, crossfaded by opacity --
            src stays on the element rather than a typed <source> since the
            CMS serves whatever mime was uploaded, and a wrong `type` makes
            the browser skip the file. */}
        {slides.map((s, index) => (
          <video
            key={s.id}
            src={s.videoUrl}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
            style={{ opacity: index === activeSlide ? 1 : 0 }}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden={index !== activeSlide}
          />
        ))}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,29,54,0.42)_0%,rgba(11,29,54,0.22)_45%,rgba(11,29,54,0.88)_100%)]"
          aria-hidden
        />

        <header className="pointer-events-none absolute inset-0 z-10 flex h-full flex-col">
          <nav className="pointer-events-auto flex items-center justify-between px-6 py-6 md:px-10 md:py-8 lg:px-14 xl:px-20">
            {logo ? (
              <a href="#home" className="flex items-center gap-3">
                <Image
                  src={logo.url}
                  alt={brand}
                  width={logo.width}
                  height={logo.height}
                  className="h-10 w-auto object-contain md:h-12"
                  priority
                  unoptimized={logo.mime === "image/svg+xml"}
                />
                <span className="flex flex-col tracking-wide uppercase">
                  <span className="text-base leading-[1.05] font-bold text-[#ed7d24] md:text-lg">
                    Megaannum
                  </span>
                  <span className="text-base leading-[1.05] font-bold text-white/80 md:text-lg">
                    Capital
                  </span>
                </span>
              </a>
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
                  className="transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-90 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="flex flex-col gap-1.5">
                <span
                  className={`block h-px w-4 bg-current transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuOpen ? "translate-y-1 rotate-45" : ""}`}
                />
                <span
                  className={`block h-px w-4 bg-current transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-px w-4 bg-current transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </nav>

          {/* Always mounted (rather than conditionally rendered) so both the
              entrance and the exit can transition -- popping the menu in and
              out with no transition at all reads as broken. Scales in from
              the trigger's corner, not center, and starts from 0.95 rather
              than 0 (nothing in the real world appears from nothing). */}
          <div
            id="mobile-nav"
            className={`absolute inset-x-0 top-[4.75rem] z-20 mx-6 origin-top-right rounded-lg border border-white/10 bg-[#0b1d36]/95 p-6 shadow-2xl backdrop-blur-xl transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] md:mx-10 lg:hidden ${
              menuOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
            }`}
            aria-hidden={!menuOpen}
          >
            <ul className="flex flex-col gap-4 text-sm text-white/80">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    tabIndex={menuOpen ? 0 : -1}
                    className="block py-1 transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex flex-1 flex-col px-6 pt-10 pb-10 md:px-10 md:pt-14 md:pb-56 lg:px-14 xl:px-20">
            <div className="mt-6 max-w-3xl md:mt-10 lg:mt-14">
              {slide.eyebrow ? (
                <p className="mb-4 font-mono text-xs font-medium tracking-[0.3em] text-[#ed7d24] uppercase">
                  {slide.eyebrow}
                </p>
              ) : null}
              <h1
                className={`${playfair.className} text-5xl leading-[1.03] font-medium tracking-tight text-white md:text-6xl lg:text-6xl xl:text-7xl`}
              >
                {slide.headingLines.map((line, index) => (
                  <span
                    key={`${slide.id}-${index}`}
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

            {slides.length > 1 ? (
              <div className="pointer-events-auto mt-10 flex gap-2 lg:mt-14">
                {slides.map((s, index) => (
                  // Extra vertical padding (with a matching negative margin)
                  // makes the actual tap target a comfortable size without
                  // growing the visible track -- the old dot's hit area was
                  // just the bar itself, ~6px tall.
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Show slide ${index + 1}`}
                    aria-current={index === activeSlide}
                    className="-my-2.5 flex items-center py-2.5"
                  >
                    <span className="h-1.5 w-10 overflow-hidden rounded-full bg-white/25">
                      {index === activeSlide && !reducedMotion ? (
                        <span
                          key={activeSlide}
                          className="block h-full rounded-full bg-[#ed7d24]"
                          style={{
                            animationName: "hero-progress-fill",
                            animationDuration: `${SLIDE_INTERVAL_MS}ms`,
                            animationTimingFunction: "linear",
                            animationFillMode: "forwards",
                            animationPlayState: paused ? "paused" : "running",
                          }}
                        />
                      ) : (
                        <span
                          className={`block h-full rounded-full transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                            index === activeSlide ? "w-full bg-[#ed7d24]" : "w-0 bg-white/55"
                          }`}
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </header>
      </div>

      {/* Pinned as an overlay on desktop; in normal flow below the video on
          mobile/tablet, where there's no room for an overlay regardless of
          content length. */}
      <div
        ref={panelRef}
        className={`border-y border-white/20 bg-[#0b1d36]/20 px-6 py-8 text-white opacity-0 shadow-2xl shadow-black/25 backdrop-blur-3xl backdrop-saturate-200 md:px-10 md:py-7 lg:px-14 xl:px-20 ${
          pinPanel ? "absolute inset-x-0 bottom-0" : "relative"
        }`}
      >
        <div className="flex flex-col gap-4 text-sm leading-relaxed text-white/85 md:gap-3 md:text-[0.95rem] md:leading-[1.6]">
          {body.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
