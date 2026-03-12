"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const C = { primary: "#1B6CA8", green: "#1E8449", red: "#C0392B", yellow: "#F39C12", purple: "#7D3C98", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

const PATIENTS = [
  { id: "1", av: "R", avBg: "#FDEDED", avC: C.red, name: "रामकली देवी", age: "52F", village: "Kesri", lastVisit: "आज", badges: [{ c: C.green, bg: "#E8F8EF", t: "✓ App सीखा" }, { c: C.red, bg: "#FDEDED", t: "🔴 RED" }], alert: true, phone: "9876501001" },
  { id: "2", av: "S", avBg: "#EBF4FD", avC: C.primary, name: "सुरेश कुमार", age: "38M", village: "Nabha Sector 4", lastVisit: "3 दिन पहले", badges: [{ c: C.green, bg: "#E8F8EF", t: "✓ App सीखा" }], phone: "9876501002" },
  { id: "3", av: "G", avBg: "#FEF9E7", avC: "#B7770D", name: "गीता रानी", age: "65F", village: "Kesri", lastVisit: "1 हफ्ते पहले", badges: [{ c: "#B7770D", bg: "#FEF9E7", t: "⏳ सीख रही हैं" }], phone: "9876501003" },
  { id: "4", av: "H", avBg: C.bg, avC: C.muted, name: "हरजीत सिंह", age: "71M", village: "Barnala Road", lastVisit: "कोई विज़िट नहीं", badges: [{ c: C.red, bg: "#FDEDED", t: "✗ नहीं जोड़े" }], phone: "9876501004" },
  { id: "5", av: "M", avBg: "#FDEDED", avC: C.red, name: "मीना देवी", age: "29F", village: "Barnala Road", lastVisit: "2 दिन पहले", badges: [{ c: C.green, bg: "#E8F8EF", t: "✓ App सीखा" }, { c: C.yellow, bg: "#FEF9E7", t: "🟡 YELLOW" }], phone: "9876501005" },
];

export default function ASHADashboardPage() {
  const router = useRouter();
  const [lang, setLang] = useState("hi");
  const [activeTab, setActiveTab] = useState<"patients" | "visits" | "stats">("patients");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { setLang(localStorage.getItem("lang") || "hi"); }, []);
  const T = (hi: string, en: string) => lang === "hi" ? hi : en;

  const filtered = PATIENTS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Status bar */}
        <div style={{ background: "#FDEDED", padding: "6px 16px", fontSize: 12, fontWeight: 700, color: C.red, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red, animation: "pulse 1s infinite" }} />
          {T("ऑफलाइन — 1 विज़िट sync बाकी", "Offline — 1 visit waiting to sync")}
        </div>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg,${C.purple},#5B2C6F)`, padding: "16px 16px 20px", position: "relative" }}>
          <div style={{ position: "absolute", right: -10, top: -10, fontSize: 80, opacity: .07 }}>👩</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: 0 }}>{T("मेरे गाँव के मरीज़", "My Village Patients")}</h2>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.65)", marginTop: 3 }}>Priya Sharma · Kesri, Nabha Sector 4</p>
            </div>
            <button onClick={() => router.push("/asha/sos")} style={{ background: C.red, color: "white", border: "none", borderRadius: 10, padding: "8px 14px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>🚨 SOS</button>
          </div>
          {/* Stats row */}
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            {[{ n: "12", l: T("कुल", "Total"), c: "rgba(255,255,255,.9)" }, { n: "7", l: T("App सीखा", "Onboarded"), c: "#A9DFBF" }, { n: "3", l: T("सीख रहे", "Learning"), c: "#FAD7A0" }, { n: "2", l: T("बाकी", "Pending"), c: "#F1948A" }].map((s, i) => (
              <div key={i} style={{ flex: 1, background: "rgba(255,255,255,.12)", borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: s.c }}>{s.n}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.6)", marginTop: 1 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Alert */}
        <div style={{ background: "#FDEDED", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid #F1948A`, cursor: "pointer" }} onClick={() => router.push("/asha/log-visit")}>
          <span style={{ fontSize: 18 }}>🔴</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.red }}>{T("Alert: रामकली देवी (Kesri) — RED", "Alert: Ramkali Devi (Kesri) — RED")}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{T("सीने में दर्द + सांस — तुरंत मदद चाहिए", "Chest pain + breathlessness — needs immediate help")}</div>
          </div>
          <span style={{ fontSize: 13, color: C.red, fontWeight: 700 }}>Log →</span>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", background: C.card, borderBottom: `1px solid ${C.border}` }}>
          {[{ id: "patients", l: T("मरीज़", "Patients") }, { id: "visits", l: T("विज़िट", "Visits") }, { id: "stats", l: T("रिपोर्ट", "Report") }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{ flex: 1, padding: "12px 8px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: activeTab === tab.id ? C.purple : C.muted, borderBottom: activeTab === tab.id ? `3px solid ${C.purple}` : "3px solid transparent", transition: "all .2s" }}>
              {tab.l}
            </button>
          ))}
        </div>

        {activeTab === "patients" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 16px" }}>
            {/* Search */}
            <div style={{ display: "flex", alignItems: "center", border: `2px solid ${C.border}`, borderRadius: 12, background: C.card, marginBottom: 10, overflow: "hidden" }}>
              <span style={{ padding: "10px 12px", fontSize: 16 }}>🔍</span>
              <input style={{ flex: 1, border: "none", outline: "none", fontSize: 14, padding: "10px 0", background: "transparent" }}
                placeholder={T("मरीज़ या गाँव खोजें...", "Search patient or village...")} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            {filtered.map((p) => (
              <div key={p.id} style={{ background: C.card, borderRadius: 16, padding: 14, display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, border: p.alert ? `2px solid #F1948A` : `1px solid ${C.border}` }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: p.avBg, border: `2px solid ${p.avC}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: p.avC, flexShrink: 0 }}>{p.av}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 14, fontWeight: 800 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{p.age} · {p.village}</div>
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>📅 {p.lastVisit}</div>
                  <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                    {p.badges.map((b, j) => <span key={j} style={{ padding: "3px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: b.bg, color: b.c }}>{b.t}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <button onClick={() => router.push("/asha/log-visit")} style={{ flex: 1, padding: "7px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>📝 {T("Log विज़िट", "Log Visit")}</button>
                    <a href={`tel:${p.phone}`} style={{ flex: 1, padding: "7px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, fontSize: 11, fontWeight: 700, cursor: "pointer", textDecoration: "none", color: C.text, textAlign: "center" }}>📞 {T("कॉल", "Call")}</a>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => router.push("/asha/log-visit")} style={{ width: "100%", padding: 14, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, background: `linear-gradient(135deg,${C.purple},#5B2C6F)`, color: "white", marginTop: 4 }}>
              + {T("नई विज़िट दर्ज करें", "Log New Visit")}
            </button>
          </div>
        )}

        {activeTab === "visits" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 16px" }}>
            {[
              { patient: "रामकली देवी", date: "आज", note: "सीने में दर्द — RED alert", synced: false },
              { patient: "सुरेश कुमार", date: "3 दिन पहले", note: "बुखार और खांसी, दवाई दी", synced: true },
              { patient: "गीता रानी", date: "1 हफ्ते पहले", note: "BP check, app सिखाया", synced: true },
              { patient: "मीना देवी", date: "2 दिन पहले", note: "Skin rash — YELLOW", synced: true },
            ].map((v, i) => (
              <div key={i} style={{ background: C.card, borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{v.patient}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: v.synced ? C.green : C.yellow, background: v.synced ? "#E8F8EF" : "#FEF9E7", padding: "3px 8px", borderRadius: 8 }}>
                    {v.synced ? T("✓ Synced", "✓ Synced") : T("⏳ Pending Sync", "⏳ Pending Sync")}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>📅 {v.date}</div>
                <div style={{ fontSize: 13, color: C.text, marginTop: 6, lineHeight: 1.5 }}>{v.note}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "stats" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 16px" }}>
            <div style={{ background: `linear-gradient(135deg,${C.purple},#5B2C6F)`, borderRadius: 16, padding: 16, marginBottom: 12, color: "white" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", fontWeight: 700, textTransform: "uppercase" }}>{T("इस महीने", "This Month")}</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 4 }}>23 {T("विज़िट", "Visits")}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 2 }}>{T("पिछले महीने से +5", "+5 from last month")}</div>
            </div>
            {[
              { icon: "🔴", label: T("RED Case रेफर", "RED Cases Referred"), val: "4", color: C.red },
              { icon: "🟡", label: T("YELLOW Cases", "YELLOW Cases"), val: "8", color: "#B7770D" },
              { icon: "✅", label: T("App Onboarding", "App Onboarding"), val: "7/12", color: C.green },
              { icon: "💊", label: T("दवाई वितरण", "Medicines Distributed"), val: "18 strips", color: C.primary },
            ].map((s, i) => (
              <div key={i} style={{ background: C.card, borderRadius: 12, padding: "12px 16px", marginBottom: 8, border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{s.label}</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.val}</div>
              </div>
            ))}
            <button onClick={() => router.push("/asha/sos")} style={{ width: "100%", marginTop: 8, padding: 14, borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, background: `linear-gradient(135deg,#E74C3C,${C.red})`, color: "white" }}>
              🚨 {T("SOS — आपातकाल भेजें", "SOS — Send Emergency Alert")}
            </button>
          </div>
        )}
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
      </div>
    </div>
  );
}