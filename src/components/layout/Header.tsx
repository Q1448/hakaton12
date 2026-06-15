import { Link } from "@tanstack/react-router";
import { Moon, Sun, Menu, X, GraduationCap, Globe } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const langs = ["KZ", "RU", "EN"] as const;

export function Header() {
  const { theme, setTheme, lang, setLang, t } = useApp();
  const [open, setOpen] = useState(false);
  const navItems = [
    { to: "/opportunities", label: t("nav_catalog") },
    { to: "/courses", label: t("nav_courses") },
    { to: "/roadmap", label: t("nav_roadmap") },
    { to: "/dashboard", label: t("nav_dashboard") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span>Mentoria Hub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm font-medium text-foreground rounded-md bg-muted" }}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Globe className="h-4 w-4" /> {lang}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {langs.map((l) => (
                <DropdownMenuItem key={l} onClick={() => setLang(l)}>
                  {l === "KZ" ? "Қазақша" : l === "RU" ? "Русский" : "English"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          className="md:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-background border-l border-border p-6 shadow-xl animate-in slide-in-from-right">
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold">Меню</span>
              <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((it) => (
                <Link
                  key={it.to}
                  to={it.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-md text-foreground hover:bg-muted"
                >
                  {it.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === "dark" ? "Светлая тема" : "Темная тема"}
              </Button>
              <div className="flex gap-2">
                {langs.map((l) => (
                  <Button
                    key={l}
                    variant={lang === l ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setLang(l)}
                  >
                    {l}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
