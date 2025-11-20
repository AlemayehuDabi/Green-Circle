'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { BetterAuthSession } from '@/types';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import Loading from '@/app/loading';
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";


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
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background animation */}
       <div className="absolute inset-0 z-0">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.2}
          duration={3}
          repeatDelay={1}
          className="[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]
           inset-x-0 h-full " 
        />
      </div>

      {/* Centered content */}
      <div className="relative z-10 max-w-3xl text-center">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
          Green Circle
        </h1>

        <p className="mx-auto mb-8 text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed">
          The forefront of Ethiopian innovation. A curated community of verified startups building for a global stage. Discover the talent, the drive, and the future.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 font-semibold transition-colors"
          >
            <Link href="/startups">
              Explore Startups <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="font-semibold">
            <Link href={role === 'startup' ? '/submit/startup-info' : '/submit/verify'}>
              Submit Your Startup
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-0 w-full h-10 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}