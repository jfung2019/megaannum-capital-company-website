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
    { text: "Chinese", color: "#ffffff" },
    { text: "Deep Technology", color: "#ed7d24" },
    { text: "Global Capital", color: "#ffffff" },
  ],
  body:
    "Megaannum Capital Limited is a Hong Kong private equity firm investing in growth-stage and pre-IPO technology companies. We hold deep roots in China’s industrial and technology ecosystem and a capital network across the Middle East, Southeast Asia, and other emerging markets—serving institutional investors, family offices, and industrial capital worldwide.",
  videoUrl: "https://www.pexels.com/download/video/36435706/",
  cta: {
    label: "Speak with us",
    href: "#contact",
  },
};
