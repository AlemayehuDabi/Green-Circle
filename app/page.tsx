import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { StatsSection } from '@/components/stats-section';
import { FeaturedStartups } from '@/components/featured-startups';
import { TrustSection } from '@/components/trust-section';
import { mockStartups } from '@/lib/data'; // adjust path if needed

export default function HomePage() {
  const featuredStartups = mockStartups;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedStartups startups={featuredStartups} />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}
