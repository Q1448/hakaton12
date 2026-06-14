import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, BookOpen, Users, Trophy, Zap } from "lucide-react";
import laurels from "@/assets/laurels.png";
import gradIcon from "@/assets/grad-icon.png";

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
      {/* Hero — ielts.gg style */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-12 pb-20 md:pt-20 md:pb-28 text-center">
          {/* Big symbolic graphic */}
          <div className="relative mx-auto w-full max-w-3xl aspect-[2/1] flex items-center justify-center">
            <img
              src={laurels}
              alt=""
              aria-hidden
              width={1536}
              height={768}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            />
            <div className="relative flex flex-col items-center justify-center">
              <img
                src={gradIcon}
                alt=""
                aria-hidden
                width={220}
                height={220}
                className="w-32 sm:w-40 md:w-52 h-auto"
              />
              <div className="mt-2 text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-foreground leading-none">
                100<span className="text-primary">%</span>
              </div>
            </div>
          </div>

          <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] max-w-3xl mx-auto">
            Поступи в ВУЗ мечты <br className="hidden sm:block" />
            с первой попытки
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Mentoria Hub — возможности, курсы и менторы для школьников Казахстана. Всё для поступления в одном месте.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="rounded-full text-base px-7 h-12 bg-primary hover:bg-primary/90">
              <Link to="/opportunities">
                Начать подготовку <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full text-base px-7 h-12">
              <Link to="/courses">Платформа</Link>
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-sm text-muted-foreground mb-4">
            <Sparkles className="h-4 w-4 text-primary" /> Платформа
          </div>
          <h2 className="text-3xl md:text-4xl font-black">Всё для твоего будущего</h2>
        </div>
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
