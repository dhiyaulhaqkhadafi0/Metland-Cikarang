"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/tracking/metaPixel";

interface ViewContentTrackerProps {
  contentName: string;
  contentCategory: string;
  contentIds?: string[];
  contentType?: string;
}

export function ViewContentTracker({
  contentName,
  contentCategory,
  contentIds,
  contentType,
}: ViewContentTrackerProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (!hasFired.current) {
      trackEvent("ViewContent", {
        content_name: contentName,
        content_category: contentCategory,
        ...(contentIds && { content_ids: contentIds }),
        ...(contentType && { content_type: contentType }),
      });
      hasFired.current = true;
    }
  }, [contentName, contentCategory, contentIds, contentType]);

  return null;
}
