import React from 'react';
import {
  MapPin,
  Calendar,
  Flag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface JourneyViewProps {
  onNavigateToWeek: (weekNum: number) => void;
}

export const JourneyView: React.FC<JourneyViewProps> = ({ onNavigateToWeek }) => {
  const { currentDay, currentPhase, currentWeekNumber, selectedWeek, setSelectedWeek, state } = useApp();

  const totalDays = 60;
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  const weeksSummary = [
    { num: 1, range: 'Dias 1 a 7', phase: 1, title: 'Semana 1 · Primeiro Contato', desc: 'Iniciar os hábitos com suavidade e sem autocobrança.' },
    { num: 2, range: 'Dias 8 a 14', phase: 1, title: 'Semana 2 · Fixando o Ritmo', desc: 'Consolidação da rotina básica e fechamento da fase de adaptação.' },
    { num: 3, range: 'Dias 15 a 21', phase: 2, title: 'Semana 3 · Transição & Foco', desc: 'Início da consolidação: estruturas de dados em Python e matemática aplicada.' },
    { num: 4, range: 'Dias 22 a 28', phase: 2, title: 'Semana 4 · Ganho de Ritmo', desc: 'Quatro semanas de constância. Primeiros projetos e desafios de código.' },
    { num: 5, range: 'Dias 29 a 35', phase: 2, title: 'Semana 5 · Virada para Autonomia', desc: 'A partir do dia 31: foco em resolver problemas sem depender de gabarito imediato.' },
    { num: 6, range: 'Dias 36 a 42', phase: 2, title: 'Semana 6 · Fortalecimento', desc: 'Funções avançadas, modularização e aprofundamento das leituras históricas.' },
    { num: 7, range: 'Dias 43 a 49', phase: 2, title: 'Semana 7 · Prática Aplicada', desc: 'Projetos mais encorpados e simulação de desafios profissionais no Buff.' },
    { num: 8, range: 'Dias 50 a 56', phase: 2, title: 'Semana 8 · Reta Final', desc: 'Refinamento de código, revisão de fundamentos e auto-confiança sólida.' },
    { num: 9, range: 'Dias 57 a 60', phase: 2, title: 'Semana 9 · Conclusão & Celebração', desc: 'Fechamento dos 60 dias de evolução sustentável e preparação para o futuro.' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* 1. Header */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Jornada de 60 Dias
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Mapa visual de evolução pessoal, dividido em duas grandes fases
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] text-slate-700 dark:text-slate-300">
              Hoje: <strong>Dia {currentDay}</strong> ({currentPhase === 1 ? 'Adaptação' : 'Consolidação'})
            </span>
          </div>
        </div>
      </div>

      {/* 2. Visual Roadmap: 60 Dots / Blocks */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>Mapa Temporal dos 60 Dias</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Cada quadrado representa um dia da sua jornada. Passar de um dia não exige perfeição.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-blue-600" />
              <span className="text-slate-600 dark:text-slate-400">Dia Atual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-slate-300 dark:bg-slate-700" />
              <span className="text-slate-600 dark:text-slate-400">Dias Percorridos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm border border-slate-300 dark:border-slate-700" />
              <span className="text-slate-600 dark:text-slate-400">Dias Futuros</span>
            </div>
          </div>
        </div>

        {/* 60 Grid Dots */}
        <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-15 lg:grid-cols-20 gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80">
          {daysArray.map((d) => {
            const isPast = d < currentDay;
            const isToday = d === currentDay;
            const isPhase1 = d <= 14;
            const isMilestone = d === 14 || d === 30 || d === 60;

            return (
              <div
                key={d}
                title={`Dia ${d} (${isPhase1 ? 'Fase 1: Adaptação' : 'Fase 2: Consolidação'})${
                  isToday ? ' - HOJE' : ''
                }`}
                className={`relative flex flex-col items-center justify-center h-10 rounded-md text-[11px] font-mono transition-all ${
                  isToday
                    ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-500/50 shadow-sm scale-105 z-10'
                    : isPast
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium'
                    : 'border border-slate-200 dark:border-slate-800 text-slate-400'
                }`}
              >
                <span>{d}</span>
                {isMilestone && (
                  <span
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                      d === 14
                        ? 'bg-amber-400'
                        : d === 30
                        ? 'bg-purple-400'
                        : 'bg-emerald-400'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Milestone captions */}
        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            <span>Dia 14: Fechamento da Adaptação</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
            <span>Dia 30: Virada para Autonomia de Soluções</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Dia 60: Conclusão da Jornada Inicial</span>
          </span>
        </div>
      </div>

      {/* 3. The Two Phases Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Phase 1 */}
        <div className="rounded-xl border border-blue-500/30 bg-white dark:bg-[#111622] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
              Fase 1 · Dias 1 a 14
            </span>
            <span className="text-xs font-mono text-slate-500">2 Semanas</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Adaptação & Início Suave
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            <strong>Objetivo:</strong> Reconstruir o hábito de sentar para estudar sem exigir perfeição ou sessões exaustivas.
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-1.5">
              <span className="text-blue-500 font-bold">·</span>
              <span>Estudos curtos e objetivos em dias úteis.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-blue-500 font-bold">·</span>
              <span>Quarta e sábado livres de cobrança para foco na faculdade.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-blue-500 font-bold">·</span>
              <span>Domingo focado em reflexão leve, documentário e convívio familiar.</span>
            </li>
          </ul>
        </div>

        {/* Phase 2 */}
        <div className="rounded-xl border border-emerald-500/30 bg-white dark:bg-[#111622] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
              Fase 2 · Dias 15 a 60
            </span>
            <span className="text-xs font-mono text-slate-500">7 Semanas</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Consolidação & Autonomia
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            <strong>Objetivo:</strong> Aumentar gradualmente a profundidade do raciocínio e independência, e não a quantidade de tarefas.
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-500 font-bold">·</span>
              <span>Mesma distribuição semanal confortável para proteger a rotina.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-500 font-bold">·</span>
              <span>A partir do Dia 31: mais autonomia na resolução de exercícios e depuração.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-500 font-bold">·</span>
              <span>Construção de projetos práticos Python para portfólio.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 4. All 9 Weeks Navigation Cards */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Todas as 9 Semanas da Jornada
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weeksSummary.map((w) => {
            const isCurrent = w.num === currentWeekNumber;
            const isSelected = w.num === selectedWeek;

            return (
              <div
                key={w.num}
                className={`rounded-xl border p-4 flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'border-blue-500/50 bg-blue-50/20 dark:bg-blue-950/20 shadow-xs'
                    : isSelected
                    ? 'border-slate-400 dark:border-slate-600 bg-white dark:bg-[#111622]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {w.range}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-600 text-white">
                        Semana Atual
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {w.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {w.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Fase {w.phase}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedWeek(w.num);
                      onNavigateToWeek(w.num);
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Ver atividades</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
