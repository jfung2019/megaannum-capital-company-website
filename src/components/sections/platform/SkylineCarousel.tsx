"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Slide = {
  id: string;
  src: string;
  city: string;
  country: string;
};

const SLIDES: Slide[] = [
  {
    id: "shanghai",
    src: "/images/skyline_01_160741740.jpeg",
    city: "Shanghai",
    country: "China",
  },
  {
    id: "beijing",
    src: "/images/skyline_02_211231527.jpeg",
    city: "Beijing",
    country: "China",
  },
  {
    id: "shenzhen",
    src: "/images/skyline_03_672042750.jpeg",
    city: "Shenzhen",
    country: "China",
  },
];

const INTERVAL_MS = 2000;

export default function SkylineCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotionRef.current) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-label="Cities where we operate: Shanghai, Beijing, Shenzhen"
    >
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === active ? 1 : 0 }}
          aria-hidden={index !== active}
        >
          <Image
            src={slide.src}
            alt={`${slide.city} skyline at dusk`}
            fill
            sizes="(min-width: 1024px) 72rem, 100vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 py-5 md:px-8 md:py-6">
        <p className="font-mono text-[11px] tracking-[0.2em] text-white uppercase">
          {SLIDES[active].city}
          <span className="text-white/50"> · {SLIDES[active].country}</span>
        </p>

        <div className="flex items-center gap-2">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${slide.city}`}
              aria-current={index === active}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active ? "w-6 bg-[#ed7d24]" : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
