import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  Layers,
  MapPin,
  TrendingUp,
  BookMarked,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  BatteryCharging,
  BatteryMedium,
  BatteryLow,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export type NavTab = 'dashboard' | 'semana' | 'blocos' | 'jornada' | 'progresso' | 'diario';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSettings,
}) => {
  const { state, updateSettings, setEnergyMode, currentDay } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = state.settings.theme === 'dark';

  const toggleTheme = () => {
    updateSettings({ theme: isDark ? 'light' : 'dark' });
  };

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'semana', label: 'Minha Semana', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'blocos', label: 'Quatro Blocos', icon: <Layers className="w-4 h-4" /> },
    { id: 'jornada', label: 'Jornada 60D', icon: <MapPin className="w-4 h-4" /> },
    { id: 'progresso', label: 'Meu Progresso', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'diario', label: 'Diário & Reflexão', icon: <BookMarked className="w-4 h-4" /> },
  ];

  const getEnergyIcon = () => {
    switch (state.settings.energyMode) {
      case 'recuperacao':
        return <BatteryLow className="w-4 h-4 text-emerald-400" />;
      case 'leve':
        return <BatteryMedium className="w-4 h-4 text-amber-400" />;
      default:
        return <BatteryCharging className="w-4 h-4 text-blue-400" />;
    }
  };

  const getEnergyLabel = () => {
    switch (state.settings.energyMode) {
      case 'recuperacao':
        return 'Recuperação';
      case 'leve':
        return 'Dia Leve';
      default:
        return 'Dia Normal';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0b0f17]/95 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm tracking-wider shadow-sm">
              PB
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                Projeto Billy
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                Dia {currentDay}/60
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs xl:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800/80 dark:text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Theme toggle, Energy indicator, Settings) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Energy mode quick menu button */}
          <button
            onClick={() => {
              const modes: ('normal' | 'leve' | 'recuperacao')[] = ['normal', 'leve', 'recuperacao'];
              const nextIdx = (modes.indexOf(state.settings.energyMode) + 1) % modes.length;
              setEnergyMode(modes[nextIdx]);
            }}
            title="Alternar Modo do Dia (Normal, Leve, Recuperação)"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            {getEnergyIcon()}
            <span>{getEnergyLabel()}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema claro/escuro"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Settings button */}
          <button
            onClick={onOpenSettings}
            aria-label="Configurações do Projeto Billy"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu principal"
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b0f17] px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Modo do dia:</span>
            <div className="flex gap-1">
              {(['normal', 'leve', 'recuperacao'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setEnergyMode(m)}
                  className={`px-2 py-1 text-xs rounded font-medium ${
                    state.settings.energyMode === m
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {m === 'normal' ? 'Normal' : m === 'leve' ? 'Leve' : 'Recuperação'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
