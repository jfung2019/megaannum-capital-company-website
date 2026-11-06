export type Collaborator = {
  id: string;
  nameZh: string;
  nameEn: string;
};

export type PartnersContent = {
  label: string;
  collaborators: Collaborator[];
};

export const PARTNERS_CONTENT: PartnersContent = {
  label: "In collaboration with",
  collaborators: [
    {
      id: "zhongke-xianxing",
      nameZh: "北京中科先行创业投资管理有限公司",
      nameEn: "Beijing Zhongke Xianxing Venture Capital Management Co., Ltd",
    },
  ],
};
