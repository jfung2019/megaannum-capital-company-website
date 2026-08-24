export type WorkingHerePillar = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
};

export type WorkingHereContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  pillars: WorkingHerePillar[];
  cta: {
    label: string;
    href: string;
  };
};

export const WORKING_HERE_CONTENT: WorkingHereContent = {
  eyebrow: "Working here",
  heading: "Build at the join of science and capital",
  intro:
    "Research, commercialization, and cross-border investing in one firm. The work is hard-tech private equity and partnership with global allocators—not a trading floor.",
  pillars: [
    {
      id: "development",
      eyebrow: "Development",
      heading: "Invested in your growth",
      body: "Room to originate, diligence, and take a scientific prototype through commercial scale—with the infrastructure of a licensed Hong Kong AMC behind you.",
    },
    {
      id: "investors",
      eyebrow: "Culture",
      heading: "Led by the work",
      body: "Decisions sit with people who underwrite technology and structure capital. Mentorship comes from that work, not from a separate programme.",
    },
    {
      id: "collegiality",
      eyebrow: "Collegiality",
      heading: "Work with specialists",
      body: "Scientists, operators, and investors in the same argument: whether a hard-tech company can travel from the lab into Middle Eastern, Asian, and global markets.",
    },
  ],
  cta: {
    label: "Explore opportunities",
    href: "mailto:careers@megaannum.com",
  },
};
