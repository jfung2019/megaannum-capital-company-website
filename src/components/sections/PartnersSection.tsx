"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { revealOnScroll } from "@/lib/gsap/revealOnScroll";
import {
  PARTNERS,
  PARTNERS_CONTENT,
  type PartnerView,
  type PartnersContent,
} from "./partners/partners.config";

type PartnersSectionProps = {
  className?: string;
  content?: PartnersContent;
  /**
   * CMS-sourced partners only (their `Logo` is always null -- a component
   * reference can't cross the server/client boundary as a prop). Omit to
   * fall back to the bundled `PARTNERS`, which this client module imports
   * directly rather than receiving as a prop.
   */
  cmsPartners?: PartnerView[];
};

function PartnerLogo({ partner }: { partner: PartnerView }) {
  if (partner.Logo) {
    return <partner.Logo className="h-full" />;
  }
  if (partner.image) {
    return (
      <Image
        src={partner.image.url}
        alt={partner.name}
        width={partner.image.width}
        height={partner.image.height}
        className="h-full w-auto object-contain"
        unoptimized={partner.image.mime === "image/svg+xml"}
      />
    );
  }
  return <span className="text-sm font-medium text-black/60">{partner.name}</span>;
}

export default function PartnersSection({
  className = "",
  content = PARTNERS_CONTENT,
  cmsPartners,
}: PartnersSectionProps) {
  const partners = cmsPartners && cmsPartners.length > 0 ? cmsPartners : PARTNERS;
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const { strategicLabel, collaborateLabel } = content;

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

  if (partners.length === 0) return null;

  // The first partner (CAS in the bundled set) gets its own "Strategic
  // Partners" group; everything else groups under "Collaborate with".
  const [strategic, ...collaborators] = partners;

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
          className="mx-auto flex max-w-3xl flex-col items-center gap-16 md:gap-20"
        >
          <div className="text-center">
            <p className="font-mono text-xs font-medium tracking-[0.3em] text-black/45 uppercase">
              {strategicLabel}
            </p>
            <div className="mt-7 flex justify-center">
              <div className="h-12 md:h-14">
                <PartnerLogo partner={strategic} />
              </div>
            </div>
          </div>

          {collaborators.length > 0 ? (
            <div className="w-full border-t border-black/10 pt-16 text-center md:pt-20">
              <p className="font-mono text-xs font-medium tracking-[0.3em] text-black/45 uppercase">
                {collaborateLabel}
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
                {collaborators.map((partner) => (
                  <div key={partner.id} className="h-12 md:h-14">
                    <PartnerLogo partner={partner} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
