"use client";

import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    name: "Заявка и расчёт",
    description: "Оставляете заявку — менеджер перезванивает за 15 минут. Подбираем проект и делаем предварительный расчёт сметы.",
  },
  {
    id: "02",
    name: "Договор и фиксация цены",
    description: "Встречаемся, утверждаем все детали. Подписываем договор с фиксированной ценой и сроками сдачи.",
  },
  {
    id: "03",
    name: "Материалы и фундамент",
    description: "Завозим качественные сертифицированные материалы. Монтируем надёжный фундамент на вашем участке.",
  },
  {
    id: "04",
    name: "Строительство под ключ",
    description: "Каркас, кровля, утепление, внешняя и внутренняя отделка — всё строго по проекту и ГОСТ.",
  },
  {
    id: "05",
    name: "Сдача объекта",
    description: "Убираем строительный мусор. Финальная проверка качества. Вы принимаете работу и получаете ключи.",
  },
];

export function HowWeWork() {
  return (
    <section id="how-we-work" className="bg-white py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl lg:text-center mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base font-semibold leading-7 text-red-600">Прозрачный процесс</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Как мы строим вашу мечту
          </p>
          <p className="mt-4 text-lg text-slate-600">
            5 простых шагов от заявки до ключей в руках
          </p>
        </motion.div>

        <div className="mx-auto max-w-none">
          <div className="flex flex-col gap-y-10 lg:flex-row lg:gap-x-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative flex flex-col gap-y-3 pl-12 lg:pl-0 lg:pt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Декоративная линия — десктоп */}
                {index !== steps.length - 1 && (
                  <div className="hidden lg:block absolute left-6 top-6 h-0.5 w-full bg-slate-100" />
                )}
                {/* Декоративная линия — мобильный */}
                {index !== steps.length - 1 && (
                  <div className="lg:hidden absolute left-[15px] top-10 h-full w-0.5 bg-slate-100" />
                )}
                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white ring-2 ring-red-600 z-10 lg:left-0 text-sm font-bold text-red-600 shadow-sm">
                  {step.id}
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-8">{step.name}</h3>
                <p className="text-sm leading-6 text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
