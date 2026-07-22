import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';
import { ManuscriptQRCode } from '../ManuscriptQRCode';

interface ManuscriptCertificationPageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptCertificationPage: React.FC<ManuscriptCertificationPageProps> = ({ data }) => {
  const { birthRecord, metadata } = data;

  return (
    <ManuscriptPageWrapper
      pageNumber={11}
      sectionTitleSanskrit="॥ प्रमाण पत्र एवं मुद्रा ॥"
      sectionTitleEnglish="Certification & Digital Seal"
    >
      <div className="flex-1 flex flex-col justify-between py-2 text-center">
        {/* Section Header */}
        <div className="mb-4">
          <span className="font-devanagari text-xl text-kc-maroon font-bold block mb-1">
            ॥ राजकीय प्रमाण पत्र एवं ताम्र पत्र अभिलेख ॥
          </span>
          <h2 className="font-heading text-lg uppercase tracking-wider text-kc-text-secondary">
            OFFICIAL OBSERVATORY DEDICATION & SEAL
          </h2>
          <div className="w-32 h-0.5 bg-kc-gold mx-auto mt-2" />
        </div>

        {/* Certificate Card Container */}
        <div className="w-full max-w-lg mx-auto my-auto p-6 bg-kc-ivory border-2 border-kc-brass rounded-xs shadow-deep relative flex flex-col items-center">
          {/* Inner Hairline */}
          <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/40 rounded-2xs" />

          {/* Kalachakra Emblem */}
          <div className="w-16 h-16 rounded-full border-2 border-kc-gold bg-kc-paper flex items-center justify-center mb-3 shadow-warm">
            <span className="text-3xl text-kc-maroon font-devanagari select-none">
              ☸
            </span>
          </div>

          <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-kc-brass font-bold block mb-1">
            DIGITAL MANUSCRIPT SEAL OF AUTHENTICITY
          </span>

          <p className="font-serif italic text-xs text-kc-text-primary max-w-md my-3 leading-relaxed">
            This document certifies that the birth horoscope for <strong>{birthRecord.fullName}</strong> was computed using the <em>Kalachakra Celestial Computation Engine</em> under true sidereal calculations.
          </p>

          {/* Calculation Metadata Table */}
          <div className="w-full border-t border-b border-kc-brass/30 py-3 my-3 grid grid-cols-2 gap-2 text-[11px] text-left">
            <div>
              <span className="font-heading uppercase text-[9px] text-kc-brass font-bold block">
                AYANAMSHA USED
              </span>
              <span className="font-serif text-kc-text-primary font-semibold">
                {metadata.ayanamsha}
              </span>
            </div>

            <div>
              <span className="font-heading uppercase text-[9px] text-kc-brass font-bold block">
                HOUSE SYSTEM
              </span>
              <span className="font-serif text-kc-text-primary font-semibold">
                {metadata.houseSystem}
              </span>
            </div>

            <div>
              <span className="font-heading uppercase text-[9px] text-kc-brass font-bold block">
                CALCULATION ENGINE
              </span>
              <span className="font-serif text-kc-text-primary font-semibold">
                {metadata.calculationEngine}
              </span>
            </div>

            <div>
              <span className="font-heading uppercase text-[9px] text-kc-brass font-bold block">
                APPLICATION VERSION
              </span>
              <span className="font-serif text-kc-text-primary font-semibold">
                {metadata.appVersion} (Schema {metadata.schemaVersion})
              </span>
            </div>
          </div>

          {/* Bottom QR Code & Verification Block */}
          <div className="w-full flex items-center justify-between pt-2">
            <div className="text-left">
              <span className="font-heading uppercase text-[9px] text-kc-brass font-bold block">
                UNIQUE REPORT IDENTIFIER
              </span>
              <span className="font-mono text-xs font-extrabold text-kc-maroon">
                {birthRecord.reportId}
              </span>
              <span className="block text-[10px] font-serif text-kc-text-muted mt-1">
                Scan QR Code to verify authentic archival record
              </span>
            </div>

            {/* QR Code */}
            <ManuscriptQRCode value={metadata.verificationUrl} size={76} />
          </div>
        </div>

        {/* Ceremonial Blessing Closing */}
        <div className="mt-4">
          <span className="font-devanagari text-base font-bold text-kc-maroon block">
            ॥ शुभं भवतु • लोकाः समस्ताः सुखिनो भवन्तु ॥
          </span>
          <span className="font-serif text-xs text-kc-text-muted italic block mt-0.5">
            May auspiciousness prevail and all beings find harmony across the cosmos.
          </span>
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
