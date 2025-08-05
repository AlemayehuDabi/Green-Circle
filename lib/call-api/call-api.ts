import { RawStartup, Startup } from '@/types';
import { notFound } from 'next/navigation';
import { authClient } from '../auth-client';

// Get single startup by ID
export const getStartupById = async (
  id: string
): Promise<Startup | undefined> => {
  try {
    const res = await fetch(`/api/startups`);
    if (!res.ok) throw new Error('Failed to fetch startups');

    const data = await res.json();
    const startups: RawStartup[] = data.startups;

    const found = startups.find((s) => s._id === id);
    if (!found) return notFound();

    const transformed: Startup = {
      _id: found._id,
      name: found.name,
      logo: '', // Add logo logic here if needed
      sector: found.sector,
      location: found.location,
      description: found.description,
      foundedYear: Number(found.foundedYear),
      employees: found.employees,
      website: found.website || '',
      status: found.status,
      founders: found.founders,
      founderRole: found.founderRole,
      founderBio: found.founderBio,
      pitch: found.pitch,
      achievements: found.achievements
        ? found.achievements.split(',').map((a) => a.trim())
        : [],
      contact: {
        email: found.founderEmail,
        phone: found.founderPhone,
      },
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
    };

    return transformed;
  } catch (err) {
    console.error('Error in getStartupById:', err);
    throw err;
  }
};

// Get all startups
export const getStartups = async (): Promise<Startup[]> => {
  try {
    const res = await fetch(`/api/startups`);
    if (!res.ok) throw new Error('Failed to fetch startups');

    const data = await res.json();
    const startups: RawStartup[] = data.startups;

    if (!startups || startups.length === 0) return notFound();

    const transformed: Startup[] = startups.map((s) => ({
      _id: s._id,
      name: s.name,
      logo: '', // Add logo logic here if needed
      sector: s.sector,
      location: s.location,
      description: s.description,
      foundedYear: Number(s.foundedYear),
      employees: s.employees,
      website: s.website || '',
      status: s.status,
      founders: s.founders,
      founderRole: s.founderRole,
      founderBio: s.founderBio,
      pitch: s.pitch,
      achievements: s.achievements
        ? s.achievements.split(',').map((a) => a.trim())
        : [],
      contact: {
        email: s.founderEmail,
        phone: s.founderPhone,
      },
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    }));

    return transformed;
  } catch (err) {
    console.error('Error in getStartups:', err);
    throw err;
  }
};

// Get startups associated with the logged-in user
export const userStartups = async (): Promise<Startup[]> => {
  try {
    const session = await authClient.getSession();
    const userEmail = session?.data?.user?.email;

    if (!userEmail) throw new Error('No user session');

    const res = await fetch(`/api/startups`);
    if (!res.ok) throw new Error('Failed to fetch startups');

    const data = await res.json();
    const startups: RawStartup[] = data.startups;

    const transformed: Startup[] = startups.map((s) => ({
      _id: s._id,
      name: s.name,
      logo: '', // Add logo logic here if needed
      sector: s.sector,
      location: s.location,
      description: s.description,
      foundedYear: Number(s.foundedYear),
      employees: s.employees,
      website: s.website || '',
      status: s.status,
      founders: s.founders,
      founderRole: s.founderRole,
      founderBio: s.founderBio,
      pitch: s.pitch,
      achievements: s.achievements
        ? s.achievements.split(',').map((a) => a.trim())
        : [],
      contact: {
        email: s.founderEmail,
        phone: s.founderPhone,
      },
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    }));

    const filtered = transformed.filter((s) => s.contact?.email === userEmail);

    return filtered;
  } catch (err) {
    console.error('Error in userStartups:', err);
    throw err;
  }
};
