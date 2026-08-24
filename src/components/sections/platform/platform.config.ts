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
  headline: "Translating high-science into private equity",
  intro:
    "We sit in a deep academic and CAS research ecosystem, screening scientific work for commercial use before technologies enter public markets. A separate commercialization arm scales prototypes; our SFC Type 9 asset-management company focuses on fund allocation. The book is concentrated in three hard-tech sectors: robotics, deep energy transition, and advanced manufacturing.",
  stats: [
    {
      value: 3,
      from: 0,
      label: "Core hard-tech sectors",
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
