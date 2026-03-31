import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Индивидуальные проекты",
  description:
    "Разработка и строительство по индивидуальному проекту. Каркасные дома, бани, беседки любой сложности. Цена от 55 000 ₽/м². Звоните: +7 (995) 380-08-88",
};

const steps = [
  { num: "01", title: "Заявка и консультация", desc: "Рассказываете о задаче. Мы выезжаем на участок или консультируем онлайн." },
  { num: "02", title: "Техническое задание", desc: "Фиксируем все пожелания: площадь, этажность, планировка, отделка, бюджет." },
  { num: "03", title: "Разработка проекта", desc: "Архитектурный/конструктивный раздел. 3D-визуализация. Смета на каждый этап." },
  { num: "04", title: "Согласование и договор", desc: "Утверждаете проект, подписываем договор с фиксированной ценой." },
  { num: "05", title: "Строительство", desc: "Работа по согласованному проекту. Фотоотчёт каждого этапа." },
  { num: "06", title: "Сдача объекта", desc: "Принимаете работу по чек-листу. Подписываем акт. Получаете гарантийный паспорт." },
];

export default function ProektyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
          <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/20 px-4 py-1.5 text-sm font-semibold text-violet-300 ring-1 ring-violet-400/30 mb-6">
              <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
              Индивидуальные проекты
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Строим по <br />
              <span className="text-violet-400">вашему проекту</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
              Разработаем проект с нуля под ваши задачи и бюджет.
              Полный цикл: от архитектуры до чистовой отделки.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#calculator" id="proekty-cta-primary" className="rounded-lg bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-red-500 transition-all hover:-translate-y-0.5">
                Оставить заявку
              </Link>
              <a href={`tel:${BRAND.phoneRaw}`} id="proekty-cta-call" className="rounded-lg bg-white/10 px-8 py-4 text-base font-bold text-white ring-1 ring-white/20 hover:bg-white/20 transition-all">
                📞 {BRAND.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Этапы работы */}
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-red-600">Процесс</h2>
              <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Как создаётся ваш проект</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((s) => (
                <div key={s.num} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 hover:shadow-lg transition-shadow">
                  <p className="text-4xl font-extrabold text-red-100 mb-3">{s.num}</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Что включает */}
        <section className="bg-slate-900 py-24 sm:py-32 text-white">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-violet-400">Состав проекта</h2>
              <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">Что входит в стоимость</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "🏗️ Архитектурный раздел с планировками",
                "📐 Конструктивный раздел и расчёты нагрузок",
                "💡 Проект электрики, сантехники, отопления",
                "📊 Детальная смета с разбивкой по этапам",
                "🎨 3D-визуализация экстерьера и интерьера",
                "📋 Спецификации материалов",
                "🔧 Авторский надзор при строительстве",
                "📷 Фотоотчёт каждого этапа работ",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 ring-1 ring-white/10 text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/#calculator"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-red-500 transition-all hover:-translate-y-0.5"
              >
                Начать разработку проекта →
              </Link>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
