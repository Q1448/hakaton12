import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { CheckCircle2, Circle, Calendar, Star } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { OPPORTUNITIES } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [{ title: "Индивидуальный Roadmap — Mentoria Hub" }] }),
  component: Roadmap,
});

const grades = [9, 10, 11, 12] as const;

type Task = { title: string; date: string; done?: boolean; desc: string };

const tasks: Record<number, Task[]> = {
  9: [
    { title: "Профориентационный тест", date: "Сентябрь", done: true, desc: "Пройди тест и определи направление: STEM, Бизнес, Гуманитарии, Арт." },
    { title: "Английский: уровень A2 → B1", date: "Октябрь", done: true, desc: "Регулярные занятия 3 раза в неделю, цель — B1 к концу года." },
    { title: "Школьная олимпиада", date: "Декабрь", desc: "Участвуй минимум в двух профильных предметах." },
    { title: "Летний языковой лагерь", date: "Июнь", desc: "Погружение в языковую среду на 2-3 недели." },
  ],
  10: [
    { title: "Подготовка к IELTS / Duolingo", date: "Сентябрь", desc: "Старт подготовки. Цель: B2 к концу 10 класса." },
    { title: "Республиканская олимпиада", date: "Январь", desc: "Областной и республиканский тур олимпиады Дарын." },
    { title: "Международные олимпиады", date: "Ноябрь", desc: "AMC, NEC, MOS — подача заявок." },
    { title: "Летняя школа или стажировка", date: "Июнь", desc: "Опыт в выбранной области — must have." },
  ],
  11: [
    { title: "Сдача IELTS / SAT", date: "Март", desc: "Первая попытка. Цель: IELTS 7.0+ или SAT 1350+." },
    { title: "Сдача ЕНТ (пробное)", date: "Январь", desc: "Пробное тестирование для оценки уровня." },
    { title: "Personal Statement — черновик", date: "Сентябрь", desc: "Начни черновик мотивационного эссе." },
    { title: "Сбор рекомендаций", date: "Октябрь", desc: "Договорись с учителями о LOR заранее." },
    { title: "Shortlist университетов", date: "Ноябрь", desc: "Составь список 5-8 ВУЗов: dream / target / safe." },
  ],
  12: [
    { title: "Подача документов Early Decision", date: "Ноябрь", desc: "Дедлайн ED/EA для топовых ВУЗов." },
    { title: "Финальное ЕНТ", date: "Июнь", desc: "Основная попытка ЕНТ." },
    { title: "Подача на Болашак / гранты", date: "Декабрь", desc: "Полное финансирование обучения за рубежом." },
    { title: "Финальный выбор ВУЗа", date: "Апрель", desc: "Сравни офферы и финансирование, прими решение." },
  ],
};

function Roadmap() {
  const { t, favorites } = useApp();
  const [grade, setGrade] = useState<number>(11);

  const list = tasks[grade];
  const savedDeadlines = OPPORTUNITIES.filter((o) => favorites.includes(o.id));

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("roadmap_title")}</h1>
        <p className="text-muted-foreground mb-8">{t("roadmap_sub")}</p>

        <div className="inline-flex p-1 rounded-xl bg-muted mb-10 flex-wrap">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                grade === g ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {g} класс
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={grade}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />
            <div className="space-y-6">
              {list.map((task, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative pl-14"
                >
                  <div className={`absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border-2 ${task.done ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground"}`}>
                    {task.done ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        <Calendar className="h-3 w-3" /> {task.date}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{task.desc}</p>
                  </div>
                </motion.div>
              ))}

              {savedDeadlines.map((op, i) => (
                <motion.div
                  key={op.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (list.length + i) * 0.05 }}
                  className="relative pl-14"
                >
                  <div className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border-2 bg-amber-500/10 border-amber-500 text-amber-500">
                    <Star className="h-5 w-5" />
                  </div>
                  <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-5">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <h3 className="font-semibold text-lg">{op.title}</h3>
                      <div className="flex items-center gap-1 text-xs bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full">
                        <Calendar className="h-3 w-3" /> {op.deadline}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Сохранённая возможность из каталога — не пропусти дедлайн.</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
