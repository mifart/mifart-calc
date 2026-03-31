import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Беседки и малые архитектурные формы под ключ",
  description:
    "Строительство беседок, навесов, веранд и малых форм под ключ в Челябинске. Цена от 20 000 ₽/м². Срок от 7 дней. Звоните: +7 (995) 380-08-88",
  openGraph: {
    title: "Беседки под ключ | МИФАРТ",
    description: "Открытые и закрытые беседки, навесы, веранды. Срок от 7 дней.",
  },
};

const projects = [
  {
    name: "Открытая 12 м²",
    emoji: "🌳",
    price: "от 240 000 ₽",
    time: "7 дней",
    desc: "Классическая открытая беседка с кровлей. Идеально для летнего отдыха.",
    features: ["Металлочерепица", "Обработка антисептиком", "Скамейки в комплекте"],
  },
  {
    name: "Закрытая 20 м²",
    emoji: "🏡",
    price: "от 400 000 ₽",
    time: "14 дней",
    desc: "Утеплённая беседка с остеклением для круглогодичного использования.",
    features: ["Двойные окна", "Дверь с замком", "Электричество"],
  },
  {
    name: "С барбекю 24 м²",
    emoji: "🔥",
    price: "от 480 000 ₽",
    time: "14–21 день",
    desc: "Просторная беседка со встроенной зоной барбекю и мангалом.",
    features: ["Мангал встроенный", "Дымоход", "Рабочая поверхность"],
  },
  {
    name: "Веранда 30 м²",
    emoji: "🪴",
    price: "от 600 000 ₽",
    time: "21 день",
    desc: "Пристроенная к дому веранда с панорамным остеклением.",
    features: ["Панорамные окна", "Тёплый пол", "Терраса"],
  },
];

export default function BesedkiPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-green-950 via-emerald-900 to-slate-900 pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
          <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-1.5 text-sm font-semibold text-green-300 ring-1 ring-green-400/30 mb-6">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Беседки и навесы
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Беседки <span className="text-green-400">под ключ</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
              Открытые и закрытые беседки, навесы и веранды. Строим за 7–21 день.
              Дерево, металл, поликарбонат — на ваш выбор.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#calculator" id="besedki-cta-primary" className="rounded-lg bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-red-500 transition-all hover:-translate-y-0.5">
                Рассчитать стоимость
              </Link>
              <a href={`tel:${BRAND.phoneRaw}`} id="besedki-cta-call" className="rounded-lg bg-white/10 px-8 py-4 text-base font-bold text-white ring-1 ring-white/20 hover:bg-white/20 transition-all">
                📞 {BRAND.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-green-700 py-10">
          <div className="mx-auto max-w-5xl px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {[
              { v: "20 000 ₽", l: "от /м²" },
              { v: "7–21", l: "день срок" },
              { v: "3 года", l: "гарантия" },
              { v: "300+", l: "беседок сдано" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-3xl font-extrabold">{s.v}</p>
                <p className="text-sm text-green-100 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Каталог */}
        <section className="bg-slate-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-red-600">Виды беседок</h2>
              <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Выберите вариант</p>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Проектируем и строим беседки любой сложности. Возможна полная кастомизация.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {projects.map((p) => (
                <div key={p.name} className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
                  <div className="text-4xl mb-4">{p.emoji}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{p.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{p.desc}</p>
                  <ul className="space-y-1 mb-6 flex-grow">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-slate-100 pt-4 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Срок</span>
                      <span className="font-semibold">{p.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Цена</span>
                      <span className="font-bold text-red-600">{p.price}</span>
                    </div>
                  </div>
                  <Link href="/#calculator" className="mt-4 block rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white text-center hover:bg-red-700 transition-colors">
                    Заказать беседку
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
