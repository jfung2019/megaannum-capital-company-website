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
    "Speak with our team about co-investments, dedicated fund structures, or professional access to China’s deep technology sector from Hong Kong.",
  details: [
    { label: "General inquiries", value: "enquiries@megaannumcap.com", href: "mailto:enquiries@megaannumcap.com" },
    { label: "Careers", value: "careers@megaannumcap.com", href: "mailto:careers@megaannumcap.com" },
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
