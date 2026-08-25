export type Strategy = {
  id: string;
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
  heading: "Core strengths",
  intro:
    "We invest from growth stage through pre-IPO, in companies whose technology has commercial validation, established revenue, and a clear path to industrialization. We take minority positions through co-investments and dedicated fund structures, sized to the stage.",
  items: [
    {
      id: "proprietary-pipeline",
      heading: "Proprietary technology pipeline",
      body: "A strategic partnership with the Chinese Academy of Sciences ecosystem gives us direct access to commercially viable projects out of China’s leading research institutions—artificial intelligence, semiconductors, advanced materials, robotics, and new energy. We screen and price those assets before they reach the public markets.",
    },
    {
      id: "industrial-partnership",
      heading: "Industrial partnership at scale",
      body: "Shanghai Electric Group, a global provider of industrial-grade green and intelligent system solutions, spans energy equipment, industrial equipment, and integrated services. The partnership opens investment opportunities across advanced manufacturing and the energy transition, and puts real industrial resources behind portfolio companies.",
    },
    {
      id: "communications-infrastructure",
      heading: "Communications and computing",
      body: "Junzhi Group (HKEX: 1300) is a leading provider of mobile communication transmission solutions in China, serving the country’s major telecom operators, with products in the core supply chain of leading global storage enterprises. Through it we source deals in communication infrastructure, AI data centers (AIDC), and millimeter-wave technology.",
    },
    {
      id: "cross-border",
      heading: "Cross-border capital access",
      body: "From Hong Kong we run a capital network spanning China, the Middle East, and other emerging markets. It works in both directions: Chinese technology companies expanding overseas, and international capital seeking professional access to China’s deep technology sector.",
    },
    {
      id: "sector-coverage",
      heading: "Multi-sector coverage",
      body: "Artificial intelligence and intelligent computing; advanced manufacturing and industrial automation; new energy and the energy transition; semiconductors and information technology; and frontier fields including embodied intelligence, brain-computer interfaces, and quantum. We underwrite the convergence between them as much as the leaders within each.",
    },
    {
      id: "exit-pathways",
      heading: "Exit pathways",
      body: "Hong Kong’s standing as an international capital market, plus our relationships with listed companies across the A-share and Hong Kong markets, gives portfolio companies options: IPO on HKEX or the A-share markets, industrial M&A, strategic sale, and cross-border equity transfer.",
    },
  ],
};
