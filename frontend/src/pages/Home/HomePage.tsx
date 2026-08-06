import HomeQuoteForm from "../../components/forms/HomeQuoteForm";
import HeroHeader from "../../components/hero/HeroHeader";
import AirportTransferSection from "../../components/sections/AirportTransferSection";
import CorporateTravelSection from "../../components/sections/CorporateTravelSection";
import FaqSection from "../../components/sections/FaqSection";
import FinalCtaSection from "../../components/sections/FinalCtaSection";
import FleetSection from "../../components/sections/FleetSection";
import GoogleReviewsSection from "../../components/sections/GoogleReviewsSection";
import LatestBlogsSection from "../../components/sections/LatestBlogsSection";
import ServiceAreasSection from "../../components/sections/ServiceAreasSection";
import ServicesSection from "../../components/sections/ServicesSection";
import StatisticsSection from "../../components/sections/StatisticsSection";
import TrustHighlights from "../../components/sections/TrustHighlights";
import WhyChooseUs from "../../components/sections/WhyChooseUs";

export default function HomePage() {
  return (
    <main>
      <HeroHeader />

      <HomeQuoteForm />

      <TrustHighlights />

      <ServicesSection />

      <FleetSection />

      <WhyChooseUs />

      <AirportTransferSection />

      <CorporateTravelSection />

      <StatisticsSection />

      <ServiceAreasSection />

      <GoogleReviewsSection />

      <LatestBlogsSection />

      <FaqSection />

      <FinalCtaSection />
    </main>
  );
}