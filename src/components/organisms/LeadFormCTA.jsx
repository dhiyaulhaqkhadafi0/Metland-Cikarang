"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { saveLeadAction } from "@/app/actions/lead.actions";
import { getTrackingData } from "@/lib/tracking/utmTracker";

export default function LeadFormCTA() {
  const [status, setStatus] = useState("idle"); // 'idle', 'submitting', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.target);
    const trackingData = getTrackingData() || {};
    
    try {
      const result = await saveLeadAction(trackingData, {
        name: formData.get("name"),
        phone: formData.get("phone"),
      });
      
      if (result.success) {
        setStatus("success");
        // Trigger Meta Pixel Event for Lead
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead");
        }
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Terjadi kesalahan, silakan coba lagi.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Koneksi bermasalah. Silakan coba lagi.");
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-dark-bg">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-dark-bg to-dark-bg pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-dark-card border border-border p-8 md:p-14 rounded-3xl shadow-emerald-glow relative overflow-hidden"
        >
          {/* Decorative background blur */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-title font-bold text-light-text mb-4">
                Dapatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Penawaran Eksklusif</span>
              </h2>
              <p className="text-gray-text mb-8 text-lg">
                Tinggalkan detail Anda dan tim expert kami akan segera menghubungi Anda dengan informasi properti terbaik dan promo menarik.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-text">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span>Konsultasi gratis dengan ahlinya</span>
                </div>
                <div className="flex items-center gap-4 text-gray-text">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span>Informasi harga dan diskon terbaru</span>
                </div>
                <div className="flex items-center gap-4 text-gray-text">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span>Pilihan unit premium terbaik</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Terima Kasih!</h3>
                  <p className="text-slate-400">
                    Data Anda telah kami terima. Tim kami akan segera menghubungi Anda.
                  </p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors"
                  >
                    Kirim data baru
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-500" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="block w-full pl-12 pr-4 py-3 bg-[#0d131f] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Masukkan nama Anda"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                      Nomor WhatsApp
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-slate-500" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        className="block w-full pl-12 pr-4 py-3 bg-[#0d131f] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Contoh: 08123456789"
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 border border-transparent rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-primary hover:from-emerald-500 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-dark-bg transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {status === "submitting" ? (
                      "Mengirim..."
                    ) : (
                      <>
                        Dapatkan Penawaran
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
