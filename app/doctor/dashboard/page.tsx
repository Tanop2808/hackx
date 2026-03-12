// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", green: "#1E8449", greenLight: "#27AE60", red: "#C0392B", redLight: "#E74C3C", yellow: "#F39C12", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

// const QUEUE = [
//   { av: "R", avBg: "#FDEDED", avC: "#C0392B", name: "रामकली देवी", urgency: "RED" as const, meta: "Female · 52y · Kesri · Diabetes", tags: ["💔 Chest Pain", "😮‍💨 Breathless", "🌡️ Fever"], ai: "🤖 AI: संभावित हृदय समस्या — Possible cardiac involvement", time: "23 min ago", detail: true },
//   { av: "M", avBg: "#FDEDED", avC: "#C0392B", name: "मीना देवी", urgency: "RED" as const, meta: "Female · 29y · Barnala Road", tags: ["🌡️ Fever", "🔴 Skin Rash"], ai: "🤖 AI: संभावित डेंगू — Possible dengue, urgent blood test", time: "41 min ago" },
//   { av: "S", avBg: "#FEF9E7", avC: "#B7770D", name: "सुरेश कुमार", urgency: "YELLOW" as const, meta: "Male · 38y · Nabha Sector 4", tags: ["🌡️ Fever", "😮 Cough", "😮‍💨 Breathless"], ai: "🤖 AI: श्वसन संक्रमण — Possible respiratory infection", time: "1 hr ago" },
//   { av: "V", avBg: "#E8F8EF", avC: "#1E8449", name: "विजय सिंह", urgency: "GREEN" as const, meta: "Male · 44y · Kesri Village", tags: ["🦴 Back Pain", "😴 Fatigue"], ai: "🤖 AI: मांसपेशियों में दर्द — Muscle strain, rest likely sufficient", time: "2 hrs ago" },
// ];

// const BADGE_STYLE: Record<string, object> = {
//   RED:    { background: "#FDEDED", color: "#C0392B" },
//   YELLOW: { background: "#FEF9E7", color: "#B7770D" },
//   GREEN:  { background: "#E8F8EF", color: "#1E8449" },
// };

// export default function DoctorDashboardPage() {
//   const router = useRouter();
//   const [tick, setTick] = useState(10);

//   useEffect(() => {
//     const iv = setInterval(() => setTick(t => t <= 1 ? 10 : t - 1), 1000);
//     return () => clearInterval(iv);
//   }, []);

//   return (
//     <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
//       <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
//         <div style={{ background: "#E8F8EF", padding: "6px 16px", fontSize: 12, fontWeight: 700, color: C.green, display: "flex", alignItems: "center", gap: 6 }}>
//           <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
//           Online · Auto-refreshing in {tick}s
//         </div>
//         <div style={{ background: "#1A2332", padding: 16 }}>
//           <h2 style={{ fontSize: 19, fontWeight: 800, color: "white" }}>Patient Queue — आज की कतार</h2>
//           <p style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 2 }}>Dr. Arvind Kumar · General Physician · Nabha Civil Hospital</p>
//         </div>
//         {/* SOS banner */}
//         <div style={{ background: `linear-gradient(135deg,${C.redLight},${C.red})`, padding: "11px 16px", display: "flex", alignItems: "center", gap: 10 }}>
//           <span style={{ fontSize: 20, animation: "shake .6s infinite", display: "inline-block" }}>🚨</span>
//           <div style={{ flex: 1 }}>
//             <h4 style={{ fontSize: 13, fontWeight: 800, color: "white" }}>SOS: Kesri Village — ASHA Alert</h4>
//             <p style={{ fontSize: 11, color: "rgba(255,255,255,.8)", marginTop: 1 }}>Priya Sharma reports 5 patients with fever + rash</p>
//           </div>
//           <button onClick={() => router.push("/asha/sos")} style={{ background: "rgba(255,255,255,.25)", color: "white", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer" }}>View</button>
//         </div>
//         {/* Stats */}
//         <div style={{ display: "flex" }}>
//           {[{ n: 2, l: "🔴 RED", bg: "#FDEDED", c: C.red }, { n: 3, l: "🟡 YELLOW", bg: "#FEF9E7", c: "#B7770D" }, { n: 4, l: "🟢 GREEN", bg: "#E8F8EF", c: C.green }].map((s, i) => (
//             <div key={i} style={{ flex: 1, padding: "10px 8px", textAlign: "center", background: s.bg, borderBottom: `2px solid ${C.border}` }}>
//               <div style={{ fontSize: 22, fontWeight: 800, color: s.c }}>{s.n}</div>
//               <div style={{ fontSize: 11, color: s.c, fontWeight: 700 }}>{s.l}</div>
//             </div>
//           ))}
//         </div>
//         {/* Queue */}
//         <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 16px" }}>
//           {QUEUE.map((p, i) => (
//             <div key={i} style={{ background: C.card, borderRadius: 16, padding: 16, marginBottom: 10, border: `1px solid ${C.border}`, borderLeft: `4px solid ${p.avC}` }}>
//               <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
//                 <div style={{ width: 40, height: 40, borderRadius: 12, background: p.avBg, border: `2px solid ${p.avC}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: p.avC, flexShrink: 0 }}>{p.av}</div>
//                 <div>
//                   <div style={{ fontSize: 14, fontWeight: 800 }}>
//                     {p.name} <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700, ...BADGE_STYLE[p.urgency] }}>
//                       {p.urgency === "RED" ? "🔴 RED" : p.urgency === "YELLOW" ? "🟡 YELLOW" : "🟢 GREEN"}
//                     </span>
//                   </div>
//                   <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{p.meta}</div>
//                 </div>
//               </div>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "8px 0" }}>
//                 {p.tags.map((tag, j) => <span key={j} style={{ background: C.bg, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 600 }}>{tag}</span>)}
//               </div>
//               <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic", marginBottom: 8 }}>{p.ai}</div>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <span style={{ fontSize: 12, color: C.muted }}>⏱️ {p.time}</span>
//                 <button onClick={() => router.push("/doctor/consultation/1")} style={{ padding: "7px 14px", borderRadius: 10, border: "none", background: C.primaryDark, color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
//                   परामर्श खोलें →
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}@keyframes shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-10deg)}75%{transform:rotate(10deg)}}`}</style>
//       </div>
//     </div>
//   );
// }


//------------------------new doctor dashboard------------------------//



"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", green: "#1E8449", greenLight: "#27AE60", red: "#C0392B", redLight: "#E74C3C", yellow: "#F39C12", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

const QUEUE = [
  { av: "R", avBg: "#FDEDED", avC: C.red, name: "रामकली देवी", urgency: "RED" as const, meta: "Female · 52y · Kesri · Diabetes", tags: ["💔 Chest Pain", "😮‍💨 Breathless", "🌡️ Fever"], ai: "🤖 AI: संभावित हृदय समस्या — Possible cardiac involvement", time: "23 min ago", slot: "9:00 AM" },
  { av: "M", avBg: "#FDEDED", avC: C.red, name: "मीना देवी", urgency: "RED" as const, meta: "Female · 29y · Barnala Road", tags: ["🌡️ Fever", "🔴 Skin Rash"], ai: "🤖 AI: संभावित डेंगू — Possible dengue, urgent blood test", time: "41 min ago", slot: "9:30 AM" },
  { av: "S", avBg: "#FEF9E7", avC: "#B7770D", name: "सुरेश कुमार", urgency: "YELLOW" as const, meta: "Male · 38y · Nabha Sector 4", tags: ["🌡️ Fever", "😮 Cough", "😮‍💨 Breathless"], ai: "🤖 AI: श्वसन संक्रमण — Possible respiratory infection", time: "1 hr ago", slot: "10:30 AM" },
  { av: "V", avBg: "#E8F8EF", avC: C.green, name: "विजय सिंह", urgency: "GREEN" as const, meta: "Male · 44y · Kesri Village", tags: ["🦴 Back Pain", "😴 Fatigue"], ai: "🤖 AI: मांसपेशियों में दर्द — Muscle strain, rest likely sufficient", time: "2 hrs ago", slot: "11:00 AM" },
];

const PHARMACY_STOCK = [
  { name: "Paracetamol 500mg", qty: 320, min: 50, unit: "strips" },
  { name: "ORS Sachets", qty: 45, min: 100, unit: "pkts" },
  { name: "Amoxicillin 500mg", qty: 12, min: 30, unit: "strips" },
  { name: "Metformin 500mg", qty: 180, min: 40, unit: "strips" },
  { name: "Azithromycin 500mg", qty: 8, min: 20, unit: "strips" },
  { name: "Cetirizine 10mg", qty: 95, min: 30, unit: "strips" },
  { name: "Aspirin 75mg", qty: 60, min: 30, unit: "strips" },
  { name: "ORS (Electral)", qty: 22, min: 50, unit: "pkts" },
];

const BADGE: Record<string, object> = {
  RED: { background: "#FDEDED", color: C.red },
  YELLOW: { background: "#FEF9E7", color: "#B7770D" },
  GREEN: { background: "#E8F8EF", color: C.green },
};

export default function DoctorDashboardPage() {
  const router = useRouter();
  const [tick, setTick] = useState(10);
  const [activeTab, setActiveTab] = useState<"queue" | "pharmacy">("queue");
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    const iv = setInterval(() => setTick(t => t <= 1 ? 10 : t - 1), 1000);
    return () => clearInterval(iv);
  }, []);

  const activeQueue = QUEUE.filter((_, i) => !completed.includes(i));

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Status bar */}
        <div style={{ background: "#E8F8EF", padding: "6px 16px", fontSize: 12, fontWeight: 700, color: C.green, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
            Online · Auto-refreshing in {tick}s
          </div>
          <button onClick={() => router.push("/login")} style={{ background: "none", border: "none", fontSize: 11, color: C.muted, cursor: "pointer" }}>Logout</button>
        </div>
        {/* Header */}
        <div style={{ background: "#1A2332", padding: "14px 16px" }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: "white", margin: 0 }}>Dr. Arvind Kumar</h2>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,.45)", marginTop: 2 }}>General Physician · Nabha Civil Hospital</p>
        </div>
        {/* SOS banner */}
        <div style={{ background: `linear-gradient(135deg,${C.redLight},${C.red})`, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18, animation: "shake .6s infinite", display: "inline-block" }}>🚨</span>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: 12, fontWeight: 800, color: "white", margin: 0 }}>SOS: Kesri Village — ASHA Alert</h4>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,.75)", marginTop: 1, margin: 0 }}>Priya Sharma reports 5 patients with fever + rash</p>
          </div>
          <button onClick={() => router.push("/asha/sos")} style={{ background: "rgba(255,255,255,.25)", color: "white", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer" }}>View</button>
        </div>
        {/* Stats */}
        <div style={{ display: "flex" }}>
          {[{ n: activeQueue.filter(p => p.urgency === "RED").length, l: "🔴 RED", bg: "#FDEDED", c: C.red }, { n: activeQueue.filter(p => p.urgency === "YELLOW").length, l: "🟡 YELLOW", bg: "#FEF9E7", c: "#B7770D" }, { n: activeQueue.filter(p => p.urgency === "GREEN").length, l: "🟢 GREEN", bg: "#E8F8EF", c: C.green }, { n: completed.length, l: "✓ Done", bg: C.bg, c: C.muted }].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "8px 4px", textAlign: "center", background: s.bg, borderBottom: `2px solid ${C.border}` }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.c }}>{s.n}</div>
              <div style={{ fontSize: 10, color: s.c, fontWeight: 700 }}>{s.l}</div>
            </div>
          ))}
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", background: C.card, borderBottom: `1px solid ${C.border}` }}>
          {[{ id: "queue", l: "Patient Queue" }, { id: "pharmacy", l: "Pharmacy Stock" }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{ flex: 1, padding: "11px 8px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: activeTab === tab.id ? C.primary : C.muted, borderBottom: activeTab === tab.id ? `3px solid ${C.primary}` : "3px solid transparent" }}>
              {tab.l}
            </button>
          ))}
        </div>

        {activeTab === "queue" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 16px" }}>
            {activeQueue.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 20px", color: C.muted }}>
                <div style={{ fontSize: 40 }}>✅</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 12 }}>Queue is clear!</div>
              </div>
            )}
            {QUEUE.map((p, i) => {
              if (completed.includes(i)) return null;
              return (
                <div key={i} style={{ background: C.card, borderRadius: 16, padding: 14, marginBottom: 10, border: `1px solid ${C.border}`, borderLeft: `4px solid ${p.avC}` }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: p.avBg, border: `2px solid ${p.avC}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: p.avC, flexShrink: 0 }}>{p.av}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 800 }}>
                        {p.name} <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700, ...BADGE[p.urgency] }}>
                          {p.urgency === "RED" ? "🔴 RED" : p.urgency === "YELLOW" ? "🟡 YELLOW" : "🟢 GREEN"}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{p.meta} · 🕐 {p.slot}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, margin: "8px 0" }}>
                    {p.tags.map((tag, j) => <span key={j} style={{ background: C.bg, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 600 }}>{tag}</span>)}
                  </div>
                  <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic", marginBottom: 8 }}>{p.ai}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, color: C.muted }}>⏱️ {p.time}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setCompleted(c => [...c, i])} style={{ padding: "7px 12px", borderRadius: 8, border: "none", background: "#E8F8EF", color: C.green, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>✓ Done</button>
                      <button onClick={() => router.push("/doctor/consultation/1")} style={{ padding: "7px 12px", borderRadius: 8, border: "none", background: C.primaryDark, color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Open →</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "pharmacy" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 16px" }}>
            <div style={{ background: "#EBF4FD", borderRadius: 12, padding: 12, marginBottom: 12, border: "1px solid #AED6F1", display: "flex", gap: 8 }}>
              <span>💊</span>
              <p style={{ fontSize: 13, color: C.primary, fontWeight: 600, margin: 0 }}>PHC Dispensary — Nabha Civil Hospital stock levels</p>
            </div>
            {PHARMACY_STOCK.map((item, i) => {
              const pct = Math.min(100, Math.round((item.qty / (item.min * 4)) * 100));
              const low = item.qty < item.min;
              const critical = item.qty < item.min / 2;
              return (
                <div key={i} style={{ background: C.card, borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${critical ? "#F1948A" : low ? "#F4D03F" : C.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{item.qty} {item.unit} · Min: {item.min}</div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 800, color: critical ? C.red : low ? "#B7770D" : C.green, background: critical ? "#FDEDED" : low ? "#FEF9E7" : "#E8F8EF", padding: "5px 10px", borderRadius: 10 }}>
                      {critical ? "🔴 Critical" : low ? "🟡 Low" : "🟢 OK"}
                    </span>
                  </div>
                  <div style={{ background: C.bg, borderRadius: 4, height: 8, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: critical ? C.red : low ? C.yellow : C.green, borderRadius: 4, transition: "width .3s" }} />
                  </div>
                </div>
              );
            })}
            <div style={{ background: "#FEF9E7", borderRadius: 12, padding: 12, border: "1px solid #F4D03F" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#7D6608" }}>⚠️ 3 items need restocking</div>
              <div style={{ fontSize: 12, color: "#7D6608", marginTop: 4 }}>ORS Sachets, Amoxicillin, Azithromycin are below minimum levels</div>
            </div>
          </div>
        )}
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}@keyframes shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-10deg)}75%{transform:rotate(10deg)}}`}</style>
      </div>
    </div>
  );
}