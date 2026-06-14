import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, BookOpen, Users, Trophy, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mentoria Hub — Возможности и курсы для школьников Казахстана" },
      { name: "description", content: "Образовательный хаб для учеников средней и старшей школы Казахстана. Найди свой путь к поступлению в ВУЗ." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_color-mix(in_oklab,var(--primary)_15%,transparent),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-sm text-muted-foreground mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            Новая платформа для школьников Казахстана
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Возможности + Асинхронные курсы<br className="hidden md:block" />
            <span className="text-primary"> на одной платформе</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Образовательный хаб для учеников средней и старшей школы Казахстана.
            Найди свой путь к поступлению в ВУЗ.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="btn-hero text-base px-8 h-12">
              <Link to="/opportunities">
                Найти возможности <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8 h-12">
              <Link to="/courses">Начать обучение</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { v: "500+", l: "Возможностей" },
              { v: "120", l: "Курсов" },
              { v: "15K", l: "Учеников" },
              { v: "98%", l: "Поступают" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-3xl font-bold text-primary">{s.v}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Всё для твоего будущего</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Олимпиады и гранты", desc: "Подбор актуальных конкурсов и стипендий под твой профиль." },
            { icon: BookOpen, title: "Курсы Mentoria", desc: "SAT, IELTS, экономика — асинхронные курсы с сертификатами." },
            { icon: Trophy, title: "Индивидуальный Roadmap", desc: "Пошаговый план поступления с 9 по 12 класс." },
            { icon: Users, title: "Менторы", desc: "Студенты топ-ВУЗов делятся опытом и помогают с подготовкой." },
            { icon: Zap, title: "AI-ассистент", desc: "Умный чат-бот ответит на вопросы и подберёт ресурсы 24/7." },
            { icon: Sparkles, title: "Сертификаты", desc: "Получай PDF-сертификаты по итогам каждого курса." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
