"use client";
import { useRouter } from "next/navigation";

const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", green: "#1E8449", red: "#C0392B", yellow: "#F39C12", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

export default function RecordsPage() {
  const router = useRouter();
  const lang = typeof window !== "undefined" ? localStorage.getItem("lang") || "hi" : "hi";
  const t = (hi: string, en: string) => lang === "hi" ? hi : en;

  const history = [
    { dot: C.red, cond: t("🔴 बुखार + सीने में दर्द", "🔴 Fever + Chest Pain"), date: t("आज · 11:42 AM · Sync बाकी", "Today · 11:42 AM · Pending sync"), rx: t("⏳ डॉक्टर से जवाब का इंतज़ार", "⏳ Awaiting doctor response"), rxColor: C.red },
    { dot: C.yellow, cond: t("🟡 बुखार + खांसी + जुकाम", "🟡 Fever + Cough + Cold"), date: t("15 फ़र 2026 · पूर्ण", "15 Feb 2026 · Completed"), rx: "💊 Rx: Paracetamol 500mg + Cough Syrup", rxColor: C.green },
    { dot: C.green, cond: t("🟢 सिरदर्द + थकान", "🟢 Headache + Fatigue"), date: t("3 जन 2026 · पूर्ण", "3 Jan 2026 · Completed"), rx: t("💊 Rx: आराम करें + पानी पिएं", "💊 Rx: Rest + Plenty of water"), rxColor: C.green },
  ];

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#FDEDED", padding: "6px 16px", fontSize: 12, fontWeight: 700, color: C.red, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red }} />
          {t("ऑफलाइन — डिवाइस से रिकॉर्ड", "Offline — Records from device")}
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", gap: 10, background: C.card, borderBottom: `1px solid ${C.border}` }}>
          <button onClick={() => router.push("/home")} style={{ width: 36, height: 36, borderRadius: 10, background: C.bg, border: "none", fontSize: 18, cursor: "pointer" }}>←</button>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{t("मेरे स्वास्थ्य रिकॉर्ड", "My Health Records")}</div>
            <div style={{ fontSize: 11, color: C.muted }}>My Health Records</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {/* Profile card */}
          <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 14 }}>
            <div style={{ background: "linear-gradient(135deg,#EBF4FD,#DDEEFF)", padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "white", flexShrink: 0 }}>R</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{t("रामकली देवी", "Ramkali Devi")}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>Female · 52 years · Kesri · 📱 9876501001</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", display: "flex", gap: 10 }}>
              {[{ v: "B+", l: "Blood Group" }, { v: "52", l: t("Age / उम्र", "Age") }, { v: "Diabetes", l: t("Condition", "Condition") }].map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center", padding: 8, background: C.bg, borderRadius: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>{d.v}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{d.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>📜 {t("पिछली विज़िट", "Past Consultations")}</div>
          {history.map((item, i) => (
            <div key={i} style={{ background: C.card, borderRadius: 12, border: `2px solid ${C.border}`, padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.dot, flexShrink: 0, marginTop: 4 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{item.cond}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{item.date}</div>
                <div style={{ fontSize: 12, color: item.rxColor, marginTop: 4, fontStyle: "italic" }}>{item.rx}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
