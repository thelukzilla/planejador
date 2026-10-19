import React from 'react';
import { BatteryCharging, BatteryMedium, BatteryLow, Sparkles, Coffee } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EnergyMode } from '../types';

export const EnergyModeBanner: React.FC = () => {
  const { state, setEnergyMode } = useApp();
  const currentMode = state.settings.energyMode;

  const modes: {
    id: EnergyMode;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    activeBorder: string;
    activeBg: string;
    activeText: string;
  }[] = [
    {
      id: 'normal',
      label: 'Dia Normal',
      sublabel: 'Rotina planejada com calma e equilíbrio',
      icon: <BatteryCharging className="w-4 h-4 text-blue-500" />,
      activeBorder: 'border-blue-500/40',
      activeBg: 'bg-blue-50/50 dark:bg-blue-950/20',
      activeText: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 'leve',
      label: 'Dia Leve',
      sublabel: 'Versão enxuta: 1 a 2 ações essenciais',
      icon: <BatteryMedium className="w-4 h-4 text-amber-500" />,
      activeBorder: 'border-amber-500/40',
      activeBg: 'bg-amber-50/50 dark:bg-amber-950/20',
      activeText: 'text-amber-600 dark:text-amber-400',
    },
    {
      id: 'recuperacao',
      label: 'Dia de Recuperação',
      sublabel: 'Pausa intencional. Zero cobrança de tarefas.',
      icon: <BatteryLow className="w-4 h-4 text-emerald-500" />,
      activeBorder: 'border-emerald-500/40',
      activeBg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      activeText: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 sm:p-5 shadow-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Modo do Dia
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">· Adapte o ritmo à sua energia real</span>
        </div>
        {currentMode === 'recuperacao' && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <Coffee className="w-3.5 h-3.5" />
            <span>Descanso é parte ativa do aprendizado. Sem tarefas acumuladas para amanhã.</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {modes.map((m) => {
          const isSelected = currentMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setEnergyMode(m.id)}
              className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? `${m.activeBorder} ${m.activeBg} ring-1 ring-blue-500/20 shadow-xs`
                  : 'border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="mt-0.5 shrink-0">{m.icon}</div>
              <div className="min-w-0">
                <div className={`text-xs font-semibold ${isSelected ? m.activeText : 'text-slate-800 dark:text-slate-200'}`}>
                  {m.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                  {m.sublabel}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
