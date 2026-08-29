import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { STRATEGIES_CONTENT } from "@/components/sections/strategies/strategies.config";
import StrengthSectorGrid from "./StrengthSectorGrid";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return STRATEGIES_CONTENT.items.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = STRATEGIES_CONTENT.items.find((i) => i.id === slug);
  return { title: item ? `${item.heading} — Megaannum Capital` : "Not found" };
}

export default async function CoreStrengthPage({ params }: PageProps) {
  const { slug } = await params;
  const item = STRATEGIES_CONTENT.items.find((i) => i.id === slug);
  if (!item) notFound();

  const paragraphs = (item.type === "row" ? item.body : item.intro).split("\n\n");

  const eyebrowBlock = (
    <>
      <Link
        href="/#platform"
        className="font-mono text-[11px] tracking-[0.2em] text-black/45 uppercase transition hover:text-[#ed7d24]"
      >
        &larr; Core strengths
      </Link>
      <p className="mt-8 font-mono text-[11px] font-medium tracking-[0.28em] text-black/45 uppercase">
        Core strengths
      </p>
      <h1
        className={`${playfair.className} mt-4 text-4xl leading-[1.08] font-medium tracking-tight text-[#1a1714] md:text-5xl`}
      >
        {item.heading}
      </h1>
    </>
  );

  const ctaRow = (
    <div className="mt-10 flex flex-col gap-4 border-t border-black/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-black/50">Discuss this with our team.</p>
      <Link
        href="/#contact"
        className="inline-flex w-fit items-center justify-center rounded-full bg-[#ed7d24] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#d66e1a]"
      >
        Speak with us
      </Link>
    </div>
  );

  return (
    <main className="relative bg-[#f6f3ec]">
      <SiteHeader />

      {item.type === "grid" ? (
        <>
          {/* Full-width banner -- the sector grid below already uses the
              page's full width, so there's no empty space to fill here. */}
          <div className="relative h-[32vh] w-full md:h-[42vh]">
            <Image
              src={item.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(11,29,54,0.75)_0%,rgba(11,29,54,0.15)_45%,transparent_100%)]"
              aria-hidden
            />
          </div>

          <div className="w-full px-6 py-16 md:px-10 md:py-20 lg:px-14 xl:px-20">
            <div className="max-w-4xl">
              {eyebrowBlock}
              <div className="mt-8 space-y-5 text-base leading-relaxed text-black/70 md:text-[1.05rem] md:leading-8">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <p className="max-w-4xl text-sm text-black/50">{item.lead}</p>
              <StrengthSectorGrid sectors={item.sectors} />
            </div>

            <div className="max-w-4xl">{ctaRow}</div>
          </div>
        </>
      ) : (
        // Side by side: a single short paragraph has nothing to fill a wide
        // page with on its own, so the image becomes a tall panel instead of
        // a top banner, using the width rather than leaving it empty.
        <div className="w-full px-6 py-16 md:px-10 md:py-20 lg:px-14 xl:px-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16 xl:gap-20">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:min-h-[28rem]">
              <Image
                src={item.image}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              {eyebrowBlock}
              <div className="mt-8 space-y-5 text-base leading-relaxed text-black/70 md:text-[1.05rem] md:leading-8">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              {ctaRow}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
