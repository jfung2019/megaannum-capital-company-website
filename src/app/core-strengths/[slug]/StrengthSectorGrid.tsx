import { Atom, Bot, Cpu, Server, Zap, type LucideIcon } from "lucide-react";
import { Playfair_Display } from "next/font/google";

import type { Sector, SectorIcon } from "@/components/sections/strategies/strategies.config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SECTOR_ICONS: Record<SectorIcon, LucideIcon> = {
  ai: Cpu,
  manufacturing: Bot,
  energy: Zap,
  semiconductors: Server,
  frontier: Atom,
};

export default function StrengthSectorGrid({ sectors }: { sectors: Sector[] }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {sectors.map((sector) => {
        const Icon = SECTOR_ICONS[sector.icon];
        return (
          <div
            key={sector.id}
            className="group flex min-h-[340px] flex-col justify-between rounded-lg border border-transparent bg-[#f1efe8] p-7 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:border-[#ed7d24]/25 hover:bg-white hover:shadow-xl hover:shadow-black/[0.06] md:p-8"
          >
            <p
              className={`${playfair.className} text-lg leading-snug font-medium tracking-tight text-[#1a1714]`}
            >
              {sector.heading}
            </p>

            <div className="flex flex-1 items-center justify-center">
              <Icon
                size={56}
                strokeWidth={1.25}
                className="text-[#ed7d24] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
                aria-hidden
              />
            </div>

            <p className="text-xs leading-relaxed text-black/50">
              {sector.items.join(" | ")}
            </p>
          </div>
        );
      })}
    </div>
  );
}
