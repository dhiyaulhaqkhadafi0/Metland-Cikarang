export interface TrackingData {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  ref_code: string | null;
  landing_page: string | null;
  full_url: string | null;
  referrer: string | null;
  device: string | null;
  browser: string | null;
  operating_system: string | null;
  screen_resolution: string | null;
  language: string | null;
  timezone: string | null;
  timestamp: string | null;
}

export const extractUTMAndDeviceInfo = (url: URL): TrackingData => {
  const searchParams = url.searchParams;
  
  let device = 'Desktop';
  let os = 'Unknown OS';
  let browser = 'Unknown Browser';
  
  if (typeof window !== 'undefined') {
    const ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) device = 'Mobile';
    if (/Tablet|iPad/i.test(ua)) device = 'Tablet';
    
    if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Mac/i.test(ua)) os = 'MacOS';
    else if (/Linux/i.test(ua)) os = 'Linux';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/iOS|iPhone|iPad/i.test(ua)) os = 'iOS';
    
    // Simple browser detection
    if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1 && ua.indexOf('OPR') === -1) browser = 'Chrome';
    else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) browser = 'Safari';
    else if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (ua.indexOf('Edg') > -1) browser = 'Edge';
    else if (ua.indexOf('OPR') > -1) browser = 'Opera';
  }

  return {
    utm_source: searchParams.get('utm_source') || null,
    utm_medium: searchParams.get('utm_medium') || null,
    utm_campaign: searchParams.get('utm_campaign') || null,
    utm_content: searchParams.get('utm_content') || null,
    utm_term: searchParams.get('utm_term') || null,
    ref_code: searchParams.get('ref_code') || null,
    landing_page: typeof window !== 'undefined' ? window.location.pathname : null,
    full_url: typeof window !== 'undefined' ? window.location.href : null,
    referrer: typeof document !== 'undefined' ? document.referrer : null,
    device,
    browser,
    operating_system: os,
    screen_resolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : null,
    language: typeof navigator !== 'undefined' ? navigator.language : null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString(),
  };
};

export const saveTrackingData = (data: TrackingData) => {
  if (typeof window !== 'undefined') {
    const existingStr = localStorage.getItem('smmc_tracking_data');
    let existing: Partial<TrackingData> = {};
    if (existingStr) {
      try {
        existing = JSON.parse(existingStr);
      } catch (e) {
        console.error("Failed to parse existing tracking data", e);
      }
    }
    
    // Prioritalkan UTM awal jika sudah ada (karena user mungkin berpindah halaman dan url baru tidak punya UTM)
    const merged: TrackingData = {
      ...data,
      utm_source: data.utm_source || existing.utm_source || null,
      utm_medium: data.utm_medium || existing.utm_medium || null,
      utm_campaign: data.utm_campaign || existing.utm_campaign || null,
      utm_content: data.utm_content || existing.utm_content || null,
      utm_term: data.utm_term || existing.utm_term || null,
      ref_code: data.ref_code || existing.ref_code || null,
      // Catat halaman pertama mereka masuk sebagai landing_page
      landing_page: existing.landing_page || data.landing_page || null,
      referrer: existing.referrer || data.referrer || null,
    };
    
    localStorage.setItem('smmc_tracking_data', JSON.stringify(merged));
  }
};

export const getTrackingData = (): TrackingData | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('smmc_tracking_data');
    if (data) {
      try {
        return JSON.parse(data) as TrackingData;
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

export const clearTrackingData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('smmc_tracking_data');
  }
};
