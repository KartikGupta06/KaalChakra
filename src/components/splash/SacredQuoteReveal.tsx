import React from 'react';
import { motion } from 'framer-motion';
import { inkSpread } from '../animations/variants';

export const SacredQuoteReveal: React.FC = () => {
  return (
    <motion.div
      variants={inkSpread}
      initial="hidden"
      animate="visible"
      className="my-6 text-center"
    >
      <div className="font-devanagari text-xl sm:text-2xl text-kc-gold-royal tracking-widest drop-shadow-sm font-serif">
        ॥ ज्ञानं परमं बलम् ॥
      </div>
      <div className="font-serif text-xs sm:text-sm text-kc-text-muted italic tracking-wider mt-1 opacity-90">
        “Knowledge is the Supreme Strength” • Vedic Astronomy Heritage
      </div>
    </motion.div>
  );
};
