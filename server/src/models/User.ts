import mongoose, { Model } from "mongoose";

export type UserRole = "user" | "admin";

export interface IAddress {
  fullName: string;
  address: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

export interface IUser {
  clerkUserId: string;
  name?: string;
  email?: string;
  role: UserRole;
  points: number;
  addresses: any[];
}

const addressSchema = new mongoose.Schema<IAddress>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
  },
);

const UserSchema = new mongoose.Schema<IUser>(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    addresses: {
      type: [addressSchema],
      default: [],
    } as any,
  },
  { timestamps: true },
);

export const User =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
