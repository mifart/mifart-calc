import Link from "next/link";
import { BRAND } from "@/lib/constants";

const navLinks = [
  { name: "Каркасные дома", href: "/doma" },
  { name: "Бани и сауны", href: "/bani" },
  { name: "Беседки", href: "/besedki" },
  { name: "Индивидуальные проекты", href: "/proekty" },
  { name: "Портфолио", href: "/portfolio" },
  { name: "О компании", href: "/about" },
  { name: "Контакты", href: "/contacts" },
];

const socialLinks = [
  { name: "ВКонтакте", href: BRAND.vk, icon: "VK" },
  { name: "Telegram", href: BRAND.telegram, icon: "TG" },
  { name: "MAX", href: BRAND.max, icon: "MAX" },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 py-12 sm:py-16 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-700 pb-12">
          {/* Логотип и описание */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-600 text-white font-bold text-xl">
                М
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                МИФАРТ
              </span>
            </Link>
            <p className="text-sm leading-6 text-slate-400 max-w-xs">
              Строительство каркасных домов, бань и беседок под ключ. Фиксированная цена, реальные сроки, договор.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-8 w-10 items-center justify-center rounded bg-slate-700 text-xs font-bold text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white mb-4">Услуги</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm leading-6 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${BRAND.phoneRaw}`} className="flex items-center gap-3 text-sm leading-6 hover:text-white transition-colors">
                  <svg className="h-5 w-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-sm leading-6 hover:text-white transition-colors">
                  <svg className="h-5 w-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-sm leading-6">Челябинская область,<br />работаем по всей России</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center flex-col md:flex-row text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {BRAND.legalName}. Все права защищены.</p>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
