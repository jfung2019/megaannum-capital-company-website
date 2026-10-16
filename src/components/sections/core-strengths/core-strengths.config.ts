export type SectorIcon = "ai" | "manufacturing" | "energy" | "semiconductors" | "frontier";

export type Sector = {
  id: string;
  icon: SectorIcon;
  heading: string;
  items: string[];
};

export type CoreStrengthIcon =
  | "pipeline"
  | "industrial"
  | "cross-border"
  | "sectors";

export type CoreStrength =
  | {
      type: "row";
      id: string;
      icon: CoreStrengthIcon;
      image: string;
      /** Crop anchor for the image panel; defaults to centered. */
      imagePosition?: "top" | "center" | "bottom";
      heading: string;
      body: string;
    }
  | {
      type: "grid";
      id: string;
      icon: CoreStrengthIcon;
      image: string;
      heading: string;
      intro: string;
      lead: string;
      sectors: Sector[];
    };

export type CoreStrengthsContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  items: CoreStrength[];
};

export const CORE_STRENGTHS_CONTENT: CoreStrengthsContent = {
  eyebrow: "Platform",
  heading: "Core Strengths",
  intro:
    "The firm focuses on growth stage to pre-IPO technology companies. We prefer businesses whose technologies have achieved commercial validation with clear paths to industrialisation and established revenue streams. We participate in quality projects through minority investments, co investments and dedicated fund structures, with investment sizes tailored to meet the capital requirements of different stages.",
  items: [
    {
      type: "row",
      id: "proprietary-pipeline",
      icon: "pipeline",
      image: "/images/core_str_img_165717610.jpeg",
      heading: "Proprietary Technology Pipeline",
      body: "The firm maintains a strategic partnership with the Chinese Academy of Sciences ecosystem. This relationship provides direct access to commercially viable projects emerging from China’s leading research institutions in fields such as artificial intelligence, semiconductors, advanced materials, robotics and new energy. Through this unique channel, we are able to conduct commercial screening and value discovery on high-quality deep technology assets before they enter the public markets.",
    },
    {
      type: "row",
      id: "industrial-ecosystem-integration",
      icon: "industrial",
      image: "/images/core_str_img_1997948341.jpeg",
      heading: "Deep Industrial Ecosystem Integration",
      body: "We have established a comprehensive strategic partnership with a premier industrial conglomerate specializing in green and intelligent system solutions. With core operations spanning energy and industrial equipment, this partner provides deep capabilities in energy storage, industrial automation, and robotics. This alignment grants us direct access to China’s advanced manufacturing and energy transition sectors, allowing us to leverage extensive industrial resources to support our portfolio companies' operations and scaling.\n\nAdditionally, our strategic partnership with a prominent Hong Kong-listed telecommunications provider—whose solutions serve major network operators and core storage supply chains—enables us to identify specialized investment opportunities across communication infrastructure, AIDC smart computing centers, and millimeter-wave technologies.",
    },
    {
      type: "row",
      id: "cross-border",
      icon: "cross-border",
      image: "/images/core_str_img_2160654964.jpeg",
      heading: "Cross-Border Capital Access",
      body: "Operating out of Hong Kong, the firm has built a cross-border capital network that spans China, the Middle East and other emerging markets. We help Chinese technology companies expand into overseas markets while also providing international capital with professional access to China’s deep technology sector. This two-way capability positions us uniquely within the broader trends of cross border technology transfer and industrial global expansion.",
    },
    {
      type: "grid",
      id: "sector-coverage",
      icon: "sectors",
      image: "/images/core_str_img_2034735552.jpeg",
      heading: "Multi-Sector Investment Coverage",
      intro:
        "The firm's investment mandate covers multiple high growth technology sectors including artificial intelligence and intelligent computing, advanced manufacturing and industrial automation, new energy and energy transition, semiconductors and information technology, and frontier technologies. We focus not only on leading projects within individual sectors but also on cross sector synergies and technological convergence, identifying structural investment opportunities at the intersection of different industries. ",
      lead: "The firm focuses on growth stage and pre-IPO investments across the following high growth technology sectors.",
      sectors: [
        {
          id: "ai-computing",
          icon: "ai",
          heading: "AI and Intelligent Computing",
          items: [
            "AI infrastructure",
            "Large language model applications",
            "AI chips",
            "Smart computing centre related value chains",
          ],
        },
        {
          id: "manufacturing-automation",
          icon: "manufacturing",
          heading: "Advanced Manufacturing and Automation",
          items: [
            "Industrial robotics",
            "Automated production lines",
            "High end equipment",
            "Critical components",
          ],
        },
        {
          id: "energy-transition",
          icon: "energy",
          heading: "New Energy and Energy Transition",
          items: [
            "Energy storage systems",
            "Photovoltaic value chains",
            "Hydrogen equipment",
            "Smart grids",
          ],
        },
        {
          id: "semiconductors-it",
          icon: "semiconductors",
          heading: "Semiconductors and Information Technology",
          items: [
            "Chip design",
            "Semiconductor materials",
            "Optical communications",
            "5G and 6G infrastructure",
          ],
        },
        {
          id: "frontier-tech",
          icon: "frontier",
          heading: "Frontier Technologies",
          items: [
            "Embodied intelligence",
            "Brain computer interfaces",
            "Quantum technologies",
          ],
        },
      ],
    },
  ],
};
