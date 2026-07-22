import React from 'react';
import CopywriterClient from './components/CopywriterClient';

export const metadata = {
  title: 'AI Copywriter Studio | SMI Agent',
  description: 'AI Copywriting Studio khusus untuk Sales Metland Cikarang'
};

export default function AICopywriterPage() {
  return (
    <div className="min-h-screen bg-[#070A0E] text-slate-200">
      <CopywriterClient />
    </div>
  );
}
