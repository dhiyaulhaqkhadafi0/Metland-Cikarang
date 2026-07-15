"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// --- CATCHMENT DATA FROM PDF ---
const catchmentAreas = [
  {
    key: "A",
    name: "Zona A (Radius Utama)",
    luas: "304.9 Ha",
    kk: "21,343 KK",
    jiwa: 85372,
    desc: "Zona terdekat dengan Weston Gateway, terdiri dari klaster hunian padat aktif. Sangat cocok untuk bisnis kuliner harian, mini-market, dan salon kecantikan."
  },
  {
    key: "B",
    name: "Zona B (Pengembangan Utara)",
    luas: "325.95 Ha",
    kk: "22,785 KK",
    jiwa: 91140,
    desc: "Kawasan dengan mobilitas harian tinggi. Cocok untuk kantor cabang, klinik medis, apotek, atau toko perlengkapan rumah."
  },
  {
    key: "C",
    name: "Zona C (Koridor Pendidikan)",
    luas: "359.9 Ha",
    kk: "25,193 KK",
    jiwa: 100772,
    desc: "Dikelilingi area sekolahan dan fasilitas umum. Potensi tinggi untuk bisnis tempat kursus, toko buku, kafe mahasiswa, dan laundry."
  },
  {
    key: "D",
    name: "Zona D (Kawasan Penyangga Barat)",
    luas: "642.7 Ha",
    kk: "44,985 KK",
    jiwa: 179942,
    desc: "Penyumbang populasi pekerja industri terbesar. Sangat menjanjikan untuk co-working space, kantor logistik, dan showroom."
  },
  {
    key: "E",
    name: "Zona E (Sektor Komersial Timur)",
    luas: "590.6 Ha",
    kk: "41,339 KK",
    jiwa: 165356,
    desc: "Zona pengembangan bisnis baru. Pilihan tepat untuk ekspansi franchise besar, restoran keluarga, dan pusat kebugaran (gym)."
  },
  {
    key: "F",
    name: "Zona F (Kawasan Global Outer)",
    luas: "1447.1 Ha",
    kk: "101,299 KK",
    jiwa: 405197,
    desc: "Kawasan hunian luar terluas dengan daya beli tinggi. Menjamin limpahan arus konsumen (traffic) yang konstan setiap harinya."
  }
];

// --- RUKO 3-IN-1 BLUEPRINT DATA ---
const blueprintFloors = [
  {
    level: 3,
    title: "Lantai 3: Living House (Tempat Tinggal)",
    description: "Ruang hunian keluarga yang tenang, aman, dan privat. Dilengkapi area kamar tidur utama, ruang santai, dan ventilasi udara yang dirancang khusus menghadap timur-barat untuk pencahayaan maksimal tanpa rasa panas.",
    icon: "fa-bed"
  },
  {
    level: 2,
    title: "Lantai 2: Creative Office Space (Kantor Modern)",
    description: "Ideal untuk ruang kantor startup, agensi kreatif, studio, atau kantor operasional mandiri. Menghadirkan lingkungan kerja profesional dengan akses terpisah dari lantai retail bawah.",
    icon: "fa-briefcase"
  },
  {
    level: 1,
    title: "Lantai 1: Walkable Commercial Cafe / Shop (Retail)",
    description: "Area bisnis dengan bukaan kaca lebar (Industrial Heritage Contemporer) menghadap langsung ke pedestrian walk yang ramai. Sangat premium untuk kedai kopi (cafe), butik, atau restoran.",
    icon: "fa-mug-saucer"
  }
];

export default function EdukasiPage() {
  const [selectedArea, setSelectedArea] = useState(catchmentAreas[0]);
  const [selectedFloor, setSelectedFloor] = useState(blueprintFloors[2]);
  
  // Investment Simulator State
  const [initialCapital, setInitialCapital] = useState(500); // dalam juta Rp
  const [years, setYears] = useState(5);
  const [inflationRate] = useState(4); // 4% per tahun
  const [propertyGrowth] = useState(10); // 10% per tahun

  // Calculations
  const [inflationVal, setInflationVal] = useState(0);
  const [propertyVal, setPropertyVal] = useState(0);

  useEffect(() => {
    // Inflation: Capital * (1 - rate/100)^years (Daya beli berkurang)
    const infResult = initialCapital * Math.pow(1 - inflationRate / 100, years);
    // Property: Capital * (1 + rate/100)^years (Investasi bertumbuh)
    const propResult = initialCapital * Math.pow(1 + propertyGrowth / 100, years);
    
    setInflationVal(infResult.toFixed(1));
    setPropertyVal(propResult.toFixed(1));
  }, [initialCapital, years]);

  // Form states
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetWaNumber = "6281946838791";
    const message = `Halo Bpk/Ibu Daffa, saya telah membaca panduan edukasi investasi. Saya ingin berkonsultasi lebih lanjut mengenai unit di Metland Cikarang dan meminta PDF Product Knowledge lengkap.\n\n- Nama: ${formName}\n- WhatsApp: ${formPhone}`;
    const waUrl = `https://api.whatsapp.com/send?phone=${targetWaNumber}&text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div style={{ backgroundColor: "var(--color-dark-bg)", color: "var(--color-light-text)", minHeight: "100vh" }}>
      {/* Top Bar */}
      <div className="announcement-bar">
        <div className="container bar-content">
          <span>
            <i className="fa-solid fa-graduation-cap"></i> <strong>Edukasi Khusus Investor Properti Metland Cikarang</strong>
          </span>
          <Link href="/" className="bar-link">
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="edu-hero">
        <div className="container">
          <span className="section-tag" style={{ border: "1px solid var(--color-secondary)", padding: "4px 12px", borderRadius: "50px" }}>Analisis Pasar & Peluang</span>
          <h1 className="hero-title" style={{ fontSize: "3rem", margin: "16px 0" }}>
            Mengapa Uang Anda <span className="text-gold">Jauh Lebih Aman</span> <br />
            di Metland Cikarang?
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: "800px", margin: "0 auto 30px auto" }}>
            Mari bedah secara ilmiah potensi pertumbuhan modal (capital gain) dan yield sewa melalui fakta data catchment area populasi serta konsep tata ruang komersial modern.
          </p>
          <a href="#catchment" className="btn btn-submit-form" style={{ maxWidth: "250px", margin: "0 auto" }}>
            Pelajari Fakta Data <i className="fa-solid fa-arrow-down"></i>
          </a>
        </div>
      </section>

      {/* Section 1: Catchment Area Simulator */}
      <section className="location-section" id="catchment">
        <div className="container">
          <div className="showcase-header">
            <span className="section-tag">ANALISIS PASAR NYATA</span>
            <h2 className="section-title text-center">Fakta Catchment Area Weston Gateway</h2>
            <p className="section-subtitle">
              Pilih zona radius di bawah untuk menghitung limpahan calon konsumen aktif yang siap membelanjakan uangnya di bisnis ruko Anda.
            </p>
          </div>

          <div className="blueprint-container" style={{ backgroundColor: "var(--color-dark-card)", border: "1px solid var(--color-border)" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1.45rem", color: "white", marginBottom: "20px" }}>
                Pilih Zona Deteksi Populasi:
              </h3>
              <div className="catchment-selector">
                {catchmentAreas.map((area) => (
                  <button
                    key={area.key}
                    className={`catchment-btn ${selectedArea.key === area.key ? "active" : ""}`}
                    onClick={() => setSelectedArea(area)}
                  >
                    Area {area.key}
                  </button>
                ))}
              </div>

              <div className="catchment-display-card">
                <div className="catchment-stat-item">
                  <span>Luas Kawasan</span>
                  <strong>{selectedArea.luas}</strong>
                </div>
                <div className="catchment-stat-item">
                  <span>Jumlah Rumah (KK)</span>
                  <strong>{selectedArea.kk}</strong>
                </div>
                <div className="catchment-stat-item" style={{ gridColumn: "span 2", borderTop: "1px solid var(--color-border)", paddingTop: "14px" }}>
                  <span>Total Kepadatan Jiwa</span>
                  <strong style={{ color: "var(--color-secondary)" }}>{selectedArea.jiwa.toLocaleString("id-ID")} Jiwa</strong>
                </div>
              </div>
            </div>

            <div className="edu-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="text-gold" style={{ fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.8rem" }}>
                Analisis Potensi Bisnis {selectedArea.name}
              </span>
              <h4 style={{ fontFamily: "var(--font-title)", fontSize: "1.5rem", margin: "10px 0", color: "white" }}>
                Target Market Siap Belanja
              </h4>
              <p style={{ color: "var(--color-gray-text)", fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "20px" }}>
                {selectedArea.desc}
              </p>
              <div style={{ padding: "16px", backgroundColor: "rgba(16, 185, 129, 0.05)", borderRadius: "8px", border: "1px dashed var(--color-primary)" }}>
                <strong style={{ color: "white", display: "block" }}><i className="fa-solid fa-chart-pie text-gold"></i> Total Captive Market Terpadu (A-F):</strong>
                <span style={{ fontSize: "0.9rem", color: "var(--color-gray-text)" }}>
                  Lebih dari <strong>1.027.779 Jiwa</strong> (Ratusan ribu keluarga aktif) berada langsung dalam jangkauan traffic kawasan Metland Cikarang. Ini adalah jaminan kelangsungan bisnis komersial ruko Anda.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive 3-in-1 Ruko Blueprint */}
      <section className="facilities-section">
        <div className="container">
          <div className="showcase-header">
            <span className="section-tag">KONSEP DESAIN ERGONOMIS</span>
            <h2 className="section-title text-center">Inovasi Konsep Ruko 3-in-1 Weston Gateway</h2>
            <p className="section-subtitle">
              Satu aset properti dengan tiga fungsi sekaligus (Usaha, Kantor, & Hunian) untuk memaksimalkan utilitas dan nilai sewa aset Anda.
            </p>
          </div>

          <div className="blueprint-container">
            {/* Visual Blueprint Interactive Layer */}
            <div className="blueprint-visual" style={{ minHeight: "360px", backgroundImage: "url('/RUKO WESTON GATEWAY/galeri_cluster7_693135f9dd540 (2).jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="hero-bg-overlay" style={{ background: "rgba(0,0,0,0.6)" }}></div>
              
              {/* Interactive Floor Layers Overlays */}
              {blueprintFloors.map((floor) => (
                <div
                  key={floor.level}
                  className={`blueprint-floor-layer floor-layer-${floor.level} ${selectedFloor.level === floor.level ? "active" : ""}`}
                  onClick={() => setSelectedFloor(floor)}
                >
                  <span style={{ color: "white", fontFamily: "var(--font-title)", fontWeight: "800", fontSize: "1.2rem", textShadow: "0 2px 4px black" }}>
                    <i className={`fa-solid ${floor.icon}`}></i> Lantai {floor.level}
                  </span>
                </div>
              ))}
            </div>

            {/* Selected Floor Info */}
            <div className="blueprint-info-content">
              <span className="text-gold" style={{ fontWeight: "700", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "1px" }}>
                Detail Penggunaan Ruang
              </span>
              <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1.6rem", color: "white", margin: "8px 0" }}>
                {selectedFloor.title}
              </h3>
              <p style={{ color: "var(--color-gray-text)", fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "20px" }}>
                {selectedFloor.description}
              </p>
              
              <div style={{ display: "flex", gap: "10px" }}>
                {blueprintFloors.map((floor) => (
                  <button
                    key={floor.level}
                    onClick={() => setSelectedFloor(floor)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid var(--color-border)",
                      backgroundColor: selectedFloor.level === floor.level ? "var(--color-primary-dark)" : "rgba(255,255,255,0.03)",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "0.8rem"
                    }}
                  >
                    Lantai {floor.level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Investment vs Inflation Simulator */}
      <section className="location-section">
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="showcase-header">
            <span className="section-tag">SIMULATOR KEKAYAAN</span>
            <h2 className="section-title text-center">Nilai Uang Anda: Tabungan Biasa vs Properti</h2>
            <p className="section-subtitle">
              Uang kas yang didiamkan di bank tergerus inflasi secara berkala. Simulasikan jika uang Anda dipindahkan ke investasi properti produktif Metland Cikarang.
            </p>
          </div>

          <div className="edu-card">
            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", color: "var(--color-gray-text)", marginBottom: "10px", fontWeight: "600" }}>
                Pilih Jumlah Modal Awal: <span style={{ color: "var(--color-secondary)", fontSize: "1.2rem", fontWeight: "800" }}>Rp {initialCapital} Juta</span>
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={initialCapital}
                onChange={(e) => setInitialCapital(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--color-secondary)", cursor: "pointer" }}
              />
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", color: "var(--color-gray-text)", marginBottom: "10px", fontWeight: "600" }}>
                Pilih Durasi Waktu Simpanan: <span style={{ color: "var(--color-secondary)", fontSize: "1.2rem", fontWeight: "800" }}>{years} Tahun</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--color-secondary)", cursor: "pointer" }}
              />
            </div>

            <div className="sim-grid">
              <div className="sim-box infl">
                <h5>Nilai Uang di Tabungan Biasa<br />(Terpotong Inflasi ~4% / tahun)</h5>
                <span className="sim-value">Rp {inflationVal} Juta</span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-gray-text)" }}>Nilai daya beli riil uang Anda menyusut.</span>
              </div>

              <div className="sim-box prop">
                <h5>Nilai Aset Properti Metland<br />(Kenaikan Capital Gain ~10% / tahun)</h5>
                <span className="sim-value">Rp {propertyVal} Juta</span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-gray-text)" }}>Kekayaan bersih Anda meningkat secara pasif.</span>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "32px", fontSize: "0.85rem", color: "var(--color-gray-text)", borderTop: "1px solid var(--color-border)", paddingTop: "20px" }}>
              <i className="fa-solid fa-triangle-exclamation text-gold"></i> <strong>Kesimpulan Finansial:</strong> Dengan mengalihkan modal Anda menjadi aset properti di Metland Cikarang, Anda mengamankan aset senilai lebih dari <strong>Rp {(Number(propertyVal) - Number(inflationVal)).toFixed(1)} Juta</strong> dibanding membiarkannya tergerus inflasi di bank tabungan biasa!
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Call to Action Form */}
      <section className="facilities-section" style={{ backgroundColor: "#030712" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <div className="hero-form-card" style={{ border: "1px solid var(--color-secondary)" }}>
            <div className="form-header" style={{ textAlign: "center" }}>
              <span className="text-gold" style={{ fontWeight: "bold", fontSize: "0.8rem", letterSpacing: "1px" }}>SESI KONSULTASI EKSKLUSIF</span>
              <h3 style={{ margin: "10px 0" }}>Jadwalkan Konsultasi Investasi</h3>
              <p>Dapatkan PDF Product Knowledge lengkap, analisis pasar properti terbaru, dan panduan KPR flat gratis.</p>
            </div>

            <form onSubmit={handleSubmit} className="cta-form">
              <div className="form-group">
                <label htmlFor="edu-name"><i className="fa-solid fa-user"></i> Nama Lengkap</label>
                <input
                  type="text"
                  id="edu-name"
                  placeholder="Contoh: Budi Santoso"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edu-phone"><i className="fa-brands fa-whatsapp"></i> No. WhatsApp Aktif</label>
                <input
                  type="tel"
                  id="edu-phone"
                  placeholder="Contoh: 08123456789"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-submit-form">
                Klaim Konsultasi & Brosur via WA <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="container" style={{ textAlign: "center", fontSize: "0.8rem" }}>
          <p style={{ marginBottom: "10px" }}>&copy; 2026 PT Metropolitan Land Tbk / daffadhiyaulhaqkhadafi. Semua Hak Dilindungi.</p>
          <p style={{ color: "var(--color-gray-text)" }}>Representatif Resmi: daffadhiyaulhaqkhadafi@gmail.com | +62 819 4683 8791</p>
        </div>
      </footer>
    </div>
  );
}
