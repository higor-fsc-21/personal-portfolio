import mongoose, { Schema } from "mongoose";
import { BaseDocument, TimePeriod } from "./types";

export interface IExperience extends BaseDocument, TimePeriod {
  company: string;
  position: string;
  description: string;
  technologies: string[];
}

const experienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true },
    technologies: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExperience>("Experience", experienceSchema);
