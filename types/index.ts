  // FOUNDER — matches API response exactly
  export interface Founder {
    _id: string;
    name: string;
    email: string;
    role: string;
    nationality?: string;
    phone_number?: string;
    bio?: string;
    image?: string;
    isValidate?: boolean;
    faydaId?: string;
  }
  
// LOGGED-IN USER
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'startup' | 'admin';
}

// STARTUP — unified type after API
export interface Startup {
  _id: string;
  name: string;
  logo?: string;
  website?: string;
  sector?: string;
  location: string;
  foundedYear?: string | number;
  employees?: string;
  description: string;
  pitch?: string;

  achievements?: string | string[];
  documents?: string[];

  founderRole?: string;
  founderEmail?: string;
  founderPhone?: string;
  founderBio?: string;

  founders: Founder[]; // populated

  contact?: {
    email?: string;
    phone?: string;
  };

  revenue?: string;
  status: string;

  createdAt: string;
  updatedAt: string;
}

// RAW STARTUP — before mapping, straight from DB/API
export interface RawStartup {
  _id: string;
  name: string;
  website?: string;
  sector: string;
  location: string;
  description: string;
  foundedYear: string;
  employees: string;
  pitch: string;
  achievements?: string | string[];
  documents?: string[];
  founders: Founder[];
  founderEmail?: string;
  founderPhone?: string;
  founderRole?: string;
  founderBio?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
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

export interface StartupResponse {
  message: string;
  startup: RawStartup;
}

export interface StartupListResponse {
  message: string;
  startups: RawStartup[];
}
