export type NewsPost = {
  id: string;
  tag: string;
  title: string;
  date: string;
  excerpt?: string;
  href?: string;
};

export type NewsContent = {
  eyebrow: string;
  heading: string;
  seeAllLabel: string;
  /** Omit until there is an archive route; the label is kept for that later link. */
  seeAllHref?: string;
  posts: NewsPost[];
};

export const NEWS_CONTENT: NewsContent = {
  eyebrow: "Latest",
  heading: "News and Perspectives",
  seeAllLabel: "See all posts",
  posts: [
    {
      id: "firm-note",
      tag: "Firm",
      title: "Megaannum Capital Limited: an introduction",
      date: "August 2026",
      excerpt:
        "A Hong Kong private equity firm investing at growth stage and pre-IPO, connecting Chinese deep technology with global industrial capital.",
    },
    {
      id: "deep-tech-note",
      tag: "Insights",
      title: "Deep technology before the public market",
      date: "July 2026",
    },
    {
      id: "hk-note",
      tag: "Firm",
      title: "Hong Kong as a capital bridge",
      date: "June 2026",
    },
  ],
};
