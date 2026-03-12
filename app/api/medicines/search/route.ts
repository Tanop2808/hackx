import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Pharmacy } from "@/models/index";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name") || "";
  try {
    await dbConnect();
    const pharmacies = await Pharmacy.find({
      "medicines.name": { $regex: name, $options: "i" },
    });
    return NextResponse.json({ pharmacies });
  } catch {
    // Return static data if DB unavailable
    const STATIC: Record<string, object[]> = {
      Paracetamol: [
        { name: "Nabha Medical Store", village: "Nabha", dist: "1.2", phone: "9876500001", qty: 200, inStock: true },
        { name: "Punjab Pharmacy", village: "Kesri", dist: "3.4", phone: "9876500002", qty: 100, inStock: true },
      ],
    };
    return NextResponse.json({ pharmacies: STATIC[name] || [] });
  }
}
