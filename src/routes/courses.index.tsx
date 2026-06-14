import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Star } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "Курсы Mentoria — Mentoria Hub" }] }),
  component: Courses,
});

const courses = [
  { id: "sat", title: "Подготовка к SAT", desc: "Полный курс по математике и английскому для сдачи SAT.", lessons: 42, progress: 65, rating: 4.9 },
  { id: "ielts", title: "Подготовка к IELTS Academic", desc: "Все 4 секции: Listening, Reading, Writing, Speaking.", lessons: 36, progress: 30, rating: 4.8 },
  { id: "econ", title: "Введение в экономику", desc: "Микро- и макроэкономика для старшеклассников.", lessons: 24, progress: 0, rating: 4.7 },
  { id: "ent", title: "Подготовка к ЕНТ — Математика", desc: "Разбор всех тем профильной математики.", lessons: 48, progress: 80, rating: 4.9 },
  { id: "code", title: "Основы программирования на Python", desc: "От переменных до объектно-ориентированного программирования.", lessons: 30, progress: 45, rating: 4.8 },
  { id: "essay", title: "Personal Statement & Эссе", desc: "Как написать сильное мотивационное письмо для ВУЗа.", lessons: 12, progress: 100, rating: 5.0 },
];

function Courses() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Курсы Mentoria</h1>
        <p className="text-muted-foreground mb-8">Асинхронные курсы с сертификатами от ведущих менторов.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((c) => (
            <Link
              key={c.id}
              to="/courses/$courseId"
              params={{ courseId: c.id }}
              className="rounded-2xl border border-border bg-card p-5 hover:shadow-lg transition-all hover:-translate-y-0.5 block"
            >
              <div className="h-32 -mx-5 -mt-5 mb-4 rounded-t-2xl bg-gradient-to-br from-primary to-primary/40 grid place-items-center">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {c.lessons} уроков</span>
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" /> {c.rating}</span>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Прогресс</span>
                  <span className="font-medium">{c.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary transition-all" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
