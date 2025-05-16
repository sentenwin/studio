import Header from '@/components/landing-page/header';
import HeroSection from '@/components/landing-page/hero-section';
import FeatureShowcase from '@/components/landing-page/feature-showcase';
import MissionSection from '@/components/landing-page/testimonials-section'; // Renamed import, path is the same
import CTABanner from '@/components/landing-page/cta-banner';
import Footer from '@/components/landing-page/footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeatureShowcase />
        <MissionSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
