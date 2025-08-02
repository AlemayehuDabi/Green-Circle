import { Schema, model, models, Document, Types } from 'mongoose';

export interface IStartup extends Document {
  name: string;
  website?: string;
  sector?: string;
  location: string;
  foundedYear?: string;
  employees?: string;
  description: string;
  pitch?: string;
  achievements?: string;
  documents: string[]; // S3/Cloudinary URLs
  founderRole?: string;
  founderEmail?: string;
  founderPhone?: string;
  founderBio?: string;
  revenue?: string;
  founders: Types.ObjectId[]; // references to User model
  status: 'pending' | 'approved' | 'rejected';
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
    pitch: { type: String },
    achievements: { type: String },
    documents: [{ type: String, required: true }],
    founderRole: { type: String },
    founderEmail: { type: String },
    founderPhone: { type: String },
    founderBio: { type: String },
    founders: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Startup =
  models.Startup || model<IStartup>('Startup', StartupSchema);
