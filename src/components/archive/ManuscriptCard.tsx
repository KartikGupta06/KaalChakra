import React from 'react';
import { motion } from 'framer-motion';
import { ArchiveItem } from '../../types/archive';
import { WaxSeal } from '../decorations/WaxSeal';
import { useLocalization } from '../../context/LocalizationContext';

interface ManuscriptCardProps {
  item: ArchiveItem;
  isSelectedForCompare: boolean;
  onToggleCompare: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onViewDetails: (item: ArchiveItem) => void;
  onReopenManuscript: (item: ArchiveItem) => void;
  onDelete: (id: string) => void;
}

export const ManuscriptCard: React.FC<ManuscriptCardProps> = ({
  item,
  isSelectedForCompare,
  onToggleCompare,
  onToggleFavorite,
  onViewDetails,
  onReopenManuscript,
  onDelete,
}) => {
  const { t } = useLocalization();

  const ascendant = item.kundaliData?.ascendant;
  const createdDateStr = new Date(item.metadata.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative group flex flex-col justify-between rounded-xl p-5 border transition-all duration-300 shadow-md ${
        isSelectedForCompare
          ? 'border-kc-gold-royal bg-kc-ivory dark:bg-kc-dark-wood ring-2 ring-kc-gold-royal/50 shadow-amber-500/20'
          : 'border-kc-brass/40 bg-kc-paper dark:bg-kc-burnt-brown hover:border-kc-gold hover:shadow-kc-glow-amber'
      }`}
    >
      {/* Illuminated parchment texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-kc-gold-royal/5 via-transparent to-kc-maroon/5 rounded-xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

      {/* Card Header: Wax Seal & Title */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <WaxSeal size="sm" label="ॐ" />
          <div>
            <h3 className="font-heading text-base font-bold text-kc-maroon dark:text-kc-gold tracking-wide">
              {item.title}
            </h3>
            <p className="font-devanagari text-xs text-kc-text-secondary dark:text-kc-text-muted">
              {item.birthData.fullName} • {item.birthData.city}
            </p>
          </div>
        </div>

        {/* Favorite & Compare Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onToggleFavorite(item.id)}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              item.isFavorite ? 'text-amber-500' : 'text-kc-text-muted hover:text-amber-400'
            }`}
            title={item.isFavorite ? 'Remove Favorite' : 'Mark Favorite'}
          >
            {item.isFavorite ? '★' : '☆'}
          </button>
          <label className="flex items-center gap-1 cursor-pointer text-xs font-sans text-kc-text-muted hover:text-kc-maroon dark:hover:text-kc-gold">
            <input
              type="checkbox"
              checked={isSelectedForCompare}
              onChange={() => onToggleCompare(item.id)}
              className="accent-kc-maroon dark:accent-kc-gold rounded"
            />
            <span className="hidden sm:inline">Compare</span>
          </label>
        </div>
      </div>

      {/* Astronomical & Birth Metadata Badges */}
      <div className="relative z-10 my-4 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {ascendant && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-heading bg-kc-sand/60 dark:bg-kc-dark-wood text-kc-maroon dark:text-kc-gold border border-kc-brass/30">
              Lagna: {ascendant.rashi}
            </span>
          )}
          {ascendant?.nakshatra && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-heading bg-kc-sand/60 dark:bg-kc-dark-wood text-kc-maroon dark:text-kc-gold border border-kc-brass/30">
              Nakshatra: {ascendant.nakshatra}
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-xs font-heading bg-kc-maroon/10 dark:bg-kc-gold/10 text-kc-maroon dark:text-kc-gold border border-kc-maroon/20">
            {item.familyGroup.toUpperCase()}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-serif text-kc-text-secondary dark:text-kc-text-muted pt-2 border-t border-kc-brass/20">
          <div>
            <span className="block text-[10px] uppercase font-sans text-kc-text-muted">Birth Date</span>
            <span className="font-semibold">{item.birthData.dateOfBirth} ({item.birthData.timeOfBirth})</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-sans text-kc-text-muted">Preserved On</span>
            <span>{createdDateStr}</span>
          </div>
        </div>

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {item.tags.map((tag, idx) => (
              <span key={idx} className="text-[10px] font-sans px-1.5 py-0.5 bg-kc-sand/30 dark:bg-kc-dark-wood/50 rounded text-kc-text-muted">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-kc-brass/30">
        <button
          type="button"
          onClick={() => onViewDetails(item)}
          className="text-xs font-heading font-semibold text-kc-maroon dark:text-kc-gold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>👁</span> {t('view_details', 'View Chart')}
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onReopenManuscript(item)}
            className="px-2.5 py-1 rounded text-xs font-heading font-semibold bg-kc-maroon text-kc-ivory hover:bg-kc-maroon/90 dark:bg-kc-gold dark:text-kc-burnt-brown dark:hover:bg-kc-gold/90 transition-colors shadow cursor-pointer flex items-center gap-1"
            title="Open 11-page Royal Manuscript Document"
          >
            <span>📜</span> {t('reopen_manuscript', 'Royal Manuscript')}
          </button>

          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="p-1 text-kc-text-muted hover:text-red-500 transition-colors cursor-pointer"
            title="Delete from Archive"
          >
            🗑
          </button>
        </div>
      </div>
    </motion.div>
  );
};
