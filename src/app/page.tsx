
import Header from '@/components/landing-page/header';
import HeroSection from '@/components/landing-page/hero-section';
import AboutSection from '@/components/landing-page/about-section';
import FeatureShowcase from '@/components/landing-page/feature-showcase';
import MissionSection from '@/components/landing-page/testimonials-section'; 
import LatestAiNews from '@/components/landing-page/latest-ai-news'; // New import
import CTABanner from '@/components/landing-page/cta-banner';
import Footer from '@/components/landing-page/footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <FeatureShowcase />
        <MissionSection />
        <LatestAiNews /> {/* Re-added news section here */}
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
