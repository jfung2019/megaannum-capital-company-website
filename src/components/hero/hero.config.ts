export type HeroHeadingLine = {
  text: string;
  /** CSS colour for this line; the h1 is white, so only accents differ. */
  color: string;
};

import type { CmsImage } from "@/lib/cms/map";

export type NavLink = {
  href: string;
  label: string;
};

export type HeroContent = {
  /** Brand mark from the CMS. Null falls back to the `brand` wordmark below. */
  logo: CmsImage | null;
  brand: string;
  headingLines: HeroHeadingLine[];
  body: string;
  /** Background clip. The CMS upload when there is one, else the stock clip. */
  videoUrl: string;
  cta: {
    label: string;
    href: string;
  };
};

export const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#approach", label: "Approach" },
  { href: "#platform", label: "Platform" },
  { href: "#working-here", label: "Working Here" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

export const HERO_CONTENT: HeroContent = {
  logo: null,
  brand: "Megaannum Capital Limited",
  headingLines: [
    { text: "Frontier", color: "#ffffff" },
    { text: "Technology", color: "#ed7d24" },
    { text: "Capital", color: "#ffffff" },
  ],
  body:
    "We bridge sovereign and government-backed capital with frontier hard tech. From Hong Kong, Megaannum Capital Limited coordinates cross-border technology transfer and co-investment with partners in the Middle East, Asia, and globally.",
  videoUrl: "https://www.pexels.com/download/video/36435706/",
  cta: {
    label: "Speak with us",
    href: "#contact",
  },
};
