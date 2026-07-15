"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Calculator, BookOpen, ChevronRight, Calculator as CalcIcon, MessageSquare, Send, Cpu, Loader2, ArrowRight, X, Info, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LEGAL_TERMS = [
  { term: "PPJB", desc: "Perjanjian Pengikatan Jual Beli. Kesepakatan awal sebelum syarat AJB terpenuhi." },
  { term: "AJB", desc: "Akta Jual Beli. Dokumen sah pemindahan hak atas tanah dan bangunan." },
  { term: "SHM", desc: "Sertifikat Hak Milik. Kasta tertinggi kepemilikan tanpa batas waktu." },
  { term: "SHGB", desc: "Sertifikat Hak Guna Bangunan. Hak mendirikan bangunan di atas tanah negara/hak milik orang lain." },
  { term: "BPHTB", desc: "Bea Perolehan Hak atas Tanah dan Bangunan. Pajak pembeli (umumnya 5%)." },
  { term: "BBN", desc: "Biaya Balik Nama. Biaya mengubah nama di sertifikat menjadi nama pembeli." },
  { term: "SP3K", desc: "Surat Penegasan Persetujuan Penyediaan Kredit dari bank." },
  { term: "NPOPTKP", desc: "Nilai Perolehan Objek Pajak Tidak Kena Pajak. Pengurang sebelum hitung BPHTB." },
  { term: "Akad Kredit", desc: "Penandatanganan perjanjian pinjaman KPR antara debitur dan bank." },
  { term: "Appraisal", desc: "Penilaian harga pasar properti oleh pihak bank/independen." },
  { term: "SLIK OJK", desc: "Sistem Layanan Informasi Keuangan. Pengecekan riwayat kredit (BI Checking)." },
  { term: "PBB", desc: "Pajak Bumi dan Bangunan. Pajak tahunan atas properti." }
];

const LEGAL_TIMELINE = [
  { step: 1, title: "Booking Fee & SLIK OJK", desc: "Tanda jadi dan pengecekan riwayat kredit. Memastikan kemampuan bayar dan keseriusan." },
  { step: 2, title: "DP & SP3K", desc: "Pembayaran Uang Muka dan terbitnya persetujuan KPR dari bank jika menggunakan fasilitas kredit." },
  { step: 3, title: "PPJB", desc: "Penandatanganan Perjanjian Pengikatan Jual Beli. Biasa dilakukan jika sertifikat belum pecah/AJB belum bisa dilakukan." },
  { step: 4, title: "Akad KPR & AJB", desc: "Akta Jual Beli ditandatangani di hadapan Notaris, bersamaan dengan Akad Kredit bank." },
  { step: 5, title: "Balik Nama (SHM/SHGB)", desc: "Proses BBN sertifikat di BPN ke atas nama Anda. Sertifikat disimpan bank jika KPR." }
];

const LEGAL_WELCOME = {
  id: "legal-welcome",
  role: "assistant",
  content: `# ⚖️ Smart Legal Consultant\n\nSaya adalah spesialis hukum properti dan perpajakan di SMI.\n\nSilakan tanyakan apa saja terkait:\n- Dokumen Legalitas (SHM, SHGB, AJB)\n- Pajak Properti (BPHTB, PPN, PBB)\n- Proses KPR & Akad\n\nAtau klik salah satu **Istilah Populer** di atas untuk penjelasan cepat.`
};

export default function SmartLegalExplainerCapability({ onSwitchToConsultant }) {
  const [activeTab, setActiveTab] = useState("chat"); // chat, calculator, timeline
  const [propertyPrice, setPropertyPrice] = useState("");
  const [npoptkp, setNpoptkp] = useState(60000000); // Default NPOPTKP 60 juta
  
  // Chat State
  const [messages, setMessages] = useState([LEGAL_WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === "chat") {
      scrollToBottom();
    }
  }, [messages, isLoading, activeTab]);

  const sendLegalMessage = async (text) => {
    const userText = text || input;
    if (!userText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
      parts: [{ text: userText }]
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.filter((m) => m.role === "user" || m.role === "assistant"),
          context: "legal" // Flag for legal system prompt
        })
      });

      if (!response.ok) throw new Error("Gagal menghubungi server Legal.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      const assistantId = Date.now().toString() + "-ai";
      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\\n").filter(Boolean);
        for (const line of lines) {
          if (line.startsWith("0:")) {
            try {
              const jsonStr = line.slice(2);
              const parsed = JSON.parse(jsonStr);
              if (typeof parsed === "string") {
                assistantContent += parsed;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: assistantContent } : m
                  )
                );
              }
            } catch {}
          }
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-err",
          role: "assistant",
          content: `⚠️ Error: ${err.message}`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChipClick = (term) => {
    setActiveTab("chat");
    sendLegalMessage(`Tolong jelaskan apa itu ${term} secara detail namun mudah dipahami oleh orang awam, serta apa fungsinya dalam transaksi properti.`);
  };

  const formatCurrency = (val) => {
    if (!val) return "Rp0";
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Calculator Logic
  const priceNum = parseInt(propertyPrice.replace(/[^0-9]/g, "")) || 0;
  const taxableValue = Math.max(0, priceNum - npoptkp);
  const bphtb = taxableValue * 0.05;
  const ajbFee = priceNum * 0.01; // Notaris/AJB 1%
  const bbnFee = priceNum * 0.005; // BBN 0.5% (approximate)
  const totalLegalFee = bphtb + ajbFee + bbnFee;

  return (
    <div className="flex flex-col h-[85vh] min-h-[600px] w-full bg-[#0a0a0b]/90 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5 relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="px-8 py-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10 bg-black/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0b] border border-white/10 flex items-center justify-center ring-1 ring-white/5 shadow-inner">
            <Scale className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
              Smart Legal Explainer
              <span className="text-[9px] font-bold px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded uppercase tracking-widest border border-blue-500/30">
                BETA
              </span>
            </h2>
            <p className="text-sm text-gray-400 font-light mt-0.5">Pahami legalitas & estimasi biaya properti</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-black/40 border border-white/10 rounded-xl backdrop-blur-md">
          {[
            { id: "chat", icon: MessageSquare, label: "Tanya Istilah" },
            { id: "timeline", icon: BookOpen, label: "Tahapan Legal" },
            { id: "calculator", icon: CalcIcon, label: "Estimasi Biaya" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id 
                  ? "bg-white/10 text-white shadow-sm ring-1 ring-white/20" 
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* TAB: CHAT & TERMS */}
          {activeTab === "chat" && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col w-full h-full"
            >
              {/* Terms Chips Slider */}
              <div className="px-6 py-4 border-b border-white/5 bg-black/20 shrink-0">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Istilah Populer (Klik untuk tanya)</p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                  {LEGAL_TERMS.map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChipClick(term.term)}
                      className="snap-start shrink-0 px-4 py-2 bg-gradient-to-br from-[#1c1c1e] to-[#111113] border border-white/10 rounded-xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-left group min-w-[200px]"
                    >
                      <div className="text-sm font-medium text-gray-200 group-hover:text-blue-400 transition-colors">{term.term}</div>
                      <div className="text-xs text-gray-500 font-light mt-1 truncate">{term.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border mt-1 shadow-sm ${
                      m.role === "user"
                        ? "bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700 text-gray-300"
                        : "bg-gradient-to-b from-blue-900/40 to-blue-950/40 border-blue-800/50 text-blue-400"
                    }`}>
                      {m.role === "user" ? <User size={16} /> : <Scale size={16} />}
                    </div>

                    <div className={`max-w-[85%] text-[15px] font-light leading-relaxed tracking-wide ${
                      m.role === "user"
                        ? "bg-[#1c1c1e] text-gray-100 px-5 py-3.5 rounded-2xl rounded-tr-sm border border-white/5 shadow-md"
                        : "text-gray-300 py-1 w-full"
                    }`}>
                      {m.role === "user" ? (
                        m.content
                      ) : (
                        <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-300 prose-headings:text-white prose-a:text-blue-400 hover:prose-a:underline prose-strong:text-white prose-ul:my-4 prose-li:my-1 prose-li:marker:text-blue-500">
                          {m.content ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {m.content}
                            </ReactMarkdown>
                          ) : (
                            <span className="flex items-center gap-1 h-6 opacity-50">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse delay-75" />
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse delay-150" />
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-blue-900/40 border border-blue-800/50 text-blue-400 flex items-center justify-center shrink-0 mt-1">
                      <Scale size={16} className="animate-pulse" />
                    </div>
                    <div className="py-2.5 px-1 flex items-center gap-1.5">
                      <span className="text-sm font-medium text-blue-500/70 animate-pulse">Menyusun advis legal...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} className="h-4" />
              </div>

              {/* Chat Input */}
              <div className="p-4 md:p-6 border-t border-white/5 bg-black/40 backdrop-blur-md shrink-0">
                <form onSubmit={(e) => { e.preventDefault(); sendLegalMessage(); }} className="relative max-w-3xl mx-auto">
                  <div className="relative group flex items-center bg-[#111113] border border-white/10 rounded-3xl p-1.5 focus-within:border-blue-500/50 transition-all shadow-inner">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Tanya seputar BPHTB, KPR, atau legalitas..."
                      className="relative flex-grow bg-transparent pl-4 pr-12 py-3 text-[15px] text-white focus:outline-none placeholder:text-gray-600 font-light"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-400 disabled:bg-[#1c1c1e] disabled:text-gray-600 transition-all"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* TAB: TIMELINE */}
          {activeTab === "timeline" && (
            <motion.div 
              key="timeline"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full h-full overflow-y-auto p-8"
            >
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <h3 className="text-2xl font-semibold text-white mb-3">Tahapan Legalitas Properti</h3>
                  <p className="text-gray-400 font-light">Langkah demi langkah yang ideal saat membeli properti di Metland.</p>
                </div>

                <div className="relative border-l border-white/10 ml-6 md:ml-12 space-y-12 pb-12">
                  {LEGAL_TIMELINE.map((item, idx) => (
                    <motion.div 
                      key={item.step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative pl-8 md:pl-12"
                    >
                      <div className="absolute -left-6 top-0 w-12 h-12 bg-black border border-white/10 rounded-full flex items-center justify-center text-lg font-bold text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20">
                        {item.step}
                      </div>
                      <div className="bg-[#111113] border border-white/5 p-6 rounded-2xl shadow-lg hover:border-white/10 transition-colors">
                        <h4 className="text-xl font-medium text-white mb-2">{item.title}</h4>
                        <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: CALCULATOR */}
          {activeTab === "calculator" && (
            <motion.div 
              key="calculator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full h-full overflow-y-auto p-8"
            >
              <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Input Section */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Kalkulator Biaya Legal</h3>
                    <p className="text-gray-400 font-light text-sm">Hitung estimasi pajak dan biaya surat-surat sebelum transaksi.</p>
                  </div>

                  <div className="space-y-6 bg-[#111113] border border-white/5 p-6 rounded-3xl">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Harga Properti</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-500 font-medium">Rp</span>
                        </div>
                        <input
                          type="text"
                          value={propertyPrice}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "");
                            setPropertyPrice(val ? parseInt(val).toLocaleString('id-ID') : "");
                          }}
                          className="block w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium text-lg"
                          placeholder="800.000.000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex justify-between items-center text-sm font-medium text-gray-400 mb-2">
                        <span>NPOPTKP (Bebas Pajak)</span>
                        <span className="text-xs text-gray-500">Standar Bekasi: Rp60 Juta</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-500 font-medium">Rp</span>
                        </div>
                        <input
                          type="text"
                          value={npoptkp.toLocaleString('id-ID')}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "");
                            setNpoptkp(val ? parseInt(val) : 0);
                          }}
                          className="block w-full pl-12 pr-4 py-3 bg-black/30 border border-white/5 rounded-xl text-gray-300 focus:outline-none focus:border-white/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/10 border border-blue-500/20 rounded-2xl p-4 flex gap-3 text-sm text-blue-200/80">
                    <Info className="w-5 h-5 shrink-0 text-blue-400" />
                    <p className="font-light leading-relaxed">
                      Biaya riil dapat berbeda tergantung kebijakan developer, promosi bebas biaya, dan notaris yang ditunjuk. Gunakan ini hanya sebagai estimasi kasar.
                    </p>
                  </div>
                </div>

                {/* Output Section */}
                <div className="bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0b] border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/5">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
                  
                  <h4 className="text-lg font-medium text-white mb-8 border-b border-white/10 pb-4">Rincian Estimasi Biaya</h4>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-gray-400 font-light text-sm mb-1">BPHTB (Pajak Pembeli 5%)</div>
                        <div className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 inline-block">(Harga - NPOPTKP) x 5%</div>
                      </div>
                      <div className="text-xl font-medium text-white">{formatCurrency(bphtb)}</div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-gray-400 font-light text-sm mb-1">Biaya AJB & Notaris</div>
                        <div className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 inline-block">Estimasi 1% dari harga</div>
                      </div>
                      <div className="text-xl font-medium text-white">{formatCurrency(ajbFee)}</div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-gray-400 font-light text-sm mb-1">Biaya Balik Nama (BBN)</div>
                        <div className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 inline-block">Estimasi 0.5% dari harga</div>
                      </div>
                      <div className="text-xl font-medium text-white">{formatCurrency(bbnFee)}</div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-white/10">
                    <div className="text-gray-500 text-sm mb-2">Total Estimasi Biaya Tambahan</div>
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tight">
                      {formatCurrency(totalLegalFee)}
                    </div>
                    <div className="mt-4 text-xs font-medium text-blue-500 bg-blue-500/10 border border-blue-500/20 px-3 py-2 rounded-lg inline-flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      Pastikan Anda menyiapkan dana ini sebelum proses akad.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
