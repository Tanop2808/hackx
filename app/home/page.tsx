// "use client";
// import { useRouter } from "next/navigation";

// const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", green: "#1E8449", greenLight: "#27AE60", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC", red: "#C0392B" };

// export default function HomePage() {
//   const router = useRouter();
//   const lang = typeof window !== "undefined" ? localStorage.getItem("lang") || "hi" : "hi";
//   const t = (hi: string, en: string) => lang === "hi" ? hi : en;

//   return (
//     <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
//       <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
//         {/* Offline bar */}
//         <div style={{ background: "#E8F8EF", padding: "6px 16px", fontSize: 12, fontWeight: 700, color: C.green, display: "flex", alignItems: "center", gap: 6 }}>
//           <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
//           {t("ऑनलाइन — AI सक्रिय है", "Online — AI Active")}
//         </div>
//         {/* Hero */}
//         <div style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, padding: "16px 16px 22px", position: "relative", overflow: "hidden" }}>
//           <div style={{ position: "absolute", right: -10, top: -10, fontSize: 80, opacity: .07 }}>🏥</div>
//           <div style={{ fontSize: 22, fontWeight: 800, color: "white" }}>{t("नमस्ते रामकली जी 🙏", "Hello Ramkali 🙏")}</div>
//           <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)", marginTop: 2 }}>Ramkali Devi · Kesri Village</div>
//           <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.18)", padding: "6px 12px", borderRadius: 20, fontSize: 12, color: "rgba(255,255,255,.9)", marginTop: 10 }}>
//             🩸 B+ · 💊 Diabetes · 52 {t("वर्ष", "years")}
//           </div>
//         </div>
//         {/* Actions */}
//         <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {[
//               { icon: "🩺", title: t("लक्षण जाँचें", "Check My Symptoms"), sub: t("AI से जाँचें — बिना इंटरनेट", "AI powered — works offline"), bg: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, shadow: "rgba(27,108,168,.45)", path: "/symptoms" },
//               { icon: "📋", title: t("मेरे स्वास्थ्य रिकॉर्ड", "My Health Records"), sub: t("पिछली विज़िट और नुस्खे देखें", "View past visits & prescriptions"), bg: "linear-gradient(135deg,#6C3483,#4A235A)", shadow: "rgba(108,52,131,.35)", path: "/records" },
//               { icon: "💊", title: t("दवाई खोजें", "Find Medicine Nearby"), sub: t("पास की दुकान में दवाई उपलब्धता", "Check stock at nearby pharmacies"), bg: `linear-gradient(135deg,${C.greenLight},${C.green})`, shadow: "rgba(30,132,73,.35)", path: "/medicine" },
//             ].map((action, i) => (
//               <button key={i} onClick={() => router.push(action.path)}
//                 style={{ display: "flex", alignItems: "center", padding: 18, borderRadius: 18, border: "none", cursor: "pointer", textAlign: "left", gap: 14, background: action.bg, boxShadow: `0 6px 24px ${action.shadow}`, transition: "all .2s" }}>
//                 <div style={{ width: 54, height: 54, borderRadius: 14, background: "rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{action.icon}</div>
//                 <div style={{ flex: 1 }}>
//                   <h3 style={{ fontSize: 16, fontWeight: 800, color: "white", lineHeight: 1.2 }}>{action.title}</h3>
//                   <p style={{ fontSize: 11, color: "rgba(255,255,255,.7)", marginTop: 2 }}>{action.sub}</p>
//                 </div>
//                 <span style={{ fontSize: 20, color: "rgba(255,255,255,.5)" }}>›</span>
//               </button>
//             ))}
//           </div>
//           {/* Stats */}
//           <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
//             {[{ n: "3", l: t("पिछली विज़िट", "Past Visits") }, { n: "2", l: t("डॉक्टर उपलब्ध", "Doctors") }, { n: "3", l: t("पास की दुकान", "Pharmacies") }].map((s, i) => (
//               <div key={i} style={{ flex: 1, background: C.card, borderRadius: 12, padding: 12, textAlign: "center", border: `1px solid ${C.border}` }}>
//                 <div style={{ fontSize: 22, fontWeight: 800, color: C.primary }}>{s.n}</div>
//                 <div style={{ fontSize: 10, color: C.muted, marginTop: 2, lineHeight: 1.3 }}>{s.l}</div>
//               </div>
//             ))}
//           </div>
//           {/* Alert */}
//           <div style={{ background: "#FDEDED", borderRadius: 12, padding: 12, border: "1px solid #F1948A", display: "flex", alignItems: "flex-start", gap: 8, marginTop: 14 }}>
//             <span style={{ fontSize: 20 }}>🔴</span>
//             <div>
//               <div style={{ fontSize: 13, fontWeight: 700, color: C.red }}>{t("पिछली जाँच पेंडिंग है", "Pending Consultation")}</div>
//               <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{t("डॉक्टर आपका केस देख रहे हैं", "Doctor is reviewing your case")}</div>
//             </div>
//           </div>
//         </div>
//         <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
//       </div>
//     </div>
//   );
// }


//----------------------------------------------------------new vala ----------------------------------------------------------------------------------///



// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", green: "#1E8449", greenLight: "#27AE60", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC", red: "#C0392B" };

// export default function HomePage() {
//   const router = useRouter();
//   const [userName, setUserName] = useState("");
//   const [userDetail, setUserDetail] = useState("");
//   const [userInfo, setUserInfo] = useState("");
//   const [lang, setLang] = useState("hi");
//   const [ready, setReady] = useState(false);

//   const t = (hi: string, en: string) => lang === "hi" ? hi : en;

//   useEffect(() => {
//     const storedLang = localStorage.getItem("lang") || "hi";
//     setLang(storedLang);

//     try {
//       const stored = localStorage.getItem("patient");
//       if (!stored) {
//         router.push("/login");
//         return;
//       }
//       const p = JSON.parse(stored);
//       const name = p.name || p.phone || "User";
//       const village = p.village || "";
//       const age = p.age || "";
//       const conditions = Array.isArray(p.conditions)
//         ? p.conditions.join(", ")
//         : p.conditions || "";
//       const bloodGroup = p.bloodGroup || "";

//       setUserName(name);
//       setUserDetail(village ? `${name} · ${village}` : name);

//       const parts = [];
//       if (bloodGroup) parts.push(`🩸 ${bloodGroup}`);
//       if (conditions) parts.push(`💊 ${conditions}`);
//       if (age) parts.push(`${age} ${storedLang === "hi" ? "वर्ष" : "years"}`);
//       setUserInfo(parts.join(" · "));
//     } catch {
//       router.push("/login");
//       return;
//     }
//     setReady(true);
//   }, []);

//   if (!ready) return null;

//   return (
//     <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
//       <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
//         <div style={{ background: "#E8F8EF", padding: "6px 16px", fontSize: 12, fontWeight: 700, color: C.green, display: "flex", alignItems: "center", gap: 6 }}>
//           <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
//           {t("ऑनलाइन — AI सक्रिय है", "Online — AI Active")}
//         </div>
//         <div style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, padding: "16px 16px 22px", position: "relative", overflow: "hidden" }}>
//           <div style={{ position: "absolute", right: -10, top: -10, fontSize: 80, opacity: .07 }}>🏥</div>
//           <div style={{ fontSize: 22, fontWeight: 800, color: "white" }}>
//             {t(`नमस्ते ${userName} जी 🙏`, `Hello ${userName} 🙏`)}
//           </div>
//           <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)", marginTop: 2 }}>{userDetail}</div>
//           {userInfo ? (
//             <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.18)", padding: "6px 12px", borderRadius: 20, fontSize: 12, color: "rgba(255,255,255,.9)", marginTop: 10 }}>
//               {userInfo}
//             </div>
//           ) : null}
//         </div>
//         <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {[
//               { icon: "🩺", title: t("लक्षण जाँचें", "Check My Symptoms"), sub: t("AI से जाँचें — बिना इंटरनेट", "AI powered — works offline"), bg: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, shadow: "rgba(27,108,168,.45)", path: "/symptoms" },
//               { icon: "📋", title: t("मेरे स्वास्थ्य रिकॉर्ड", "My Health Records"), sub: t("पिछली विज़िट और नुस्खे देखें", "View past visits & prescriptions"), bg: "linear-gradient(135deg,#6C3483,#4A235A)", shadow: "rgba(108,52,131,.35)", path: "/records" },
//               { icon: "💊", title: t("दवाई खोजें", "Find Medicine Nearby"), sub: t("पास की दुकान में दवाई उपलब्धता", "Check stock at nearby pharmacies"), bg: `linear-gradient(135deg,${C.greenLight},${C.green})`, shadow: "rgba(30,132,73,.35)", path: "/medicine" },
//             ].map((action, i) => (
//               <button key={i} onClick={() => router.push(action.path)}
//                 style={{ display: "flex", alignItems: "center", padding: 18, borderRadius: 18, border: "none", cursor: "pointer", textAlign: "left", gap: 14, background: action.bg, boxShadow: `0 6px 24px ${action.shadow}`, transition: "all .2s" }}>
//                 <div style={{ width: 54, height: 54, borderRadius: 14, background: "rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{action.icon}</div>
//                 <div style={{ flex: 1 }}>
//                   <h3 style={{ fontSize: 16, fontWeight: 800, color: "white", lineHeight: 1.2 }}>{action.title}</h3>
//                   <p style={{ fontSize: 11, color: "rgba(255,255,255,.7)", marginTop: 2 }}>{action.sub}</p>
//                 </div>
//                 <span style={{ fontSize: 20, color: "rgba(255,255,255,.5)" }}>›</span>
//               </button>
//             ))}
//           </div>
//           <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
//             {[
//               { n: "3", l: t("पिछली विज़िट", "Past Visits") },
//               { n: "2", l: t("डॉक्टर उपलब्ध", "Doctors") },
//               { n: "3", l: t("पास की दुकान", "Pharmacies") }
//             ].map((s, i) => (
//               <div key={i} style={{ flex: 1, background: C.card, borderRadius: 12, padding: 12, textAlign: "center", border: `1px solid ${C.border}` }}>
//                 <div style={{ fontSize: 22, fontWeight: 800, color: C.primary }}>{s.n}</div>
//                 <div style={{ fontSize: 10, color: C.muted, marginTop: 2, lineHeight: 1.3 }}>{s.l}</div>
//               </div>
//             ))}
//           </div>
//           <div style={{ background: "#FDEDED", borderRadius: 12, padding: 12, border: "1px solid #F1948A", display: "flex", alignItems: "flex-start", gap: 8, marginTop: 14 }}>
//             <span style={{ fontSize: 20 }}>🔴</span>
//             <div>
//               <div style={{ fontSize: 13, fontWeight: 700, color: C.red }}>{t("पिछली जाँच पेंडिंग है", "Pending Consultation")}</div>
//               <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{t("डॉक्टर आपका केस देख रहे हैं", "Doctor is reviewing your case")}</div>
//             </div>
//           </div>
//           <button onClick={() => { localStorage.removeItem("patient"); router.push("/login"); }}
//             style={{ width: "100%", marginTop: 14, padding: "12px", borderRadius: 12, border: `2px solid ${C.border}`, background: C.bg, color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
//             🚪 {t("लॉग आउट", "Log Out")}
//           </button>
//         </div>
//         <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
//       </div>
//     </div>
//   );
// }




////------------------------------------------------------------------------new claude ke bhaje se -----------------------------------------------------------------------------------------------///






"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", green: "#1E8449", greenLight: "#27AE60", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC", red: "#C0392B" };

interface Patient { name: string; age: string; village: string; phone: string; gender?: string; conditions?: string; bloodGroup?: string; }

export default function HomePage() {
  const router = useRouter();
  const [lang, setLang] = useState("hi");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [hasReport, setHasReport] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "hi";
    setLang(storedLang);
    const p = localStorage.getItem("patient");
    if (!p) { router.replace("/login"); return; }
    try { setPatient(JSON.parse(p)); } catch { router.replace("/login"); return; }
    setHasReport(!!localStorage.getItem("triageResult"));
    setHydrated(true);
  }, [router]);

  const t = (hi: string, en: string) => lang === "hi" ? hi : en;

  const pastVisits = hasReport ? 1 : 0;

  if (!hydrated || !patient) return null;

  const greeting = lang === "hi" ? `नमस्ते ${patient.name.split(" ")[0]} जी 🙏` : `Hello ${patient.name.split(" ")[0]} 🙏`;
  const badges: string[] = [];
  if (patient.bloodGroup) badges.push(`🩸 ${patient.bloodGroup}`);
  if (patient.conditions) badges.push(`💊 ${patient.conditions}`);
  if (patient.age) badges.push(`${patient.age} ${t("वर्ष", "years")}`);

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#E8F8EF", padding: "6px 16px", fontSize: 12, fontWeight: 700, color: C.green, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
          {t("ऑनलाइन — AI सक्रिय है", "Online — AI Active")}
        </div>
        <div style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, padding: "16px 16px 22px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -10, top: -10, fontSize: 80, opacity: .07 }}>🏥</div>
          <button onClick={() => { localStorage.clear(); router.replace("/login"); }}
            style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,.15)", border: "none", borderRadius: 8, color: "rgba(255,255,255,.8)", fontSize: 11, fontWeight: 700, padding: "5px 10px", cursor: "pointer" }}>
            {t("लॉग आउट", "Logout")}
          </button>
          <div style={{ fontSize: 22, fontWeight: 800, color: "white" }}>{greeting}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)", marginTop: 2 }}>{patient.name} · {patient.village}</div>
          {badges.length > 0 && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.18)", padding: "6px 12px", borderRadius: 20, fontSize: 12, color: "rgba(255,255,255,.9)", marginTop: 10 }}>
              {badges.join(" · ")}
            </div>
          )}
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "🩺", title: t("लक्षण जाँचें", "Check My Symptoms"), sub: t("AI से जाँचें — बिना इंटरनेट", "AI powered — works offline"), bg: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, shadow: "rgba(27,108,168,.45)", path: "/symptoms" },
              { icon: "📋", title: t("मेरे स्वास्थ्य रिकॉर्ड", "My Health Records"), sub: t("पिछली विज़िट और नुस्खे देखें", "View past visits & prescriptions"), bg: "linear-gradient(135deg,#6C3483,#4A235A)", shadow: "rgba(108,52,131,.35)", path: "/records" },
              { icon: "💊", title: t("दवाई खोजें", "Find Medicine Nearby"), sub: t("पास की दुकान में दवाई उपलब्धता", "Check stock at nearby pharmacies"), bg: `linear-gradient(135deg,${C.greenLight},${C.green})`, shadow: "rgba(30,132,73,.35)", path: "/medicine" },
            ].map((action, i) => (
              <button key={i} onClick={() => router.push(action.path)}
                style={{ display: "flex", alignItems: "center", padding: 18, borderRadius: 18, border: "none", cursor: "pointer", textAlign: "left", gap: 14, background: action.bg, boxShadow: `0 6px 24px ${action.shadow}`, transition: "all .2s" }}>
                <div style={{ width: 54, height: 54, borderRadius: 14, background: "rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{action.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "white", lineHeight: 1.2, margin: 0 }}>{action.title}</h3>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,.7)", marginTop: 2, marginBottom: 0 }}>{action.sub}</p>
                </div>
                <span style={{ fontSize: 20, color: "rgba(255,255,255,.5)" }}>›</span>
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            {[
              { n: String(pastVisits), l: t("पिछली विज़िट", "Past Visits") },
              { n: "2", l: t("डॉक्टर उपलब्ध", "Doctors") },
              { n: "3", l: t("पास की दुकान", "Pharmacies") },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, background: C.card, borderRadius: 12, padding: 12, textAlign: "center", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: C.primary }}>{s.n}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2, lineHeight: 1.3 }}>{s.l}</div>
              </div>
            ))}
          </div>
          {hasReport ? (
            <div style={{ background: "#EBF4FD", borderRadius: 12, padding: 12, border: "1px solid #AED6F1", display: "flex", alignItems: "flex-start", gap: 8, marginTop: 14, cursor: "pointer" }}
              onClick={() => router.push("/report")}>
              <span style={{ fontSize: 20 }}>📋</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{t("रिपोर्ट तैयार है", "Report Ready")}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{t("अपनी स्वास्थ्य रिपोर्ट देखें →", "View your health report →")}</div>
              </div>
            </div>
          ) : (
            <div style={{ background: "#FDEDED", borderRadius: 12, padding: 12, border: "1px solid #F1948A", display: "flex", alignItems: "flex-start", gap: 8, marginTop: 14 }}>
              <span style={{ fontSize: 20 }}>🔴</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.red }}>{t("कोई जाँच नहीं हुई", "No Checkup Done")}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{t("लक्षण जाँच करके रिपोर्ट बनाएं", "Run a symptom check to generate your report")}</div>
              </div>
            </div>
          )}
        </div>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
      </div>
    </div>
  );
}