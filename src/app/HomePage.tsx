import Footer from "@/components/Footer";
import HeroSection from "@/components/hero/HeroSection";
import MissionSection from "@/components/sections/MissionSection";
import PlatformSection from "@/components/sections/PlatformSection";
import PartnersSection from "@/components/sections/PartnersSection";
import StrategiesSection from "@/components/sections/StrategiesSection";
import ContactSection from "@/components/sections/ContactSection";
import { PARTNERS } from "@/components/sections/partners/partners.config";
import { getSiteContent } from "@/lib/cms/client";
import {
  contactContent,
  heroContent,
  partnerList,
  platformContent,
} from "@/lib/cms/map";

export default async function HomePage() {
  // Server-side on purpose. The sections' GSAP effects snapshot the DOM once at
  // mount, so content has to be in the initial HTML — a browser fetch would
  // leave cards stuck at their opacity-0 start state. It also keeps the site key
  // out of the client bundle. `null` here is a normal state: the mapper falls
  // back to the bundled configs.
  const cms = await getSiteContent();
  // partnerList() falls back to PARTNERS (bundled Logo components) when the
  // CMS has no partners of its own -- a component reference can't cross the
  // server/client boundary as a prop, so only forward genuine CMS data and
  // let the client section import PARTNERS itself for the fallback case.
  const partners = partnerList(cms);
  const cmsPartners = partners === PARTNERS ? undefined : partners;

  return (
    <main className="relative bg-[#f6f3ec]">
      <HeroSection content={heroContent(cms)} />
      <MissionSection />
      <PlatformSection content={platformContent(cms)} />
      <PartnersSection cmsPartners={cmsPartners} />
      <div data-page-continuation className="relative z-10">
        <StrategiesSection />
        <ContactSection content={contactContent(cms)} />
        <Footer />
      </div>
    </main>
  );
}
