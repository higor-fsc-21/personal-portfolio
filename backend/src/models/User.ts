import mongoose, { Schema } from "mongoose";
import { BaseDocument } from "./types";

export interface IUser extends BaseDocument {
  email: string;
  password: string;
  name: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
