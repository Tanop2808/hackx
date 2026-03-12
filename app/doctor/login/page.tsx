// "use client";
// import { useRouter } from "next/navigation";

// const C = { primary: "#1B6CA8", green: "#1E8449", red: "#C0392B", yellow: "#F39C12", redLight: "#E74C3C", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

// export default function DoctorLoginPage() {
//   const router = useRouter();

//   return (
//     <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
//       <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
//         <div style={{ background: "linear-gradient(135deg,#1A2332,#2C3E50)", padding: "44px 20px 22px" }}>
//           <div style={{ fontSize: 32 }}>👨‍⚕️</div>
//           <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginTop: 8 }}>Doctor Login</h2>
//           <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", marginTop: 4 }}>Nabha Civil Hospital · Staff Portal</p>
//         </div>
//         <div style={{ padding: "18px 16px" }}>
//           {[{ lbl: "📧 Email", val: "doctor@sehat.com", type: "email" }, { lbl: "🔑 Password", val: "doctor123", type: "password" }].map((f, i) => (
//             <div key={i} style={{ marginBottom: 14 }}>
//               <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>{f.lbl}</label>
//               <input style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 16, fontFamily: "inherit", background: C.card, outline: "none" }} defaultValue={f.val} type={f.type} />
//             </div>
//           ))}
//           <button onClick={() => router.push("/doctor/dashboard")} style={{ width: "100%", padding: 16, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 15, background: "linear-gradient(135deg,#1A2332,#2C3E50)", color: "white" }}>
//             → Open Doctor Dashboard
//           </button>
//           <button onClick={() => router.push("/login")} style={{ width: "100%", marginTop: 10, padding: "14px", borderRadius: 14, border: `2px solid ${C.border}`, background: C.bg, color: C.primary, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
//             ← Patient Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



//---------------------new doctor login page---------------------///



"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", green: "#1E8449", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC", red: "#C0392B" };

export default function DoctorLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"login" | "otp">("login");
  const [email, setEmail] = useState("doctor@sehat.com");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const otpRefs = [useState(null), useState(null), useState(null), useState(null)].map(() => ({ current: null as HTMLInputElement | null }));

  const handleLogin = async () => {
    if (!email || !password) { setError("Please fill all fields"); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 700));
    // Mock: accept any password for demo
    setLoading(false); setStep("otp");
  };

  const handleVerify = () => {
    const entered = otp.join("");
    if (entered !== "1234" && entered !== "0000") { setError("Invalid OTP. Use 1234 for demo."); return; }
    router.push("/doctor/dashboard");
  };

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "linear-gradient(135deg,#1A2332,#2C3E50)", padding: "56px 24px 32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -20, top: -20, fontSize: 120, opacity: .05 }}>👨‍⚕️</div>
          <div style={{ width: 52, height: 52, background: "rgba(255,255,255,.12)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 16 }}>🏥</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", margin: 0 }}>{step === "login" ? "Doctor Login" : "Verify OTP"}</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginTop: 6 }}>Nabha Civil Hospital · Staff Portal</p>
        </div>
        <div style={{ flex: 1, padding: "24px 20px" }}>
          {error && <div style={{ background: "#FDEDED", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: C.red, fontWeight: 600 }}>⚠ {error}</div>}
          {step === "login" ? (
            <>
              {[{ lbl: "📧 Email / Employee ID", val: email, set: setEmail, type: "email" }, { lbl: "🔑 Password", val: password, set: setPassword, type: "password" }].map((f, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, display: "block", marginBottom: 6 }}>{f.lbl}</label>
                  <input style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 15, fontFamily: "inherit", background: C.card, outline: "none", boxSizing: "border-box" }}
                    value={f.val} onChange={e => { f.set(e.target.value); setError(""); }} type={f.type} placeholder={f.type === "password" ? "••••••••" : undefined} />
                </div>
              ))}
              <button onClick={handleLogin} disabled={loading}
                style={{ width: "100%", padding: 16, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 15, background: "linear-gradient(135deg,#1A2332,#2C3E50)", color: "white" }}>
                {loading ? "..." : "→ Send OTP"}
              </button>
            </>
          ) : (
            <>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 20, textAlign: "center" }}>OTP sent to registered email/phone</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 24 }}>
                {otp.map((d, i) => (
                  <input key={i}
                    style={{ width: 64, height: 64, borderRadius: 14, border: `2px solid ${d ? C.primary : C.border}`, background: C.card, textAlign: "center", fontSize: 28, fontWeight: 800, color: C.text, outline: "none" }}
                    type="tel" inputMode="numeric" maxLength={1} value={d}
                    onChange={e => {
                      if (!/^\d?$/.test(e.target.value)) return;
                      const next = [...otp]; next[i] = e.target.value; setOtp(next); setError("");
                    }} />
                ))}
              </div>
              <div style={{ background: "#FEF9E7", borderRadius: 12, padding: 12, marginBottom: 16, border: "1px solid #F4D03F" }}>
                <p style={{ fontSize: 12, color: "#7D6608", margin: 0 }}>💡 Demo OTP: <strong>1234</strong></p>
              </div>
              <button onClick={handleVerify}
                style={{ width: "100%", padding: 16, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 15, background: "linear-gradient(135deg,#1A2332,#2C3E50)", color: "white" }}>
                ✓ Verify & Open Dashboard
              </button>
              <button onClick={() => setStep("login")} style={{ background: "none", border: "none", color: C.primary, fontSize: 13, fontWeight: 700, cursor: "pointer", textDecoration: "underline", marginTop: 12, display: "block", width: "100%", textAlign: "center" }}>
                ← Back to Login
              </button>
            </>
          )}
          <div style={{ height: 1, background: C.border, margin: "20px 0" }} />
          <button onClick={() => router.push("/login")} style={{ width: "100%", padding: 14, borderRadius: 14, border: `2px solid ${C.border}`, background: C.bg, color: C.primary, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            ← Patient Login
          </button>
        </div>
      </div>
    </div>
  );
}