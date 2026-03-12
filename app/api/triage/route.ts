import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { runAITriage, fallbackTriage } from "@/lib/triage";

export async function POST(req: NextRequest) {
  const { symptoms } = await req.json();

  if (!symptoms || symptoms.length === 0) {
    return NextResponse.json({ error: "No symptoms provided" }, { status: 400 });
  }

  let result;
  try {
    result = await runAITriage(symptoms);
  } catch (err) {
    console.error("AI triage failed, using fallback:", err);
    result = fallbackTriage(symptoms);
  }

  // Save consultation to DB
  try {
    await dbConnect();
    const Consultation = (await import("@/models/Consultation")).default;
    await Consultation.create({
      patientPhone: "unknown",
      patientName: "Unknown",
      symptoms,
      urgency: result.urgency,
      triageResult: result,
      status: "pending",
    });
  } catch (err) {
    console.error("Failed to save consultation:", err);
  }

  return NextResponse.json(result);
}
