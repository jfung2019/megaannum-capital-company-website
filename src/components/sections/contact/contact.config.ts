export type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

export type ContactContent = {
  eyebrow: string;
  heading: string;
  subhead: string;
  details: ContactDetail[];
  form: {
    nameLabel: string;
    emailLabel: string;
    companyLabel: string;
    messageLabel: string;
    submitLabel: string;
  };
};

export const CONTACT_CONTENT: ContactContent = {
  eyebrow: "Contact",
  heading: "Discuss a partnership or co-investment.",
  subhead:
    "Speak with our team about Co-GP structures, hard-tech mandates, or how we work with professional investors from Hong Kong.",
  details: [
    { label: "Investor relations", value: "ir@megaannum.com", href: "mailto:ir@megaannum.com" },
    { label: "General inquiries", value: "hello@megaannum.com", href: "mailto:hello@megaannum.com" },
    { label: "Careers", value: "careers@megaannum.com", href: "mailto:careers@megaannum.com" },
    { label: "Headquarters", value: "Hong Kong", href: undefined },
  ],
  form: {
    nameLabel: "Full name",
    emailLabel: "Work email",
    companyLabel: "Organization / allocator",
    messageLabel: "How can we help?",
    submitLabel: "Send message",
  },
};
