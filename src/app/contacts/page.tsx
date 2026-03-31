"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BRAND } from "@/lib/constants";
import { sendLeadToTelegram } from "@/app/actions/telegram";

export default function ContactsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    await sendLeadToTelegram({
      name: fd.get("name") as string,
      phone: fd.get("phone") as string,
      comment: fd.get("message") as string,
      source: "Страница контактов",
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-slate-900 pt-32 pb-16 sm:pt-40 sm:pb-20 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              Свяжитесь <span className="text-red-400">с нами</span>
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              Перезвоним в течение 15 минут в рабочее время. Бесплатная консультация.
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Форма */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm ring-1 ring-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Написать нам</h2>
                <p className="text-slate-500 text-sm mb-8">Заполните форму и мы перезвоним в течение 15 минут.</p>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 mb-1">Имя</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Ваше имя"
                        className="w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-red-600 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-semibold text-slate-700 mb-1">Телефон</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+7 (999) 000-00-00"
                        className="w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-red-600 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 mb-1">Сообщение (необязательно)</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        placeholder="Расскажите о вашем проекте..."
                        className="w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-red-600 text-sm resize-none"
                      />
                    </div>
                    <button
                      id="contacts-submit"
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-red-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-red-700 transition-colors disabled:opacity-70"
                    >
                      {loading ? "Отправка..." : "Отправить заявку →"}
                    </button>
                    <p className="text-xs text-center text-slate-400">
                      Нажимая кнопку, вы соглашаетесь с{" "}
                      <Link href="/privacy" className="underline hover:text-slate-600">политикой конфиденциальности</Link>
                    </p>
                  </form>
                ) : (
                  <div className="bg-green-50 rounded-2xl p-8 text-center ring-1 ring-green-100">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Заявка отправлена!</h3>
                    <p className="text-sm text-slate-600">Перезвоним в течение 15 минут.</p>
                  </div>
                )}
              </div>

              {/* Контакты */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Контакты</h3>
                  <dl className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📞</span>
                      <div>
                        <dt className="text-slate-500">Телефон</dt>
                        <dd><a href={`tel:${BRAND.phoneRaw}`} className="font-bold text-slate-900 hover:text-red-600 transition-colors">{BRAND.phone}</a></dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✉️</span>
                      <div>
                        <dt className="text-slate-500">Email</dt>
                        <dd><a href={`mailto:${BRAND.email}`} className="font-bold text-slate-900 hover:text-red-600 transition-colors">{BRAND.email}</a></dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🗓️</span>
                      <div>
                        <dt className="text-slate-500">Режим работы</dt>
                        <dd className="font-semibold text-slate-900">Пн–Сб: 9:00–20:00</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📍</span>
                      <div>
                        <dt className="text-slate-500">Адрес</dt>
                        <dd className="font-semibold text-slate-900">Челябинская область</dd>
                      </div>
                    </div>
                  </dl>
                </div>

                {/* Соцсети */}
                <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Мессенджеры и соцсети</h3>
                  <div className="space-y-3">
                    <a href={BRAND.vk} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-slate-700">
                      <span className="text-xl">VK</span> ВКонтакте: vk.com/mif174
                    </a>
                    <a href={BRAND.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-sky-50 hover:text-sky-600 transition-colors font-semibold text-slate-700">
                      <span className="text-xl">✈️</span> Telegram-бот
                    </a>
                    <a href={BRAND.max} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-violet-50 hover:text-violet-600 transition-colors font-semibold text-slate-700">
                      <span className="text-xl">💬</span> MAX-канал
                    </a>
                  </div>
                </div>

                {/* Карта */}
                <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-100 h-48">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=61.402554%2C55.159897&z=11"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="МИФАРТ на карте"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
