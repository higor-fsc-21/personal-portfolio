import mongoose, { Schema } from "mongoose";
import { BaseDocument } from "./types";

export interface ICertificate extends BaseDocument {
  title: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialUrl?: string;
}

const certificateSchema = new Schema<ICertificate>(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date },
    credentialUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICertificate>("Certificate", certificateSchema);
