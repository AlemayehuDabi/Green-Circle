'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Startup as StartupType } from '@/types';

import { getStartupById } from '@/lib/call-api/call-api';
import { Header } from '@/components/header';
import { ImageWithFallback } from '@/components/image-withfallback';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator'; // Optional: implies you might need a separator, or we use borders

import {
  ArrowLeft,
  Calendar,
  Globe,
  MapPin,
  Users,
  Mail,
  Phone,
  ImageIcon,
  UserIcon,
  Award,
  Heart,
  Linkedin,
  ExternalLink,
  Twitter, // Replaced custom SVG with Lucide icon if available, or keep yours
  PlayCircle,
} from 'lucide-react';

import Loading from '@/app/loading';

export default function StartupDetailPage({ id }: { id: string }) {
  const [startup, setStartup] = useState<StartupType | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

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

  const gallery = startup.images || [];
  const video = startup.video ;

  return (
    <section className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-24">
        
        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="pl-0 hover:bg-transparent text-slate-600 hover:text-slate-900">
            <Link href="/startups" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Startups</span>
            </Link>
          </Button>
        </div>

        {/* Header Section */}
        <div className="relative mb-8">
          {/* Banner Pattern */}
          <div className="w-full h-48 md:h-64 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-sm">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>

          {/* Startup Identity Card */}
          <div className="relative mx-4 md:mx-8 -mt-12 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
            
            <div className="flex items-end gap-6">
              {/* Logo */}
              <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-xl border-4 border-white shadow-lg bg-white overflow-hidden">
                <ImageWithFallback
                  src={startup.logo || '/placeholder.svg'}
                  alt={startup.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Text Info */}
              <div className="mb-2 text-slate-900">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{startup.name}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                    {startup.sector}
                  </Badge>
                  {startup.location && (
                    <span className="flex items-center text-sm text-slate-500">
                      <MapPin className="h-3.5 w-3.5 mr-1" /> {startup.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-2 w-full md:w-auto">
              {startup.website && (
                <Button asChild variant="outline" className="bg-white border-slate-200 shadow-sm">
                  <Link href={startup.website} target="_blank">
                    <Globe className="mr-2 h-4 w-4" /> Website
                  </Link>
                </Button>
              )}
              <Button 
                variant="secondary"
                onClick={() => setLiked(!liked)}
                className={`bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors ${liked ? 'text-red-500' : 'text-slate-600'}`}
              >
                <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                {liked ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">

          {/* LEFT SIDEBAR (Sticky) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Quick Stats Card */}
              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
                  <CardTitle className="text-base font-semibold text-slate-800">Company Details</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    <div className="flex items-center justify-between p-4">
                      <span className="flex items-center text-slate-500 text-sm gap-2"><Calendar className="h-4 w-4" /> Founded</span>
                      <span className="font-medium text-slate-900">{startup.foundedYear || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <span className="flex items-center text-slate-500 text-sm gap-2"><Users className="h-4 w-4" /> Team Size</span>
                      <span className="font-medium text-slate-900">{startup.employees}</span>
                    </div>
                    {startup.contact?.email && (
                      <div className="flex items-center justify-between p-4">
                        <span className="flex items-center text-slate-500 text-sm gap-2"><Mail className="h-4 w-4" /> Email</span>
                        <a href={`mailto:${startup.contact.email}`} className="text-emerald-600 text-sm hover:underline truncate max-w-[150px]">
                          {startup.contact.email}
                        </a>
                      </div>
                    )}
                    {startup.contact?.phone && (
                      <div className="flex items-center justify-between p-4">
                        <span className="flex items-center text-slate-500 text-sm gap-2"><Phone className="h-4 w-4" /> Phone</span>
                        <a href={`tel:${startup.contact.phone}`} className="text-emerald-600 text-sm hover:underline">
                          {startup.contact.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements Card */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    Key Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {startup.achievements?.length ? (
                    <ul className="space-y-3">
                      {startup.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                          <div className="mt-1.5 h-1.5 w-1.5 min-w-[6px] bg-emerald-500 rounded-full" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500 text-sm italic">No achievements listed.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-8">

            {/* About Section */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">About {startup.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  {startup.description}
                </div>
              </CardContent>
            </Card>

            {/* Media Gallery */}
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-slate-500" />
                  <CardTitle className="text-lg">Gallery & Media</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                {/* Video - Featured at top if exists */}
                {video && (
                   <div className="mb-6 rounded-xl overflow-hidden shadow-sm border border-slate-100 aspect-video bg-black relative group">
                     <iframe
                       src={video}
                       className="w-full h-full"
                       allowFullScreen
                       title="Startup Video"
                     />
                   </div>
                )}

                {/* Image Grid */}
                {gallery.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gallery.map((img, i) => (
                      <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 group">
                        <img
                          src={img}
                          alt={`Gallery ${i}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  !video && <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">No media available for this startup.</div>
                )}
              </CardContent>
            </Card>

            {/* Founders Section */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-slate-500" />
                Founders & Team
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-5">
                {startup.founders.map((f, i) => (
                  <Card key={i} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Founder Avatar */}
                        <div className="h-14 w-14 shrink-0 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                          {f.image ? (
                            <img src={f.image} className="h-full w-full object-cover" alt={f.name} />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-slate-400">
                              <UserIcon className="h-7 w-7" />
                            </div>
                          )}
                        </div>
                        
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 truncate">{f.name}</h3>
                          {/* Optional: Add Role if available in data */}
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Co-Founder</p>
                          <p className="text-sm text-slate-600 line-clamp-2 mb-3 text-pretty">{f.bio}</p>

                          {/* Horizontal Social Icons */}
                          <div className="flex items-center gap-2">
                            {f.email && (
                              <Button asChild size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full">
                                <a href={`mailto:${f.email}`} title="Email">
                                  <Mail className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {f.linkedin && (
                              <Button asChild size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                                <a href={f.linkedin} target="_blank" title="LinkedIn">
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {f.x && (
                              <Button asChild size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-black hover:bg-slate-100 rounded-full">
                                <a href={f.x} target="_blank" title="X (Twitter)">
                                  <svg viewBox="0 0 1200 1227" className="h-3.5 w-3.5 fill-current"><path d="M714 519l475-519H953L602 392 328 0H0l483 682L0 1227h247l330-360 291 360h328L714 519z"/></svg>
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}