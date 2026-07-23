import React from 'react';
import { FilterOptions, ArchiveCategory } from '../../types/archive';
import { SectionHeading, TempleLabel } from '../typography/Typography';
import { useLocalization } from '../../context/LocalizationContext';
import { SearchLensIcon, ExportScrollIcon } from '../icons/SacredIcons';

interface TempleLibraryHeaderProps {
  filterOptions: FilterOptions;
  onUpdateFilter: (updates: Partial<FilterOptions>) => void;
  selectedCompareCount: number;
  onOpenComparison: () => void;
  onOpenBackupModal: () => void;
  onExportJSON: () => void;
}

export const TempleLibraryHeader: React.FC<TempleLibraryHeaderProps> = ({
  filterOptions,
  onUpdateFilter,
  selectedCompareCount,
  onOpenComparison,
  onOpenBackupModal,
  onExportJSON,
}) => {
  const { t } = useLocalization();

  const categories: { id: ArchiveCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: t('all_categories', 'All Archives'), icon: '📜' },
    { id: 'personal', label: t('personal_charts', 'Personal Charts'), icon: '☸' },
    { id: 'family', label: t('family_charts', 'Family Library'), icon: '👥' },
    { id: 'muhurat', label: t('saved_muhurats', 'Saved Muhurats'), icon: '🪔' },
    { id: 'manuscript', label: t('royal_manuscripts', 'Royal Manuscripts'), icon: '👑' },
    { id: 'timeline', label: t('timeline_snapshots', 'Timelines'), icon: '⏳' },
    { id: 'bookmark', label: t('bookmarks', 'Bookmarks'), icon: '★' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Sacred Title Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-kc-brass/30 pb-6">
        <div>
          <TempleLabel>{t('archive_subtitle', 'Sacred Temple Library')}</TempleLabel>
          <SectionHeading className="border-none pb-0 mb-1">
            {t('archive_title', 'The Eternal Archive')} (सनातन अभिलेखागार)
          </SectionHeading>
          <p className="font-serif text-xs sm:text-sm text-kc-text-muted italic">
            Preserve, organize, revisit, compare, and manage multiple charts and royal manuscripts through a timeless library experience.
          </p>
        </div>

        {/* Global Archive Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedCompareCount >= 2 && (
            <button
              type="button"
              onClick={onOpenComparison}
              className="px-4 py-2 rounded-xl text-xs font-heading font-bold bg-kc-gold text-kc-burnt-brown hover:bg-kc-gold-royal shadow-lg transition-all animate-pulse cursor-pointer flex items-center gap-1.5"
            >
              <span>⚖</span> {t('compare_charts', 'Compare Charts')} ({selectedCompareCount})
            </button>
          )}

          <button
            type="button"
            onClick={onOpenBackupModal}
            className="px-3.5 py-2 rounded-xl text-xs font-heading font-semibold bg-kc-paper dark:bg-kc-burnt-brown text-kc-maroon dark:text-kc-gold border border-kc-brass/50 hover:bg-kc-sand/50 transition-colors shadow cursor-pointer flex items-center gap-1.5"
          >
            <span>💾</span> {t('backup_restore', 'Backup & Restore')}
          </button>

          <button
            type="button"
            onClick={onExportJSON}
            className="px-3.5 py-2 rounded-xl text-xs font-heading font-semibold bg-kc-sand/60 dark:bg-kc-dark-wood text-kc-maroon dark:text-kc-gold border border-kc-brass/40 hover:bg-kc-sand transition-colors shadow cursor-pointer flex items-center gap-1.5"
            title="Download JSON Export"
          >
            <ExportScrollIcon size={16} /> {t('export_archive', 'Export JSON')}
          </button>
        </div>
      </div>

      {/* Search Bar & Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-kc-paper dark:bg-kc-burnt-brown p-4 rounded-2xl border border-kc-brass/30 shadow-inner">
        {/* Search Input */}
        <div className="md:col-span-2 relative">
          <input
            type="text"
            value={filterOptions.searchQuery}
            onChange={(e) => onUpdateFilter({ searchQuery: e.target.value })}
            placeholder={t('search_placeholder', 'Search by name, location, Nakshatra, Rashi, tags...')}
            className="kc-input w-full pl-10 pr-4 py-2.5 font-serif text-sm shadow-sm"
          />
          <span className="absolute left-3.5 top-3.5 text-kc-text-muted">
            <SearchLensIcon size={16} />
          </span>
        </div>

        {/* Sorting & Favorites Toggle */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs font-heading text-kc-text-muted whitespace-nowrap">Sort:</span>
            <select
              value={filterOptions.sortBy}
              onChange={(e) => onUpdateFilter({ sortBy: e.target.value as any })}
              className="kc-select w-full py-2 px-3 font-serif text-xs"
            >
              <option value="recent">Recently Added</option>
              <option value="name">Name (A-Z)</option>
              <option value="dateOfBirth">Birth Date</option>
              <option value="lastViewed">Last Viewed</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => onUpdateFilter({ favoritesOnly: !filterOptions.favoritesOnly })}
            className={`p-2 rounded-xl text-xs font-heading font-semibold border transition-colors cursor-pointer flex items-center gap-1 ${
              filterOptions.favoritesOnly
                ? 'bg-amber-500 text-white border-amber-600 shadow'
                : 'bg-kc-ivory dark:bg-kc-dark-wood text-kc-text-muted border-kc-brass/30 hover:border-amber-400'
            }`}
            title="Toggle Favorites Only"
          >
            <span>★</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = filterOptions.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onUpdateFilter({ category: cat.id })}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-kc-maroon text-kc-ivory dark:bg-kc-gold dark:text-kc-burnt-brown shadow-lg border-b-2 border-kc-gold-royal'
                  : 'bg-kc-paper dark:bg-kc-burnt-brown text-kc-text-secondary dark:text-kc-text-muted hover:bg-kc-sand/50 border border-kc-brass/30'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
