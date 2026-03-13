import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Consultation from "@/models/Consultation";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status") || "pending";
  try {
    await dbConnect();
    // Sort: RED first, then YELLOW, then GREEN, then by time
    const raw = await Consultation.find({ status }).sort({ createdAt: -1 });
    const priority = { RED: 0, YELLOW: 1, GREEN: 2 };
    const sorted = raw.sort((a, b) => (priority[a.urgency] ?? 3) - (priority[b.urgency] ?? 3));
    return NextResponse.json({ consultations: sorted });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await dbConnect();
    const consultation = await Consultation.create(body);
    return NextResponse.json({ consultation }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, status, doctorNotes, prescription } = body;
  try {
    await dbConnect();
    const update: Record<string, unknown> = {};
    if (status) update.status = status;
    if (doctorNotes !== undefined) update.doctorNotes = doctorNotes;
    if (prescription !== undefined) update.prescription = prescription;
    const consultation = await Consultation.findByIdAndUpdate(id, update, { new: true });
    if (!consultation) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ consultation });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}