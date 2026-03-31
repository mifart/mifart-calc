import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика обработки персональных данных ООО «МИФАРТ» в соответствии с ФЗ-152.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  const date = "01 января 2024";
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main className="pt-32 pb-24 sm:pt-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-2">
            Политика конфиденциальности
          </h1>
          <p className="text-sm text-slate-500 mb-10">Последнее обновление: {date}</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Общие положения</h2>
              <p>
                Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки
                персональных данных пользователей сайта <strong>mifart.ru</strong>, принадлежащего
                {" "}{BRAND.legalName} (далее — «Оператор»).
              </p>
              <p className="mt-3">
                Оператор обрабатывает персональные данные в соответствии с Федеральным законом
                №152-ФЗ «О персональных данных» от 27 июля 2006 года.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Какие данные мы собираем</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Имя и фамилия (при заполнении формы)</li>
                <li>Номер телефона</li>
                <li>Адрес электронной почты (при заполнении формы)</li>
                <li>Данные о посещении сайта (через Яндекс.Метрику)</li>
                <li>UTM-метки и источник перехода</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Цели обработки данных</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Обратная связь и обработка обращений пользователей</li>
                <li>Подготовка коммерческого предложения</li>
                <li>Улучшение качества работы сайта и сервиса</li>
                <li>Аналитика посещений для оптимизации контента</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Хранение и защита данных</h2>
              <p>
                Персональные данные хранятся на защищённых серверах. Оператор принимает технические
                и организационные меры для защиты данных от несанкционированного доступа,
                изменения, раскрытия или уничтожения.
              </p>
              <p className="mt-3">
                Данные не передаются третьим лицам без согласия пользователя, за исключением случаев,
                предусмотренных действующим законодательством РФ.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Cookies</h2>
              <p>
                Сайт использует файлы cookies для улучшения пользовательского опыта и аналитики.
                Пользователь вправе настроить браузер таким образом, чтобы отказаться от приёма cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Права пользователя</h2>
              <p>
                Пользователь вправе в любое время отозвать согласие на обработку персональных данных,
                направив соответствующий запрос на электронную почту{" "}
                <a href={`mailto:${BRAND.email}`} className="text-red-600 underline">{BRAND.email}</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Контакты оператора</h2>
              <dl className="space-y-2 text-sm">
                <div className="flex gap-2"><dt className="font-semibold">Организация:</dt><dd>{BRAND.legalName}</dd></div>
                <div className="flex gap-2"><dt className="font-semibold">Телефон:</dt><dd><a href={`tel:${BRAND.phoneRaw}`} className="text-red-600 hover:underline">{BRAND.phone}</a></dd></div>
                <div className="flex gap-2"><dt className="font-semibold">Email:</dt><dd><a href={`mailto:${BRAND.email}`} className="text-red-600 hover:underline">{BRAND.email}</a></dd></div>
              </dl>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
