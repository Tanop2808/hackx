"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC", orange: "#E67E22" };

export default function LoginPage() {
  const router = useRouter();
  const lang = typeof window !== "undefined" ? localStorage.getItem("lang") || "hi" : "hi";
  const t = (hi: string, en: string) => lang === "hi" ? hi : en;

  const [phone, setPhone] = useState("9876501001");
  const [showReg, setShowReg] = useState(false);
  const [reg, setReg] = useState({ name: "", age: "", gender: "", village: "", conditions: "" });
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/patients?phone=${phone}`);
      const data = await res.json();
      if (data.patient) {
        localStorage.setItem("patient", JSON.stringify(data.patient));
        router.push("/home");
      } else {
        setShowReg(true);
      }
    } catch {
      localStorage.setItem("patient", JSON.stringify({ phone, name: "रामकली देवी", age: 52, gender: "female", village: "Kesri", conditions: ["Diabetes"], bloodGroup: "B+" }));
      router.push("/home");
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, ...reg }),
      });
      localStorage.setItem("patient", JSON.stringify({ phone, ...reg }));
      router.push("/home");
    } catch {
      localStorage.setItem("patient", JSON.stringify({ phone, ...reg }));
      router.push("/home");
    }
    setLoading(false);
  };

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, padding: "44px 20px 22px" }}>
          <div style={{ fontSize: 32 }}>🙏</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", lineHeight: 1.3, marginTop: 8 }}>
            {t("नमस्ते\nअपना नंबर दर्ज करें", "Hello\nEnter your mobile number")}
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginTop: 4 }}>
            {t("आपका फ़ोन नंबर ही आपकी पहचान है", "Your phone number is your identity")}
          </p>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px" }}>

          {/* Phone input */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>
              📱 {t("मोबाइल नंबर", "Mobile Number")}
            </label>
            <div style={{ display: "flex", alignItems: "center", border: `2px solid ${C.border}`, borderRadius: 14, overflow: "hidden", background: C.card }}>
              <span style={{ background: C.bg, padding: "14px", fontSize: 17, fontWeight: 700, color: C.muted, borderRight: `2px solid ${C.border}` }}>+91</span>
              <input
                style={{ flex: 1, border: "none", outline: "none", fontSize: 20, fontWeight: 700, padding: "14px", background: "transparent", color: C.text, letterSpacing: 1 }}
                type="tel" value={phone} onChange={e => setPhone(e.target.value)} maxLength={10} />
            </div>
          </div>

          {/* Patient login / register */}
          {!showReg ? (
            <>
              <button onClick={handleContinue} disabled={loading}
                style={{ width: "100%", padding: "16px 24px", borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 16, background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, color: "white", boxShadow: "0 4px 16px rgba(27,108,168,.4)" }}>
                {loading ? "..." : `▶ ${t("जारी रखें", "Continue")}`}
              </button>
              <button onClick={() => setShowReg(true)}
                style={{ background: "none", border: "none", color: C.primary, fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "underline", marginTop: 10, display: "block", width: "100%", textAlign: "center" }}>
                {t("✨ नया खाता बनाएं", "✨ Create New Account")}
              </button>
            </>
          ) : (
            <div>
              <div style={{ background: "#FEF9E7", borderRadius: 10, padding: "9px 12px", marginBottom: 12, border: "1px solid #F4D03F", fontSize: 13, color: "#7D6608" }}>
                {t("✨ नया खाता बनाएं", "✨ Create New Account")}
              </div>
              {[
                { key: "name", label: t("👤 पूरा नाम", "👤 Full Name"), ph: t("रामकली देवी", "Ramkali Devi"), type: "text" },
                { key: "age", label: t("🎂 उम्र", "🎂 Age"), ph: "52", type: "number" },
                { key: "village", label: t("🏘️ गाँव", "🏘️ Village"), ph: t("केसरी", "Kesri"), type: "text" },
                { key: "conditions", label: t("💊 पुरानी बीमारियाँ", "💊 Existing Conditions"), ph: t("डायबिटीज़, BP...", "Diabetes, BP..."), type: "text" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>{f.label}</label>
                  <input
                    style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 15, fontFamily: "inherit", background: C.card, color: C.text, outline: "none" }}
                    type={f.type} placeholder={f.ph} value={reg[f.key as keyof typeof reg]}
                    onChange={e => setReg({ ...reg, [f.key]: e.target.value })} />
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>
                  ⚧ {t("लिंग", "Gender")}
                </label>
                <select
                  style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 15, fontFamily: "inherit", background: C.card, color: C.text, outline: "none", appearance: "none" }}
                  value={reg.gender} onChange={e => setReg({ ...reg, gender: e.target.value })}>
                  <option value="">{t("चुनें", "Select")}</option>
                  <option value="female">{t("महिला", "Female")}</option>
                  <option value="male">{t("पुरुष", "Male")}</option>
                </select>
              </div>
              <button onClick={handleRegister} disabled={loading}
                style={{ width: "100%", padding: "16px", borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 16, background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, color: "white" }}>
                ✓ {t("खाता बनाएं", "Create Account")}
              </button>
              <button onClick={() => setShowReg(false)}
                style={{ background: "none", border: "none", color: C.primary, fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "underline", marginTop: 10, display: "block", width: "100%", textAlign: "center" }}>
                ← {t("वापस", "Go Back")}
              </button>
            </div>
          )}

          {/* Divider */}
          <div style={{ height: 1, background: C.border, margin: "20px 0" }} />

          {/* Other login options */}
          <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, textAlign: "center", marginBottom: 12 }}>
            {t("अन्य लॉगिन", "Other Logins")}
          </p>

          <button onClick={() => router.push("/doctor/login")}
            style={{ width: "100%", padding: "14px", borderRadius: 14, border: `2px solid ${C.border}`, background: C.card, color: C.primary, fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            👨‍⚕️ {t("डॉक्टर लॉगिन", "Doctor Login")}
          </button>

          <button onClick={() => router.push("/asha/dashboard")}
            style={{ width: "100%", padding: "14px", borderRadius: 14, border: `2px solid ${C.border}`, background: C.card, color: C.primary, fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            👩 {t("ASHA वर्कर लॉगिन", "ASHA Worker Login")}
          </button>

          {/* Pharmacist login — NEW */}
          <button onClick={() => router.push("/pharmacist/login")}
            style={{ width: "100%", padding: "14px", borderRadius: 14, border: `2px solid ${C.orange}`, background: "#FEF3E8", color: C.orange, fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            🏪 {t("फार्मासिस्ट लॉगिन", "Pharmacist Login")}
          </button>

        </div>
      </div>
    </div>
  );
}