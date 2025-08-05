'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users } from 'lucide-react';
import type { Startup } from '@/types';
import Image from 'next/image';
import { useState } from 'react'; // Import useState
import { cn } from '@/lib/utils';

interface StartupCardProps {
  startup: Startup;
}

export function StartupCard({ startup }: StartupCardProps) {
  const [imageError, setImageError] = useState(false); // State to track image loading error

  // Generate initials for fallback
  const initials = startup.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2); // Take first two initials

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {imageError || !startup.logo ? (
              // Fallback div if image fails or no logo URL is provided
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 text-gray-600 font-semibold text-lg">
                {initials}
              </div>
            ) : (
              // Original Image component
              <Image
                src={startup.logo || '/placeholder.svg'} // Use startup.logo directly
                alt={startup.name}
                width={48}
                height={48}
                className="rounded-lg object-cover"
                onError={() => setImageError(true)} // Set imageError to true on error
              />
            )}
            <div>
              <h3 className="font-semibold text-gray-900">{startup.name}</h3>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <MapPin className="h-3 w-3" />
                <span>{startup.location}</span>
              </div>
            </div>
          </div>
          {startup.status && (
            <Badge
              variant="secondary"
              className={cn(
                startup.status.toLowerCase() === 'rejected'
                  ? 'text-red-700 bg-red-100'
                  : startup.status.toLowerCase() === 'pending'
                  ? 'text-yellow-700 bg-yellow-100'
                  : 'text-emerald-700 bg-emerald-100'
              )}
            >
              {startup.status === 'approved' ? 'Verified' : startup.status}
            </Badge>
          )}
        </div>
        <Badge variant="outline" className="mb-3">
          {startup.sector}
        </Badge>
        <p className="mb-4 line-clamp-2 text-sm text-gray-800">
          {startup.description}
        </p>
        <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{startup.employees}</span>
          </div>
          <span>Founded {startup.foundedYear}</span>
        </div>
        <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600">
          <Link href={`/startups/${startup._id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
