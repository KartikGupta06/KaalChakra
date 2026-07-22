import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';

interface ManuscriptBirthRecordPageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptBirthRecordPage: React.FC<ManuscriptBirthRecordPageProps> = ({ data }) => {
  const { birthRecord } = data;

  const recordFields = [
    { title: 'Full Name', value: birthRecord.fullName, sanskrit: 'पूर्ण नाम', highlight: true },
    { title: 'Date of Birth', value: birthRecord.dateOfBirth, sanskrit: 'जन्म तिथि' },
    { title: 'Time of Birth', value: birthRecord.timeOfBirth, sanskrit: 'जन्म समय' },
    { title: 'Place of Birth', value: birthRecord.placeOfBirth, sanskrit: 'जन्म स्थान' },
    { title: 'Geographic Latitude', value: `${birthRecord.latitude.toFixed(4)}° N`, sanskrit: 'अक्षांश' },
    { title: 'Geographic Longitude', value: `${birthRecord.longitude.toFixed(4)}° E`, sanskrit: 'रेखांश' },
    { title: 'Timezone Standard', value: birthRecord.timezone, sanskrit: 'समय क्षेत्र' },
    { title: 'Report Inscribed At', value: birthRecord.generatedTimestamp, sanskrit: 'अंकन काल' },
    { title: 'Ayanamsha System', value: data.metadata.ayanamsha, sanskrit: 'अयनांश' },
    { title: 'House System', value: data.metadata.houseSystem, sanskrit: 'भाव पद्धति' },
  ];

  return (
    <ManuscriptPageWrapper
      pageNumber={2}
      sectionTitleSanskrit="॥ जन्म विवरण ॥"
      sectionTitleEnglish="Birth Record & Coordinates"
    >
      <div className="flex-1 flex flex-col justify-between py-2">
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="font-devanagari text-xl text-kc-maroon font-bold block mb-1">
            ॥ जन्म समय एवं भौगोलिक विवरण ॥
          </span>
          <h2 className="font-heading text-lg uppercase tracking-wider text-kc-text-secondary">
            OFFICIAL NATAL REGISTRATION
          </h2>
          <div className="w-32 h-0.5 bg-kc-gold mx-auto mt-2" />
        </div>

        {/* Manuscript Panels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
          {recordFields.map((field, idx) => (
            <div
              key={`field-${idx}`}
              className={`p-4 bg-kc-ivory border border-kc-brass/60 rounded-xs shadow-xs relative flex flex-col justify-between ${
                field.highlight ? 'sm:col-span-2 border-kc-gold border-2 bg-kc-paper' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-heading uppercase tracking-wider text-kc-brass font-bold">
                  {field.title}
                </span>
                <span className="text-xs font-devanagari text-kc-maroon font-semibold">
                  {field.sanskrit}
                </span>
              </div>
              <span
                className={`font-serif text-kc-text-primary ${
                  field.highlight ? 'text-xl sm:text-2xl font-bold text-kc-maroon' : 'text-base font-medium'
                }`}
              >
                {field.value}
              </span>
            </div>
          ))}
        </div>

        {/* Observatory Verification Note Box */}
        <div className="mt-6 p-4 bg-kc-paper border border-kc-brass/40 rounded-xs text-xs text-kc-text-muted italic flex items-start gap-3">
          <span className="text-2xl text-kc-maroon font-devanagari leading-none">📜</span>
          <div className="flex-1">
            <span className="font-heading not-italic text-[10px] text-kc-brass uppercase tracking-wider font-bold block mb-0.5">
              OBSERVATORY COMPUTATIONAL VERIFICATION
            </span>
            All planetary coordinates and lagna positions rendered in this manuscript have been calculated using high-precision ephemeris algorithms aligned with classical Vedic astronomy principles (*Surya Siddhanta*).
          </div>
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
