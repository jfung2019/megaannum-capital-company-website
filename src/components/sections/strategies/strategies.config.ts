export type SectorIcon = "ai" | "manufacturing" | "energy" | "semiconductors" | "frontier";

export type Sector = {
  id: string;
  icon: SectorIcon;
  heading: string;
  body: string;
};

export type Strategy =
  | { type: "row"; id: string; heading: string; body: string }
  | {
      type: "grid";
      id: string;
      heading: string;
      intro: string;
      lead: string;
      sectors: Sector[];
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
    "The firm focuses on growth stage to pre-IPO technology companies. We prefer businesses whose technologies have achieved commercial validation with clear paths to industrialisation and established revenue streams. We participate in quality projects through minority investments, co investments and dedicated fund structures, with investment sizes tailored to meet the capital requirements of different stages.",
  items: [
    {
      type: "row",
      id: "proprietary-pipeline",
      heading: "Proprietary technology pipeline",
      body: "The firm maintains a strategic partnership with the Chinese Academy of Sciences ecosystem. This relationship provides direct access to commercially viable projects emerging from China’s leading research institutions in fields such as artificial intelligence, semiconductors, advanced materials, robotics and new energy. Through this unique channel, we are able to conduct commercial screening and value discovery on high-quality deep technology assets before they enter the public markets.",
    },
    {
      type: "row",
      id: "industrial-ecosystem-integration",
      heading: "Deep industrial ecosystem integration",
      body: "The firm has established a comprehensive strategic partnership with Shanghai Electric Group. Shanghai Electric is a globally leading provider of industrial grade green and intelligent system solutions. Its core businesses span three major segments including energy equipment, industrial equipment and integrated services. The group holds deep industrial capabilities in new energy equipment, energy storage, industrial automation and robotics. This partnership enables us to participate in investment opportunities across China’s advanced manufacturing and energy transition sectors while leveraging Shanghai Electric’s industrial resources to provide operational support to portfolio companies.\n\nThe firm has also established a strategic partnership with a Hong Kong listed company. This company is a leading provider of mobile communication transmission solutions in China, serving the country’s major telecommunications operators. Its products have successfully entered the core supply chain of globally leading storage enterprises. Through this partnership, we are able to identify distinctive investment opportunities in communication infrastructure, AIDC smart computing centres and millimetre wave technologies.",
    },
    {
      type: "row",
      id: "cross-border",
      heading: "Cross-border capital access",
      body: "Operating out of Hong Kong, the firm has built a cross-border capital network that spans China, the Middle East and other emerging markets. We help Chinese technology companies expand into overseas markets while also providing international capital with professional access to China’s deep technology sector. This two-way capability positions us uniquely within the broader trends of cross border technology transfer and industrial global expansion.",
    },
    {
      type: "grid",
      id: "sector-coverage",
      heading: "Multi-sector coverage",
      intro:
        "The firm’s investment mandate covers multiple high growth technology sectors. We focus not only on leading projects within individual sectors but also on cross sector synergies and technological convergence, identifying structural investment opportunities at the intersection of different industries.",
      lead: "The firm focuses on growth stage and pre-IPO investments across the following high growth technology sectors.",
      sectors: [
        {
          id: "ai-computing",
          icon: "ai",
          heading: "AI and intelligent computing",
          body: "AI infrastructure, large language model applications, AI chips and smart computing centre related value chains.",
        },
        {
          id: "manufacturing-automation",
          icon: "manufacturing",
          heading: "Advanced manufacturing and automation",
          body: "Industrial robotics, automated production lines, high end equipment and critical components.",
        },
        {
          id: "energy-transition",
          icon: "energy",
          heading: "New energy and energy transition",
          body: "Energy storage systems, photovoltaic value chains, hydrogen equipment and smart grids.",
        },
        {
          id: "semiconductors-it",
          icon: "semiconductors",
          heading: "Semiconductors and information technology",
          body: "Chip design, semiconductor materials, optical communications and 5G and 6G infrastructure.",
        },
        {
          id: "frontier-tech",
          icon: "frontier",
          heading: "Frontier technologies",
          body: "Embodied intelligence, brain computer interfaces and quantum technologies.",
        },
      ],
    },
    {
      type: "row",
      id: "exit-pathways",
      heading: "Exit pathways",
      body: "Hong Kong’s standing as an international capital market, plus our relationships with listed companies across the A-share and Hong Kong markets, gives portfolio companies options: IPO on HKEX or the A-share markets, industrial M&A, strategic sale, and cross-border equity transfer.",
    },
  ],
};
