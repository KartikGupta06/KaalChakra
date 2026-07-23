import React, { useState } from 'react';
import { ChartComparisonResult } from '../../types/archive';
import { WaxSeal } from '../decorations/WaxSeal';
import { NorthIndianKundali } from '../revelation/NorthIndianKundali';

interface ChartComparisonChamberProps {
  comparisonData: ChartComparisonResult;
  onClose: () => void;
}

export const ChartComparisonChamber: React.FC<ChartComparisonChamberProps> = ({
  comparisonData,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'kundali' | 'planets' | 'lagna' | 'yogas' | 'panchang'>('kundali');

  const { items, planetMatrix, lagnas, yogas, panchang } = comparisonData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-gold-royal rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-kc-brass/40 bg-kc-sand/30 dark:bg-kc-dark-wood/50">
          <div className="flex items-center gap-3">
            <WaxSeal size="sm" label="⚖" />
            <div>
              <h2 className="font-heading text-lg font-bold text-kc-maroon dark:text-kc-gold">
                Comparative Chart Chamber (कुण्डली तुलना)
              </h2>
              <p className="font-serif text-xs text-kc-text-muted">
                Side-by-side analysis of {items.length} preserved manuscripts
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-kc-maroon dark:text-kc-gold hover:bg-kc-sand/50 dark:hover:bg-kc-dark-wood transition-colors cursor-pointer text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Chamber Navigation Tabs */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-kc-brass/30 bg-kc-paper dark:bg-kc-burnt-brown overflow-x-auto">
          {[
            { id: 'kundali', label: 'Side-by-Side Kundali', icon: '☸' },
            { id: 'planets', label: 'Planet Matrix', icon: '🪐' },
            { id: 'lagna', label: 'Lagna Comparison', icon: '👑' },
            { id: 'yogas', label: 'Yogas Comparison', icon: '🪔' },
            { id: 'panchang', label: 'Panchang Alignment', icon: '☀' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-kc-maroon text-kc-ivory dark:bg-kc-gold dark:text-kc-burnt-brown shadow'
                  : 'bg-kc-sand/40 dark:bg-kc-dark-wood/40 text-kc-text-secondary hover:bg-kc-sand'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body / Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. Side-by-Side Kundalis */}
          {activeTab === 'kundali' && (
            <div className={`grid grid-cols-1 ${items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
              {items.map((item) => (
                <div key={item.id} className="p-4 bg-kc-ivory dark:bg-kc-dark-wood rounded-xl border border-kc-brass/40 shadow-inner flex flex-col items-center">
                  <div className="text-center mb-3">
                    <h4 className="font-heading text-sm font-bold text-kc-maroon dark:text-kc-gold">{item.title}</h4>
                    <p className="font-sans text-xs text-kc-text-muted">{item.birthData.fullName} • {item.birthData.city}</p>
                    <p className="font-serif text-[11px] text-kc-gold-royal mt-0.5">{item.birthData.dateOfBirth} ({item.birthData.timeOfBirth})</p>
                  </div>

                  {item.kundaliData && item.kundaliData.planets ? (
                    <div className="w-full max-w-[280px]">
                      <NorthIndianKundali
                        planets={item.kundaliData.planets.map((p: any, idx: number) => ({
                          id: p.name ? p.name.toLowerCase() : `p_${idx}`,
                          symbol: p.symbol || '☉',
                          sanskrit: p.sanskrit || p.name,
                          name: p.name || 'Planet',
                          house: p.house || 1,
                          sign: p.rashi || 'Mesh (Aries)',
                        }))}
                      />
                    </div>
                  ) : (
                    <div className="p-8 text-center text-xs text-kc-text-muted italic">
                      Kundali chart calculation pending for this archive item.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 2. Planet Matrix Table */}
          {activeTab === 'planets' && (
            <div className="overflow-x-auto rounded-xl border border-kc-brass/40 shadow">
              <table className="w-full text-left text-xs font-serif border-collapse">
                <thead>
                  <tr className="bg-kc-sand/60 dark:bg-kc-dark-wood text-kc-maroon dark:text-kc-gold font-heading border-b border-kc-brass/40">
                    <th className="p-3">Graha (Planet)</th>
                    {items.map((i) => (
                      <th key={i.id} className="p-3 border-l border-kc-brass/30">{i.title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-kc-brass/20">
                  {planetMatrix.map((row) => (
                    <tr key={row.planet} className="hover:bg-kc-sand/20 dark:hover:bg-kc-dark-wood/30">
                      <td className="p-3 font-heading font-bold text-kc-maroon dark:text-kc-gold">{row.planet}</td>
                      {items.map((i) => {
                        const p = row.placements[i.id];
                        return (
                          <td key={i.id} className="p-3 border-l border-kc-brass/20">
                            {p && p.rashi ? (
                              <div>
                                <span className="font-semibold text-kc-text-primary dark:text-kc-ivory">{p.rashi}</span>
                                <span className="text-kc-text-muted block text-[11px]">{p.degree} • House {p.house}</span>
                                {p.dignity && (
                                  <span className="text-[10px] font-sans px-1.5 py-0.2 rounded bg-kc-gold/20 text-kc-maroon dark:text-kc-gold inline-block mt-0.5">
                                    {p.dignity}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-kc-text-muted italic">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 3. Lagna Comparison */}
          {activeTab === 'lagna' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lagnas.map((l) => (
                <div key={l.itemId} className="p-5 bg-kc-ivory dark:bg-kc-dark-wood rounded-xl border border-kc-brass/40 shadow space-y-3">
                  <h4 className="font-heading text-base font-bold text-kc-maroon dark:text-kc-gold pb-2 border-b border-kc-brass/20">
                    {l.title}
                  </h4>
                  <div className="space-y-1.5 text-xs font-serif text-kc-text-secondary dark:text-kc-text-muted">
                    <p><strong className="font-heading text-kc-text-primary dark:text-kc-ivory">Ascendant Rashi:</strong> {l.rashi}</p>
                    <p><strong className="font-heading text-kc-text-primary dark:text-kc-ivory">Lagna Lord:</strong> {l.lord}</p>
                    <p><strong className="font-heading text-kc-text-primary dark:text-kc-ivory">Nakshatra:</strong> {l.nakshatra}</p>
                    <p><strong className="font-heading text-kc-text-primary dark:text-kc-ivory">Ascendant Degree:</strong> {l.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. Yogas Comparison */}
          {activeTab === 'yogas' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {yogas.map((y) => (
                <div key={y.itemId} className="p-5 bg-kc-ivory dark:bg-kc-dark-wood rounded-xl border border-kc-brass/40 shadow space-y-3">
                  <h4 className="font-heading text-base font-bold text-kc-maroon dark:text-kc-gold pb-2 border-b border-kc-brass/20">
                    {y.title} ({y.yogaNames.length} Yogas)
                  </h4>
                  <ul className="space-y-1.5">
                    {y.yogaNames.length > 0 ? (
                      y.yogaNames.map((name, idx) => (
                        <li key={idx} className="text-xs font-serif text-kc-text-primary dark:text-kc-ivory flex items-center gap-2">
                          <span className="text-kc-gold-royal">✦</span>
                          <span>{name}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-kc-text-muted italic">No specific Yogas detected in basic computation.</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* 5. Panchang Comparison */}
          {activeTab === 'panchang' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {panchang.map((p) => (
                <div key={p.itemId} className="p-5 bg-kc-ivory dark:bg-kc-dark-wood rounded-xl border border-kc-brass/40 shadow space-y-2 text-xs font-serif">
                  <h4 className="font-heading text-base font-bold text-kc-maroon dark:text-kc-gold pb-2 border-b border-kc-brass/20">
                    {p.title}
                  </h4>
                  <p><strong className="font-heading">Date of Birth:</strong> {p.date}</p>
                  <p><strong className="font-heading">Time of Birth:</strong> {p.time}</p>
                  <p><strong className="font-heading">Observational Location:</strong> {p.city}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-kc-brass/40 bg-kc-sand/30 dark:bg-kc-dark-wood/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-heading font-bold bg-kc-maroon text-kc-ivory dark:bg-kc-gold dark:text-kc-burnt-brown hover:bg-kc-maroon/90 transition-colors shadow cursor-pointer"
          >
            Close Comparison Chamber
          </button>
        </div>
      </div>
    </div>
  );
};
