"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section id="services" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base font-semibold leading-7 text-red-600">Наши услуги</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Что мы строим
          </p>
          <p className="mt-4 text-lg text-slate-600">
            Полный цикл: проектирование, изготовление материалов, строительство, отделка
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={service.href}
                id={`service-card-${service.id}`}
                className="group flex flex-col h-full rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-red-100 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{service.emoji}</div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors mb-3">
                  {service.name}
                </h3>
                <p className="text-sm leading-6 text-slate-600 flex-grow mb-6">
                  {service.description}
                </p>
                <div className="mt-auto space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Срок</span>
                    <span className="font-semibold text-slate-700">{service.avgTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Цена от</span>
                    <span className="font-bold text-red-600">
                      {new Intl.NumberFormat("ru-RU").format(service.basePrice)} ₽/м²
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-red-600 group-hover:gap-2 transition-all">
                  Подробнее
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/#calculator"
            id="services-cta"
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-red-100 hover:bg-red-700 transition-all hover:-translate-y-0.5"
          >
            Рассчитать стоимость →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
