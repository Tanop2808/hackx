"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", green: "#1E8449", red: "#C0392B", yellow: "#F39C12", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

const SYMPTOMS_MAP: Record<string, { emoji: string; en: string }> = {
  fever: { emoji: "🌡️", en: "Fever" }, chest: { emoji: "💔", en: "Chest Pain" },
  breath: { emoji: "😮‍💨", en: "Breathlessness" }, cough: { emoji: "😮", en: "Cough" },
  cold: { emoji: "🤧", en: "Cold" }, headache: { emoji: "🤕", en: "Headache" },
  vomit: { emoji: "🤢", en: "Vomiting" }, diarrhea: { emoji: "💧", en: "Diarrhea" },
  rash: { emoji: "🔴", en: "Skin Rash" }, pain: { emoji: "🦴", en: "Joint Pain" },
  weakness: { emoji: "😴", en: "Weakness" }, stomach: { emoji: "😣", en: "Stomach Pain" },
  eyes: { emoji: "👁️", en: "Eye Problem" }, back: { emoji: "🔙", en: "Back Pain" },
  dizzy: { emoji: "💫", en: "Dizziness" }, swelling: { emoji: "🦵", en: "Swelling" },
  chills: { emoji: "🥶", en: "Chills" }, body_ache: { emoji: "🤸", en: "Body Ache" },
  sweat: { emoji: "💦", en: "Sweating" }, urine_burn: { emoji: "🔥", en: "Burning Urination" },
  nausea: { emoji: "😰", en: "Nausea" }, unconscious: { emoji: "😵", en: "Unconsciousness" },
  seizure: { emoji: "⚡", en: "Seizures" }, bleed: { emoji: "🩸", en: "Bleeding" },
};

export default function ReportPage() {
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [medicines, setMedicines] = useState<Array<{ name: string; dose: string; note: string }>>([]);
  const [now, setNow] = useState("");

  useEffect(() => {
    const p = localStorage.getItem("patient");
    const r = localStorage.getItem("triageResult");
    const s = localStorage.getItem("selectedSymptoms");
    const m = localStorage.getItem("prescribedMedicines");
    if (p) setPatient(JSON.parse(p));
    if (r) setResult(JSON.parse(r));
    if (s) setSymptoms(JSON.parse(s));
    if (m) setMedicines(JSON.parse(m));
    const d = new Date();
    setNow(d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) + " " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
  }, []);

  const urgencyColor = result ? { RED: C.red, YELLOW: C.yellow, GREEN: C.green }[result.urgency as string] : C.green;
  const urgencyBg = result ? { RED: "#FDEDED", YELLOW: "#FEF9E7", GREEN: "#E8F8EF" }[result.urgency as string] : "#E8F8EF";

  const handlePrint = () => window.print();

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", gap: 10, background: C.card, borderBottom: `1px solid ${C.border}` }}>
          <button onClick={() => router.back()} style={{ width: 36, height: 36, borderRadius: 10, background: C.bg, border: "none", fontSize: 18, cursor: "pointer" }}>←</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Medical Report</div>
            <div style={{ fontSize: 11, color: C.muted }}>SehatSetu AI Health Report</div>
          </div>
          <button onClick={handlePrint} style={{ padding: "8px 14px", borderRadius: 10, background: C.primary, border: "none", color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            🖨️ Print
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }} id="report-content">

          {/* Header */}
          <div style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, borderRadius: 16, padding: 16, marginBottom: 14, textAlign: "center" }}>
            <div style={{ fontSize: 24 }}>🏥</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "white", marginTop: 4 }}>SehatSetu</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.7)" }}>AI-Powered Health Report</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginTop: 4 }}>{now}</div>
          </div>

          {/* Patient Info */}
          <div style={{ background: C.card, borderRadius: 16, padding: 14, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 10 }}>👤 Patient Information</div>
            {[
              { label: "Name", val: patient?.name || "—" },
              { label: "Age", val: patient?.age ? `${patient.age} years` : "—" },
              { label: "Village / City", val: patient?.village || "—" },
              { label: "Phone", val: patient?.phone || "—" },
              { label: "Gender", val: patient?.gender || "—" },
              { label: "Known Conditions", val: Array.isArray(patient?.conditions) ? patient.conditions.join(", ") : patient?.conditions || "None" },
              { label: "Blood Group", val: patient?.bloodGroup || "—" },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 6 ? `1px solid ${C.border}` : "none" }}>
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{row.label}</span>
                <span style={{ fontSize: 12, color: C.text, fontWeight: 700, textAlign: "right", maxWidth: "55%" }}>{row.val}</span>
              </div>
            ))}
          </div>

          {/* Triage Result */}
          {result && (
            <div style={{ background: urgencyBg, borderRadius: 16, padding: 14, marginBottom: 12, border: `2px solid ${urgencyColor}` }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: urgencyColor, textTransform: "uppercase", letterSpacing: .8, marginBottom: 10 }}>
                🤖 AI Triage Result
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ padding: "6px 16px", borderRadius: 20, background: urgencyColor, color: "white", fontSize: 14, fontWeight: 800 }}>
                  {result.urgency === "RED" ? "🔴" : result.urgency === "YELLOW" ? "🟡" : "🟢"} {result.urgency}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{result.conditionEn}</div>
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, fontStyle: "italic" }}>{result.summary}</div>
            </div>
          )}

          {/* Symptoms */}
          <div style={{ background: C.card, borderRadius: 16, padding: 14, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 10 }}>🩺 Reported Symptoms</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {symptoms.length === 0 && <span style={{ fontSize: 12, color: C.muted }}>No symptoms recorded</span>}
              {symptoms.map(id => {
                const s = SYMPTOMS_MAP[id];
                if (!s) return null;
                return (
                  <span key={id} style={{ background: "#EBF4FD", borderRadius: 8, padding: "5px 10px", fontSize: 12, fontWeight: 600, color: C.primary }}>
                    {s.emoji} {s.en}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Medicines */}
          <div style={{ background: C.card, borderRadius: 16, padding: 14, marginBottom: 12, border: `2px solid ${C.green}` }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.green, textTransform: "uppercase", letterSpacing: .8, marginBottom: 10 }}>💊 Medicines Prescribed by AI</div>
            {medicines.length === 0 && <span style={{ fontSize: 12, color: C.muted }}>No medicines prescribed</span>}
            {medicines.map((med, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: i < medicines.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>💊 {med.name}</div>
                <div style={{ fontSize: 12, color: C.primary, fontWeight: 600, marginTop: 3 }}>📋 Dosage: {med.dose}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>⚠️ {med.note}</div>
              </div>
            ))}
            <div style={{ background: "#FEF9E7", borderRadius: 8, padding: "8px 10px", marginTop: 10, fontSize: 11, color: "#7D6608" }}>
              ⚠️ These are AI suggestions only. Please consult a qualified doctor before taking any medication.
            </div>
          </div>

          {/* Doctor recommendation */}
          {result && (
            <div style={{ background: C.card, borderRadius: 16, padding: 14, marginBottom: 12, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 10 }}>👨‍⚕️ Doctor Recommendation</div>
              {[
                { label: "Specialist", val: result.docType?.en },
                { label: "Consult Within", val: result.wait?.en },
                { label: "Contagious", val: result.contagious?.en },
                { label: "Emergency", val: result.emergency ? "YES — Call 108 immediately" : "No" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: row.label === "Emergency" && result.emergency ? C.red : C.text }}>{row.val}</span>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div style={{ textAlign: "center", padding: "10px 0", fontSize: 11, color: C.muted }}>
            Generated by SehatSetu AI · {now}<br />
            This report is for informational purposes only.<br />
            Always consult a qualified medical professional.
          </div>
        </div>

        {/* Bottom */}
        <div style={{ position: "fixed", bottom: 0, width: 390, background: C.card, borderTop: `2px solid ${C.border}`, padding: "10px 16px", display: "flex", gap: 8, zIndex: 50 }}>
          <button onClick={() => router.push("/medicine")} style={{ flex: 1, padding: 13, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: `linear-gradient(135deg,#27AE60,#1E8449)`, color: "white" }}>
            💊 Find Medicine
          </button>
          <button onClick={handlePrint} style={{ flex: 1, padding: 13, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, color: "white" }}>
            🖨️ Print Report
          </button>
        </div>
      </div>
    </div>
  );
}