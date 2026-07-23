import React, { useState } from 'react';
import { ArchiveService } from '../../services/archiveService';

interface BackupRestoreModalProps {
  onClose: () => void;
  onRefreshArchive: () => void;
}

export const BackupRestoreModal: React.FC<BackupRestoreModalProps> = ({
  onClose,
  onRefreshArchive,
}) => {
  const [jsonText, setJsonText] = useState('');
  const [overwrite, setOverwrite] = useState(false);
  const [feedback, setFeedback] = useState<{ success?: boolean; message?: string }>({});

  const handleExport = () => {
    const jsonStr = ArchiveService.exportArchiveJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kalachakra_Eternal_Archive_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setFeedback({ success: true, message: 'Archive backup downloaded successfully!' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content);
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!jsonText.trim()) {
      setFeedback({ success: false, message: 'Please paste JSON payload or select a backup file.' });
      return;
    }
    const result = ArchiveService.importArchiveJSON(jsonText, overwrite);
    setFeedback(result);
    if (result.success) {
      onRefreshArchive();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-gold-royal rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-kc-brass/40 pb-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-kc-maroon dark:text-kc-gold">
              Backup & Restore Architecture (संरक्षण एवं पुनःस्थापन)
            </h2>
            <p className="font-serif text-xs text-kc-text-muted">
              Export encrypted/schema-validated archive JSON or restore past chart collections.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xl font-bold text-kc-maroon dark:text-kc-gold hover:opacity-75 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback.message && (
          <div
            className={`p-3.5 rounded-xl text-xs font-serif ${
              feedback.success
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                : 'bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/30'
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Export Section */}
        <div className="p-4 bg-kc-sand/30 dark:bg-kc-dark-wood/40 rounded-xl border border-kc-brass/30 space-y-2">
          <h3 className="font-heading text-sm font-bold text-kc-maroon dark:text-kc-gold">
            1. Export Eternal Archive Backup
          </h3>
          <p className="text-xs font-serif text-kc-text-muted">
            Download full archive JSON containing all saved Kundalis, metadata versioning (`1.0.0`), family labels, and user settings.
          </p>
          <button
            type="button"
            onClick={handleExport}
            className="px-4 py-2 rounded-xl text-xs font-heading font-bold bg-kc-maroon text-kc-ivory dark:bg-kc-gold dark:text-kc-burnt-brown hover:opacity-90 shadow transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>📥</span> Download Complete Archive JSON
          </button>
        </div>

        {/* Import Section */}
        <div className="p-4 bg-kc-sand/30 dark:bg-kc-dark-wood/40 rounded-xl border border-kc-brass/30 space-y-3">
          <h3 className="font-heading text-sm font-bold text-kc-maroon dark:text-kc-gold">
            2. Restore Archive Backup
          </h3>

          <div className="space-y-2">
            <label className="block text-xs font-heading text-kc-text-muted">
              Select Backup JSON File:
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="text-xs font-sans text-kc-text-primary dark:text-kc-text-secondary cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-heading text-kc-text-muted mb-1">
              Or Paste Backup JSON Payload:
            </label>
            <textarea
              rows={4}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="Paste JSON contents here..."
              className="w-full p-3 font-mono text-xs bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/40 rounded-xl focus:outline-none focus:border-kc-gold text-kc-text-primary dark:text-kc-ivory"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-serif text-kc-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={overwrite}
              onChange={(e) => setOverwrite(e.target.checked)}
              className="accent-kc-maroon dark:accent-kc-gold rounded"
            />
            <span>Overwrite existing archive items with imported items</span>
          </label>

          <button
            type="button"
            onClick={handleImport}
            className="px-4 py-2 rounded-xl text-xs font-heading font-bold bg-kc-gold text-kc-burnt-brown hover:bg-kc-gold-royal shadow transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>🔄</span> Validate & Import Archive
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-heading font-semibold bg-kc-sand dark:bg-kc-dark-wood text-kc-text-primary dark:text-kc-ivory cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
