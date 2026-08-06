"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { extractUTMAndDeviceInfo, saveTrackingData } from "@/lib/tracking/utmTracker";
import { trackEvent } from "@/lib/tracking/metaPixel";

function TrackingLogic() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href);
      const trackingData = extractUTMAndDeviceInfo(currentUrl);
      saveTrackingData(trackingData);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    let lastClickTime = 0;
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a') || target.closest('button');
      if (!link) return;

      const href = (link.getAttribute('href') || '').toLowerCase();
      if (href.includes('wa.me') || href.includes('api.whatsapp.com') || href.includes('whatsapp://send')) {
        const now = Date.now();
        if (now - lastClickTime > 2000) { // 2 seconds throttle
          trackEvent('Contact', { contact_method: 'WhatsApp' });
          lastClickTime = now;
        }
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  return null;
}

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <TrackingLogic />
      </Suspense>
      {children}
    </>
  );
}
