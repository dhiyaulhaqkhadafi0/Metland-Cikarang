"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { extractUTMAndDeviceInfo, saveTrackingData } from "@/lib/tracking/utmTracker";

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
