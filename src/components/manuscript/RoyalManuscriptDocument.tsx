import React from 'react';
import { RoyalManuscriptData } from '../../types/manuscript';
import { ManuscriptCoverPage } from './sections/ManuscriptCoverPage';
import { ManuscriptBirthRecordPage } from './sections/ManuscriptBirthRecordPage';
import { ManuscriptKundaliPage } from './sections/ManuscriptKundaliPage';
import { ManuscriptPlanetaryPage } from './sections/ManuscriptPlanetaryPage';
import { ManuscriptHouseSummaryPage } from './sections/ManuscriptHouseSummaryPage';
import { ManuscriptLagnaPage } from './sections/ManuscriptLagnaPage';
import { ManuscriptYogaGalleryPage } from './sections/ManuscriptYogaGalleryPage';
import { ManuscriptNavamsaPage } from './sections/ManuscriptNavamsaPage';
import { ManuscriptPanchangSnapshotPage } from './sections/ManuscriptPanchangSnapshotPage';
import { ManuscriptGlossaryPage } from './sections/ManuscriptGlossaryPage';
import { ManuscriptCertificationPage } from './sections/ManuscriptCertificationPage';

interface RoyalManuscriptDocumentProps {
  data: RoyalManuscriptData;
  activePageIndex?: number; // Optional index (1-11) for page-by-page viewing in previewer
  isSinglePagePreview?: boolean;
}

export const RoyalManuscriptDocument: React.FC<RoyalManuscriptDocumentProps> = ({
  data,
  activePageIndex,
  isSinglePagePreview = false,
}) => {
  const pages = [
    <ManuscriptCoverPage key="page-1" data={data} />,
    <ManuscriptBirthRecordPage key="page-2" data={data} />,
    <ManuscriptKundaliPage key="page-3" data={data} />,
    <ManuscriptPlanetaryPage key="page-4" data={data} />,
    <ManuscriptHouseSummaryPage key="page-5" data={data} />,
    <ManuscriptLagnaPage key="page-6" data={data} />,
    <ManuscriptYogaGalleryPage key="page-7" data={data} />,
    <ManuscriptNavamsaPage key="page-8" data={data} />,
    <ManuscriptPanchangSnapshotPage key="page-9" data={data} />,
    <ManuscriptGlossaryPage key="page-10" data={data} />,
    <ManuscriptCertificationPage key="page-11" data={data} />,
  ];

  if (isSinglePagePreview && activePageIndex !== undefined) {
    const safeIndex = Math.max(0, Math.min(10, activePageIndex - 1));
    return <div id="royal-manuscript-single-page">{pages[safeIndex]}</div>;
  }

  return (
    <div id="royal-manuscript-document" className="flex flex-col items-center gap-8 print:gap-0">
      {pages.map((page, idx) => (
        <div key={`manuscript-page-container-${idx + 1}`} id={`manuscript-page-${idx + 1}`}>
          {page}
        </div>
      ))}
    </div>
  );
};
