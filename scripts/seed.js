// ──────────────────────────────────────────────────────────
//  SehatSetu Seed Script
//  Run: node scripts/seed.js
// ──────────────────────────────────────────────────────────
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("❌ Set MONGODB_URI in .env.local"); process.exit(1); }

const PatientSchema = new mongoose.Schema({ phone: String, name: String, age: Number, gender: String, village: String, conditions: [String], bloodGroup: String, role: { type: String, default: "patient" } }, { timestamps: true });
const DoctorSchema  = new mongoose.Schema({ email: String, passwordHash: String, name: String, specialization: String, hospital: String, role: { type: String, default: "doctor" } }, { timestamps: true });
const PharmacySchema = new mongoose.Schema({ name: String, village: String, district: String, phone: String, lat: Number, lng: Number, medicines: [{ name: String, qty: Number, inStock: Boolean }] });
const ASHAWorkerSchema = new mongoose.Schema({ phone: String, name: String, villages: [String], role: { type: String, default: "ashaworker" } }, { timestamps: true });

const Patient    = mongoose.model("Patient", PatientSchema);
const Doctor     = mongoose.model("Doctor", DoctorSchema);
const Pharmacy   = mongoose.model("Pharmacy", PharmacySchema);
const ASHAWorker = mongoose.model("ASHAWorker", ASHAWorkerSchema);

const bcrypt = require("bcryptjs");

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  // Clear existing
  await Promise.all([Patient.deleteMany({}), Doctor.deleteMany({}), Pharmacy.deleteMany({}), ASHAWorker.deleteMany({})]);

  // Patients
  await Patient.insertMany([
    { phone: "9876501001", name: "रामकली देवी", age: 52, gender: "female", village: "Kesri", conditions: ["Type 2 Diabetes"], bloodGroup: "B+" },
    { phone: "9876501002", name: "सुरेश कुमार", age: 38, gender: "male", village: "Nabha Sector 4", conditions: [], bloodGroup: "O+" },
    { phone: "9876501003", name: "गीता रानी", age: 65, gender: "female", village: "Kesri", conditions: ["Hypertension"], bloodGroup: "A+" },
    { phone: "9876501004", name: "हरजीत सिंह", age: 71, gender: "male", village: "Barnala Road", conditions: ["Heart disease"], bloodGroup: "B-" },
  ]);
  console.log("✅ Patients seeded");

  // Doctors
  const hash = await bcrypt.hash("doctor123", 10);
  await Doctor.insertMany([
    { email: "doctor@sehat.com", passwordHash: hash, name: "Dr. Arvind Kumar", specialization: "General Physician", hospital: "Nabha Civil Hospital" },
  ]);
  console.log("✅ Doctor seeded: doctor@sehat.com / doctor123");

  // ASHA Workers
  await ASHAWorker.insertMany([
    { phone: "9876502001", name: "Priya Sharma", villages: ["Kesri", "Nabha Sector 4", "Barnala Road"] },
  ]);
  console.log("✅ ASHA Worker seeded: 9876502001");

  // Pharmacies
  await Pharmacy.insertMany([
    { name: "Nabha Medical Store", village: "Nabha", district: "Nabha", phone: "9876500001", lat: 30.3567, lng: 76.1543,
      medicines: [{ name: "Paracetamol", qty: 200, inStock: true }, { name: "Metformin", qty: 50, inStock: true }, { name: "ORS", qty: 500, inStock: true }, { name: "Amoxicillin", qty: 0, inStock: false }] },
    { name: "Punjab Pharmacy", village: "Kesri", district: "Nabha", phone: "9876500002", lat: 30.3612, lng: 76.1678,
      medicines: [{ name: "Paracetamol", qty: 100, inStock: true }, { name: "Metformin", qty: 0, inStock: false }, { name: "ORS", qty: 300, inStock: true }, { name: "Amoxicillin", qty: 80, inStock: true }] },
    { name: "Sharma Medical", village: "Barnala Road", district: "Nabha", phone: "9876500003", lat: 30.3489, lng: 76.1423,
      medicines: [{ name: "Paracetamol", qty: 150, inStock: true }, { name: "Metformin", qty: 80, inStock: true }, { name: "ORS", qty: 0, inStock: false }, { name: "Amoxicillin", qty: 60, inStock: true }] },
  ]);
  console.log("✅ Pharmacies seeded");

  console.log("\n🎉 Seed complete!\n");
  console.log("Demo credentials:");
  console.log("  Patient:  9876501001 (Ramkali Devi)");
  console.log("  Doctor:   doctor@sehat.com / doctor123");
  console.log("  ASHA:     9876502001 (Priya Sharma)");
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
