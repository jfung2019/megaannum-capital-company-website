export type HeroHeadingLine = {
  text: string;
  /** CSS colour for this line; the h1 is white, so only accents differ. */
  color: string;
  /** Colour for just the line's first word, when it should stand out from the rest. */
  leadColor?: string;
};

import type { CmsImage } from "@/lib/cms/map";

export type NavLink = {
  href: string;
  label: string;
  /** Rendered as an outlined button in the desktop nav, not a plain link. */
  cta?: boolean;
};

export type HeroSlide = {
  id: string;
  /** Background clip. Omit for a static-image slide -- no video loading
   *  happens for it at all, it just shows `poster`. The CMS upload overrides
   *  the first slide's, else the bundled clip. */
  videoUrl?: string;
  /** Still frame shown while the video loads (or in place of it, on a
   *  connection too slow/congested to load the video at all -- confirmed
   *  necessary for mainland China, where the video can fail to finish even
   *  when the page itself loads). For a slide with no `videoUrl`, this is
   *  simply the slide's image. */
  poster: string;
  /** Vertical crop anchor for `poster` under object-cover, 0 (top) to 100
   *  (bottom); defaults to 50 (centered). The hero fills the full viewport
   *  height (h-svh) at any width, so on a wide but short window a centered
   *  crop can clip content near the top or bottom of the source photo -- a
   *  plain top/center/bottom preset is often too blunt (e.g. "top" can crop
   *  straight through a skyline's midsection, showing mostly empty sky
   *  above it), so this takes the exact percentage instead. */
  posterPositionY?: number;
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
};

export const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#mission", label: "Mission" },
  { href: "#approach", label: "Approach" },
  { href: "#partners", label: "Partners" },
  { href: "#platform", label: "Core Strengths" },
  { href: "#contact", label: "Contact", cta: true },
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
    // TEMP: this Hong Kong photo is a watermarked stock preview (and only
    // ~1000px wide) -- swap for a licensed full-size file before release.
    {
      id: "hong-kong",
      poster: "/images/hero-poster-hk-5.jpg",
      headingLines: [
        { text: "Chinese Innovation.", color: "#ed7d24" },
        { text: "Global Capital.", color: "#ffffff" },
      ],
    },
    {
      id: "hong-kong-test-2",
      poster: "/images/hero-poster-hk-7.jpg",
      headingLines: [
        { text: "Chinese Innovation.", color: "#ed7d24" },
        { text: "Global Capital.", color: "#ffffff" },
      ],
    },
    {
      id: "beijing",
      poster: "/images/hero-poster-beijing.jpg",
      // The building's top corner sits close to the top of this photo, so a
      // centered crop on a wide/short window can clip it.
      posterPositionY: 25,
      headingLines: [
        { text: "Chinese Innovation.", color: "#ed7d24" },
        { text: "Global Capital.", color: "#ffffff" },
      ],
    },
    {
      id: "shenzhen",
      poster: "/images/hero-poster-shenzhen.jpg",
      headingLines: [
        {
          text: "Cultivating enduring technology enterprises.",
          color: "#ffffff",
          leadColor: "#ed7d24",
        },
      ],
    },
  ],
  body:
    "Megaannum Capital is a Hong Kong-based private equity firm specializing in growth-stage and pre-IPO technology investments. Rooted in China’s innovation ecosystem, we deliver cross-border asset management for global institutions and family offices.\n\nLeveraging established networks across the Middle East and Southeast Asia, we operate as a strategic bridge. We focus on connecting Chinese deep technology with international capital, facilitating value creation through technology transfer, global expansion, and co-investment initiatives.",
};
