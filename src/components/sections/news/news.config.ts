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
        "A Hong Kong Type 9 platform connecting sovereign and government-backed capital with frontier hard-tech private equity.",
    },
    {
      id: "hard-tech-note",
      tag: "Insights",
      title: "Hard tech before the public market",
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
