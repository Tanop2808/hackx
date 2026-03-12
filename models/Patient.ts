import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPatient extends Document {
  phone: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  village: string;
  conditions: string[];
  bloodGroup?: string;
  role: "patient";
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema = new Schema<IPatient>(
  {
    phone:      { type: String, required: true, unique: true, index: true },
    name:       { type: String, required: true },
    age:        { type: Number, required: true },
    gender:     { type: String, enum: ["male", "female", "other"], required: true },
    village:    { type: String, required: true },
    conditions: { type: [String], default: [] },
    bloodGroup: { type: String },
    role:       { type: String, default: "patient" },
  },
  { timestamps: true }
);

const Patient: Model<IPatient> =
  mongoose.models.Patient || mongoose.model<IPatient>("Patient", PatientSchema);

export default Patient;
