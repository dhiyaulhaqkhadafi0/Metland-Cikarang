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

      // 2. Simpan secara asinkron ke Supabase via Server Action
      // (Kita tidak melakukan 'await' secara ketat agar redirect WA instan dan tidak memblokir user UX jika koneksi lambat)
      saveLeadAction(trackingData, { interest_cluster: clusterName }).catch(err => {
        console.error("Gagal merekam lead di background:", err);
      });

    } catch (error) {
      console.error("Error saat membaca tracking:", error);
    } finally {
      // 3. Langsung Redirect ke WhatsApp seketika
      const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
      
      // Reset ref setelah jeda singkat
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 2000);
    }
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
