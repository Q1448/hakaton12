import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold mb-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-4 w-4" />
            </span>
            Mentoria Hub
          </div>
          <p className="text-sm text-muted-foreground">
            Образовательный хаб для школьников Казахстана.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Платформа</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/opportunities" className="hover:text-foreground">Возможности</Link></li>
            <li><Link to="/courses" className="hover:text-foreground">Курсы</Link></li>
            <li><Link to="/roadmap" className="hover:text-foreground">Роадмап</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Для пользователей</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/dashboard" className="hover:text-foreground">Личный кабинет</Link></li>
            <li><Link to="/mentor" className="hover:text-foreground">Стать ментором</Link></li>
            <li><Link to="/admin" className="hover:text-foreground">Админ-панель</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Контакты</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@mentoria.kz</li>
            <li>Алматы, Казахстан</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 Mentoria Hub. Все права защищены.
      </div>
    </footer>
  );
}
