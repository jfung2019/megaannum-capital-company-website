/** Approach section background — navy band, orange as the accent. */
export const APPROACH_SECTION_BACKGROUND = "#0b1d36";

export type ApproachStat = {
  value: number;
  /** Count-up start; defaults to ~85% of value */
  from?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type ApproachContent = {
  /** Rendered as one heading; the CMS stores it as a single string. */
  headline: string;
  intro: string;
  /**
   * One label per "\n\n"-separated paragraph in `intro`, shown above it.
   * Bundled content only — no CMS source, so a published document renders
   * without labels rather than with mismatched ones.
   */
  introHeadings: string[];
  stats: ApproachStat[];
  footnote: string;
  /** Section background, from the CMS accent colour. */
  background: string;
};

export const APPROACH_CONTENT: ApproachContent = {
  headline: "Bridging China's Frontier Science with Global Capital.",
  intro:
    "China’s research institutions, led by the Chinese Academy of Sciences, continue to drive foundational breakthroughs across artificial intelligence, advanced materials, and clean energy. Translating laboratory innovation into scalable global enterprises requires dedicated operational stewardship, just as international investors require disciplined local execution and rigorous due diligence to access these high-conviction opportunities. Embedded within China’s technology transfer ecosystem, Megaannum Capital bridges this divide. We align institutional standards with deep industrial access, enabling global capital to effectively partner with transformative science and build resilient, world-class enterprises.",
  introHeadings: [],
  stats: [
    {
      value: 5,
      from: 0,
      label: "Core sectors",
    },
    {
      value: 3,
      from: 0,
      label: "Strategic partnerships",
    },
    {
      value: 4,
      from: 0,
      label: "Exit pathways",
    },
  ],
  footnote: "",
  background: APPROACH_SECTION_BACKGROUND,
};

export function formatApproachStatValue(
  n: number,
  options: Pick<ApproachStat, "prefix" | "suffix"> = {},
): string {
  const { prefix = "", suffix = "" } = options;
  return `${prefix}${Math.round(n).toLocaleString("en-US")}${suffix}`;
}
