"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendLeadToTelegram } from "@/app/actions/telegram";
import { SERVICES } from "@/lib/constants";
import { useUTM } from "@/hooks/useUTM";

const objectTypes = SERVICES.filter((s) => s.id !== "custom").map((s) => ({
  id: s.id,
  name: s.nameShort,
  emoji: s.emoji,
  basePrice: s.basePrice,
}));

export function Calculator() {
  const utmParams = useUTM();
  const [selectedType, setSelectedType] = useState(objectTypes[0]);
  const [area, setArea] = useState<number>(60);
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEstimatedPrice(selectedType.basePrice * area);
  }, [selectedType, area]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    await sendLeadToTelegram({
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      type: selectedType.id,
      area: area,
      price: estimatedPrice,
      source: "Главная / Калькулятор",
      ...utmParams,
    });

    setIsLoading(false);
    setIsSubmitted(true);

    // Яндекс.Метрика
    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID, "reachGoal", "submit_lead");
    }
  };

  return (
    <section id="calculator" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base font-semibold leading-7 text-red-600">Калькулятор стоимости</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Рассчитайте стоимость проекта
          </p>
          <p className="mt-4 text-lg text-slate-600">
            Выберите тип строения и площадь — получите ориентировочную цену прямо сейчас
          </p>
        </motion.div>

        <motion.div
          className="rounded-3xl bg-slate-50 p-8 shadow-xl ring-1 ring-slate-200 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Левая колонка: параметры */}
            <div className="space-y-8">
              {/* Тип объекта */}
              <div>
                <label className="block text-sm font-semibold leading-6 text-slate-900 mb-4">
                  Тип объекта
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {objectTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`flex flex-col items-center gap-1 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 border-2 ${
                        selectedType.id === type.id
                          ? "bg-red-600 text-white border-red-600 shadow-md scale-105"
                          : "bg-white text-slate-700 border-slate-200 hover:border-red-300"
                      }`}
                    >
                      <span className="text-xl">{type.emoji}</span>
                      <span>{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Площадь */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-semibold leading-6 text-slate-900">
                    Площадь строения
                  </label>
                  <span className="text-xl font-extrabold text-red-600">{area} м²</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full"
                  aria-label="Площадь в квадратных метрах"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>10 м²</span>
                  <span>300 м²</span>
                </div>
              </div>

              {/* Результат */}
              <div className="pt-6 border-t border-slate-200">
                <p className="text-sm font-medium text-slate-500 mb-2">Ориентировочная стоимость:</p>
                <div className="flex items-baseline gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={estimatedPrice}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-4xl font-extrabold tracking-tight text-slate-900"
                    >
                      {new Intl.NumberFormat("ru-RU").format(estimatedPrice)}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-2xl font-bold text-slate-500">₽</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  * Ориентировочный расчёт. Точная смета — после консультации с менеджером.
                </p>
              </div>
            </div>

            {/* Правая колонка: форма */}
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-100"
                    onSubmit={handleSubmit}
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Зафиксировать цену</h3>
                    <p className="text-sm text-slate-500 mb-6">
                      Оставьте контакты — менеджер пришлёт точную смету на{" "}
                      {selectedType.name.toLowerCase()} {area} м².
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="calc-name" className="sr-only">Имя</label>
                        <input
                          type="text"
                          id="calc-name"
                          name="name"
                          required
                          placeholder="Ваше имя"
                          className="w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-red-600 text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="calc-phone" className="sr-only">Телефон</label>
                        <input
                          type="tel"
                          id="calc-phone"
                          name="phone"
                          required
                          placeholder="+7 (999) 000-00-00"
                          className="w-full rounded-lg border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-red-600 text-sm"
                        />
                      </div>
                      <button
                        id="calculator-submit"
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-red-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors disabled:opacity-70"
                      >
                        {isLoading ? "Отправка..." : "Получить точный расчёт →"}
                      </button>
                      <p className="text-xs text-center text-slate-400">
                        Нажимая кнопку, вы соглашаетесь с{" "}
                        <a href="/privacy" className="underline hover:text-slate-600">
                          политикой конфиденциальности
                        </a>
                      </p>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 p-8 rounded-2xl text-center ring-1 ring-green-100 flex flex-col justify-center items-center min-h-[280px]"
                  >
                    <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Заявка принята!</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Мы зафиксировали цену и перезвоним в течение 15 минут.
                    </p>
                    <a
                      href={`tel:${BRAND.phoneRaw}`}
                      className="text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      {BRAND.phone}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
