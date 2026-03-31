import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BRAND } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-6 py-32">
        <div className="text-center max-w-lg">
          <p className="text-8xl font-extrabold text-red-600 mb-4">404</p>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">
            Страница не найдена
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Такой страницы не существует или она была перемещена.
            Вернитесь на главную или позвоните нам напрямую.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              id="not-found-home"
              className="rounded-lg bg-red-600 px-8 py-3 text-base font-bold text-white shadow-sm hover:bg-red-700 transition-colors"
            >
              На главную
            </Link>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              id="not-found-call"
              className="rounded-lg bg-slate-100 px-8 py-3 text-base font-bold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              📞 Позвонить
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
