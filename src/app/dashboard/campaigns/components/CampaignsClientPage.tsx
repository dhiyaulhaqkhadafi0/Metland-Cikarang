"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import CampaignGenerator from './CampaignGenerator';
import CampaignTable from './CampaignTable';

export default function CampaignsClientPage({ campaigns }: { campaigns: any[] }) {
  const router = useRouter();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Campaign Links (Shortlink)</h1>
        <p className="text-slate-400 mt-1">Buat, salin, dan pantau tautan pelacakan untuk mengukur efektivitas kampanye iklan Anda.</p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Area Formulir */}
        <div className="w-full">
          <CampaignGenerator onGenerated={() => router.refresh()} />
        </div>
        
        {/* Area Tabel Metrik */}
        <div className="w-full space-y-4">
          <h2 className="text-xl font-bold text-white">Performa Tautan Aktif</h2>
          <CampaignTable campaigns={campaigns} />
        </div>
      </div>
    </div>
  );
}
