// this are sstartup founders
export interface Founder {
  name: string;
  email: string;
  phone: string;
  role: string;
  bio: string;
  image: string;
  nationality: string;
}

// loged in user
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'startup' | 'admin';
}

export interface Startup {
  _id: string;
  name: string;
  logo?: string;
  website?: string;
  sector?: string;
  location: string;
  foundedYear?: number;
  employees?: string;
  description: string;
  pitch?: string;
  achievements?: string[];
  contact?: {
    email?: string;
    phone?: string;
  };
  revenue?: string;
  founders: Founder[];
  founderRole?: string;
  founderBio?: string;
  status: string;
  createdAt: string; // ISO string if coming from API
  updatedAt: string;
}

export interface SubmissionStatus {
  id: number;
  name: string;
  founder: string;
  sector: string;
  location: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  fayda_verified: boolean;
}

export interface RawStartup {
  _id: string;
  name: string;
  sector: string;
  location: string;
  description: string;
  foundedYear: string;
  employees: string;
  website?: string;
  status: string;
  founders: Founder[];
  pitch: string;
  achievements?: string;
  founderEmail: string;
  founderPhone: string;
  createdAt: string;
  updatedAt: string;
  founderRole?: string;
  founderBio?: string;
}

export interface BetterAuthSession {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  role: string;
  isValidate?: boolean | null;
  faydaId?: string;
}
