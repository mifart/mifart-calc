// ============================================================
// Bitrix24 интеграция — создание лидов через REST API
// ============================================================

import type { LeadData } from "@/types/lead";

const SERVICE_NAME_MAP: Record<string, string> = {
  house: "Каркасный дом",
  bath: "Баня / Сауна",
  gazebo: "Беседка",
  custom: "Индивидуальный проект",
};

const SOURCE_NAME_MAP: Record<string, string> = {
  website: "Сайт mifart.ru",
  telegram: "Telegram-бот",
  max: "MAX-бот",
  vk: "VK-бот",
  miniapp: "Мини-приложение",
};

/**
 * Создаёт лид в Bitrix24 через входящий вебхук
 * Документация: https://dev.1c-bitrix.ru/rest_help/crm/leads/crm_lead_add.php
 */
export async function createBitrix24Lead(lead: LeadData): Promise<boolean> {
  const webhookUrl = process.env.BITRIX24_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("[Bitrix24] Не настроен BITRIX24_WEBHOOK_URL — пропуск");
    return false;
  }

  const sourceName = SOURCE_NAME_MAP[lead.source_platform] || lead.source_platform;
  const serviceName = lead.service_type
    ? SERVICE_NAME_MAP[lead.service_type] || lead.service_type
    : "";

  const utmComment = [
    lead.utm_source && `UTM Source: ${lead.utm_source}`,
    lead.utm_medium && `UTM Medium: ${lead.utm_medium}`,
    lead.utm_campaign && `UTM Campaign: ${lead.utm_campaign}`,
    lead.utm_content && `UTM Content: ${lead.utm_content}`,
    lead.utm_term && `UTM Term: ${lead.utm_term}`,
  ]
    .filter(Boolean)
    .join("\n");

  const commentParts = [
    serviceName && `Услуга: ${serviceName}`,
    lead.dimensions && `Размер: ${lead.dimensions}`,
    lead.region && `Регион: ${lead.region}`,
    lead.budget && `Бюджет: ${lead.budget}`,
    lead.comment && `Комментарий: ${lead.comment}`,
    utmComment,
  ]
    .filter(Boolean)
    .join("\n");

  const payload = {
    fields: {
      TITLE: `${sourceName} — ${lead.user_name} — ${serviceName || "Заявка"}`,
      NAME: lead.user_name,
      PHONE: [{ VALUE: lead.phone, VALUE_TYPE: "WORK" }],
      SOURCE_ID: "WEB",
      SOURCE_DESCRIPTION: sourceName,
      COMMENTS: commentParts,
      STATUS_ID: "NEW",
      // UTM поля (если они настроены в Bitrix24)
      UTM_SOURCE: lead.utm_source,
      UTM_MEDIUM: lead.utm_medium,
      UTM_CAMPAIGN: lead.utm_campaign,
      UTM_CONTENT: lead.utm_content,
      UTM_TERM: lead.utm_term,
    },
  };

  try {
    const url = webhookUrl.endsWith("/")
      ? `${webhookUrl}crm.lead.add.json`
      : `${webhookUrl}/crm.lead.add.json`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      console.error("[Bitrix24] API error:", result);
      return false;
    }

    console.log("[Bitrix24] Лид создан, ID:", result.result);
    return true;
  } catch (error) {
    console.error("[Bitrix24] Ошибка сети:", error);
    return false;
  }
}
