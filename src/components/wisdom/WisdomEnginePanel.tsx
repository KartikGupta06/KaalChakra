import React, { useState, useEffect } from 'react';
import { WisdomResponse } from '../../types/wisdom';
import { fetchWisdomInterpretation, buildFallbackWisdom } from '../../services/wisdomService';
import { TempleBorder } from '../decorations/TempleBorder';
import { useSound } from '../../context/AudioContext';

interface WisdomEnginePanelProps {
  birthData?: any;
  className?: string;
}

export const WisdomEnginePanel: React.FC<WisdomEnginePanelProps> = ({
  birthData,
  className = '',
}) => {
  const { playSound } = useSound();
  const [wisdom, setWisdom] = useState<WisdomResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // UI state
  const [activeTab, setActiveTab] = useState<'overview' | 'lagna' | 'planets' | 'houses' | 'yogas' | 'panchang'>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    overview: true,
    lagna: true,
  });
  const [bookmarkedItems, setBookmarkedItems] = useState<Record<string, boolean>>({});
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState<boolean>(false);

  // Fetch or fallback
  useEffect(() => {
    let isMounted = true;
    async function loadWisdom() {
      setLoading(true);
      const res = await fetchWisdomInterpretation(birthData);
      if (isMounted) {
        if (res) {
          setWisdom(res);
        } else {
          setWisdom(buildFallbackWisdom(birthData));
        }
        setLoading(false);
      }
    }
    loadWisdom();
    return () => {
      isMounted = false;
    };
  }, [birthData]);

  if (loading || !wisdom) {
    return (
      <TempleBorder variant="gilded" className="w-full text-center py-8 my-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-kc-gold border-t-transparent rounded-full animate-spin" />
          <span className="font-devanagari text-sm font-bold text-kc-maroon">
            ॥ ज्ञान व्याख्या यन्त्र - पाण्डुलिपि पठन ॥
          </span>
          <span className="font-serif italic text-xs text-kc-text-muted">
            Consulting classical Parasari hora shastras for birth moment alignment...
          </span>
        </div>
      </TempleBorder>
    );
  }

  // Toggle card expansion
  const toggleExpand = (id: string) => {
    playSound('ink-stroke');
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle bookmark
  const toggleBookmark = (id: string) => {
    playSound('ink-stroke');
    setBookmarkedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter helper
  const filterMatch = (text: string) => {
    if (!searchQuery) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className={`w-full font-serif my-6 ${className}`}>
      {/* Outer Manuscript Border Wrapper */}
      <div className="relative p-4 sm:p-6 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-deep rounded-xs">
        {/* Inner Hairline */}
        <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/40 rounded-2xs" />

        {/* Filigree Corner Caps */}
        <span className="pointer-events-none absolute top-1 left-1 h-4 w-4 border-t-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute top-1 right-1 h-4 w-4 border-t-2 border-r-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1 left-1 h-4 w-4 border-b-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1 right-1 h-4 w-4 border-b-2 border-r-2 border-kc-gold" />

        {/* Header Bar */}
        <div className="text-center pb-4 border-b border-kc-brass/30 mb-4">
          <span className="font-heading text-[10px] uppercase tracking-widest text-kc-brass dark:text-kc-gold block">
            THE WISDOM ENGINE • ज्ञान व्याख्या यन्त्र
          </span>
          <h2 className="font-devanagari text-2xl font-extrabold text-kc-maroon dark:text-kc-gold my-1">
            ॥ वैदिक कुण्डली ज्ञान व्याख्या ॥
          </h2>
          <p className="font-serif italic text-xs text-kc-text-muted max-w-xl mx-auto">
            Educational manuscript interpretations based on traditional Parasari Vedic astrology concepts.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 p-2.5 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/50 rounded-xs">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="🔍 Search planets, houses, yogas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-8 py-1.5 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-brass/60 rounded-3xs text-xs text-kc-text-primary placeholder:text-kc-text-muted focus:outline-none focus:border-kc-gold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1.5 text-xs text-kc-text-muted hover:text-kc-maroon font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Bookmarks Toggle */}
          <button
            onClick={() => {
              playSound('ink-stroke');
              setShowOnlyBookmarks((prev) => !prev);
            }}
            className={`px-3 py-1.5 rounded-3xs text-xs font-heading uppercase tracking-wider font-bold transition-colors border ${
              showOnlyBookmarks
                ? 'bg-kc-gold text-kc-maroon border-kc-gold shadow-warm'
                : 'bg-kc-paper dark:bg-kc-temple-brown border-kc-brass/40 text-kc-text-secondary hover:text-kc-maroon'
            }`}
          >
            ★ Saved Notes ({Object.values(bookmarkedItems).filter(Boolean).length})
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-kc-brass/30 mb-4 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview (अवलोकन)' },
            { id: 'lagna', label: 'Lagna (लग्न)' },
            { id: 'planets', label: 'Navagrahas (नवग्रह)' },
            { id: 'houses', label: '12 Bhavas (द्वादश भाव)' },
            { id: 'yogas', label: 'Yogas (योग)' },
            { id: 'panchang', label: 'Panchang (पञ्चाङ्ग)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSound('paper-flip');
                setActiveTab(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-3xs text-xs font-serif whitespace-nowrap transition-all border ${
                activeTab === tab.id
                  ? 'bg-kc-maroon text-kc-paper border-kc-gold shadow-warm font-semibold'
                  : 'bg-kc-ivory dark:bg-kc-dark-wood text-kc-text-secondary border-kc-brass/30 hover:border-kc-brass'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="space-y-4">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && filterMatch(wisdom.overview.summary) && (
            <div className="p-4 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/60 rounded-xs shadow-2xs">
              <div className="flex items-center justify-between border-b border-kc-brass/30 pb-2 mb-3">
                <h3 className="font-devanagari text-base font-bold text-kc-maroon dark:text-kc-gold">
                  {wisdom.overview.titleSanskrit} • {wisdom.overview.titleEnglish}
                </h3>
                <button
                  onClick={() => toggleBookmark('overview')}
                  className="text-sm hover:scale-110 transition-transform"
                  title="Bookmark"
                >
                  {bookmarkedItems['overview'] ? '★' : '☆'}
                </button>
              </div>

              <p className="font-serif text-sm text-kc-text-primary leading-relaxed mb-4">
                {wisdom.overview.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                <div className="p-2.5 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-brass/40 rounded-3xs">
                  <span className="font-heading uppercase text-[10px] text-kc-brass font-bold block">
                    DOMINANT ELEMENT (तत्व)
                  </span>
                  <span className="font-serif font-bold text-kc-maroon dark:text-kc-gold">
                    {wisdom.overview.dominantElement}
                  </span>
                </div>
                <div className="p-2.5 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-brass/40 rounded-3xs">
                  <span className="font-heading uppercase text-[10px] text-kc-brass font-bold block">
                    QUALITATIVE MODE (गुण)
                  </span>
                  <span className="font-serif font-bold text-kc-maroon dark:text-kc-gold">
                    {wisdom.overview.dominantQuality}
                  </span>
                </div>
              </div>

              <div className="border-t border-kc-brass/30 pt-3">
                <span className="font-heading uppercase text-[10px] text-kc-brass font-bold block mb-1">
                  KEY CHART THEMES
                </span>
                <ul className="list-disc list-inside text-xs text-kc-text-primary space-y-1">
                  {wisdom.overview.keyThemes.map((t, idx) => (
                    <li key={`theme-${idx}`}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* LAGNA TAB */}
          {activeTab === 'lagna' && filterMatch(wisdom.ascendant.description) && (
            <div className="p-4 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/60 rounded-xs shadow-2xs">
              <div className="flex items-center justify-between border-b border-kc-brass/30 pb-2 mb-3">
                <h3 className="font-devanagari text-base font-bold text-kc-maroon dark:text-kc-gold">
                  {wisdom.ascendant.titleSanskrit} • {wisdom.ascendant.titleEnglish}
                </h3>
                <button
                  onClick={() => toggleBookmark('lagna')}
                  className="text-sm hover:scale-110 transition-transform"
                >
                  {bookmarkedItems['lagna'] ? '★' : '☆'}
                </button>
              </div>

              <div className="mb-3">
                <span className="font-devanagari text-xl font-bold text-kc-maroon dark:text-kc-gold block">
                  {wisdom.ascendant.signSanskrit} • {wisdom.ascendant.signName}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {wisdom.ascendant.traits.map((t, idx) => (
                  <span
                    key={`trait-${idx}`}
                    className="px-2 py-0.5 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-gold/50 rounded-3xs text-xs text-kc-maroon dark:text-kc-gold font-semibold"
                  >
                    ✦ {t}
                  </span>
                ))}
              </div>

              <p className="font-serif text-sm text-kc-text-primary leading-relaxed mb-3">
                {wisdom.ascendant.description}
              </p>

              <div className="p-3 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-brass/40 rounded-xs text-xs text-kc-text-secondary italic">
                {wisdom.ascendant.lagnaLordMeaning}
              </div>
            </div>
          )}

          {/* PLANETS TAB */}
          {activeTab === 'planets' && (
            <div className="space-y-3">
              {wisdom.planets
                .filter((p) => filterMatch(`${p.name} ${p.sanskrit} ${p.sign} ${p.overallSummary}`))
                .map((p) => {
                  const cardId = `planet-${p.id}`;
                  const isExpanded = expandedCards[cardId];
                  return (
                    <div
                      key={cardId}
                      className="bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/50 rounded-xs overflow-hidden"
                    >
                      <div
                        onClick={() => toggleExpand(cardId)}
                        className="p-3 flex items-center justify-between cursor-pointer hover:bg-kc-paper/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{p.symbol}</span>
                          <span className="font-devanagari font-bold text-kc-maroon dark:text-kc-gold text-sm">
                            {p.sanskrit} ({p.name})
                          </span>
                          <span className="text-xs text-kc-text-muted">
                            • {p.sign} (House {p.house})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-kc-paper text-[10px] font-semibold text-kc-maroon border border-kc-brass/40 rounded-3xs">
                            {p.dignity}
                          </span>
                          <span className="text-xs text-kc-brass">
                            {isExpanded ? '▲' : '▼'}
                          </span>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-3.5 border-t border-kc-brass/30 bg-kc-paper/40 text-xs space-y-2">
                          <p><strong>Sign Placement:</strong> {p.signMeaning}</p>
                          <p><strong>House Placement:</strong> {p.houseMeaning}</p>
                          <p><strong>Nakshatra Context:</strong> {p.nakshatraMeaning}</p>
                          <p><strong>Dignity Explanation:</strong> {p.dignityMeaning}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}

          {/* HOUSES TAB */}
          {activeTab === 'houses' && (
            <div className="space-y-3">
              {wisdom.houses
                .filter((h) => filterMatch(`${h.name} ${h.rashi} ${h.interpretation}`))
                .map((h) => {
                  const cardId = `house-${h.houseNumber}`;
                  const isExpanded = expandedCards[cardId];
                  return (
                    <div
                      key={cardId}
                      className="bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/50 rounded-xs overflow-hidden"
                    >
                      <div
                        onClick={() => toggleExpand(cardId)}
                        className="p-3 flex items-center justify-between cursor-pointer hover:bg-kc-paper/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-xs text-kc-maroon dark:text-kc-gold">
                            BHAVA {h.houseNumber}:
                          </span>
                          <span className="font-devanagari font-bold text-kc-text-primary text-xs">
                            {h.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-kc-text-muted">
                            Lord: {h.lord}
                          </span>
                          <span className="text-xs text-kc-brass">
                            {isExpanded ? '▲' : '▼'}
                          </span>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-3.5 border-t border-kc-brass/30 bg-kc-paper/40 text-xs space-y-2">
                          <p><strong>Rashi:</strong> {h.rashi}</p>
                          <p><strong>Occupants:</strong> {h.occupants.length > 0 ? h.occupants.join(', ') : 'Unoccupied'}</p>
                          <p><strong>Significance:</strong> {h.significance}</p>
                          <p className="font-serif italic text-kc-maroon dark:text-kc-gold pt-1 border-t border-kc-brass/20">
                            {h.interpretation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}

          {/* YOGAS TAB */}
          {activeTab === 'yogas' && (
            <div className="space-y-3">
              {wisdom.yogas
                .filter((y) => filterMatch(`${y.name} ${y.sanskritName} ${y.interpretation}`))
                .map((y) => (
                  <div
                    key={`yoga-wise-${y.id}`}
                    className="p-4 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/60 rounded-xs shadow-2xs"
                  >
                    <div className="flex items-center justify-between border-b border-kc-brass/30 pb-2 mb-2">
                      <h4 className="font-devanagari text-base font-bold text-kc-maroon dark:text-kc-gold">
                        {y.sanskritName} ({y.name})
                      </h4>
                      <span className="px-2 py-0.5 bg-kc-paper text-[10px] font-bold text-kc-maroon border border-kc-gold rounded-3xs">
                        {y.strength} Strength
                      </span>
                    </div>

                    <p className="font-serif text-xs text-kc-text-primary leading-relaxed mb-2">
                      {y.interpretation}
                    </p>

                    <div className="text-[11px] text-kc-text-muted italic">
                      <strong>Detection Rationale:</strong> {y.whyDetected}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* PANCHANG TAB */}
          {activeTab === 'panchang' && (
            <div className="p-4 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/60 rounded-xs shadow-2xs space-y-3 text-xs">
              <h3 className="font-devanagari text-base font-bold text-kc-maroon dark:text-kc-gold border-b border-kc-brass/30 pb-2">
                ॥ पञ्चाङ्ग तत्त्व व्याख्या ॥ • Five Pillars Commentary
              </h3>

              <p><strong>Tithi (Lunar Day):</strong> {wisdom.panchang.tithiMeaning}</p>
              <p><strong>Nakshatra (Mansion):</strong> {wisdom.panchang.nakshatraMeaning}</p>
              <p><strong>Yoga (Nitya Harmony):</strong> {wisdom.panchang.yogaMeaning}</p>
              <p><strong>Karana (Action Governor):</strong> {wisdom.panchang.karanaMeaning}</p>
              <p><strong>Vaara (Weekday):</strong> {wisdom.panchang.vaaraMeaning}</p>

              <div className="p-3 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-brass/40 rounded-xs text-kc-text-secondary italic">
                {wisdom.panchang.overallAtmosphere}
              </div>
            </div>
          )}
        </div>

        {/* Transparency & Disclaimer Banner */}
        <div className="mt-6 pt-4 border-t border-kc-brass/40 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-kc-text-muted gap-3">
          <div>
            <span className="font-heading uppercase text-[10px] text-kc-brass font-bold block">
              TRANSPARENCY & CALCULATION CONTEXT
            </span>
            <span>Ayanamsha: {wisdom.metadata.ayanamsha} • House System: {wisdom.metadata.houseSystem}</span>
          </div>

          <div className="text-left sm:text-right max-w-md">
            <span className="font-serif italic block">
              {wisdom.metadata.disclaimer}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
