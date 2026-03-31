// ============================================================
// Telegram интеграция — отправка уведомлений о лидах
// ============================================================

import type { LeadData } from "@/types/lead";
import { formatPrice } from "@/lib/constants";

/**
 * Форматирует лид в красивое HTML-сообщение для Telegram
 */
function formatLeadMessage(lead: LeadData): string {
  const sourceEmoji: Record<string, string> = {
    website: "🌐 Сайт",
    telegram: "✈️ Telegram-бот",
    max: "💬 MAX-бот",
    vk: "🔵 VK-бот",
    miniapp: "📲 Мини-приложение",
  };

  const source = sourceEmoji[lead.source_platform] || lead.source_platform;

  const lines: string[] = [
    "🔔 <b>НОВАЯ ЗАЯВКА — МИФАРТ!</b>",
    "",
    `👤 <b>Имя:</b> ${lead.user_name}`,
    `📞 <b>Телефон:</b> <a href="tel:${lead.phone.replace(/\D/g, "")}">${lead.phone}</a>`,
  ];

  if (lead.service_type) {
    const serviceNames: Record<string, string> = {
      house: "🏠 Каркасный дом",
      bath: "🛁 Баня / Сауна",
      gazebo: "🌳 Беседка",
      custom: "📐 Индивидуальный проект",
    };
    lines.push(`🏗 <b>Тип объекта:</b> ${serviceNames[lead.service_type] || lead.service_type}`);
  }

  if (lead.dimensions) {
    lines.push(`📏 <b>Размер / Площадь:</b> ${lead.dimensions}`);
  }

  if (lead.region || lead.city) {
    lines.push(`📍 <b>Регион:</b> ${lead.city || ""} ${lead.region || ""}`.trim());
  }

  if (lead.budget) {
    lines.push(`💰 <b>Бюджет:</b> ${lead.budget}`);
  }

  if (lead.comment) {
    lines.push(`💬 <b>Комментарий:</b> ${lead.comment}`);
  }

  lines.push("");
  lines.push(`🔗 <b>Источник:</b> ${source}`);

  if (lead.source_page) {
    lines.push(`📄 <b>Страница:</b> ${lead.source_page}`);
  }

  if (lead.utm_source || lead.utm_medium || lead.utm_campaign) {
    const utmParts = [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean);
    lines.push(`📊 <b>UTM:</b> ${utmParts.join(" / ")}`);
  }

  lines.push("");
  lines.push(`⏰ ${new Date(lead.created_at).toLocaleString("ru-RU", { timeZone: "Asia/Yekaterinburg" })}`);
  lines.push("");
  lines.push("#лид #заявка");

  return lines.join("\n");
}

/**
 * Отправляет уведомление о лиде в Telegram
 */
export async function sendLeadToTelegram(lead: LeadData): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[Telegram] Не настроены TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID");
    return false;
  }

  const text = formatLeadMessage(lead);

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("[Telegram] API error:", err);
      return false;
    }

    console.log("[Telegram] Уведомление отправлено успешно");
    return true;
  } catch (error) {
    console.error("[Telegram] Ошибка сети:", error);
    return false;
  }
}
