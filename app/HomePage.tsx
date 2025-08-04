'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { StatsSection } from '@/components/stats-section';
import { FeaturedStartups } from '@/components/featured-startups';
import { TrustSection } from '@/components/trust-section';
import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import { Startup } from '@/types';

export default function HomePage() {
  const [role, setRole] = useState<string | undefined>('');
  const [data, setData] = useState<Startup[]>([]);

  useEffect(() => {
    const getSessionFromBetterAuth = async () => {
      const session = await authClient.getSession();

      if (!session) {
        console.log('No role');
        return;
      }

      setRole(session.data?.user.role);
      console.log('Session:', session);
    };

    const fetchData = async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
    };

    // Define and run the async function correctly
    const runEffect = async () => {
      await getSessionFromBetterAuth();
      await fetchData();
    };

    runEffect();
  }, []);

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
