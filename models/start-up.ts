import { Schema, model, models, Document } from 'mongoose';

export interface IStartup extends Document {
  name: string;
  website?: string;
  sector?: string;
  location: string;
  images?: string[]; 
  video?: string | null;
  foundedYear?: string;
  employees?: string;
  description: string;
  achievements?: string[]; // Changed to Array
  documents?: string[];
  
  
  // Contact Object (Matches frontend startup.contact.email)
  contact: {
    email?: string;
    phone?: string;
  };

  // Embedded Founders (Matches frontend startup.founders.map)
  founders: {
    name: string;
    role?: string;
    bio?: string;
    image?: string;
    email?: string;
    linkedin?: string;
    x?: string;
  }[];

  status: 'pending' | 'approved' | 'rejected';
  revenue?: string;
  logo: string; // Uncommented
  createdAt: Date;
  updatedAt: Date;
}

const StartupSchema = new Schema<IStartup>(
  {
    name: { type: String, required: true },
    website: { type: String },
    sector: { type: String },
    location: { type: String, required: true },
    foundedYear: { type: String },
    employees: { type: String },
    description: { type: String, required: true },
    
    // Arrays for media and lists
    images: { type: [String], default: [] },
    achievements: { type: [String], default: [] }, 
    documents: { type: [String], default: [] },
    video: { type: String, default: null },
    logo: { type: String, default: "/placeholder-logo.png" },

    // Grouped Contact Info
    contact: {
      email: { type: String },
      phone: { type: String }
    },

    // Embedded Founders (Crucial for Directory display without Auth complexity)
    founders: [{
      name: { type: String, required: true },
      role: { type: String },
      bio: { type: String },
      image: { type: String },
      email: { type: String },
      linkedin: { type: String },
      x: { type: String }
    }],

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved', // Default to approved for seed data
    },
    revenue: { type: String },
  },
  { timestamps: true }
);

export const Startup = models.Startup || model<IStartup>('Startup', StartupSchema, 'startups');