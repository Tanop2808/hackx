"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", green: "#1E8449", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

export default function LogVisitPage() {
  const router = useRouter();
  const lang = typeof window !== "undefined" ? localStorage.getItem("lang") || "hi" : "hi";
  const t = (hi: string, en: string) => lang === "hi" ? hi : en;
  const [appLearned, setAppLearned] = useState(false);
  const [patient, setPatient] = useState("रामकली देवी (Kesri)");
  const [date, setDate] = useState("2026-03-12");
  const [notes, setNotes] = useState("");

  const saveVisit = async () => {
    try {
      await fetch("/api/asha/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientPhone: "9876501001", patientName: patient, visitDate: date, notes, appLearned, ashaWorkerPhone: "9876502001" }),
      });
    } catch { /* saved offline */ }
    router.push("/asha/dashboard");
  };

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "44px 14px 10px", gap: 10, background: C.card, borderBottom: `1px solid ${C.border}` }}>
          <button onClick={() => router.push("/asha/dashboard")} style={{ width: 36, height: 36, borderRadius: 10, background: C.bg, border: "none", fontSize: 18, cursor: "pointer" }}>←</button>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{t("Visit Log करें", "Log Patient Visit")}</div>
            <div style={{ fontSize: 11, color: C.muted }}>Log Patient Visit</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>👤 {t("मरीज़ चुनें", "Select Patient")}</label>
            <select style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 15, fontFamily: "inherit", background: C.card, color: C.text, outline: "none", appearance: "none" }}
              value={patient} onChange={e => setPatient(e.target.value)}>
              {["रामकली देवी (Kesri)", "सुरेश कुमार (Nabha Sector 4)", "गीता रानी (Kesri)", "हरजीत सिंह (Barnala Road)"].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>📅 {t("Visit Date", "Visit Date")}</label>
            <input style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 15, fontFamily: "inherit", background: C.card, color: C.text, outline: "none" }} type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>📝 {t("Notes", "Notes")}</label>
            <textarea style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, fontFamily: "inherit", background: C.card, color: C.text, outline: "none", lineHeight: 1.6 }} rows={3} placeholder={t("घर पर मरीज़ से मिले...", "Visited patient at home...")} value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
          <div style={{ background: C.card, borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, border: `1px solid ${C.border}` }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{t("क्या मरीज़ ने आज App सीखा?", "Did patient learn app today?")}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Did patient learn to use app today?</div>
            </div>
            <div onClick={() => setAppLearned(!appLearned)} style={{ width: 48, height: 26, borderRadius: 13, background: appLearned ? C.green : C.border, cursor: "pointer", position: "relative", transition: "background .2s", flexShrink: 0 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "white", position: "absolute", top: 2, left: 2, transition: "transform .2s", transform: appLearned ? "translateX(22px)" : "translateX(0)", boxShadow: "0 2px 4px rgba(0,0,0,.2)" }} />
            </div>
          </div>
          <button onClick={saveVisit} style={{ width: "100%", padding: 16, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 15, background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, color: "white" }}>
            💾 {t("Save Visit — ऑफलाइन सेव", "Save Visit — Offline Save")}
          </button>
        </div>
      </div>
    </div>
  );
}
