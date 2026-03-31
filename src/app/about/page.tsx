import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "О компании МИФАРТ",
  description:
    "О компании ООО «МИФАРТ» — строительство каркасных домов, бань и беседок в Челябинске с 2016 года. 200+ объектов сдано в срок. Работаем по договору.",
};

const timeline = [
  { year: "2016", title: "Основание компании", desc: "Начали строить первые беседки и бани в Челябинске." },
  { year: "2018", title: "Расширение на дома", desc: "Запустили направление каркасных домов для постоянного проживания." },
  { year: "2020", title: "100-й объект", desc: "Сдали сотый объект. Запустили отдел контроля качества." },
  { year: "2022", title: "Выход на всю Россию", desc: "Начали работать по всей России. Открыли собственное производство." },
  { year: "2024", title: "200+ объектов", desc: "Сдали более 200 объектов. 100% в срок по договору." },
];

const team = [
  { name: "Руслан М.", role: "Генеральный директор", emoji: "👨‍💼", desc: "15 лет в строительстве. Контролирует каждый объект лично." },
  { name: "Алексей К.", role: "Главный инженер", emoji: "👷", desc: "Проектирование и расчёт нагрузок. Строим строго по СНиП." },
  { name: "Светлана П.", role: "Менеджер по работе с клиентами", emoji: "👩‍💻", desc: "Ответит на любой вопрос и проведёт вас от заявки до сдачи." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-slate-900 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/20 mb-6">
                  С 2016 года
                </span>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                  О компании <span className="text-red-400">МИФАРТ</span>
                </h1>
                <p className="mt-6 text-lg text-slate-300">
                  Мы — строительная компания из Челябинска. Строим каркасные дома, бани и беседки
                  под ключ по всей России. С нами работают по договору, цены не меняются,
                  а сроки выдерживаются.
                </p>
                <div className="mt-8 flex gap-4">
                  <a
                    href={`tel:${BRAND.phoneRaw}`}
                    className="rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white hover:bg-red-500 transition-colors"
                  >
                    Позвонить
                  </a>
                  <Link
                    href="/#calculator"
                    className="rounded-lg bg-white/10 px-6 py-3 text-sm font-bold text-white ring-1 ring-white/20 hover:bg-white/20 transition-colors"
                  >
                    Рассчитать стоимость
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "8 лет", l: "на рынке" },
                  { v: "200+", l: "объектов" },
                  { v: "100%", l: "в срок" },
                  { v: "0", l: "судебных споров" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 text-center">
                    <p className="text-3xl font-extrabold text-red-400">{s.v}</p>
                    <p className="text-sm text-slate-400 mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-red-600">История</h2>
              <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Наш путь</p>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 lg:left-1/2" />
              <div className="space-y-12">
                {timeline.map((t, i) => (
                  <div key={t.year} className={`relative flex gap-8 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white font-extrabold text-sm z-10">
                      {t.year}
                    </div>
                    <div className="flex-1 rounded-2xl bg-slate-50 border border-slate-100 p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{t.title}</h3>
                      <p className="text-sm text-slate-600">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Команда */}
        <section className="bg-slate-50 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-red-600">Команда</h2>
              <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Кто работает над вашим проектом</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {team.map((m) => (
                <div key={m.name} className="rounded-2xl bg-white border border-slate-100 p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
                  <div className="text-6xl mb-4">{m.emoji}</div>
                  <h3 className="text-xl font-bold text-slate-900">{m.name}</h3>
                  <p className="text-sm font-semibold text-red-600 mb-3">{m.role}</p>
                  <p className="text-sm text-slate-600">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Почему нам доверяют */}
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-semibold text-red-600">Гарантии</h2>
              <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Почему нам доверяют</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "📋", title: "Договор до начала работ", desc: "Фиксируем цену и сроки до первого гвоздя. Никаких устных договорённостей." },
                { icon: "🔒", title: "Гарантия до 10 лет", desc: "Даём гарантию на конструктив дома до 10 лет, на отделочные работы — 2 года." },
                { icon: "📷", title: "Фотоотчёт каждого этапа", desc: "Присылаем фото прогресса в Telegram или WhatsApp. Вы в курсе всего." },
                { icon: "🏗️", title: "Собственная бригада", desc: "Работаем без субподрядчиков. Все строители — штатные сотрудники." },
                { icon: "💰", title: "Без скрытых доплат", desc: "Смета — окончательная. Если что-то упустили, доделываем за свой счёт." },
                { icon: "✅", title: "Приёмка объекта вместе", desc: "Принимаете работу по чек-листу вместе с прорабом. Подписываем акт." },
              ].map((g) => (
                <div key={g.title} className="flex gap-4 p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:shadow-md transition-shadow">
                  <div className="text-3xl shrink-0">{g.icon}</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{g.title}</h3>
                    <p className="text-sm text-slate-600">{g.desc}</p>
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
