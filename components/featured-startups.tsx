import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StartupCard } from '@/components/startup-card';
import { Startup } from '@/types'; // Assuming your types are in a separate file like "@/types/index"

interface FeaturedStartupsProps {
  startups: Startup[];
}

export function FeaturedStartups({ startups }: FeaturedStartupsProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Featured Startups
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Discover some of the most promising verified startups in
            Ethiopia&apos;s ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {startups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/startups">View All Startups</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
