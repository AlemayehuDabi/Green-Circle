'use client';

import { ShieldCheck, Layers, TrendingUp } from 'lucide-react';

export function StatsSection() {
  const stats = [
    { 
      value: '150+', 
      label: 'Verified Startups', 
      icon: ShieldCheck,
    },
    { 
      value: '25+', 
      label: 'Industry Sectors', 
      icon: Layers,
    },
    { 
      value: '500+', 
      label: 'Active Investors', 
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      {/* Container Box */}
      <div className="mx-auto max-w-6xl bg-white rounded-2xl border border-slate-200 shadow-sm">
        
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 divide-y divide-slate-100 md:divide-y-0 md:divide-x">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <div key={index} className="group p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50/50 transition-colors first:rounded-t-2xl md:first:rounded-l-2xl md:first:rounded-tr-none last:rounded-b-2xl md:last:rounded-r-2xl md:last:rounded-bl-none">
                
                {/* Icon with soft emerald background */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Number */}
                <div className="mb-1 text-4xl font-bold text-slate-900 tracking-tight">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}