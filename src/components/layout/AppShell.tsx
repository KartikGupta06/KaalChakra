import React from 'react';
import { GlobalBackground } from '../backgrounds/GlobalBackground';
import { Header } from './Header';
import { AncientDivider } from '../decorations/AncientDivider';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GlobalBackground>
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <footer className="w-full border-t border-kc-brass/30 py-6 text-center text-xs text-kc-text-muted">
        <div className="mx-auto max-w-7xl px-4">
          <AncientDivider symbol="om" className="my-2 opacity-50" />
          <p className="font-serif">
            KALACHAKRA (कालचक्र) • Vedic Astronomical Engine & Ancient Museum Architecture
          </p>
        </div>
      </footer>
    </GlobalBackground>
  );
};

export const PageContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ${className || ''}`}>{children}</div>;

export const SectionWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <section className={`my-12 w-full ${className || ''}`}>{children}</section>;

export const ContentWidth: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={`mx-auto max-w-4xl ${className || ''}`}>{children}</div>;

export const HeroContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={`relative py-12 sm:py-16 text-center flex flex-col items-center justify-center ${className || ''}`}>
    {children}
  </div>
);
