// ============================================================
// Типы для свайного калькулятора МИФАРТ
// ============================================================

import type { LOAD_PRESETS } from "@/lib/pile-calculator";

export type PilePreset = keyof typeof LOAD_PRESETS;

export type PileDiameter = 76 | 89 | 108;

export interface PileInputs {
  length_mm: number;
  width_mm: number;
  preset: PilePreset;
  customLoad?: number;
  hasStove: boolean;
  hasAttic: boolean;
  highSnow: boolean;
}

export interface PileContactForm {
  name: string;
  phone: string;
  comment?: string;
}

export interface PileGridResult {
  // Нагрузка
  area_m2: number;
  load_per_m2: number;
  factor: number;
  total_load_kg: number;

  // Сетка
  count_x: number;
  count_y: number;
  step_x_mm: number;
  step_y_mm: number;
  pile_count: number;

  // Диаметр и цена
  diameter: PileDiameter;
  price_per_pile: number;
  total_price: number;

  // Предупреждения
  warnings: string[];
}

// Для CRM / Bitrix24 / n8n
export interface PileLeadData {
  service_type: "svai";
  object_type: string;
  length_mm: number;
  width_mm: number;
  area_m2: number;
  load_per_m2: number;
  total_load_kg: number;
  recommended_pile_diameter: number;
  pile_count: number;
  step_x_mm: number;
  step_y_mm: number;
  estimated_price: number;
  comment?: string;
  phone: string;
  user_name: string;
  source_platform: string;
  source_page: string;
}
