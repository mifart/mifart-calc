// ============================================================
// POST /api/leads — единый endpoint приёма заявок
// Принимает лиды от сайта, ботов и мини-приложения
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { submitLead } from "@/lib/leads/submit";
import type { LeadData } from "@/types/lead";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Базовая валидация
    if (!body.user_name || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Не указано имя или телефон" },
        { status: 400 }
      );
    }

    if (!body.source_platform) {
      body.source_platform = "website";
    }

    const lead: LeadData = {
      ...body,
      created_at: new Date().toISOString(),
    };

    const result = await submitLead(lead);

    if (!result.success) {
      // Логируем, но всё равно отвечаем 200, чтобы пользователь видел успех
      // (лид сохранён в логах сервера)
      console.error("[/api/leads] Все интеграции завершились с ошибкой", result);
    }

    return NextResponse.json({ success: true, details: result.details });
  } catch (error) {
    console.error("[/api/leads] Неожиданная ошибка:", error);
    return NextResponse.json(
      { success: false, error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}

// GET /api/leads/health
export async function GET() {
  return NextResponse.json({ status: "ok", service: "mifart-leads" });
}
