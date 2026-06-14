import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Play, FileText, CheckCircle2, Download, ChevronLeft, Lock } from "lucide-react";

export const Route = createFileRoute("/courses/$courseId")({
  head: () => ({ meta: [{ title: "Курс — Mentoria Hub" }] }),
  component: CoursePlayer,
});

const modules = [
  {
    title: "Модуль 1. Введение",
    lessons: [
      { title: "Урок 1. Знакомство с курсом", done: true },
      { title: "Урок 2. Структура экзамена", done: true },
    ],
  },
  {
    title: "Модуль 2. Основы",
    lessons: [
      { title: "Урок 3. Базовая лексика", done: false, current: true },
      { title: "Урок 4. Грамматика", done: false },
      { title: "Урок 5. Практика", done: false, locked: true },
    ],
  },
  {
    title: "Модуль 3. Углублённый разбор",
    lessons: [
      { title: "Урок 6. Сложные темы", done: false, locked: true },
      { title: "Урок 7. Финальный тест", done: false, locked: true },
    ],
  },
];

function CoursePlayer() {
  const [tab, setTab] = useState<"materials" | "test">("materials");

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <Link to="/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ChevronLeft className="h-4 w-4" /> Все курсы
        </Link>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Lesson list */}
          <aside className="rounded-2xl border border-border bg-card p-4 h-fit lg:sticky lg:top-20">
            <h2 className="font-semibold mb-4 px-2">Программа курса</h2>
            <div className="space-y-4">
              {modules.map((m) => (
                <div key={m.title}>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2 mb-2">{m.title}</div>
                  <ul className="space-y-1">
                    {m.lessons.map((l) => (
                      <li
                        key={l.title}
                        className={`flex items-center gap-2 text-sm px-2 py-2 rounded-lg cursor-pointer ${
                          l.current ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                        } ${l.locked ? "opacity-50" : ""}`}
                      >
                        {l.done ? (
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        ) : l.locked ? (
                          <Lock className="h-4 w-4 shrink-0" />
                        ) : (
                          <Play className="h-4 w-4 shrink-0" />
                        )}
                        <span className="truncate">{l.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 gap-2" variant="outline">
              <Download className="h-4 w-4" /> Скачать сертификат (PDF)
            </Button>
          </aside>

          {/* Player */}
          <section>
            <div className="aspect-video rounded-2xl bg-slate-900 grid place-items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
              <button className="relative grid place-items-center h-20 w-20 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition-colors border border-white/20">
                <Play className="h-9 w-9 text-white fill-white ml-1" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="flex-1 h-1 bg-white/20 rounded-full">
                  <div className="h-full w-1/3 bg-primary rounded-full" />
                </div>
                <span className="text-xs text-white/80">04:21 / 12:48</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold mt-6">Урок 3. Базовая лексика</h1>
            <p className="text-muted-foreground mt-2">Разбираем 200 основных слов уровня B1, необходимых для теста.</p>

            {/* Tabs */}
            <div className="mt-6 border-b border-border">
              <div className="flex gap-1">
                <button
                  onClick={() => setTab("materials")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${
                    tab === "materials" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                  }`}
                >
                  Материалы (PDF)
                </button>
                <button
                  onClick={() => setTab("test")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${
                    tab === "test" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                  }`}
                >
                  Тест
                </button>
              </div>
            </div>

            <div className="py-6">
              {tab === "materials" ? (
                <div className="space-y-3">
                  {["Конспект урока", "Список слов с переводом", "Дополнительные упражнения"].map((m) => (
                    <div key={m} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{m}.pdf</div>
                          <div className="text-xs text-muted-foreground">PDF · ~2 МБ</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Download className="h-4 w-4" /> Скачать
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-card p-6 text-center">
                  <div className="text-lg font-semibold mb-2">Тест по уроку</div>
                  <p className="text-sm text-muted-foreground mb-4">10 вопросов · 15 минут · проходной балл 70%</p>
                  <Button>Начать тест</Button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
