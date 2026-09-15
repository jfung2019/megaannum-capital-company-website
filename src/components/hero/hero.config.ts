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

export type HeroSlide = {
  id: string;
  /** Background clip. The CMS upload overrides the first slide's, else the bundled clip. */
  videoUrl: string;
  /** Still frame shown while the video loads (or in place of it, on a
   *  connection too slow/congested to load the video at all -- confirmed
   *  necessary for mainland China, where the video can fail to finish even
   *  when the page itself loads). */
  poster: string;
  /** Small label above the heading lines, e.g. "Our Mission". Omit for none. */
  eyebrow?: string;
  headingLines: HeroHeadingLine[];
};

export type HeroContent = {
  /** Brand mark. A published CMS logo overrides the bundled crest below. */
  logo: CmsImage | null;
  brand: string;
  /**
   * The hero carousel. Only the first slide's video/heading has a CMS
   * source -- later slides (e.g. the mission statement) are bundled only,
   * so a published document can't leave the carousel with just one slide.
   */
  slides: HeroSlide[];
  body: string;
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
  slides: [
    {
      id: "bridge",
      videoUrl: "/videos/mgcap1.mp4",
      poster: "/images/hero-poster-bridge.jpg",
      headingLines: [
        { text: "Chinese Innovation", color: "#ffffff" },
        { text: "Global Capital", color: "#ffffff" },
      ],
    },
    {
      id: "mission",
      videoUrl: "/videos/mgcap4.mp4",
      poster: "/images/hero-poster-mission.jpg",
      headingLines: [
        {
          text: "Cultivating enduring technology enterprises",
          color: "#ffffff",
        },
      ],
    },
  ],
  body:
    "Megaannum Capital is a Hong Kong-based private equity firm specializing in growth-stage and pre-IPO technology investments. Rooted in China’s innovation ecosystem, we deliver cross-border asset management for global institutions and family offices.\n\nLeveraging established networks across the Middle East and Southeast Asia, we operate as a strategic bridge. We focus on connecting Chinese deep technology with international capital, facilitating value creation through technology transfer, global expansion, and co-investment initiatives.",
  cta: {
    label: "Speak with us",
    href: "#contact",
  },
};
