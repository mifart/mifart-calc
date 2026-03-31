import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Портфолио — построенные объекты",
  description:
    "Портфолио выполненных работ ООО «МИФАРТ»: каркасные дома, бани, беседки в Челябинске и по всей России. 200+ объектов сданных в срок.",
};

const items = [
  { type: "house", emoji: "🏠", name: "Дом «Уют» 72 м²", location: "Челябинск, пос. Ленинское", year: "2024", price: "3 240 000 ₽", tag: "Каркасный дом" },
  { type: "bath", emoji: "🛁", name: "Баня «Классика» 24 м²", location: "Магнитогорск", year: "2024", price: "960 000 ₽", tag: "Баня" },
  { type: "gazebo", emoji: "🌳", name: "Беседка с барбекю 20 м²", location: "Михайловск", year: "2024", price: "400 000 ₽", tag: "Беседка" },
  { type: "house", emoji: "🏠", name: "Дом «Комфорт» 100 м²", location: "Чебаркуль", year: "2023", price: "4 500 000 ₽", tag: "Каркасный дом" },
  { type: "bath", emoji: "🛁", name: "Баня «Люкс» 48 м²", location: "Снежинск", year: "2023", price: "1 920 000 ₽", tag: "Баня" },
  { type: "house", emoji: "🏠", name: "Дом «Семейный» 140 м²", location: "Верхний Уфалей", year: "2023", price: "6 300 000 ₽", tag: "Каркасный дом" },
  { type: "gazebo", emoji: "🌳", name: "Веранда пристроенная 30 м²", location: "Копейск", year: "2023", price: "600 000 ₽", tag: "Беседка" },
  { type: "bath", emoji: "🛁", name: "Баня из бруса 36 м²", location: "Кыштым", year: "2022", price: "1 440 000 ₽", tag: "Баня" },
  { type: "house", emoji: "🏠", name: "Дачный дом 60 м²", location: "Аргаяш", year: "2022", price: "2 700 000 ₽", tag: "Каркасный дом" },
];

const filters = [
  { id: "all", label: "Все работы" },
  { id: "house", label: "Дома" },
  { id: "bath", label: "Бани" },
  { id: "gazebo", label: "Беседки" },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-slate-900 pt-32 pb-16 sm:pt-40 sm:pb-20 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/20 mb-6">
              200+ объектов сдано
            </span>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              Наши <span className="text-red-400">работы</span>
            </h1>
            <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
              Реальные объекты наших клиентов. Все фото — с наших строительных площадок.
            </p>
          </div>
        </section>

        {/* Портфолио сетка */}
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Фильтры */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="rounded-full px-5 py-2 text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:border-red-300 hover:text-red-600 transition-colors"
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="group rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  {/* Превью */}
                  <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-7xl">
                    {item.emoji}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">{item.tag}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1 mb-1">{item.name}</h3>
                    <p className="text-sm text-slate-500 mb-3">📍 {item.location} · {item.year}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-slate-900">{item.price}</span>
                      <Link href="/#calculator" className="text-sm font-semibold text-red-600 hover:text-red-700">
                        Заказать →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-slate-500 mb-6">Хотите посмотреть больше объектов? Напишите нам.</p>
              <Link
                href="/#calculator"
                id="portfolio-cta"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-red-700 transition-all hover:-translate-y-0.5"
              >
                Обсудить ваш проект
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
