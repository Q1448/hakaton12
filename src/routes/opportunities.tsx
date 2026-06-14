import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, Calendar, Tag } from "lucide-react";

export const Route = createFileRoute("/opportunities")({
  head: () => ({ meta: [{ title: "Каталог возможностей — Mentoria Hub" }] }),
  component: Opportunities,
});

const items = [
  { title: "Олимпиада «Жас Талант» по математике", category: "STEM", deadline: "15 марта 2026", desc: "Республиканская олимпиада для учеников 9-11 классов с призовым фондом.", req: "9-11 класс, средний балл от 4" },
  { title: "Грант Назарбаев Университета", category: "Гранты", deadline: "1 апреля 2026", desc: "Полное покрытие обучения на бакалавриате в одном из топ-ВУЗов страны.", req: "11-12 класс, IELTS 6.5+" },
  { title: "Летняя школа KIMEP по бизнесу", category: "Бизнес", deadline: "20 мая 2026", desc: "Двухнедельная интенсивная программа по предпринимательству и менеджменту.", req: "10-11 класс" },
  { title: "Стажировка в Halyk Finance", category: "Финансы", deadline: "10 февраля 2026", desc: "Месячная стажировка в инвестиционном подразделении банка.", req: "11-12 класс, базы Excel" },
  { title: "Конкурс инженерных проектов", category: "STEM", deadline: "25 апреля 2026", desc: "Защита собственного инженерного проекта перед жюри из IT-компаний.", req: "9-12 класс" },
  { title: "Стипендия Болашак", category: "Гранты", deadline: "1 июня 2026", desc: "Полное финансирование обучения в зарубежных университетах.", req: "12 класс, IELTS 7.0+" },
];

const categories = ["Все", "STEM", "Бизнес", "Финансы", "Гранты"];

function Opportunities() {
  const [cat, setCat] = useState("Все");
  const [q, setQ] = useState("");
  const [favs, setFavs] = useState<Set<number>>(new Set());

  const toggleFav = (i: number) => {
    setFavs((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  };

  const filtered = items.filter(
    (it) =>
      (cat === "Все" || it.category === cat) &&
      it.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Каталог возможностей</h1>
        <p className="text-muted-foreground mb-8">Олимпиады, гранты, стажировки и конкурсы для школьников.</p>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск олимпиад, гранты, стажировок..."
            className="pl-12 h-14 text-base bg-card border-border"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={cat === c ? "default" : "outline"}
              onClick={() => setCat(c)}
            >
              {c}
            </Button>
          ))}
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="outline">Класс/Возраст</Button>
            <Button size="sm" variant="outline">Формат</Button>
            <Button size="sm" variant="outline">Дедлайн</Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((it, i) => (
            <div key={i} className="relative rounded-2xl border border-border bg-card p-5 hover:shadow-lg transition-all hover:-translate-y-0.5">
              <button
                onClick={() => toggleFav(i)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Save"
              >
                <Heart className={`h-5 w-5 ${favs.has(i) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
              </button>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                <Tag className="h-3 w-3" /> {it.category}
              </div>
              <h3 className="font-semibold text-lg mb-2 pr-8">{it.title}</h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                <Calendar className="h-4 w-4" /> до {it.deadline}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{it.desc}</p>
              <p className="text-xs text-muted-foreground mb-4"><span className="font-medium text-foreground">Требования:</span> {it.req}</p>
              <Button className="w-full">Подать заявку</Button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
