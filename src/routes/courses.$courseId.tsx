import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Play, FileText, CheckCircle2, Download, ChevronLeft, Award, Circle } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { COURSES, totalLessons } from "@/lib/mock-data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import jsPDF from "jspdf";
import QRCode from "qrcode";

export const Route = createFileRoute("/courses/$courseId")({
  head: () => ({ meta: [{ title: "Курс — Mentoria Hub" }] }),
  component: CoursePlayer,
});

function CoursePlayer() {
  const { courseId } = Route.useParams();
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) throw notFound();

  const { t, progress, toggleLessonDone, passedTests, passTest, user } = useApp();
  const total = totalLessons(course);
  const doneList = progress[course.id] ?? [];
  const pct = Math.round((doneList.length / total) * 100);
  const testPassed = !!passedTests[course.id];

  const firstUncompleted =
    course.modules.flatMap((m) => m.lessons).find((l) => !doneList.includes(l.id))?.id ?? course.modules[0].lessons[0].id;
  const [activeLesson, setActiveLesson] = useState<string>(firstUncompleted);
  const [tab, setTab] = useState<"materials" | "test">("materials");

  const lesson =
    course.modules.flatMap((m) => m.lessons).find((l) => l.id === activeLesson) ?? course.modules[0].lessons[0];

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
          <ChevronLeft className="h-4 w-4" /> Все курсы
        </Link>

        <div className="grid lg:grid-cols-[340px_1fr] gap-6">
          <aside className="rounded-2xl border border-border bg-card p-4 h-fit lg:sticky lg:top-20">
            <h2 className="font-semibold mb-1 px-2">{course.title}</h2>
            <p className="text-xs text-muted-foreground px-2 mb-3">Ментор: {course.mentor}</p>

            <div className="px-2 mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">{t("progress")}</span>
                <span className="font-medium">{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <div className="space-y-4">
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
            <div className="aspect-video rounded-2xl bg-slate-900 grid place-items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
              <button className="relative grid place-items-center h-20 w-20 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition-colors border border-white/20">
                <Play className="h-9 w-9 text-white fill-white ml-1" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="flex-1 h-1 bg-white/20 rounded-full">
                  <div className="h-full w-1/3 bg-primary rounded-full" />
                </div>
                <span className="text-xs text-white/80">04:21 / {lesson.duration}</span>
              </div>
            </div>

            <div className="flex items-start justify-between gap-3 mt-6 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-muted-foreground mt-2">Урок длится {lesson.duration}. После прохождения отметь его в списке слева.</p>
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
              <div className="flex gap-1">
                <button
                  onClick={() => setTab("materials")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${
                    tab === "materials" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                  }`}
                >
                  {t("materials")}
                </button>
                <button
                  onClick={() => setTab("test")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${
                    tab === "test" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                  }`}
                >
                  {t("test")}
                </button>
              </div>
            </div>

            <div className="py-6">
              {tab === "materials" ? (
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
              ) : (
                <div className="rounded-xl border border-border bg-card p-6 text-center">
                  <div className="text-lg font-semibold mb-2">Финальный тест курса</div>
                  <p className="text-sm text-muted-foreground mb-4">10 вопросов · 15 минут · проходной балл 70%</p>
                  {testPassed ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="h-4 w-4" /> Тест сдан · +10 XP
                    </div>
                  ) : (
                    <Button onClick={() => passTest(course.id)}>{t("pass_test")}</Button>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
