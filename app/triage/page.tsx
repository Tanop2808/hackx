"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { TriageResult } from "@/lib/triage";
import { fallbackTriage } from "@/lib/triage";

const SYMPTOMS_MAP: Record<string, { emoji: string; hi: string; en: string }> = {
  fever: { emoji: "🌡️", hi: "बुखार", en: "Fever" }, chest: { emoji: "💔", hi: "सीने में दर्द", en: "Chest Pain" },
  breath: { emoji: "😮‍💨", hi: "सांस में तकलीफ", en: "Breathless" }, cough: { emoji: "😮", hi: "खांसी", en: "Cough" },
  cold: { emoji: "🤧", hi: "जुकाम", en: "Cold" }, headache: { emoji: "🤕", hi: "सिरदर्द", en: "Headache" },
  vomit: { emoji: "🤢", hi: "उल्टी", en: "Vomiting" }, diarrhea: { emoji: "💧", hi: "दस्त", en: "Diarrhea" },
  rash: { emoji: "🔴", hi: "दाने", en: "Skin Rash" }, pain: { emoji: "🦴", hi: "जोड़ों में दर्द", en: "Joint Pain" },
  weakness: { emoji: "😴", hi: "कमज़ोरी", en: "Weakness" }, stomach: { emoji: "😣", hi: "पेट में दर्द", en: "Stomach Pain" },
  eyes: { emoji: "👁️", hi: "आँखों में जलन", en: "Eye Pain" }, back: { emoji: "🔙", hi: "कमर दर्द", en: "Back Pain" },
  dizzy: { emoji: "💫", hi: "चक्कर", en: "Dizziness" }, swelling: { emoji: "🦵", hi: "सूजन", en: "Swelling" },
};

const GRAD: Record<string, string> = {
  RED: "linear-gradient(160deg,#922B21,#C0392B)",
  YELLOW: "linear-gradient(160deg,#B7770D,#E67E22)",
  GREEN: "linear-gradient(160deg,#1A6B3A,#27AE60)",
};
const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", green: "#1E8449", greenLight: "#27AE60", red: "#C0392B", yellow: "#F39C12", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

export default function TriagePage() {
  const router = useRouter();
  const lang = typeof window !== "undefined" ? localStorage.getItem("lang") || "hi" : "hi";
  const t = (hi: string, en: string) => lang === "hi" ? hi : en;

  const [result, setResult] = useState<TriageResult | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("triageResult");
    const syms = JSON.parse(localStorage.getItem("selectedSymptoms") || "[]");
    setSelectedSymptoms(syms);
    if (saved) {
      setResult(JSON.parse(saved));
      setLoading(false);
    } else {
      setResult(fallbackTriage(syms));
      setLoading(false);
    }
  }, []);

  const urgColor = result ? { RED: C.red, YELLOW: C.yellow, GREEN: C.green }[result.urgency] : C.green;

  if (loading || !result) {
    return (
      <div style={{ background: "linear-gradient(160deg,#0F4C7A,#1B6CA8)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 60 }}>🤖</div>
        <div style={{ width: 48, height: 48, border: "4px solid rgba(255,255,255,.3)", borderTop: "4px solid white", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <div style={{ color: "white", fontSize: 18, fontWeight: 800 }}>{t("AI जाँच रहा है...", "AI is analyzing...")}</div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Hero */}
        <div style={{ padding: "44px 16px 22px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", background: GRAD[result.urgency] }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 30, fontSize: 17, fontWeight: 800, color: "white", background: "rgba(255,255,255,.2)", border: "2px solid rgba(255,255,255,.4)", marginBottom: 10 }}>
            {result.urgency === "RED" ? "🔴" : result.urgency === "YELLOW" ? "🟡" : "🟢"} {result.urgency}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "white" }}>{lang === "hi" ? result.conditionHi : result.conditionEn}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginTop: 4 }}>{lang === "hi" ? result.conditionEn : result.conditionHi}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10, justifyContent: "center" }}>
            {selectedSymptoms.map(id => {
              const s = SYMPTOMS_MAP[id];
              if (!s) return null;
              return <span key={id} style={{ background: "rgba(255,255,255,.15)", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "rgba(255,255,255,.85)" }}>{s.emoji} {lang === "hi" ? s.hi : s.en}</span>;
            })}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 130px" }}>
          {[
            { title: t("✅ अभी यह करें", "✅ Do This Now"), items: result.doNow, cross: false, numBg: C.bg, numColor: C.primary },
            { title: t("🚫 यह बिलकुल न करें", "🚫 Do NOT Do This"), items: result.doNot, cross: true, numBg: "#FDEDED", numColor: C.red },
            { title: t("⚠️ इन पर ध्यान दें", "⚠️ Watch For These"), items: result.warnings, cross: false, numBg: "#FEF9E7", numColor: "#B7770D" },
          ].map((section, si) => (
            <div key={si} style={{ background: C.card, borderRadius: 16, padding: 14, marginTop: 12, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 10 }}>{section.title}</div>
              {section.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 0", borderBottom: i < section.items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: section.numBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: section.numColor, flexShrink: 0, marginTop: 1 }}>
                    {section.cross ? "✗" : i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{lang === "hi" ? item.hi : item.en}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{lang === "hi" ? item.en : item.hi}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {/* Info cards */}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            {[
              { label: t("डॉक्टर", "Doctor"), val: lang === "hi" ? result.docType.hi : result.docType.en },
              { label: t("प्रतीक्षा", "Wait"), val: lang === "hi" ? result.wait.hi : result.wait.en, red: result.urgency === "RED" },
              { label: t("संक्रामक?", "Contagious?"), val: lang === "hi" ? result.contagious.hi : result.contagious.en },
            ].map((info, i) => (
              <div key={i} style={{ flex: 1, background: C.card, borderRadius: 12, padding: 12, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, textTransform: "uppercase" }}>{info.label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: info.red ? C.red : C.text, marginTop: 4 }}>{info.val}</div>
              </div>
            ))}
          </div>
          {result.summary && (
            <div style={{ background: C.card, borderRadius: 16, padding: 14, marginTop: 12, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.primary}` }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: .8, marginBottom: 6 }}>🤖 AI Clinical Summary</div>
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, fontStyle: "italic" }}>{result.summary}</div>
            </div>
          )}
        </div>

        {/* Bottom actions */}
        <div style={{ position: "fixed", bottom: 0, width: 390, background: C.card, borderTop: `2px solid ${C.border}`, padding: "10px 16px", display: "flex", flexDirection: "column", gap: 7, zIndex: 50 }}>
          {result.emergency && (
            <a href="tel:108" style={{ background: "linear-gradient(135deg,#E74C3C,#922B21)", color: "white", padding: 13, borderRadius: 14, fontSize: 15, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", textDecoration: "none", animation: "epulse 1.5s infinite" }}>
              📞 {t("108 पर कॉल करें — आपातकाल", "Call 108 — Emergency")}
            </a>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => router.push("/confirm")} style={{ flex: 1, padding: 13, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, color: "white" }}>
              📅 {t("डॉक्टर बुक करें", "Book Doctor")}
            </button>
            <button onClick={() => router.push("/medicine")} style={{ flex: 1, padding: 13, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, background: `linear-gradient(135deg,#27AE60,#1E8449)`, color: "white" }}>
              💊 {t("दवाई खोजें", "Find Medicine")}
            </button>
          </div>
        </div>
        <style>{`@keyframes epulse{0%,100%{box-shadow:0 4px 16px rgba(231,76,60,.5)}50%{box-shadow:0 4px 32px rgba(231,76,60,.9)}}`}</style>
      </div>
    </div>
  );
}
