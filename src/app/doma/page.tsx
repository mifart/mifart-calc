import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Каркасные дома под ключ",
  description:
    "Строительство каркасных домов под ключ в Челябинске и по всей России. Дома для постоянного проживания и дачи. Фиксированная цена, срок от 45 дней. Звоните: +7 (995) 380-08-88",
  openGraph: {
    title: "Каркасные дома под ключ | МИФАРТ",
    description: "Быстровозводимые каркасные дома для постоянного проживания и дачного отдыха. Цена от 45 000 ₽/м².",
  },
};

const projects = [
  {
    name: "«Уют» 72 м²",
    area: "72 м²",
    price: "от 3 240 000 ₽",
    floors: "1 этаж",
    rooms: "3 комнаты",
    time: "60 дней",
    features: ["Утеплённый пол", "Отделка под ключ", "Терраса"],
    gradient: "from-amber-50 to-orange-50",
  },
  {
    name: "«Комфорт» 100 м²",
    area: "100 м²",
    price: "от 4 500 000 ₽",
    floors: "2 этажа",
    rooms: "4 комнаты",
    time: "75 дней",
    features: ["Мансарда", "Гараж", "Балкон"],
    gradient: "from-sky-50 to-blue-50",
  },
  {
    name: "«Семейный» 140 м²",
    area: "140 м²",
    price: "от 6 300 000 ₽",
    floors: "2 этажа",
    rooms: "5 комнат",
    time: "90 дней",
    features: ["Гостевая комната", "Котельная", "Терраса 30 м²"],
    gradient: "from-green-50 to-emerald-50",
  },
  {
    name: "«Просторный» 180 м²",
    area: "180 м²",
    price: "от 8 100 000 ₽",
    floors: "2 этажа",
    rooms: "6 комнат",
    time: "90 дней",
    features: ["Панорамные окна", "Сауна", "Двойной гараж"],
    gradient: "from-violet-50 to-purple-50",
  },
];

const techSteps = [
  { icon: "🏗️", title: "Фундамент", desc: "Свайно-винтовой или ленточный. Подбираем по типу грунта и нагрузке." },
  { icon: "🪵", title: "Каркас", desc: "Доска камерной сушки 50×150 мм, обработка антисептиком." },
  { icon: "🧱", title: "Утепление", desc: "ROCKWOOL или Knauf 150–200 мм. Паро- и ветрозащита." },
  { icon: "🏠", title: "Кровля", desc: "Металлочерепица, битумная черепица или профлист на выбор." },
  { icon: "🪟", title: "Окна и двери", desc: "Двухкамерные стеклопакеты, входная дверь — в комплекте." },
  { icon: "✨", title: "Отделка", desc: "Внутренняя: вагонка, ГКЛ, OSB под чистовую. Фасад: имитация бруса, сайдинг." },
];

export default function DomaPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
          <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-1.5 text-sm font-semibold text-red-300 ring-1 ring-red-400/30 mb-6">
              <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
              Каркасные дома
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Каркасные дома <br />
              <span className="text-red-400">под ключ</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
              Быстровозводимые каркасные дома для постоянного проживания и дачного отдыха.
              Строим за 45–90 дней. Цена фиксируется в договоре.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#calculator"
                id="doma-cta-primary"
                className="rounded-lg bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-red-500 transition-all hover:-translate-y-0.5"
              >
                Рассчитать стоимость
              </Link>
              <a
                href={`tel:${BRAND.phoneRaw}`}
                id="doma-cta-call"
                className="rounded-lg bg-white/10 px-8 py-4 text-base font-bold text-white ring-1 ring-white/20 hover:bg-white/20 transition-all"
              >
                📞 {BRAND.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Статистика */}
        <section className="bg-red-600 py-10">
          <div className="mx-auto max-w-5xl px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {[
              { v: "45 000 ₽", l: "от /м²" },
              { v: "45–90", l: "дней срок" },
              { v: "10 лет", l: "гарантия" },
              { v: "200+", l: "домов сдано" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-3xl font-extrabold">{s.v}</p>
                <p className="text-sm text-red-100 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Каталог проектов */}
        <section className="bg-slate-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-red-600">Типовые проекты</h2>
              <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Выберите подходящий дом</p>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Готовые проекты с фиксированной стоимостью. Возможна адаптация под ваш участок.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {projects.map((p) => (
                <div
                  key={p.name}
                  className={`rounded-2xl bg-gradient-to-br ${p.gradient} border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col`}
                >
                  <div className="text-4xl mb-4">🏠</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{p.name}</h3>
                  <div className="flex gap-3 text-xs text-slate-500 mb-4">
                    <span>{p.area}</span>
                    <span>·</span>
                    <span>{p.floors}</span>
                    <span>·</span>
                    <span>{p.rooms}</span>
                  </div>
                  <ul className="space-y-1 mb-6 flex-grow">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-slate-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Срок</span>
                      <span className="font-semibold">{p.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Стоимость</span>
                      <span className="font-bold text-red-600">{p.price}</span>
                    </div>
                  </div>
                  <Link
                    href="/#calculator"
                    className="mt-4 block rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white text-center hover:bg-red-700 transition-colors"
                  >
                    Заказать проект
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Технология строительства */}
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-red-600">Технология</h2>
              <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Как строим</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {techSteps.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-1">Шаг {i + 1}</p>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.desc}</p>
                  </div>
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
