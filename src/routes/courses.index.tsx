import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { BookOpen, Clock, Star, Trophy, Sparkles } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { COURSES, LEADERBOARD, totalLessons } from "@/lib/mock-data";
import { useMemo } from "react";

export const Route = createFileRoute("/courses/")({
  head: () => ({ meta: [{ title: "Курсы Mentoria — Mentoria Hub" }] }),
  component: Courses,
});

function Courses() {
  const { t, progress, xp, user } = useApp();

  const board = useMemo(() => {
    const me = { id: "me", name: user.name, xp, avatar: user.name.split(" ").map(s => s[0]).join("").slice(0, 2), me: true };
    return [...LEADERBOARD, me].sort((a, b) => b.xp - a.xp).slice(0, 10);
  }, [xp, user.name]);

  const myRank = board.findIndex(b => (b as { me?: boolean }).me) + 1;

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("courses_title")}</h1>
        <p className="text-muted-foreground mb-8">{t("courses_sub")}</p>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="grid sm:grid-cols-2 gap-5">
            {COURSES.map((c) => {
              const total = totalLessons(c);
              const done = (progress[c.id] ?? []).length;
              const pct = Math.round((done / total) * 100);
              return (
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
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{c.desc}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {total} {t("lessons")}</span>
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" /> {c.rating}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{t("progress")}</span>
                      <span className="font-medium">{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <aside className="rounded-2xl border border-border bg-card p-5 h-fit lg:sticky lg:top-20">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <h2 className="font-semibold">{t("leaderboard")}</h2>
            </div>
            <div className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> {t("you")}: {myRank ? `#${myRank}` : "—"} · {xp} XP
            </div>
            <ul className="space-y-2">
              {board.map((b, i) => {
                const me = (b as { me?: boolean }).me;
                return (
                  <li key={b.id} className={`flex items-center gap-3 rounded-lg px-2 py-1.5 ${me ? "bg-primary/10 ring-1 ring-primary/40" : ""}`}>
                    <span className={`w-6 text-sm font-semibold ${i < 3 ? "text-primary" : "text-muted-foreground"}`}>{i + 1}</span>
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-xs font-semibold">{b.avatar}</div>
                    <span className={`flex-1 text-sm truncate ${me ? "font-semibold" : ""}`}>{me ? t("you") : b.name}</span>
                    <span className="text-sm font-mono text-muted-foreground">{b.xp}</span>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
