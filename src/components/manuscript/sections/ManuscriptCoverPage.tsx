import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';

interface ManuscriptCoverPageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptCoverPage: React.FC<ManuscriptCoverPageProps> = ({ data }) => {
  const { birthRecord } = data;

  return (
    <ManuscriptPageWrapper
      pageNumber={1}
      sectionTitleSanskrit="॥ आवरण पृष्ठ ॥"
      sectionTitleEnglish="Cover Page"
    >
      <div className="flex-1 flex flex-col items-center justify-between py-6 text-center">
        {/* Top Sacred Symbol & Title Header */}
        <div className="flex flex-col items-center max-w-lg mx-auto">
          {/* Emblem */}
          <div className="relative w-20 h-20 mb-4 rounded-full border-2 border-kc-gold flex items-center justify-center bg-kc-ivory shadow-warm">
            <span className="text-4xl text-kc-maroon font-devanagari select-none">
              ☸
            </span>
            <div className="absolute -inset-1 rounded-full border border-kc-brass/40 animate-pulse" />
          </div>

          <span className="font-heading text-xs uppercase tracking-[0.3em] text-kc-brass font-bold block mb-1">
            VERIFIED VEDIC ASTRONOMICAL INSCRIPTION
          </span>

          <h1 className="font-devanagari text-4xl sm:text-5xl font-extrabold text-kc-maroon drop-shadow-xs my-2 leading-tight">
            राजकीय जन्म पत्रिका
          </h1>

          <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-kc-gold to-transparent my-3" />

          <h2 className="font-heading text-lg sm:text-xl tracking-widest uppercase text-kc-text-secondary font-semibold">
            ROYAL NATAL MANUSCRIPT
          </h2>
          <p className="font-serif italic text-xs text-kc-text-muted mt-1">
            Calculated under classical Surya Siddhanta & Lahiri Sidereal Ephemeris Rules
          </p>
        </div>

        {/* Recipient Showcase Scroll Panel */}
        <div className="w-full max-w-md my-6 p-6 bg-kc-ivory border-2 border-kc-brass/80 rounded-xs shadow-warm relative">
          <div className="pointer-events-none absolute inset-1 border border-kc-gold/30 rounded-2xs" />

          <span className="text-[10px] font-heading uppercase tracking-widest text-kc-text-muted block mb-1">
            PREPARED IN REVERENCE FOR
          </span>

          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-kc-maroon tracking-wide mb-1">
            {birthRecord.fullName}
          </h3>

          <div className="flex items-center justify-center gap-2 text-xs font-serif text-kc-text-secondary">
            <span>{birthRecord.dateOfBirth}</span>
            <span>•</span>
            <span>{birthRecord.timeOfBirth}</span>
            <span>•</span>
            <span>{birthRecord.placeOfBirth}</span>
          </div>
        </div>

        {/* Embossed Royal Wax Seal Motif */}
        <div className="my-4 flex flex-col items-center">
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-kc-sindoor via-kc-maroon to-kc-maroon border-4 border-kc-gold shadow-deep flex flex-col items-center justify-center text-kc-paper p-2 transform rotate-[-4deg]">
            <div className="absolute inset-1 rounded-full border border-kc-gold/40 pointer-events-none" />
            <span className="text-xl font-devanagari font-bold leading-none">
              ॥ ॐ ॥
            </span>
            <span className="text-[8px] font-heading uppercase tracking-widest text-kc-gold mt-1">
              ROYAL SEAL
            </span>
            <span className="text-[7px] font-serif tracking-tighter opacity-80">
              KALACHAKRA
            </span>
          </div>
          <span className="text-[10px] font-serif text-kc-text-muted italic mt-2">
            Official Observatory Stamp of Authenticity
          </span>
        </div>

        {/* Cover Footer Metadata Block */}
        <div className="w-full pt-4 border-t border-kc-brass/30 flex flex-col sm:flex-row items-center justify-between text-xs text-kc-text-muted gap-2">
          <div className="text-left">
            <span className="font-heading uppercase text-[10px] text-kc-brass font-bold block">
              REPORT IDENTIFIER
            </span>
            <span className="font-mono text-kc-text-primary font-semibold">
              {birthRecord.reportId}
            </span>
          </div>

          <div className="text-right">
            <span className="font-heading uppercase text-[10px] text-kc-brass font-bold block">
              DATE OF INSCRIPTION
            </span>
            <span className="font-serif text-kc-text-primary">
              {birthRecord.generatedTimestamp}
            </span>
          </div>
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
