"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export function FinalCTA() {
  return (
    <section id="cta" className="bg-red-600 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Иконка */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <span className="text-3xl">🏗</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Начните строительство
            <br />
            прямо сейчас
          </h2>
          <p className="mt-6 text-lg leading-8 text-red-100 max-w-2xl mx-auto">
            Оставьте заявку — перезвоним за 15 минут, подберём проект и сделаем точный расчёт бесплатно.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#calculator"
              id="final-cta-calculate"
              className="rounded-lg bg-white px-8 py-4 text-base font-bold text-red-600 shadow-lg hover:bg-red-50 transition-all hover:-translate-y-0.5"
            >
              Рассчитать стоимость
            </Link>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              id="final-cta-phone"
              className="rounded-lg bg-red-700 px-8 py-4 text-base font-bold text-white ring-1 ring-white/20 hover:bg-red-800 transition-all hover:-translate-y-0.5"
            >
              📞 {BRAND.phone}
            </a>
          </div>

          <p className="mt-6 text-sm text-red-200">
            {BRAND.legalName} · Работаем по договору · Гарантия на все работы
          </p>
        </motion.div>
      </div>
    </section>
  );
}
