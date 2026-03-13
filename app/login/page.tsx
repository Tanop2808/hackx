"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC", orange: "#E67E22", red: "#C0392B" };

export default function LoginPage() {
  const router = useRouter();
  const { login, register, isAuthenticated } = useAuth();
  const [lang, setLang] = useState("hi");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showReg, setShowReg] = useState(false);
  const [reg, setReg] = useState({ name: "", age: "", gender: "", village: "", conditions: "", bloodGroup: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const t = (hi: string, en: string) => lang === "hi" ? hi : en;

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "hi";
    setLang(storedLang);
    
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  const handleContinue = async () => {
    setError("");
    if (!phone || !password) {
      setError(t("फोन और पासवर्ड दोनों दर्ज करें", "Enter both phone and password"));
      return;
    }

    setLoading(true);
    const result = await login(phone, password);
    if (result.success) {
      router.push("/home");
    } else {
      setError(result.error || t("लॉगिन विफल", "Login failed"));
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setError("");
    if (!phone || !password || !reg.name || !reg.age || !reg.gender || !reg.village) {
      setError(t("सभी आवश्यक क्षेत्र भरें", "Fill all required fields"));
      return;
    }

    setLoading(true);
    const result = await register(
      phone,
      password,
      reg.name,
      reg.age,
      reg.gender,
      reg.village,
      reg.conditions,
      reg.bloodGroup
    );
    if (result.success) {
      router.push("/home");
    } else {
      setError(result.error || t("पंजीकरण विफल", "Registration failed"));
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
            {showReg ? t("नया खाता बनाएं", "Create Account") : t("नमस्ते\nअपना नंबर दर्ज करें", "Hello\nEnter your mobile number")}
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginTop: 4 }}>
            {t("आपका फ़ोन नंबर ही आपकी पहचान है", "Your phone number is your identity")}
          </p>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px" }}>

          {/* Error message */}
          {error && (
            <div style={{ background: "#FADBD8", borderRadius: 10, padding: "12px", marginBottom: 14, border: `1px solid ${C.red}`, fontSize: 13, color: C.red }}>
              {error}
            </div>
          )}

          {/* Phone input */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>
              📱 {t("मोबाइल नंबर", "Mobile Number")}
            </label>
            <div style={{ display: "flex", alignItems: "center", border: `2px solid ${C.border}`, borderRadius: 14, overflow: "hidden", background: C.card }}>
              <span style={{ background: C.bg, padding: "14px", fontSize: 17, fontWeight: 700, color: C.muted, borderRight: `2px solid ${C.border}` }}>+91</span>
              <input
                style={{ flex: 1, border: "none", outline: "none", fontSize: 20, fontWeight: 700, padding: "14px", background: "transparent", color: C.text, letterSpacing: 1 }}
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value.slice(0, 10))}
                maxLength={10}
                disabled={loading}
                placeholder="0000000000"
              />
            </div>
          </div>

          {/* Password input */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>
              🔐 {t("पासवर्ड", "Password")}
            </label>
            <input
              style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 14, fontSize: 15, fontFamily: "inherit", background: C.card, color: C.text, outline: "none" }}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
              placeholder={t("अपना पासवर्ड दर्ज करें", "Enter your password")}
            />
          </div>

          {/* Patient login / register */}
          {!showReg ? (
            <>
              <button
                onClick={handleContinue}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  borderRadius: 14,
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: 700,
                  fontSize: 16,
                  background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`,
                  color: "white",
                  boxShadow: "0 4px 16px rgba(27,108,168,.4)",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "..." : `▶ ${t("जारी रखें", "Continue")}`}
              </button>
              <button
                onClick={() => setShowReg(true)}
                disabled={loading}
                style={{
                  background: "none",
                  border: "none",
                  color: C.primary,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginTop: 10,
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {t("✨ नया खाता बनाएं", "✨ Create New Account")}
              </button>
            </>
          ) : (
            <div>
              <div style={{ background: "#FEF9E7", borderRadius: 10, padding: "9px 12px", marginBottom: 12, border: "1px solid #F4D03F", fontSize: 13, color: "#7D6608" }}>
                {t("✨ नया खाता बनाएं", "✨ Create New Account")}
              </div>
              {[
                { key: "name", label: t("👤 पूरा नाम", "👤 Full Name"), ph: t("आपका नाम", "Your name"), type: "text" },
                { key: "age", label: t("🎂 उम्र", "🎂 Age"), ph: "25", type: "number" },
                { key: "village", label: t("🏘️ गाँव", "🏘️ Village"), ph: t("आपका गाँव", "Your village"), type: "text" },
                { key: "conditions", label: t("💊 पुरानी बीमारियाँ", "💊 Existing Conditions"), ph: t("डायबिटीज़, BP... (वैकल्पिक)", "Diabetes, BP... (optional)"), type: "text" },
                { key: "bloodGroup", label: t("🩸 रक्त समूह", "🩸 Blood Group"), ph: "B+", type: "text" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>{f.label}</label>
                  <input
                    style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 15, fontFamily: "inherit", background: C.card, color: C.text, outline: "none" }}
                    type={f.type}
                    placeholder={f.ph}
                    value={reg[f.key as keyof typeof reg]}
                    onChange={e => setReg({ ...reg, [f.key]: e.target.value })}
                    disabled={loading}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>
                  ⚧ {t("लिंग", "Gender")}
                </label>
                <select
                  style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 15, fontFamily: "inherit", background: C.card, color: C.text, outline: "none", appearance: "none" }}
                  value={reg.gender}
                  onChange={e => setReg({ ...reg, gender: e.target.value })}
                  disabled={loading}
                >
                  <option value="">{t("चुनें", "Select")}</option>
                  <option value="female">{t("महिला", "Female")}</option>
                  <option value="male">{t("पुरुष", "Male")}</option>
                  <option value="other">{t("अन्य", "Other")}</option>
                </select>
              </div>
              <button
                onClick={handleRegister}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: 14,
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: 700,
                  fontSize: 16,
                  background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`,
                  color: "white",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                ✓ {t("खाता बनाएं", "Create Account")}
              </button>
              <button
                onClick={() => { setShowReg(false); setError(""); }}
                disabled={loading}
                style={{
                  background: "none",
                  border: "none",
                  color: C.primary,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginTop: 10,
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                }}
              >
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

          <button
            onClick={() => router.push("/doctor/login")}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 14,
              border: `2px solid ${C.border}`,
              background: C.card,
              color: C.primary,
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            👨‍⚕️ {t("डॉक्टर लॉगिन", "Doctor Login")}
          </button>

          <button
            onClick={() => router.push("/asha/dashboard")}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 14,
              border: `2px solid ${C.border}`,
              background: C.card,
              color: C.primary,
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            👩‍🌾 {t("ASHA कार्यकर्ता", "ASHA Worker")}
          </button>
        </div>
      </div>
    </div>
  );
}