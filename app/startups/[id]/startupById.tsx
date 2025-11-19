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

import {
  ArrowLeft,
  Calendar,
  Globe,
  MapPin,
  Users,
  Mail,
  Phone,
  ImageIcon,
  VideoIcon,
  UserIcon,
  Award,
  Heart,
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

  // Neutral placeholders (better UI)
  const gallery = startup.images || [null, null, null];
  const video = startup.video || null;

  return (
    <section className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 pt-10 pb-20">
        {/* Back button */}
        <Button asChild variant="ghost" className="mb-6 text-gray-700 hover:text-gray-900">
          <Link href="/startups">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Startups
          </Link>
        </Button>

        {/* =====================  BANNER  ===================== */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-16 shadow bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />

        {/* Floating logo + name + Like button */}
        <div className="flex justify-between items-start px-2 mb-10">
          <div className="bg-white shadow-lg p-4 rounded-xl flex items-center space-x-4 -mt-16 ml-6">
            <ImageWithFallback
              src={startup.logo || '/placeholder.svg'}
              alt={startup.name}
              width={90}
              height={90}
              className="rounded-xl bg-gray-100"
            />
            <div>
              <h1 className="text-3xl font-bold">{startup.name}</h1>
              <Badge className="mt-1">{startup.sector}</Badge>
            </div>
          </div>

          {/* Like Button */}
          <button
            onClick={() => setLiked(!liked)}
            className={`p-3 rounded-full shadow bg-white mr-6 transition ${
              liked ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            <Heart className={`h-6 w-6 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* =====================  MAIN LAYOUT  ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT SIDEBAR */}
          <div className="space-y-6">

            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700">

                {startup.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5" />
                    {startup.location}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  Founded: {startup.foundedYear || 'N/A'}
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  Employees: {startup.employees}
                </div>

                {startup.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5" />
                    <Link href={startup.website} target="_blank" className="text-emerald-600 hover:underline">
                      {startup.website}
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                {startup.contact?.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5" />
                    <a href={`mailto:${startup.contact.email}`} className="text-emerald-600">
                      {startup.contact.email}
                    </a>
                  </div>
                )}
                {startup.contact?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5" />
                    <a href={`tel:${startup.contact.phone}`} className="text-emerald-600">
                      {startup.contact.phone}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* MIDDLE SECTION */}
          <div className="lg:col-span-2 space-y-10">

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About {startup.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 leading-relaxed text-lg">
                  {startup.description}
                </p>
              </CardContent>
            </Card>

            {/* Pitch */}
            <Card>
              <CardHeader>
                <CardTitle>Pitch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 leading-relaxed">
                  {startup.pitch || 'No pitch available.'}
                </p>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <Award className="h-5 w-5 text-gray-700" />
                <CardTitle>Key Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                {startup.achievements?.length ? (
                  <ul className="space-y-2">
                    {startup.achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 bg-emerald-500 rounded-full" />
                        {a}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No achievements listed.</p>
                )}
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-gray-600" />
                <CardTitle>Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {gallery.map((img, i) => (
                    <div
                      key={i}
                      className="rounded-xl h-40 w-full bg-gray-200 flex items-center justify-center text-gray-500"
                    >
                      {img ? (
                        <img src={img} alt="" className="w-full h-full rounded-xl object-cover" />
                      ) : (
                        <ImageIcon className="h-8 w-8 opacity-50" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <VideoIcon className="h-5 w-5 text-gray-700" />
                <CardTitle>Pitch Video</CardTitle>
              </CardHeader>
              <CardContent>
                {video ? (
                  <iframe
                    src={video}
                    className="w-full aspect-video rounded-xl shadow"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full aspect-video bg-gray-200 flex items-center justify-center rounded-xl">
                    <VideoIcon className="h-10 w-10 text-gray-500" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Team */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-gray-700" />
                <CardTitle>Founders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {startup.founders.map((f, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="rounded-full h-16 w-16 bg-gray-200 flex items-center justify-center overflow-hidden">
                        {f.image ? (
                          <img src={f.image} className="h-full w-full object-cover" alt={f.name} />
                        ) : (
                          <UserIcon className="h-8 w-8 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{f.name}</h3>
                        <p className="text-gray-700 text-sm">{f.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
