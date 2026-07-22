import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../context/AudioContext';
import { useNavigation } from '../../context/NavigationContext';
import { WaxSeal } from '../decorations/WaxSeal';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isMuted, toggleMute } = useSound();
  const { navItems, activeNavId, setActiveNavId } = useNavigation();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-kc-brass/40 bg-kc-paper/90 dark:bg-kc-burnt-brown/90 backdrop-blur-md transition-colors duration-300 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Brand Identity & Sanskrit Seal */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveNavId('home')}>
          <WaxSeal size="sm" label="ॐ" />
          <div className="flex flex-col">
            <span className="font-heading text-lg sm:text-xl font-bold tracking-wider text-kc-maroon dark:text-kc-gold">
              KALACHAKRA
            </span>
            <span className="font-devanagari text-xs text-kc-gold-royal dark:text-kc-saffron">
              कालचक्र • The Eternal Wheel of Time
            </span>
          </div>
        </div>

        {/* Navigation Items (Framework) */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.slice(0, 5).map((item) => {
            const isActive = item.id === activeNavId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNavId(item.id)}
                className={`relative px-3 py-1.5 font-heading text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-kc-maroon dark:text-kc-gold'
                    : 'text-kc-text-secondary hover:text-kc-maroon dark:text-kc-text-muted dark:hover:text-kc-gold'
                }`}
              >
                <span>{item.icon}</span> <span className="ml-1">{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-kc-gold-royal rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Global Control Triggers (Theme & Sound) */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className="p-2 rounded-full text-kc-maroon dark:text-kc-gold hover:bg-kc-sand/50 dark:hover:bg-kc-dark-wood transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            title={isMuted ? 'Sound Muted' : 'Sound Active'}
          >
            {isMuted ? '🔇' : '🔔'}
          </button>

          {/* Theme Toggle (Lamp / Moon) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full text-kc-maroon dark:text-kc-gold hover:bg-kc-sand/50 dark:hover:bg-kc-dark-wood transition-colors cursor-pointer"
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to Parchment Light Mode' : 'Switch to Temple Wood Dark Mode'}
          >
            {theme === 'dark' ? '☀' : '🪔'}
          </button>
        </div>
      </div>
    </header>
  );
};
