import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle2,
  Circle,
  EyeOff,
  Edit2,
  Trash2,
  MessageSquare,
  Sparkles,
  BookOpen,
  Code2,
  Compass,
  Zap,
  RotateCcw,
  Save,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BLOCKS_CONFIG } from '../data/initialData';
import { BlockId, ActivityStatus, ActivityTemplate } from '../types';

export const WeeklyView: React.FC = () => {
  const {
    state,
    currentWeekNumber,
    selectedWeek,
    setSelectedWeek,
    getWeeklyActivities,
    setActivityStatus,
    setActivityNote,
    addCustomActivity,
    editActivity,
    deleteActivity,
    stats,
  } = useApp();

  // Active note editor state
  const [activeNoteActivityId, setActiveNoteActivityId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  // Add/edit activity modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedDayForNew, setSelectedDayForNew] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formBlock, setFormBlock] = useState<BlockId>('base');
  const [formSubtasks, setFormSubtasks] = useState('');

  const daysOfWeek = [
    { num: 1 as const, name: 'Segunda-feira', short: 'Seg', desc: 'Base de Estudo, Carreira e Leitura' },
    { num: 2 as const, name: 'Terça-feira', short: 'Ter', desc: 'Carreira prática e leitura opcional' },
    { num: 3 as const, name: 'Quarta-feira', short: 'Qua', desc: 'Faculdade · Sem exigências dos blocos' },
    { num: 4 as const, name: 'Quinta-feira', short: 'Qui', desc: 'Base de Estudo e Carreira' },
    { num: 5 as const, name: 'Sexta-feira', short: 'Sex', desc: 'Carreira, Buff e Leitura opcional' },
    { num: 6 as const, name: 'Sábado', short: 'Sáb', desc: 'Faculdade · Tarde e noite livres' },
    { num: 7 as const, name: 'Domingo', short: 'Dom', desc: 'Revisão leve, Documentário e Família' },
  ];

  const currentPhase: 1 | 2 = selectedWeek <= 2 ? 1 : 2;
  const weeklyItems = getWeeklyActivities(selectedWeek);

  const getBlockIcon = (blockId: BlockId) => {
    switch (blockId) {
      case 'base':
        return <BookOpen className="w-3.5 h-3.5 text-blue-500" />;
      case 'carreira':
        return <Code2 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'pessoal':
        return <Compass className="w-3.5 h-3.5 text-purple-500" />;
      case 'buff':
        return <Zap className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  const openCreateModal = (dayNum: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
    setSelectedDayForNew(dayNum);
    setFormTitle('');
    setFormDesc('');
    setFormBlock('base');
    setFormSubtasks('');
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openEditModal = (activity: ActivityTemplate) => {
    setEditingActivityId(activity.id);
    setSelectedDayForNew(activity.dayOfWeek);
    setFormTitle(activity.title);
    setFormDesc(activity.description);
    setFormBlock(activity.blockId);
    setFormSubtasks(activity.subtasks ? activity.subtasks.join('\n') : '');
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const subtasksList = formSubtasks
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (modalMode === 'create') {
      addCustomActivity({
        title: formTitle.trim(),
        description: formDesc.trim(),
        blockId: formBlock,
        dayOfWeek: selectedDayForNew,
        subtasks: subtasksList,
        phase: 'both',
      });
    } else if (editingActivityId) {
      editActivity(editingActivityId, {
        title: formTitle.trim(),
        description: formDesc.trim(),
        blockId: formBlock,
        subtasks: subtasksList,
      });
    }

    setIsModalOpen(false);
  };

  const openNoteEditor = (activityId: string, currentNote?: string) => {
    setActiveNoteActivityId(activityId);
    setNoteDraft(currentNote || '');
  };

  const saveNote = (activityId: string) => {
    setActivityNote(selectedWeek, activityId, noteDraft);
    setActiveNoteActivityId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. Header & Navigation between weeks */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Minha Semana
            </h1>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              · Semana {selectedWeek} de 9
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {currentPhase === 1
              ? 'Fase 1 · Adaptação (Dias 1 a 14) — Ritmo amigável, sem horários fixos'
              : 'Fase 2 · Consolidação (Dias 15 a 60) — Aprofundamento gradual com autonomia'}
          </p>
        </div>

        {/* Week navigation control */}
        <div className="flex items-center gap-2 shrink-0">
          {selectedWeek !== currentWeekNumber && (
            <button
              onClick={() => setSelectedWeek(currentWeekNumber)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Semana Atual ({currentWeekNumber})</span>
            </button>
          )}

          <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0.5">
            <button
              disabled={selectedWeek <= 1}
              onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
              className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              title="Semana anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono">
              Semana {selectedWeek}
            </span>
            <button
              disabled={selectedWeek >= 9}
              onClick={() => setSelectedWeek(Math.min(9, selectedWeek + 1))}
              className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              title="Próxima semana"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Week progress summary ribbon */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold text-slate-900 dark:text-white">
            Progresso da Semana {selectedWeek}:
          </span>
          <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300 font-medium">
            {stats.weekCompletedCount} de {stats.weekTotalApplicable} atividades concluídas ({stats.weekProgressPercentage}%)
          </span>
          {stats.weekIgnoredCount > 0 && (
            <span className="text-slate-500">
              · {stats.weekIgnoredCount} ignorada(s) intencionalmente
            </span>
          )}
        </div>

        <div className="w-full sm:w-48 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, stats.weekProgressPercentage)}%` }}
          />
        </div>
      </div>

      {/* 3. Seven Days Grid */}
      <div className="space-y-6">
        {daysOfWeek.map((day) => {
          const dayItems = weeklyItems.filter((i) => i.activity.dayOfWeek === day.num);
          const isAcademicDay = day.num === 3 || day.num === 6;

          return (
            <div
              key={day.num}
              className={`rounded-xl border transition-colors ${
                isAcademicDay
                  ? 'border-slate-200/90 dark:border-slate-800/90 bg-white/70 dark:bg-[#111622]/70'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622]'
              } p-4 sm:p-5`}
            >
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      {day.name.toUpperCase()}
                    </h2>
                    {isAcademicDay && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                        Dia de Faculdade
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {day.desc}
                  </p>
                </div>

                <button
                  onClick={() => openCreateModal(day.num)}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar atividade</span>
                </button>
              </div>

              {/* Day Activities List */}
              {dayItems.length === 0 ? (
                <div className="text-xs text-slate-400 italic py-4 text-center">
                  Nenhuma atividade prevista para este dia. Aproveite o descanso ou adicione algo leve.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {dayItems.map(({ activity, occurrence }) => {
                    const blockConfig = BLOCKS_CONFIG[activity.blockId];
                    const isDone = occurrence.status === 'completed';
                    const isIgnored = occurrence.status === 'ignored';
                    const hasNote = Boolean(occurrence.note && occurrence.note.trim());
                    const isEditingNote = activeNoteActivityId === activity.id;

                    return (
                      <div
                        key={activity.id}
                        className={`rounded-lg border p-3.5 flex flex-col justify-between transition-all ${
                          isDone
                            ? 'bg-emerald-500/5 dark:bg-emerald-950/10 border-emerald-500/30'
                            : isIgnored
                            ? 'bg-slate-50/50 dark:bg-slate-900/30 border-dashed border-slate-300 dark:border-slate-800 opacity-60'
                            : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                        }`}
                      >
                        {/* Top Metadata */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                              {getBlockIcon(activity.blockId)}
                              <span>{blockConfig.name}</span>
                            </span>

                            {/* Actions dropdown/buttons */}
                            <div className="flex items-center gap-1">
                              {/* Ignored toggle */}
                              <button
                                onClick={() => {
                                  const next: ActivityStatus = isIgnored ? 'pending' : 'ignored';
                                  setActivityStatus(selectedWeek, activity.id, next);
                                }}
                                title={
                                  isIgnored
                                    ? 'Reativar atividade'
                                    : 'Ignorar intencionalmente (sem culpa)'
                                }
                                className={`p-1 rounded text-xs transition-colors ${
                                  isIgnored
                                    ? 'text-amber-500 bg-amber-500/10'
                                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}
                              >
                                <EyeOff className="w-3.5 h-3.5" />
                              </button>

                              {/* Edit if custom */}
                              {activity.isCustom && (
                                <button
                                  onClick={() => openEditModal(activity)}
                                  title="Editar atividade personalizada"
                                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {/* Delete if custom */}
                              {activity.isCustom && (
                                <button
                                  onClick={() => deleteActivity(activity.id)}
                                  title="Excluir atividade personalizada"
                                  className="p-1 rounded text-slate-400 hover:text-red-500"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Checkbox and Title */}
                          <div className="flex items-start gap-2.5">
                            <button
                              onClick={() => {
                                if (isIgnored) return;
                                const nextStatus: ActivityStatus = isDone ? 'pending' : 'completed';
                                setActivityStatus(selectedWeek, activity.id, nextStatus);
                              }}
                              disabled={isIgnored}
                              className="mt-0.5 shrink-0 focus-visible:outline-none"
                              title={isDone ? 'Marcar como pendente' : 'Marcar como concluída'}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              ) : isIgnored ? (
                                <EyeOff className="w-5 h-5 text-slate-400" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-slate-500" />
                              )}
                            </button>

                            <div className="min-w-0 flex-1">
                              <h3
                                className={`text-sm font-semibold leading-snug ${
                                  isDone
                                    ? 'line-through text-slate-500 dark:text-slate-400'
                                    : isIgnored
                                    ? 'text-slate-400 italic'
                                    : 'text-slate-900 dark:text-white'
                                }`}
                              >
                                {activity.title}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                {activity.description}
                              </p>

                              {/* Subtasks checklist if present */}
                              {activity.subtasks && activity.subtasks.length > 0 && (
                                <ul className="mt-2.5 space-y-1 text-xs text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-2">
                                  {activity.subtasks.map((sub, sIdx) => (
                                    <li key={sIdx} className="leading-snug">
                                      · {sub}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bottom note section */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                          {isEditingNote ? (
                            <div className="space-y-2">
                              <textarea
                                value={noteDraft}
                                onChange={(e) => setNoteDraft(e.target.value)}
                                placeholder="Anotação, dúvida ou observação sobre esta atividade..."
                                rows={2}
                                className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => setActiveNoteActivityId(null)}
                                  className="px-2 py-1 text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                >
                                  Cancelar
                                </button>
                                <button
                                  onClick={() => saveNote(activity.id)}
                                  className="px-2.5 py-1 text-[11px] font-medium bg-blue-600 text-white rounded hover:bg-blue-500"
                                >
                                  Salvar
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between text-[11px]">
                              {hasNote ? (
                                <button
                                  onClick={() => openNoteEditor(activity.id, occurrence.note)}
                                  className="text-left text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 line-clamp-1"
                                >
                                  <MessageSquare className="w-3 h-3 text-blue-500 shrink-0" />
                                  <span className="italic">{occurrence.note}</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => openNoteEditor(activity.id)}
                                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  <span>Adicionar nota</span>
                                </button>
                              )}

                              {isIgnored && (
                                <span className="text-[10px] text-amber-500 font-medium">
                                  Ignorada
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Modal for adding or editing custom activities */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-6 shadow-xl transition-colors">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {modalMode === 'create'
                  ? `Adicionar Atividade em ${daysOfWeek.find((d) => d.num === selectedDayForNew)?.name}`
                  : 'Editar Atividade Personalizada'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Título da Atividade *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ex: Resolver 3 problemas de porcentagem"
                  className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Descrição Curta
                </label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Objetivo simples, sem pressão de horário..."
                  className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Bloco
                  </label>
                  <select
                    value={formBlock}
                    onChange={(e) => setFormBlock(e.target.value as BlockId)}
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="base">Base de Estudo (Azul)</option>
                    <option value="carreira">Carreira (Verde)</option>
                    <option value="pessoal">Desenvolvimento Pessoal (Roxo)</option>
                    <option value="buff">Buff (Âmbar)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Dia da Semana
                  </label>
                  <select
                    value={selectedDayForNew}
                    onChange={(e) => setSelectedDayForNew(Number(e.target.value) as any)}
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {daysOfWeek.map((d) => (
                      <option key={d.num} value={d.num}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subtarefas ou Tópicos (uma por linha, opcional)
                </label>
                <textarea
                  rows={2}
                  value={formSubtasks}
                  onChange={(e) => setFormSubtasks(e.target.value)}
                  placeholder="Passo 1&#10;Passo 2"
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Salvar Atividade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
