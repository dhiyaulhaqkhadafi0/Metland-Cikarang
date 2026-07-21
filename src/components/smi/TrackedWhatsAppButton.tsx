"use client";

import React, { useRef } from 'react';
import { getTrackingData } from '@/lib/tracking/utmTracker';
import { saveLeadAction } from '@/app/actions/lead.actions';

interface TrackedWhatsAppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  phoneNumber: string; // Format: '6281234567890'
  message?: string;
  clusterName?: string;
  children: React.ReactNode;
}

export function TrackedWhatsAppButton({
  phoneNumber,
  message = 'Halo Metland, saya tertarik dan ingin mendapat informasi lebih lanjut.',
  clusterName = 'General',
  children,
  onClick,
  ...props
}: TrackedWhatsAppButtonProps) {
  const isProcessingRef = useRef(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Jalankan fungsi onClick bawaan jika ada
    if (onClick) onClick(e);

    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    try {
      // 1. Ambil data analitik dari memori browser
      const trackingData = getTrackingData() || {};

      // 2. Simpan secara sinkron ke Supabase via Server Action (Tunggu hingga selesai)
      // Ini wajib di-await agar browser tidak membatalkan request (cancel fetch) saat berpindah ke app WhatsApp
      const result = await saveLeadAction(trackingData, { interest_cluster: clusterName });
      
      if (result && !result.success) {
        alert("DEBUG INFO - Gagal simpan ke DB: " + JSON.stringify(result.error));
      }

    } catch (error) {
      console.error("Error saat menyimpan tracking:", error);
    } finally {
      // 3. Langsung Redirect ke WhatsApp setelah data dipastikan terkirim
      const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
      
      // Reset ref setelah jeda singkat
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 1500);
    }
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
