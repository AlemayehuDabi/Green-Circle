export interface Startup {
  id: number;
  name: string;
  logo: string;
  sector: string;
  location: string;
  description: string;
  foundedYear: number;
  employees: string;
  website?: string;
  verified: boolean;
  founders: Founder[];
  pitch: string;
  achievements: string[];
  contact: {
    email: string;
    phone: string;
  };
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface SubmissionStatus {
  id: number;
  name: string;
  founder: string;
  sector: string;
  location: string;
  submittedDate: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  fayda_verified: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}
