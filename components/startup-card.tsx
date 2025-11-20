'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import type { Startup } from '@/types';
import { ImageWithFallback } from '@/components/image-withfallback'; // Using the component we just made

interface StartupCardProps {
  startup: Startup;
}

export function StartupCard({ startup }: StartupCardProps) {
  
  return (
    <Card className="group flex flex-col h-full border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-emerald-200/60">
      
      {/* 1. Card Header / Banner */}
      <div className="relative h-24 w-full bg-gradient-to-r from-slate-800 to-slate-900">
        {/* Subtle Pattern Overlay (Matches Detail Page) */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        {/* Verified Badge (Positioned Absolute Top Right) */}
        {startup.status === 'approved' && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-emerald-500/90 hover:bg-emerald-500 text-white border-none gap-1 shadow-sm backdrop-blur-sm">
              <ShieldCheck className="h-3 w-3" /> Verified
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="relative pt-0 pb-4 flex-grow">
        {/* 2. Logo Section (Overlapping) */}
        <div className="-mt-10 mb-4 flex justify-between items-end">
          <div className="h-20 w-20 rounded-xl border-4 border-white bg-white shadow-sm overflow-hidden">
            <ImageWithFallback
              src={startup.logo}
              alt={startup.name}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Sector Badge (Next to logo, aligned bottom) */}
          <Badge variant="secondary" className="mb-1 bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200">
            {startup.sector}
          </Badge>
        </div>

        {/* 3. Text Content */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
              {startup.name}
            </h3>
          </div>
          
          {/* Location Line */}
          {startup.location && (
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">{startup.location}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed pt-2">
            {startup.description}
          </p>
        </div>
      </CardContent>

      {/* 4. Footer Info (Stats) */}
      <div className="px-6 pb-4 mt-auto">
        <div className="flex items-center justify-between py-3 border-t border-slate-100 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-slate-400" />
            <span>{startup.employees || '0'} Employees</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{startup.foundedYear || 'N/A'}</span>
          </div>
        </div>

        {/* 5. Button */}
        <Button 
          asChild 
          className="w-full bg-slate-900 hover:bg-emerald-600 text-white shadow-sm transition-all duration-300 group-hover:shadow-emerald-200/50"
        >
          <Link href={`/startups/${startup._id}`} className="flex items-center justify-center gap-2">
            View Details 
            <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>

    </Card>
  );
}