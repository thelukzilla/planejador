export type BlockId = 'base' | 'carreira' | 'pessoal' | 'buff';

export type ActivityStatus = 'pending' | 'completed' | 'ignored';

export type EnergyMode = 'normal' | 'leve' | 'recuperacao';

export interface BlockConfig {
  id: BlockId;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  hoverBorder: string;
  iconName: string;
}

export interface ActivityTemplate {
  id: string;
  blockId: BlockId;
  dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7; // 1 = Seg, 7 = Dom
  title: string;
  description: string;
  subtasks?: string[];
  phase: 1 | 2 | 'both'; // 1 = Adaptação (Dias 1-14), 2 = Consolidação (Dias 15-60)
  isCustom?: boolean;
}

export interface ActivityOccurrence {
  status: ActivityStatus;
  completedAt?: string;
  note?: string;
  customTitle?: string;
  customDescription?: string;
}

export interface TopicItem {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
  completedAt?: string;
}

export interface TopicCategory {
  id: string;
  title: string;
  description?: string;
  topics: TopicItem[];
}

export interface CodingChallenge {
  id: string;
  name: string;
  description: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  status: 'Não iniciado' | 'Em andamento' | 'Concluído';
  completedAt?: string;
  notes?: string;
  githubUrl?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'Quero ler' | 'Lendo' | 'Concluído';
  totalPages?: number;
  currentPage?: number;
  notes?: string;
  finalReview?: string;
}

export interface DocumentaryWeek {
  weekNumber: number;
  title: string;
  theme: string;
  url?: string;
  completed: boolean;
  keyTakeaway: string;
  followUpResearch: string;
}

export interface PersonalTheme {
  id: string;
  title: string;
  description: string;
  relatedBooks?: string;
  relatedDocs?: string;
  notes?: string;
  status: 'Ativo' | 'Pausado' | 'Explorado';
}

export interface BuffMission {
  id: string;
  category: 'Portfólio' | 'Empregabilidade' | 'Inglês' | 'Oratória' | 'Extraordinária';
  title: string;
  description: string;
  completed: boolean;
  isExtraordinary?: boolean;
  weekNumber?: number;
  completedAt?: string;
}

export interface DailyReflection {
  id: string;
  date: string; // YYYY-MM-DD
  learned?: string;
  challenges?: string;
  toReview?: string;
  discovery?: string;
  personalNote?: string;
  createdAt: string;
}

export interface SundayReview {
  weekNumber: number;
  date: string;
  whatWorked: string;
  whatHindered: string;
  smallChange: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'jornada' | 'habito' | 'codigo' | 'leitura';
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserSettings {
  userName: string;
  startDate: string; // YYYY-MM-DD
  theme: 'dark' | 'light';
  energyMode: EnergyMode;
}

export interface AppState {
  version: number;
  settings: UserSettings;
  // Dynamic weekly activity statuses: key is `${weekNumber}_${activityId}`
  activityOccurrences: Record<string, ActivityOccurrence>;
  // Custom activities created by user:
  customActivities: ActivityTemplate[];
  // Block topics & tracks:
  baseStudyTopics: TopicCategory[];
  careerLevels: TopicCategory[];
  codingChallenges: CodingChallenge[];
  books: Book[];
  documentaries: Record<number, DocumentaryWeek>;
  personalThemes: PersonalTheme[];
  buffMissions: BuffMission[];
  reflections: DailyReflection[];
  sundayReviews: Record<number, SundayReview>;
}
