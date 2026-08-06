export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const pageView = () => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "PageView");
  }
};

export const trackEvent = (name: string, options = {}) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", name, options);
  }
};
