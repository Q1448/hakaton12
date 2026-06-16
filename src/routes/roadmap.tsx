import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { CheckCircle2, Lock, Star, Sparkles, Flag } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [{ title: "Карта поступления — Mentoria Hub" }] }),
  component: Roadmap,
});

const grades = [9, 10, 11, 12] as const;

type Island = {
  title: string;
  period: string;
  desc: string;
  status: "done" | "current" | "locked";
};

const islands: Record<number, Island[]> = {
  9: [
    { title: "1. Начало пути", period: "Сентябрь", desc: "Профориентация и выбор направления.", status: "done" },
    { title: "2. Первые шаги", period: "Октябрь", desc: "Английский: A2 → B1, регулярные занятия.", status: "done" },
    { title: "3. Растём сильнее", period: "Декабрь", desc: "Школьные олимпиады по 2+ предметам.", status: "current" },
    { title: "4. Первое испытание", period: "Февраль", desc: "Регион олимпиад и пробных тестов.", status: "locked" },
    { title: "5. Лагерь", period: "Июнь", desc: "Летний языковой лагерь / летняя школа.", status: "locked" },
    { title: "6. Финальный квест", period: "Август", desc: "Подготовка к 10 классу.", status: "locked" },
  ],
  10: [
    { title: "1. Начало пути", period: "Сентябрь", desc: "Старт подготовки к IELTS / Duolingo.", status: "done" },
    { title: "2. Первые шаги", period: "Ноябрь", desc: "Международные олимпиады (AMC, NEC, MOS).", status: "current" },
    { title: "3. Растём сильнее", period: "Январь", desc: "Областной/респ. тур Дарын.", status: "locked" },
    { title: "4. Первое испытание", period: "Март", desc: "Первый пробный SAT / IELTS.", status: "locked" },
    { title: "5. Лагерь", period: "Июнь", desc: "Летняя школа или первая стажировка.", status: "locked" },
    { title: "6. Финальный квест", period: "Август", desc: "План поступления на 11 класс.", status: "locked" },
  ],
  11: [
    { title: "1. Начало пути", period: "Сентябрь", desc: "Черновик Personal Statement.", status: "done" },
    { title: "2. Первые шаги", period: "Октябрь", desc: "Сбор рекомендаций (LOR).", status: "done" },
    { title: "3. Растём сильнее", period: "Ноябрь", desc: "Shortlist 5-8 ВУЗов: dream / target / safe.", status: "current" },
    { title: "4. Первое испытание", period: "Январь", desc: "Пробное ЕНТ.", status: "locked" },
    { title: "5. Испытания", period: "Март", desc: "Сдача IELTS / SAT.", status: "locked" },
    { title: "6. Финальный квест", period: "Май", desc: "Финализация подачи документов.", status: "locked" },
  ],
  12: [
    { title: "1. Начало пути", period: "Сентябрь", desc: "Финализация эссе и заявок.", status: "done" },
    { title: "2. Первые шаги", period: "Ноябрь", desc: "Early Decision / Early Action.", status: "current" },
    { title: "3. Растём сильнее", period: "Декабрь", desc: "Заявка на Болашак / гранты.", status: "locked" },
    { title: "4. Первое испытание", period: "Март", desc: "Финал интервью.", status: "locked" },
    { title: "5. Испытания", period: "Июнь", desc: "Финальное ЕНТ.", status: "locked" },
    { title: "6. Финальный квест", period: "Август", desc: "Поступление и сборы.", status: "locked" },
  ],
};

function Roadmap() {
  const { t } = useApp();
  const [grade, setGrade] = useState<number>(11);
  const list = islands[grade];

  return (
    <AppShell>
      <div
        className="relative min-h-[calc(100vh-4rem)]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, #0c4a6e 0%, #0a2540 40%, #051324 100%)",
        }}
      >
        {/* Decorative clouds */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 left-10 w-40 h-20 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute top-32 right-20 w-56 h-24 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-20 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">{t("roadmap_title")}</h1>
            <p className="text-sky-100/80 mt-2">{t("roadmap_sub")}</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 rounded-2xl bg-white/10 backdrop-blur border border-white/20">
              {grades.map((g) => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                    grade === g ? "bg-amber-400 text-slate-900 shadow-lg" : "text-white/80 hover:text-white"
                  }`}
                >
                  {g} {t("grade_label")}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={grade}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              {/* Dashed gold path */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 800">
                <path
                  d="M 100 120 Q 250 60, 400 160 T 700 200 Q 850 240, 900 380 Q 850 520, 700 560 T 400 600 Q 250 640, 100 720"
                  stroke="#fbbf24"
                  strokeWidth="4"
                  strokeDasharray="2 12"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.7"
                />
              </svg>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                {list.map((isle, i) => (
                  <motion.div
                    key={`${grade}-${i}`}
                    initial={{ opacity: 0, scale: 0.85, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 120 }}
                    className={`relative ${i % 2 === 1 ? "lg:translate-y-12" : ""}`}
                  >
                    <IslandCard isle={isle} index={i} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </AppShell>
  );
}

function IslandCard({ isle, index }: { isle: Island; index: number }) {
  const palettes = [
    "from-emerald-400 via-emerald-500 to-emerald-700",
    "from-amber-400 via-orange-500 to-orange-700",
    "from-rose-400 via-pink-500 to-rose-700",
    "from-sky-400 via-blue-500 to-blue-700",
    "from-violet-400 via-purple-500 to-purple-700",
    "from-yellow-300 via-amber-500 to-orange-600",
  ];
  const palette = palettes[index % palettes.length];
  const locked = isle.status === "locked";
  const done = isle.status === "done";
  const current = isle.status === "current";

  return (
    <div className={`group ${locked ? "opacity-70" : ""}`}>
      {/* Island banner sign */}
      <div className="relative mx-auto w-fit mb-3">
        <div className={`px-5 py-2 rounded-xl bg-gradient-to-b from-amber-700 to-amber-900 text-amber-50 font-black text-sm shadow-xl border-2 border-amber-950 ${current ? "ring-4 ring-yellow-300/60 animate-pulse" : ""}`}>
          {isle.title}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-1 h-3 bg-amber-950" />
      </div>

      {/* Island shape */}
      <div className="relative">
        <div className={`relative h-44 rounded-[40%_40%_30%_30%/60%_60%_25%_25%] bg-gradient-to-b ${palette} shadow-2xl overflow-hidden border-4 border-white/10`}>
          {/* sandy beach */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-yellow-200/40 to-yellow-100/10" />
          {/* palm-tree silhouettes */}
          <div className="absolute top-3 left-4 text-3xl">🌴</div>
          <div className="absolute top-2 right-6 text-2xl">🌴</div>
          {/* castle / structure based on status */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-5xl drop-shadow-lg">
              {done ? "🏰" : current ? "⛺" : "🗿"}
            </div>
          </div>

          {/* status badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
            {done && (
              <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 border-4 border-slate-900 shadow-xl">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            )}
            {current && (
              <div className="grid h-10 w-10 place-items-center rounded-full bg-yellow-400 border-4 border-slate-900 shadow-xl">
                <Flag className="h-5 w-5 text-slate-900" />
              </div>
            )}
            {locked && (
              <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-700 border-4 border-slate-900 shadow-xl">
                <Lock className="h-4 w-4 text-slate-300" />
              </div>
            )}
          </div>
        </div>

        {/* sea reflection */}
        <div className="h-3 mx-6 -mt-1 rounded-full bg-cyan-300/20 blur-md" />
      </div>

      {/* Info card */}
      <div className="mt-6 rounded-xl bg-white/10 backdrop-blur border border-white/20 p-4 text-white">
        <div className="flex items-center gap-2 text-xs text-amber-200 mb-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="font-semibold">{isle.period}</span>
          {done && <span className="ml-auto text-emerald-300">Пройдено</span>}
          {current && <span className="ml-auto text-yellow-300">Сейчас</span>}
          {locked && <span className="ml-auto text-slate-300">Закрыто</span>}
        </div>
        <p className="text-sm text-white/90">{isle.desc}</p>
        {current && (
          <div className="mt-3 flex items-center gap-1 text-xs text-yellow-200">
            <Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
            Активный этап
          </div>
        )}
      </div>
    </div>
  );
}
