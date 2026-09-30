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
  address: "Room 1705, Harcourt House, 39 Gloucester Road, Wanchai. HK",
  // PLACEHOLDER: no phone number yet -- replace with the real one.
  phone: "+852 27282898",
} as const;
