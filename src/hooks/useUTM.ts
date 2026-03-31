"use client";

// ============================================================
// Hook: читает UTM-метки из URL и сохраняет в sessionStorage
// ============================================================

import { useEffect, useState } from "react";

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const UTM_STORAGE_KEY = "mifart_utm";

export function useUTM(): UTMParams {
  const [utmParams, setUtmParams] = useState<UTMParams>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const fromUrl: UTMParams = {};

    const utm_source = params.get("utm_source");
    const utm_medium = params.get("utm_medium");
    const utm_campaign = params.get("utm_campaign");
    const utm_content = params.get("utm_content");
    const utm_term = params.get("utm_term");

    if (utm_source) fromUrl.utm_source = utm_source;
    if (utm_medium) fromUrl.utm_medium = utm_medium;
    if (utm_campaign) fromUrl.utm_campaign = utm_campaign;
    if (utm_content) fromUrl.utm_content = utm_content;
    if (utm_term) fromUrl.utm_term = utm_term;

    if (Object.keys(fromUrl).length > 0) {
      // Новые UTM из URL — сохраняем
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
      setUtmParams(fromUrl);
    } else {
      // Берём из sessionStorage если есть
      const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
      if (stored) {
        try {
          setUtmParams(JSON.parse(stored));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  return utmParams;
}
