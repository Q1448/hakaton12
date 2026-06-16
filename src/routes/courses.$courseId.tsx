import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, Download, ChevronLeft, Award, Circle, Loader2, VideoOff, Sparkles, Brain, AlertCircle, MapPin, Star } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { COURSES, totalLessons } from "@/lib/mock-data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { scoreResume, type ResumeScore } from "@/lib/ai.functions";

export const Route = createFileRoute("/courses/$courseId")({
  head: () => ({ meta: [{ title: "Курс — Mentoria Hub" }] }),
  component: CoursePlayer;
});

function CoursePlayer() {
  const { courseId } = Route.useParams();
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) throw notFound();

  const { t, progress, toggleLessonDone, passedTests, passTest, user, lang } = useApp();
  const total = totalLessons(course);
  const doneList = progress[course.id] ?? [];
  const pct = Math.round((doneList.length / total) * 100);
  const testPassed = !!passedTests[course.id];

  const firstUncompleted =
    course.modules.flatMap((m) => m.lessons).find((l) => !doneList.includes(l.id))?.id ?? course.modules[0].lessons[0].id;
  const [activeLesson, setActiveLesson] = useState<string>(firstUncompleted);
  const [tab, setTab] = useState<"materials" | "test" | "ai">("materials");

  const lesson =
    course.modules.flatMap((m) => m.lessons).find((l) => l.id === activeLesson) ?? course.modules[0].lessons[0];

  // Simulate video loading on lesson change
  const [videoState, setVideoState] = useState<"loading" | "missing">("loading");
  useEffect(() => {
    setVideoState("loading");
    const timer = setTimeout(() => setVideoState("missing"), 1800);
    return () => clearTimeout(timer);
  }, [activeLesson]);

  const completed = pct >= 100;

  const downloadCert = async () => {
    const qrDataUrl = await QRCode.toDataURL(
      `https://mentoria.hub/verify/${course.id}/${encodeURIComponent(user.name)}`,
      { margin: 1, width: 200 }
    );
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, W, H, "F");
    doc.setDrawColor(96, 165, 250);
    doc.setLineWidth(4);
    doc.rect(28, 28, W - 56, H - 56);
    doc.setTextColor(96, 165, 250);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("MENTORIA HUB", W / 2, 80, { align: "center" });
    doc.setTextColor(248, 250, 252);
    doc.setFontSize(36);
    doc.text("CERTIFICATE", W / 2, 140, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("of Completion", W / 2, 168, { align: "center" });
    doc.setFontSize(16);
    doc.text("This certifies that", W / 2, 220, { align: "center" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text(user.name, W / 2, 260, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("has successfully completed the course", W / 2, 290, { align: "center" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(`"${course.title}"`, W / 2, 325, { align: "center" });
    const date = new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Дата выдачи: ${date}`, W / 2, 360, { align: "center" });
    doc.text(`Ментор: ${course.mentor}`, W / 2, 380, { align: "center" });
    doc.addImage(qrDataUrl, "PNG", W - 150, H - 150, 100, 100);
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text("Сканируй для верификации", W - 100, H - 40, { align: "center" });
    doc.save(`Mentoria-Certificate-${course.id}.pdf`);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <Link to="/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ChevronLeft className="h-4 w-4" /> {t("all_courses")}
        </Link>

        <div className="grid lg:grid-cols-[340px_1fr] gap-6">
          <aside className="rounded-2xl border border-border bg-card p-4 h-fit lg:sticky lg:top-20">
            <h2 className="font-semibold mb-1 px-2">{course.title}</h2>
            <p className="text-xs text-muted-foreground px-2">{t("mentor_label")}: {course.mentor}</p>
            <p className="text-xs text-muted-foreground px-2 mb-3 flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {course.city}{course.address ? `, ${course.address}` : ""}
              <Star className="h-3 w-3 ml-2 fill-yellow-500 text-yellow-500" /> {course.rating}
            </p>

            <div className="px-2 mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">{t("progress")}</span>
                <span className="font-medium">{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <div className="space-y-4 max-h-[55vh] overflow-y-auto">
              {course.modules.map((m) => (
                <div key={m.title}>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2 mb-2">{m.title}</div>
                  <ul className="space-y-1">
                    {m.lessons.map((l) => {
                      const isDone = doneList.includes(l.id);
                      const isActive = activeLesson === l.id;
                      return (
                        <li
                          key={l.id}
                          onClick={() => setActiveLesson(l.id)}
                          className={`flex items-center gap-2 text-sm px-2 py-2 rounded-lg cursor-pointer transition-colors ${
                            isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                          }`}
                        >
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleLessonDone(course.id, l.id, total); }}
                            className="shrink-0"
                            aria-label={t("mark_done")}
                          >
                            {isDone ? (
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
                            )}
                          </button>
                          <span className="truncate flex-1">{l.title}</span>
                          <span className="text-xs text-muted-foreground">{l.duration}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="block mt-4">
                    <Button
                      className="w-full gap-2"
                      variant={completed ? "default" : "outline"}
                      disabled={!completed}
                      onClick={completed ? downloadCert : undefined}
                    >
                      {completed ? <Award className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                      {t("download_cert")}
                    </Button>
                  </span>
                </TooltipTrigger>
                {!completed && <TooltipContent>{t("cert_locked")}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </aside>

          <section>
            {/* Video player */}
            <div className="aspect-video rounded-2xl bg-slate-950 grid place-items-center relative overflow-hidden border border-border">
              {videoState === "loading" ? (
                <div className="flex flex-col items-center gap-3 text-white">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <p className="text-sm text-white/70">{t("video_loading")}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-center px-6">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-amber-500/20 border border-amber-500/40">
                    <VideoOff className="h-8 w-8 text-amber-400" />
                  </div>
                  <p className="text-white font-semibold">{t("video_missing")}</p>
                  <p className="text-sm text-white/60 max-w-md">{t("video_missing_sub")}</p>
                </div>
              )}
            </div>

            <div className="flex items-start justify-between gap-3 mt-6 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-muted-foreground mt-2">{t("lesson_hint")}</p>
              </div>
              <Button
                variant={doneList.includes(lesson.id) ? "outline" : "default"}
                onClick={() => toggleLessonDone(course.id, lesson.id, total)}
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                {doneList.includes(lesson.id) ? t("done") : t("mark_done")}
              </Button>
            </div>

            <div className="mt-6 border-b border-border">
              <div className="flex gap-1 flex-wrap">
                {(["materials", "test", "ai"] as const).map((tk) => (
                  <button
                    key={tk}
                    onClick={() => setTab(tk)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px flex items-center gap-1.5 ${
                      tab === tk ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                    }`}
                  >
                    {tk === "ai" && <Brain className="h-4 w-4" />}
                    {tk === "materials" ? t("materials") : tk === "test" ? t("test") : t("ai_mentor")}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-6">
              {tab === "materials" && (
                <div className="space-y-3">
                  {["Конспект урока", "Дополнительные материалы", "Практические задания"].map((m) => (
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
              )}
              {tab === "test" && (
                <div className="rounded-xl border border-border bg-card p-6 text-center">
                  <div className="text-lg font-semibold mb-2">{t("final_test")}</div>
                  <p className="text-sm text-muted-foreground mb-4">{t("final_test_desc")}</p>
                  {testPassed ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="h-4 w-4" /> {t("test_passed")}
                    </div>
                  ) : (
                    <Button onClick={() => passTest(course.id)}>{t("pass_test")}</Button>
                  )}
                </div>
              )}
              {tab === "ai" && <AiMentorPanel lang={lang} userName={user.name} userGrade={user.grade ?? 11} />}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function AiMentorPanel({ lang, userName, userGrade }: { lang: "RU" | "KZ" | "EN"; userName: string; userGrade: number }) {
  const { t } = useApp();
  const [form, setForm] = useState({
    achievements: "",
    activities: "",
    direction: "",
    university: "",
    whyUniversity: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResumeScore | null>(null);

  const canSubmit = Object.values(form).every((v) => v.trim().length >= 3);

  const onSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const res = await scoreResume({
        data: { ...form, name: userName, grade: userGrade, lang },
      });
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-6">
          <div className="flex items-center gap-4">
            <div className="relative h-28 w-28 shrink-0">
              <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" className="text-muted" fill="none" />
                <circle
                  cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8"
                  className="text-primary"
                  strokeDasharray={`${(result.score / 100) * 264} 264`}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <span className="text-3xl font-black">{result.score}</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{t("ai_score")} · /100</div>
              <div className="text-xl font-bold mt-1">{result.level}</div>
              <p className="text-sm text-muted-foreground mt-1">{result.summary}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-500" /> {t("ai_strengths")}</h3>
            <ul className="space-y-2 text-sm">
              {result.strengths.map((s, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><AlertCircle className="h-4 w-4 text-amber-500" /> {t("ai_improvements")}</h3>
            <ul className="space-y-2 text-sm">
              {result.improvements.map((s, i) => (
                <li key={i} className="flex gap-2"><Circle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {result.breakdown?.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-4">{t("ai_breakdown")}</h3>
            <div className="space-y-3">
              {result.breakdown.map((b, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{b.name}</span>
                    <span className="font-mono">{b.score}/100</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary/60" style={{ width: `${b.score}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{b.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button variant="outline" onClick={() => { setResult(null); }}>{t("ai_reset")}</Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
          <Brain className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold">{t("ai_title")}</h2>
          <p className="text-sm text-muted-foreground">{t("ai_sub")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <Field label={t("ai_achievements")} placeholder={t("ai_achievements_ph")} rows={3} value={form.achievements} onChange={(v) => setForm({ ...form, achievements: v })} />
        <Field label={t("ai_activities")} placeholder={t("ai_activities_ph")} rows={3} value={form.activities} onChange={(v) => setForm({ ...form, activities: v })} />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label={t("ai_direction")} placeholder={t("ai_direction_ph")} value={form.direction} onChange={(v) => setForm({ ...form, direction: v })} />
          <Field label={t("ai_university")} placeholder={t("ai_university_ph")} value={form.university} onChange={(v) => setForm({ ...form, university: v })} />
        </div>
        <Field label={t("ai_why")} placeholder={t("ai_why_ph")} rows={4} value={form.whyUniversity} onChange={(v) => setForm({ ...form, whyUniversity: v })} />

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/5 text-destructive text-sm p-3">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <Button onClick={onSubmit} disabled={!canSubmit || loading} className="gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? t("ai_evaluating") : t("ai_evaluate")}
          </Button>
          {!canSubmit && <span className="text-xs text-muted-foreground">{t("ai_required")}</span>}
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, rows = 1 }: { label: string; placeholder: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">{label}</span>
      {rows > 1 ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      )}
    </label>
  );
}
