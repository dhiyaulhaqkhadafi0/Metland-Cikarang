"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, ShieldCheck, TrendingUp, Cpu } from "lucide-react";
import FinancialScreening from "./steps/FinancialScreening";
import DeepAnalysis from "./steps/DeepAnalysis";
import StrategicRecommendation from "./steps/StrategicRecommendation";
import DigitalProfile from "./steps/DigitalProfile";

export default function SmartKPRAdvisor() {
  // Step Management: 0=Intro, 1=Screening, 2=DeepAnalysis, 3=Recommendation, 4=DigitalProfile
  const [currentStep, setCurrentStep] = useState(0);

  // Shared Application State
  const [formData, setFormData] = useState({
    profile: { name: "", age: 30, maritalStatus: "Menikah", children: 1 },
    employment: "Karyawan",
    income: { main: 15000000, joint: 0, extra: 0 },
    property: { product: "Myzora", isCustom: false, price: 1200000000, dp: 2.5 },
    cashflow: { transport: 2000000, kids: 3000000, insurance: 1000000, investment: 2000000, otherDebt: 2000000 },
    future: { emergencyFund: 50000000, savings: 30000000, assets: 100000000 },
    risk: "Aman"
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));
  const updateData = (section, data) => setFormData(prev => ({ ...prev, [section]: data }));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      
      {/* Intro Step */}
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full mb-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <Cpu className="w-12 h-12 text-emerald-400" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              SMI <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Smart KPR Advisor</span>
            </h1>
            <p className="text-xl text-emerald-400 font-semibold mb-8 uppercase tracking-widest">
              AI Financial Decision Engine
            </p>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
              Bukan sekadar menghitung cicilan. SMI menganalisis kondisi finansial Anda untuk membantu memilih skema KPR yang paling sehat dan realistis. Kami mengerti bahwa membeli rumah adalah salah satu keputusan terbesar dalam hidup Anda.
            </p>
            
            <div className="flex justify-center gap-6 mb-16 text-left">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 w-64">
                <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-white font-bold mb-2">100% Personal</h3>
                <p className="text-gray-400 text-sm">Rekomendasi disesuaikan khusus dengan profil Anda.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 w-64">
                <TrendingUp className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-white font-bold mb-2">Risk Mitigation</h3>
                <p className="text-gray-400 text-sm">Menjaga kesehatan cash flow Anda di masa depan.</p>
              </div>
            </div>

            <button 
              onClick={nextStep}
              className="px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-lg font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center gap-3 mx-auto"
            >
              <BrainCircuit className="w-6 h-6 text-yellow-300" />
              Mulai Konsultasi AI
            </button>
          </motion.div>
        )}

        {/* Wizard Steps */}
        {currentStep > 0 && (
          <motion.div
            key="wizard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-10"
          >
            {/* SMI Signature Progress Header */}
            <div className="mb-12 bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <ProgressItem step={1} current={currentStep} label="Financial Screening" />
                <ProgressItem step={2} current={currentStep} label="Deep Financial Analysis" />
                <ProgressItem step={3} current={currentStep} label="Strategic Recommendation" />
                <ProgressItem step={4} current={currentStep} label="Digital Profile" />
              </div>
            </div>

            {currentStep === 1 && <FinancialScreening data={formData} updateData={updateData} onNext={nextStep} />}
            {currentStep === 2 && <DeepAnalysis data={formData} updateData={updateData} onNext={nextStep} onPrev={prevStep} />}
            {currentStep === 3 && <StrategicRecommendation data={formData} onNext={nextStep} />}
            {currentStep === 4 && <DigitalProfile data={formData} onRestart={() => setCurrentStep(0)} />}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Subcomponent for Progress Header
function ProgressItem({ step, current, label }) {
  const isCompleted = current > step;
  const isActive = current === step;
  
  return (
    <div className={`flex items-center gap-3 ${isActive ? 'opacity-100' : isCompleted ? 'opacity-60' : 'opacity-30'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
        isActive ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 
        isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 
        'bg-transparent border-gray-600 text-gray-500'
      }`}>
        {isCompleted ? "✓" : `0${step}`}
      </div>
      <div>
        <p className={`text-xs uppercase tracking-wider font-bold ${isActive ? 'text-emerald-400' : 'text-gray-400'}`}>STEP {step}</p>
        <p className="text-sm font-semibold text-white">{label}</p>
      </div>
    </div>
  );
}
