import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturedProperties } from "@/components/featured-properties";
import { WhyChooseUs } from "@/components/why-choose-us";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      <Navbar />
      <HeroSection />
      <FeaturedProperties />
      <WhyChooseUs />
      <CtaBanner />
      <Footer />
    </main>
  );
}
