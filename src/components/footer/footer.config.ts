export type FooterLink = {
  label: string;
  href: string;
  /** Rendered but not clickable -- the destination isn't live yet. */
  disabled?: boolean;
};

export const FOOTER_LINKS: FooterLink[] = [
  { label: "Megaannum Technology", href: "https://megaannum.ai" },
  { label: "Megaannum AI Solutions", href: "https://megannum.io", disabled: true },
  {
    label: "Silver Water Capital Management",
    href: "https://silverwater-cm.com",
    disabled: true,
  },
];

export const FOOTER_CONTENT = {
  brand: "Megaannum Capital Limited",
  tagline: "A member of Megaannum Group Ltd",
  copyrightOwner: "Megaannum Capital Limited",
  address: "Suite 1705, Harcourt House, 39 Gloucester Road, Wanchai, Hong Kong",
  phone: "+852 27282898",
  disclaimer:
    "This website is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to purchase any securities or investment products. Any such offer or solicitation will be made only to qualified professional investors in accordance with applicable laws and regulations.",
} as const;
