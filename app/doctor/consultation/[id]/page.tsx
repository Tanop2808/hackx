"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { TriageResult } from "@/lib/triage";

const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", green: "#1E8449", greenLight: "#27AE60", red: "#C0392B", redLight: "#E74C3C", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

export default function ConsultationDetailPage() {
  const router = useRouter();
  const [result, setResult] = useState<TriageResult | null>(null);
  const [notes, setNotes] = useState("Patient presents with acute chest pain. BP 150/90. ECG ordered.");
  const [rx, setRx] = useState("1. Aspirin 75mg - 1 tablet daily\n2. Refer to cardiologist urgently");

  useEffect(() => {
    const saved = localStorage.getItem("triageResult");
    if (saved) setResult(JSON.parse(saved));
  }, []);

  const lang = typeof window !== "undefined" ? localStorage.getItem("lang") || "hi" : "hi";

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#E8F8EF", padding: "6px 16px", fontSize: 12, fontWeight: 700, color: C.green, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green }} /> Online · Syncing in real-time
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", gap: 10, background: C.card, borderBottom: `1px solid ${C.border}` }}>
          <button onClick={() => router.push("/doctor/dashboard")} style={{ width: 36, height: 36, borderRadius: 10, background: C.bg, border: "none", fontSize: 18, cursor: "pointer" }}>←</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Consultation Detail</div>
            <div style={{ fontSize: 11, color: C.muted }}>Ramkali Devi — Red Urgency</div>
          </div>
          <span style={{ background: "#FDEDED", color: C.red, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>🔴 RED</span>
        </div>
        <div style={{ background: "#FDEDED", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.red, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 18 }}>R</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800 }}>रामकली देवी</div>
            <div style={{ fontSize: 12, color: C.muted }}>Female · 52y · Kesri · 📱 9876501001</div>
            <div style={{ fontSize: 12, color: C.primary, marginTop: 2 }}>💊 Type 2 Diabetes · 🩸 B+</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {/* AI result */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 8 }}>🤖 AI TRIAGE RESULT</div>
            <div style={{ background: C.card, borderRadius: 16, padding: 14, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.red}` }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.red }}>🔴 {result ? (lang === "hi" ? result.conditionHi : result.conditionEn) : "संभावित हृदय समस्या — Possible Cardiac Issue"}</div>
              <div style={{ height: 1, background: C.border, margin: "10px 0" }} />
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{result?.summary || "Immediate evaluation recommended for this patient."}</div>
            </div>
          </div>
          {/* Doctor notes */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 8 }}>📋 DOCTOR NOTES</div>
            <textarea style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, fontFamily: "inherit", background: C.card, color: C.text, outline: "none", lineHeight: 1.6 }} rows={3} value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
          {/* Prescription */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 8 }}>💊 PRESCRIPTION</div>
            <textarea style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, fontFamily: "inherit", background: C.card, color: C.text, outline: "none", lineHeight: 1.6 }} rows={3} value={rx} onChange={e => setRx(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => router.push("/doctor/dashboard")} style={{ flex: 1, padding: 13, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, background: `linear-gradient(135deg,#27AE60,#1E8449)`, color: "white" }}>✓ Mark Complete</button>
            <button onClick={() => router.push("/doctor/dashboard")} style={{ flex: 1, padding: 13, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, background: `linear-gradient(135deg,${C.redLight},${C.red})`, color: "white" }}>🏥 In-Person Visit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
