import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mentoria Hub — Возможности и курсы для школьников" },
      { name: "description", content: "Образовательный хаб для школьников. Найди свой путь к поступлению в ВУЗ." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AppShell>
      <section className="relative w-full overflow-hidden" style={{ minHeight: "calc(100vh - 4rem)" }}>
        {/* Spline 3D background */}
        <div className="absolute inset-0 z-0">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* Subtle gradient overlay for legibility */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

        {/* CTA pinned bottom */}
        <div className="relative z-20 flex flex-col items-center justify-end h-full pb-16 pt-[60vh] px-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="rounded-full text-base px-7 h-12 shadow-xl">
              <Link to="/opportunities">
                Начать <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full text-base px-7 h-12 backdrop-blur bg-background/40">
              <Link to="/courses">Платформа</Link>
            </Button>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
