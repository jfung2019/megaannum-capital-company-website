/** Approach section background — navy band, orange as the accent. */
export const PLATFORM_SECTION_BACKGROUND = "#0b1d36";

export type PlatformStat = {
  value: number;
  /** Count-up start; defaults to ~85% of value */
  from?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type PlatformContent = {
  /** Rendered as one heading; the CMS stores it as a single string. */
  headline: string;
  intro: string;
  /**
   * One label per "\n\n"-separated paragraph in `intro`, shown above it.
   * Bundled content only — no CMS source, so a published document renders
   * without labels rather than with mismatched ones.
   */
  introHeadings: string[];
  stats: PlatformStat[];
  footnote: string;
  /** Section background, from the CMS accent colour. */
  background: string;
};

export const PLATFORM_CONTENT: PlatformContent = {
  headline: "A bridge between Chinese deep technology and global capital",
  intro:
    "China has accumulated world class research capabilities and industrial foundations in deep technology. The Chinese Academy of Sciences, as the country’s strategic scientific institution, continues to produce original breakthroughs in artificial intelligence, advanced materials, new energy and other fields. However, many high-quality deep technology projects face challenges in commercialisation, capital access, market expansion and internationalisation. By embedding ourselves within the Chinese Academy of Sciences technology transfer ecosystem, we help bring frontier research outcomes from the laboratory to global markets.\n\nInternational capital is accelerating its allocation to Chinese deep technology assets at an unprecedented pace. China’s rapid rise in new energy, artificial intelligence, semiconductors and other fields has created structural opportunities for global investors. However, international capital faces challenges in project screening, due diligence and portfolio management when entering the Chinese market. Our deep understanding of China’s industrial ecosystem and professional investment management capabilities enable us to connect international capital with quality investment opportunities in China’s deep technology sector.",
  introHeadings: [
    "Connecting Chinese Technology with Global Markets",
    "Connecting International Capital with Chinese Opportunities",
  ],
  stats: [
    {
      value: 5,
      from: 0,
      prefix: "0",
      label: "Core sectors",
    },
    {
      value: 3,
      from: 0,
      prefix: "0",
      label: "Strategic partnerships",
    },
    {
      value: 4,
      from: 0,
      prefix: "0",
      label: "Exit pathways",
    },
  ],
  footnote: "",
  background: PLATFORM_SECTION_BACKGROUND,
};

export function formatPlatformStatValue(
  n: number,
  options: Pick<PlatformStat, "prefix" | "suffix"> = {},
): string {
  const { prefix = "", suffix = "" } = options;
  return `${prefix}${Math.round(n).toLocaleString("en-US")}${suffix}`;
}
