'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { BetterAuthSession } from '@/types';
import { Button } from '@/components/ui/button';
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"; // Ensure path matches your file
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [session, setSession] = useState<BetterAuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await authClient.getSession();
        setSession(data?.user || null);
      } catch (error) {
        console.error("Failed to fetch session", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  // Determine where the "Submit" button goes based on role
  const submitLink = session?.role === 'startup' 
    ? '/submit/startup-info' 
    : '/submit/verify';

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-white px-4 pt-20 pb-32 sm:px-6 lg:px-8">
      
      {/* 1. Background Grid - Subtle and Premium */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatedGridPattern
          numSquares={40}
          maxOpacity={0.25}
          duration={4}
          repeatDelay={0.5}
          // The mask makes it fade into white at the bottom and edges
          className={cn(
            "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-20%] h-[150%]" 
          )} 
        />
      </div>

      {/* 2. Main Content */}
      <div className="relative z-10 max-w-4xl text-center space-y-8">
        
        {/* Top Badge / Pill */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <Link 
            href="/about"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-emerald-600 backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-3.5 w-3.5 text-emerald-500" />
            <span>Powering Ethiopia&apos;s Digital Future</span>
            <ChevronRight className="ml-1 h-3 w-3 text-slate-400" />
          </Link>
        </div>

        {/* Headlines */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-backwards">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl">
            Green <span className="text-emerald-600 relative">
              Circle
              {/* Optional: Creative underline/highlight */}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-emerald-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.4" />
              </svg>
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed md:text-xl">
            The forefront of Ethiopian innovation. Join a curated community of 
            verified startups, visionary investors, and global opportunities.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out fill-mode-backwards">
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg hover:shadow-emerald-200/50 transition-all rounded-full"
          >
            <Link href="/startups">
              Explore Startups <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="h-12 px-8 text-base border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-emerald-700 hover:border-emerald-200 transition-all rounded-full"
          >
            <Link href={submitLink}>
              {loading ? 'Loading...' : 'Submit Your Startup'}
            </Link>
          </Button>
        </div>
      </div>

      {/* 3. Bottom Scroll Fade - seamless blend to next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/80 to-transparent z-20" />
    </section>
  );
}