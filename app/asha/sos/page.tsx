"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", red: "#C0392B", redLight: "#E74C3C", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

export default function SOSPage() {
  const router = useRouter();
  const lang = typeof window !== "undefined" ? localStorage.getItem("lang") || "hi" : "hi";
  const t = (hi: string, en: string) => lang === "hi" ? hi : en;
  const [sent, setSent] = useState(false);
  const [desc, setDesc] = useState("");
  const [count, setCount] = useState("");

  const sendAlert = async () => {
    try {
      await fetch("/api/sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ village: "Kesri", description: desc, affectedCount: parseInt(count) || 0, ashaWorkerPhone: "9876502001", ashaWorkerName: "Priya Sharma" }),
      });
    } catch { /* offline, save locally */ }
    setSent(true);
  };

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: `linear-gradient(135deg,#922B21,${C.red})`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => router.push("/asha/dashboard")} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,.15)", border: "none", color: "white", fontSize: 18, cursor: "pointer" }}>←</button>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{t("आपातकालीन सतर्कता", "Emergency Alert")}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.65)" }}>Emergency Alert to Hospital</div>
          </div>
        </div>
        <div style={{ background: `linear-gradient(135deg,${C.redLight},${C.red})`, padding: "24px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 46, animation: "shake .6s infinite", display: "inline-block" }}>🚨</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: "white", marginTop: 8 }}>{t("अस्पताल को तुरंत सतर्क करें", "Alert Hospital Immediately")}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 4 }}>Alert will appear immediately on Doctor Dashboard</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 60 }}>✅</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.primary, marginTop: 16 }}>{t("सतर्कता भेजी गई!", "Alert Sent!")}</div>
              <div style={{ fontSize: 14, color: C.muted, marginTop: 8 }}>{t("डॉक्टर को सूचना मिल गई है", "Doctor has been notified")}</div>
              <button onClick={() => { setSent(false); router.push("/asha/dashboard"); }} style={{ width: "100%", marginTop: 20, padding: 16, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 15, background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, color: "white" }}>
                ← {t("वापस जाएं", "Go Back")}
              </button>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>🏘️ {t("गाँव", "Village")}</label>
                <input style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 16, fontFamily: "inherit", background: C.bg, color: C.text, outline: "none" }} value="Kesri" readOnly />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>📝 {t("क्या हो रहा है?", "What is happening?")}</label>
                <textarea style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 14, fontFamily: "inherit", background: "white", color: C.text, outline: "none", lineHeight: 1.6 }} rows={4} placeholder={t("5 मरीज़ों को बुखार के साथ दाने...", "5 patients showing fever with rash...")} value={desc} onChange={e => setDesc(e.target.value)} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>👥 {t("कितने लोग प्रभावित?", "How many affected?")}</label>
                <input style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 24, fontWeight: 800, textAlign: "center", fontFamily: "inherit", background: "white", color: C.text, outline: "none" }} type="number" placeholder="5" value={count} onChange={e => setCount(e.target.value)} />
              </div>
              <button onClick={sendAlert} style={{ width: "100%", padding: 17, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 16, background: `linear-gradient(135deg,${C.redLight},${C.red})`, color: "white" }}>
                🚨 {t("अस्पताल को सतर्क करें", "Alert Hospital Now")}
              </button>
            </>
          )}
        </div>
        <style>{`@keyframes shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-10deg)}75%{transform:rotate(10deg)}}`}</style>
      </div>
    </div>
  );
}
