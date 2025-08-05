'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { StatsSection } from '@/components/stats-section';
import { FeaturedStartups } from '@/components/featured-startups';
import { TrustSection } from '@/components/trust-section';
import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import Loading from './loading';
import { BetterAuthSession, Startup } from '@/types';
import AdminDashboard from './admin/adminDash';
import { filterStartup } from '@/lib/call-api/call-api';

export default function HomePage() {
  const [data, setData] = useState<Startup[]>([]);
  const [session, setSession] = useState<BetterAuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getSession = async () => {
        const { data, error } = await authClient.getSession();

        if (error) {
          setSession(null);
        } else {
          setSession(data?.user || ({} as any));
        }
      };

      const fetchData = async () => {
        const startups = await filterStartup();
        if (startups) {
          setData(startups);
        } else {
          setData([]);
        }
      };

      // Define and run the async function correctly
      const runEffect = async () => {
        await getSession();
        await fetchData();
      };

      runEffect();
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (session?.role === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedStartups startups={data} />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}
