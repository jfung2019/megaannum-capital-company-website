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
  stats: PlatformStat[];
  footnote: string;
  /** Section background, from the CMS accent colour. */
  background: string;
};

export const PLATFORM_CONTENT: PlatformContent = {
  headline: "A bridge between Chinese deep technology and global capital",
  intro:
    "China has built world-class research and industrial capability in deep technology, but many projects stall at commercialization, capital access, and internationalization. International capital moving the other way faces its own barriers in screening, diligence, and portfolio management. We sit in the middle of that gap—embedded in the Chinese Academy of Sciences technology transfer ecosystem, and operating from Hong Kong in both directions.",
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
