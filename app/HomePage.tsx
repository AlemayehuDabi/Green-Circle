'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { StatsSection } from '@/components/stats-section';
import { FeaturedStartups } from '@/components/featured-startups';
import { TrustSection } from '@/components/trust-section';
import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import Loading from './startups/loading';
import { BetterAuthSession, Startup } from '@/types';
import AdminDashboard from './admin/adminDash';

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
        const response = await fetch('/api/startups');
        const result = await response.json();

        if (result.success) {
          console.log('Admin fetch:', result);
          const mappedData = result.startups.map((item: any) => ({
            _id: item._id,
            name: item.name,
            founders: item.founders,
            sector: item.sector,
            createdAt: item.createdAt,
            employees: item.employees,
            revenue: item.revenue,
            location: item.location,
            status: item.status,
            fayda_verified: item.fayda_verified,
            logo: item.logo,
            description: item.description,
            foundedYear: item.foundedYear,
            website: item.website,
            verified: item.verified,
            pitch: item.pitch,
            achievements: item.achievements,
            contact: item.contact,
          }));
          setData(mappedData);
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
      <Header session={session} />
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
