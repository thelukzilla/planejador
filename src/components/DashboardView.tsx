import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Layers,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Clock,
  CheckSquare,
  Circle,
  AlertCircle,
  BookOpen,
  Code2,
  Compass,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOTIVATIONAL_QUOTES, BLOCKS_CONFIG } from '../data/initialData';
import { EnergyModeBanner } from './EnergyModeBanner';
import { BlockId } from '../types';

interface DashboardViewProps {
  onNavigateToWeek: () => void;
  onNavigateToBlocks: () => void;
  onNavigateToJourney: () => void;
  onNavigateToDiary: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateToWeek,
  onNavigateToBlocks,
  onNavigateToJourney,
  onNavigateToDiary,
}) => {
  const {
    state,
    currentDay,
    currentPhase,
    currentWeekNumber,
    getWeeklyActivities,
    setActivityStatus,
    stats,
  } = useApp();

  const [quoteIndex, setQuoteIndex] = useState(0);

  // Time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex];

  // Activities for this current week grouped by block
  const weeklyItems = getWeeklyActivities(currentWeekNumber);
  
  // Group activities by block
  const groupedByBlock: Record<BlockId, typeof weeklyItems> = {
    base: [],
    carreira: [],
    pessoal: [],
    buff: [],
  };

  weeklyItems.forEach((item) => {
    if (groupedByBlock[item.activity.blockId]) {
      groupedByBlock[item.activity.blockId].push(item);
    }
  });

  const getBlockIcon = (blockId: BlockId) => {
    switch (blockId) {
      case 'base':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'carreira':
        return <Code2 className="w-4 h-4 text-emerald-500" />;
      case 'pessoal':
        return <Compass className="w-4 h-4 text-purple-500" />;
      case 'buff':
        return <Zap className="w-4 h-4 text-amber-500" />;
    }
  };

  // Check if today is Sunday (day 0 in JS Date)
  const isSunday = new Date().getDay() === 0;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Greeting Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Painel de Evolução Pessoal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            {getGreeting()}, {state.settings.userName}.
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            "Um pequeno avanço já é um avanço."
          </p>
        </div>

        {/* Phase tag & quick status */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-500 dark:text-slate-400">Fase Atual da Jornada</div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {currentPhase === 1 ? 'Fase 1 · Adaptação' : 'Fase 2 · Consolidação'}
            </div>
          </div>
          <button
            onClick={onNavigateToJourney}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span>Ver Mapa 60D</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Energy Mode Selector Component */}
      <EnergyModeBanner />

      {/* 2. Four Main KPI Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Dia da Jornada */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 sm:p-5 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Dia da Jornada</span>
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono tabular-nums text-slate-900 dark:text-white">
              {currentDay}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              de 60 dias
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Semana {currentWeekNumber} de 9</span>
          </div>
        </div>

        {/* Card 2: Progresso da Semana */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 sm:p-5 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Progresso Semanal</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono tabular-nums text-slate-900 dark:text-white">
              {stats.weekProgressPercentage}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              concluído
            </span>
          </div>
          {/* Subtle Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, stats.weekProgressPercentage)}%` }}
            />
          </div>
        </div>

        {/* Card 3: Atividades Concluídas nesta Semana */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 sm:p-5 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Atividades da Semana</span>
            <CheckSquare className="w-4 h-4 text-purple-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono tabular-nums text-slate-900 dark:text-white">
              {stats.weekCompletedCount}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              de {stats.weekTotalApplicable} previstas
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {stats.weekIgnoredCount > 0 ? (
              <span>{stats.weekIgnoredCount} ignorada(s) sem culpa</span>
            ) : (
              <span>Constância sem pressa</span>
            )}
          </div>
        </div>

        {/* Card 4: Blocos Trabalhados */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 sm:p-5 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Blocos Ativos</span>
            <Layers className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono tabular-nums text-slate-900 dark:text-white">
              {stats.blocksWorkedCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              de 4 blocos
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {stats.blocksWorkedCount >= 3 ? 'Equilíbrio excelente' : 'Avance no seu tempo'}
          </div>
        </div>
      </div>

      {/* 3. Minha Jornada: 60 Days Progress Bar (Temporal vs Activity differentiation) */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Minha Jornada de 60 Dias
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Passagem do tempo versus atividades concluídas (dois ritmos independentes)
            </p>
          </div>
          <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
            Início: {state.settings.startDate}
          </div>
        </div>

        {/* Two comparative bars */}
        <div className="space-y-4">
          {/* Time passage bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                Tempo Percorrido: Dia {currentDay} de 60 ({Math.round((currentDay / 60) * 100)}%)
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                {60 - currentDay > 0 ? `${60 - currentDay} dias restantes` : '60 dias completados!'}
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round((currentDay / 60) * 100))}%` }}
              />
            </div>
          </div>

          {/* Activity milestone indicator note */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60">
            <span>
              Total de registros concluídos na plataforma: <strong className="font-mono text-slate-700 dark:text-slate-300">{stats.totalCompletedOverall}</strong> atividades
            </span>
            <span>
              Tópicos de base & carreira dominados: <strong className="font-mono text-slate-700 dark:text-slate-300">{stats.baseTopicsCompleted + stats.careerTopicsCompleted}</strong> tópicos
            </span>
          </div>
        </div>
      </div>

      {/* 4. Sunday Review alert banner if Sunday */}
      {isSunday && (
        <div className="rounded-xl border border-purple-500/30 bg-purple-50/50 dark:bg-purple-950/20 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 mt-0.5">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Hoje é Domingo · Momento de Reflexão Leve
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Três perguntas acolhedoras para fechar a semana em paz: o que funcionou, o que atrapalhou e o que ajustar.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToDiary}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors whitespace-nowrap shrink-0"
          >
            Fazer Reflexão Semanal
          </button>
        </div>
      )}

      {/* 5. Missões da Semana: Grouped by block with live checkboxes */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Missões da Semana Atual (Semana {currentWeekNumber})
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                · Marque diretamente aqui
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Visão geral agrupada pelos quatro blocos. Lembre-se: você não precisa fazer tudo hoje.
            </p>
          </div>

          <button
            onClick={onNavigateToWeek}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            <span>Abrir grade semanal completa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Columns for the 4 Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['base', 'carreira', 'pessoal', 'buff'] as BlockId[]).map((blockId) => {
            const config = BLOCKS_CONFIG[blockId];
            const items = groupedByBlock[blockId] || [];

            return (
              <div
                key={blockId}
                className="rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                    <div className="flex items-center gap-2">
                      {getBlockIcon(blockId)}
                      <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {config.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {items.filter((i) => i.occurrence.status === 'completed').length}/{items.length}
                    </span>
                  </div>

                  {items.length === 0 ? (
                    <div className="text-xs text-slate-400 italic py-3 text-center">
                      Sem atividades nesta semana
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {items.slice(0, 4).map(({ activity, occurrence }) => {
                        const isDone = occurrence.status === 'completed';
                        const isIgnored = occurrence.status === 'ignored';

                        return (
                          <div
                            key={activity.id}
                            className={`p-2.5 rounded-md border text-xs transition-colors ${
                              isDone
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-slate-700 dark:text-slate-300'
                                : isIgnored
                                ? 'bg-slate-100/50 dark:bg-slate-800/30 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 opacity-75'
                                : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <button
                                onClick={() => {
                                  const nextStatus = isDone ? 'pending' : 'completed';
                                  setActivityStatus(currentWeekNumber, activity.id, nextStatus);
                                }}
                                className="mt-0.5 shrink-0 focus-visible:outline-none"
                                title={isDone ? 'Desmarcar' : 'Concluir atividade'}
                              >
                                {isDone ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <Circle className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />
                                )}
                              </button>
                              <div className="min-w-0 flex-1">
                                <span
                                  className={`font-medium block leading-snug ${
                                    isDone ? 'line-through text-slate-500 dark:text-slate-400' : ''
                                  }`}
                                >
                                  {activity.title}
                                </span>
                                {activity.subtasks && activity.subtasks.length > 0 && (
                                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                                    {activity.subtasks[0]}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {items.length > 4 && (
                        <div className="text-[11px] text-center text-slate-500 pt-1">
                          +{items.length - 4} atividades na grade
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-right">
                  <button
                    onClick={onNavigateToBlocks}
                    className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  >
                    Ver trilha de {config.name} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Motivational Message Section */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-6 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>PENSAMENTO PARA HOJE</span>
          </div>
          <button
            onClick={nextQuote}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            title="Sortear outra frase"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Outra reflexão</span>
          </button>
        </div>
        <blockquote className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed">
          "{currentQuote}"
        </blockquote>
        <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Lembre-se: O objetivo é construir uma rotina que caiba na sua vida, não se esgotar para caber em uma rotina.
        </div>
      </div>
    </div>
  );
};
