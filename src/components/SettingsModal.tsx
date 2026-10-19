import React, { useState } from 'react';
import {
  X,
  Settings,
  Download,
  Upload,
  RotateCcw,
  User,
  Calendar,
  Sun,
  Moon,
  AlertTriangle,
  CheckCircle2,
  Database,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    state,
    updateSettings,
    exportBackupJSON,
    importBackupJSON,
    resetAllData,
  } = useApp();

  const [nameInput, setNameInput] = useState(state.settings.userName);
  const [dateInput, setDateInput] = useState(state.settings.startDate);
  const [importStatus, setImportStatus] = useState<{ success?: boolean; error?: string } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      userName: nameInput.trim() || 'Billy',
      startDate: dateInput,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExport = () => {
    const jsonStr = exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `projeto_billy_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importBackupJSON(content);
        if (result.success) {
          setImportStatus({ success: true });
          setTimeout(() => {
            setImportStatus(null);
            onClose();
          }, 1500);
        } else {
          setImportStatus({ success: false, error: result.error });
        }
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmReset = () => {
    resetAllData();
    setConfirmReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-6 shadow-2xl transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-blue-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Configurações & Gerenciamento
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-xs">
          {/* Section 1: User Profile & Start Date */}
          <form onSubmit={handleSavePreferences} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" />
              <span>Perfil & Início da Jornada</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Nome do Usuário
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Billy"
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Data de Início da Jornada
                </label>
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              {saveSuccess ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Preferências atualizadas!</span>
                </span>
              ) : (
                <span className="text-[11px] text-slate-500">
                  Alterar a data inicial recalcula seu dia atual entre 1 e 60.
                </span>
              )}

              <button
                type="submit"
                className="px-3.5 py-1.5 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Salvar Alterações
              </button>
            </div>
          </form>

          {/* Section 2: Backup & Export/Import */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-500" />
              <span>Persistência & Backup Local</span>
            </h3>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              Seus dados ficam armazenados localmente e de forma segura no navegador (LocalStorage). Caso limpe o histórico do navegador ou queira migrar para outro dispositivo, faça o download do backup JSON.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              {/* Export Button */}
              <button
                type="button"
                onClick={handleExport}
                className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors flex-1"
              >
                <Download className="w-4 h-4 text-emerald-500" />
                <span>Exportar Backup JSON</span>
              </button>

              {/* Import Input */}
              <label className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors flex-1 cursor-pointer">
                <Upload className="w-4 h-4 text-blue-500" />
                <span>Restaurar Backup JSON</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileImport}
                  className="hidden"
                />
              </label>
            </div>

            {importStatus && (
              <div
                className={`p-2.5 rounded-lg text-xs mt-2 ${
                  importStatus.success
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                }`}
              >
                {importStatus.success
                  ? 'Backup importado com sucesso! Recarregando dados...'
                  : `Erro ao importar: ${importStatus.error}`}
              </div>
            )}
          </div>

          {/* Section 3: Reset Journey */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              <span>Zona de Reinício</span>
            </h3>

            <p className="text-slate-500 text-[11px] leading-relaxed">
              Deseja zerar todo o progresso e recomeçar a jornada de 60 dias do início? Esta ação restaura os tópicos e atividades padrões.
            </p>

            {confirmReset ? (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 space-y-2">
                <p className="font-semibold text-red-700 dark:text-red-300 text-xs">
                  Tem certeza absoluta? Todos os registros e notas serão resetados.
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmReset}
                    className="px-3 py-1.5 text-xs font-semibold bg-red-600 text-white rounded hover:bg-red-500"
                  >
                    Sim, zerar jornada
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                Reiniciar Jornada do Zero
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
