import { Schema, model, models, type Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: "startup" | "user";
  isValidate: boolean;
  faydaId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isValidate: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["startup", "user"],
      required: true,
      default: "user",
    },
    faydaId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);


if (models.User) {
  delete models.User;
}

export const User = model<IUser>("User", UserSchema);
