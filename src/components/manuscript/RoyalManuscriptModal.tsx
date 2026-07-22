import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RoyalManuscriptData } from '../../types/manuscript';
import { buildRoyalManuscriptData } from '../../services/manuscriptService';
import { RoyalManuscriptDocument } from './RoyalManuscriptDocument';
import { TempleButton } from '../ui/TempleButton';
import { useSound } from '../../context/AudioContext';

interface RoyalManuscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawBirthData?: any;
}

const PAGE_TITLES = [
  '1. Cover Page (आवरण पृष्ठ)',
  '2. Birth Record (जन्म विवरण)',
  '3. Janma Kundali (जन्म चक्र)',
  '4. Planetary Summary (ग्रह स्थिति)',
  '5. House Summary (द्वादश भाव)',
  '6. Lagna Details (लग्न विवरण)',
  '7. Yoga Gallery (योग प्रदर्शन)',
  '8. Navamsa D9 (नवांश चक्र)',
  '9. Panchang Snapshot (पञ्चाङ्ग)',
  '10. Glossary (शब्दावली)',
  '11. Certification (प्रमाण पत्र)',
];

export const RoyalManuscriptModal: React.FC<RoyalManuscriptModalProps> = ({
  isOpen,
  onClose,
  rawBirthData,
}) => {
  const { playSound } = useSound();
  const documentRef = useRef<HTMLDivElement>(null);

  const [manuscriptData, setManuscriptData] = useState<RoyalManuscriptData | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [generationStep, setGenerationStep] = useState<number>(0);

  // Preview state
  const [activePage, setActivePage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(85); // %
  const [viewMode, setViewMode] = useState<'single' | 'full'>('single');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string>('');

  const ceremonialSteps = [
    'Unrolling Sacred Palm Leaves...',
    'Calculating Sidereal Longitudes & Lahiri Ayanamsha...',
    'Mapping 12 Celestial Bhavas & Graha Occupants...',
    'Evaluating Parasari Yogas & Navamsa Alignments...',
    'Affixing Royal Seals & Verification Certificates...',
  ];

  // Initialize manuscript data & run ceremonial generation sequence
  useEffect(() => {
    if (isOpen) {
      const data = buildRoyalManuscriptData(rawBirthData);
      setManuscriptData(data);
      setIsGenerating(true);
      setGenerationStep(0);
      setActivePage(1);

      playSound('paper-flip');

      // Step animation
      const interval = setInterval(() => {
        setGenerationStep((prev) => {
          if (prev < ceremonialSteps.length - 1) {
            return prev + 1;
          }
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            playSound('temple-bell');
          }, 600);
          return prev;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isOpen, rawBirthData]);

  if (!isOpen || !manuscriptData) return null;

  // Handlers
  const handleZoomIn = () => setZoomLevel((z) => Math.min(150, z + 15));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(50, z - 15));

  const handleNextPage = () => {
    playSound('ink-stroke');
    setActivePage((p) => Math.min(11, p + 1));
  };

  const handlePrevPage = () => {
    playSound('ink-stroke');
    setActivePage((p) => Math.max(1, p - 1));
  };

  // Direct Print trigger
  const handlePrint = () => {
    playSound('paper-flip');
    window.print();
  };

  // PDF Export trigger
  const handleDownloadPDF = async () => {
    if (!documentRef.current) return;
    try {
      setIsExporting(true);
      setExportMessage('Generating high-resolution vector PDF pages...');
      playSound('ink-stroke');

      // Temporary switch to full mode for clean PDF capture if in single page mode
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageElements = documentRef.current.querySelectorAll('.kc-manuscript-page');

      for (let i = 0; i < pageElements.length; i++) {
        setExportMessage(`Rendering Page ${i + 1} of ${pageElements.length}...`);
        const el = pageElements[i] as HTMLElement;

        const canvas = await html2canvas(el, {
          scale: 2, // 2x high resolution output
          useCORS: true,
          backgroundColor: '#F4E7C8',
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      }

      pdf.save(`${manuscriptData.birthRecord.fullName.replace(/\s+/g, '_')}_Royal_Kundali.pdf`);
      playSound('temple-bell');
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Failed to generate PDF. You can also use "Print Manuscript" and Save as PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  // PNG Export trigger
  const handleDownloadPNG = async () => {
    const pageEl = document.querySelector(`#manuscript-page-${activePage}`) as HTMLElement;
    if (!pageEl) return;
    try {
      setIsExporting(true);
      setExportMessage(`Capturing Page ${activePage} as High-Res PNG...`);
      playSound('ink-stroke');

      const canvas = await html2canvas(pageEl, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#F4E7C8',
      });

      const link = document.createElement('a');
      link.download = `${manuscriptData.birthRecord.fullName.replace(/\s+/g, '_')}_Page_${activePage}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      playSound('temple-bell');
    } catch (err) {
      console.error('PNG export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Share link trigger
  const handleShare = async () => {
    const shareUrl = manuscriptData.metadata.verificationUrl;
    playSound('ink-stroke');
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Royal Kundali for ${manuscriptData.birthRecord.fullName}`,
          text: `View the official Royal Natal Manuscript for ${manuscriptData.birthRecord.fullName} on Kalachakra`,
          url: shareUrl,
        });
      } catch (e) {
        // Share cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert(`Report Verification Link copied to clipboard:\n${shareUrl}`);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex flex-col bg-kc-charcoal/90 backdrop-blur-md">
        {/* Modal Top Header Control Bar */}
        <div className="relative z-20 flex flex-wrap items-center justify-between px-4 py-3 bg-kc-burnt-brown border-b-2 border-kc-brass text-kc-paper shadow-deep">
          {/* Left Title */}
          <div className="flex items-center gap-3">
            <span className="text-2xl text-kc-gold font-devanagari select-none">
              📜
            </span>
            <div>
              <h2 className="font-devanagari text-base font-bold text-kc-gold leading-tight">
                राजकीय जन्म पत्रिका • Royal Manuscript Generator
              </h2>
              <span className="font-serif text-xs text-kc-text-muted">
                Archival Document for {manuscriptData.birthRecord.fullName} ({manuscriptData.birthRecord.reportId})
              </span>
            </div>
          </div>

          {/* Center Action Controls */}
          {!isGenerating && (
            <div className="flex items-center gap-2 flex-wrap">
              <TempleButton variant="primary" size="sm" onClick={handleDownloadPDF} disabled={isExporting}>
                📥 Download PDF
              </TempleButton>
              <TempleButton variant="secondary" size="sm" onClick={handleDownloadPNG} disabled={isExporting}>
                🖼 Export Page PNG
              </TempleButton>
              <TempleButton variant="secondary" size="sm" onClick={handlePrint}>
                🖨 Print A4
              </TempleButton>
              <TempleButton variant="ghost" size="sm" onClick={handleShare}>
                🔗 Share
              </TempleButton>
            </div>
          )}

          {/* Right Close Seal Button */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-kc-sindoor hover:bg-kc-maroon border border-kc-gold text-kc-paper font-bold flex items-center justify-center transition-transform hover:scale-105 shadow-warm"
            title="Close Manuscript"
          >
            ✕
          </button>
        </div>

        {/* Modal Main Body */}
        {isGenerating ? (
          /* Ceremonial Generation Loading Screen */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-kc-paper">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="text-6xl text-kc-gold mb-6 select-none"
            >
              ☸
            </motion.div>

            <h3 className="font-devanagari text-2xl font-bold text-kc-gold mb-2">
              ॥ राजकीय पत्रिका निर्माण प्रक्रिया ॥
            </h3>
            <h4 className="font-heading text-sm uppercase tracking-widest text-kc-brass font-bold mb-4">
              INSCRIBING ROYAL NATAL MANUSCRIPT
            </h4>

            <div className="w-80 h-2 bg-kc-burnt-brown border border-kc-brass rounded-full overflow-hidden mb-4 p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-kc-brass via-kc-gold to-kc-saffron rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((generationStep + 1) / ceremonialSteps.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <p className="font-serif italic text-sm text-kc-text-muted animate-pulse">
              {ceremonialSteps[generationStep]}
            </p>
          </div>
        ) : (
          /* Interactive Previewer Layout */
          <div className="flex-1 flex overflow-hidden">
            {/* Left Page Thumbnails Sidebar */}
            <div className="w-64 bg-kc-dark-wood border-r border-kc-brass/40 overflow-y-auto p-3 hidden md:flex flex-col gap-2 shrink-0">
              <span className="text-[10px] font-heading uppercase tracking-widest text-kc-brass font-bold px-2 py-1">
                MANUSCRIPT PAGES ({PAGE_TITLES.length})
              </span>
              {PAGE_TITLES.map((title, idx) => {
                const pageNum = idx + 1;
                const isActive = activePage === pageNum && viewMode === 'single';
                return (
                  <button
                    key={`thumb-${pageNum}`}
                    onClick={() => {
                      setViewMode('single');
                      setActivePage(pageNum);
                      playSound('ink-stroke');
                    }}
                    className={`p-2.5 rounded-xs text-left text-xs font-serif transition-all flex items-center justify-between border ${
                      isActive
                        ? 'bg-kc-burnt-brown border-kc-gold text-kc-gold shadow-warm font-bold'
                        : 'bg-kc-temple-brown/50 border-kc-brass/30 text-kc-text-muted hover:bg-kc-temple-brown hover:text-kc-paper'
                    }`}
                  >
                    <span className="truncate">{title}</span>
                    <span className="text-[10px] font-mono opacity-60">P{pageNum}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Document Viewer Canvas */}
            <div className="flex-1 flex flex-col overflow-hidden bg-kc-charcoal">
              {/* Viewer Secondary Toolbar */}
              <div className="flex items-center justify-between px-4 py-2 bg-kc-burnt-brown/80 border-b border-kc-brass/30 text-xs text-kc-paper">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewMode('single')}
                    className={`px-3 py-1 rounded-3xs font-heading text-[10px] uppercase font-bold transition-colors ${
                      viewMode === 'single'
                        ? 'bg-kc-gold text-kc-maroon'
                        : 'bg-kc-temple-brown text-kc-text-muted hover:text-kc-paper'
                    }`}
                  >
                    Page-by-Page
                  </button>
                  <button
                    onClick={() => setViewMode('full')}
                    className={`px-3 py-1 rounded-3xs font-heading text-[10px] uppercase font-bold transition-colors ${
                      viewMode === 'full'
                        ? 'bg-kc-gold text-kc-maroon'
                        : 'bg-kc-temple-brown text-kc-text-muted hover:text-kc-paper'
                    }`}
                  >
                    Full 11-Page Scroll
                  </button>
                </div>

                {/* Page Navigation Controls (Single Mode) */}
                {viewMode === 'single' && (
                  <div className="flex items-center gap-2">
                    <TempleButton variant="ghost" size="sm" onClick={handlePrevPage} disabled={activePage === 1}>
                      ◀ Prev Page
                    </TempleButton>
                    <span className="font-heading font-bold text-kc-gold">
                      Page {activePage} of 11
                    </span>
                    <TempleButton variant="ghost" size="sm" onClick={handleNextPage} disabled={activePage === 11}>
                      Next Page ▶
                    </TempleButton>
                  </div>
                )}

                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-heading uppercase text-kc-brass font-bold">
                    Zoom:
                  </span>
                  <button
                    onClick={handleZoomOut}
                    className="w-6 h-6 rounded-3xs bg-kc-temple-brown hover:bg-kc-brass text-kc-paper font-bold flex items-center justify-center"
                    title="Zoom Out"
                  >
                    -
                  </button>
                  <span className="font-mono text-kc-gold w-10 text-center font-bold">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="w-6 h-6 rounded-3xs bg-kc-temple-brown hover:bg-kc-brass text-kc-paper font-bold flex items-center justify-center"
                    title="Zoom In"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Scrollable Document Container */}
              <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
                <div
                  ref={documentRef}
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                  className="transition-transform duration-200"
                >
                  <RoyalManuscriptDocument
                    data={manuscriptData}
                    activePageIndex={activePage}
                    isSinglePagePreview={viewMode === 'single'}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Progress Overlay Modal */}
        {isExporting && (
          <div className="absolute inset-0 z-50 bg-kc-charcoal/90 flex flex-col items-center justify-center text-kc-paper p-6">
            <div className="w-12 h-12 border-4 border-kc-gold border-t-transparent rounded-full animate-spin mb-4" />
            <h4 className="font-devanagari text-xl font-bold text-kc-gold mb-1">
              ॥ दस्तावेज निर्यात प्रक्रिया ॥
            </h4>
            <p className="font-serif italic text-sm text-kc-text-muted">
              {exportMessage}
            </p>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
