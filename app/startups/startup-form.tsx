'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { StartupCard } from '@/components/startup-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Startup } from '@/types';
import { getStartups } from '@/lib/call-api/call-api';
import Loading from './loading';

export default function StartupsForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [startup, setStartup] = useState<Startup[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const data = await getStartups();
        setStartup(data);
      } catch (err) {
        console.error('Failed to load startups:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const filteredStartups = startup?.filter((startup) => {
    const matchesSearch =
      startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector =
      selectedSector === 'all' ||
      startup.sector.toLowerCase() === selectedSector;
    const matchesLocation =
      selectedLocation === 'all' ||
      startup.location.toLowerCase().includes(selectedLocation);

    return matchesSearch && matchesSector && matchesLocation;
  });

  //

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="startups" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Startup Directory
          </h1>
          <p className="text-gray-800">
            Discover {startup?.length} verified startups approved under
            Ethiopia&apos;s national Startup Law
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-800" />
            <Input
              placeholder="Search startups..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Sectors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="fintech">FinTech</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="energy">Clean Energy</SelectItem>
              <SelectItem value="logistics">Logistics</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="addis">Addis Ababa</SelectItem>
              <SelectItem value="bahir">Bahir Dar</SelectItem>
              <SelectItem value="mekelle">Mekelle</SelectItem>
              <SelectItem value="hawassa">Hawassa</SelectItem>
              <SelectItem value="dire">Dire Dawa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Startup Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStartups?.map((startup) => (
            <StartupCard key={startup._id} startup={startup} />
          ))}
        </div>

        {filteredStartups?.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">
              No startups found matching your criteria.
            </p>
          </div>
        )}

        {/* Load More */}
        {Array.isArray(filteredStartups) && filteredStartups.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Startups
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
