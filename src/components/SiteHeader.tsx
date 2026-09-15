"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { HERO_CONTENT, NAV_LINKS } from "./hero/hero.config";
import LanguageToggle from "./LanguageToggle";

/**
 * Solid (non-transparent) header for pages other than the homepage -- same
 * logo, wordmark, nav links and mobile menu as the hero's overlay nav, but
 * this one doesn't float over a video, so it's just a plain bar. Nav hrefs
 * are prefixed with "/" so they navigate back to the homepage's anchors
 * instead of trying to scroll an anchor that doesn't exist on this page.
 */
export default function SiteHeader({ className = "" }: { className?: string }) {
  const { logo, brand } = HERO_CONTENT;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`relative w-full bg-[#0b1d36] ${className}`.trim()}>
      <nav className="relative z-50 flex w-full items-center justify-between px-6 py-6 md:px-10 md:py-8 lg:px-14 xl:px-20">
        {logo ? (
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logo.url}
              alt={brand}
              width={logo.width}
              height={logo.height}
              className="h-10 w-auto object-contain md:h-12"
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
          </Link>
        ) : (
          <Link href="/" className="text-lg font-bold text-[#ed7d24] uppercase">
            {brand}
          </Link>
        )}

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden items-center gap-4 text-sm text-white/70 lg:flex xl:gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={`/${link.href}`}
                className="transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <LanguageToggle />
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-90 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="site-mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span
                className={`block h-px w-4 bg-current transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-4 bg-current transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-4 bg-current transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Same pattern as the homepage hero nav: drops down from behind the
          header, stops short of the full screen height, header row stays
          above it so the logo/close button remain usable while open. */}
      <div
        id="site-mobile-nav"
        className={`fixed inset-x-0 top-0 z-40 flex h-[82svh] flex-col bg-[#0b1d36] transition-transform duration-[450ms] ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden ${
          menuOpen ? "pointer-events-auto translate-y-0" : "pointer-events-none -translate-y-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-1 flex-col justify-center gap-7 px-8 pt-20 pb-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={`/${link.href}`}
                tabIndex={menuOpen ? 0 : -1}
                className="block text-2xl font-medium text-white/85 transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t border-white/10 px-8 py-6">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
