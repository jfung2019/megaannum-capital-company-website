"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";

import { revealOnScroll } from "@/lib/gsap/revealOnScroll";
import { NEWS_CONTENT, type NewsContent } from "./news/news.config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type NewsSectionProps = {
  className?: string;
  content?: NewsContent;
};

export default function NewsSection({
  className = "",
  content = NEWS_CONTENT,
}: NewsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const contentEl = contentRef.current;
    if (!section || !contentEl || content.posts.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let disconnectReveal: (() => void) | undefined;
    let revealTl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(contentEl, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.set(contentEl, { y: 40, opacity: 0 });
      revealTl = gsap.timeline({ paused: true });
      revealTl.to(contentEl, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });
    }, section);

    if (revealTl) {
      disconnectReveal = revealOnScroll(section, revealTl, {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      });
    }

    return () => {
      disconnectReveal?.();
      ctx.revert();
    };
  }, [content.posts.length]);

  if (content.posts.length === 0) return null;

  const { eyebrow, heading, seeAllLabel, seeAllHref, posts } = content;
  const [featured, ...rest] = posts;

  return (
    <section
      ref={sectionRef}
      id="news"
      className={`w-full bg-[#f6f3ec] text-[#1a1714] ${className}`.trim()}
      aria-labelledby="news-heading"
    >
      <div
        ref={contentRef}
        className="w-full px-6 py-24 opacity-0 md:px-10 md:py-28 lg:px-14 lg:py-32 xl:px-20"
      >
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] font-medium tracking-[0.28em] text-black/45 uppercase">
              {eyebrow}
            </p>
            <h2
              id="news-heading"
              className={`${playfair.className} mt-5 text-4xl leading-[1.08] font-medium tracking-tight md:text-5xl lg:text-[3.25rem]`}
            >
              {heading}
            </h2>
          </div>
          {seeAllHref ? (
            <a
              href={seeAllHref}
              className="font-mono text-[11px] tracking-[0.18em] text-[#ed7d24] uppercase transition hover:text-[#1a1714]"
            >
              {seeAllLabel}
            </a>
          ) : null}
        </header>

        <div className="mt-14 border-t border-black/10 pt-12 md:mt-16">
          {featured ? (
            <article className="max-w-5xl pb-12 md:pb-14">
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#ed7d24] uppercase">
                {featured.tag}
                <span className="mx-3 text-black/25">·</span>
                <span className="text-black/45">{featured.date}</span>
              </p>
              <h3
                className={`${playfair.className} mt-4 text-2xl font-medium tracking-tight md:text-3xl`}
              >
                {featured.href ? (
                  <a href={featured.href} className="hover:text-[#ed7d24]">
                    {featured.title}
                  </a>
                ) : (
                  featured.title
                )}
              </h3>
              {featured.excerpt ? (
                <p className="mt-4 max-w-4xl text-base leading-relaxed text-black/65 md:leading-8">
                  {featured.excerpt}
                </p>
              ) : null}
            </article>
          ) : null}

          {rest.length > 0 ? (
            <ul className="border-t border-black/10">
              {rest.map((post) => (
                <li
                  key={post.id}
                  className="border-b border-black/10 py-7 md:grid md:grid-cols-[10rem_1fr_8rem] md:items-baseline md:gap-8 md:py-8"
                >
                  <p className="font-mono text-[11px] tracking-[0.2em] text-[#ed7d24] uppercase">
                    {post.tag}
                  </p>
                  <h3 className={`${playfair.className} mt-2 text-xl font-medium md:mt-0`}>
                    {post.href ? (
                      <a href={post.href} className="hover:text-[#ed7d24]">
                        {post.title}
                      </a>
                    ) : (
                      post.title
                    )}
                  </h3>
                  <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-black/40 uppercase md:mt-0 md:text-right">
                    {post.date}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
