import React, { useState, useEffect, useMemo } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { TempleLibraryHeader } from '../components/archive/TempleLibraryHeader';
import { FamilyLibraryFilter } from '../components/archive/FamilyLibraryFilter';
import { ManuscriptShelf } from '../components/archive/ManuscriptShelf';
import { ChartComparisonChamber } from '../components/archive/ChartComparisonChamber';
import { BackupRestoreModal } from '../components/archive/BackupRestoreModal';
import { RoyalManuscriptModal } from '../components/manuscript/RoyalManuscriptModal';
import { ArchiveService } from '../services/archiveService';
import { ArchiveItem, FilterOptions, FamilyGroup, ChartComparisonResult } from '../types/archive';
import { useNavigate } from 'react-router-dom';

export const EternalArchivePage: React.FC = () => {
  const navigate = useNavigate();

  const [archiveItems, setArchiveItems] = useState<ArchiveItem[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchQuery: '',
    category: 'all',
    familyGroup: 'all',
    rashiFilter: 'all',
    nakshatraFilter: 'all',
    favoritesOnly: false,
    sortBy: 'recent',
    sortOrder: 'desc',
  });

  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [comparisonData, setComparisonData] = useState<ChartComparisonResult | null>(null);

  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [selectedManuscriptBirthData, setSelectedManuscriptBirthData] = useState<any | null>(null);
  const [isManuscriptModalOpen, setIsManuscriptModalOpen] = useState(false);

  // Load archive items
  const reloadArchive = () => {
    const items = ArchiveService.getArchiveItems();
    setArchiveItems(items);
  };

  useEffect(() => {
    reloadArchive();
  }, []);

  // Filtered and searched items
  const filteredItems = useMemo(() => {
    return ArchiveService.searchAndFilter(filterOptions);
  }, [archiveItems, filterOptions]);

  // Family group counts calculation
  const familyGroupCounts = useMemo(() => {
    const counts: Record<FamilyGroup | 'all', number> = {
      all: archiveItems.length,
      self: 0,
      parents: 0,
      children: 0,
      relatives: 0,
      clients: 0,
      custom: 0,
    };
    archiveItems.forEach((item) => {
      if (counts[item.familyGroup] !== undefined) {
        counts[item.familyGroup]++;
      }
    });
    return counts;
  }, [archiveItems]);

  const handleUpdateFilter = (updates: Partial<FilterOptions>) => {
    setFilterOptions((prev) => ({ ...prev, ...updates }));
  };

  const handleToggleCompare = (id: string) => {
    setSelectedCompareIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleFavorite = (id: string) => {
    ArchiveService.toggleFavorite(id);
    reloadArchive();
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this manuscript from your archive?')) {
      ArchiveService.deleteArchiveItem(id);
      setSelectedCompareIds((prev) => prev.filter((i) => i !== id));
      reloadArchive();
    }
  };

  const handleViewDetails = (item: ArchiveItem) => {
    // Navigate to Kundali revelation view with chart data
    navigate('/kundali/view', {
      state: {
        kundaliData: item.kundaliData,
        birthData: item.birthData,
        wisdomData: item.wisdomData,
      },
    });
  };

  const handleReopenManuscript = (item: ArchiveItem) => {
    setSelectedManuscriptBirthData(item.birthData);
    setIsManuscriptModalOpen(true);
  };

  const handleOpenComparison = () => {
    if (selectedCompareIds.length < 2) return;
    const res = ArchiveService.getComparisonData(selectedCompareIds);
    setComparisonData(res);
    setIsComparisonOpen(true);
  };

  const handleExportJSON = () => {
    const jsonStr = ArchiveService.exportArchiveJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kalachakra_Archive_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Temple Library Header & Search Bar */}
        <TempleLibraryHeader
          filterOptions={filterOptions}
          onUpdateFilter={handleUpdateFilter}
          selectedCompareCount={selectedCompareIds.length}
          onOpenComparison={handleOpenComparison}
          onOpenBackupModal={() => setIsBackupModalOpen(true)}
          onExportJSON={handleExportJSON}
        />

        {/* Family Library Category Pills */}
        <FamilyLibraryFilter
          selectedGroup={filterOptions.familyGroup}
          onSelectGroup={(g) => handleUpdateFilter({ familyGroup: g })}
          counts={familyGroupCounts}
        />

        {/* Manuscript Shelf Grid */}
        <ManuscriptShelf
          items={filteredItems}
          selectedCompareIds={selectedCompareIds}
          onToggleCompare={handleToggleCompare}
          onToggleFavorite={handleToggleFavorite}
          onViewDetails={handleViewDetails}
          onReopenManuscript={handleReopenManuscript}
          onDelete={handleDeleteItem}
        />
      </div>

      {/* Comparison Chamber Modal */}
      {isComparisonOpen && comparisonData && (
        <ChartComparisonChamber
          comparisonData={comparisonData}
          onClose={() => setIsComparisonOpen(false)}
        />
      )}

      {/* Backup & Restore Modal */}
      {isBackupModalOpen && (
        <BackupRestoreModal
          onClose={() => setIsBackupModalOpen(false)}
          onRefreshArchive={reloadArchive}
        />
      )}

      {/* Royal 12-page Manuscript Document Modal */}
      <RoyalManuscriptModal
        isOpen={isManuscriptModalOpen}
        onClose={() => setIsManuscriptModalOpen(false)}
        rawBirthData={selectedManuscriptBirthData}
      />
    </AppShell>
  );
};
