// ============================================================
// Константы бренда МИФАРТ — единый источник правды
// ============================================================

export const BRAND = {
  name: "МИФАРТ",
  legalName: "ООО «МИФАРТ»",
  phone: "+7 (995) 380-08-88",
  phoneRaw: "+79953800888",
  formattedPhone: "8 995 380 08 88",
  email: "mifart74@gmail.com",
  site: "https://mifart.ru",
  vk: "https://vk.com/mif174",
  telegram: "https://t.me/mifart_chelябинск", // заменить на реальный
  max: "https://max.ru/join/bxAevFcfO5-PMZfo4AfgtcSifh8bf5bMhhU_zeZ6e8E",
  region: "Челябинская область",
  tagline: "Каркасные дома, бани и беседки под ключ",
  subTagline: "Фиксируем цену. Строим по договору. Реальные сроки. Реальные объекты.",
  shortTagline: "Строим дома, бани и беседки под ключ в Челябинске и по всей России",
  colors: {
    primary: "#E30613",    // Акцентный красный
    graphite: "#1A1C1E",   // Темно-графитовый
    background: "#FFFFFF", // Белый
  },
} as const;

// Услуги
export const SERVICES = [
  {
    id: "house",
    name: "Каркасные дома",
    nameShort: "Дом",
    emoji: "🏠",
    href: "/doma",
    basePrice: 35000, // руб/м²
    description: "Быстровозводимые каркасные дома для постоянного проживания и дачного отдыха",
    minArea: 36,
    maxArea: 300,
    avgTime: "45–90 дней",
  },
  {
    id: "bath",
    name: "Бани и сауны",
    nameShort: "Баня",
    emoji: "🛁",
    href: "/bani",
    basePrice: 35000,
    description: "Каркасные бани и рубленые бани из бруса с комнатой отдыха и террасой",
    minArea: 16,
    maxArea: 80,
    avgTime: "20–45 дней",
  },
  {
    id: "gazebo",
    name: "Беседки и малые формы",
    nameShort: "Беседка",
    emoji: "🌳",
    href: "/besedki",
    basePrice: 13000,
    description: "Открытые и закрытые беседки, навесы, веранды и малые архитектурные формы",
    minArea: 10,
    maxArea: 50,
    avgTime: "7–21 день",
  },
  {
    id: "custom",
    name: "Индивидуальные проекты",
    nameShort: "Индивидуальный",
    emoji: "📐",
    href: "/proekty",
    basePrice: 35000,
    description: "Разработка и строительство по индивидуальному проекту с нуля",
    minArea: 50,
    maxArea: 500,
    avgTime: "60–180 дней",
  },
] as const;

// Преимущества
export const ADVANTAGES = [
  {
    title: "Фиксированная смета",
    text: "Цена прописывается в договоре перед началом работ и не меняется в процессе строительства.",
  },
  {
    title: "Строго по ГОСТ и СНиП",
    text: "Соблюдаем все строительные нормы. Контроль качества на каждом этапе.",
  },
  {
    title: "Экологичные материалы",
    text: "Сертифицированная древесина камерной сушки и безопасный утеплитель.",
  },
  {
    title: "Реальные сроки",
    text: "Сдаем объекты вовремя. Сроки прописываем в договоре и несем за них ответственность.",
  },
  {
    title: "Работаем по договору",
    text: "Официальный договор, гарантия на все выполненные работы.",
  },
  {
    title: "Собственное производство",
    text: "Собственная производственная база в Челябинске, без посредников.",
  },
] as const;

// Разрядность цен в русском формате
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price);
}

// Источники заявок
export const LEAD_SOURCES = [
  "website",
  "telegram",
  "max",
  "vk",
  "miniapp",
] as const;

export type LeadSource = typeof LEAD_SOURCES[number];

// Типы услуг
export type ServiceId = typeof SERVICES[number]["id"];
