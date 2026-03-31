"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Используем Unsplash для реалистичных фото строительства
const projects = [
  {
    id: 1,
    title: "Каркасный дом «Сканди»",
    area: "120 м²",
    price: "от 4 200 000 ₽",
    tag: "Дом",
    imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Барнхаус «Вудлэнд»",
    area: "90 м²",
    price: "от 3 150 000 ₽",
    tag: "Дом",
    imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Баня с комнатой отдыха",
    area: "40 м²",
    price: "от 1 400 000 ₽",
    tag: "Баня",
    imageUrl: "https://images.unsplash.com/photo-1542314831-c6a4d14272ce?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Дом с террасой «Гранд»",
    area: "150 м²",
    price: "от 5 250 000 ₽",
    tag: "Дом",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Беседка шестиугольная",
    area: "18 м²",
    price: "от 234 000 ₽",
    tag: "Беседка",
    imageUrl: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Компактная баня 3×5",
    area: "15 м²",
    price: "от 525 000 ₽",
    tag: "Баня",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
  },
];

const tagColors: Record<string, string> = {
  Дом: "bg-blue-50 text-blue-700 ring-blue-100",
  Баня: "bg-amber-50 text-amber-700 ring-amber-100",
  Беседка: "bg-green-50 text-green-700 ring-green-100",
};

export function Portfolio() {
  return (
    <section id="portfolio" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base font-semibold leading-7 text-red-600">Портфолио</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Наши последние проекты
          </p>
          <p className="mt-4 text-lg text-slate-600">
            Строим надёжные и тёплые дома, которые радуют своих владельцев долгие годы
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-200 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${tagColors[project.tag]}`}>
                    {project.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                  {project.title}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    📐 {project.area}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{project.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/portfolio"
            id="portfolio-view-all"
            className="rounded-lg bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-slate-700 transition-colors"
          >
            Смотреть все проекты →
          </Link>
          <a
            href="https://vk.com/mif174"
            target="_blank"
            rel="noopener noreferrer"
            id="portfolio-view-vk"
            className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors"
          >
            Больше фото в ВКонтакте →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
