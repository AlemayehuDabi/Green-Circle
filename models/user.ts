import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'startup' | 'user';
  faydaId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['startup', 'user'],
      required: true,
    },
    faydaId: {
      type: String,
      minlength: 16,
      maxlength: 16,
      required: function (this: IUser) {
        return this.role === 'startup';
      },
    },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>('User', UserSchema);
