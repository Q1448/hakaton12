import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { useApp } from "@/lib/app-context";

export function Footer() {
  const { t } = useApp();
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
          <p className="text-sm text-muted-foreground">{t("footer_made")}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t("cta_platform")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/opportunities" className="hover:text-foreground">{t("nav_catalog")}</Link></li>
            <li><Link to="/courses" className="hover:text-foreground">{t("nav_courses")}</Link></li>
            <li><Link to="/roadmap" className="hover:text-foreground">{t("nav_roadmap")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t("footer_about")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/dashboard" className="hover:text-foreground">{t("nav_dashboard")}</Link></li>
            <li><Link to="/mentor" className="hover:text-foreground">{t("nav_mentor")}</Link></li>
            <li><Link to="/admin" className="hover:text-foreground">{t("nav_admin")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t("footer_contact")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@mentoria.kz</li>
            <li>Almaty · Bishkek</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 Mentoria Hub
      </div>
    </footer>
  );
}
