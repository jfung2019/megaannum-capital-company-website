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
  /** Brand mark. A published CMS logo overrides the bundled crest below. */
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
  { href: "#mission", label: "Mission" },
  { href: "#approach", label: "Approach" },
  { href: "#platform", label: "Platform" },
  { href: "#working-here", label: "Working Here" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

export const HERO_CONTENT: HeroContent = {
  logo: {
    url: "/images/logo_megaannum.png",
    width: 279,
    height: 281,
    mime: "image/png",
  },
  brand: "Megaannum Capital Limited",
  headingLines: [
    { text: "Chinese", color: "#ffffff" },
    { text: "Deep Technology", color: "#ed7d24" },
    { text: "Global Capital", color: "#ffffff" },
  ],
  body:
    "Megaannum Capital is a Hong Kong based private equity firm focused on growth stage and pre-IPO investments in the technology sector. The firm provides professional cross border investment management services to institutional investors, family offices and industrial capital worldwide.\n\nThe firm maintains deep roots in China’s industrial and technology ecosystem while having established an extensive capital network across the Middle East, Southeast Asia and other emerging markets. Operating out of Hong Kong, we serve as a bridge connecting Chinese deep technology with global capital. Our competitive advantages are built on cross border technology transfer, industrial global expansion and co investment capabilities.",
  videoUrl: "/videos/mgcap1.mp4",
  cta: {
    label: "Speak with us",
    href: "#contact",
  },
};
