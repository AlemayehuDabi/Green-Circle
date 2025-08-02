import { Schema, model, models, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'startup' | 'user';
  isValidate: boolean;
  faydaId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const faydaSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['Admin', 'collab', 'founders'],
      required: true,
      default: 'user',
    },
    isValidate: { type: Boolean, default: false },
    faydaId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

// Prevent model redefi nition
export const Fayda = models.user;
