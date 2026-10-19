import React from 'react';
import {
  TrendingUp,
  Award,
  BookOpen,
  Code2,
  Compass,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  CalendarCheck,
  Footprints,
  Terminal,
  BookOpenCheck,
  Brain,
  Trophy,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProgressView: React.FC = () => {
  const { state, stats, achievements, currentWeekNumber, getWeeklyActivities } = useApp();

  const getAchievementIcon = (iconName: string, unlocked: boolean) => {
    const iconClass = `w-5 h-5 ${unlocked ? 'text-amber-500' : 'text-slate-400 dark:text-slate-600'}`;
    switch (iconName) {
      case 'Footprints':
        return <Footprints className={iconClass} />;
      case 'CalendarCheck':
        return <CalendarCheck className={iconClass} />;
      case 'Terminal':
        return <Terminal className={iconClass} />;
      case 'BookOpenCheck':
        return <BookOpenCheck className={iconClass} />;
      case 'Brain':
        return <Brain className={iconClass} />;
      case 'TrendingUp':
        return <TrendingUp className={iconClass} />;
      case 'Trophy':
        return <Trophy className={iconClass} />;
      default:
        return <Award className={iconClass} />;
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* 1. Header */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Meu Progresso & Conquistas
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Evolução consolidada de atividades, domínio de tópicos e marcos discretos
        </p>
      </div>

      {/* 2. Distinction banner: Topics vs Weekly Recurring Activities */}
      <div className="rounded-xl border border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20 p-4 sm:p-5 text-xs text-slate-700 dark:text-slate-300">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Dois Registros Independentes
            </h2>
            <p className="mt-1 leading-relaxed">
              <strong>Atividades da Semana</strong> são tarefas recorrentes de rotina (ex: "Praticar Python na segunda").
              <strong> Tópicos dos Blocos</strong> são conhecimentos permanentes da trilha (ex: "Funções", "Frações").
              Concluir um não altera o outro compulsoriamente — permitindo você revisitar práticas sem bagunçar seu histórico.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Global Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 sm:p-5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Total de Atividades Concluídas
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {stats.totalCompletedOverall}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Registros acumulados nas semanas
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 sm:p-5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Tópicos de Base de Estudo
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-blue-600 dark:text-blue-400 tabular-nums">
            {stats.baseTopicsCompleted} <span className="text-sm text-slate-400 font-normal">/ {stats.totalBaseTopics}</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            {Math.round((stats.baseTopicsCompleted / (stats.totalBaseTopics || 1)) * 100)}% dominados
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 sm:p-5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Tópicos da Trilha Python
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {stats.careerTopicsCompleted} <span className="text-sm text-slate-400 font-normal">/ {stats.totalCareerTopics}</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            {Math.round((stats.careerTopicsCompleted / (stats.totalCareerTopics || 1)) * 100)}% dominados
          </div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 sm:p-5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Livros & Desafios Feitos
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-purple-600 dark:text-purple-400 tabular-nums">
            {stats.booksCompleted + stats.challengesCompleted}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            {stats.booksCompleted} livro(s) · {stats.challengesCompleted} desafio(s)
          </div>
        </div>
      </div>

      {/* 4. Gamificação Leve: Marcos e Conquistas (Sem punições) */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Marcos & Conquistas Discretas
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Reconhecimento de cada pequeno passo. Sem sequências punitivas ou perda de progresso ao descansar.
            </p>
          </div>

          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40 self-start sm:self-auto">
            {unlockedCount} de {achievements.length} desbloqueados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-xl border flex items-start gap-3.5 transition-colors ${
                ach.unlocked
                  ? 'border-amber-500/30 bg-amber-50/20 dark:bg-amber-950/10'
                  : 'border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/20 opacity-60'
              }`}
            >
              <div
                className={`p-2.5 rounded-lg shrink-0 ${
                  ach.unlocked
                    ? 'bg-amber-100 dark:bg-amber-900/40'
                    : 'bg-slate-100 dark:bg-slate-800'
                }`}
              >
                {getAchievementIcon(ach.icon, ach.unlocked)}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {ach.title}
                  </h3>
                  {ach.unlocked && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      ✓ Desbloqueado
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Histórico das Semanas */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          Histórico por Semana
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Resumo do desempenho em cada uma das semanas da jornada de 60 dias
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold">
                <th className="pb-3 pr-4">Semana</th>
                <th className="pb-3 px-4">Fase</th>
                <th className="pb-3 px-4 text-center">Atividades Concluídas</th>
                <th className="pb-3 px-4 text-center">Taxa Conclusão</th>
                <th className="pb-3 pl-4">Reflexão Dominical</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((wNum) => {
                const items = getWeeklyActivities(wNum);
                const done = items.filter((i) => i.occurrence.status === 'completed').length;
                const ignored = items.filter((i) => i.occurrence.status === 'ignored').length;
                const applicable = items.length - ignored;
                const rate = applicable > 0 ? Math.round((done / applicable) * 100) : 0;
                const review = state.sundayReviews[wNum];
                const isCurrent = wNum === currentWeekNumber;

                return (
                  <tr
                    key={wNum}
                    className={`hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors ${
                      isCurrent ? 'bg-blue-50/30 dark:bg-blue-950/20' : ''
                    }`}
                  >
                    <td className="py-3.5 pr-4 font-sans font-medium text-slate-900 dark:text-white">
                      Semana {wNum} {isCurrent && <span className="text-blue-500 text-[11px] font-bold">· Atual</span>}
                    </td>
                    <td className="py-3.5 px-4 font-sans text-slate-500">
                      {wNum <= 2 ? 'Adaptação' : 'Consolidação'}
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums text-slate-700 dark:text-slate-300">
                      {done} / {items.length}
                    </td>
                    <td className="py-3.5 px-4 text-center tabular-nums">
                      <span
                        className={`font-semibold ${
                          rate >= 70
                            ? 'text-emerald-500'
                            : rate > 0
                            ? 'text-blue-500'
                            : 'text-slate-400'
                        }`}
                      >
                        {rate}%
                      </span>
                    </td>
                    <td className="py-3.5 pl-4 font-sans text-slate-500">
                      {review ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          ✓ Registrada
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Pendente</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
