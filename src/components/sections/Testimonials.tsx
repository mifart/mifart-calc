"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    body: "Искали надёжного подрядчика для строительства бани на участке. Выбрали МИФАРТ и не пожалели. Всё сделали в оговоренный срок, цена после подписания договора не выросла ни на рубль. Качество сборки на высоте!",
    author: "Алексей Смирнов",
    project: "Баня 35 м², комплектация «Стандарт»",
    rating: 5,
  },
  {
    body: "Заказывали каркасный дом для круглогодичного проживания. Ребята отработали на отлично! В доме очень тепло даже в сильные морозы. Отдельное спасибо менеджеру за помощь с выбором планировки.",
    author: "Елена и Максим",
    project: "Каркасный дом «Сканди» 120 м²",
    rating: 5,
  },
  {
    body: "Долго сомневался насчёт каркасной технологии, но решился на дачный домик. Построили быстро. Экономия на фундаменте получилась существенная. Выглядит стильно, пахнет деревом. Рекомендую!",
    author: "Дмитрий В.",
    project: "Дом с террасой 65 м²",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="bg-white py-24 sm:py-32 relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.red.50),theme(colors.white))] opacity-60" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base font-semibold leading-7 text-red-600">Отзывы клиентов</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Что говорят наши клиенты
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 xl:p-10 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div>
                <div className="flex gap-x-1 text-red-500 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg leading-8 text-slate-700">
                  «{testimonial.body}»
                </p>
              </div>

              <div className="mt-8 flex items-center gap-x-4 border-t border-slate-100 pt-6">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-100 font-bold text-red-700">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.project}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a
            href="https://vk.com/mif174"
            target="_blank"
            rel="noopener noreferrer"
            id="reviews-link-vk"
            className="text-sm font-semibold leading-6 text-red-600 hover:text-red-700 transition-colors"
          >
            Больше отзывов и фотографий в нашем ВКонтакте →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
