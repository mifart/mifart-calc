"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

const navLinks = [
  { name: "Преимущества", href: "/#advantages" },
  { name: "Каталог", href: "/#services" },
  { name: "Портфолио", href: "/#portfolio" },
  { name: "Калькулятор", href: "/#calculator" },
  { name: "О нас", href: "/about" },
  { name: "Контакты", href: "/contacts" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Логотип */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-600 text-white font-bold text-xl">
              М
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              МИФАРТ
            </span>
          </Link>
        </div>

        {/* Мобильная кнопка */}
        <div className="flex lg:hidden">
          <button
            type="button"
            id="mobile-menu-button"
            aria-label="Открыть меню"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
            </svg>
          </button>
        </div>

        {/* Десктопное меню */}
        <nav className="hidden lg:flex lg:gap-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-semibold leading-6 text-slate-800 hover:text-red-600 transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Телефон + CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <a href={`tel:${BRAND.phoneRaw}`} className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors">
            {BRAND.phone}
          </a>
          <Link
            href="/#calculator"
            id="header-cta"
            className="text-sm font-semibold text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors shadow-sm"
          >
            Рассчитать стоимость
          </Link>
        </div>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            <div className="space-y-1 px-6 py-4 pb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-100 space-y-2">
                <a
                  href={`tel:${BRAND.phoneRaw}`}
                  className="flex items-center gap-2 px-3 py-2 text-base font-semibold text-slate-700"
                >
                  📞 {BRAND.phone}
                </a>
                <Link
                  href="/#calculator"
                  onClick={() => setIsMobileMenuOpen(false)}
                  id="mobile-cta"
                  className="block rounded-lg text-center px-3 py-3 text-base font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm"
                >
                  Рассчитать стоимость
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
