// this are sstartup founders
export interface Founder {
  name: string;
  email: string;
  phone: string;
  role: string;
  bio: string;
}

export interface Startup {
  _id: string;
  name: string;
  logo: string;
  sector: string;
  location: string;
  description: string;
  foundedYear: number;
  employees: string;
  website?: string;
  status: string;
  founders: Founder[];
  pitch: string;
  achievements: string[];
  contact: {
    email: string;
    phone: string;
  };
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

// loged in user
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'startup';
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
  founders: any[]; // Ideally, replace `any` with your Founder type
  pitch: string;
  achievements?: string;
  founderEmail: string;
  founderPhone: string;
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
