import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { SectionHeading, TempleLabel } from '../../components/typography/Typography';
import { useSettings } from '../../context/SettingsContext';
import { useLocalization } from '../../context/LocalizationContext';
import { useSound } from '../../context/AudioContext';
import { ArchiveService } from '../../services/archiveService';
import { Language, DateFormat, TimeFormat, AyanamshaSystem, HouseSystem } from '../../types/settings';
import { WaxSeal } from '../../components/decorations/WaxSeal';

export const SettingsModulePage: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { language, setLanguage, t } = useLocalization();
  const { isMuted, toggleMute } = useSound();

  const [activeTab, setActiveTab] = useState<'general' | 'astronomy' | 'visuals' | 'archive' | 'account'>('general');
  const [feedback, setFeedback] = useState<string>('');

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    updateSettings({ language: lang });
    setFeedback('Language settings updated.');
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleExportBackup = () => {
    const jsonStr = ArchiveService.exportArchiveJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kalachakra_Settings_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setFeedback('Archive & Settings backup exported.');
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="border-b border-kc-brass/30 pb-6 flex items-center justify-between">
          <div>
            <TempleLabel>{t('settings_subtitle', 'Astronomical Engines & Preferences')}</TempleLabel>
            <SectionHeading className="border-none pb-0 mb-1">
              {t('settings_title', 'Settings Chamber')} (विन्यास एवं प्राचल)
            </SectionHeading>
            <p className="font-serif text-xs sm:text-sm text-kc-text-muted italic">
              Configure Vedic astronomical calculation algorithms, localization languages, theme aesthetics, and local archive backups.
            </p>
          </div>
          <WaxSeal size="md" label="⚙" />
        </div>

        {/* Feedback alert */}
        {feedback && (
          <div className="p-3 bg-kc-gold/10 border border-kc-gold/30 rounded-xl text-xs font-serif text-kc-maroon dark:text-kc-gold">
            ✓ {feedback}
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-kc-brass/30 overflow-x-auto pb-2">
          {[
            { id: 'general', label: 'Language & Formatting', icon: '🌐' },
            { id: 'astronomy', label: 'Astronomical Engines', icon: '🪐' },
            { id: 'visuals', label: 'Visuals & Sound', icon: '🪔' },
            { id: 'archive', label: 'Archive & Backup', icon: '💾' },
            { id: 'account', label: 'Sync & Cloud (Future)', icon: '☁' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-kc-maroon text-kc-ivory dark:bg-kc-gold dark:text-kc-burnt-brown shadow border-b-2 border-kc-gold-royal'
                  : 'bg-kc-paper dark:bg-kc-burnt-brown text-kc-text-secondary hover:bg-kc-sand/50 border border-kc-brass/30'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: General & Localization */}
        {activeTab === 'general' && (
          <div className="bg-kc-paper dark:bg-kc-burnt-brown p-6 rounded-2xl border border-kc-brass/30 shadow space-y-6">
            <h3 className="font-heading text-sm font-bold text-kc-maroon dark:text-kc-gold uppercase tracking-wider">
              Localization & Display Preferences
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Language Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-heading text-kc-text-primary dark:text-kc-ivory font-semibold">
                  Preferred Application Language
                </label>
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as Language)}
                  className="kc-select w-full p-2.5 text-xs"
                >
                  <option value="en">English (English Terminology)</option>
                  <option value="hi">हिंदी (Hindi Translation)</option>
                  <option value="sa">संस्कृतम् (Sanskrit Headings)</option>
                </select>
                <p className="text-[11px] font-serif text-kc-text-muted">
                  Sets UI terminology and headings across all knowledge chambers.
                </p>
              </div>

              {/* Date Format */}
              <div className="space-y-2">
                <label className="block text-xs font-heading text-kc-text-primary dark:text-kc-ivory font-semibold">
                  Date Formatting
                </label>
                <select
                  value={settings.dateFormat}
                  onChange={(e) => updateSettings({ dateFormat: e.target.value as DateFormat })}
                  className="kc-select w-full p-2.5 text-xs"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 15/08/1998)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (ISO standard)</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY (US standard)</option>
                  <option value="D MMM YYYY">D MMM YYYY (e.g. 15 Aug 1998)</option>
                </select>
              </div>

              {/* Time Format */}
              <div className="space-y-2">
                <label className="block text-xs font-heading text-kc-text-primary dark:text-kc-ivory font-semibold">
                  Time Formatting
                </label>
                <select
                  value={settings.timeFormat}
                  onChange={(e) => updateSettings({ timeFormat: e.target.value as TimeFormat })}
                  className="kc-select w-full p-2.5 text-xs"
                >
                  <option value="12h">12-Hour AM/PM (e.g. 06:30 AM)</option>
                  <option value="24h">24-Hour Railway Time (e.g. 18:30)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Astronomical Engine Settings */}
        {activeTab === 'astronomy' && (
          <div className="bg-kc-paper dark:bg-kc-burnt-brown p-6 rounded-2xl border border-kc-brass/30 shadow space-y-6">
            <h3 className="font-heading text-sm font-bold text-kc-maroon dark:text-kc-gold uppercase tracking-wider">
              Celestial Computation Engine Parameters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ayanamsha System */}
              <div className="space-y-2">
                <label className="block text-xs font-heading text-kc-text-primary dark:text-kc-ivory font-semibold">
                  Ayanamsha Precession System
                </label>
                <select
                  value={settings.ayanamsha}
                  onChange={(e) => updateSettings({ ayanamsha: e.target.value as AyanamshaSystem })}
                  className="kc-select w-full p-2.5 text-xs"
                >
                  <option value="lahiri">Lahiri / Chitrapaksha (Traditional Standard)</option>
                  <option value="raman">B.V. Raman Ayanamsha</option>
                  <option value="krishnamurti">KP (Krishnamurti Paddhati) Ayanamsha</option>
                </select>
                <p className="text-[11px] font-serif text-kc-text-muted">
                  Used by Swiss Ephemeris for sidereal conversion of planetary longitudes.
                </p>
              </div>

              {/* House System */}
              <div className="space-y-2">
                <label className="block text-xs font-heading text-kc-text-primary dark:text-kc-ivory font-semibold">
                  House Division System (Bhava Chakra)
                </label>
                <select
                  value={settings.houseSystem}
                  onChange={(e) => updateSettings({ houseSystem: e.target.value as HouseSystem })}
                  className="kc-select w-full p-2.5 text-xs"
                >
                  <option value="whole_sign">Whole Sign (Rashi Bhava - Parasari Classical)</option>
                  <option value="placidus">Placidus (Semi-Arc House Division)</option>
                  <option value="equal">Equal House System</option>
                </select>
                <p className="text-[11px] font-serif text-kc-text-muted">
                  Calculates 12 house boundaries for Kundali chart generation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Visuals & Sound */}
        {activeTab === 'visuals' && (
          <div className="bg-kc-paper dark:bg-kc-burnt-brown p-6 rounded-2xl border border-kc-brass/30 shadow space-y-6">
            <h3 className="font-heading text-sm font-bold text-kc-maroon dark:text-kc-gold uppercase tracking-wider">
              Aesthetics & Sensory Controls
            </h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-3.5 bg-kc-sand/30 dark:bg-kc-dark-wood/40 rounded-xl border border-kc-brass/30 cursor-pointer">
                <div>
                  <span className="font-heading text-xs font-bold text-kc-maroon dark:text-kc-gold">Reduced Motion Animations</span>
                  <p className="text-[11px] font-serif text-kc-text-muted">Minimizes intense parallax scroll and wheel rotation effects for accessibility.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.reducedMotion}
                  onChange={(e) => updateSettings({ reducedMotion: e.target.checked })}
                  className="accent-kc-maroon dark:accent-kc-gold h-4 w-4 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 bg-kc-sand/30 dark:bg-kc-dark-wood/40 rounded-xl border border-kc-brass/30 cursor-pointer">
                <div>
                  <span className="font-heading text-xs font-bold text-kc-maroon dark:text-kc-gold">Temple Soundscapes & Effects</span>
                  <p className="text-[11px] font-serif text-kc-text-muted">Enable temple bell chimes, manuscript page turns, and ink stroke sounds.</p>
                </div>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="px-3 py-1 rounded bg-kc-maroon text-kc-ivory dark:bg-kc-gold dark:text-kc-burnt-brown text-xs font-heading"
                >
                  {isMuted ? 'Muted (Silent)' : 'Active (Enabled)'}
                </button>
              </label>
            </div>
          </div>
        )}

        {/* Tab 4: Archive & Backup */}
        {activeTab === 'archive' && (
          <div className="bg-kc-paper dark:bg-kc-burnt-brown p-6 rounded-2xl border border-kc-brass/30 shadow space-y-6">
            <h3 className="font-heading text-sm font-bold text-kc-maroon dark:text-kc-gold uppercase tracking-wider">
              Eternal Archive Maintenance
            </h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-3.5 bg-kc-sand/30 dark:bg-kc-dark-wood/40 rounded-xl border border-kc-brass/30 cursor-pointer">
                <div>
                  <span className="font-heading text-xs font-bold text-kc-maroon dark:text-kc-gold">Auto-Preserve Kundalis in Archive</span>
                  <p className="text-[11px] font-serif text-kc-text-muted">Automatically save every generated natal chart directly to the Eternal Archive library.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoArchive}
                  onChange={(e) => updateSettings({ autoArchive: e.target.checked })}
                  className="accent-kc-maroon dark:accent-kc-gold h-4 w-4 rounded"
                />
              </label>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="px-4 py-2 rounded-xl text-xs font-heading font-bold bg-kc-maroon text-kc-ivory dark:bg-kc-gold dark:text-kc-burnt-brown shadow hover:opacity-90 cursor-pointer flex items-center gap-1.5"
                >
                  <span>📥</span> Export Settings & Archive JSON
                </button>

                <button
                  type="button"
                  onClick={resetSettings}
                  className="px-4 py-2 rounded-xl text-xs font-heading font-semibold bg-kc-sand dark:bg-kc-dark-wood text-kc-text-primary dark:text-kc-ivory hover:bg-kc-sand/80 cursor-pointer"
                >
                  Reset Defaults
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Account & Cloud Sync Preparation */}
        {activeTab === 'account' && (
          <div className="bg-kc-paper dark:bg-kc-burnt-brown p-6 rounded-2xl border border-kc-brass/30 shadow space-y-4">
            <h3 className="font-heading text-sm font-bold text-kc-maroon dark:text-kc-gold uppercase tracking-wider">
              Account Synchronization & Notification Infrastructure
            </h3>

            <div className="p-4 bg-kc-sand/40 dark:bg-kc-dark-wood/60 rounded-xl border border-kc-brass/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-sans bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold uppercase">
                Future Infrastructure Ready
              </span>
              <p className="text-xs font-serif text-kc-text-secondary dark:text-kc-text-muted">
                Your archive is currently stored locally in your browser with complete privacy and zero required cloud accounts.
              </p>
              <p className="text-xs font-serif text-kc-text-muted italic">
                Future phases will support encrypted end-to-end cloud synchronization and cross-device push notifications for upcoming Muhurats and transit events.
              </p>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
};
