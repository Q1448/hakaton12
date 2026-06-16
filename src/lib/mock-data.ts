export type Opportunity = {
  id: string;
  title: string;
  category: "STEM" | "Бизнес" | "Финансы" | "Гранты" | "IT" | "Языки";
  tags: string[];
  deadline: string;
  desc: string;
  req: string;
  grade: number[];
  format: "Онлайн" | "Офлайн" | "Гибрид";
};

export const OPPORTUNITIES: Opportunity[] = [
  { id: "ipho", title: "Международная олимпиада по физике (IPhO)", category: "STEM", tags: ["STEM", "Олимпиада", "Физика"], deadline: "15 марта 2026", desc: "Отбор в национальную сборную Казахстана для участия в IPhO.", req: "9-11 класс, призёр республиканской олимпиады", grade: [9, 10, 11], format: "Офлайн" },
  { id: "bolashak", title: "Грант «Болашак»", category: "Гранты", tags: ["Гранты", "ВУЗ"], deadline: "1 июня 2026", desc: "Полное финансирование обучения в зарубежных университетах.", req: "11-12 класс, IELTS 7.0+", grade: [11, 12], format: "Офлайн" },
  { id: "btsdig", title: "Стажировка в BTS Digital", category: "IT", tags: ["IT", "Стажировка"], deadline: "10 февраля 2026", desc: "Летняя стажировка в крупнейшем IT-холдинге Казахстана.", req: "10-12 класс, базовый Python", grade: [10, 11, 12], format: "Гибрид" },
  { id: "mckinsey", title: "Кейс-чемпионат от McKinsey Junior", category: "Бизнес", tags: ["Бизнес", "Кейсы"], deadline: "20 апреля 2026", desc: "Решение реальных бизнес-кейсов в команде из 4 человек.", req: "10-12 класс, английский B2+", grade: [10, 11, 12], format: "Онлайн" },
  { id: "nuflp", title: "Грант Nazarbayev University Foundation", category: "Гранты", tags: ["Гранты", "ВУЗ"], deadline: "1 апреля 2026", desc: "Полная стипендия Foundation Year в NU.", req: "11-12 класс, IELTS 6.5+", grade: [11, 12], format: "Офлайн" },
  { id: "halyk", title: "Стажировка в Halyk Finance", category: "Финансы", tags: ["Финансы", "Стажировка"], deadline: "10 февраля 2026", desc: "Месячная стажировка в инвестподразделении банка.", req: "11-12 класс, базы Excel", grade: [11, 12], format: "Офлайн" },
  { id: "amc", title: "AMC 10/12 — American Math Competition", category: "STEM", tags: ["STEM", "Олимпиада"], deadline: "5 ноября 2026", desc: "Международная математическая олимпиада для школьников.", req: "9-12 класс", grade: [9, 10, 11, 12], format: "Онлайн" },
  { id: "sat", title: "Регистрация на SAT (March)", category: "Языки", tags: ["Языки", "ВУЗ", "Экзамен"], deadline: "20 февраля 2026", desc: "Сдача SAT для поступления в США и зарубежные ВУЗы.", req: "11-12 класс", grade: [11, 12], format: "Офлайн" },
  { id: "kazneb", title: "Республиканская олимпиада «Дарын»", category: "STEM", tags: ["STEM", "Олимпиада"], deadline: "25 января 2026", desc: "Республиканская предметная олимпиада МОН РК.", req: "9-11 класс, школьный отборочный", grade: [9, 10, 11], format: "Офлайн" },
  { id: "fintech", title: "Хакатон Kaspi FinTech", category: "IT", tags: ["IT", "Финансы", "Хакатон"], deadline: "30 марта 2026", desc: "48-часовой хакатон с призовым фондом 5 млн ₸.", req: "10-12 класс, команда 2-4", grade: [10, 11, 12], format: "Гибрид" },
];

export const CATEGORIES = ["Все", "STEM", "Бизнес", "Финансы", "Гранты", "IT", "Языки"] as const;
export const GRADE_FILTERS = ["Все", "9", "10", "11", "12"] as const;

// ----- Courses (SAT prep centers in Kyrgyzstan / KZ region) -----

export type Lesson = { id: string; title: string; duration: string; hasVideo?: boolean };
export type CourseModule = { title: string; lessons: Lesson[] };
export type Course = {
  id: string;
  title: string;
  short: string;
  desc: string;
  rating: number;
  mentor: string;
  city: string;
  address?: string;
  modules: CourseModule[];
};

export const COURSES: Course[] = [
  {
    id: "logos",
    title: "Logos Education Center — SAT General Intensive",
    short: "Старейшее агентство Кыргызстана с офлайн-интенсивами SAT.",
    desc: "Logos Education Center — одно из старейших образовательных агентств в Кыргызстане. Они предлагают интенсивные офлайн-курсы SAT General Intensive (1,5–2 месяца), где разбирают математический и языковой блоки, а также делятся стратегиями сдачи.",
    rating: 4.8,
    mentor: "Айбек Дуйшеев",
    city: "Бишкек",
    address: "ул. Турусбекова, 109/3",
    modules: [
      { title: "Модуль 1. Введение в SAT", lessons: [
        { id: "lg1", title: "Что такое SAT и из чего состоит экзамен", duration: "12:30", hasVideo: false },
        { id: "lg2", title: "Структура секций и тайминг", duration: "10:15", hasVideo: false },
        { id: "lg3", title: "Стратегия подготовки за 2 месяца", duration: "14:20", hasVideo: false },
      ]},
      { title: "Модуль 2. Reading & Writing", lessons: [
        { id: "lg4", title: "Reading: типы вопросов", duration: "18:40", hasVideo: false },
        { id: "lg5", title: "Reading: техника skimming/scanning", duration: "16:05", hasVideo: false },
        { id: "lg6", title: "Writing: грамматика SAT", duration: "20:11", hasVideo: false },
        { id: "lg7", title: "Writing: структура эссе", duration: "17:22", hasVideo: false },
      ]},
      { title: "Модуль 3. Math", lessons: [
        { id: "lg8", title: "Алгебра: уравнения и системы", duration: "22:00", hasVideo: false },
        { id: "lg9", title: "Геометрия и тригонометрия", duration: "19:45", hasVideo: false },
        { id: "lg10", title: "Калькулятор vs без калькулятора", duration: "13:30", hasVideo: false },
      ]},
      { title: "Модуль 4. Стратегии и mock-тесты", lessons: [
        { id: "lg11", title: "Мок-тест №1 разбор", duration: "32:18", hasVideo: false },
        { id: "lg12", title: "Управление временем на экзамене", duration: "11:50", hasVideo: false },
      ]},
    ],
  },
  {
    id: "ems",
    title: "EMS Academy — SAT / IELTS / TOEFL / Duolingo",
    short: "Специализированная академия международных экзаменов и менторства.",
    desc: "EMS Academy — специализированная академия, которая фокусируется на подготовке к международным тестам (SAT, IELTS, TOEFL, Duolingo). Есть как языковые группы, так и полное менторское сопровождение при поступлении в зарубежные вузы.",
    rating: 4.9,
    mentor: "Айгуль Каримова",
    city: "Бишкек",
    modules: [
      { title: "Модуль 1. Diagnostic", lessons: [
        { id: "em1", title: "Входное тестирование SAT", duration: "25:00", hasVideo: false },
        { id: "em2", title: "Постановка цели по баллу", duration: "10:45", hasVideo: false },
      ]},
      { title: "Модуль 2. SAT Verbal", lessons: [
        { id: "em3", title: "Reading drill 1", duration: "18:20", hasVideo: false },
        { id: "em4", title: "Reading drill 2", duration: "18:50", hasVideo: false },
        { id: "em5", title: "Writing & Language", duration: "21:00", hasVideo: false },
      ]},
      { title: "Модуль 3. SAT Math", lessons: [
        { id: "em6", title: "Heart of Algebra", duration: "23:11", hasVideo: false },
        { id: "em7", title: "Problem Solving & Data", duration: "20:30", hasVideo: false },
        { id: "em8", title: "Advanced Math", duration: "24:15", hasVideo: false },
      ]},
      { title: "Модуль 4. IELTS / TOEFL bridge", lessons: [
        { id: "em9", title: "IELTS Speaking part 2", duration: "15:40", hasVideo: false },
        { id: "em10", title: "TOEFL Integrated Writing", duration: "19:08", hasVideo: false },
      ]},
      { title: "Модуль 5. Менторство по поступлению", lessons: [
        { id: "em11", title: "Shortlist университетов", duration: "16:22", hasVideo: false },
        { id: "em12", title: "Personal Statement: структура", duration: "22:55", hasVideo: false },
      ]},
    ],
  },
  {
    id: "mldc",
    title: "MLDC при АУЦА — SAT Academic Program",
    short: "Академическая программа SAT от Американского университета в ЦА.",
    desc: "MLDC при АУЦА (Американский университет в Центральной Азии) — Центр дополнительного образования регулярно запускает курсы подготовки к SAT. Программа академическая: первый месяц упор на английскую часть, второй — подключается математика.",
    rating: 4.7,
    mentor: "Prof. James Whitman",
    city: "Бишкек (АУЦА)",
    modules: [
      { title: "Месяц 1. English block", lessons: [
        { id: "ml1", title: "Academic vocabulary", duration: "17:30", hasVideo: false },
        { id: "ml2", title: "Reading comprehension techniques", duration: "20:10", hasVideo: false },
        { id: "ml3", title: "Grammar review", duration: "18:55", hasVideo: false },
        { id: "ml4", title: "Essay structure (Writing)", duration: "22:00", hasVideo: false },
      ]},
      { title: "Месяц 2. Math + Mixed Practice", lessons: [
        { id: "ml5", title: "Algebra deep dive", duration: "25:40", hasVideo: false },
        { id: "ml6", title: "Geometry essentials", duration: "21:15", hasVideo: false },
        { id: "ml7", title: "Data analysis", duration: "19:30", hasVideo: false },
        { id: "ml8", title: "Full-length mock test", duration: "45:00", hasVideo: false },
      ]},
    ],
  },
  {
    id: "studylab",
    title: "StudyLab — ОРТ, TOEFL, IELTS, SAT",
    short: "Классическая локальная подготовка в классах.",
    desc: "StudyLab — учебный центр, специализирующийся на ОРТ и международных экзаменах (TOEFL, IELTS, SAT), расположенный на ул. Керимбекова. Подходит, если вам нужна классическая локальная подготовка в классах.",
    rating: 4.6,
    mentor: "Назгуль Орозова",
    city: "Бишкек",
    address: "ул. Керимбекова",
    modules: [
      { title: "Модуль 1. ОРТ Основной тест", lessons: [
        { id: "sl1", title: "ОРТ: структура", duration: "13:20", hasVideo: false },
        { id: "sl2", title: "Математика ОРТ", duration: "21:00", hasVideo: false },
        { id: "sl3", title: "Аналогии и предложения", duration: "16:45", hasVideo: false },
      ]},
      { title: "Модуль 2. SAT", lessons: [
        { id: "sl4", title: "SAT Reading стратегии", duration: "19:10", hasVideo: false },
        { id: "sl5", title: "SAT Math no-calc", duration: "20:55", hasVideo: false },
        { id: "sl6", title: "SAT Math with calc", duration: "18:32", hasVideo: false },
      ]},
      { title: "Модуль 3. IELTS / TOEFL", lessons: [
        { id: "sl7", title: "IELTS Reading", duration: "17:25", hasVideo: false },
        { id: "sl8", title: "IELTS Listening", duration: "15:18", hasVideo: false },
        { id: "sl9", title: "TOEFL Speaking", duration: "16:40", hasVideo: false },
      ]},
    ],
  },
];

export function totalLessons(c: Course): number {
  return c.modules.reduce((acc, m) => acc + m.lessons.length, 0);
}

export const BUDDIES = [
  { id: "b1", name: "Алишер Жумабек", grade: 11, school: "НИШ Алматы", interests: ["STEM", "Олимпиада"], avatar: "АЖ" },
  { id: "b2", name: "Мадина Серикова", grade: 10, school: "Школа им. Абая", interests: ["Бизнес", "Кейсы"], avatar: "МС" },
  { id: "b3", name: "Дамир Утегенов", grade: 11, school: "БИЛ Астана", interests: ["IT", "Хакатон"], avatar: "ДУ" },
];

export const LEADERBOARD = [
  { id: "u1", name: "Айбек Нұрланов", xp: 248, avatar: "АН" },
  { id: "u2", name: "Аружан Сатпаева", xp: 221, avatar: "АС" },
  { id: "u3", name: "Тимур Бектұров", xp: 198, avatar: "ТБ" },
  { id: "u5", name: "Самал Қайратқызы", xp: 142, avatar: "СҚ" },
  { id: "u6", name: "Бекзат Әлімов", xp: 121, avatar: "БӘ" },
  { id: "u7", name: "Ляззат Бейсенова", xp: 110, avatar: "ЛБ" },
  { id: "u8", name: "Нұрислам Қожа", xp: 96, avatar: "НҚ" },
  { id: "u9", name: "Камила Дәулет", xp: 81, avatar: "КД" },
  { id: "u10", name: "Ерасыл Серік", xp: 67, avatar: "ЕС" },
];
