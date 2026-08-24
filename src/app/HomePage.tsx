import Footer from "@/components/Footer";
import HeroSection from "@/components/hero/HeroSection";
import PlatformSection from "@/components/sections/PlatformSection";
import StrategiesSection from "@/components/sections/StrategiesSection";
import ContactSection from "@/components/sections/ContactSection";
import OurPeopleSection from "@/components/sections/OurPeopleSection";
import WorkingHereSection from "@/components/sections/WorkingHereSection";
import NewsSection from "@/components/sections/NewsSection";
import { getSiteContent } from "@/lib/cms/client";
import {
  contactContent,
  heroContent,
  peopleContent,
  platformContent,
} from "@/lib/cms/map";

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
      <PlatformSection content={platformContent(cms)} />
      <div data-page-continuation className="relative z-10">
        <StrategiesSection />
        <OurPeopleSection content={peopleContent(cms)} />
        <WorkingHereSection />
        <NewsSection />
        <ContactSection content={contactContent(cms)} />
        <Footer />
      </div>
    </main>
  );
}
