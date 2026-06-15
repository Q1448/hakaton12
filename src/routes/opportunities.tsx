import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, Calendar, Tag, Users, Sparkles, Send } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { OPPORTUNITIES, CATEGORIES, GRADE_FILTERS, BUDDIES, type Opportunity } from "@/lib/mock-data";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/opportunities")({
  head: () => ({ meta: [{ title: "Каталог возможностей — Mentoria Hub" }] }),
  component: Opportunities,
});

function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return v;
}

function matchScore(op: Opportunity, interests: string[]): number {
  if (!interests.length) return 0;
  const tags = [...op.tags, op.category];
  const overlap = tags.filter((tag) => interests.some(i => i.toLowerCase() === tag.toLowerCase())).length;
  return Math.min(100, Math.round((overlap / interests.length) * 100));
}

function Opportunities() {
  const { t, favorites, toggleFavorite, user } = useApp();
  const [cat, setCat] = useState<string>("Все");
  const [grade, setGrade] = useState<string>("Все");
  const [q, setQ] = useState("");
  const debQ = useDebounced(q, 300);
  const [buddyFor, setBuddyFor] = useState<Opportunity | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = debQ.trim().toLowerCase();
    return OPPORTUNITIES.filter((it) => {
      if (cat !== "Все" && it.category !== cat) return false;
      if (grade !== "Все" && !it.grade.includes(Number(grade))) return false;
      if (!needle) return true;
      const hay = [it.title, it.desc, ...it.tags].join(" ").toLowerCase();
      return hay.includes(needle);
    });
  }, [cat, grade, debQ]);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("catalog_title")}</h1>
        <p className="text-muted-foreground mb-8">{t("catalog_sub")}</p>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search_placeholder")}
            className="pl-12 h-14 text-base bg-card border-border"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {CATEGORIES.map((c) => (
            <Button key={c} size="sm" variant={cat === c ? "default" : "outline"} onClick={() => setCat(c)}>
              {c}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-8 items-center">
          <span className="text-xs text-muted-foreground mr-1">Класс:</span>
          {GRADE_FILTERS.map((g) => (
            <Button key={g} size="sm" variant={grade === g ? "default" : "outline"} onClick={() => setGrade(g)}>
              {g}
            </Button>
          ))}
          <span className="ml-auto text-sm text-muted-foreground">Найдено: {filtered.length}</span>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Ничего не найдено. Попробуй изменить фильтры.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((it) => {
              const fav = favorites.includes(it.id);
              const score = matchScore(it, user.interests);
              const isOpen = expanded === it.id;
              return (
                <div key={it.id} className="relative rounded-2xl border border-border bg-card p-5 hover:shadow-lg transition-all flex flex-col">
                  <button
                    onClick={() => toggleFavorite(it.id)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
                    aria-label="Save"
                  >
                    <Heart className={`h-5 w-5 transition-colors ${fav ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                  </button>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <Tag className="h-3 w-3" /> {it.category}
                    </div>
                    {score >= 50 && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                        <Sparkles className="h-3 w-3" /> {t("match")} {score}%
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 pr-8">{it.title}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" /> до {it.deadline}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{it.desc}</p>
                  {isOpen && (
                    <p className="text-xs text-muted-foreground mb-4">
                      <span className="font-medium text-foreground">{t("requirements")}</span> {it.req}
                    </p>
                  )}
                  <div className="mt-auto flex gap-2">
                    <Button className="flex-1" onClick={() => setExpanded(isOpen ? null : it.id)}>
                      {isOpen ? t("apply") : "Подробнее"}
                    </Button>
                    {isOpen && (
                      <Button variant="outline" className="gap-1" onClick={() => setBuddyFor(it)}>
                        <Users className="h-4 w-4" /> {t("find_buddy")}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BuddyDialog op={buddyFor} onClose={() => setBuddyFor(null)} />
    </AppShell>
  );
}

type ChatMsg = { id: number; author: string; text: string; mine?: boolean };

function BuddyDialog({ op, onClose }: { op: Opportunity | null; onClose: () => void }) {
  const { t, user } = useApp();
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { id: 1, author: "Алишер", text: "Привет! Кто готовится к этому?" },
    { id: 2, author: "Мадина", text: "Я! Можем разделить темы." },
  ]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (op) {
      setMsgs([
        { id: 1, author: "Алишер", text: `Привет! Кто готовится к «${op.title}»?` },
        { id: 2, author: "Мадина", text: "Я! Давайте созвонимся." },
      ]);
    }
  }, [op]);

  const send = () => {
    const v = text.trim();
    if (!v) return;
    setMsgs((m) => [...m, { id: Date.now(), author: user.name.split(" ")[0], text: v, mine: true }]);
    setText("");
  };

  return (
    <Dialog open={!!op} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("buddy_title")}</DialogTitle>
          <DialogDescription>{op?.title}</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="list" className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">{t("buddy_list")}</TabsTrigger>
            <TabsTrigger value="chat">{t("buddy_chat")}</TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="mt-4 space-y-3">
            {BUDDIES.map((b) => (
              <div key={b.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary font-semibold">{b.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{b.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{b.grade} класс · {b.school} · {b.interests.join(", ")}</div>
                </div>
                <Button size="sm">{t("invite")}</Button>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="chat" className="mt-4">
            <div className="rounded-xl border border-border bg-muted/30 h-72 p-3 overflow-y-auto flex flex-col gap-2">
              {msgs.map((m) => (
                <div key={m.id} className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.mine ? "self-end bg-primary text-primary-foreground" : "self-start bg-card border border-border"}`}>
                  {!m.mine && <div className="text-xs font-semibold text-muted-foreground mb-0.5">{m.author}</div>}
                  {m.text}
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                placeholder={t("msg_placeholder")}
              />
              <Button onClick={send} className="gap-1"><Send className="h-4 w-4" /> {t("send")}</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
