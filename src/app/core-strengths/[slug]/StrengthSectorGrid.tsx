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
    <div className="mt-8 grid grid-cols-1 border-t border-l border-black/10 sm:grid-cols-2 lg:grid-cols-5">
      {sectors.map((sector) => {
        const Icon = SECTOR_ICONS[sector.icon];
        return (
          <div key={sector.id} className="border-r border-b border-black/10 p-7 md:p-8">
            <Icon size={22} strokeWidth={1.5} className="text-[#ed7d24]" aria-hidden />
            <p
              className={`${playfair.className} mt-4 text-lg leading-snug font-medium tracking-tight text-[#1a1714]`}
            >
              {sector.heading}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-black/55">{sector.body}</p>
          </div>
        );
      })}
    </div>
  );
}
