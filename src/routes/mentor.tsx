import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Upload, Video, Users, Eye, Star } from "lucide-react";

export const Route = createFileRoute("/mentor")({
  head: () => ({ meta: [{ title: "Кабинет ментора — Mentoria Hub" }] }),
  component: Mentor,
});

function Mentor() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Кабинет ментора</h1>
        <p className="text-muted-foreground mb-8">Загружай уроки, отслеживай прогресс учеников.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, l: "Ученики", v: "342" },
            { icon: Video, l: "Уроков", v: "48" },
            { icon: Eye, l: "Просмотров", v: "12.4K" },
            { icon: Star, l: "Рейтинг", v: "4.9" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-5">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary mb-3">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="text-sm text-muted-foreground">{s.l}</div>
              <div className="text-2xl font-bold">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-semibold mb-4">Загрузить новый урок</h2>
            <div className="border-2 border-dashed border-border rounded-xl p-10 text-center">
              <div className="grid h-14 w-14 mx-auto place-items-center rounded-full bg-primary/10 text-primary mb-3">
                <Upload className="h-6 w-6" />
              </div>
              <div className="font-medium">Перетащи видео сюда</div>
              <p className="text-sm text-muted-foreground mt-1">MP4, MOV до 2 ГБ</p>
              <Button className="mt-4">Выбрать файл</Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Название урока</label>
                <input className="w-full h-10 px-3 rounded-lg border border-border bg-background" placeholder="Например: Введение в SAT" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Курс</label>
                <select className="w-full h-10 px-3 rounded-lg border border-border bg-background">
                  <option>Подготовка к SAT</option>
                  <option>IELTS Academic</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium mb-1.5 block">Описание</label>
                <textarea rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background" />
              </div>
            </div>
            <Button className="mt-5">Опубликовать урок</Button>
          </div>

          {/* My courses */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-semibold mb-4">Мои курсы</h2>
            <ul className="space-y-4">
              {[
                { t: "Подготовка к SAT", s: 142, l: 42 },
                { t: "IELTS Academic", s: 89, l: 36 },
                { t: "Эссе для ВУЗа", s: 111, l: 12 },
              ].map((c) => (
                <li key={c.t} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <div className="font-medium">{c.t}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.s} учеников · {c.l} уроков</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
