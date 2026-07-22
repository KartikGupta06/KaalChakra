import React from 'react';
import { motion } from 'framer-motion';
import { scrollUnfold } from '../animations/variants';
import { cn } from '../../lib/utils';

interface ScrollFrameProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const ScrollFrame: React.FC<ScrollFrameProps> = ({ children, className, title }) => {
  return (
    <motion.div
      variants={scrollUnfold}
      initial="hidden"
      animate="visible"
      className={cn('relative my-6 w-full', className)}
    >
      {/* Top Wooden Dowel Roller End-cap */}
      <div className="relative h-6 w-full rounded-t-sm bg-gradient-to-r from-kc-dark-wood via-kc-temple-brown to-kc-dark-wood border-b-2 border-kc-gold/70 shadow-sm flex items-center justify-between px-4">
        <div className="h-3 w-3 rounded-full bg-kc-gold border border-kc-maroon" />
        {title && (
          <span className="font-heading text-xs font-semibold tracking-widest text-kc-ivory uppercase">
            {title}
          </span>
        )}
        <div className="h-3 w-3 rounded-full bg-kc-gold border border-kc-maroon" />
      </div>

      {/* Main Unrolled Scroll Parchment Body */}
      <div className="relative bg-kc-paper dark:bg-kc-burnt-brown border-x-2 border-kc-brass/50 p-6 sm:p-8 shadow-warm">
        {/* Subtle Side Crease Shadows */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/10 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/10 to-transparent" />
        {children}
      </div>

      {/* Bottom Wooden Dowel Roller End-cap */}
      <div className="relative h-6 w-full rounded-b-sm bg-gradient-to-r from-kc-dark-wood via-kc-temple-brown to-kc-dark-wood border-t-2 border-kc-gold/70 shadow-sm flex items-center justify-between px-4">
        <div className="h-3 w-3 rounded-full bg-kc-gold border border-kc-maroon" />
        <div className="h-3 w-3 rounded-full bg-kc-gold border border-kc-maroon" />
      </div>
    </motion.div>
  );
};
