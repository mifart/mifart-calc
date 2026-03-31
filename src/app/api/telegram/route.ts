import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ТОКЕНЫ И ID (сначала берем из переменных окружения Vercel, потом из дефолтов)
    const token = process.env.TELEGRAM_BOT_TOKEN || "8718455250:AAHcMiIx3m1-ZRbQEuHgK1Knoito5lDKPHg";
    const chatId = process.env.TELEGRAM_CHAT_ID || "1298647947";
    
    const MAX_TOKEN = process.env.MAX_TOKEN || "f9LHodD0cOLVM3Z3_odT6Acw0seh44lOKLM8AAiqzMJ4sbQxmwG7SSJIK6wEiDPhq-LVTsq9DjoaKN9o5oZG";
    const USER_ID = process.env.MAX_USER_ID || "7460059486";

    // Ссылки для быстрого перехода менеджера
    const maxBotLink = `https://max.ru/id${USER_ID}_bot`;
    const vkLink = "https://vk.com/mif174";
    const tgLink = `https://t.me/+79953800888`; 

    const text = `
🔥 <b>НОВАЯ ЗАЯВКА MIFART</b>

👤 <b>Имя:</b> ${body.name || "Гость"}
📞 <b>Телефон:</b> ${body.phone || "не указан"}
📌 <b>Услуга:</b> ${body.service || "не указано"}
📏 <b>Размеры:</b> ${body.size || "-"}
💰 <b>Цена:</b> ${body.price || "-"}
📍 <b>Комментарий:</b> ${body.comment || "-"}
📎 <b>Вложение:</b> ${body.fileName || "Нет файла"}

🚀 <b>Связаться:</b>
💬 <a href="${maxBotLink}">Написать в MAX</a>
✈️ <a href="${tgLink}">Написать в Telegram</a>
🌐 <a href="${vkLink}">Открыть VK</a>
`;

    // 1. ОТПРАВЛЯЕМ В TELEGRAM
    if (token && chatId) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true
        }),
      });
    }

    // 2. ОТПРАВЛЯЕМ В MAX (дубликат)
    if (MAX_TOKEN && USER_ID) {
        await fetch(`https://platform-api.max.ru/messages?user_id=${USER_ID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": MAX_TOKEN
          },
          body: JSON.stringify({
            text: text, 
            format: "html"
          })
        });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Lead submission error:", e);
    return NextResponse.json({ error: true });
  }
}
