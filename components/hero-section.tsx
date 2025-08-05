'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { BetterAuthSession } from '@/types';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import Loading from '@/app/loading';

export function HeroSection() {
  const [session, setSession] = useState<BetterAuthSession | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await authClient.getSession();

      if (error) {
        setSession(null);
      } else {
        setSession(data?.user || ({} as any));
      }
    };

    getSession();
  }, []);

  if (!session) {
    <Loading />;
  }

  const role = session?.role;

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
          Accelerate Ethiopia
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-800 md:text-2xl">
          Discover startups officially recognized and verified by Ethiopia’s
          national startup support framework. Connect with forward-thinking
          founders driving innovation across the country.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            <Link href="/startups">
              Explore Startups <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link
              href={
                role === 'startup' ? '/submit/startup-info' : '/submit/verify'
              }
            >
              Submit Your Startup
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
