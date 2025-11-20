'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StartupCard } from '@/components/startup-card';
import { Startup } from '@/types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedStartupsProps {
  startups: Startup[];
}

export function FeaturedStartups({ startups }: FeaturedStartupsProps) {
  // We only want to show the top 3 cards for the "Featured" section
  const featuredList = startups.slice(0, 6);

  if (!startups || startups.length === 0) {
    return null; // Don't render the section if no data exists
  }

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      
      {/* Background Decoration (Optional subtle gradient blob) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl mix-blend-multiply" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-1.5 shadow-sm mb-2">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Ecosystem Highlights
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Featured Startups
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            Discover the most promising verified companies shaping the future of 
            <span className="text-emerald-700 font-medium"> Ethiopia&apos;s </span> 
            innovation ecosystem.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredList.map((startup) => (
            <div key={startup._id} className="h-full">
              <StartupCard startup={startup} />
            </div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-16 text-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:text-emerald-700 hover:border-emerald-200 shadow-sm transition-all px-8 h-12 text-base"
          >
            <Link href="/startups" className="flex items-center gap-2">
              Explore All Startups
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}