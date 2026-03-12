import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { SOSAlert } from "@/models/index";

export async function GET() {
  try {
    await dbConnect();
    const alerts = await SOSAlert.find({ status: "active" }).sort({ createdAt: -1 });
    return NextResponse.json({ alerts });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await dbConnect();
    const alert = await SOSAlert.create(body);
    return NextResponse.json({ alert }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
