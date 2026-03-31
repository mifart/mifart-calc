// ============================================================
// Библиотека расчёта свайного поля
// Экспортируется для использования в компонентах и API
// ============================================================

import type { PileInputs, PileGridResult, PileDiameter } from "@/types/pile";

// --- Таблица нагрузок ---------------------------------------
export const LOAD_PRESETS = {
  gazebo: { name: "Беседка / лёгкое строение", min: 150, max: 200, recommended: 180 },
  terrace: { name: "Терраса / навес", min: 180, max: 250, recommended: 220 },
  bath: { name: "Баня", min: 250, max: 350, recommended: 300 },
  house_light: { name: "Каркасный дом (1 этаж)", min: 300, max: 450, recommended: 350 },
  house_heavy: { name: "Каркасный дом (с мансардой / 2 этаж)", min: 400, max: 550, recommended: 450 },
  utility: { name: "Хозблок", min: 200, max: 300, recommended: 250 },
} as const;

// --- Коэффициенты доп. нагрузок ----------------------------
export const LOAD_FACTORS = {
  default: 1.2,
  heavy_equipment: 1.1, // печь / тяжёлое оборудование
  attic: 1.15,           // мансарда / 2 этаж
  snow: 1.1,             // усиленная снеговая нагрузка
} as const;

// --- Цены свай ---------------------------------------------
export const PILE_PRICES: Record<number, number> = {
  76: 6000,
  89: 7500,
  108: 10000,
};

// Максимальный шаг между сваями (мм)
export const MAX_PILE_STEP_MM = 2500;

// --- Расчёт нагрузки ---------------------------------------
function calculateLoad(inputs: PileInputs): {
  area_m2: number;
  load_per_m2: number;
  factor: number;
  total_load_kg: number;
} {
  const area_m2 = (inputs.length_mm / 1000) * (inputs.width_mm / 1000);
  const baseLoad = inputs.customLoad ?? LOAD_PRESETS[inputs.preset].recommended;

  let factor = LOAD_FACTORS.default;
  if (inputs.hasStove) factor *= LOAD_FACTORS.heavy_equipment;
  if (inputs.hasAttic) factor *= LOAD_FACTORS.attic;
  if (inputs.highSnow) factor *= LOAD_FACTORS.snow;

  const total_load_kg = area_m2 * baseLoad * factor;
  return { area_m2, load_per_m2: baseLoad, factor, total_load_kg };
}

// --- Построение сетки -------------------------------------
function buildGrid(length_mm: number, width_mm: number) {
  const count_x = Math.ceil(length_mm / MAX_PILE_STEP_MM) + 1;
  const count_y = Math.ceil(width_mm / MAX_PILE_STEP_MM) + 1;
  const step_x_mm = length_mm / (count_x - 1);
  const step_y_mm = width_mm / (count_y - 1);
  const pile_count = count_x * count_y;
  return { count_x, count_y, step_x_mm, step_y_mm, pile_count };
}

// --- Подбор диаметра --------------------------------------
function selectDiameter(total_load_kg: number, pile_count: number): {
  diameter: PileDiameter;
  price_per_pile: number;
} {
  const loadPerPile = total_load_kg / pile_count;
  if (loadPerPile <= 2000) return { diameter: 76, price_per_pile: 6000 };
  if (loadPerPile <= 3000) return { diameter: 89, price_per_pile: 7500 };
  return { diameter: 108, price_per_pile: 10000 };
}

// --- ГЛАВНАЯ ФУНКЦИЯ --------------------------------------
/**
 * Выполняет полный расчёт свайного поля по входным данным
 */
export function calculatePileField(inputs: PileInputs): PileGridResult {
  const warnings: string[] = [];

  const { area_m2, load_per_m2, factor, total_load_kg } = calculateLoad(inputs);
  const grid = buildGrid(inputs.length_mm, inputs.width_mm);
  const { diameter, price_per_pile } = selectDiameter(total_load_kg, grid.pile_count);

  const total_price = grid.pile_count * price_per_pile;

  // Предупреждения
  const loadPerPile = total_load_kg / grid.pile_count;
  if (loadPerPile > 4000) {
    warnings.push("Нагрузка на сваю очень высокая. Рекомендуем инженерную консультацию.");
  }
  if (inputs.hasAttic && inputs.hasStove) {
    warnings.push("Высокая суммарная нагрузка. Рекомендуем Ø108 и осмотр геологии.");
  }
  if (grid.step_x_mm > 2400 || grid.step_y_mm > 2400) {
    warnings.push("Шаг между сваями близок к максимально допустимому (2500 мм).");
  }

  return {
    area_m2,
    load_per_m2,
    factor,
    total_load_kg,
    ...grid,
    diameter,
    price_per_pile,
    total_price,
    warnings,
  };
}

/**
 * Возвращает читаемое название типа объекта для формы
 */
export function getPresetLabel(preset: keyof typeof LOAD_PRESETS): string {
  return LOAD_PRESETS[preset].name;
}

/**
 * Форматирует мм в метры для отображения
 */
export function mmToM(mm: number): string {
  return (mm / 1000).toFixed(1) + " м";
}
