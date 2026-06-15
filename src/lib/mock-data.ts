export type Opportunity = {
  id: string;
  title: string;
  category: "STEM" | "Бизнес" | "Финансы" | "Гранты" | "IT" | "Языки";
  tags: string[];
  deadline: string;
  desc: string;
  req: string;
  grade: number[]; // applicable grades
  format: "Онлайн" | "Офлайн" | "Гибрид";
};

export const OPPORTUNITIES: Opportunity[] = [
  { id: "ipho", title: "Международная олимпиада по физике (IPhO)", category: "STEM", tags: ["STEM", "Олимпиада", "Физика"], deadline: "15 марта 2026", desc: "Отбор в национальную сборную Казахстана для участия в IPhO.", req: "9-11 класс, призёр республиканской олимпиады", grade: [9, 10, 11], format: "Офлайн" },
  { id: "bolashak", title: "Грант «Болашак»", category: "Гранты", tags: ["Гранты", "ВУЗ"], deadline: "1 июня 2026", desc: "Полное финансирование обучения в зарубежных университетах.", req: "11-12 класс, IELTS 7.0+", grade: [11, 12], format: "Офлайн" },
  { id: "btsdig", title: "Стажировка в BTS Digital", category: "IT", tags: ["IT", "Стажировка", "Бизнес"], deadline: "10 февраля 2026", desc: "Летняя стажировка в крупнейшем IT-холдинге Казахстана.", req: "10-12 класс, базовый Python", grade: [10, 11, 12], format: "Гибрид" },
  { id: "mckinsey", title: "Кейс-чемпионат от McKinsey Junior", category: "Бизнес", tags: ["Бизнес", "Кейсы", "Финансы"], deadline: "20 апреля 2026", desc: "Решение реальных бизнес-кейсов в команде из 4 человек.", req: "10-12 класс, английский B2+", grade: [10, 11, 12], format: "Онлайн" },
  { id: "nuflp", title: "Грант Nazarbayev University Foundation", category: "Гранты", tags: ["Гранты", "ВУЗ", "STEM"], deadline: "1 апреля 2026", desc: "Полная стипендия Foundation Year в NU.", req: "11-12 класс, IELTS 6.5+", grade: [11, 12], format: "Офлайн" },
  { id: "halyk", title: "Стажировка в Halyk Finance", category: "Финансы", tags: ["Финансы", "Стажировка", "Бизнес"], deadline: "10 февраля 2026", desc: "Месячная стажировка в инвестподразделении банка.", req: "11-12 класс, базы Excel", grade: [11, 12], format: "Офлайн" },
  { id: "amc", title: "AMC 10/12 — American Math Competition", category: "STEM", tags: ["STEM", "Олимпиада", "Математика"], deadline: "5 ноября 2026", desc: "Международная математическая олимпиада для школьников.", req: "9-12 класс", grade: [9, 10, 11, 12], format: "Онлайн" },
  { id: "sat", title: "Регистрация на SAT (March)", category: "Языки", tags: ["Языки", "ВУЗ", "Экзамен"], deadline: "20 февраля 2026", desc: "Сдача SAT для поступления в США и зарубежные ВУЗы.", req: "11-12 класс", grade: [11, 12], format: "Офлайн" },
  { id: "kazneb", title: "Республиканская олимпиада «Дарын»", category: "STEM", tags: ["STEM", "Олимпиада"], deadline: "25 января 2026", desc: "Республиканская предметная олимпиада МОН РК.", req: "9-11 класс, школьный отборочный", grade: [9, 10, 11], format: "Офлайн" },
  { id: "fintech", title: "Хакатон Kaspi FinTech", category: "IT", tags: ["IT", "Финансы", "Хакатон"], deadline: "30 марта 2026", desc: "48-часовой хакатон с призовым фондом 5 млн ₸.", req: "10-12 класс, команда 2-4", grade: [10, 11, 12], format: "Гибрид" },
];

export const CATEGORIES = ["Все", "STEM", "Бизнес", "Финансы", "Гранты", "IT", "Языки"] as const;
export const GRADE_FILTERS = ["Все", "9", "10", "11", "12"] as const;

// ----- Courses -----

export type Lesson = { id: string; title: string; duration: string };
export type CourseModule = { title: string; lessons: Lesson[] };
export type Course = {
  id: string;
  title: string;
  desc: string;
  rating: number;
  mentor: string;
  modules: CourseModule[];
};

export const COURSES: Course[] = [
  {
    id: "sat-ielts",
    title: "Подготовка к SAT / IELTS",
    desc: "Полный курс по математике, английскому и стратегиям экзамена.",
    rating: 4.9,
    mentor: "Динара Ахметова",
    modules: [
      { title: "Модуль 1. Введение", lessons: [
        { id: "l1", title: "Знакомство с курсом", duration: "8:21" },
        { id: "l2", title: "Структура SAT и IELTS", duration: "12:05" },
      ]},
      { title: "Модуль 2. Английский язык", lessons: [
        { id: "l3", title: "Базовая лексика B1-B2", duration: "14:32" },
        { id: "l4", title: "Грамматика для Writing", duration: "18:11" },
        { id: "l5", title: "Reading стратегии", duration: "16:40" },
      ]},
      { title: "Модуль 3. Математика", lessons: [
        { id: "l6", title: "Алгебра без ловушек", duration: "20:09" },
        { id: "l7", title: "Геометрия экспресс", duration: "17:55" },
      ]},
    ],
  },
  {
    id: "econ",
    title: "Введение в экономику",
    desc: "Микро- и макроэкономика для старшеклассников.",
    rating: 4.7,
    mentor: "Арман Сейтжанов",
    modules: [
      { title: "Микроэкономика", lessons: [
        { id: "l1", title: "Спрос и предложение", duration: "10:14" },
        { id: "l2", title: "Эластичность", duration: "11:30" },
        { id: "l3", title: "Издержки фирмы", duration: "13:22" },
      ]},
      { title: "Макроэкономика", lessons: [
        { id: "l4", title: "ВВП и инфляция", duration: "12:08" },
        { id: "l5", title: "Денежная политика", duration: "14:55" },
      ]},
    ],
  },
  {
    id: "python",
    title: "Основы программирования на Python",
    desc: "От переменных до объектно-ориентированного программирования.",
    rating: 4.8,
    mentor: "Ержан Касенов",
    modules: [
      { title: "Старт", lessons: [
        { id: "l1", title: "Установка и первая программа", duration: "9:45" },
        { id: "l2", title: "Переменные и типы данных", duration: "11:20" },
      ]},
      { title: "Логика", lessons: [
        { id: "l3", title: "Условия и циклы", duration: "15:11" },
        { id: "l4", title: "Функции", duration: "13:08" },
      ]},
      { title: "ООП", lessons: [
        { id: "l5", title: "Классы и объекты", duration: "17:22" },
        { id: "l6", title: "Финальный проект", duration: "22:00" },
      ]},
    ],
  },
];

export function totalLessons(c: Course): number {
  return c.modules.reduce((acc, m) => acc + m.lessons.length, 0);
}

// ----- Buddy mock -----
export const BUDDIES = [
  { id: "b1", name: "Алишер Жумабек", grade: 11, school: "НИШ Алматы", interests: ["STEM", "Олимпиада"], avatar: "АЖ" },
  { id: "b2", name: "Мадина Серикова", grade: 10, school: "Школа им. Абая", interests: ["Бизнес", "Кейсы"], avatar: "МС" },
  { id: "b3", name: "Дамир Утегенов", grade: 11, school: "БИЛ Астана", interests: ["IT", "Хакатон"], avatar: "ДУ" },
];

// ----- Leaderboard -----
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
