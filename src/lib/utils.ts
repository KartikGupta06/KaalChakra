import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with clsx conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Sanskrit text alongside English title
 */
export function formatSanskritLabel(english: string, devanagari: string): string {
  return `${english} (${devanagari})`;
}
