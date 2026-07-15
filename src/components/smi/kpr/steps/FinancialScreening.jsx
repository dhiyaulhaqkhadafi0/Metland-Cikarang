"use client";

import { motion } from "framer-motion";
import { User, Briefcase, DollarSign, Home, ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    group: "Cluster Avesa",
    options: [
      { id: "canary-22", name: "Sub-klaster Canary (Tipe 22/72)", price: 518000000 },
      { id: "canary-30", name: "Sub-klaster Canary (Tipe 30/72)", price: 578000000 },
      { id: "derora-33", name: "Sub-klaster Derora (Tipe 33/72)", price: 695000000 },
      { id: "derora-59", name: "Sub-klaster Derora (Tipe 59/84)", price: 1050000000 }
    ]
  },
  {
    group: "Cluster Brassia",
    options: [
      { id: "myzora-33", name: "Sub-klaster Myzora (Tipe 33/72)", price: 647000000 },
      { id: "myzora-45", name: "Sub-klaster Myzora (Tipe 45/72)", price: 750000000 },
      { id: "myzora-56", name: "Sub-klaster Myzora (Tipe 56/84)", price: 992000000 },
      { id: "myzora-77", name: "Sub-klaster Myzora (Tipe 77/98)", price: 1200000000 },
      { id: "ellyra-45", name: "Sub-klaster Ellyra (Tipe 45/72)", price: 850000000 },
      { id: "ellyra-56-84", name: "Sub-klaster Ellyra (Tipe 56/84)", price: 1100000000 },
      { id: "ellyra-56-98", name: "Sub-klaster Ellyra (Tipe 56/98)", price: 1150000000 }
    ]
  },
  {
    group: "Komersial (Ruko)",
    options: [
      { id: "easton-90", name: "Ruko Easton Gateway (Tipe 90/54)", price: 1200000000 },
      { id: "easton-100", name: "Ruko Easton Gateway (Tipe 100/60)", price: 1400000000 },
      { id: "weston-90", name: "Ruko Weston Gateway (Tipe 90/54)", price: 1200000000 },
      { id: "weston-100", name: "Ruko Weston Gateway (Tipe 100/60)", price: 1400000000 }
    ]
  }
];

export default function FinancialScreening({ data, updateData, onNext }) {
  
  const handleProfileChange = (field, value) => {
    updateData("profile", { ...data.profile, [field]: value });
  };

  const handlePropertyChange = (e) => {
    const selectedId = e.target.value;
    const flatProducts = PRODUCTS.flatMap(g => g.options);
    const prod = flatProducts.find(p => p.id === selectedId);
    
    if (selectedId === "custom") {
      updateData("property", { ...data.property, product: "Custom", isCustom: true });
    } else {
      updateData("property", { 
        ...data.property, 
        product: prod.name, 
        price: prod.price, 
        isCustom: false 
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Financial Screening</h2>
        <p className="text-gray-400">Mari mulai dengan profil dasar Anda. SMI akan menyesuaikan pertanyaan selanjutnya berdasarkan informasi ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Kolom Kiri: Profil & Pekerjaan */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-400" /> Profil Pribadi
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={data.profile.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Usia</label>
                <input 
                  type="number" 
                  value={data.profile.age}
                  onChange={(e) => handleProfileChange("age", Number(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Status Pernikahan</label>
                <select 
                  value={data.profile.maritalStatus}
                  onChange={(e) => handleProfileChange("maritalStatus", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
                >
                  <option value="Single">Single</option>
                  <option value="Menikah">Menikah</option>
                </select>
              </div>
              {data.profile.maritalStatus === "Menikah" && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Jumlah Anak</label>
                  <input 
                    type="number" 
                    value={data.profile.children}
                    onChange={(e) => handleProfileChange("children", Number(e.target.value))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-400" /> Pekerjaan
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {["Karyawan", "Wirausaha", "Freelancer", "Profesional", "Lainnya"].map(job => (
                <button
                  key={job}
                  onClick={() => updateData("employment", job)}
                  className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                    data.employment === job 
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-400" 
                      : "bg-black/50 border-white/10 text-gray-400 hover:border-gray-500"
                  }`}
                >
                  {job}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Penghasilan & Properti */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" /> Penghasilan Pokok
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Gaji Bulanan (Nett)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                <input 
                  type="number" 
                  value={data.income.main}
                  onChange={(e) => updateData("income", { ...data.income, main: Number(e.target.value) })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Home className="w-5 h-5 text-emerald-400" /> Rencana Properti
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Produk Incaran</label>
                <select 
                  value={data.property.isCustom ? "custom" : PRODUCTS.flatMap(g => g.options).find(p => p.name === data.property.product)?.id || "custom"}
                  onChange={handlePropertyChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
                >
                  {PRODUCTS.map(group => (
                    <optgroup key={group.group} label={group.group} className="bg-gray-900 text-gray-400 font-bold">
                      {group.options.map(p => (
                        <option key={p.id} value={p.id} className="text-white font-normal bg-black">
                          {p.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="custom" className="bg-black text-emerald-400 font-bold">Pilih / Input Custom</option>
                </select>
              </div>

              {data.property.isCustom && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Harga Properti (Custom)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                    <input 
                      type="number" 
                      value={data.property.price}
                      onChange={(e) => updateData("property", { ...data.property, price: Number(e.target.value) })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </motion.div>
              )}

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <label className="block text-sm font-medium text-gray-400">Rencana DP Awal (%)</label>
                  <div className="relative w-24">
                    <input 
                      type="number"
                      value={data.property.dp}
                      onChange={(e) => updateData("property", { ...data.property, dp: Number(e.target.value) })}
                      step="0.5"
                      className="bg-black/50 border border-white/10 rounded-xl px-3 pr-8 py-1.5 text-emerald-400 font-bold w-full focus:outline-none focus:border-emerald-500 text-right"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min={0} max={50} step={0.5} 
                  value={data.property.dp}
                  onChange={(e) => updateData("property", { ...data.property, dp: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 mt-2"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-400 font-bold">✓</span>
          </div>
          <div>
            <p className="text-white font-bold">Screening Dasar Selesai</p>
            <p className="text-sm text-gray-400">SMI telah mengenali profil Anda.</p>
          </div>
        </div>
        <button 
          onClick={onNext}
          className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-emerald-400 hover:text-white transition-all flex items-center gap-2"
        >
          Lanjut Analisis <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </motion.div>
  );
}
