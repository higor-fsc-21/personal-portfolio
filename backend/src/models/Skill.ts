import mongoose, { Schema } from "mongoose";
import { BaseDocument } from "./types";

export interface ISkill extends BaseDocument {
  name: string;
  category: string;
  level: number;
}

const skillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    level: { type: Number, required: true, min: 1, max: 5, default: 1 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISkill>("Skill", skillSchema);
