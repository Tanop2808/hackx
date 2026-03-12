import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Pharmacist } from "@/models/index";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const phone = req.nextUrl.searchParams.get("phone");
    if (!phone) return NextResponse.json({ error: "Phone required" }, { status: 400 });
    const pharmacist = await Pharmacist.findOne({ phone });
    return NextResponse.json({ pharmacist: pharmacist || null });
  } catch (err: any) {
    console.error("GET /api/pharmacist error:", err.message);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { phone } = body;
    if (!phone) return NextResponse.json({ error: "Phone required" }, { status: 400 });
    const existing = await Pharmacist.findOne({ phone });
    if (existing) {
      return NextResponse.json({ error: "Phone already registered" }, { status: 400 });
    }
    const pharmacist = await Pharmacist.create({ ...body, stock: [] });
    return NextResponse.json({ pharmacist });
  } catch (err: any) {
    console.error("POST /api/pharmacist error:", err.message);
    return NextResponse.json({ error: "DB error: " + err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { phone, ...updates } = body;
    if (!phone) return NextResponse.json({ error: "Phone required" }, { status: 400 });
    const pharmacist = await Pharmacist.findOneAndUpdate(
      { phone },
      { $set: updates },
      { new: true }
    );
    return NextResponse.json({ pharmacist });
  } catch (err: any) {
    console.error("PATCH /api/pharmacist error:", err.message);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}