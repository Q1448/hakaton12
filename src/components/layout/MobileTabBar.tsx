import { Link } from "@tanstack/react-router";
import { Home, Compass, BookOpen, Map, User } from "lucide-react";

const items = [
  { to: "/", label: "Главная", icon: Home },
  { to: "/opportunities", label: "Каталог", icon: Compass },
  { to: "/courses", label: "Курсы", icon: BookOpen },
  { to: "/roadmap", label: "Roadmap", icon: Map },
  { to: "/dashboard", label: "Профиль", icon: User },
] as const;

export function MobileTabBar() {
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
