import mongoose, { Schema } from "mongoose";
import { BaseDocument, TimePeriod } from "./types";

export interface IProject extends BaseDocument, TimePeriod {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    technologies: [{ type: String }],
    imageUrl: { type: String },
    githubUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProject>("Project", projectSchema);
