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
    "Research, commercialization, and cross-border investing in one firm. The work is growth-stage and pre-IPO technology private equity, done alongside institutional investors, family offices, and industrial capital—not a trading floor.",
  pillars: [
    {
      id: "development",
      eyebrow: "Development",
      heading: "Invested in your growth",
      body: "Room to originate, diligence, and take a technology company from commercial validation through industrial scale—with a Hong Kong cross-border platform behind you.",
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
      body: "Our senior leadership team brings together expertise from top tier investment banks, quantitative hedge funds and established private equity firms. We combine proprietary deal sourcing, institutional grade underwriting and active portfolio management with a disciplined approach to exit execution. Our team applies rigorous financial analysis and operational expertise to each investment, working alongside management to build lasting value. Beyond technical capability, we value intellectual curiosity, integrity and a genuine commitment to partnership with the companies we support.",
    },
  ],
  cta: {
    label: "Explore opportunities",
    href: "mailto:careers@megaannumcap.com",
  },
};
