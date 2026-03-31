// ============================================================
// n8n интеграция — передача лидов в автоматизацию
// ============================================================

import type { LeadData } from "@/types/lead";

/**
 * Отправляет лид на n8n webhook
 * n8n получает весь объект лида и может маршрутизировать дальше
 */
export async function sendToN8N(lead: LeadData): Promise<boolean> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("[n8n] Не настроен N8N_WEBHOOK_URL — пропуск");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Source": "mifart-website",
      },
      body: JSON.stringify({
        ...lead,
        meta: {
          version: "1.0",
          site: "mifart.ru",
          timestamp: lead.created_at,
        },
      }),
    });

    if (!response.ok) {
      console.error("[n8n] HTTP error:", response.status);
      return false;
    }

    console.log("[n8n] Webhook отправлен успешно");
    return true;
  } catch (error) {
    console.error("[n8n] Ошибка сети:", error);
    return false;
  }
}
