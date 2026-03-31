"use client";

import { motion } from "framer-motion";

export function Contacts() {
    return (
        <section id="contacts" className="bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    className="mx-auto max-w-2xl text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-base font-semibold leading-7 text-red-600">Свяжитесь с нами</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Наши контакты и карта
                    </p>
                    <p className="mt-4 text-lg text-slate-600">
                        Мы всегда на связи. Приезжайте в гости или пишите в удобный вам мессенджер.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {/* Левая колонка: Контакты */}
                    <motion.div
                        className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm ring-1 ring-slate-200"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold text-slate-900 mb-8">ООО «МИФАРТ»</h3>
                        <dl className="space-y-6 text-base leading-7 text-slate-600">
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Адрес</span>
                                    <svg className="h-7 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </dt>
                                <dd>Челябинская область, г. Челябинск<br />(точный адрес уточняйте по телефону)</dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Телефон</span>
                                    <svg className="h-7 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </dt>
                                <dd><a className="hover:text-red-600 font-semibold transition-colors" href="tel:+79953800888">+7 (995) 380-08-88</a></dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Email</span>
                                    <svg className="h-7 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </dt>
                                <dd><a className="hover:text-red-600 font-semibold transition-colors" href="mailto:mifart74@gmail.com">mifart74@gmail.com</a></dd>
                            </div>
                            <div className="flex gap-x-4 pt-4 border-t border-slate-100">
                                <dt className="flex-none">
                                    <span className="sr-only">MAX</span>
                                    <svg className="h-7 w-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 5.8 2 10.5c0 2.7 1.48 5.1 3.81 6.64-.26 1.44-1.14 3.03-1.2 3.15-.1.2.03.44.25.48 2.61.42 4.93-.65 6.08-1.26.68.13 1.38.2 2.06.2 5.52 0 10-3.8 10-8.5S17.52 2 12 2zm0 15.5c-.77 0-1.52-.09-2.25-.26-.26-.06-.53-.02-.76.11-1.39.78-3.32 1.54-5.11 1.42.79-1.07 1.44-2.4 1.63-3.7.06-.38-.08-.76-.36-1.03C3.33 12.63 2.25 11.03 2.25 9.25c0-4.04 4.14-7.25 9.75-7.25s9.75 3.21 9.75 7.25-4.14 7.25-9.75 7.25z" />
                                    </svg>
                                </dt>
                                <dd><a className="hover:text-red-600 font-semibold transition-colors" href="https://max.ru/id7460059486_bot" target="_blank" rel="noopener noreferrer">Написать боту в MAX</a></dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">VK</span>
                                    <svg className="h-7 w-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M15.073 2H8.927C3.333 2 2 3.333 2 8.927v6.146C2 20.667 3.333 22 8.927 22h6.146C20.667 22 22 20.667 22 15.073V8.927C22 3.333 20.667 2 15.073 2zM17.432 14.86c.484.47.935.973 1.36 1.498.156.196.344.382.433.62.13.35-.042.753-.396.86-.14.043-.289.062-.435.062H15.84c-.662-.008-1.217-.323-1.638-.813-.412-.48-.8-1-1.182-1.517-.183-.247-.384-.486-.63-.674-.326-.25-.68-.225-.92.095-.27.362-.39.754-.42 1.187-.035.5-.27.75-.765.787-1.39.103-2.673-.243-3.805-1.077-1.425-1.047-2.42-2.44-3.21-4.004-.84-1.66-1.51-3.4-2.02-5.18-.11-.383.05-.668.44-.7h2.51c.39 0 .62.203.74.58 1.01 3.2 2.65 5.86 5.58 7.35.22.11.41-.01.46-.24.08-.34.12-.69.12-1.04 0-1.15-.22-2.22-.96-3.1-.38-.45-.3-.72.22-.9.35-.12.72-.15 1.1-.15h1.96c.55.08.77.38.86.93.07.45.1 2.92.1 2.92.01.62.43.83.85.5.38-.3.7-.66 1.01-1.03 1.1-1.34 1.84-2.9 2.37-4.63.1-.35.3-.54.67-.54h2.72c.16 0 .32.02.46.08.35.15.42.45.24.78-.3.56-.66 1.1-1.04 1.62-1.04 1.4-2.14 2.76-3.15 4.19-.38.54-.33 1.04.14 1.54z" />
                                    </svg>
                                </dt>
                                <dd><a className="hover:text-red-600 font-semibold transition-colors" href="https://vk.com/mif174" target="_blank" rel="noopener noreferrer">vk.com/mif174</a></dd>
                            </div>
                        </dl>
                    </motion.div>

                    {/* Правая колонка: Карта */}
                    <motion.div
                        className="bg-slate-200 rounded-3xl overflow-hidden shadow-sm ring-1 ring-slate-200 min-h-[400px] h-full"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?ll=61.402554%2C55.159897&z=11"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            className="w-full h-full border-0"
                            title="Мы на карте"
                            loading="lazy"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}