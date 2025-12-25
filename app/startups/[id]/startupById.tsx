'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Startup as StartupType } from '@/types';
import { getStartupById } from '@/lib/call-api/call-api';
import { Header } from '@/components/header';
import { ImageWithFallback } from '@/components/image-withfallback';
import { Target, Quote, Zap } from 'lucide-react';
import { ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import {
  ArrowLeft,
  Calendar,
  Globe,
  MapPin,
  Users,
  Mail,
  Phone,
  Building2,
  TrendingUp,
  CheckCircle2,
  Linkedin,
  Share2,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

import Loading from '@/app/loading';

export default function StartupDetailPage({ id }: { id: string }) {
  const [startup, setStartup] = useState<StartupType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getStartupById(id);
        if (!data) return notFound();
        setStartup(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);
 

  if (loading) return <Loading />;
  if (!startup) return notFound();

  console.log("this is a single startup data: ", startup)

  // Data Safety
  const gallery = (startup as any).images || [];
  const video = (startup as any).video || null;
  const achievements = (startup as any).achievements || [];
  const logoUrl = startup.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(startup.name)}&background=random&size=200`;

    return (
    <section className="min-h-screen bg-slate-50 font-sans pb-20">
      <Header />

      {/* --- HERO SECTION (Matches Card Style) --- */}
      <div className="relative w-full">

         {/* Pattern Overlay */}
      <div className="absolute border-4  inset-0 opacity-10 h-96 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] "></div>

          

        {/* 1. Dark Gradient Banner */}
        <div className={`relative h-64 md:h-80 w-full ${!startup.banner && "bg-linear-to-r from-slate-800 to-slate-900"}`}>
          
          {/* The Actual Banner Image */}
         {startup.banner ? (
            <ImageWithFallback
               src={startup.banner}
               alt={`${startup.name} banner`}
               fill
               priority
               className="object-cover"
               />
            ) : (
               // Fallback if no banner image exists
               <div className="absolute inset-0 bg-linear-to-r from-slate-800 to-slate-900" />
            )}
          
             {/* THIS IS THE FIX: A gradient overlay that is transparent at the top and dark at the bottom */}
    {/* <div className="absolute inset-0 bg-linear-to-t from-2% from-emerald-700/90 via-15% via-emerald-700/50 to-transparent" /> */}

          {/* Navigation (Absolute Top Left) */}
         <div className="absolute top-6 left-4 md:left-8 z-20">
            <Button asChild variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm">
              <Link href="/startups" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Registry</span>
              </Link>
            </Button>
         </div>

          {/* Verified Badge (Absolute Top Right) */}
          {startup.status === 'approved' && (
            <div className="absolute top-6 right-4 md:right-8 z-20">
               <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none gap-1.5 px-3 py-1.5 text-sm shadow-sm backdrop-blur-sm">
                 <ShieldCheck className="h-4 w-4" /> Verified Active
               </Badge>
            </div>
          )}
        </div>

        {/* 2. Overlapping Identity Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative -mt-20 md:-mt-24 mb-8  py-2 rounded-lg">

           <div className="flex flex-col md:flex-row items-end gap-6 rounded-l-xl rounded-r-sm pr-2">
              
              {/* Logo Box (Square, White Border) */}
              <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-xl border-4 border-white bg-white shadow-md overflow-hidden shrink-0">
                 <ImageWithFallback
                    src={logoUrl}
                    alt={startup.name}
                    fill
                    className="object-cover"
                 />
              </div>

              {/* Text Info (Sits on top of the banner/white background transition) */}
              <div className="flex-1 pb-2 w-full">
                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    
                    <div>
                       <div className="flex items-center gap-3 mb-2">
                          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-md md:drop-shadow-lg">
                             {startup.name}
                          </h1>
                       </div>
                       <div className="flex flex-wrap items-center gap-3 text-slate-600 md:text-gray-700 font-medium">
                          <span className="flex items-center gap-1.5">
                             <Briefcase className="h-4 w-4 opacity-80" /> {startup.sector}
                          </span>
                          <span className="hidden md:inline">•</span>
                          <span className="flex items-center gap-1.5">
                             <MapPin className="h-4 w-4 opacity-80" /> {startup.location}
                          </span>
                       </div>
                    </div>

                    {/* Primary Call to Action */}
                    <div className="flex gap-3">
                       <Button variant="outline" className="bg-white border-slate-200 shadow-sm text-slate-700">
                          <Share2 className="mr-2 h-4 w-4" /> Share
                       </Button>
                       {startup.website && (
                         <Button asChild className="bg-slate-900 hover:bg-emerald-600 text-white border-none shadow-md transition-colors">
                           <Link href={startup.website} target="_blank">
                             <Globe className="mr-2 h-4 w-4" /> Visit Website
                           </Link>
                         </Button>
                       )}
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN: Narrative & Team (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">

            {/* PROBLEM / SOLUTION (Executive Summary) */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="bg-slate-50/50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    The Mission & Solution
                  </h2>
               </div>
               <div className="p-6 md:p-8">
                  <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg">
                    {/* Visual formatting for the description */}
                    <div className="flex gap-4 items-start">
                       <Quote className="h-8 w-8 text-slate-300 shrink-0 transform scale-x-[-1]" />
                       <p className="mt-0">{startup.description}</p>
                    </div>
                  </div>
                  
                  {/* Visual 'Tags' for context */}
                  <div className="mt-6 flex gap-2">
                     <Badge variant="outline" className="text-slate-600 border-slate-300">
                        <Zap className="h-3 w-3 mr-1 text-amber-500" /> Tech-Enabled
                     </Badge>
                     <Badge variant="outline" className="text-slate-600 border-slate-300">
                        {startup.sector}
                     </Badge>
                  </div>
               </div>
            </section>

            {/* TRACTION / MILESTONES */}
            {achievements.length > 0 && (
              <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    Key Milestones & Traction
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid gap-4">
                     {achievements.map((item: string, i: number) => (
                       <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100 transition-colors hover:border-emerald-200 hover:bg-emerald-50/30">
                          <div className="mt-1 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                             <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{item}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
              </section>
            )}

            {/* FOUNDERS SECTION */}
            <section>
               <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <Users className="h-5 w-5 text-slate-500" />
                  Leadership Team
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {startup.founders.map((f: any, i: number) => (
                     <Card key={i} className="border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                        <CardContent className="p-6">
                           <div className="flex items-start gap-4 mb-4">
                              <div className="h-16 w-16 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                                 <ImageWithFallback 
                                    src={f.image} // Pass individual founder image
                                    fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&background=random`}
                                    fill 
                                    alt={f.name}
                                    className="object-cover"
                                 />
                              </div>
                              <div className="min-w-0">
                                 <h3 className="font-bold text-lg text-slate-900 truncate group-hover:text-blue-700 transition-colors">{f.name}</h3>
                                 <p className="text-sm font-medium text-blue-600 mb-1">{f.role || "Co-Founder"}</p>
                                 <div className="flex gap-2">
                                    {f.linkedin && (
                                       <a href={f.linkedin} target="_blank" className="text-slate-400 hover:text-blue-700 transition-colors">
                                          <Linkedin className="h-4 w-4" />
                                       </a>
                                    )}
                                    {f.email && (
                                       <a href={`mailto:${f.email}`} className="text-slate-400 hover:text-emerald-600 transition-colors">
                                          <Mail className="h-4 w-4" />
                                       </a>
                                    )}
                                 </div>
                              </div>
                           </div>
                           
                           {/* Bio Text */}
                           <div className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 line-clamp-3">
                              {f.bio ? f.bio : "Entrepreneur focused on solving local challenges through technology."}
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </section>
            
            {/* Gallery (Small) */}
            {gallery.length > 0 && (
               <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Product Visuals</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                     {gallery.map((img: string, i: number) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer hover:opacity-90 transition-opacity">
                           <ImageWithFallback src={img} alt="Product" fill className="object-cover" sizes="150px" />
                        </div>
                     ))}
                  </div>
               </div>
            )}

          </div>

          {/* RIGHT COLUMN: Contact & Actions (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CONTACT HUB CARD */}
            
            <Card className="border-blue-200 shadow-sm bg-white top-24">
               <CardHeader className="pb-3">
                  <CardTitle className="text-base font-bold text-blue-900 flex items-center gap-2">
                     <Mail className="h-4 w-4" /> Connect with {startup.name}
                  </CardTitle>
               </CardHeader>
               <CardContent className="grid gap-4">
                  
                  {/* Website Button */}
                  {startup.website && (
                     <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all">
                        <Link href={startup.website} target="_blank">
                           <ExternalLink className="mr-2 h-4 w-4" /> Visit Website
                        </Link>
                     </Button>
                  )}

                  <Separator className="bg-blue-200/50" />

                  {/* Contact Details List */}
                  <div className="space-y-3">
                     {startup.contact?.email ? (
                        <div className="flex items-center gap-3 text-sm p-2 rounded-md hover:bg-white transition-colors border border-transparent hover:border-slate-100 group/item">
                           <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                              <Mail className="h-4 w-4" />
                           </div>
                           <div className="overflow-hidden">
                              <p className="text-xs text-slate-500 font-medium">Email Inquiries</p>
                              <a href={`mailto:${startup.contact.email}`} className="font-semibold text-slate-900 truncate block hover:underline">
                                 {startup.contact.email}
                              </a>
                           </div>
                        </div>
                     ) : (
                        <div className="flex items-center gap-3 text-sm text-slate-400 p-2">
                           <Mail className="h-4 w-4" /> No email provided
                        </div>
                     )}

                     {startup.contact?.phone && (
                        <div className="flex items-center gap-3 text-sm p-2 rounded-md hover:bg-white transition-colors border border-transparent hover:border-slate-100">
                           <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                              <Phone className="h-4 w-4" />
                           </div>
                           <div>
                              <p className="text-xs text-slate-500 font-medium">Direct Line</p>
                              <a href={`tel:${startup.contact.phone}`} className="font-semibold text-slate-900 hover:underline">
                                 {startup.contact.phone}
                              </a>
                           </div>
                        </div>
                     )}

                     <div className="flex items-center gap-3 text-sm p-2">
                        <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                           <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                           <p className="text-xs text-slate-500 font-medium">Headquarters</p>
                           <p className="font-medium text-slate-900">{startup.location}</p>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
         

            {/* Quick Summary Card */}
            <Card className="border-slate-200 shadow-sm">
               <CardHeader className="pb-3 border-b border-slate-50">
                  <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                     Classification
                  </CardTitle>
               </CardHeader>
               <CardContent className="pt-4 space-y-4">
                  <div>
                     <p className="text-xs text-slate-500 mb-1">Primary Sector</p>
                     <p className="font-medium text-slate-900">{startup.sector}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                       <p className="text-xs text-slate-500 mb-1">Founded</p>
                       <p className="font-medium text-slate-900">{startup.foundedYear || 'N/A'}</p>
                    </div>
                    <div>
                       <p className="text-xs text-slate-500 mb-1">Team Size</p>
                       <p className="font-medium text-slate-900">{startup.employees || 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                     <p className="text-xs text-slate-500 mb-1">Operational Status</p>
                     <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm font-medium text-slate-900">Active / Operational</span>
                     </div>
                  </div>
               </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </section>
  );
}