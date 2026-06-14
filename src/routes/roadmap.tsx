import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { CheckCircle2, Circle, Calendar } from "lucide-react";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [{ title: "Индивидуальный Roadmap — Mentoria Hub" }] }),
  component: Roadmap,
});

const grades = ["9 класс", "10 класс", "11 класс", "12 класс"] as const;

const tasks: Record<string, { title: string; date: string; done?: boolean; desc: string }[]> = {
  "9 класс": [
    { title: "Определить профильное направление", date: "Сентябрь", done: true, desc: "Пройди тест на профориентацию." },
    { title: "Начать изучение английского", date: "Октябрь", done: true, desc: "Базовый уровень A2-B1." },
    { title: "Участие в школьной олимпиаде", date: "Декабрь", desc: "Минимум по двум профильным предметам." },
    { title: "Летний языковой лагерь", date: "Июнь", desc: "Погружение в среду." },
  ],
  "10 класс": [
    { title: "Подготовка к IELTS / Duolingo", date: "Сентябрь", desc: "Цель — B2." },
    { title: "Стажировка / летняя школа", date: "Июнь", desc: "Опыт в выбранной области." },
    { title: "Подача на международные олимпиады", date: "Ноябрь", desc: "MOS, AMC, NEC." },
  ],
  "11 класс": [
    { title: "Сдать ЕНТ / SAT", date: "Март", desc: "Первая попытка." },
    { title: "Personal Statement", date: "Сентябрь", desc: "Начать черновик эссе." },
    { title: "Выбрать 5-8 университетов", date: "Октябрь", desc: "Составить shortlist." },
  ],
  "12 класс": [
    { title: "Подать документы", date: "Ноябрь", desc: "Дедлайн Early Decision." },
    { title: "Подать на гранты / Болашак", date: "Декабрь", desc: "Финансирование обучения." },
    { title: "Получить ответы и выбрать ВУЗ", date: "Апрель", desc: "Финальное решение." },
  ],
};

function Roadmap() {
  const [grade, setGrade] = useState<(typeof grades)[number]>("11 класс");
  const list = tasks[grade];

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Индивидуальный Roadmap</h1>
        <p className="text-muted-foreground mb-8">Пошаговый план поступления, адаптированный под твой класс.</p>

        {/* Tabs */}
        <div className="inline-flex p-1 rounded-xl bg-muted mb-10 flex-wrap">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                grade === g ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />
          <div className="space-y-6">
            {list.map((t, i) => (
              <div key={i} className="relative pl-14">
                <div className={`absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border-2 ${t.done ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground"}`}>
                  {t.done ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                </div>
                <div className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h3 className="font-semibold text-lg">{t.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      <Calendar className="h-3 w-3" /> {t.date}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
