import type { ComponentType } from "react";

import type { CmsImage } from "@/lib/cms/map";

import { CasLogo, SdicLogo, ShanghaiElectricLogo } from "./PartnerLogos";

/**
 * What the section actually renders. A CMS partner carries `image`; a bundled
 * fallback carries `Logo`, which is a component reference and so can never come
 * from JSON.
 */
export type PartnerView = {
  id: string;
  name: string;
  image: CmsImage | null;
  Logo: ComponentType<{ className?: string }> | null;
};

export type PartnersContent = {
  /** Label above the first partner (the CAS relationship). */
  strategicLabel: string;
  /** Label above the remaining partners. */
  collaborateLabel: string;
};

export const PARTNERS_CONTENT: PartnersContent = {
  strategicLabel: "Strategic Partner",
  collaborateLabel: "In collaboration with",
};

export const PARTNERS: PartnerView[] = [
  { id: "cas", name: "Chinese Academy of Sciences", image: null, Logo: CasLogo },
  { id: "shanghai-electric", name: "Shanghai Electric", image: null, Logo: ShanghaiElectricLogo },
  { id: "sdic", name: "SDIC", image: null, Logo: SdicLogo },
];
