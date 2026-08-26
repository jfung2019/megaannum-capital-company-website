import HeroOverlay from "./HeroOverlay";
import { HERO_CONTENT, type HeroContent } from "./hero.config";

type HeroSectionProps = {
  className?: string;
  content?: HeroContent;
};

export default function HeroSection({
  className = "",
  content = HERO_CONTENT,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className={`relative w-full bg-[#0b1d36] ${className}`.trim()}
      aria-label="Megaannum Capital Limited introduction"
    >
      <HeroOverlay content={content} />
    </section>
  );
}
