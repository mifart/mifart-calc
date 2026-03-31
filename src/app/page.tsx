import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Advantages } from "@/components/sections/Advantages";
import { Services } from "@/components/sections/Services";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Portfolio } from "@/components/sections/Portfolio";
import { Calculator } from "@/components/sections/Calculator";
import { Testimonials } from "@/components/sections/Testimonials";
import { BotLinks } from "@/components/sections/BotLinks";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Contacts } from "@/components/Contacts";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-200">
      <Header />
      <main>
        {/* Главный экран */}
        <Hero />
        {/* Преимущества */}
        <Advantages />
        {/* Услуги / Каталог */}
        <Services />
        {/* Как мы работаем */}
        <HowWeWork />
        {/* Портфолио проектов */}
        <Portfolio />
        {/* Калькулятор стоимости */}
        <Calculator />
        {/* Отзывы клиентов */}
        <Testimonials />
        {/* Ссылки на боты */}
        <BotLinks />
        {/* Финальный CTA */}
        <FinalCTA />
        {/* Контакты и карта */}
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}