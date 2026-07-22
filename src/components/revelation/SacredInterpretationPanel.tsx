import React from 'react';
import { TempleBorder } from '../decorations/TempleBorder';
import { TempleLabel, Quote, BodyText } from '../typography/Typography';

export const SacredInterpretationPanel: React.FC = () => {
  return (
    <TempleBorder variant="gilded" className="w-full text-center my-6">
      <TempleLabel>Sacred Interpretation Manuscript</TempleLabel>

      <Quote className="border-l-0 text-base sm:text-lg my-3 max-w-2xl mx-auto">
        “The celestial record has been successfully inscribed and revealed under the cosmic wheel. The planetary alignments reflect the eternal dance of light.”
      </Quote>

      <BodyText className="text-xs text-kc-text-muted italic max-w-xl mx-auto">
        ✦ Detailed algorithmic interpretations, Mahadasha timelines, and planetary aspect analyses will awaken in future calculation engine phases.
      </BodyText>
    </TempleBorder>
  );
};
