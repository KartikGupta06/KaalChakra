import React from 'react';
import { FamilyGroup } from '../../types/archive';
import { useLocalization } from '../../context/LocalizationContext';

interface FamilyLibraryFilterProps {
  selectedGroup: FamilyGroup | 'all';
  onSelectGroup: (group: FamilyGroup | 'all') => void;
  counts: Record<FamilyGroup | 'all', number>;
}

export const FamilyLibraryFilter: React.FC<FamilyLibraryFilterProps> = ({
  selectedGroup,
  onSelectGroup,
  counts,
}) => {
  const { t } = useLocalization();

  const groups: { id: FamilyGroup | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: t('all_categories', 'All Groups'), icon: '📜' },
    { id: 'self', label: t('group_self', 'Self'), icon: '👤' },
    { id: 'parents', label: t('group_parents', 'Parents'), icon: '👑' },
    { id: 'children', label: t('group_children', 'Children'), icon: '🌱' },
    { id: 'relatives', label: t('group_relatives', 'Relatives'), icon: '🤝' },
    { id: 'clients', label: t('group_clients', 'Clients'), icon: '🪔' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 my-4 p-2 bg-kc-sand/30 dark:bg-kc-dark-wood/40 rounded-xl border border-kc-brass/30">
      <span className="text-xs font-heading font-semibold text-kc-maroon dark:text-kc-gold uppercase tracking-wider px-2">
        Family Library:
      </span>
      {groups.map((g) => {
        const isActive = selectedGroup === g.id;
        const count = counts[g.id] || 0;
        return (
          <button
            key={g.id}
            onClick={() => onSelectGroup(g.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-kc-maroon text-kc-ivory dark:bg-kc-gold dark:text-kc-burnt-brown font-bold shadow-md'
                : 'bg-kc-paper dark:bg-kc-burnt-brown text-kc-text-primary dark:text-kc-text-muted hover:border-kc-brass border border-transparent'
            }`}
          >
            <span>{g.icon}</span>
            <span>{g.label}</span>
            <span
              className={`px-1.5 py-0.2 text-[10px] rounded-full font-sans ${
                isActive
                  ? 'bg-kc-gold/30 dark:bg-kc-burnt-brown/40 text-current'
                  : 'bg-kc-sand dark:bg-kc-dark-wood text-kc-text-secondary dark:text-kc-text-muted'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
