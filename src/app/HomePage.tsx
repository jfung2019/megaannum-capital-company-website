import Footer from "@/components/Footer";
import HeroSection from "@/components/hero/HeroSection";
import MissionSection from "@/components/sections/MissionSection";
import ApproachSection from "@/components/sections/ApproachSection";
import CoreStrengthsSection from "@/components/sections/CoreStrengthsSection";
import { getSiteContent } from "@/lib/cms/client";
import { heroContent, approachContent } from "@/lib/cms/map";

export default async function HomePage() {
  // Server-side on purpose. The sections' GSAP effects snapshot the DOM once at
  // mount, so content has to be in the initial HTML — a browser fetch would
  // leave cards stuck at their opacity-0 start state. It also keeps the site key
  // out of the client bundle. `null` here is a normal state: the mapper falls
  // back to the bundled configs.
  const cms = await getSiteContent();

  return (
    <main className="relative bg-[#f6f3ec]">
      <HeroSection content={heroContent(cms)} />
      <MissionSection />
      <ApproachSection content={approachContent(cms)} />
      <div data-page-continuation className="relative z-10">
        <CoreStrengthsSection />
        <Footer />
      </div>
    </main>
  );
}
