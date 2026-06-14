import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, FileCheck, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Админ-панель — Mentoria Hub" }] }),
  component: Admin,
});

const users = [
  { name: "Айдар Нурланов", email: "aidar@mail.kz", role: "Ученик", status: "Активен" },
  { name: "Динара Кенжебаева", email: "dinara@mail.kz", role: "Ментор", status: "Активен" },
  { name: "Алишер Сатпаев", email: "alisher@mail.kz", role: "Ученик", status: "Заблокирован" },
  { name: "Айгерим Жумабекова", email: "aigerim@mail.kz", role: "Админ", status: "Активен" },
];

const content = [
  { title: "Подготовка к SAT", type: "Курс", author: "Динара К.", status: "Опубликовано" },
  { title: "Грант НУ 2026", type: "Возможность", author: "Админ", status: "Опубликовано" },
  { title: "Введение в Python", type: "Курс", author: "Бакыт Е.", status: "На модерации" },
];

function Admin() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Админ-панель</h1>
        <p className="text-muted-foreground mb-8">Управление пользователями и контентом платформы.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Users, l: "Пользователи", v: "15,420" },
            { icon: BookOpen, l: "Курсы", v: "120" },
            { icon: FileCheck, l: "Возможности", v: "542" },
            { icon: TrendingUp, l: "Активность", v: "+12%" },
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

        <section className="rounded-2xl border border-border bg-card overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Пользователи</h2>
            <Button size="sm">Добавить</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="text-left px-6 py-3">Имя</th>
                  <th className="text-left px-6 py-3">Email</th>
                  <th className="text-left px-6 py-3">Роль</th>
                  <th className="text-left px-6 py-3">Статус</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="border-t border-border">
                    <td className="px-6 py-3 font-medium">{u.name}</td>
                    <td className="px-6 py-3 text-muted-foreground">{u.email}</td>
                    <td className="px-6 py-3">{u.role}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${u.status === "Активен" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Контент</h2>
            <Button size="sm" variant="outline">Модерация</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="text-left px-6 py-3">Название</th>
                  <th className="text-left px-6 py-3">Тип</th>
                  <th className="text-left px-6 py-3">Автор</th>
                  <th className="text-left px-6 py-3">Статус</th>
                </tr>
              </thead>
              <tbody>
                {content.map((c) => (
                  <tr key={c.title} className="border-t border-border">
                    <td className="px-6 py-3 font-medium">{c.title}</td>
                    <td className="px-6 py-3 text-muted-foreground">{c.type}</td>
                    <td className="px-6 py-3">{c.author}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${c.status === "Опубликовано" ? "bg-primary/10 text-primary" : "bg-yellow-500/10 text-yellow-600"}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
