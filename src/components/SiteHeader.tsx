import Image from "next/image";
import Link from "next/link";

import { HERO_CONTENT, NAV_LINKS } from "./hero/hero.config";

/**
 * Solid (non-transparent) header for pages other than the homepage -- same
 * logo, wordmark, and nav links as the hero's overlay nav, but this one
 * doesn't float over a video, so it's just a plain bar. Nav hrefs are
 * prefixed with "/" so they navigate back to the homepage's anchors instead
 * of trying to scroll an anchor that doesn't exist on the current page.
 */
export default function SiteHeader({ className = "" }: { className?: string }) {
  const { logo, brand } = HERO_CONTENT;

  return (
    <header className={`w-full bg-[#0b1d36] ${className}`.trim()}>
      <nav className="flex w-full items-center justify-between px-6 py-6 md:px-10 md:py-8 lg:px-14 xl:px-20">
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
      </nav>
    </header>
  );
}
