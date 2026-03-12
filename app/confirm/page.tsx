"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { TriageResult } from "@/lib/triage";

const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", green: "#1E8449", greenLight: "#27AE60", red: "#C0392B", yellow: "#F39C12", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

export default function ConfirmPage() {
  const router = useRouter();
  const lang = typeof window !== "undefined" ? localStorage.getItem("lang") || "hi" : "hi";
  const t = (hi: string, en: string) => lang === "hi" ? hi : en;
  const [result, setResult] = useState<TriageResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("triageResult");
    if (saved) setResult(JSON.parse(saved));
  }, []);

  const urgColor = result ? { RED: C.red, YELLOW: C.yellow, GREEN: C.green }[result.urgency] : C.green;

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: `linear-gradient(160deg,#EBF4FD,${C.bg})`, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 20px" }}>
        <div style={{ width: 96, height: 96, background: `linear-gradient(135deg,${C.greenLight},${C.green})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46, marginBottom: 22, boxShadow: `0 8px 32px rgba(30,132,73,.35)`, animation: "popin .5s cubic-bezier(.175,.885,.32,1.275)" }}>✓</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.text, textAlign: "center" }}>{t("अपॉइंटमेंट बुक हो गई!", "Appointment Booked!")}</div>
        <div style={{ fontSize: 13, color: C.muted, textAlign: "center", marginTop: 6, lineHeight: 1.5 }}>{t("आपकी अपॉइंटमेंट सफलतापूर्वक बुक हुई", "Your appointment has been booked successfully")}</div>
        <div style={{ background: C.card, borderRadius: 16, padding: 16, border: `1px solid ${C.border}`, width: "100%", margin: "18px 0" }}>
          {[
            { lbl: t("📋 Queue No.", "📋 Queue No."), val: "#Q-007" },
            { lbl: t("⏱️ प्रतीक्षा समय", "⏱️ Wait Time"), val: t("लगभग 20 मिनट", "~20 minutes") },
            { lbl: t("🏥 डॉक्टर", "🏥 Doctor"), val: "Dr. Arvind Kumar" },
            { lbl: t("🔴 ज़रूरी", "🔴 Urgency"), val: result?.urgency === "RED" ? t("RED — उच्च प्राथमिकता", "RED — High Priority") : result?.urgency === "YELLOW" ? "YELLOW — Moderate" : "GREEN — Normal", color: urgColor },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ fontSize: 12, color: C.muted }}>{row.lbl}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: row.color || C.text }}>{row.val}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#FEF9E7", borderRadius: 12, padding: 11, display: "flex", gap: 8, marginBottom: 18, width: "100%", border: "1px solid #F4D03F" }}>
          <span>⚡</span>
          <p style={{ fontSize: 13, color: "#7D6608", lineHeight: 1.5 }}>{t("जब इंटरनेट आएगा, डॉक्टर को सूचना मिलेगी", "When internet returns, doctor will be notified automatically")}</p>
        </div>
        <button onClick={() => router.push("/home")} style={{ width: "100%", padding: "16px", borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 16, background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, color: "white" }}>
          🏠 {t("घर जाएं", "Go Home")}
        </button>
        <style>{`@keyframes popin{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      </div>
    </div>
  );
}
