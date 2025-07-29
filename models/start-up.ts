import { Schema, model, models, Document, Types } from 'mongoose';

export interface IStartup extends Document {
  name: string;
  description: string;
  region: string;
  documents: string[]; // array of URLs for AWS s3 or claudnary
  founders: Types.ObjectId[]; // reference to Users
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const StartupSchema = new Schema<IStartup>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    region: { type: String, required: true },
    documents: [{ type: String, required: true }],
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
