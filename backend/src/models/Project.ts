import mongoose, { Schema } from "mongoose";
import { BaseDocument, TimePeriod } from "./types";

export interface IProject extends BaseDocument, TimePeriod {
  title: string;
  description: string;
  technologies: string[];
  images: {
    url: string;
    alt: string;
  }[];
  repoUrl?: string;
  demoUrl?: string;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    technologies: [{ type: String }],
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, required: true },
      },
    ],
    repoUrl: { type: String },
    demoUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProject>("Project", projectSchema);
