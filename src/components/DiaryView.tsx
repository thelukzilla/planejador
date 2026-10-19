import React, { useState } from 'react';
import {
  BookMarked,
  Sparkles,
  Calendar,
  Save,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  HeartHandshake,
  Clock,
  Compass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DiaryView: React.FC = () => {
  const { state, currentWeekNumber, saveDailyReflection, saveSundayReview } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);

  // Daily reflection form fields
  const [learned, setLearned] = useState('');
  const [challenges, setChallenges] = useState('');
  const [toReview, setToReview] = useState('');
  const [discovery, setDiscovery] = useState('');
  const [personalNote, setPersonalNote] = useState('');
  const [dailySavedFeedback, setDailySavedFeedback] = useState(false);

  // Sunday review form fields for current or chosen week
  const [reviewWeekNum, setReviewWeekNum] = useState(currentWeekNumber);
  const existingReview = state.sundayReviews[reviewWeekNum];
  const [whatWorked, setWhatWorked] = useState(existingReview?.whatWorked || '');
  const [whatHindered, setWhatHindered] = useState(existingReview?.whatHindered || '');
  const [smallChange, setSmallChange] = useState(existingReview?.smallChange || '');
  const [sundaySavedFeedback, setSundaySavedFeedback] = useState(false);

  // Active sub-tab
  const [diaryMode, setDiaryMode] = useState<'daily' | 'sunday' | 'history'>('daily');

  const handleSaveDaily = (e: React.FormEvent) => {
    e.preventDefault();
    if (!learned && !challenges && !toReview && !discovery && !personalNote) return;

    saveDailyReflection({
      date: selectedDate,
      learned: learned.trim() || undefined,
      challenges: challenges.trim() || undefined,
      toReview: toReview.trim() || undefined,
      discovery: discovery.trim() || undefined,
      personalNote: personalNote.trim() || undefined,
    });

    setDailySavedFeedback(true);
    setTimeout(() => setDailySavedFeedback(false), 2500);
  };

  const handleSaveSunday = (e: React.FormEvent) => {
    e.preventDefault();
    saveSundayReview({
      weekNumber: reviewWeekNum,
      date: new Date().toISOString().split('T')[0],
      whatWorked: whatWorked.trim(),
      whatHindered: whatHindered.trim(),
      smallChange: smallChange.trim(),
    });

    setSundaySavedFeedback(true);
    setTimeout(() => setSundaySavedFeedback(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* 1. Header */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Diário & Reflexões
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Espaço opcional para consolidar aprendizados, registrar descobertas e calibrar a rota com carinho
        </p>

        {/* Mode Selector */}
        <div className="flex gap-2 mt-4 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 max-w-md">
          <button
            onClick={() => setDiaryMode('daily')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              diaryMode === 'daily'
                ? 'bg-white dark:bg-[#111622] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Registro do Dia
          </button>
          <button
            onClick={() => setDiaryMode('sunday')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              diaryMode === 'sunday'
                ? 'bg-white dark:bg-[#111622] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Reflexão Semanal (3 Perguntas)
          </button>
          <button
            onClick={() => setDiaryMode('history')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              diaryMode === 'history'
                ? 'bg-white dark:bg-[#111622] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Histórico ({state.reflections.length})
          </button>
        </div>
      </div>

      {/* 2. DAILY REFLECTION FORM */}
      {diaryMode === 'daily' && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Como foi seu estudo hoje?
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Preencha apenas o que fizer sentido. Não há obrigatoriedade de registrar todos os dias.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Calendar className="w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="p-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <form onSubmit={handleSaveDaily} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>O que aprendi hoje?</span>
                </label>
                <textarea
                  rows={3}
                  value={learned}
                  onChange={(e) => setLearned(e.target.value)}
                  placeholder="Conceito, lógica ou ferramenta nova..."
                  className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                  <span>O que achei difícil ou tive dúvida?</span>
                </label>
                <textarea
                  rows={3}
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="Algum bug em Python, enunciado que demandou releitura..."
                  className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-500" />
                  <span>O que gostaria de revisar depois?</span>
                </label>
                <textarea
                  rows={2}
                  value={toReview}
                  onChange={(e) => setToReview(e.target.value)}
                  placeholder="Tópico que vale passar o olho com mais calma..."
                  className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Uma descoberta interessante</span>
                </label>
                <textarea
                  rows={2}
                  value={discovery}
                  onChange={(e) => setDiscovery(e.target.value)}
                  placeholder="Fato histórico, atalho de código ou curiosidade..."
                  className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Reflexão Pessoal Livre
              </label>
              <textarea
                rows={2}
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                placeholder="Como você se sentiu, sentimentos em relação à sua evolução..."
                className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              {dailySavedFeedback ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Anotação salva com sucesso!</span>
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">
                  Salvo automaticamente no armazenamento seguro local.
                </span>
              )}

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Salvar Reflexão</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. SUNDAY REVIEW (3 ACOLHEDORAS PERGUNTAS) */}
      {diaryMode === 'sunday' && (
        <div className="rounded-xl border border-purple-500/30 bg-white dark:bg-[#111622] p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 mt-0.5">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Reflexão Dominical da Semana {reviewWeekNum}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Três perguntas sinceras e acolhedoras para fechar a semana sem sentimento de culpa
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Semana:</span>
              <select
                value={reviewWeekNum}
                onChange={(e) => {
                  const w = Number(e.target.value);
                  setReviewWeekNum(w);
                  const rev = state.sundayReviews[w];
                  setWhatWorked(rev?.whatWorked || '');
                  setWhatHindered(rev?.whatHindered || '');
                  setSmallChange(rev?.smallChange || '');
                }}
                className="p-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((w) => (
                  <option key={w} value={w}>
                    Semana {w}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <form onSubmit={handleSaveSunday} className="space-y-5">
            {/* Question 1 */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono text-xs">
                  1
                </span>
                <span>O que funcionou nesta semana?</span>
              </label>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
                Pequenos momentos de concentração, leitura agradável, um problema resolvido...
              </p>
              <textarea
                rows={3}
                value={whatWorked}
                onChange={(e) => setWhatWorked(e.target.value)}
                placeholder="Ex: Consegui sentar na segunda e na quinta para o código sem me distrair..."
                className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Question 2 */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 font-mono text-xs">
                  2
                </span>
                <span>O que me atrapalhou?</span>
              </label>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
                Cansaço do trabalho/faculdade, distração no celular, sono desregulado (sem julgamentos).
              </p>
              <textarea
                rows={3}
                value={whatHindered}
                onChange={(e) => setWhatHindered(e.target.value)}
                placeholder="Ex: Cheguei cansado na terça e tentei começar tarde da noite..."
                className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Question 3 */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 font-mono text-xs">
                  3
                </span>
                <span>Qual pequena mudança faria a próxima semana ser melhor?</span>
              </label>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
                Um micro-ajuste viável (ex: deixar o editor aberto, ler 10 minutos mais cedo, etc).
              </p>
              <textarea
                rows={3}
                value={smallChange}
                onChange={(e) => setSmallChange(e.target.value)}
                placeholder="Ex: Deixar o VS Code aberto no exercício antes de jantar..."
                className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              {sundaySavedFeedback ? (
                <span className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Reflexão semanal guardada com sucesso!</span>
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">
                  Semana registrada sem cobrança.
                </span>
              )}

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Salvar Reflexão da Semana</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. HISTÓRICO DE REFLEXÕES */}
      {diaryMode === 'history' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Histórico de Registros Pessoais
            </h2>
            <span className="text-xs font-mono text-slate-500">
              {state.reflections.length} anotações
            </span>
          </div>

          {state.reflections.length === 0 ? (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-8 text-center text-xs text-slate-400 italic">
              Nenhuma anotação diária salva até o momento. Quando quiser registrar um aprendizado, use a aba "Registro do Dia".
            </div>
          ) : (
            <div className="space-y-4">
              {state.reflections.map((ref) => (
                <div
                  key={ref.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
                    <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400">
                      {ref.date}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(ref.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {ref.learned && (
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                        <strong className="block text-slate-900 dark:text-white mb-1">
                          O que aprendeu:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {ref.learned}
                        </p>
                      </div>
                    )}

                    {ref.challenges && (
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                        <strong className="block text-slate-900 dark:text-white mb-1">
                          Dúvidas / Desafios:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {ref.challenges}
                        </p>
                      </div>
                    )}

                    {ref.toReview && (
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                        <strong className="block text-slate-900 dark:text-white mb-1">
                          Para revisar:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {ref.toReview}
                        </p>
                      </div>
                    )}

                    {ref.discovery && (
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                        <strong className="block text-slate-900 dark:text-white mb-1">
                          Descoberta interessante:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {ref.discovery}
                        </p>
                      </div>
                    )}
                  </div>

                  {ref.personalNote && (
                    <div className="p-3 rounded-lg bg-blue-50/30 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-xs">
                      <strong className="block text-slate-900 dark:text-white mb-1">
                        Reflexão pessoal:
                      </strong>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {ref.personalNote}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
