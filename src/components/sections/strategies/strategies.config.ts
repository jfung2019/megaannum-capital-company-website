export type Strategy = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
};

export type StrategiesContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  items: Strategy[];
};

export const STRATEGIES_CONTENT: StrategiesContent = {
  eyebrow: "Platform",
  heading: "How we structure capital",
  intro:
    "A Hong Kong Type 9 platform for co-investment and hard-tech private equity: joint-venture GP structures, SFO-aligned governance, and a path from late-stage science to commercial markets.",
  items: [
    {
      id: "co-gp",
      eyebrow: "01",
      heading: "Co-GP partnership",
      body: "A balanced joint-venture GP that pairs a partner’s market footprint with Megaannum Capital Limited’s technology pipelines and SFC-licensed infrastructure.",
    },
    {
      id: "governance",
      eyebrow: "02",
      heading: "Governance",
      body: "Risk alignment under Hong Kong SFO standards. GP commitment and transparent allocations keep interests in line across the partnership.",
    },
    {
      id: "commercial",
      eyebrow: "03",
      heading: "Commercial acceleration",
      body: "We invest in late-stage hard-tech firms with trade and market corridors into the Middle East, Asia, and other global markets.",
    },
    {
      id: "quant",
      eyebrow: "04",
      heading: "Quantitative engine",
      body: "Proprietary execution and systematic models sit underneath the platform as infrastructure—not as a standalone trading book.",
    },
  ],
};
