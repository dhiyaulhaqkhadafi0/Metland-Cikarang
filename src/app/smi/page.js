"use client";

import { User, Send, Cpu, ChevronRight, Lock, Search, GitCompare, Microchip, Loader2, Paperclip, Image as ImageIcon, HardDrive, Copy, ThumbsUp, ThumbsDown, Download, X, ArrowLeft, Landmark } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/lib/supabase";
import useDrivePicker from "react-google-drive-picker";
import SmartFinderCapability from "@/components/smi/SmartFinderCapability";
import SmartComparisonCapability from "@/components/smi/SmartComparisonCapability";

// Feature Cards for the Hub
const FEATURES = [
  {
    id: "finder",
    title: "Smart Property Finder",
    description: "Cari properti berdasarkan parameter gaya hidup, radius, dan fasilitas.",
    icon: Search,
    status: "Active",
    action: "Explore Finder"
  },
  {
    id: "consultant",
    title: "Smart AI Consultant",
    description: "Ngobrol langsung dengan asisten properti jenius untuk semua pertanyaan Anda.",
    icon: User,
    status: "Active",
    action: "Mulai Chat"
  },
  {
    id: "comparison",
    title: "Smart Comparison",
    description: "Bandingkan properti, skema cicilan, dan ROI dengan mudah.",
    icon: GitCompare,
    status: "Active",
    action: "Bandingkan"
  },
  {
    id: "kpr",
    title: "Smart KPR Advisor",
    description: "Analisis finansial personal untuk rekomendasi KPR terbaik.",
    icon: Landmark,
    status: "Active",
    action: "Mulai Analisis",
    link: "/smi/kpr-advisor"
  }
];

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content: `# 🧠 SMI System Ready

Mesin pengambil keputusan terintegrasi Metland Cikarang telah diaktifkan.

---

## 📊 Siap Menganalisis

Silakan masukkan parameter Anda, seperti:
- **Pendapatan bulanan**
- **Kebutuhan ruang** (jumlah keluarga/anak)
- **Prioritas utama** (lokasi, fasilitas, atau budget)

---

> 💡 **Insight SMI:** Semakin detail informasi yang Anda berikan, termasuk jika Anda mengunggah gambar/dokumen referensi, semakin akurat skor kecocokan yang akan saya hasilkan.

---

## 🚀 Langkah Selanjutnya

- ⌨️ Ketik profil Anda di bawah ini
- 📎 Unggah file untuk analisis spesifik
- 📅 Jadwalkan Visit langsung (jika sudah yakin)
`
};

export default function SMIPage() {
  const router = useRouter();
  const [mode, setMode] = useState("dashboard");
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  
  // Attachments state
  const [attachments, setAttachments] = useState([]); // { url/base64, name, mimeType }
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const [openPicker, authResponse] = useDrivePicker();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (mode === "chat") {
      scrollToBottom();
    }
  }, [messages, isLoading, mode]);

  // Real-time clock effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      const dateStr = now.toLocaleDateString('id-ID', options);
      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setCurrentTime(`${dateStr} • ${timeStr} WIB`);
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- File Upload Handlers ---
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Maksimal ukuran file adalah 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result;
      setAttachments((prev) => [
        ...prev,
        { data: base64String, name: file.name, mimeType: file.type }
      ]);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDriveClick = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    
    if (!clientId || !apiKey) {
      alert("Sistem belum siap. Kredensial Google belum tersimpan dengan benar di server.");
      return;
    }

    openPicker({
      clientId: clientId,
      developerKey: apiKey,
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === "picked") {
          data.docs.forEach((doc) => {
            setAttachments((prev) => [
              ...prev,
              { data: doc.url, name: doc.name, mimeType: doc.mimeType, isDriveLink: true }
            ]);
          });
        }
      },
    });
  };

  // --- Message Action Handlers ---
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Optional: show a small toast here
  };

  const handleDownload = (text) => {
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SMI_Analysis.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFeedback = async (e, messageContent, type) => {
    try {
      // Opt-in UI feedback
      const btn = e.currentTarget;
      const originalColor = btn.style.color;
      btn.style.color = type === 'like' ? '#10b981' : '#ef4444';
      
      const { error } = await supabase
        .from('smi_feedback')
        .insert([{ message_content: messageContent, feedback: type }]);
        
      if (error) throw error;
    } catch (err) {
      console.error("Gagal mengirim feedback:", err.message);
      // alert("Database Supabase belum siap (Lihat Panduan Konfigurasi).");
    }
  };

  // --- Chat Logic ---
  const sendMessage = async (text) => {
    const userText = text || input;
    if ((!userText.trim() && attachments.length === 0) || isLoading) return;

    // Separate base64 data from prefix (data:image/jpeg;base64,...)
    const processedAttachments = attachments
      .filter(att => !att.isDriveLink)
      .map(att => ({
        inlineData: {
          data: att.data.split(',')[1],
          mimeType: att.mimeType
        }
      }));

    // If there are drive links, append them to the text
    const driveLinks = attachments.filter(att => att.isDriveLink);
    let finalUserText = userText;
    if (driveLinks.length > 0) {
      finalUserText += "\n\n[Referensi Dokumen Google Drive User]:\n" + driveLinks.map(d => `- ${d.name} (${d.data})`).join("\n");
    }

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: finalUserText,
      parts: [
        { text: finalUserText },
        ...processedAttachments
      ]
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setAttachments([]); // Clear attachments after sending
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages
            .filter((m) => m.role === "user" || m.role === "assistant")
            // Send full object to API route so it can map 'parts' correctly
        })
      });

      if (!response.ok) {
        let errMsg = "Koneksi ke sistem analitik terputus.";
        try {
          const errData = await response.json();
          if (errData.error?.includes("quota") || errData.error?.includes("429")) {
            errMsg = "Server utama sedang penuh. Mengalihkan ke sistem fallback... (Kuota API habis, silakan coba beberapa saat lagi).";
          } else if (errData.error?.includes("503") || errData.error?.includes("high demand")) {
            errMsg = "Trafik analitik sedang tinggi. Mohon coba lagi dalam beberapa menit.";
          } else {
            errMsg = errData.error || errMsg;
          }
        } catch {}
        throw new Error(errMsg);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      const assistantId = Date.now().toString() + "-ai";
      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(Boolean);
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
            } catch {
              // skip invalid fragments
            }
          }
        }
      }
    } catch (err) {
      console.error("SMI Error:", err);
      setMessages((prev) => [
        ...prev.filter((m) => m.content !== ""),
        {
          id: Date.now().toString() + "-err",
          role: "assistant",
          content: `⚠️ Error Analisis: ${err.message}`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <main className="min-h-screen bg-[#020202] text-gray-200 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <div className="flex-grow pt-24 pb-12 flex flex-col items-center justify-center container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Apple-like Ambient Glows */}
        <div className="fixed top-1/3 left-1/4 w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="fixed bottom-1/3 right-1/4 w-[30vw] h-[30vw] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

        <AnimatePresence mode="wait">
          
          {/* =========================================
              STATE 1: DASHBOARD / HUB
             ========================================= */}
          {mode === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)", transition: { duration: 0.3 } }}
              className="w-full max-w-5xl flex flex-col items-center mt-10"
            >
              <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0b] border border-white/5 shadow-[0_0_40px_rgba(255,255,255,0.03)] mb-4 ring-1 ring-white/10">
                  <Cpu className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-white stroke-emerald-100" />
                </div>
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                  SMI
                </h1>
                <p className="text-sm md:text-base font-medium tracking-widest uppercase text-gray-500">
                  Smart Metland Intelligence
                </p>
                <p className="max-w-2xl mx-auto text-gray-400 mt-6 text-lg font-light leading-relaxed">
                  Mesin pengambil keputusan terintegrasi. Dirancang untuk menganalisis kebutuhan finansial dan gaya hidup Anda secara komprehensif.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
                {FEATURES.map((feature, idx) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                    onClick={() => {
                      if (feature.status === "Active") {
                        if (feature.link) {
                          router.push(feature.link);
                        } else if (feature.id === "finder") {
                          setMode("finder");
                        } else if (feature.id === "comparison") {
                          setMode("comparison");
                        } else {
                          setMode("chat");
                        }
                      }
                    }}
                    className={`group relative p-8 rounded-[2rem] bg-gradient-to-b from-[#111113] to-[#0a0a0b] border border-white/5 transition-all duration-500 overflow-hidden ${
                      feature.status === "Active" 
                        ? "cursor-pointer hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] hover:-translate-y-1" 
                        : "cursor-not-allowed opacity-70 grayscale-[0.5]"
                    }`}
                  >
                    {feature.status === "Active" && (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent transition-all duration-500" />
                    )}

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-8">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                          feature.status === "Active"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-white/5 border-white/10 text-gray-500"
                        }`}>
                          <feature.icon className="w-5 h-5" />
                        </div>
                        {feature.status === "Coming Soon" ? (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-gray-400 uppercase tracking-wider backdrop-blur-md">
                            <Lock className="w-3 h-3" />
                            Coming Soon
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Active
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-medium text-white mb-3 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-light leading-relaxed flex-grow">
                        {feature.description}
                      </p>

                      <div className={`mt-8 flex items-center text-sm font-medium transition-colors ${
                        feature.status === "Active" ? "text-emerald-400 group-hover:text-emerald-300" : "text-gray-600"
                      }`}>
                        {feature.action}
                        {feature.status === "Active" && (
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* =========================================
              STATE 2: SMART FINDER WIZARD
             ========================================= */}
          {mode === "finder" && (
            <motion.div
              key="finder"
              initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl"
            >
              <div className="mb-4">
                <button 
                  onClick={() => setMode("dashboard")}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali ke Hub
                </button>
              </div>
              <SmartFinderCapability onSwitchToConsultant={() => setMode("chat")} isFullScreen={true} />
            </motion.div>
          )}

          {/* =========================================
              STATE 3: SMART COMPARISON
             ========================================= */}
          {mode === "comparison" && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl"
            >
              <SmartComparisonCapability 
                onBack={() => setMode("dashboard")} 
                onSwitchToConsultant={() => setMode("chat")} 
              />
            </motion.div>
          )}

          {/* =========================================
              STATE 4: AI PROPERTY CONSULTANT (CHAT)
             ========================================= */}
          {mode === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl bg-[#0a0a0b]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[85vh] min-h-[600px] ring-1 ring-white/5"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/5 bg-black/40 flex items-center justify-between backdrop-blur-xl z-20 relative">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setMode("dashboard")}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0b] border border-white/10 flex items-center justify-center ring-1 ring-white/5">
                      <Cpu className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                        AI Consultant
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-white/10 text-gray-300 rounded uppercase tracking-widest">
                          SMI
                        </span>
                      </h2>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        Sistem Aktif
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Real-time Clock */}
                <div className="text-[11px] font-medium text-gray-500 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full backdrop-blur-md hidden sm:block">
                  {currentTime || "Memuat waktu..."}
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide">
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border mt-1 shadow-sm ${
                        m.role === "user"
                          ? "bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700 text-gray-300"
                          : "bg-gradient-to-b from-emerald-900/40 to-emerald-950/40 border-emerald-800/50 text-emerald-400"
                      }`}>
                        {m.role === "user" ? <User size={16} /> : <Microchip size={16} />}
                      </div>

                      <div className={`max-w-[85%] text-[15px] font-light leading-relaxed tracking-wide ${
                        m.role === "user"
                          ? "bg-[#1c1c1e] text-gray-100 px-5 py-3.5 rounded-2xl rounded-tr-sm border border-white/5 shadow-md"
                          : "text-gray-300 py-1 w-full"
                      }`}>
                        
                        {/* Display User Attachments */}
                        {m.role === "user" && m.parts?.map((p, idx) => (
                          p.inlineData && (
                            <div key={idx} className="mb-2">
                              {p.inlineData.mimeType.startsWith("image/") ? (
                                <img src={`data:${p.inlineData.mimeType};base64,${p.inlineData.data}`} alt="attachment" className="max-w-[200px] rounded-lg border border-white/10" />
                              ) : (
                                <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg border border-white/10 text-xs">
                                  <Paperclip size={14} /> Dokumen terlampir
                                </div>
                              )}
                            </div>
                          )
                        ))}

                        {m.role === "user" ? (
                          m.content
                        ) : (
                          <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-300 prose-p:my-4 prose-headings:text-white prose-headings:font-medium prose-headings:tracking-tight prose-h1:text-xl prose-h1:mb-8 prose-h2:text-lg prose-h2:text-emerald-400 prose-h2:mt-10 prose-h2:mb-6 prose-h3:text-base prose-h3:text-gray-200 prose-h3:mt-8 prose-h3:mb-4 prose-hr:border-white/10 prose-hr:my-12 prose-strong:text-white prose-strong:font-semibold prose-ul:my-6 prose-li:my-2 prose-li:marker:text-emerald-500 prose-blockquote:border-l-2 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-500/10 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:my-8 prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline">
                            {m.content ? (
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {m.content}
                              </ReactMarkdown>
                            ) : (
                              <span className="flex items-center gap-1 opacity-50 h-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse delay-75" />
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse delay-150" />
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* Action Buttons for AI Messages */}
                        {m.role === "assistant" && m.content && (
                          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5 text-gray-500">
                            <button onClick={() => handleCopy(m.content)} className="p-1.5 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-md transition-colors" title="Copy text">
                              <Copy size={14} />
                            </button>
                            <button onClick={() => handleDownload(m.content)} className="p-1.5 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-md transition-colors" title="Download Response">
                              <Download size={14} />
                            </button>
                            <div className="w-px h-4 bg-white/10 mx-1" />
                            <button onClick={(e) => handleFeedback(e, m.content, 'like')} className="p-1.5 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-md transition-colors" title="Good response">
                              <ThumbsUp size={14} />
                            </button>
                            <button onClick={(e) => handleFeedback(e, m.content, 'dislike')} className="p-1.5 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors" title="Bad response">
                              <ThumbsDown size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-b from-emerald-900/40 to-emerald-950/40 border border-emerald-800/50 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                      <Microchip size={16} className="animate-pulse" />
                    </div>
                    <div className="py-2.5 px-1 flex items-center gap-1.5">
                      <span className="text-sm font-medium text-emerald-500/70 animate-pulse">Menganalisis parameter...</span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} className="h-4" />
              </div>

              {/* Input Area */}
              <div className="p-4 md:p-6 border-t border-white/5 bg-[#0a0a0b]/80 backdrop-blur-md">
                
                {/* Pending Attachments Preview */}
                {attachments.length > 0 && (
                  <div className="flex gap-2 mb-3 max-w-3xl mx-auto overflow-x-auto">
                    {attachments.map((att, idx) => (
                      <div key={idx} className="relative group rounded-lg border border-white/10 overflow-hidden bg-black/40 flex items-center p-1.5 gap-2 pr-8 shrink-0">
                        {att.isDriveLink ? (
                          <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center"><HardDrive size={14} className="text-blue-400" /></div>
                        ) : att.mimeType.startsWith("image/") ? (
                          <img src={att.data} alt="preview" className="w-8 h-8 object-cover rounded-md" />
                        ) : (
                          <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center"><Paperclip size={14} className="text-gray-400" /></div>
                        )}
                        <span className="text-xs text-gray-300 truncate max-w-[120px]">{att.name}</span>
                        <button onClick={() => removeAttachment(idx)} className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 bg-black/50 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-full">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
                  <div className="relative group flex items-center bg-[#111113] border border-white/10 rounded-3xl p-1.5 focus-within:border-emerald-500/50 transition-all shadow-inner">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition duration-500 pointer-events-none" />
                    
                    {/* Attachment Icons */}
                    <div className="relative flex items-center gap-1 pl-2 pr-2 border-r border-white/10">
                      
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.txt,.doc,.docx" className="hidden" />
                      <input type="file" ref={imageInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                      
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors" title="Attach Document">
                        <Paperclip size={18} />
                      </button>
                      <button type="button" onClick={() => imageInputRef.current?.click()} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors" title="Upload Image">
                        <ImageIcon size={18} />
                      </button>
                      <button type="button" onClick={handleDriveClick} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors" title="Google Drive">
                        <HardDrive size={18} />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage(input);
                        }
                      }}
                      placeholder="Ketik profil atau unggah referensi..."
                      className="relative flex-grow bg-transparent pl-4 pr-12 py-3 text-[15px] text-white focus:outline-none placeholder:text-gray-600 font-light"
                      disabled={isLoading}
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={isLoading || (!input.trim() && attachments.length === 0)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 disabled:bg-[#1c1c1e] disabled:text-gray-600 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all duration-300 shadow-md z-10"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />
                      )}
                    </button>
                  </div>
                </form>
                <div className="flex items-center justify-center gap-4 mt-4 text-[11px] font-medium text-gray-600">
                  <span className="flex items-center gap-1.5"><Lock size={10} /> End-to-end encrypted</span>
                  <span className="w-1 h-1 rounded-full bg-gray-800" />
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-500/70">
                    <Cpu size={12} /> Powered by SMI
                  </span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* When in chat mode, footer is hidden for cleaner app-like feel */}
      {mode === "dashboard" && <Footer />}
    </main>
  );
}
