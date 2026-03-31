// ============================================================
// Единый модуль приёма и отправки лидов
// ============================================================

import type { LeadData, LeadSubmitResult } from "@/types/lead";
import { sendLeadToTelegram } from "@/lib/integrations/telegram";
import { createBitrix24Lead } from "@/lib/integrations/bitrix24";
import { sendToN8N } from "@/lib/integrations/n8n";

/**
 * Принимает лид и параллельно отправляет во все настроенные интеграции
 */
export async function submitLead(lead: LeadData): Promise<LeadSubmitResult> {
  // Логируем все лиды
  console.log("[Lead] Новая заявка:", JSON.stringify(lead, null, 2));

  // Запускаем все интеграции параллельно
  const [telegramOk, bitrix24Ok, n8nOk] = await Promise.allSettled([
    sendLeadToTelegram(lead),
    createBitrix24Lead(lead),
    sendToN8N(lead),
  ]).then((results) =>
    results.map((r) => r.status === "fulfilled" && r.value === true)
  );

  const anySuccess = telegramOk || bitrix24Ok || n8nOk;

  console.log("[Lead] Результаты:", { telegram: telegramOk, bitrix24: bitrix24Ok, n8n: n8nOk });

  return {
    success: anySuccess,
    details: {
      telegram: telegramOk,
      bitrix24: bitrix24Ok,
      n8n: n8nOk,
    },
  };
}

/**
 * Читает UTM из строки запроса и возвращает объект
 */
export function parseUTMFromSearch(search: string): Partial<LeadData> {
  const params = new URLSearchParams(search);
  const result: Partial<LeadData> = {};

  const utm_source = params.get("utm_source");
  const utm_medium = params.get("utm_medium");
  const utm_campaign = params.get("utm_campaign");
  const utm_content = params.get("utm_content");
  const utm_term = params.get("utm_term");

  if (utm_source) result.utm_source = utm_source;
  if (utm_medium) result.utm_medium = utm_medium;
  if (utm_campaign) result.utm_campaign = utm_campaign;
  if (utm_content) result.utm_content = utm_content;
  if (utm_term) result.utm_term = utm_term;

  return result;
}
