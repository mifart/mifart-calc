"use client";
import { useState, useEffect, ReactNode } from "react";
import { IMaskInput } from "react-imask";
import { Logs, Home, Bath, Trees, Carport, Sprout, HardHat, Layers, Truck, Share2, Paperclip, X, Image as ImageIcon, FileText, File } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

/* --- CONSTANTS ----------------------------------- */
const PHONE = "+7 (995) 380-08-88";
const DEFAULT_REGION = "Челябинская область";

const SERVICES = [
  { id: "piles", icon: <Logs />, label: "Сваи", desc: "Винтовые сваи под любой объект" },
  { id: "house", icon: <Home />, label: "Каркасный дом", desc: "Строительство под ключ" },
  { id: "bath", icon: <Bath />, label: "Баня", desc: "Каркасные бани" },
  { id: "gazebo", icon: <Trees />, label: "Беседка / Терраса", desc: "Беседки, террасы, веранды" },
  { id: "canopy", icon: <Carport />, label: "Навес", desc: "Навесы для авто и техники" },
  { id: "landscape", icon: <Sprout />, label: "Благоустройство", desc: "Озеленение, площадки, заборы" },
  { id: "asphalt", icon: <HardHat />, label: "Асфальтирование", desc: "Укладка асфальта" },
  { id: "covering", icon: <Layers />, label: "Покрытия", desc: "Срезка, гранула, крошка" },
  { id: "cargo", icon: <Truck />, label: "Грузоперевозки", desc: "Газель до 6 м · до 2500 кг" },
];

const PACKAGES: Record<string, Array<{ id: string; label: string; price: number; roof: string; items: string[] }>> = {
  house: [
    {
      id: "eco", label: "Эконом", price: 35000,
      roof: "Один скат — профлист",
      items: ["Один скат кровли", "Профлист", "Утепление 100 мм", "Стандартные окна ПВХ"]
    },
    {
      id: "std", label: "Стандарт", price: 42000,
      roof: "Два ската — профлист / металлочерепица",
      items: ["Два ската кровли", "Профлист или металлочерепица", "Утепление 100 мм", "Окна ПВХ стандарт"]
    },
    {
      id: "prem", label: "Премиум", price: 58000,
      roof: "Мягкая кровля · выносы · тёплый профиль",
      items: ["Мягкая кровля", "Выносы кровли", "Тёплый профиль на окнах", "Материалы выше класса эконом", "Утепление 200 мм"]
    },
  ],
  bath: [
    {
      id: "eco", label: "Эконом", price: 35000,
      roof: "Один скат — профлист",
      items: ["Один скат кровли", "Профлист", "Утепление 100 мм", "Стандартные окна ПВХ"]
    },
    {
      id: "std", label: "Стандарт", price: 42000,
      roof: "Два ската — профлист / металлочерепица",
      items: ["Два ската кровли", "Профлист или металлочерепица", "Утепление 100 мм", "Окна ПВХ стандарт"]
    },
    {
      id: "prem", label: "Премиум", price: 58000,
      roof: "Мягкая кровля · выносы · тёплый профиль",
      items: ["Мягкая кровля", "Выносы кровли", "Тёплый профиль на окнах", "Материалы выше класса эконом", "Утепление 200 мм"]
    },
  ],
  gazebo: [
    {
      id: "eco", label: "Эконом", price: 13000,
      roof: "Один скат — профлист",
      items: ["Один скат кровли", "Профлист", "Открытые или зашитые стены", "Стандартный каркас"]
    },
    {
      id: "std", label: "Стандарт", price: 20000,
      roof: "Два ската — профлист / металлочерепица",
      items: ["Два ската кровли", "Профлист или металлочерепица", "Обрешётка", "Улучшенный каркас"]
    },
    {
      id: "prem", label: "Премиум", price: 28000,
      roof: "Мягкая кровля · выносы",
      items: ["Мягкая кровля", "Выносы кровли", "Декоративная отделка", "Материалы выше класса эконом"]
    },
  ],
};

/* нагрузки кг/м² */
const LOAD_MAP: Record<string, number> = { piles: 300, house: 350, bath: 300, gazebo: 180, canopy: 220 };
const PILE_P: Record<number, number> = { 76: 6000, 89: 7600, 108: 9800 };

/* --- I18N DICTIONARY ----------------------------- */
const DICTIONARY = {
  ru: {
    what: "ЧТО",
    build: "СТРОИМ?",
    selectService: "Узнайте точную стоимость под ключ", // JTBD: Акцент на пользе для клиента
    back: "← Назад",
    btnCalc: "РАССЧИТАТЬ →",
    btnClarify: "УТОЧНИТЬ СТОИМОСТЬ →",
    btnSubmit: "ОТПРАВИТЬ ЗАЯВКУ 🔥",
    btnNew: "← Новый расчёт",
    nameLabel: "Ваше имя",
    phoneLabel: "Номер телефона",
    namePh: "Иван Иванов",
    phonePh: "+7 (___) ___-__-__",
    attachLabel: "Прикрепить проект или фото",
    chooseFile: "Выбрать файл...",
    formTitle: "ОСТАВИТЬ ЗАЯВКУ",
    successTitle: "ЗАЯВКА ПРИНЯТА!",
    successDesc: "Свяжемся в течение 15 минут",
    shareBtn: "Поделиться расчётом",
    resultTitle: "РЕЗУЛЬТАТ",
  }
};
const t = DICTIONARY["ru"];

/* --- PILE CALCULATOR ----------------------------- */
interface PileResult {
  cntX: number; cntY: number; stepX: number; stepY: number;
  total: number; diam: number; price: number; area: string;
}

function calcPiles(data: {
  lM: number; wM: number; svcId: string; heavy: boolean; mansard: boolean; snow: boolean;
}): PileResult {
  const lMm = data.lM * 1000, wMm = data.wM * 1000, maxS = 2500;
  const cntX = Math.ceil(lMm / maxS) + 1;
  const cntY = Math.ceil(wMm / maxS) + 1;
  const total = cntX * cntY;
  const stepX = Math.round(lMm / (cntX - 1));
  const stepY = Math.round(wMm / (cntY - 1));
  const area = data.lM * data.wM;
  let coeff = 1.2;
  if (data.heavy) coeff *= 1.1;
  if (data.mansard) coeff *= 1.15;
  if (data.snow) coeff *= 1.1;
  const loadPerPile = (area * (LOAD_MAP[data.svcId] || 300) * coeff) / total;
  let diam = 76;
  if (loadPerPile > 4000) diam = 89;
  if (loadPerPile > 7000) diam = 108;
  return { cntX, cntY, stepX, stepY, total, diam, price: total * PILE_P[diam], area: area.toFixed(1) };
}

/* --- SVG СВАЙНОЕ ПОЛЕ ----------------------------- */
function PileGrid({ cntX, cntY, stepX, stepY, diam }: {
  cntX: number; cntY: number; stepX: number; stepY: number; diam: number;
}) {
  const W = 340, H = 240;
  const mL = 48, mT = 14, mR = 20, mB = 46;
  const gridW = W - mL - mR;
  const gridH = H - mT - mB;

  const sx = cntX > 1 ? gridW / (cntX - 1) : gridW;
  const sy = cntY > 1 ? gridH / (cntY - 1) : gridH;

  const minStep = Math.min(sx, sy);
  const pr = Math.max(4, Math.min(10, minStep * 0.28));

  const px = (j: number) => mL + j * sx;
  const py = (i: number) => mT + i * sy;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="max-w-[340px] block mx-auto">
      <defs>
        <marker id="ah" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.4)" />
        </marker>
        <marker id="aht" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6 Z" fill="rgba(255,255,255,0.4)" />
        </marker>
      </defs>

      <rect x="0" y="0" width={W} height={H} rx="10"
        fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      <rect x={mL} y={mT} width={gridW} height={gridH} rx="3"
        fill="rgba(220,38,38,0.04)" stroke="rgba(220,38,38,0.35)" strokeWidth="1.5"
        strokeDasharray="6 3" />

      {Array.from({ length: cntX }, (_, j) => (
        <line key={`v${j}`} x1={px(j)} y1={mT} x2={px(j)} y2={mT + gridH}
          stroke="rgba(255,255,255,0.05)" strokeWidth="1" />))}
      {Array.from({ length: cntY }, (_, i) => (
        <line key={`h${i}`} x1={mL} y1={py(i)} x2={mL + gridW} y2={py(i)}
          stroke="rgba(255,255,255,0.05)" strokeWidth="1" />))}

      {cntX > 1 && Array.from({ length: cntX - 1 }, (_, j) => {
        const x1 = px(j), x2 = px(j + 1), y = mT + gridH + 18;
        const mx = (x1 + x2) / 2;
        return (
          <g key={`dx${j}`}>
            <line x1={x1 + pr + 1} y1={y} x2={x2 - pr - 1} y2={y}
              stroke="rgba(255,255,255,0.35)" strokeWidth="1"
              markerEnd="url(#ah)" markerStart="url(#aht)" />
            <text x={mx} y={y + 10} textAnchor="middle"
              fill="rgba(255,255,255,0.55)" fontSize="8.5"
              fontFamily="Manrope,sans-serif" fontWeight="600">
              {stepX}
            </text>
          </g>
        );
      })}

      {cntY > 1 && Array.from({ length: cntY - 1 }, (_, i) => {
        const y1 = py(i), y2 = py(i + 1), x = mL - 16;
        const my = (y1 + y2) / 2;
        return (
          <g key={`dy${i}`}>
            <line x1={x} y1={y1 + pr + 1} x2={x} y2={y2 - pr - 1}
              stroke="rgba(255,255,255,0.35)" strokeWidth="1"
              markerEnd="url(#ah)" markerStart="url(#aht)" />
            <text x={x - 3} y={my + 3} textAnchor="middle"
              fill="rgba(255,255,255,0.55)" fontSize="8.5"
              fontFamily="Manrope,sans-serif" fontWeight="600"
              transform={`rotate(-90,${x - 3},${my + 3})`}>
              {stepY}
            </text>
          </g>
        );
      })}

      {Array.from({ length: cntY }, (_, i) => Array.from({ length: cntX }, (_, j) => (
        <g key={`p${i}-${j}`}>
          <circle cx={px(j)} cy={py(i)} r={pr + 3}
            fill="rgba(220,38,38,0.18)" stroke="none" />
          <circle cx={px(j)} cy={py(i)} r={pr}
            fill="rgba(220,38,38,0.3)" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx={px(j)} cy={py(i)} r={pr * 0.38} fill="#ef4444" />
        </g>
      )))}

      <text x={mL + 4} y={mT - 3} fill="rgba(255,255,255,0.3)"
        fontSize="8" fontFamily="Manrope,sans-serif">А1</text>
      <text x={mL + gridW - 12} y={mT - 3} fill="rgba(255,255,255,0.3)"
        fontSize="8" fontFamily="Manrope,sans-serif">А{cntX}</text>

      <text x={W / 2} y={H - 4} textAnchor="middle"
        fill="rgba(255,255,255,0.28)" fontSize="9.5"
        fontFamily="Manrope,sans-serif" fontWeight="700">
        {cntX}×{cntY} = {cntX * cntY} свай · Ø{diam} мм · вид сверху
      </text>
    </svg>
  );
}

/* --- LOGO SVG — по фото ---------------------------- */
function Logo({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* ── КРАСНАЯ ПЛАШКА "МИФАРТ" ── */}
      <rect x="8" y="60" width="84" height="30" rx="4" fill="#dc2626" />
      <rect x="8" y="60" width="84" height="10" rx="4" fill="rgba(255,255,255,0.15)" />
      <text x="50" y="82" textAnchor="middle" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize="19" letterSpacing="1.5" fill="#f1f5f9">
        МИФАРТ
      </text>

      {/* ── ИКОНКА СВАЙ (3 колонны) ── */}
      <rect x="14" y="22" width="14" height="38" rx="3" fill="#262626" transform="rotate(-10 21 41)" />
      <rect x="33" y="14" width="14" height="44" rx="3" fill="#333333" />
      <rect x="52" y="22" width="14" height="38" rx="3" fill="#262626" transform="rotate(10 59 41)" />

      {/* ── ЗЕЛЁНЫЙ ЛИСТ ── */}
      <line x1="40" y1="14" x2="44" y2="5" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M44,5 C52,-2 64,2 58,12 C54,18 44,16 44,5 Z" fill="#22c55e" />
      <path d="M44,5 C50,8 56,9 58,12" stroke="#15803d" strokeWidth="0.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* --- УТИЛИТЫ -------------------------------------- */
const fmtPr = (n: number) => n.toLocaleString("ru-RU") + " ₽";
const haptic = () => { if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(15); };

const tw = {
  lbl: "text-[11px] font-bold tracking-[1.5px] uppercase text-[#666] block mb-[7px]",
  inp: "bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl px-4 py-[13px] text-[15px] font-[inherit] text-[#f0f0f0] outline-none w-full box-border focus:border-red-600 transition-colors",
  sel: "bg-[#181a21] border-[1.5px] border-white/10 rounded-xl px-4 py-[13px] text-[15px] font-[inherit] text-[#f0f0f0] outline-none w-full appearance-none box-border focus:border-red-600 transition-colors",
  ta: "bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl px-4 py-[13px] text-[14px] font-[inherit] text-[#f0f0f0] outline-none w-full resize-y min-h-[72px] box-border focus:border-red-600 transition-colors",
  red: "w-full p-[17px] bg-red-600 border-none rounded-[14px] font-['Bebas_Neue',sans-serif] text-[21px] tracking-[2px] text-white cursor-pointer block hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
  ghost: "w-full p-[14px] bg-transparent border-[1.5px] border-white/10 rounded-xl font-[inherit] text-[13px] font-semibold text-[#666] cursor-pointer mt-2 hover:brightness-110 active:scale-95 transition-all",
};

function Fld({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="mb-[15px]">
      {label && <label className={tw.lbl}>{label}</label>}
      {children}
    </div>
  );
}

function Chk({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-[10px] py-[11px] px-[14px] bg-white/[0.04] rounded-[10px] border border-white/[0.06] cursor-pointer">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        className="accent-red-600 w-[18px] h-[18px]" />
      <span className="text-[14px] text-[#ccc]">{label}</span>
    </label>
  );
}

/* --- ПАКЕТ-КАРТОЧКА ------------------------------- */
function PkgCard({ pkg, selected, onSelect, area }: {
  pkg: { id: string; label: string; price: number; roof: string; items: string[] };
  selected: boolean; onSelect: () => void; area: string;
}) {
  const total = pkg.price * (parseFloat(area) || 0);
  const accentCls = { eco: "text-slate-500", std: "text-blue-700", prem: "text-red-600" }[pkg.id as "eco" | "std" | "prem"] || "text-slate-500";
  const bgAccentCls = { eco: "bg-slate-500", std: "bg-blue-700", prem: "bg-red-600" }[pkg.id as "eco" | "std" | "prem"] || "bg-slate-500";
  const borderCls = selected
    ? { eco: "border-slate-500 bg-slate-500/10", std: "border-blue-700 bg-blue-700/10", prem: "border-red-600 bg-red-600/10" }[pkg.id as "eco" | "std" | "prem"]
    : "border-white/[0.08] bg-white/[0.03]";

  return (
    <div onClick={() => { haptic(); onSelect(); }} className={`border-2 rounded-[14px] p-4 cursor-pointer transition-all duration-150 ${borderCls}`}>
      <div className="flex items-center justify-between mb-[10px]">
        <div className="flex items-center gap-2">
          {selected && <div className={`w-2 h-2 rounded-full ${bgAccentCls}`} />}
          <span className="font-['Bebas_Neue',sans-serif] text-[20px] tracking-[1px]">
            {pkg.label}
          </span>
        </div>
        <span className={`px-[10px] py-[3px] rounded-[20px] text-[12px] font-bold text-white ${bgAccentCls}`}>
          {fmtPr(pkg.price)}/м²
        </span>
      </div>
      <div className="text-[12px] text-[#888] mb-[10px] leading-[1.5] px-[10px] py-2 bg-white/[0.04] rounded-lg">
        🏗 {pkg.roof}
      </div>
      {pkg.items.map(it => (
        <div key={it} className="text-[12px] text-[#666] flex gap-[6px] mb-1">
          <span className={`shrink-0 ${accentCls}`}>•</span>{it}
        </div>
      ))}
      {selected && parseFloat(area) > 0 && (
        <div className={`mt-3 px-3 py-[10px] rounded-[10px] flex justify-between items-center ${{ eco: "bg-slate-500/20", std: "bg-blue-700/20", prem: "bg-red-600/20" }[pkg.id as "eco" | "std" | "prem"]}`}>
          <span className="text-[12px] text-[#aaa]">Итого ~ {area} м²</span>
          <span className="font-['Bebas_Neue',sans-serif] text-[20px] text-white">
            {fmtPr(Math.round(total))}
          </span>
        </div>
      )}
    </div>
  );
}

/* --- LAYOUT SHELL -------------------------------- */
const Shell = ({ children, back, bs, onBack }: { children: React.ReactNode; back?: boolean; bs?: Screen; onBack?: () => void }) => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;600;700;800&display=swap');
    `}</style>
    <div className="relative max-w-[480px] mx-auto min-h-[100dvh] bg-[#0a0a0c] flex flex-col font-['Manrope',sans-serif] text-[#f0f0f0] overscroll-none overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.05)]">

      {/* ── АМБИЕНТНЫЙ ФОН (ХУК ПРИТЯГИВАНИЯ) ── */}
      <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[40%] bg-red-600/10 blur-[100px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 flex items-center gap-3 pt-[18px] px-5 shrink-0">
        <Logo size={52} />
        <div>
          <div className="font-['Bebas_Neue',sans-serif] text-[26px] tracking-[3px] leading-none">
            МИФ<span className="text-red-600">АРТ</span>
          </div>
          <div className="text-[10px] text-[#555] tracking-[1px] font-bold">{DEFAULT_REGION}</div>
        </div>
        {back && (
          <button onClick={() => { haptic(); if (onBack) onBack(); }}
            className="ml-auto bg-white/[0.06] border-none text-[#888] py-2 px-[14px] rounded-lg text-[13px] font-[inherit] hover:bg-white/[0.1] active:scale-95 transition-all backdrop-blur-sm">
            {t.back}
          </button>
        )}
      </div>
      <div className="relative z-10 h-[3px] bg-gradient-to-r from-red-600 to-transparent mt-[13px] mx-5 rounded-sm shrink-0" />
      {/* CONTENT */}
      <motion.div
        className="relative z-10 flex-1 overflow-y-auto pt-5 px-5 pb-12 flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  </>
);

/* --- LEAD FORM ----------------------------------- */
function LeadForm({ name, onNameChange, phone, onPhoneChange, fileName, onFileChange, onFileRemove, onSubmit, onReset, disabled }: {
  name: string; onNameChange: (v: string) => void;
  phone: string; onPhoneChange: (v: string) => void;
  fileName: string; onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: () => void;
  onSubmit: () => void; onReset: () => void; disabled: boolean;
}) {
  let IconComponent = Paperclip;
  if (fileName) {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) IconComponent = ImageIcon;
    else if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'xls', 'xlsx'].includes(ext)) IconComponent = FileText;
    else IconComponent = File;
  }

  return (
    <div className="relative z-10 bg-white/[0.03] border border-white/10 rounded-2xl p-5 mt-4 backdrop-blur-md shadow-lg">
      <div className="font-['Bebas_Neue',sans-serif] text-[22px] tracking-[1px] mb-[14px]">
        {t.formTitle}
      </div>
      <Fld label={t.nameLabel}>
        <input className={tw.inp} placeholder={t.namePh} value={name} onChange={e => onNameChange(e.target.value)} />
      </Fld>
      <Fld label={t.phoneLabel}>
        <IMaskInput
          mask={'+{7} (000) 000-00-00'}
          value={phone}
          onAccept={(value) => onPhoneChange(value as string)}
          className={tw.inp}
          placeholder={t.phonePh}
          inputMode="tel"
        />
      </Fld>
      <Fld label={t.attachLabel}>
        <div className="relative">
          <input type="file" id="file-upload" className="hidden" onChange={onFileChange} />
          <label htmlFor="file-upload" className="flex items-center gap-3 p-[13px] bg-white/[0.04] border border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/[0.08] transition-colors">
            <IconComponent size={18} className="text-[#888] shrink-0" />
            <span className="text-[14px] text-[#ccc] truncate flex-1">
              {fileName || t.chooseFile}
            </span>
            {fileName && (
              <button onClick={(e) => { e.preventDefault(); haptic(); onFileRemove(); }} className="text-red-400 hover:text-red-300 p-1 shrink-0 transition-colors">
                <X size={16} />
              </button>
            )}
          </label>
        </div>
      </Fld>
      <button className={`${tw.red} mt-1`} onClick={() => { haptic(); onSubmit(); }} disabled={disabled}>
        {t.btnSubmit}
      </button>
      <button className={tw.ghost} onClick={() => { haptic(); onReset(); }}>{t.btnNew}</button>
    </div>
  );
}

/* ===================================================
   MAIN APP
=================================================== */
type Screen = "home" | "form_piles" | "form_house" | "form_bath" | "form_gazebo" | "form_canopy" |
  "form_landscape" | "form_asphalt" | "form_covering" | "form_cargo" | "result";

interface Service {
  id: string;
  icon: ReactNode;
  label: string;
  desc: string;
}
type Svc = Service | null;

/* --- INITIAL STATES ------------------------------ */
const initialPilesForm = { l: "", w: "", heavy: false, mansard: false, snow: false };
const initialBuildForm = { l: "", w: "", h: "", pkg: "std", kit: "" };
const initialIndividualForm = { area: "", comment: "" };
const initialCargoForm = { from: "", to: "", cargo: "", l: "", w: "", load: false, urgent: false, error: "" };
const initialLeadForm = { name: "", phone: "", file: null as File | null, fileName: "" };

export default function MifartMiniApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [svc, setSvc] = useState<Svc>(null);
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  /* ── FORM STATES ──────────────────────────────── */
  const [pilesForm, setPilesForm] = useState(initialPilesForm);
  const [pilesResult, setPilesResult] = useState<PileResult | null>(null);

  const [buildForm, setBuildForm] = useState(initialBuildForm);
  const [individualForm, setIndividualForm] = useState(initialIndividualForm);
  const [cargoForm, setCargoForm] = useState(initialCargoForm);
  const [leadForm, setLeadForm] = useState(initialLeadForm);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("mifart_calc_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.pilesForm) setPilesForm(parsed.pilesForm);
        if (parsed.buildForm) setBuildForm(parsed.buildForm);
        if (parsed.individualForm) setIndividualForm(parsed.individualForm);
        if (parsed.cargoForm) setCargoForm(parsed.cargoForm);
        // Файл не сохраняем в JSON, восстанавливаем только текст
        if (parsed.leadForm) setLeadForm({ ...initialLeadForm, name: parsed.leadForm.name, phone: parsed.leadForm.phone });
      } catch (e) { }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      const handler = setTimeout(() => {
        localStorage.setItem("mifart_calc_data", JSON.stringify({
          pilesForm, buildForm, individualForm, cargoForm, leadForm: { name: leadForm.name, phone: leadForm.phone }
        }));
      }, 800); // Задержка записи в 800мс
      return () => clearTimeout(handler);
    }
  }, [isMounted, pilesForm, buildForm, individualForm, cargoForm, leadForm.name, leadForm.phone]);

  const reset = () => {
    setScreen("home"); setSvc(null);
    setPilesForm(initialPilesForm); setPilesResult(null);
    setBuildForm(initialBuildForm);
    setIndividualForm(initialIndividualForm);
    setCargoForm(initialCargoForm);
    setLeadForm(initialLeadForm);
    setIsSubmitting(false);
    localStorage.removeItem("mifart_calc_data");
  };

  const open = (s: typeof SERVICES[number]) => { setSvc(s); setScreen(("form_" + s.id) as Screen); };

  /* живой расчёт свай */
  const pilePreview = (form: typeof pilesForm) => {
    if (!form.l || !form.w) return null;
    return calcPiles({ lM: parseFloat(form.l), wM: parseFloat(form.w), svcId: "piles", ...form });
  };

  /* строения */
  const calcArea = () => { const l = parseFloat(buildForm.l), w = parseFloat(buildForm.w); return (l && w) ? (l * w).toFixed(1) : "0"; };
  const calcPrice = () => {
    const pkgs = PACKAGES[svc?.id || ""] || [];
    const p = pkgs.find(p => p.id === buildForm.pkg);
    return p ? Math.round(p.price * parseFloat(calcArea())) : 0;
  };
  const curPkg = () => (PACKAGES[svc?.id || ""] || []).find(p => p.id === buildForm.pkg);

  /* грузоперевозки */
  const handleCargo = () => {
    const l = parseFloat(cargoForm.l), w = parseFloat(cargoForm.w);
    if (l > 6) { setCargoForm(s => ({ ...s, error: "Длина груза превышает 6 м. Оставьте заявку — подберём решение." })); return; }
    if (w > 2500) { setCargoForm(s => ({ ...s, error: "Вес груза превышает 2500 кг. Оставьте заявку — подберём решение." })); return; }
    setCargoForm(s => ({ ...s, error: "" })); setScreen("result");
  };

  /* --- ОТПРАВКА ЗАЯВКИ В МЕССЕНДЖЕР MAX --- */
  const handleSendLead = async () => {
    if (!leadForm.name || leadForm.phone.length < 18 || isSubmitting) return;
    setIsSubmitting(true);

    const serviceLabel = svc ? svc.label : "Не указано";
    let sizeStr = "-";
    let pilesStr = "-";
    let priceStr = "-";
    let commentStr = "-";

    if (svc?.id === "piles" && pilesResult) {
      sizeStr = `${pilesForm.l}x${pilesForm.w} м`;
      pilesStr = `${pilesResult.total} шт (Ø${pilesResult.diam} мм)`;
      priceStr = fmtPr(pilesResult.price);
    } else if (["house", "bath", "gazebo", "canopy"].includes(svc?.id || "")) {
      sizeStr = `${buildForm.l}x${buildForm.w} м`;
      priceStr = calcPrice() > 0 ? fmtPr(calcPrice()) : "-";
      commentStr = buildForm.kit || "-";
    } else if (["landscape", "asphalt", "covering"].includes(svc?.id || "")) {
      sizeStr = `${individualForm.area} м² (Площадь)`;
      commentStr = individualForm.comment || "-";
    } else if (svc?.id === "cargo") {
      sizeStr = `Длина: ${cargoForm.l || "-"} м, Вес: ${cargoForm.w || "-"} кг`;
      commentStr = `Груз: ${cargoForm.cargo || "Не указан"}, Откуда: ${cargoForm.from}, Куда: ${cargoForm.to}`;
    }

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: serviceLabel,
          size: sizeStr,
          piles: pilesStr,
          price: priceStr,
          phone: leadForm.phone,
          name: leadForm.name,
          comment: commentStr,
          fileName: leadForm.fileName || "",
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.statusText}`);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      reset();
    } catch (err) {
      console.error("Ошибка при отправке заявки:", err);
      alert("Не удалось отправить заявку. Попробуйте еще раз или свяжитесь с нами.");
      setIsSubmitting(false);
    }
  };

  const renderScreen = () => {
    if (screen === "home") return <HomeScreen open={open} onBack={reset} />;
    if (screen === "form_piles") return (
      <PilesScreen
        form={pilesForm}
        setForm={setPilesForm}
        preview={pilePreview(pilesForm)}
        onCalculate={() => { setPilesResult(pilePreview(pilesForm)); setScreen("result"); }}
        onBack={() => setScreen("home")}
      />
    );
    if (["form_house", "form_bath", "form_gazebo", "form_canopy"].includes(screen)) return (
      <BuildScreen
        svc={svc}
        form={buildForm}
        setForm={setBuildForm}
        calcArea={calcArea}
        calcPrice={calcPrice}
        onCalculate={() => setScreen("result")}
        onBack={() => setScreen("home")}
      />
    );
    if (["form_landscape", "form_asphalt", "form_covering"].includes(screen)) return (
      <IndividualScreen
        svc={svc}
        form={individualForm}
        setForm={setIndividualForm}
        screen={screen}
        onCalculate={() => setScreen("result")}
        onBack={() => setScreen("home")}
      />
    );
    if (screen === "form_cargo") return (
      <CargoScreen
        form={cargoForm}
        setForm={setCargoForm}
        onCalculate={handleCargo}
        onBack={() => setScreen("home")}
      />
    );
    if (screen === "result") return (
      <ResultScreen
        svc={svc} pilesResult={pilesResult} buildForm={buildForm}
        individualForm={individualForm} cargoForm={cargoForm} leadForm={leadForm}
        calcArea={calcArea} calcPrice={calcPrice} curPkg={curPkg}
        onLeadChange={setLeadForm} onBack={() => setScreen(("form_" + svc?.id) as Screen)}
        onSubmit={handleSendLead}
        onReset={reset}
        isSubmitting={isSubmitting}
      />
    );
    return null;
  };

  return (
    <>
      {renderScreen()}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 z-50 w-max max-w-[90vw]"
          >
            <div className="text-3xl">✅</div>
            <div>
              <div className="font-['Bebas_Neue',sans-serif] text-[22px] tracking-[1px] leading-none mb-1">{t.successTitle}</div>
              <div className="text-[13px] font-medium opacity-90 leading-tight">{t.successDesc}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ===================================================
   ЭКРАНЫ
=================================================== */

function HomeScreen({ open, onBack }: { open: (s: Svc) => void; onBack: () => void }) {
  return (
    <Shell onBack={reset}>
      <div className="font-['Bebas_Neue',sans-serif] text-[42px] leading-none mb-1.5">
        {t.what}<br /><span className="text-red-600">{t.build}</span>
      </div>
      <div className="text-[13px] text-[#888] mb-[22px] font-semibold">{t.selectService}</div>
      <div className="flex flex-col gap-2.5">
        {SERVICES.map((s, i) => (
          <motion.button key={s.id} onClick={() => { haptic(); open(s); }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-center gap-[14px] p-[14px_16px] bg-white/[0.04] border border-white/[0.07] rounded-[14px] text-left w-full font-[inherit] text-[inherit] hover:bg-white/[0.06] transition-colors"
          >
            <div className="text-red-500 w-[46px] h-[46px] flex items-center justify-center bg-white/5 rounded-xl shrink-0">
              {s.icon}
            </div>
            <div>
              <div className="text-[15px] font-bold text-[#eee]">{s.label}</div>
              <div className="text-[12px] text-[#555] mt-0.5">{s.desc}</div>
            </div>
            <div className="ml-auto text-[#3a3a3a] text-[18px]">›</div>
          </motion.button>
        ))}
      </div>
    </Shell>
  );
}

function PilesScreen({ form, setForm, preview, onCalculate, onBack }: any) {
  return (
    <Shell back onBack={onBack}>
      <div className="font-['Bebas_Neue',sans-serif] text-[36px] leading-none mt-5 mb-1">
        🪵 РАСЧЁТ СВАЙ
      </div>
      <div className="text-[13px] text-[#666] mb-2 font-semibold">Размеры фундамента в метрах</div>

      <div className="text-[12px] text-red-600 mb-[18px] px-3 py-2 bg-red-600/[0.08] rounded-lg border border-red-600/20">
        📐 Пример: 6 × 4 м → 4 × 3 = <b>12 свай</b> (шаг ≤ 2500 мм)
      </div>

      <div className="flex gap-3 mb-4">
        {([["Длина (м)", "6", "l"], ["Ширина (м)", "4", "w"]] as const).map(([lbl, ph, key]) => (
          <div key={lbl} className="flex-1">
            <label className={tw.lbl}>{lbl}</label>
            <input className={`${tw.inp} text-[22px] font-bold`} type="number"
              placeholder={ph} value={form[key]} onChange={e => setForm((s: any) => ({ ...s, [key]: e.target.value }))} inputMode="decimal" />
          </div>
        ))}
      </div>

      {preview && (
        <div className="grid grid-cols-3 gap-2 mb-[18px]">
          {([["Свай", preview.total, "шт"], ["Диаметр", "Ø" + preview.diam, "мм"], ["Шаг X", preview.stepX, "мм"]] as const).map(([l, v, u]) => (
            <div key={l} className="text-center bg-red-600/[0.09] rounded-[10px] py-[10px] px-1.5 border border-red-600/20">
              <div className="font-['Bebas_Neue',sans-serif] text-[24px] text-red-600 leading-none">{v}</div>
              <div className="text-[10px] text-[#777] font-bold mt-0.5">{l} {u}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 mb-[18px]">
        <Chk label="Печь / тяжёлое оборудование" checked={form.heavy} onChange={v => setForm((s: any) => ({ ...s, heavy: v }))} />
        <Chk label="Мансарда / 2 этаж" checked={form.mansard} onChange={v => setForm((s: any) => ({ ...s, mansard: v }))} />
        <Chk label="Усиленная снеговая нагрузка" checked={form.snow} onChange={v => setForm((s: any) => ({ ...s, snow: v }))} />
      </div>

      <div className="text-[11px] text-[#444] px-[14px] py-[10px] bg-white/[0.02] rounded-[10px] leading-[1.7] mb-[22px]">
        Шаг свай ≤ 2500 мм · {DEFAULT_REGION} · цены: Ø76 — 6 000 ₽/шт, Ø89 — 7 600 ₽/шт, Ø108 — 9 800 ₽/шт
      </div>

      <button className={tw.red} onClick={() => { haptic(); if (form.l && form.w) onCalculate(); }} disabled={!form.l || !form.w}>
        {t.btnCalc}
      </button>
    </Shell>
  );
}

function BuildScreen({ svc, form, setForm, calcArea, calcPrice, onCalculate, onBack }: any) {
  const pkgs = PACKAGES[svc?.id || ""] || [];
  const hasPkgs = pkgs.length > 0;
  const area_ = calcArea();
  const price_ = calcPrice();

  return (
    <Shell back onBack={onBack}>
      <div className="font-['Bebas_Neue',sans-serif] text-[34px] leading-none mt-5 mb-5">
        {svc?.icon} {svc?.label.toUpperCase()}
      </div>

      <div className="flex gap-2.5 mb-[14px]">
        {([["Длина (м)", "6", "l"], ["Ширина (м)", "4", "w"], ["Высота (м)", "3", "h"]] as const).map(([lbl, ph, key]) => (
          <div key={lbl} className="flex-1">
            <label className={tw.lbl}>{lbl}</label>
            <input className={`${tw.inp} p-[12px_10px] text-[15px]`} type="number"
              placeholder={ph} value={form[key]} onChange={e => setForm((s: any) => ({ ...s, [key]: e.target.value }))} inputMode="decimal" />
          </div>
        ))}
      </div>

      {form.l && form.w && (
        <div className="flex gap-2.5 mb-[18px]">
          <div className="flex-1 text-center bg-white/5 rounded-[10px] py-[11px] px-2">
            <div className="font-['Bebas_Neue',sans-serif] text-[22px] text-white leading-none">{area_} м²</div>
            <div className="text-[10px] text-[#555] font-bold mt-0.5">ПЛОЩАДЬ ПОЛА</div>
          </div>
          {hasPkgs && price_ > 0 && (
            <div className="flex-[2] text-center bg-red-600/[0.12] rounded-[10px] py-[11px] px-3 border border-red-600/[0.25]">
              <div className="font-['Bebas_Neue',sans-serif] text-[22px] text-red-600 leading-none">
                {fmtPr(price_)}
              </div>
              <div className="text-[10px] text-[#888] font-bold mt-0.5">ОРИЕНТИРОВОЧНО</div>
            </div>
          )}
        </div>
      )}

      {hasPkgs && (
        <>
          <label className={`${tw.lbl} mb-2.5`}>Комплектация</label>
          <div className="flex flex-col gap-2.5 mb-[18px]">
            {pkgs.map((pkg: any, i: number) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <PkgCard pkg={pkg} selected={form.pkg === pkg.id}
                  onSelect={() => setForm((s: any) => ({ ...s, pkg: pkg.id }))} area={area_} />
              </motion.div>
            ))}
          </div>
        </>
      )}

      <Fld label="Пожелания / комментарий">
        <textarea className={tw.ta} placeholder="Утепление, отделка, веранда, цвет фасада..."
          value={form.kit} onChange={e => setForm((s: any) => ({ ...s, kit: e.target.value }))} />
      </Fld>

      <button className={tw.red} onClick={() => { haptic(); onCalculate(); }} disabled={!form.l || !form.w}>
        {svc?.id === "canopy" ? t.btnClarify : t.btnCalc}
      </button>
    </Shell>
  );
}

function IndividualScreen({ svc, form, setForm, screen, onCalculate, onBack }: any) {
  return (
    <Shell back onBack={onBack}>
      <div className="font-['Bebas_Neue',sans-serif] text-[34px] leading-none mt-5 mb-5">
        {svc?.icon} {svc?.label.toUpperCase()}
      </div>
      <Fld label="Площадь (м²)">
        <input className={tw.inp} type="number" placeholder="150" value={form.area}
          onChange={e => setForm((s: any) => ({ ...s, area: e.target.value }))} inputMode="decimal" />
      </Fld>
      {screen === "form_covering" && (
        <Fld label="Тип покрытия">
          <select className={tw.sel}>
            {["Срезка", "Гранула", "Крошка", "Комбинированное"].map(t => <option key={t}>{t}</option>)}
          </select>
        </Fld>
      )}
      {screen === "form_asphalt" && (
        <div className="flex flex-col gap-2 mb-4">
          <Chk label="Основание не готово" checked={false} onChange={() => { }} />
          <Chk label="Нужен демонтаж" checked={false} onChange={() => { }} />
        </div>
      )}
      <Fld label="Комментарий">
        <textarea className={tw.ta} placeholder="Опишите задачу..." value={form.comment}
          onChange={e => setForm((s: any) => ({ ...s, comment: e.target.value }))} />
      </Fld>
      <button className={tw.red} onClick={() => { haptic(); onCalculate(); }} disabled={!form.area}>
        {t.btnClarify}
      </button>
    </Shell>
  );
}

function CargoScreen({ form, setForm, onCalculate, onBack }: any) {
  const { from, to, cargo, l, w, load, urgent, error } = form;
  return (
    <Shell back onBack={onBack}>
      <div className="font-['Bebas_Neue',sans-serif] text-[34px] leading-none mt-5 mb-1.5">
        🚚 ГРУЗОПЕРЕВОЗКИ
      </div>
      <div className="text-[13px] text-[#666] mb-5 font-semibold">
        Газель до 6 м · до 2500 кг · {DEFAULT_REGION}
      </div>
      <Fld label="Откуда">
        <input className={tw.inp} placeholder="Адрес забора груза" value={from} onChange={e => setForm((s: any) => ({ ...s, from: e.target.value }))} />
      </Fld>
      <Fld label="Куда">
        <input className={tw.inp} placeholder="Адрес доставки" value={to} onChange={e => setForm((s: any) => ({ ...s, to: e.target.value }))} />
      </Fld>
      <Fld label="Тип груза">
        <input className={tw.inp} placeholder="Пиломатериал, оборудование..." value={cargo} onChange={e => setForm((s: any) => ({ ...s, cargo: e.target.value }))} />
      </Fld>
      <div className="flex gap-2.5 mb-[14px]">
        {([["Длина (м)", "6", "l"], ["Вес (кг)", "500", "w"]] as const).map(([lbl, ph, key]) => (
          <div key={lbl} className="flex-1">
            <label className={tw.lbl}>{lbl}</label>
            <input className={`${tw.inp} p-[12px_10px]`} type="number" placeholder={ph}
              value={form[key]} onChange={e => setForm((s: any) => ({ ...s, [key]: e.target.value }))} inputMode="decimal" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <Chk label="Нужна погрузка/разгрузка" checked={load} onChange={v => setForm((s: any) => ({ ...s, load: v }))} />
        <Chk label="Срочная доставка" checked={urgent} onChange={v => setForm((s: any) => ({ ...s, urgent: v }))} />
      </div>
      {error && (
        <div className="p-[12px_14px] bg-red-600/[0.15] border border-red-600/[0.3] rounded-[10px] text-[13px] text-red-300 mb-[14px] leading-[1.6]">
          ⚠️ {error}
        </div>
      )}
      <button className={tw.red} onClick={() => { haptic(); onCalculate(); }} disabled={!from || !to}>
        РАССЧИТАТЬ ПЕРЕВОЗКУ →
      </button>
    </Shell>
  );
}

function ResultScreen({ svc, pilesResult, buildForm, individualForm, cargoForm, leadForm, calcArea, calcPrice, curPkg, onLeadChange, onBack, onSubmit, onReset, isSubmitting }: {
  svc: Svc;
  pilesResult: PileResult | null;
  buildForm: typeof initialBuildForm;
  individualForm: typeof initialIndividualForm;
  cargoForm: typeof initialCargoForm;
  leadForm: typeof initialLeadForm;
  calcArea: () => string;
  calcPrice: () => number;
  curPkg: () => { id: string; label: string; price: number; roof: string; items: string[] } | undefined;
  onLeadChange: React.Dispatch<React.SetStateAction<typeof initialLeadForm>>;
  onBack: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isSubmitting: boolean;
}) {
  const isPiles = svc?.id === "piles";
  const isBuild = ["house", "bath", "gazebo", "canopy"].includes(svc?.id || "");
  const isCargo = svc?.id === "cargo";
  const isIndiv = ["landscape", "asphalt", "covering"].includes(svc?.id || "");
  const pkg = curPkg();

  const handleShare = async () => {
    let text = `🔥 Предварительный расчёт от МИФАРТ\nУслуга: ${svc?.label}\n\n`;

    if (isPiles && pilesResult) {
      text += `Сваи: ${pilesResult.total} шт (Ø${pilesResult.diam} мм)\n`;
      text += `Сетка: ${pilesResult.cntX}×${pilesResult.cntY}, Шаг: ${pilesResult.stepX}×${pilesResult.stepY} мм\n`;
      text += `Ориентировочно: ${fmtPr(pilesResult.price)}\n`;
    } else if (isBuild) {
      text += `Размеры: ${buildForm.l}×${buildForm.w} м${buildForm.h ? " · высота " + buildForm.h + " м" : ""}\n`;
      if (pkg) text += `Комплектация: ${pkg.label}\n`;
      if (calcPrice() > 0) text += `Ориентировочно: ${fmtPr(calcPrice())}\n`;
    } else if (isIndiv) {
      text += `Площадь: ${individualForm.area} м²\n`;
    } else if (isCargo) {
      text += `Маршрут: ${cargoForm.from} → ${cargoForm.to}\n`;
      if (cargoForm.cargo) text += `Груз: ${cargoForm.cargo}\n`;
    }
    text += `\n📞 Связаться: ${PHONE}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Расчёт МИФАРТ', text });
      } else {
        await navigator.clipboard.writeText(text);
        alert('Результат скопирован в буфер обмена!');
      }
    } catch (e) {
      console.log('Share error:', e);
    }
  };

  return (
    <Shell back onBack={onBack}>
      <div className="font-['Bebas_Neue',sans-serif] text-[34px] leading-none mt-5 mb-[18px]">
        {svc?.icon} {t.resultTitle}
      </div>

      {isPiles && pilesResult && (<>
        <div className="bg-red-600/10 border border-red-600/30 rounded-2xl p-5 mb-[14px]">
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-red-600 mb-[14px]">
            ⚡ Расчёт · {DEFAULT_REGION}
          </div>
          <div className="grid grid-cols-3 gap-2.5 mb-0">
            {([["Свай", pilesResult.total, "шт"], ["Диаметр", "Ø" + pilesResult.diam, "мм"],
            ["Площадь", pilesResult.area, "м²"], ["Шаг X", pilesResult.stepX, "мм"],
            ["Шаг Y", pilesResult.stepY, "мм"], ["Сетка", `${pilesResult.cntX}×${pilesResult.cntY}`, ""]] as const).map(([l, v, u]) => (
              <div key={l} className="text-center">
                <div className="font-['Bebas_Neue',sans-serif] text-[26px] text-white leading-none">{v}</div>
                <div className="text-[10px] text-[#555] font-bold uppercase mt-0.5">
                  {l}{u ? " " + u : ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/[0.04] rounded-xl py-[15px] px-[18px] flex items-center justify-between mb-[14px]">
          <div>
            <div className="text-[12px] text-[#555] font-bold">Ориентировочно</div>
            <div className="text-[11px] text-[#444]">материал + монтаж</div>
          </div>
          <div className="font-['Bebas_Neue',sans-serif] text-[28px] text-red-600">
            {fmtPr(pilesResult.price)}
          </div>
        </div>

        <div className="bg-white/[0.03] rounded-xl p-[14px] mb-[14px]">
          <PileGrid cntX={pilesResult.cntX} cntY={pilesResult.cntY}
            stepX={pilesResult.stepX} stepY={pilesResult.stepY} diam={pilesResult.diam} />
        </div>

        <div className="text-[11px] text-[#444] leading-[1.7] mb-[18px] py-[10px] px-[14px] bg-white/[0.02] rounded-[10px]">
          Предварительный расчёт. Точный подбор свай — после уточнения проекта, типа грунта и нагрузок.
        </div>
      </>)}

      {isBuild && (<>
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 mb-[14px]">
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-red-600 mb-[14px]">ПАРАМЕТРЫ</div>
          {([["Размеры", `${buildForm.l}×${buildForm.w} м${buildForm.h ? " · высота " + buildForm.h + " м" : ""}`],
          ["Площадь пола", `${calcArea()} м²`],
          ["Комплектация", pkg?.label || "—"],
          ["Кровля", pkg?.roof || "—"]] as const).map(([l, v]) => (
            <div key={l} className="flex justify-between text-[14px] pb-2 mb-2 border-b border-white/5">
              <span className="text-[#666]">{l}</span>
              <span className="font-bold max-w-[58%] text-right text-[13px]">{v}</span>
            </div>
          ))}
          {buildForm.kit && <div className="text-[13px] text-[#555] mt-1">💬 {buildForm.kit}</div>}
        </div>

        {pkg && (
          <div className={`rounded-[14px] p-[18px] mb-[14px] border border-solid ${{ eco: "border-slate-500/40 bg-slate-500/10", std: "border-blue-700/40 bg-blue-700/10", prem: "border-red-600/40 bg-red-600/10" }[pkg.id as "eco" | "std" | "prem"]}`}>
            <div className="flex justify-between items-center mb-2.5">
              <div className="font-['Bebas_Neue',sans-serif] text-[20px] tracking-[1px]">
                {pkg.label}
              </div>
              <div className={`font-['Bebas_Neue',sans-serif] text-[18px] ${{ eco: "text-slate-400", std: "text-blue-400", prem: "text-red-600" }[pkg.id as "eco" | "std" | "prem"]}`}>
                {fmtPr(pkg.price)}/м²
              </div>
            </div>
            {pkg.items.map(it => (
              <div key={it} className="text-[13px] text-[#777] flex gap-1.5 mb-[5px]">
                <span className="text-red-600">•</span>{it}
              </div>
            ))}
            {calcArea() !== "0" && (
              <div className="mt-[14px] py-[12px] px-[14px] bg-black/30 rounded-[10px] flex justify-between items-center">
                <span className="text-[13px] text-[#888]">Итого ~ {calcArea()} м²</span>
                <span className="font-['Bebas_Neue',sans-serif] text-[26px] text-white">
                  {fmtPr(calcPrice())}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="text-[11px] text-[#444] leading-[1.7] mb-[18px] py-[10px] px-[14px] bg-white/[0.02] rounded-[10px]">
          Предварительный расчёт. Точная стоимость — после осмотра и согласования проекта.
          Уточните по {PHONE}
        </div>
      </>)}

      {isIndiv && (
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 mb-[14px]">
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-red-600 mb-[14px]">ВАШИ ДАННЫЕ</div>
          <div className="flex justify-between text-[14px] mb-2">
            <span className="text-[#666]">Площадь</span>
            <span className="font-bold">{individualForm.area} м²</span>
          </div>
          {individualForm.comment && <div className="text-[13px] text-[#555] mt-2">💬 {individualForm.comment}</div>}
          <div className="mt-[14px] p-[12px] bg-red-600/[0.1] rounded-[10px] text-[13px] text-red-300 leading-[1.6]">
            Стоимость рассчитывается индивидуально. Уточните по {PHONE}
          </div>
        </div>
      )}

      {isCargo && (
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 mb-[14px]">
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-red-600 mb-[14px]">ПАРАМЕТРЫ ПЕРЕВОЗКИ</div>
          {([["Откуда", cargoForm.from], ["Куда", cargoForm.to], ["Груз", cargoForm.cargo || "—"],
          ["Длина", cargoForm.l ? cargoForm.l + " м" : "—"], ["Вес", cargoForm.w ? cargoForm.w + " кг" : "—"],
          ["Погрузка", cargoForm.load ? "Нужна" : "Не нужна"], ["Срочность", cargoForm.urgent ? "Срочно" : "Стандарт"]] as const).map(([l, v]) => (
            <div key={l} className="flex justify-between text-[14px] pb-2 mb-2 border-b border-white/5">
              <span className="text-[#666]">{l}</span>
              <span className="font-bold">{v}</span>
            </div>
          ))}
          <div className="mt-2.5 p-[12px] bg-red-600/[0.1] rounded-[10px] text-[13px] text-red-300 leading-[1.6]">
            Стоимость рассчитывается индивидуально. Уточните по {PHONE}
          </div>
        </div>
      )}

      <button onClick={() => { haptic(); handleShare(); }} className="w-full py-[14px] bg-white/[0.04] border-[1.5px] border-white/10 rounded-xl font-[inherit] text-[13px] font-bold text-white cursor-pointer mb-8 hover:bg-white/[0.08] active:scale-95 transition-all flex items-center justify-center gap-2">
        <Share2 size={16} /> {t.shareBtn}
      </button>

      <LeadForm
        name={leadForm.name}
        onNameChange={v => onLeadChange(s => ({ ...s, name: v }))}
        phone={leadForm.phone}
        onPhoneChange={v => onLeadChange(s => ({ ...s, phone: v }))}
        fileName={leadForm.fileName}
        onFileChange={e => {
          const file = e.target.files?.[0];
          if (file) onLeadChange(s => ({ ...s, file, fileName: file.name }));
        }}
        onFileRemove={() => onLeadChange(s => ({ ...s, file: null, fileName: "" }))}
        onSubmit={onSubmit}
        onReset={onReset}
        disabled={!leadForm.name || leadForm.phone.length < 18 || isSubmitting}
      />
    </Shell>
  );
}
