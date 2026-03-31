// ============================================================
// Типы для единой структуры заявки МИФАРТ
// ============================================================

import type { LeadSource, ServiceId } from "@/lib/constants";

export interface LeadData {
  // Источник
  source_platform: LeadSource;
  source_page?: string;

  // Контакты
  user_name: string;
  phone: string;

  // Параметры объекта
  service_type?: ServiceId | string;
  object_type?: string;
  dimensions?: string; // например: "6x8" или "80 м²"
  city?: string;
  region?: string;
  budget?: string;
  comment?: string;

  // UTM метки
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;

  // Метаданные
  created_at: string; // ISO 8601
}

export interface LeadSubmitResult {
  success: boolean;
  error?: string;
  details?: {
    telegram?: boolean;
    bitrix24?: boolean;
    n8n?: boolean;
  };
}

// Для форм на сайте (без технических полей)
export type LeadFormData = Pick<
  LeadData,
  | "user_name"
  | "phone"
  | "service_type"
  | "object_type"
  | "dimensions"
  | "region"
  | "budget"
  | "comment"
>;
