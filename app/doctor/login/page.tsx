"use client";
import { useRouter } from "next/navigation";

const C = { primary: "#1B6CA8", green: "#1E8449", red: "#C0392B", yellow: "#F39C12", redLight: "#E74C3C", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

export default function DoctorLoginPage() {
  const router = useRouter();

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "linear-gradient(135deg,#1A2332,#2C3E50)", padding: "44px 20px 22px" }}>
          <div style={{ fontSize: 32 }}>👨‍⚕️</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginTop: 8 }}>Doctor Login</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", marginTop: 4 }}>Nabha Civil Hospital · Staff Portal</p>
        </div>
        <div style={{ padding: "18px 16px" }}>
          {[{ lbl: "📧 Email", val: "doctor@sehat.com", type: "email" }, { lbl: "🔑 Password", val: "doctor123", type: "password" }].map((f, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6, display: "block" }}>{f.lbl}</label>
              <input style={{ width: "100%", padding: "14px 16px", border: `2px solid ${C.border}`, borderRadius: 12, fontSize: 16, fontFamily: "inherit", background: C.card, outline: "none" }} defaultValue={f.val} type={f.type} />
            </div>
          ))}
          <button onClick={() => router.push("/doctor/dashboard")} style={{ width: "100%", padding: 16, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 15, background: "linear-gradient(135deg,#1A2332,#2C3E50)", color: "white" }}>
            → Open Doctor Dashboard
          </button>
          <button onClick={() => router.push("/login")} style={{ width: "100%", marginTop: 10, padding: "14px", borderRadius: 14, border: `2px solid ${C.border}`, background: C.bg, color: C.primary, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            ← Patient Login
          </button>
        </div>
      </div>
    </div>
  );
}
