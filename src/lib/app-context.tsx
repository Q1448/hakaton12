import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dict, type Lang, type TKey } from "./i18n";

type Theme = "light" | "dark";

export type UserProfile = {
  name: string;
  grade: number | null;
  interests: string[];
  goal: string | null;
  onboarded: boolean;
};

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: TKey) => string;
  user: UserProfile;
  setUser: (u: Partial<UserProfile>) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  progress: Record<string, string[]>; // courseId -> lessonIds done
  toggleLessonDone: (courseId: string, lessonId: string, totalLessons: number) => void;
  passedTests: Record<string, boolean>;
  passTest: (courseId: string) => void;
  xp: number;
};

const AppCtx = createContext<Ctx | null>(null);

const DEFAULT_USER: UserProfile = {
  name: "Айгерим Ержанова",
  grade: 11,
  interests: ["STEM", "Бизнес"],
  goal: "ВУЗ за рубежом",
  onboarded: false,
};

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeLS<T>(key: string, val: T) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [lang, setLangState] = useState<Lang>("RU");
  const [user, setUserState] = useState<UserProfile>(DEFAULT_USER);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, string[]>>({});
  const [passedTests, setPassedTests] = useState<Record<string, boolean>>({});

  // Load from localStorage once on client
  useEffect(() => {
    const storedTheme = (typeof window !== "undefined" && localStorage.getItem("mh:theme")) as Theme | null;
    if (storedTheme) setThemeState(storedTheme);
    else if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setThemeState("dark");
    }
    const storedLang = (typeof window !== "undefined" && localStorage.getItem("mh:lang")) as Lang | null;
    if (storedLang && dict[storedLang]) setLangState(storedLang);
    setUserState(readLS("mh:user", DEFAULT_USER));
    setFavorites(readLS("mh:favorites", []));
    setProgress(readLS("mh:progress", {}));
    setPassedTests(readLS("mh:tests", {}));
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("mh:theme", theme); } catch {}
  }, [theme]);

  useEffect(() => { try { localStorage.setItem("mh:lang", lang); } catch {} }, [lang]);
  useEffect(() => { writeLS("mh:user", user); }, [user]);
  useEffect(() => { writeLS("mh:favorites", favorites); }, [favorites]);
  useEffect(() => { writeLS("mh:progress", progress); }, [progress]);
  useEffect(() => { writeLS("mh:tests", passedTests); }, [passedTests]);

  const setUser = useCallback((u: Partial<UserProfile>) => {
    setUserState((prev) => ({ ...prev, ...u }));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const toggleLessonDone = useCallback((courseId: string, lessonId: string, _total: number) => {
    setProgress((prev) => {
      const list = prev[courseId] ?? [];
      const next = list.includes(lessonId) ? list.filter(x => x !== lessonId) : [...list, lessonId];
      return { ...prev, [courseId]: next };
    });
  }, []);

  const passTest = useCallback((courseId: string) => {
    setPassedTests((p) => ({ ...p, [courseId]: true }));
  }, []);

  const t = useCallback((k: TKey) => {
    const table = dict[lang] as Record<string, string>;
    return table[k] ?? dict.RU[k];
  }, [lang]);

  const xp = useMemo(() => {
    let total = 0;
    for (const arr of Object.values(progress)) total += arr.length * 3;
    for (const v of Object.values(passedTests)) if (v) total += 10;
    return total;
  }, [progress, passedTests]);

  const toggleTheme = useCallback(() => setThemeState((t) => t === "dark" ? "light" : "dark"), []);

  return (
    <AppCtx.Provider value={{
      theme, setTheme: setThemeState, toggleTheme,
      lang, setLang: setLangState, t,
      user, setUser,
      favorites, toggleFavorite,
      progress, toggleLessonDone,
      passedTests, passTest,
      xp,
    }}>
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
