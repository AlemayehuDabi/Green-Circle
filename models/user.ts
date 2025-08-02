import { Schema, models, type Document } from 'mongoose';
import { model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'startup' | 'user';
  isValidate: boolean;
  faydaId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['startup', 'user'],
      required: true,
      default: 'user',
    },
    isValidate: { type: Boolean, default: false },
    faydaId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export const User = models.user || model<IUser>('user', UserSchema);