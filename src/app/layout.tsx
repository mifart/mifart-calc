import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mifart.ru"),
  title: {
    default: `${BRAND.name} — Каркасные дома, бани и беседки под ключ в Челябинске`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Строительство каркасных домов, бань, беседок и малых архитектурных форм под ключ в Челябинске и по всей России. Фиксированная цена, реальные сроки, договор. Звоните: +7 (995) 380-08-88",
  keywords: [
    "каркасные дома Челябинск",
    "бани под ключ Челябинск",
    "беседки Челябинск",
    "строительство каркасных домов",
    "МИФАРТ",
    "дома под ключ",
    "каркасное строительство",
  ],
  authors: [{ name: BRAND.legalName }],
  creator: BRAND.legalName,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://mifart.ru",
    siteName: BRAND.name,
    title: `${BRAND.name} — Каркасные дома, бани и беседки под ключ`,
    description:
      "Строим каркасные дома, бани и беседки под ключ в Челябинске. Фиксированная цена в договоре. Реальные сроки.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  return (
    <html lang="ru" className={inter.variable}>
      <head>
        {metrikaId && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                  ym(${metrikaId}, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                  });
                `,
              }}
            />
            <noscript>
              <div>
                <img
                  src={`https://mc.yandex.ru/watch/${metrikaId}`}
                  style={{ position: "absolute", left: "-9999px" }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        )}
      </head>
      <body className="bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
