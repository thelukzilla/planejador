import React, { useState } from 'react';
import {
  BookOpen,
  Code2,
  Compass,
  Zap,
  CheckCircle2,
  Circle,
  Plus,
  ExternalLink,
  Book,
  Video,
  Bookmark,
  Sparkles,
  Edit2,
  Trash2,
  Check,
  X,
  FileCode,
  Flame,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BLOCKS_CONFIG } from '../data/initialData';
import { BlockId, CodingChallenge, Book as BookType, BuffMission, PersonalTheme } from '../types';

export const BlocksView: React.FC = () => {
  const {
    state,
    selectedWeek,
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
  } = useApp();

  const [activeTab, setActiveTab] = useState<BlockId>('base');

  // Input states for adding new topics
  const [newTopicCategoryIdx, setNewTopicCategoryIdx] = useState<number | null>(null);
  const [newTopicTitle, setNewTopicTitle] = useState('');

  // Challenge modal state
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [chalName, setChalName] = useState('');
  const [chalDesc, setChalDesc] = useState('');
  const [chalDiff, setChalDiff] = useState<'Iniciante' | 'Intermediário' | 'Avançado'>('Iniciante');
  const [chalStatus, setChalStatus] = useState<'Não iniciado' | 'Em andamento' | 'Concluído'>('Não iniciado');
  const [chalNotes, setChalNotes] = useState('');
  const [chalGithub, setChalGithub] = useState('');

  // Book modal state
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookCategory, setBookCategory] = useState('');
  const [bookStatus, setBookStatus] = useState<'Quero ler' | 'Lendo' | 'Concluído'>('Quero ler');
  const [bookTotalPages, setBookTotalPages] = useState<number | ''>('');
  const [bookCurrentPage, setBookCurrentPage] = useState<number | ''>('');
  const [bookNotes, setBookNotes] = useState('');
  const [bookReview, setBookReview] = useState('');

  // Buff mission modal state
  const [isBuffModalOpen, setIsBuffModalOpen] = useState(false);
  const [buffTitle, setBuffTitle] = useState('');
  const [buffDesc, setBuffDesc] = useState('');
  const [buffCat, setBuffCat] = useState<'Portfólio' | 'Empregabilidade' | 'Inglês' | 'Oratória' | 'Extraordinária'>('Portfólio');
  const [isExtraordinary, setIsExtraordinary] = useState(false);

  // Theme modal state
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [themeTitle, setThemeTitle] = useState('');
  const [themeDesc, setThemeDesc] = useState('');
  const [themeNotes, setThemeNotes] = useState('');

  // Documentary for the selected week
  const currentDoc = state.documentaries[selectedWeek] || {
    weekNumber: selectedWeek,
    title: 'Documentário da Semana',
    theme: 'História e Sociedade',
    url: '',
    completed: false,
    keyTakeaway: '',
    followUpResearch: '',
  };

  const handleCreateTopic = (e: React.FormEvent, block: 'base' | 'career') => {
    e.preventDefault();
    if (newTopicCategoryIdx === null || !newTopicTitle.trim()) return;

    if (block === 'base') {
      addBaseStudyTopic(newTopicCategoryIdx, newTopicTitle);
    } else {
      addCareerTopic(newTopicCategoryIdx, newTopicTitle);
    }
    setNewTopicTitle('');
    setNewTopicCategoryIdx(null);
  };

  const handleSaveChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chalName.trim()) return;
    addCodingChallenge({
      name: chalName.trim(),
      description: chalDesc.trim(),
      difficulty: chalDiff,
      status: chalStatus,
      notes: chalNotes.trim(),
      githubUrl: chalGithub.trim(),
      completedAt: chalStatus === 'Concluído' ? new Date().toISOString() : undefined,
    });
    setIsChallengeModalOpen(false);
    setChalName('');
    setChalDesc('');
    setChalNotes('');
    setChalGithub('');
  };

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim()) return;
    addBook({
      title: bookTitle.trim(),
      author: bookAuthor.trim(),
      category: bookCategory.trim() || 'Geral',
      status: bookStatus,
      totalPages: typeof bookTotalPages === 'number' ? bookTotalPages : undefined,
      currentPage: typeof bookCurrentPage === 'number' ? bookCurrentPage : undefined,
      notes: bookNotes.trim(),
      finalReview: bookReview.trim(),
    });
    setIsBookModalOpen(false);
    setBookTitle('');
    setBookAuthor('');
    setBookCategory('');
    setBookTotalPages('');
    setBookCurrentPage('');
    setBookNotes('');
    setBookReview('');
  };

  const handleSaveBuff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buffTitle.trim()) return;
    addBuffMission({
      title: buffTitle.trim(),
      description: buffDesc.trim(),
      category: isExtraordinary ? 'Extraordinária' : buffCat,
      isExtraordinary,
      completed: false,
      weekNumber: selectedWeek,
    });
    setIsBuffModalOpen(false);
    setBuffTitle('');
    setBuffDesc('');
    setIsExtraordinary(false);
  };

  const handleSaveTheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!themeTitle.trim()) return;
    addPersonalTheme({
      title: themeTitle.trim(),
      description: themeDesc.trim(),
      notes: themeNotes.trim(),
      status: 'Ativo',
    });
    setIsThemeModalOpen(false);
    setThemeTitle('');
    setThemeDesc('');
    setThemeNotes('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. Header & Segmented Block Selector */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Os Quatro Blocos
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Trilhas de conteúdo, fundamentos estruturados e projetos práticos
        </p>

        {/* 4 Block Tabs (Interactive segmented buttons) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
          {(['base', 'carreira', 'pessoal', 'buff'] as BlockId[]).map((bId) => {
            const config = BLOCKS_CONFIG[bId];
            const isCurrent = activeTab === bId;

            return (
              <button
                key={bId}
                onClick={() => setActiveTab(bId)}
                className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-white dark:bg-[#111622] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {bId === 'base' && <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />}
                {bId === 'carreira' && <Code2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                {bId === 'pessoal' && <Compass className="w-4 h-4 text-purple-500 shrink-0" />}
                {bId === 'buff' && <Zap className="w-4 h-4 text-amber-500 shrink-0" />}
                <span className="truncate">{config.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TAB CONTENT: BASE DE ESTUDO (AZUL) */}
      {activeTab === 'base' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/10 p-5">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span>Bloco 1 — Base de Estudo</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              <strong>Objetivo:</strong> Recuperar fundamentos escolares essenciais para tecnologia, raciocínio lógico e interpretação. Não inclui todas as matérias escolares: foca apenas naquilo que constrói clareza de pensamento.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {state.baseStudyTopics.map((category, catIdx) => {
              const completedCount = category.topics.filter((t) => t.completed).length;
              const percent = Math.round((completedCount / category.topics.length) * 100);

              return (
                <div
                  key={category.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {category.title}
                        </h3>
                        {category.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {category.description}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 shrink-0">
                        {completedCount}/{category.topics.length} ({percent}%)
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full my-3 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    {/* Topic checklist items */}
                    <div className="space-y-2 mt-4">
                      {category.topics.map((topic) => (
                        <div
                          key={topic.id}
                          className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors text-xs"
                        >
                          <label className="flex items-center gap-2.5 cursor-pointer select-none min-w-0 flex-1">
                            <input
                              type="checkbox"
                              checked={topic.completed}
                              onChange={() => toggleBaseStudyTopic(catIdx, topic.id)}
                              className="w-4 h-4 text-blue-600 rounded border-slate-300 dark:border-slate-700 focus:ring-blue-500 cursor-pointer"
                            />
                            <span
                              className={`truncate leading-snug ${
                                topic.completed
                                  ? 'line-through text-slate-400 dark:text-slate-500'
                                  : 'text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              {topic.title}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add topic inline input */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    {newTopicCategoryIdx === catIdx ? (
                      <form onSubmit={(e) => handleCreateTopic(e, 'base')} className="flex gap-2">
                        <input
                          type="text"
                          autoFocus
                          value={newTopicTitle}
                          onChange={(e) => setNewTopicTitle(e.target.value)}
                          placeholder="Nome do tópico..."
                          className="flex-1 p-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded hover:bg-blue-500"
                        >
                          Adicionar
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewTopicCategoryIdx(null)}
                          className="p-1 text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </form>
                    ) : (
                      <button
                        onClick={() => {
                          setNewTopicCategoryIdx(catIdx);
                          setNewTopicTitle('');
                        }}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Adicionar tópico personalizado</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. TAB CONTENT: CARREIRA (VERDE / TURQUESA) */}
      {activeTab === 'carreira' && (
        <div className="space-y-8">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/10 p-5">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-500" />
              <span>Bloco 2 — Carreira (Python & Hábito de Programar)</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              <strong>Objetivo:</strong> Construir domínio progressivo de Python como única linguagem principal nos primeiros 60 dias. Sem pressa para devorar tudo: cada nível é uma base sólida para raciocínio e projetos reais.
            </p>
          </div>

          {/* Section: Python Levels */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Trilha Progressiva em 5 Níveis
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fundamentos até Orientação a Objetos. Domine no seu tempo.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.careerLevels.map((lvl, lvlIdx) => {
                const doneCount = lvl.topics.filter((t) => t.completed).length;
                const percent = Math.round((doneCount / lvl.topics.length) * 100);

                return (
                  <div
                    key={lvl.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {lvl.title}
                        </h4>
                        <span className="text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 shrink-0">
                          {doneCount}/{lvl.topics.length}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
                        {lvl.description}
                      </p>

                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mb-3 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="space-y-1.5">
                        {lvl.topics.map((t) => (
                          <label
                            key={t.id}
                            className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors text-xs cursor-pointer select-none"
                          >
                            <input
                              type="checkbox"
                              checked={t.completed}
                              onChange={() => toggleCareerTopic(lvlIdx, t.id)}
                              className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 dark:border-slate-700 focus:ring-emerald-500"
                            />
                            <span
                              className={`truncate leading-snug ${
                                t.completed
                                  ? 'line-through text-slate-400 dark:text-slate-500'
                                  : 'text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              {t.title}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                      {newTopicCategoryIdx === lvlIdx + 100 ? (
                        <form onSubmit={(e) => handleCreateTopic(e, 'career')} className="flex gap-2">
                          <input
                            type="text"
                            autoFocus
                            value={newTopicTitle}
                            onChange={(e) => setNewTopicTitle(e.target.value)}
                            placeholder="Novo tópico Python..."
                            className="flex-1 p-1 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                          <button
                            type="submit"
                            className="px-2 py-0.5 text-xs font-semibold bg-emerald-600 text-white rounded"
                          >
                            Ok
                          </button>
                        </form>
                      ) : (
                        <button
                          onClick={() => {
                            setNewTopicCategoryIdx(lvlIdx + 100);
                            setNewTopicTitle('');
                          }}
                          className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Adicionar tópico</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Coding Challenges (Desafios e Projetos) */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-500" />
                  <span>Desafios & Projetos Práticos</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Exercícios reais para exercitar lógica, depuração e autonomia
                </p>
              </div>

              <button
                onClick={() => setIsChallengeModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Cadastrar Desafio</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.codingChallenges.map((chal) => {
                const isConcluido = chal.status === 'Concluído';
                const isEmAndamento = chal.status === 'Em andamento';

                return (
                  <div
                    key={chal.id}
                    className={`rounded-xl border p-4 flex flex-col justify-between transition-colors ${
                      isConcluido
                        ? 'border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/10'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          {chal.difficulty}
                        </span>

                        {/* Status selector */}
                        <select
                          value={chal.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as any;
                            updateCodingChallenge(chal.id, {
                              status: newStatus,
                              completedAt: newStatus === 'Concluído' ? new Date().toISOString() : undefined,
                            });
                          }}
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                            isConcluido
                              ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                              : isEmAndamento
                              ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          <option value="Não iniciado">Não iniciado</option>
                          <option value="Em andamento">Em andamento</option>
                          <option value="Concluído">Concluído</option>
                        </select>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {chal.name}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                        {chal.description}
                      </p>

                      {chal.notes && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800 italic">
                          {chal.notes}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      {chal.githubUrl ? (
                        <a
                          href={chal.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Repositório GitHub</span>
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Sem link de repositório</span>
                      )}

                      <button
                        onClick={() => deleteCodingChallenge(chal.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        title="Remover desafio"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB CONTENT: DESENVOLVIMENTO PESSOAL (ROXO) */}
      {activeTab === 'pessoal' && (
        <div className="space-y-8">
          <div className="rounded-xl border border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/10 p-5">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-purple-500" />
              <span>Bloco 3 — Desenvolvimento Pessoal</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              <strong>Objetivo:</strong> Estimular curiosidade, leitura e reflexão histórica e social. A História é o eixo central que conecta literatura, sociedade, política e ciência sem sobrecarregar com metas rígidas.
            </p>
          </div>

          {/* Section: Biblioteca Pessoal */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Book className="w-4 h-4 text-purple-500" />
                  <span>Biblioteca Pessoal</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Leituras em andamento e livros de interesse. Sem metas obrigatórias de páginas diárias.
                </p>
              </div>

              <button
                onClick={() => setIsBookModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Livro</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.books.map((b) => (
                <div
                  key={b.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {b.category}
                      </span>
                      <select
                        value={b.status}
                        onChange={(e) => updateBook(b.id, { status: e.target.value as any })}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-purple-600 dark:text-purple-400"
                      >
                        <option value="Quero ler">Quero ler</option>
                        <option value="Lendo">Lendo</option>
                        <option value="Concluído">Concluído</option>
                      </select>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{b.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{b.author}</p>

                    {b.totalPages && (
                      <div className="mt-3">
                        <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                          <span>Progresso</span>
                          <span className="font-mono">
                            {b.currentPage || 0} / {b.totalPages} pág
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-purple-500 h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.round(((b.currentPage || 0) / b.totalPages) * 100)
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {b.notes && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 p-2 bg-slate-50 dark:bg-slate-900/60 rounded border border-slate-100 dark:border-slate-800/80">
                        {b.notes}
                      </p>
                    )}

                    {b.finalReview && (
                      <div className="mt-3 p-2 bg-purple-50/50 dark:bg-purple-950/20 rounded border border-purple-200/50 dark:border-purple-800/30 text-xs text-purple-900 dark:text-purple-300">
                        <strong className="block text-[11px] uppercase tracking-wide">Comentário final:</strong>
                        {b.finalReview}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">Status: {b.status}</span>
                    <button
                      onClick={() => deleteBook(b.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Remover livro"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Documentário da Semana */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
            <div className="rounded-xl border border-purple-500/30 bg-white dark:bg-[#111622] p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <Video className="w-5 h-5 text-purple-500" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      Documentário da Semana {selectedWeek}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Uma sugestão leve por semana. Pode ser ignorado sem qualquer penalidade.
                    </p>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-purple-600 dark:text-purple-400">
                  <input
                    type="checkbox"
                    checked={currentDoc.completed}
                    onChange={(e) => updateDocumentary(selectedWeek, { completed: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded border-slate-300 dark:border-slate-700"
                  />
                  <span>Assistido</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Título / Tema do Documentário
                  </label>
                  <input
                    type="text"
                    value={currentDoc.title}
                    onChange={(e) => updateDocumentary(selectedWeek, { title: e.target.value })}
                    placeholder="Ex: A Revolução Industrial e a Sociedade Moderna"
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <div className="mt-2">
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Link (YouTube / Streaming - opcional)
                    </label>
                    <input
                      type="url"
                      value={currentDoc.url || ''}
                      onChange={(e) => updateDocumentary(selectedWeek, { url: e.target.value })}
                      placeholder="https://..."
                      className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      O que mais me chamou atenção?
                    </label>
                    <textarea
                      rows={2}
                      value={currentDoc.keyTakeaway}
                      onChange={(e) => updateDocumentary(selectedWeek, { keyTakeaway: e.target.value })}
                      placeholder="Ideia marcante, reflexão ou detalhe histórico..."
                      className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      O que gostaria de pesquisar depois?
                    </label>
                    <textarea
                      rows={2}
                      value={currentDoc.followUpResearch}
                      onChange={(e) => updateDocumentary(selectedWeek, { followUpResearch: e.target.value })}
                      placeholder="Dúvidas, tópicos para aprofundar no futuro..."
                      className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Temas que estou explorando */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-purple-500" />
                  <span>Temas que Estou Explorando</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pontes conceituais da história para entender as ideias do mundo contemporâneo
                </p>
              </div>

              <button
                onClick={() => setIsThemeModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Tema</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.personalThemes.map((thm) => (
                <div
                  key={thm.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {thm.title}
                      </h4>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                        {thm.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {thm.description}
                    </p>
                    {thm.notes && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 p-2 bg-slate-50 dark:bg-slate-900/60 rounded italic">
                        {thm.notes}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
                    <button
                      onClick={() => deletePersonalTheme(thm.id)}
                      className="text-slate-400 hover:text-red-500 text-xs p-1"
                      title="Remover tema"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB CONTENT: BUFF (ÂMBAR / LARANJA) */}
      {activeTab === 'buff' && (
        <div className="space-y-8">
          <div className="rounded-xl border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/10 p-5">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Bloco 4 — Buff (Preparação & Oportunidades Profissionais)</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              <strong>Objetivo:</strong> Manter Billy preparado para o mercado enquanto fortalece sua formação. Bloco flexível focado em 1 missão principal por semana (ou substituição por missões extraordinárias caso surja oportunidade real).
            </p>
          </div>

          {/* Buff Categories Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { cat: 'Portfólio', desc: 'Melhorar README, testes e demonstrações de projetos' },
              { cat: 'Empregabilidade', desc: 'Revisar CV, atualizar LinkedIn e pesquisar vagas' },
              { cat: 'Inglês', desc: 'Documentação técnica, vocabulário e leitura ativa' },
              { cat: 'Oratória', desc: 'Explicar projetos em voz alta e treinar pitch' },
            ].map((c) => (
              <div
                key={c.cat}
                className="p-3 rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111622]"
              >
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {c.cat}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Buff Missions List */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>Missões Buff Cadastradas</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Execute 1 por semana ou cadastre uma missão extraordinária sob demanda
                </p>
              </div>

              <button
                onClick={() => setIsBuffModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-500 transition-colors self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nova Missão / Extraordinária</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.buffMissions.map((buff) => (
                <div
                  key={buff.id}
                  className={`rounded-xl border p-4 flex flex-col justify-between transition-colors ${
                    buff.completed
                      ? 'border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : buff.isExtraordinary
                      ? 'border-amber-500/40 bg-amber-50/20 dark:bg-amber-950/10'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                          buff.isExtraordinary
                            ? 'bg-amber-500 text-white'
                            : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                        }`}
                      >
                        {buff.isExtraordinary ? '⚡ Missão Extraordinária' : buff.category}
                      </span>

                      <button
                        onClick={() =>
                          updateBuffMission(buff.id, {
                            completed: !buff.completed,
                            completedAt: !buff.completed ? new Date().toISOString() : undefined,
                          })
                        }
                        className="p-1"
                        title={buff.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
                      >
                        {buff.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-amber-500" />
                        )}
                      </button>
                    </div>

                    <h4
                      className={`text-sm font-bold ${
                        buff.completed
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {buff.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {buff.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>{buff.completed ? 'Concluída' : 'Disponível'}</span>
                    <button
                      onClick={() => deleteBuffMission(buff.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Excluir missão"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: Cadastrar Desafio de Código */}
      {isChallengeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Cadastrar Desafio de Programação Python
              </h2>
              <button onClick={() => setIsChallengeModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveChallenge} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nome do Projeto / Desafio *
                </label>
                <input
                  type="text"
                  required
                  value={chalName}
                  onChange={(e) => setChalName(e.target.value)}
                  placeholder="Ex: Simulador de Caixa Eletrônico"
                  className="w-full p-2.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Descrição
                </label>
                <textarea
                  rows={2}
                  value={chalDesc}
                  onChange={(e) => setChalDesc(e.target.value)}
                  placeholder="O que o programa deve fazer..."
                  className="w-full p-2.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Dificuldade
                  </label>
                  <select
                    value={chalDiff}
                    onChange={(e) => setChalDiff(e.target.value as any)}
                    className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                  >
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={chalStatus}
                    onChange={(e) => setChalStatus(e.target.value as any)}
                    className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                  >
                    <option value="Não iniciado">Não iniciado</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Link GitHub (opcional)
                </label>
                <input
                  type="url"
                  value={chalGithub}
                  onChange={(e) => setChalGithub(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsChallengeModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 text-white rounded hover:bg-emerald-500"
                >
                  Salvar Desafio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Cadastrar Livro */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Adicionar Livro à Biblioteca
              </h2>
              <button onClick={() => setIsBookModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveBook} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Título do Livro *
                </label>
                <input
                  type="text"
                  required
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Ex: Admirável Mundo Novo"
                  className="w-full p-2.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Autor
                  </label>
                  <input
                    type="text"
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}
                    placeholder="Aldous Huxley"
                    className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={bookCategory}
                    onChange={(e) => setBookCategory(e.target.value)}
                    placeholder="Literatura, História, etc."
                    className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={bookStatus}
                    onChange={(e) => setBookStatus(e.target.value as any)}
                    className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                  >
                    <option value="Quero ler">Quero ler</option>
                    <option value="Lendo">Lendo</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Pág. Atual
                  </label>
                  <input
                    type="number"
                    value={bookCurrentPage}
                    onChange={(e) => setBookCurrentPage(e.target.value ? Number(e.target.value) : '')}
                    placeholder="0"
                    className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Total Páginas
                  </label>
                  <input
                    type="number"
                    value={bookTotalPages}
                    onChange={(e) => setBookTotalPages(e.target.value ? Number(e.target.value) : '')}
                    placeholder="320"
                    className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-purple-600 text-white rounded hover:bg-purple-500"
                >
                  Salvar Livro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Cadastrar Missão Buff */}
      {isBuffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Cadastrar Missão Buff
              </h2>
              <button onClick={() => setIsBuffModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveBuff} className="space-y-4">
              <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-amber-800 dark:text-amber-300">
                  <input
                    type="checkbox"
                    checked={isExtraordinary}
                    onChange={(e) => setIsExtraordinary(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <span>Missão Extraordinária (Ex: Convite para entrevista, teste prático)</span>
                </label>
                <p className="text-[11px] text-amber-700/80 dark:text-amber-400/80 mt-1">
                  Substitui a missão semanal padrão sem acumular sobrecarga.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Título da Missão *
                </label>
                <input
                  type="text"
                  required
                  value={buffTitle}
                  onChange={(e) => setBuffTitle(e.target.value)}
                  placeholder="Ex: Treinar pitch de 2 minutos para entrevista de estágio"
                  className="w-full p-2.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                />
              </div>

              {!isExtraordinary && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Categoria
                  </label>
                  <select
                    value={buffCat}
                    onChange={(e) => setBuffCat(e.target.value as any)}
                    className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                  >
                    <option value="Portfólio">Portfólio</option>
                    <option value="Empregabilidade">Empregabilidade</option>
                    <option value="Inglês">Inglês</option>
                    <option value="Oratória">Oratória</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Descrição / Ação Prática
                </label>
                <textarea
                  rows={2}
                  value={buffDesc}
                  onChange={(e) => setBuffDesc(e.target.value)}
                  placeholder="Passos objetivos a executar..."
                  className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsBuffModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-amber-600 text-white rounded hover:bg-amber-500"
                >
                  Salvar Missão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Cadastrar Tema Pessoal */}
      {isThemeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Adicionar Tema de Exploração
              </h2>
              <button onClick={() => setIsThemeModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveTheme} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Título do Tema *
                </label>
                <input
                  type="text"
                  required
                  value={themeTitle}
                  onChange={(e) => setThemeTitle(e.target.value)}
                  placeholder="Ex: A Formação das Cidades Medievais"
                  className="w-full p-2.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Descrição
                </label>
                <textarea
                  rows={2}
                  value={themeDesc}
                  onChange={(e) => setThemeDesc(e.target.value)}
                  placeholder="Por que esse tema é instigante..."
                  className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsThemeModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-purple-600 text-white rounded hover:bg-purple-500"
                >
                  Salvar Tema
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
