import { RawStartup, Startup } from '@/types';
import { notFound } from 'next/navigation';
import { authClient } from '../auth-client';

// get start-ups by id
export const getStartupById = async (id: string) => {
  try {
    const res = await fetch(`/api/startups`);
    if (!res.ok) throw new Error('Failed to fetch');

    const data = await res.json();
    const startups: RawStartup[] = data.startups;

    const found = startups.find((s) => s._id === id);
    if (!found) return notFound();

    return {
      _id: found._id,
      name: found.name,
      logo: '', // add logic if needed
      sector: found.sector,
      location: found.location,
      description: found.description,
      foundedYear: Number(found.foundedYear),
      employees: found.employees,
      website: found.website || '',
      status: found.status,
      founders: found.founders,
      pitch: found.pitch,
      achievements: found.achievements
        ? found.achievements.split(',').map((a) => a.trim())
        : [],
      contact: {
        email: found.founderEmail,
        phone: found.founderPhone,
      },
    };
  } catch (err) {
    console.error('Error in getStartupById:', err);
    throw err;
  }
};

// get all start-ups
export const getStartups = async (): Promise<Startup[]> => {
  try {
    const res = await fetch(`/api/startups`);
    if (!res.ok) throw new Error('Failed to fetch');

    const data = await res.json();
    const startups: RawStartup[] = data.startups;

    if (!startups || startups.length === 0) return notFound();

    const transformed: Startup[] = startups.map((s) => ({
      _id: s._id,
      name: s.name,
      logo: '', // Add logo logic if needed
      sector: s.sector,
      location: s.location,
      description: s.description,
      foundedYear: Number(s.foundedYear),
      employees: s.employees,
      website: s.website || '',
      status: s.status,
      founders: s.founders,
      pitch: s.pitch,
      achievements: s.achievements
        ? s.achievements.split(',').map((a) => a.trim())
        : [],
      contact: {
        email: s.founderEmail,
        phone: s.founderPhone,
      },
    }));

    return transformed;
  } catch (err) {
    console.error('Error in getStartups:', err);
    throw err;
  }
};

// get user start-up
export const userStartups = async (): Promise<Startup[]> => {
  try {
    const session = await authClient.getSession();
    const userEmail = session.data?.user.email;

    const res = await fetch(`/api/startups`);
    if (!res.ok) throw new Error('Failed to fetch');

    const data = await res.json();
    const startups: RawStartup[] = data.startups;

    if (!startups || startups.length === 0) return [];

    const transformed: Startup[] = startups.map((s) => ({
      _id: s._id,
      name: s.name,
      logo: '', // Add logo logic if needed
      sector: s.sector,
      location: s.location,
      description: s.description,
      foundedYear: Number(s.foundedYear),
      employees: s.employees,
      website: s.website || '',
      status: s.status,
      founders: s.founders,
      pitch: s.pitch,
      achievements: s.achievements
        ? s.achievements.split(',').map((a) => a.trim())
        : [],
      contact: {
        email: s.founderEmail,
        phone: s.founderPhone,
      },
    }));

    // filter only the startups that belong to the logged-in user
    const userStartups = transformed.filter(
      (s: Startup) => s.contact.email === userEmail
    );

    return userStartups;
  } catch (err) {
    console.error('Error in userStartups:', err);
    throw err;
  }
};
