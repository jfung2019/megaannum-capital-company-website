"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";

import { revealOnScroll } from "@/lib/gsap/revealOnScroll";
import ShimmerImage from "@/components/ShimmerImage";
import { PLATFORM_CONTENT, type PlatformContent } from "./platform/platform.config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type PlatformSectionContentProps = {
  className?: string;
  content?: PlatformContent;
};

export default function PlatformSectionContent({
  className = "",
  content = PLATFORM_CONTENT,
}: PlatformSectionContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { headline, intro, footnote } = content;

  useEffect(() => {
    const root = rootRef.current;
    const trigger = triggerRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    if (!root || !trigger || !image || !text) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let disconnectReveal: (() => void) | undefined;
    let revealTl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(image, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(text, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(image, { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(text, { y: 48, opacity: 0 });

      revealTl = gsap.timeline({ paused: true });
      revealTl
        .to(image, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power3.inOut",
        })
        .to(
          text,
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.5",
        );
    }, root);

    if (revealTl) {
      // Trigger off the actual visible content block, not the min-h-svh
      // wrapper around it -- the section is taller than its content (the
      // content is vertically centered within it), so watching the wrapper
      // let the reveal fire while the content itself was still off-screen.
      disconnectReveal = revealOnScroll(trigger, revealTl, {
        threshold: 0.2,
        rootMargin: "0px 0px -18% 0px",
      });
    }

    return () => {
      disconnectReveal?.();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`flex min-h-svh w-full flex-col justify-center bg-[#0b1d36] text-white ${className}`.trim()}
    >
      <div
        ref={triggerRef}
        className="w-full px-6 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28 xl:px-20"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <div
            ref={imageRef}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-xl"
          >
            <ShimmerImage
              src="/images/bridge-china.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-opacity duration-500"
            />
          </div>

          <div ref={textRef}>
            <h2
              id="approach-heading"
              className={`${playfair.className} text-[2.1rem] leading-[1.12] font-medium tracking-tight text-white md:text-[2.5rem] md:leading-[1.1] lg:text-[2.85rem] lg:leading-[1.08]`}
            >
              {headline}
            </h2>

            <p className="mt-6 text-base leading-relaxed text-white/85 md:mt-8 md:text-[1.05rem] md:leading-8">
              {intro}
            </p>
          </div>
        </div>

        {footnote ? (
          <p className="mt-14 text-center text-sm text-white/60 italic md:mt-16 lg:mt-20">
            {footnote}
          </p>
        ) : null}
      </div>
    </div>
  );
}
