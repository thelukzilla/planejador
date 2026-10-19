import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar, NavTab } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { WeeklyView } from './components/WeeklyView';
import { BlocksView } from './components/BlocksView';
import { JourneyView } from './components/JourneyView';
import { ProgressView } from './components/ProgressView';
import { DiaryView } from './components/DiaryView';
import { SettingsModal } from './components/SettingsModal';

function MainLayout() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { state, setSelectedWeek } = useApp();

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* 1. Universal Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* 2. Main Content Viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            onNavigateToWeek={() => setActiveTab('semana')}
            onNavigateToBlocks={() => setActiveTab('blocos')}
            onNavigateToJourney={() => setActiveTab('jornada')}
            onNavigateToDiary={() => setActiveTab('diario')}
          />
        )}

        {activeTab === 'semana' && <WeeklyView />}

        {activeTab === 'blocos' && <BlocksView />}

        {activeTab === 'jornada' && (
          <JourneyView
            onNavigateToWeek={(weekNum) => {
              setSelectedWeek(weekNum);
              setActiveTab('semana');
            }}
          />
        )}

        {activeTab === 'progresso' && <ProgressView />}

        {activeTab === 'diario' && <DiaryView />}
      </main>

      {/* 3. Quiet Editorial Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-[#0b0f17]/50 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Projeto Billy
            </span>
            <span>·</span>
            <span>Evoluir um pouco todos os dias, sem precisar fazer tudo todos os dias.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>60 Dias de Evolução</span>
            <span>·</span>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:underline text-slate-600 dark:text-slate-300"
            >
              Configurações & Backup
            </button>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
