"use client";
import { useRouter } from "next/navigation";

const C = { primary: "#1B6CA8", green: "#1E8449", red: "#C0392B", yellow: "#F39C12", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

export default function ASHADashboardPage() {
  const router = useRouter();
  const lang = typeof window !== "undefined" ? localStorage.getItem("lang") || "hi" : "hi";
  const t = (hi: string, en: string) => lang === "hi" ? hi : en;

  const patients = [
    { av: "R", avStyle: { background: "#FDEDED", borderColor: "#F1948A", color: C.red }, name: "रामकली देवी", meta: "52F · Kesri · Today", badges: [{ c: C.green, bg: "#E8F8EF", text: "✓ App सीख लिया" }, { c: C.red, bg: "#FDEDED", text: "🔴 RED" }], alert: true },
    { av: "S", name: "सुरेश कुमार", meta: "38M · Nabha Sector 4 · 3 days ago", badges: [{ c: C.green, bg: "#E8F8EF", text: "✓ App सीख लिया" }] },
    { av: "G", avStyle: { background: "#FEF9E7", borderColor: "#F4D03F", color: "#B7770D" }, name: "गीता रानी", meta: "65F · Kesri · 1 week ago", badges: [{ c: "#B7770D", bg: "#FEF9E7", text: "⏳ सीख रही हैं" }] },
    { av: "H", avStyle: { background: C.bg, color: C.muted, borderColor: C.border }, name: "हरजीत सिंह", meta: "71M · Barnala Road · No visits", badges: [{ c: C.red, bg: "#FDEDED", text: "✗ Not Onboarded" }] },
  ];

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#FDEDED", padding: "6px 16px", fontSize: 12, fontWeight: 700, color: C.red, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red, animation: "pulse 1s infinite" }} />
          {t("ऑफलाइन — 1 विज़िट sync बाकी", "Offline — 1 visit waiting to sync")}
        </div>
        <div style={{ background: "linear-gradient(135deg,#7D3C98,#5B2C6F)", padding: "16px 16px 22px", position: "relative" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "white" }}>{t("मेरे गाँव के मरीज़", "My Village Patients")}</h2>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.7)", marginTop: 2 }}>Priya Sharma · Kesri, Nabha Sector 4, Barnala Road</p>
          <button onClick={() => router.push("/asha/sos")} style={{ position: "absolute", top: 16, right: 16, background: C.red, color: "white", border: "none", borderRadius: 10, padding: "8px 14px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>🚨 SOS</button>
        </div>
        <div style={{ background: "#FDEDED", padding: "11px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid #F1948A` }}>
          <span style={{ fontSize: 20 }}>🔴</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.red }}>Alert: Ramkali Devi (Kesri) — RED Urgency</div>
            <div style={{ fontSize: 11, color: C.muted }}>Chest pain + breathlessness — needs immediate help</div>
          </div>
        </div>
        <div style={{ display: "flex", background: C.card, borderBottom: `1px solid ${C.border}` }}>
          {[{ n: "12", l: t("कुल मरीज़", "Total") }, { n: "7", l: t("App सीखा", "Onboarded"), c: C.green }, { n: "3", l: t("सीख रहे", "In Progress"), c: C.yellow }, { n: "2", l: t("नहीं जोड़े", "Not Added"), c: C.red }].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "10px 8px", textAlign: "center", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.c || C.primary }}>{s.n}</div>
              <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.3 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {patients.map((p, i) => (
            <div key={i} style={{ background: C.card, borderRadius: 16, padding: 14, display: "flex", alignItems: "center", gap: 10, marginBottom: 10, border: p.alert ? `2px solid #F1948A` : `1px solid ${C.border}` }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.primary, border: `2px solid ${C.primary}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "white", flexShrink: 0, ...p.avStyle }}>{p.av}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{p.meta}</div>
                <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
                  {p.badges.map((b, j) => <span key={j} style={{ display: "inline-flex", padding: "3px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: b.bg, color: b.c }}>{b.text}</span>)}
                </div>
              </div>
              <button onClick={() => router.push("/asha/log-visit")} style={{ padding: "8px 12px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bg, fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>📝 Log</button>
            </div>
          ))}
        </div>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
      </div>
    </div>
  );
}
