import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  AppState,
  UserSettings,
  ActivityOccurrence,
  ActivityStatus,
  ActivityTemplate,
  CodingChallenge,
  Book,
  DocumentaryWeek,
  PersonalTheme,
  BuffMission,
  DailyReflection,
  SundayReview,
  EnergyMode,
  BlockId,
  Achievement,
} from '../types';
import {
  INITIAL_APP_STATE,
  DEFAULT_WEEKLY_ACTIVITIES,
  BLOCKS_CONFIG,
} from '../data/initialData';

const STORAGE_KEY = 'projeto_billy_state_v1';

interface AppContextType {
  state: AppState;
  currentDay: number;
  currentPhase: 1 | 2;
  currentWeekNumber: number;
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
  
  // Weekly activities methods
  getWeeklyActivities: (weekNumber: number) => {
    activity: ActivityTemplate;
    occurrence: ActivityOccurrence;
  }[];
  setActivityStatus: (weekNumber: number, activityId: string, status: ActivityStatus) => void;
  setActivityNote: (weekNumber: number, activityId: string, note: string) => void;
  addCustomActivity: (activity: Omit<ActivityTemplate, 'id' | 'isCustom'>) => void;
  editActivity: (activityId: string, updates: Partial<ActivityTemplate>) => void;
  deleteActivity: (activityId: string) => void;
  
  // Topics methods
  toggleBaseStudyTopic: (categoryIndex: number, topicId: string) => void;
  toggleCareerTopic: (levelIndex: number, topicId: string) => void;
  addBaseStudyTopic: (categoryIndex: number, title: string) => void;
  addCareerTopic: (levelIndex: number, title: string) => void;
  
  // Coding challenges
  addCodingChallenge: (challenge: Omit<CodingChallenge, 'id'>) => void;
  updateCodingChallenge: (id: string, updates: Partial<CodingChallenge>) => void;
  deleteCodingChallenge: (id: string) => void;
  
  // Books
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  
  // Documentary
  updateDocumentary: (weekNumber: number, updates: Partial<DocumentaryWeek>) => void;
  
  // Personal themes
  addPersonalTheme: (theme: Omit<PersonalTheme, 'id'>) => void;
  updatePersonalTheme: (id: string, updates: Partial<PersonalTheme>) => void;
  deletePersonalTheme: (id: string) => void;
  
  // Buff missions
  addBuffMission: (mission: Omit<BuffMission, 'id'>) => void;
  updateBuffMission: (id: string, updates: Partial<BuffMission>) => void;
  deleteBuffMission: (id: string) => void;
  
  // Reflections & Reviews
  saveDailyReflection: (reflection: Omit<DailyReflection, 'id' | 'createdAt'>) => void;
  saveSundayReview: (review: SundayReview) => void;
  
  // Settings & System
  setEnergyMode: (mode: EnergyMode) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetAllData: () => void;
  exportBackupJSON: () => string;
  importBackupJSON: (jsonString: string) => { success: boolean; error?: string };
  
  // Stats & Achievements
  stats: {
    weekProgressPercentage: number;
    weekCompletedCount: number;
    weekTotalApplicable: number;
    weekIgnoredCount: number;
    blocksWorkedCount: number;
    totalCompletedOverall: number;
    baseTopicsCompleted: number;
    totalBaseTopics: number;
    careerTopicsCompleted: number;
    totalCareerTopics: number;
    booksCompleted: number;
    challengesCompleted: number;
  };
  achievements: Achievement[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.version === 1) {
          // Merge safely with initial data to protect new fields
          return {
            ...INITIAL_APP_STATE,
            ...parsed,
            settings: { ...INITIAL_APP_STATE.settings, ...parsed.settings },
            activityOccurrences: parsed.activityOccurrences || {},
            customActivities: parsed.customActivities || [],
            baseStudyTopics: parsed.baseStudyTopics || INITIAL_APP_STATE.baseStudyTopics,
            careerLevels: parsed.careerLevels || INITIAL_APP_STATE.careerLevels,
            codingChallenges: parsed.codingChallenges || INITIAL_APP_STATE.codingChallenges,
            books: parsed.books || INITIAL_APP_STATE.books,
            documentaries: parsed.documentaries || INITIAL_APP_STATE.documentaries,
            personalThemes: parsed.personalThemes || INITIAL_APP_STATE.personalThemes,
            buffMissions: parsed.buffMissions || INITIAL_APP_STATE.buffMissions,
            reflections: parsed.reflections || [],
            sundayReviews: parsed.sundayReviews || {},
          };
        }
      }
    } catch (e) {
      console.error('Failed to parse saved state from localStorage:', e);
    }
    return INITIAL_APP_STATE;
  });

  // Calculate day and week based on start date
  const { currentDay, currentPhase, currentWeekNumber } = useMemo(() => {
    try {
      const start = new Date(state.settings.startDate + 'T00:00:00');
      const now = new Date();
      // Normalize to midnight
      const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      const diffMs = nowMidnight.getTime() - startMidnight.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
      
      const day = Math.max(1, Math.min(60, diffDays));
      const phase: 1 | 2 = day <= 14 ? 1 : 2;
      const week = Math.min(9, Math.max(1, Math.ceil(day / 7)));
      
      return { currentDay: day, currentPhase: phase, currentWeekNumber: week };
    } catch {
      return { currentDay: 1, currentPhase: 1 as const, currentWeekNumber: 1 };
    }
  }, [state.settings.startDate]);

  const [selectedWeek, setSelectedWeek] = useState<number>(currentWeekNumber);

  // Sync selectedWeek when currentWeekNumber changes initially
  useEffect(() => {
    setSelectedWeek(currentWeekNumber);
  }, [currentWeekNumber]);

  // Persist state to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }, [state]);

  // Sync theme class to document element
  useEffect(() => {
    const isDark = state.settings.theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [state.settings.theme]);

  // Helper to get all weekly activities for a given week
  const getWeeklyActivities = (weekNumber: number) => {
    const weekPhase: 1 | 2 = weekNumber <= 2 ? 1 : 2;
    const allTemplates = [...DEFAULT_WEEKLY_ACTIVITIES, ...state.customActivities];
    
    // Filter activities matching phase
    const relevantTemplates = allTemplates.filter(
      (act) => act.phase === 'both' || act.phase === weekPhase
    );

    return relevantTemplates.map((activity) => {
      const key = `${weekNumber}_${activity.id}`;
      const occurrence = state.activityOccurrences[key] || {
        status: 'pending' as ActivityStatus,
      };
      return { activity, occurrence };
    });
  };

  const setActivityStatus = (weekNumber: number, activityId: string, status: ActivityStatus) => {
    const key = `${weekNumber}_${activityId}`;
    setState((prev) => {
      const current = prev.activityOccurrences[key] || { status: 'pending' };
      return {
        ...prev,
        activityOccurrences: {
          ...prev.activityOccurrences,
          [key]: {
            ...current,
            status,
            completedAt: status === 'completed' ? new Date().toISOString() : undefined,
          },
        },
      };
    });
  };

  const setActivityNote = (weekNumber: number, activityId: string, note: string) => {
    const key = `${weekNumber}_${activityId}`;
    setState((prev) => {
      const current = prev.activityOccurrences[key] || { status: 'pending' };
      return {
        ...prev,
        activityOccurrences: {
          ...prev.activityOccurrences,
          [key]: {
            ...current,
            note,
          },
        },
      };
    });
  };

  const addCustomActivity = (activity: Omit<ActivityTemplate, 'id' | 'isCustom'>) => {
    const newActivity: ActivityTemplate = {
      ...activity,
      id: `custom_${Date.now()}`,
      isCustom: true,
    };
    setState((prev) => ({
      ...prev,
      customActivities: [...prev.customActivities, newActivity],
    }));
  };

  const editActivity = (activityId: string, updates: Partial<ActivityTemplate>) => {
    setState((prev) => {
      // Check if custom activity
      const isCustom = prev.customActivities.some((a) => a.id === activityId);
      if (isCustom) {
        return {
          ...prev,
          customActivities: prev.customActivities.map((a) =>
            a.id === activityId ? { ...a, ...updates } : a
          ),
        };
      }
      return prev;
    });
  };

  const deleteActivity = (activityId: string) => {
    setState((prev) => ({
      ...prev,
      customActivities: prev.customActivities.filter((a) => a.id !== activityId),
    }));
  };

  const toggleBaseStudyTopic = (categoryIndex: number, topicId: string) => {
    setState((prev) => {
      const updated = [...prev.baseStudyTopics];
      const category = { ...updated[categoryIndex] };
      category.topics = category.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : undefined,
            }
          : t
      );
      updated[categoryIndex] = category;
      return { ...prev, baseStudyTopics: updated };
    });
  };

  const toggleCareerTopic = (levelIndex: number, topicId: string) => {
    setState((prev) => {
      const updated = [...prev.careerLevels];
      const level = { ...updated[levelIndex] };
      level.topics = level.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : undefined,
            }
          : t
      );
      updated[levelIndex] = level;
      return { ...prev, careerLevels: updated };
    });
  };

  const addBaseStudyTopic = (categoryIndex: number, title: string) => {
    if (!title.trim()) return;
    setState((prev) => {
      const updated = [...prev.baseStudyTopics];
      const category = { ...updated[categoryIndex] };
      category.topics = [
        ...category.topics,
        {
          id: `topic_custom_${Date.now()}`,
          title: title.trim(),
          completed: false,
        },
      ];
      updated[categoryIndex] = category;
      return { ...prev, baseStudyTopics: updated };
    });
  };

  const addCareerTopic = (levelIndex: number, title: string) => {
    if (!title.trim()) return;
    setState((prev) => {
      const updated = [...prev.careerLevels];
      const level = { ...updated[levelIndex] };
      level.topics = [
        ...level.topics,
        {
          id: `topic_custom_${Date.now()}`,
          title: title.trim(),
          completed: false,
        },
      ];
      updated[levelIndex] = level;
      return { ...prev, careerLevels: updated };
    });
  };

  const addCodingChallenge = (challenge: Omit<CodingChallenge, 'id'>) => {
    const newChallenge: CodingChallenge = {
      ...challenge,
      id: `chal_${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      codingChallenges: [...prev.codingChallenges, newChallenge],
    }));
  };

  const updateCodingChallenge = (id: string, updates: Partial<CodingChallenge>) => {
    setState((prev) => ({
      ...prev,
      codingChallenges: prev.codingChallenges.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    }));
  };

  const deleteCodingChallenge = (id: string) => {
    setState((prev) => ({
      ...prev,
      codingChallenges: prev.codingChallenges.filter((c) => c.id !== id),
    }));
  };

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...book,
      id: `book_${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      books: [...prev.books, newBook],
    }));
  };

  const updateBook = (id: string, updates: Partial<Book>) => {
    setState((prev) => ({
      ...prev,
      books: prev.books.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    }));
  };

  const deleteBook = (id: string) => {
    setState((prev) => ({
      ...prev,
      books: prev.books.filter((b) => b.id !== id),
    }));
  };

  const updateDocumentary = (weekNumber: number, updates: Partial<DocumentaryWeek>) => {
    setState((prev) => {
      const existing = prev.documentaries[weekNumber] || {
        weekNumber,
        title: 'Documentário da Semana',
        theme: 'História e Sociedade',
        completed: false,
        keyTakeaway: '',
        followUpResearch: '',
      };
      return {
        ...prev,
        documentaries: {
          ...prev.documentaries,
          [weekNumber]: {
            ...existing,
            ...updates,
          },
        },
      };
    });
  };

  const addPersonalTheme = (theme: Omit<PersonalTheme, 'id'>) => {
    const newTheme: PersonalTheme = {
      ...theme,
      id: `thm_${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      personalThemes: [...prev.personalThemes, newTheme],
    }));
  };

  const updatePersonalTheme = (id: string, updates: Partial<PersonalTheme>) => {
    setState((prev) => ({
      ...prev,
      personalThemes: prev.personalThemes.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
  };

  const deletePersonalTheme = (id: string) => {
    setState((prev) => ({
      ...prev,
      personalThemes: prev.personalThemes.filter((t) => t.id !== id),
    }));
  };

  const addBuffMission = (mission: Omit<BuffMission, 'id'>) => {
    const newMission: BuffMission = {
      ...mission,
      id: `buff_${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      buffMissions: [...prev.buffMissions, newMission],
    }));
  };

  const updateBuffMission = (id: string, updates: Partial<BuffMission>) => {
    setState((prev) => ({
      ...prev,
      buffMissions: prev.buffMissions.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    }));
  };

  const deleteBuffMission = (id: string) => {
    setState((prev) => ({
      ...prev,
      buffMissions: prev.buffMissions.filter((m) => m.id !== id),
    }));
  };

  const saveDailyReflection = (reflection: Omit<DailyReflection, 'id' | 'createdAt'>) => {
    const newRef: DailyReflection = {
      ...reflection,
      id: `ref_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setState((prev) => {
      // replace if same date exists or append
      const existingIdx = prev.reflections.findIndex((r) => r.date === reflection.date);
      if (existingIdx >= 0) {
        const copy = [...prev.reflections];
        copy[existingIdx] = newRef;
        return { ...prev, reflections: copy };
      }
      return { ...prev, reflections: [newRef, ...prev.reflections] };
    });
  };

  const saveSundayReview = (review: SundayReview) => {
    setState((prev) => ({
      ...prev,
      sundayReviews: {
        ...prev.sundayReviews,
        [review.weekNumber]: review,
      },
    }));
  };

  const setEnergyMode = (mode: EnergyMode) => {
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        energyMode: mode,
      },
    }));
  };

  const updateSettings = (settings: Partial<UserSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...settings,
      },
    }));
  };

  const resetAllData = () => {
    setState(INITIAL_APP_STATE);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportBackupJSON = () => {
    return JSON.stringify(state, null, 2);
  };

  const importBackupJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object' || !parsed.settings) {
        return { success: false, error: 'Arquivo inválido. Formato incompatível com Projeto Billy.' };
      }
      setState({
        ...INITIAL_APP_STATE,
        ...parsed,
        version: 1,
      });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Falha ao processar arquivo JSON.' };
    }
  };

  // Compute calculated metrics
  const stats = useMemo(() => {
    const weeklyItems = getWeeklyActivities(selectedWeek);
    const completedItems = weeklyItems.filter((i) => i.occurrence.status === 'completed');
    const ignoredItems = weeklyItems.filter((i) => i.occurrence.status === 'ignored');
    
    // Ignored items do not count as failure; total applicable excludes intentionally ignored items
    const totalApplicable = weeklyItems.length - ignoredItems.length;
    const weekProgressPercentage =
      totalApplicable > 0 ? Math.round((completedItems.length / totalApplicable) * 100) : 0;

    // Distinct blocks worked in the selected week
    const workedBlockIds = new Set(
      completedItems.map((i) => i.activity.blockId)
    );

    // Global stats across all weeks
    const allOccurrences = Object.values(state.activityOccurrences);
    const totalCompletedOverall = allOccurrences.filter((o) => o.status === 'completed').length;

    // Topic counts
    let baseTopicsCompleted = 0;
    let totalBaseTopics = 0;
    state.baseStudyTopics.forEach((c) => {
      totalBaseTopics += c.topics.length;
      baseTopicsCompleted += c.topics.filter((t) => t.completed).length;
    });

    let careerTopicsCompleted = 0;
    let totalCareerTopics = 0;
    state.careerLevels.forEach((l) => {
      totalCareerTopics += l.topics.length;
      careerTopicsCompleted += l.topics.filter((t) => t.completed).length;
    });

    const booksCompleted = state.books.filter((b) => b.status === 'Concluído').length;
    const challengesCompleted = state.codingChallenges.filter((c) => c.status === 'Concluído').length;

    return {
      weekProgressPercentage,
      weekCompletedCount: completedItems.length,
      weekTotalApplicable: totalApplicable,
      weekIgnoredCount: ignoredItems.length,
      blocksWorkedCount: workedBlockIds.size,
      totalCompletedOverall,
      baseTopicsCompleted,
      totalBaseTopics,
      careerTopicsCompleted,
      totalCareerTopics,
      booksCompleted,
      challengesCompleted,
    };
  }, [state, selectedWeek]);

  // Achievements calculation
  const achievements = useMemo((): Achievement[] => {
    const allOccurrences = Object.values(state.activityOccurrences);
    const hasFirstStep = allOccurrences.some((o) => o.status === 'completed');
    const hasFirstWeekDone =
      stats.weekCompletedCount >= 4 ||
      Object.keys(state.sundayReviews).length > 0;
    const hasCodingDone = stats.challengesCompleted > 0;
    const hasBookDone = stats.booksCompleted > 0;
    const hasFourWeeks = currentDay >= 28 || stats.totalCompletedOverall >= 20;
    const hasJourneyDone = currentDay >= 60;
    const hasBaseMathDone = stats.baseTopicsCompleted >= 8;

    return [
      {
        id: 'ach_1',
        title: 'Primeiro Passo',
        description: 'Primeira atividade de estudo ou prática concluída na sua jornada.',
        icon: 'Footprints',
        category: 'jornada',
        unlocked: hasFirstStep,
      },
      {
        id: 'ach_2',
        title: 'Primeira Semana',
        description: 'Primeira semana de hábitos concluída com dedicação e equilíbrio.',
        icon: 'CalendarCheck',
        category: 'habito',
        unlocked: hasFirstWeekDone,
      },
      {
        id: 'ach_3',
        title: 'Mão no Código',
        description: 'Primeiro desafio prático de programação Python concluído.',
        icon: 'Terminal',
        category: 'codigo',
        unlocked: hasCodingDone,
      },
      {
        id: 'ach_4',
        title: 'Leitor em Movimento',
        description: 'Primeiro livro lido e registrado na biblioteca pessoal.',
        icon: 'BookOpenCheck',
        category: 'leitura',
        unlocked: hasBookDone,
      },
      {
        id: 'ach_5',
        title: 'Mente Analítica',
        description: 'Concluiu mais de 8 tópicos essenciais de matemática e raciocínio lógico.',
        icon: 'Brain',
        category: 'habito',
        unlocked: hasBaseMathDone,
      },
      {
        id: 'ach_6',
        title: 'Em Evolução',
        description: 'Consistência sustentada ao longo de quatro semanas de jornada.',
        icon: 'TrendingUp',
        category: 'jornada',
        unlocked: hasFourWeeks,
      },
      {
        id: 'ach_7',
        title: 'Jornada de 60 Dias',
        description: 'Conclusão dos 60 dias de evolução, constância e crescimento pessoal.',
        icon: 'Trophy',
        category: 'jornada',
        unlocked: hasJourneyDone,
      },
    ];
  }, [state, currentDay, stats]);

  return (
    <AppContext.Provider
      value={{
        state,
        currentDay,
        currentPhase,
        currentWeekNumber,
        selectedWeek,
        setSelectedWeek,
        getWeeklyActivities,
        setActivityStatus,
        setActivityNote,
        addCustomActivity,
        editActivity,
        deleteActivity,
        toggleBaseStudyTopic,
        toggleCareerTopic,
        addBaseStudyTopic,
        addCareerTopic,
        addCodingChallenge,
        updateCodingChallenge,
        deleteCodingChallenge,
        addBook,
        updateBook,
        deleteBook,
        updateDocumentary,
        addPersonalTheme,
        updatePersonalTheme,
        deletePersonalTheme,
        addBuffMission,
        updateBuffMission,
        deleteBuffMission,
        saveDailyReflection,
        saveSundayReview,
        setEnergyMode,
        updateSettings,
        resetAllData,
        exportBackupJSON,
        importBackupJSON,
        stats,
        achievements,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
