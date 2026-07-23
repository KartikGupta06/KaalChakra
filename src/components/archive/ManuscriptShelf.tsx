import React from 'react';
import { ArchiveItem } from '../../types/archive';
import { ManuscriptCard } from './ManuscriptCard';

interface ManuscriptShelfProps {
  items: ArchiveItem[];
  selectedCompareIds: string[];
  onToggleCompare: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onViewDetails: (item: ArchiveItem) => void;
  onReopenManuscript: (item: ArchiveItem) => void;
  onDelete: (id: string) => void;
}

export const ManuscriptShelf: React.FC<ManuscriptShelfProps> = ({
  items,
  selectedCompareIds,
  onToggleCompare,
  onToggleFavorite,
  onViewDetails,
  onReopenManuscript,
  onDelete,
}) => {
  if (items.length === 0) {
    return (
      <div className="my-12 text-center p-12 bg-kc-paper/50 dark:bg-kc-burnt-brown/50 rounded-2xl border-2 border-dashed border-kc-brass/30">
        <div className="text-4xl mb-3">📜</div>
        <h3 className="font-heading text-lg font-bold text-kc-maroon dark:text-kc-gold">
          No Manuscripts Found
        </h3>
        <p className="font-serif text-sm text-kc-text-muted mt-1 max-w-md mx-auto">
          No preserved charts match your current search parameters or category filter. Try clearing filters or preserve a new chart.
        </p>
      </div>
    );
  }

  return (
    <div className="relative my-6">
      {/* Bookshelf Wooden Bar Visual Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-kc-sand/40 dark:bg-kc-dark-wood/60 rounded-t-xl border-t border-x border-kc-brass/40 text-xs font-heading font-semibold text-kc-maroon dark:text-kc-gold uppercase tracking-wider">
        <span>Preserved Sacred Manuscripts ({items.length})</span>
        <span>Royal Temple Archive</span>
      </div>

      {/* Grid of Manuscripts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-kc-sand/10 dark:bg-kc-dark-wood/20 rounded-b-xl border-b border-x border-kc-brass/30">
        {items.map((item) => (
          <ManuscriptCard
            key={item.id}
            item={item}
            isSelectedForCompare={selectedCompareIds.includes(item.id)}
            onToggleCompare={onToggleCompare}
            onToggleFavorite={onToggleFavorite}
            onViewDetails={onViewDetails}
            onReopenManuscript={onReopenManuscript}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
