import mongoose, { Schema } from "mongoose";
import { BaseDocument, TimePeriod } from "./types";

export interface IEducation extends BaseDocument, TimePeriod {
  institution: string;
  degree: string;
  field: string;
  description?: string;
}

const educationSchema = new Schema<IEducation>(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEducation>("Education", educationSchema);
