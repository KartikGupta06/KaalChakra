import { Variants } from 'framer-motion';

export const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

export const paperReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};

export const scrollUnfold: Variants = {
  hidden: { opacity: 0, scaleY: 0.05, transformOrigin: 'top center' },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const inkSpread: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)', scale: 0.98 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.15 },
  },
};

export const softScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

export const cardLift: Variants = {
  rest: { y: 0, shadow: '0 8px 24px rgba(47, 27, 20, 0.12)' },
  hover: {
    y: -4,
    shadow: '0 16px 36px rgba(47, 27, 20, 0.22)',
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

export const goldenGlow: Variants = {
  rest: { opacity: 0.6, filter: 'drop-shadow(0 0 4px rgba(212, 175, 55, 0.3))' },
  hover: {
    opacity: 1,
    filter: 'drop-shadow(0 0 16px rgba(212, 175, 55, 0.7))',
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};
