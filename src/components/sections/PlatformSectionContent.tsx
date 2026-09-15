"use client";

import { useRef } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

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
  const { headline, intro, footnote } = content;

  return (
    <div
      ref={rootRef}
      className={`flex min-h-svh w-full flex-col justify-center bg-[#0b1d36] text-white ${className}`.trim()}
    >
      <div className="w-full px-6 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28 xl:px-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              src="/images/bridge-china.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
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
