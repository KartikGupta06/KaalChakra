import React from 'react';

interface ManuscriptPageWrapperProps {
  pageNumber: number;
  totalPages?: number;
  sectionTitleSanskrit: string;
  sectionTitleEnglish: string;
  children: React.ReactNode;
  className?: string;
}

export const ManuscriptPageWrapper: React.FC<ManuscriptPageWrapperProps> = ({
  pageNumber,
  totalPages = 11,
  sectionTitleSanskrit,
  sectionTitleEnglish,
  children,
  className = '',
}) => {
  return (
    <div
      className={`kc-manuscript-page relative w-[210mm] min-h-[297mm] p-[16mm] sm:p-[20mm] bg-kc-paper text-kc-text-primary border-2 border-kc-brass shadow-deep font-serif flex flex-col justify-between select-none box-border print:shadow-none print:m-0 print:w-full print:min-h-screen ${className}`}
      style={{ pageBreakAfter: 'always' }}
    >
      {/* Background Watermark Mandala */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03] overflow-hidden">
        <span className="text-[320px] font-devanagari select-none text-kc-maroon">
          ☸
        </span>
      </div>

      {/* Outer & Inner Filigree Border Framing */}
      <div className="pointer-events-none absolute inset-2 sm:inset-3 border border-kc-brass/40 rounded-2xs" />
      <div className="pointer-events-none absolute inset-3 sm:inset-4 border border-kc-gold/30 rounded-3xs" />

      {/* Filigree Corner Caps */}
      <span className="pointer-events-none absolute top-2 left-2 h-5 w-5 border-t-2 border-l-2 border-kc-gold" />
      <span className="pointer-events-none absolute top-2 right-2 h-5 w-5 border-t-2 border-r-2 border-kc-gold" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-5 w-5 border-b-2 border-l-2 border-kc-gold" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-b-2 border-r-2 border-kc-gold" />

      {/* Page Header Bar */}
      <div className="relative z-10 pb-3 border-b border-kc-brass/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-kc-maroon font-semibold text-lg font-devanagari">
            कालचक्र
          </span>
          <span className="text-xs text-kc-text-muted font-heading uppercase tracking-wider">
            • KALACHAKRA ROYAL MANUSCRIPT
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-devanagari text-kc-maroon font-semibold block">
            {sectionTitleSanskrit}
          </span>
          <span className="text-[10px] font-heading uppercase tracking-widest text-kc-brass">
            {sectionTitleEnglish}
          </span>
        </div>
      </div>

      {/* Main Page Body */}
      <div className="relative z-10 flex-1 my-4 flex flex-col">
        {children}
      </div>

      {/* Page Footer Bar */}
      <div className="relative z-10 pt-3 border-t border-kc-brass/30 flex items-center justify-between text-xs text-kc-text-muted">
        <span className="font-devanagari text-kc-maroon/80 font-medium">
          ॥ राजकीय जन्म पत्रिका • सूर्य सिद्धान्त गणना ॥
        </span>
        <span className="font-heading tracking-widest text-[11px] text-kc-brass font-bold">
          PAGE {pageNumber} OF {totalPages} • पृष्ठ {pageNumber} / {totalPages}
        </span>
      </div>
    </div>
  );
};
