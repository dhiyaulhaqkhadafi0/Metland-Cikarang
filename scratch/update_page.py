import re

with open("e:/Metland/metland-app/src/app/page.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Bank array
old_bank_array = """// --- BANK LOGOS ---
// Using raw text now but the CSS will style them as big logos or use external images
const bankPartners = [
  "BCA", "BRI", "BSI", "Mandiri", "BTN", "BNI", "NOBU"
];"""
new_bank_array = """// --- BANK LOGOS ---
const bankPartners = [
  { name: "BCA", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" },
  { name: "BRI", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/BRI_2020.svg" },
  { name: "BSI", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Bank_Syariah_Indonesia.svg" },
  { name: "Mandiri", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" },
  { name: "BTN", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Bank_BTN_logo.svg" },
  { name: "BNI", logo: "https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg" },
  { name: "NOBU", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Nobu_Bank_logo.svg/1200px-Nobu_Bank_logo.svg.png" }
];"""
content = content.replace(old_bank_array, new_bank_array)

# 2. Testimonial
content = content.replace("Promo tanpa DP sangat nyata dan menguntungkan!", "Promo dengan DP 2,5% sangat nyata dan menguntungkan!")

# 3. WA Message
content = content.replace("simulasi promo KPR tanpa DP. Saya siap", "simulasi promo KPR dengan DP 2,5%. Saya siap")

# 4. Hero Section & Aurora
old_hero = """        <div className="hero-bg-overlay-heavy"></div>
        <div className="container hero-container">
          <div className="hero-content">"""
new_hero = """        <div className="hero-bg-overlay-heavy"></div>
        <div className="aurora-bg">
          <div className="aurora-orb orb-1"></div>
          <div className="aurora-orb orb-2"></div>
          <div className="aurora-orb orb-3"></div>
        </div>
        <div className="container hero-container glass-container-hero">
          <div className="hero-content glass-card-content">"""
content = content.replace(old_hero, new_hero)

# DP Hero text
content = content.replace("Miliki Sekarang dengan DP 0% (Tanpa Beban Awal)", "Miliki Sekarang dengan DP Ringan 2,5%")

# 5. Banks Section HTML
old_banks_section = """      {/* Banks Section */}
      <section className="trust-section">
        <div className="container trust-container">
          <div className="trust-text">
            <span className="section-tag">LEGALITAS TERJAMIN</span>
            <h4>Didukung Penuh Bank BUMN & Swasta Terkemuka</h4>
            <p className="trust-desc">
              Persetujuan legal dan dukungan finansial KPR dari bank-bank terbesar adalah bukti mutlak kredibilitas kawasan Metland Cikarang.
            </p>
          </div>
          <div className="bank-partners-static">
            {bankPartners.map((bank, index) => (
              <div key={index} className="bank-logo-big">
                <span className="bank-text-logo">{bank}</span>
              </div>
            ))}
          </div>
        </div>
      </section>"""
new_banks_section = """      {/* Banks Section */}
      <section className="trust-section relative-overflow glass-section">
        <div className="container trust-container">
          <div className="trust-text glass-card-content p-6">
            <span className="section-tag">LEGALITAS TERJAMIN</span>
            <h4>Didukung Penuh Bank BUMN & Swasta Terkemuka</h4>
            <p className="trust-desc">
              Persetujuan legal dan dukungan finansial KPR dari bank-bank terbesar adalah bukti mutlak kredibilitas kawasan Metland Cikarang.
            </p>
          </div>
          <div className="bank-marquee-wrapper">
            <div className="bank-marquee-track">
              {bankPartners.concat(bankPartners).map((bank, index) => (
                <div key={index} className="bank-logo-glass">
                  <img src={bank.logo} alt={`Logo ${bank.name}`} className="bank-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>"""
content = content.replace(old_banks_section, new_banks_section)

# 6. Sticky CTA
content = content.replace("Promo DP 0% & Free Biaya Akad", "Promo DP 2,5% & Free Biaya Akad")

with open("e:/Metland/metland-app/src/app/page.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Page.js replacements completed.")
