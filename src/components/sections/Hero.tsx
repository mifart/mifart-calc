"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const stats = [
  { value: "200+", label: "построенных объектов" },
  { value: "8 лет", label: "на рынке Урала" },
  { value: "100%", label: "объектов сданы в срок" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white">
      {/* Фоновый декоративный элемент */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-[600px] w-[600px] rounded-full bg-red-50 opacity-60 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-[400px] w-[400px] rounded-full bg-slate-100 opacity-80 blur-3xl" />
      </div>

      <motion.div
        className="z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Бейдж */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-700 ring-1 ring-red-100">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Челябинск и вся Россия
          </span>
        </motion.div>

        {/* Заголовок */}
        <motion.h1
          className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
          variants={itemVariants}
        >
          Каркасные дома,
          <br />
          <span className="text-red-600">бани и беседки</span>
          <br />
          под ключ
        </motion.h1>

        {/* Подзаголовок */}
        <motion.p
          className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl"
          variants={itemVariants}
        >
          {BRAND.subTagline}
        </motion.p>

        {/* Кнопки */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          variants={itemVariants}
        >
          <Link
            href="/#calculator"
            id="hero-cta-primary"
            className="rounded-lg bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-700 hover:shadow-red-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Рассчитать стоимость
          </Link>
          <Link
            href="/#portfolio"
            id="hero-cta-secondary"
            className="rounded-lg bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-sm ring-1 ring-slate-200 transition-all hover:ring-slate-300 hover:-translate-y-0.5"
          >
            Смотреть работы →
          </Link>
        </motion.div>

        {/* Вторичные ссылки */}
        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-3 text-sm"
          variants={itemVariants}
        >
          <a
            href={BRAND.telegram}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-open-telegram"
            className="flex items-center gap-2 rounded-md bg-sky-50 px-4 py-2 font-semibold text-sky-700 ring-1 ring-sky-100 transition hover:bg-sky-100"
          >
            ✈️ Telegram-бот
          </a>
          <a
            href={BRAND.max}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-open-max"
            className="flex items-center gap-2 rounded-md bg-violet-50 px-4 py-2 font-semibold text-violet-700 ring-1 ring-violet-100 transition hover:bg-violet-100"
          >
            💬 MAX-бот
          </a>
          <Link
            href="/miniapp"
            id="hero-open-miniapp"
            className="flex items-center gap-2 rounded-md bg-slate-50 px-4 py-2 font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
          >
            📲 Мини-приложение
          </Link>
        </motion.div>

        {/* Статистика */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-100 pt-8 text-center"
          variants={itemVariants}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-extrabold text-red-600 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Вертикальный скролл-хинт */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-1 text-slate-400"
        >
          <span className="text-xs">Листайте вниз</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
