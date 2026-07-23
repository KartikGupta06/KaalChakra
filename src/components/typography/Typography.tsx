import React from 'react';
import { cn } from '../../lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const HeroHeading: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h1',
  ...props
}) => (
  <Component
    className={cn(
      'font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide text-kc-maroon dark:text-kc-gold leading-tight drop-shadow-sm',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const SectionHeading: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h2',
  ...props
}) => (
  <Component
    className={cn(
      'font-heading text-2xl sm:text-3xl font-semibold text-kc-maroon dark:text-kc-gold border-b border-kc-gold/30 pb-2 mb-4 tracking-wide',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const Subheading: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h3',
  ...props
}) => (
  <Component
    className={cn(
      'font-heading text-lg sm:text-xl font-medium text-kc-text-primary dark:text-kc-text-secondary tracking-wide',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const CardTitle: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h4',
  ...props
}) => (
  <Component
    className={cn(
      'font-heading text-base sm:text-lg font-semibold text-kc-maroon dark:text-kc-gold tracking-wider',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const SanskritHeading: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'span',
  ...props
}) => (
  <Component
    className={cn(
      'font-devanagari text-xl sm:text-2xl font-medium text-kc-gold-royal dark:text-kc-saffron tracking-normal leading-snug',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const BodyText: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'p',
  ...props
}) => (
  <Component
    className={cn(
      'font-serif text-base text-kc-text-primary dark:text-kc-text-secondary leading-relaxed',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const Caption: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'span',
  ...props
}) => (
  <Component
    className={cn(
      'font-serif text-xs sm:text-sm text-kc-text-muted dark:text-kc-text-muted italic tracking-wide',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const Quote: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'blockquote',
  ...props
}) => (
  <Component
    className={cn(
      'font-serif text-lg italic border-l-2 border-kc-gold pl-4 py-1 text-kc-text-secondary dark:text-kc-text-secondary my-4',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const TempleLabel: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'span',
  ...props
}) => (
  <Component
    className={cn(
      'font-heading text-xs font-semibold tracking-widest uppercase text-kc-brass dark:text-kc-gold-light',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const ButtonText: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'span',
  ...props
}) => (
  <Component
    className={cn('font-heading text-sm font-semibold tracking-wider', className)}
    {...props}
  >
    {children}
  </Component>
);
