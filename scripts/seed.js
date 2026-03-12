const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const URI = process.env.MONGODB_URI;

async function seed() {
  console.log("Connecting to MongoDB...");
  console.log("URI found:", URI ? "YES" : "NO — check .env.local");

  await mongoose.connect(URI);
  console.log("✅ Connected to MongoDB Atlas");

  const db = mongoose.connection.db;

  // Clear existing
  await db.collection("patients").deleteMany({});
  await db.collection("doctors").deleteMany({});
  await db.collection("ashavisits").deleteMany({});
  console.log("🗑️  Cleared old data");

  // Seed patients
  await db.collection("patients").insertMany([
    { phone: "9876501001", name: "रामकली देवी", age: "52", gender: "female", village: "Kesri", bloodGroup: "B+", conditions: "Diabetes", createdAt: new Date() },
    { phone: "9876501002", name: "सुरेश कुमार", age: "38", gender: "male", village: "Nabha Sector 4", bloodGroup: "O+", conditions: "", createdAt: new Date() },
    { phone: "9876501003", name: "गीता रानी", age: "65", gender: "female", village: "Kesri", bloodGroup: "A+", conditions: "BP", createdAt: new Date() },
    { phone: "9876501004", name: "हरजीत सिंह", age: "71", gender: "male", village: "Barnala Road", bloodGroup: "", conditions: "Arthritis", createdAt: new Date() },
    { phone: "9876501005", name: "मीना देवी", age: "29", gender: "female", village: "Barnala Road", bloodGroup: "AB+", conditions: "", createdAt: new Date() },
  ]);
  console.log("✅ Patients seeded");

  // Seed doctors
  await db.collection("doctors").insertMany([
    {
      doctorId: "D1",
      name: "Dr. Arvind Kumar",
      specialization: "General Physician",
      hospital: "Nabha Civil Hospital",
      phone: "9876600001",
      email: "doctor@sehat.com",
      availableSlots: ["9:00 AM", "9:30 AM", "10:30 AM", "11:00 AM", "2:00 PM", "3:30 PM"],
      bookedSlots: [],
      isAvailable: true,
      createdAt: new Date()
    },
    {
      doctorId: "D2",
      name: "Dr. Sunita Sharma",
      specialization: "Pediatrician",
      hospital: "PHC Kesri",
      phone: "9876600002",
      email: "sunita@sehat.com",
      availableSlots: ["9:30 AM", "11:00 AM", "3:00 PM", "4:00 PM"],
      bookedSlots: [],
      isAvailable: true,
      createdAt: new Date()
    },
    {
      doctorId: "D3",
      name: "Dr. Ravi Patel",
      specialization: "Cardiologist",
      hospital: "District Hospital",
      phone: "9876600003",
      email: "ravi@sehat.com",
      availableSlots: ["10:00 AM", "11:30 AM", "4:30 PM"],
      bookedSlots: [],
      isAvailable: true,
      createdAt: new Date()
    },
  ]);
  console.log("✅ Doctors seeded");

  console.log("\n🎉 All done! Your MongoDB Atlas database is ready.");
  console.log("Go to Atlas → Browse Collections to verify.");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});