import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/app-context";
import { GraduationCap, Sparkles, Target, Check } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Онбординг — Mentoria Hub" }] }),
  component: Onboarding,
});

const INTERESTS = ["STEM", "Бизнес", "Финансы", "IT", "Языки", "Арт"];
const GOALS = ["ВУЗ за рубежом", "ВУЗ в Казахстане", "Олимпиады", "Развитие навыков"];

function Onboarding() {
  const { t, user, setUser } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(user.name);
  const [grade, setGrade] = useState<number | null>(user.grade);
  const [interests, setInterests] = useState<string[]>(user.interests);
  const [goal, setGoal] = useState<string | null>(user.goal);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const finish = () => {
    setUser({ name, grade, interests, goal, onboarded: true });
    navigate({ to: "/dashboard" });
  };

  const toggleInterest = (x: string) =>
    setInterests((arr) => arr.includes(x) ? arr.filter(y => y !== x) : [...arr, x]);

  const canNext =
    step === 0 ? name.trim().length > 1 && grade !== null :
    step === 1 ? interests.length > 0 :
    step === 2 ? goal !== null : true;

  const steps = [
    { icon: GraduationCap, title: t("grade_q") },
    { icon: Sparkles, title: t("interests_q") },
    { icon: Target, title: t("goal_q") },
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("onb_title")}</h1>
          <p className="text-muted-foreground">{t("onb_sub")}</p>
        </div>

        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  {(() => { const I = steps[step].icon; return <I className="h-5 w-5" />; })()}
                </div>
                <h2 className="text-xl font-semibold">{steps[step].title}</h2>
              </div>

              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium block mb-2">Имя и фамилия</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Айгерим Ержанова" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Класс</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[8, 9, 10, 11].map((g) => (
                        <button
                          key={g}
                          onClick={() => setGrade(g)}
                          className={`h-14 rounded-xl border-2 font-semibold transition-all ${
                            grade === g ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {INTERESTS.map((x) => {
                    const active = interests.includes(x);
                    return (
                      <button
                        key={x}
                        onClick={() => toggleInterest(x)}
                        className={`rounded-xl border-2 px-4 py-4 text-sm font-medium transition-all flex items-center justify-between ${
                          active ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"
                        }`}
                      >
                        {x}
                        {active && <Check className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  {GOALS.map((x) => {
                    const active = goal === x;
                    return (
                      <button
                        key={x}
                        onClick={() => setGoal(x)}
                        className={`w-full rounded-xl border-2 px-4 py-4 text-left font-medium transition-all flex items-center justify-between ${
                          active ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"
                        }`}
                      >
                        {x}
                        {active && <Check className="h-5 w-5" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-between gap-3">
          <Button variant="outline" onClick={back} disabled={step === 0}>{t("back")}</Button>
          {step < 2 ? (
            <Button onClick={next} disabled={!canNext}>{t("next")}</Button>
          ) : (
            <Button onClick={finish} disabled={!canNext}>{t("finish")}</Button>
          )}
        </div>
      </div>
    </AppShell>
  );
}
