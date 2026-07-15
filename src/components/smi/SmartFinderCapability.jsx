"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronRight, ArrowLeft, Loader2, Home, Briefcase, TrendingUp, Users, Check, Train, GraduationCap, Leaf, Building2, LayoutTemplate, MapPin, Clock, ScanSearch, Target } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    id: "purpose",
    title: "Mari mulai dari tujuan Anda.",
    description: "SMI akan menyesuaikan rekomendasi berdasarkan apa yang ingin Anda capai.",
    type: "single",
    options: [
      { id: "first", label: "Rumah Pertama", icon: Home },
      { id: "investment", label: "Investasi", icon: TrendingUp },
      { id: "family", label: "Rumah untuk Keluarga", icon: Users },
      { id: "business", label: "Buka Usaha", icon: Briefcase },
    ]
  },
  {
    id: "budget",
    title: "Sekarang tentukan kisaran anggaran Anda.",
    description: "Ini membantu kami menemukan pilihan yang paling nyaman secara finansial.",
    type: "single",
    options: [
      { id: "low", label: "< 600 Juta", icon: DollarSign },
      { id: "mid1", label: "600 - 800 Juta", icon: DollarSign },
      { id: "mid2", label: "800 Juta - 1 Miliar", icon: DollarSign },
      { id: "high", label: "> 1 Miliar", icon: DollarSign },
    ]
  },
  {
    id: "priority",
    title: "Apa yang paling Anda prioritaskan?",
    description: "Pilih maksimal 2 faktor terpenting bagi Anda.",
    type: "multiple",
    max: 2,
    options: [
      { id: "stasiun", label: "Dekat Stasiun", icon: Train },
      { id: "sekolah", label: "Dekat Sekolah", icon: GraduationCap },
      { id: "tenang", label: "Lingkungan Tenang", icon: Leaf },
      { id: "potensi", label: "Potensi Investasi", icon: TrendingUp },
      { id: "cbd", label: "Dekat CBD", icon: Building2 },
      { id: "modern", label: "Rumah Modern", icon: LayoutTemplate },
    ]
  },
  {
    id: "timeline",
    title: "Kapan Anda berencana membeli?",
    description: "SMI akan merekomendasikan unit siap huni atau indent yang sesuai.",
    type: "single",
    options: [
      { id: "now", label: "Bulan Ini", icon: Clock },
      { id: "3m", label: "3 Bulan", icon: Clock },
      { id: "6m", label: "6 Bulan", icon: Clock },
      { id: "survey", label: "Masih Survey", icon: MapPin },
    ]
  }
];

// Helper icon wrapper since lucide icons inside array mapping can sometimes lose context
const IconWrapper = ({ Icon, className }) => {
  if (!Icon) return null;
  return <Icon className={className} />;
};

function DollarSign(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export default function SmartFinderCapability({ onSwitchToConsultant, isFullScreen = false }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({ priority: [] });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (optionId) => {
    const stepData = steps[currentStep];
    
    if (stepData.type === "single") {
      setAnswers(prev => ({ ...prev, [stepData.id]: optionId }));
      handleNext();
    } else if (stepData.type === "multiple") {
      setAnswers(prev => {
        const currentSelected = prev[stepData.id] || [];
        if (currentSelected.includes(optionId)) {
          return { ...prev, [stepData.id]: currentSelected.filter(id => id !== optionId) };
        }
        if (currentSelected.length < stepData.max) {
          return { ...prev, [stepData.id]: [...currentSelected, optionId] };
        }
        return prev;
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      startAnalysis();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    // Fake AI Thinking delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2500);
  };

  const renderProgress = () => {
    if (showResult || isAnalyzing) return null;
    
    return (
      <div className="mb-10 w-full max-w-xl mx-auto">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
          <span>Progress</span>
          <span className="text-emerald-400">Step {currentStep + 1} / {steps.length}</span>
        </div>
        <div className="flex gap-2 w-full h-1.5">
          {steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`flex-1 rounded-full transition-all duration-500 ${
                idx === currentStep ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                : idx < currentStep ? 'bg-emerald-500/40' : 'bg-white/5'
              }`} 
            />
          ))}
        </div>
      </div>
    );
  };

  // Determine dynamic mock results based on input
  // (In reality, this would connect to a DB. For now we use Brassia / Derora as requested)
  const getResults = () => {
    const isBudgetLow = answers.budget === 'low';
    const primaryTitle = isBudgetLow ? "Myzora" : "Brassia"; // Using exact name for routing
    const primaryScore = "95%";
    const secondaryTitle = isBudgetLow ? "Avesa" : "Derora"; // Using exact name for routing
    const secondaryScore = "89%";
    
    const reasons = [
      "Budget sangat sesuai dengan kriteria yang dipilih",
      answers.priority?.includes("stasiun") ? "Jarak tempuh hanya 5 menit ke Stasiun KRL" : "Konsep hunian premium dan asri",
      answers.purpose === "family" ? "Fasilitas sangat lengkap untuk keluarga" : "Kenaikan nilai investasi 10-15% per tahun"
    ];

    return { primaryTitle, primaryScore, secondaryTitle, secondaryScore, reasons };
  };

  const results = getResults();

  return (
    <div className={`w-full ${isFullScreen ? 'min-h-[70vh] flex flex-col justify-center' : 'max-w-4xl mx-auto'}`}>
      
      {/* UI Wizard Container */}
      <div className="relative z-10 bg-[#0a0a0b]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden p-6 md:p-10 ring-1 ring-white/5 min-h-[500px] flex flex-col justify-center">
        
        {/* Glow Effects within modal */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

        {renderProgress()}

        <AnimatePresence mode="wait">
          
          {/* STATE 1: Analyzing */}
          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center space-y-6 h-full py-20 group"
            >
              <div className="relative w-32 h-32 flex items-center justify-center transform transition-transform duration-700 hover:scale-110">
                <div className="absolute inset-0 border-[3px] border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                <div className="absolute inset-4 border-[2px] border-blue-500/20 border-b-blue-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
                <div className="absolute inset-0 bg-emerald-500/5 rounded-full animate-pulse" />
                <ScanSearch className="w-12 h-12 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-2">SMI Sedang Menganalisis...</h3>
                <p className="text-gray-400 text-sm font-light">Mencocokkan kebutuhan Anda dengan seluruh pilihan properti.</p>
              </div>
            </motion.div>
          )}

          {/* STATE 2: Questions Wizard */}
          {!isAnalyzing && !showResult && (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="mb-10 text-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-3">
                  {steps[currentStep].title}
                </h2>
                <p className="text-gray-400 font-light">
                  {steps[currentStep].description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {steps[currentStep].options.map((option) => {
                  const isSelected = steps[currentStep].type === "single" 
                    ? answers[steps[currentStep].id] === option.id
                    : (answers[steps[currentStep].id] || []).includes(option.id);

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      className={`group relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isSelected 
                          ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                          : "bg-[#111113] border-white/5 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      {/* Active Background Glow */}
                      {isSelected && <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none" />}
                      
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors relative z-10 ${
                        isSelected ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-black/50 border-white/10 text-gray-400 group-hover:text-gray-200"
                      }`}>
                        <IconWrapper Icon={option.icon} className="w-5 h-5" />
                      </div>
                      
                      <span className={`font-medium text-left transition-colors relative z-10 ${
                        isSelected ? "text-emerald-300" : "text-gray-300 group-hover:text-white"
                      }`}>
                        {option.label}
                      </span>
                      
                      {isSelected && (
                        <Check className="w-5 h-5 text-emerald-400 absolute right-5 z-10" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Bar for Wizard */}
              <div className="flex items-center justify-between mt-12">
                <button 
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-white transition-colors disabled:opacity-0"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali
                </button>
                
                {steps[currentStep].type === "multiple" && (
                  <button 
                    onClick={handleNext}
                    disabled={(answers[steps[currentStep].id] || []).length === 0}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-all disabled:opacity-50 disabled:hover:bg-white"
                  >
                    Selanjutnya <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* STATE 3: Results */}
          {showResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group cursor-default transition-all hover:bg-emerald-500/20 hover:scale-110">
                  <Target className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white tracking-tight">Hasil Pencarian</h2>
                  <p className="text-emerald-400 text-sm font-medium uppercase tracking-widest mt-1">SMI Recommendation Engine</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                
                {/* Primary Result */}
                <div className="md:col-span-3 bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0b] border border-emerald-500/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.05)]">
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-emerald-500 text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      🥇 Paling Cocok
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-2 pr-20">{results.primaryTitle}</h3>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-4xl font-light text-emerald-400">{results.primaryScore}</span>
                    <span className="text-gray-500 text-sm leading-tight">Tingkat<br/>Kecocokan</span>
                  </div>
                  
                  <div className="space-y-4 mb-10">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Kenapa memilih ini?</p>
                    {results.reasons.map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-emerald-400" />
                        </div>
                        <p className="text-gray-300 font-light">{reason}</p>
                      </div>
                    ))}
                  </div>

                  <Link href={`/clusters/${results.primaryTitle.toLowerCase().replace(' ', '-')}`} className="block w-full py-4 text-center rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                    Lihat Detail
                  </Link>
                </div>

                {/* Secondary Result & CTA */}
                <div className="md:col-span-2 flex flex-col gap-6">
                  
                  {/* Alternative */}
                  <div className="bg-[#111113] border border-white/5 rounded-3xl p-6 flex-1 flex flex-col justify-center">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">🥈 Alternatif Premium</div>
                    <h3 className="text-xl font-semibold text-white mb-1">{results.secondaryTitle}</h3>
                    <div className="text-emerald-500/70 text-2xl font-light mb-6">{results.secondaryScore}</div>
                    <Link href={`/clusters/${results.secondaryTitle.toLowerCase().replace(' ', '-')}`} className="inline-block text-sm text-center text-white border border-white/20 px-5 py-2 rounded-lg hover:bg-white/10 transition-colors">
                      Lihat Detail
                    </Link>
                  </div>

                  {/* Escalate to AI */}
                  <div className="bg-gradient-to-br from-emerald-900/20 to-blue-900/20 border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden flex-1 flex flex-col justify-end">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px] pointer-events-none -mr-10 -mt-10" />
                    
                    <h4 className="text-lg font-medium text-white mb-2">Masih Ragu?</h4>
                    <p className="text-sm text-gray-400 font-light mb-6">Diskusikan lebih dalam hasil ini bersama AI Consultant kami.</p>
                    
                    {onSwitchToConsultant ? (
                      <button 
                        onClick={onSwitchToConsultant}
                        className="w-full py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-2"
                      >
                        ✨ Konsultasi dengan SMI
                      </button>
                    ) : (
                      <Link 
                        href="/smi"
                        className="w-full py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-2"
                      >
                        ✨ Konsultasi dengan SMI
                      </Link>
                    )}
                  </div>

                </div>
              </div>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => {
                    setShowResult(false);
                    setCurrentStep(0);
                    setAnswers({ priority: [] });
                  }}
                  className="text-sm text-gray-500 hover:text-white transition-colors underline underline-offset-4"
                >
                  Ulangi Pencarian
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
