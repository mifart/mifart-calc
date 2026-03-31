"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export function BotLinks() {
  const channels = [
    {
      id: "open_bot_tg",
      name: "Telegram-бот",
      description: "Рассчитайте стоимость прямо в мессенджере. Актуальные новости и акции.",
      href: BRAND.telegram,
      emoji: "✈️",
      color: "bg-sky-50 ring-sky-100",
      textColor: "text-sky-700",
      buttonColor: "bg-sky-500 hover:bg-sky-600",
      external: true,
    },
    {
      id: "open_bot_max",
      name: "MAX-бот",
      description: "Общайтесь с нами в MAX. Консультации, расчёты и оформление заявок.",
      href: BRAND.max,
      emoji: "💬",
      color: "bg-violet-50 ring-violet-100",
      textColor: "text-violet-700",
      buttonColor: "bg-violet-500 hover:bg-violet-600",
      external: true,
    },
    {
      id: "open_bot_vk",
      name: "Сообщество ВКонтакте",
      description: "Примеры работ, фото стройки, отзывы клиентов и актуальные предложения.",
      href: BRAND.vk,
      emoji: "🔵",
      color: "bg-blue-50 ring-blue-100",
      textColor: "text-blue-700",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
      external: true,
    },
    {
      id: "open_miniapp",
      name: "Мини-приложение",
      description: "Точный расчёт стоимости с параметрами: длина, ширина, высота, комплектация.",
      href: "/miniapp",
      emoji: "📲",
      color: "bg-slate-50 ring-slate-100",
      textColor: "text-slate-700",
      buttonColor: "bg-slate-700 hover:bg-slate-800",
      external: false,
    },
  ];

  return (
    <section id="bots" className="bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base font-semibold leading-7 text-red-400">Удобный контакт</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Мы там, где вам удобно
          </p>
          <p className="mt-4 text-lg text-slate-400">
            Выберите удобный канал — отвечаем за 15 минут в рабочее время
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {channels.map((channel, index) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {channel.external ? (
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={channel.id}
                  className={`flex flex-col h-full rounded-2xl ${channel.color} ring-1 p-6 transition-all hover:scale-105 hover:shadow-lg`}
                >
                  <div className="text-4xl mb-4">{channel.emoji}</div>
                  <h3 className={`text-lg font-bold ${channel.textColor} mb-2`}>{channel.name}</h3>
                  <p className="text-sm text-slate-600 flex-grow mb-6">{channel.description}</p>
                  <div className={`inline-flex items-center justify-center gap-2 rounded-lg ${channel.buttonColor} px-4 py-2 text-sm font-bold text-white transition-colors`}>
                    Открыть →
                  </div>
                </a>
              ) : (
                <Link
                  href={channel.href}
                  id={channel.id}
                  className={`flex flex-col h-full rounded-2xl ${channel.color} ring-1 p-6 transition-all hover:scale-105 hover:shadow-lg`}
                >
                  <div className="text-4xl mb-4">{channel.emoji}</div>
                  <h3 className={`text-lg font-bold ${channel.textColor} mb-2`}>{channel.name}</h3>
                  <p className="text-sm text-slate-600 flex-grow mb-6">{channel.description}</p>
                  <div className={`inline-flex items-center justify-center gap-2 rounded-lg ${channel.buttonColor} px-4 py-2 text-sm font-bold text-white transition-colors`}>
                    Открыть →
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Телефон */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-slate-400 text-sm mb-3">Или просто позвоните нам</p>
          <a
            href={`tel:${BRAND.phoneRaw}`}
            className="text-3xl font-extrabold text-white hover:text-red-400 transition-colors"
          >
            {BRAND.phone}
          </a>
          <p className="text-slate-500 text-sm mt-2">Пн–Сб с 9:00 до 19:00</p>
        </motion.div>
      </div>
    </section>
  );
}
