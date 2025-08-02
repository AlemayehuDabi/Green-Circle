import { Schema, model, models } from 'mongoose';
export interface IUser {
  name: string;
  email: string;
  role: 'startup' | 'user';
  isValidate: boolean;
  faydaId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['startup', 'user', 'admin'],
      required: true,
      default: 'user',
    },
    isValidate: { type: Boolean, default: false },
    faydaId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>('User', userSchema);
