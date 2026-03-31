import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Бани и сауны под ключ",
  description:
    "Строительство каркасных бань и саун под ключ в Челябинске. Бани из бруса и профилированного бруса. Цена от 40 000 ₽/м². Срок от 20 дней. Звоните: +7 (995) 380-08-88",
  openGraph: {
    title: "Бани и сауны под ключ | МИФАРТ",
    description: "Каркасные бани и рубленые бани из бруса с комнатой отдыха и террасой.",
  },
};

const projects = [
  {
    name: "«Классика» 24 м²",
    area: "24 м²",
    price: "от 960 000 ₽",
    tag: "Популярный",
    features: ["Парная 6 м²", "Мойка 6 м²", "Предбанник 12 м²"],
    tagColor: "bg-red-100 text-red-700",
  },
  {
    name: "«Комфорт» 36 м²",
    area: "36 м²",
    price: "от 1 440 000 ₽",
    tag: "Хит продаж",
    features: ["Парная 8 м²", "Комната отдыха", "Терраса 10 м²"],
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    name: "«Люкс» 48 м²",
    area: "48 м²",
    price: "от 1 920 000 ₽",
    tag: "Премиум",
    features: ["Парная 10 м²", "Купель", "Бассейн", "Терраса"],
    tagColor: "bg-violet-100 text-violet-700",
  },
];

const bathTypes = [
  { icon: "🪵", name: "Каркасная баня", desc: "Быстрое возведение 20–30 дней. Отличная теплоизоляция. Экономичный вариант." },
  { icon: "🌲", name: "Баня из бруса", desc: "Классический натуральный материал. Рубленая из оцилиндрованного или профилированного бруса 150×150." },
  { icon: "♨️", name: "Финская сауна", desc: "Сухой пар 90–110°C. Встроенная электрокаменка. Панорамное остекление." },
  { icon: "🔥", name: "Русская баня", desc: "Влажный пар 60–80°C. Кирпичная или металлическая печь. Настоящая парная." },
];

export default function BaniPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-amber-950 via-red-950 to-slate-900 pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L3N2Zz4=')]" />
          <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-semibold text-amber-300 ring-1 ring-amber-400/30 mb-6">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              Бани и сауны
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Бани и сауны <br />
              <span className="text-amber-400">под ключ</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
              Каркасные бани и бани из бруса с комнатой отдыха и террасой.
              Строим за 20–45 дней. Тепло с первой топки.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#calculator" id="bani-cta-primary" className="rounded-lg bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-red-500 transition-all hover:-translate-y-0.5">
                Рассчитать стоимость
              </Link>
              <a href={`tel:${BRAND.phoneRaw}`} id="bani-cta-call" className="rounded-lg bg-white/10 px-8 py-4 text-base font-bold text-white ring-1 ring-white/20 hover:bg-white/20 transition-all">
                📞 {BRAND.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-amber-600 py-10">
          <div className="mx-auto max-w-5xl px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {[
              { v: "40 000 ₽", l: "от /м²" },
              { v: "20–45", l: "дней срок" },
              { v: "5 лет", l: "гарантия" },
              { v: "150+", l: "бань сдано" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-3xl font-extrabold">{s.v}</p>
                <p className="text-sm text-amber-100 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Виды бань */}
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-red-600">Виды</h2>
              <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Какую баню строим</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bathTypes.map((b) => (
                <div key={b.name} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{b.name}</h3>
                  <p className="text-sm text-slate-600">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Каталог */}
        <section className="bg-slate-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-red-600">Типовые проекты</h2>
              <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Выберите баню</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {projects.map((p) => (
                <div key={p.name} className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">🛁</div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.tagColor}`}>{p.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{p.name}</h3>
                  <p className="text-xs text-slate-400 mb-4">{p.area}</p>
                  <ul className="space-y-1 mb-6 flex-grow">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-lg font-bold text-red-600 mb-3">{p.price}</p>
                    <Link href="/#calculator" className="block rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white text-center hover:bg-red-700 transition-colors">
                      Заказать баню
                    </Link>
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
