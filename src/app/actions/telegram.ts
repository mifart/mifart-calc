"use server";

// ============================================================
// Server Action: отправка лида напрямую из компонентов
// ============================================================

import { submitLead } from "@/lib/leads/submit";
import type { LeadData } from "@/types/lead";

export async function sendLeadToTelegram(data: {
  name: string;
  phone: string;
  type?: string;
  area?: number;
  price?: number;
  source?: string;
  comment?: string;
}) {
  const lead: LeadData = {
    source_platform: "website",
    source_page: data.source || "Главная / Калькулятор",
    user_name: data.name,
    phone: data.phone,
    service_type: data.type,
    dimensions: data.area ? `${data.area} м²` : undefined,
    comment: data.price
      ? `Расчётная стоимость: ${new Intl.NumberFormat("ru-RU").format(data.price)} ₽${data.comment ? `\n${data.comment}` : ""}`
      : data.comment,
    created_at: new Date().toISOString(),
  };

  return submitLead(lead);
}
