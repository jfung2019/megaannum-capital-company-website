export type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

export type ContactContent = {
  eyebrow: string;
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
  details: [
    { label: "General enquiries", value: "enquiries@megaannumcap.com", href: "mailto:enquiries@megaannumcap.com" },
    // { label: "Careers", value: "careers@megaannumcap.com", href: "mailto:careers@megaannumcap.com" },
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
