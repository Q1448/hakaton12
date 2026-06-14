import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Calendar, MessageCircle, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Личный кабинет — Mentoria Hub" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Привет, Айдар 👋</h1>
            <p className="text-muted-foreground mt-1">Продолжай в том же духе. Ты на правильном пути.</p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Общий прогресс</div>
              <div className="font-semibold">68%</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Мои курсы */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Мои курсы</h2>
            </div>
            <div className="space-y-4">
              {[
                { t: "Подготовка к SAT", p: 65 },
                { t: "IELTS Academic", p: 30 },
                { t: "ЕНТ — Математика", p: 80 },
              ].map((c) => (
                <Link to="/courses/$courseId" params={{ courseId: "sat" }} key={c.t} className="block">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{c.t}</span>
                    <span className="text-muted-foreground">{c.p}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${c.p}%` }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Сохранённые */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Сохранённые возможности</h2>
            </div>
            <ul className="space-y-3">
              {[
                "Грант Назарбаев Университета",
                "Стипендия Болашак",
                "Летняя школа KIMEP",
              ].map((s) => (
                <li key={s} className="text-sm flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" size="sm" className="mt-5 w-full">
              <Link to="/opportunities">Смотреть все</Link>
            </Button>
          </div>

          {/* Дедлайны */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Ближайшие дедлайны</h2>
            </div>
            <ul className="space-y-3">
              {[
                { t: "Подача на Halyk Finance", d: "10 фев", urgent: true },
                { t: "Олимпиада «Жас Талант»", d: "15 мар" },
                { t: "Грант НУ", d: "1 апр" },
              ].map((d) => (
                <li key={d.t} className="flex items-center justify-between text-sm border-b border-border last:border-0 pb-3 last:pb-0">
                  <span>{d.t}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${d.urgent ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                    {d.d}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Floating AI chat button */}
      <button
        className="fixed bottom-24 md:bottom-6 right-6 z-30 h-14 w-14 rounded-full grid place-items-center text-white shadow-2xl hover:scale-110 transition-transform"
        style={{ background: "var(--gradient-hero)" }}
        aria-label="AI чат"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </AppShell>
  );
}
