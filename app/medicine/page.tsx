"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const C = { primary: "#1B6CA8", primaryDark: "#0F4C7A", green: "#1E8449", red: "#C0392B", bg: "#F0F4F8", card: "#FFFFFF", text: "#1A2332", muted: "#6B7C93", border: "#DDE3EC" };

const MED_DB: Record<string, Array<{ name: string; village: string; dist: string; phone: string; qty: number; inStock: boolean }>> = {
  Paracetamol: [
    { name: "Nabha Medical Store", village: "Nabha", dist: "1.2", phone: "9876500001", qty: 200, inStock: true },
    { name: "Punjab Pharmacy", village: "Kesri", dist: "3.4", phone: "9876500002", qty: 100, inStock: true },
    { name: "Sharma Medical", village: "Barnala Road", dist: "5.8", phone: "9876500003", qty: 150, inStock: true },
  ],
  Metformin: [
    { name: "Nabha Medical Store", village: "Nabha", dist: "1.2", phone: "9876500001", qty: 50, inStock: true },
    { name: "Punjab Pharmacy", village: "Kesri", dist: "3.4", phone: "9876500002", qty: 0, inStock: false },
    { name: "Sharma Medical", village: "Barnala Road", dist: "5.8", phone: "9876500003", qty: 80, inStock: true },
  ],
  ORS: [
    { name: "Nabha Medical Store", village: "Nabha", dist: "1.2", phone: "9876500001", qty: 500, inStock: true },
    { name: "Punjab Pharmacy", village: "Kesri", dist: "3.4", phone: "9876500002", qty: 300, inStock: true },
    { name: "Sharma Medical", village: "Barnala Road", dist: "5.8", phone: "9876500003", qty: 0, inStock: false },
  ],
  Amoxicillin: [
    { name: "Nabha Medical Store", village: "Nabha", dist: "1.2", phone: "9876500001", qty: 0, inStock: false },
    { name: "Punjab Pharmacy", village: "Kesri", dist: "3.4", phone: "9876500002", qty: 80, inStock: true },
    { name: "Sharma Medical", village: "Barnala Road", dist: "5.8", phone: "9876500003", qty: 60, inStock: true },
  ],
};

export default function MedicinePage() {
  const router = useRouter();
  const lang = typeof window !== "undefined" ? localStorage.getItem("lang") || "hi" : "hi";
  const t = (hi: string, en: string) => lang === "hi" ? hi : en;
  const [active, setActive] = useState("Paracetamol");
  const [search, setSearch] = useState("Paracetamol");

  const results = MED_DB[active] || [];

  return (
    <div style={{ background: "#0d1520", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 390, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#FDEDED", padding: "6px 16px", fontSize: 12, fontWeight: 700, color: C.red, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red }} />
          {t("ऑफलाइन — फार्मेसी डेटा डिवाइस से", "Offline — Pharmacy data from device")}
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", gap: 10, background: C.card, borderBottom: `1px solid ${C.border}` }}>
          <button onClick={() => router.push("/home")} style={{ width: 36, height: 36, borderRadius: 10, background: C.bg, border: "none", fontSize: 18, cursor: "pointer" }}>←</button>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{t("दवाई खोजें", "Find Medicine")}</div>
            <div style={{ fontSize: 11, color: C.muted }}>Find Medicine Nearby</div>
          </div>
        </div>
        {/* Search */}
        <div style={{ padding: "10px 16px", background: C.card, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", border: `2px solid ${C.border}`, borderRadius: 14, overflow: "hidden", background: C.bg }}>
            <span style={{ padding: "12px 14px", fontSize: 18 }}>🔍</span>
            <input style={{ flex: 1, border: "none", outline: "none", fontSize: 16, padding: "12px 0", background: "transparent", fontFamily: "inherit" }}
              placeholder={t("दवाई का नाम लिखें...", "Type medicine name...")} value={search}
              onChange={e => { setSearch(e.target.value); const k = Object.keys(MED_DB).find(k => k.toLowerCase().includes(e.target.value.toLowerCase())); if (k) setActive(k); }} />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10, overflowX: "auto", paddingBottom: 4 }}>
            {Object.keys(MED_DB).map(med => (
              <button key={med} onClick={() => { setActive(med); setSearch(med); }}
                style={{ padding: "8px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, flexShrink: 0, background: active === med ? C.primary : C.bg, color: active === med ? "white" : C.text, transition: "all .2s" }}>
                💊 {med}
              </button>
            ))}
          </div>
        </div>
        {/* Fake map */}
        <div style={{ height: 130, position: "relative", background: "#E8F0E0", flexShrink: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(150,170,130,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(150,170,130,.3) 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
          <div style={{ position: "absolute", top: "40%", left: 0, right: 0, height: 6, background: "#D4C5A0" }} />
          <div style={{ position: "absolute", top: "70%", left: 0, right: 0, height: 4, background: "#D4C5A0" }} />
          <div style={{ position: "absolute", left: "30%", top: 0, bottom: 0, width: 5, background: "#D4C5A0" }} />
          {[["32%","42%"],["62%","30%"],["20%","66%"]].map(([l, tp], i) => (
            <div key={i} style={{ position: "absolute", left: l, top: tp, fontSize: 20 }}>📍</div>
          ))}
          <div style={{ position: "absolute", bottom: 6, right: 8, fontSize: 11, color: C.muted, background: "rgba(255,255,255,.8)", padding: "3px 8px", borderRadius: 8, fontWeight: 600 }}>🗺️ Nabha District</div>
        </div>
        {/* Results */}
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 16px 16px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, margin: "10px 0 6px" }}>
            {active} — {results.filter(p => p.inStock).length} {t("दुकानों में उपलब्ध", "pharmacies available")}
          </div>
          {results.map((p, i) => (
            <div key={i} style={{ background: C.card, borderRadius: 16, padding: 16, marginBottom: 10, border: `1px solid ${C.border}`, opacity: p.inStock ? 1 : .65 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: p.inStock ? "#E8F8EF" : "#FDEDED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💊</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                    {p.village} · {p.dist} km · <span style={{ color: p.inStock ? C.green : C.red, fontWeight: 700 }}>{p.inStock ? `✓ ${t("उपलब्ध", "In Stock")} (${p.qty})` : `✗ ${t("उपलब्ध नहीं", "Out of Stock")}`}</span>
                  </div>
                </div>
              </div>
              {p.inStock && (
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button style={{ flex: 1, padding: "9px 12px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bg, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📞 {p.phone}</button>
                  <button style={{ flex: 1, padding: "9px 12px", borderRadius: 10, border: "none", background: "#25D366", color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>💬 WhatsApp</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
