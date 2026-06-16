import { Link } from "@tanstack/react-router";
import { Home, Compass, BookOpen, Map, User } from "lucide-react";
import { useApp } from "@/lib/app-context";

export function MobileTabBar() {
  const { t } = useApp();
  const items = [
    { to: "/", label: "Home", icon: Home },
    { to: "/opportunities", label: t("nav_catalog"), icon: Compass },
    { to: "/courses", label: t("nav_courses"), icon: BookOpen },
    { to: "/roadmap", label: t("nav_roadmap"), icon: Map },
    { to: "/dashboard", label: t("nav_dashboard"), icon: User },
  ] as const;

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-background/95 backdrop-blur">
      <div className="grid grid-cols-5">
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            className="flex flex-col items-center justify-center gap-1 py-2 text-xs text-muted-foreground"
            activeProps={{ className: "flex flex-col items-center justify-center gap-1 py-2 text-xs text-primary" }}
          >
            <it.icon className="h-5 w-5" />
            <span>{it.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
