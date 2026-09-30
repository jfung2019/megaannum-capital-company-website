"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Floating pill that scrolls back to the hero once the visitor has
 *  scrolled far enough down to want it. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed right-6 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#ed7d24]/30 bg-[#ed7d24] text-white shadow-lg shadow-black/10 transition-[opacity,transform,background-color,color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] md:right-8 md:bottom-8 cursor-pointer ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp size={20} strokeWidth={2} aria-hidden />
    </button>
  );
}
