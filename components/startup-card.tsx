'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, ShieldCheck } from 'lucide-react';
import type { Startup } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface StartupCardProps {
  startup: Startup;
}

export function StartupCard({ startup }: StartupCardProps) {
  const [imageError, setImageError] = useState(false);

  const initials = startup.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <Card className="group border border-gray-200 transition-shadow hover:shadow-xl rounded-xl">
      {/* Optional Banner / Sector Color Block */}
      <div className="h-24 w-full rounded-t-xl bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-80"></div>

      <CardContent className="p-6 -mt-8">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {imageError || !startup.logo ? (
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-gray-700 font-semibold text-xl">
                {initials}
              </div>
            ) : (
              <Image
                src={startup.logo}
                alt={startup.name}
                width={56}
                height={56}
                className="rounded-xl border border-gray-200 object-cover"
                onError={() => setImageError(true)}
              />
            )}

            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {startup.name}
              </h3>

              {/* Location */}
              {startup.location && (
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <MapPin className="h-3 w-3" />
                  <span>{startup.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Verified Badge (Premium YC-style) */}
          {startup.status === 'approved' && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200"
            >
              <ShieldCheck className="h-4 w-4" />
              Verified
            </Badge>
          )}
        </div>

        {/* SECTOR */}
        <div className="mt-4">
          <Badge
            variant="outline"
            className="text-xs border-gray-300 text-gray-700 rounded-md"
          >
            {startup.sector}
          </Badge>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-3 text-sm text-gray-700 line-clamp-2">
          {startup.description}
        </p>

        {/* META */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{startup.employees || '0'} Members</span>
          </div>

          <span>
            Founded {startup.foundedYear ? startup.foundedYear : '—'}
          </span>
        </div>

        {/* CTA */}
        <Button
          asChild
          className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700"
        >
          <Link href={`/startups/${startup._id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
