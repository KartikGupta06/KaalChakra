import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../context/AudioContext';
import { useNavigation } from '../../context/NavigationContext';
import { WaxSeal } from '../decorations/WaxSeal';
import { EngravedIcon } from '../ui/EngravedIcon';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isMuted, toggleMute } = useSound();
  const { navItems, setActiveNavId } = useNavigation();

  const handleBrandClick = () => {
    setActiveNavId('home');
    navigate('/app');
  };

  const handleNavClick = (path: string, id: string) => {
    setActiveNavId(id);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-kc-brass/40 bg-kc-paper/90 dark:bg-kc-burnt-brown/90 backdrop-blur-md transition-colors duration-300 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Brand Identity & Sanskrit Seal */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleBrandClick}>
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

        {/* Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/app' && item.path !== '/' && location.pathname.startsWith(item.path));

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path, item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 font-heading text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-kc-maroon dark:text-kc-gold'
                    : 'text-kc-text-secondary hover:text-kc-maroon dark:text-kc-text-muted dark:hover:text-kc-gold'
                }`}
              >
                <EngravedIcon name={item.icon} className="w-3.5 h-3.5 opacity-80" />
                <span>{item.label}</span>
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
            <EngravedIcon name={isMuted ? 'sound-off' : 'sound-on'} className="w-4 h-4" />
          </button>

          {/* Theme Toggle (Lamp / Moon) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full text-kc-maroon dark:text-kc-gold hover:bg-kc-sand/50 dark:hover:bg-kc-dark-wood transition-colors cursor-pointer"
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to Parchment Light Mode' : 'Switch to Temple Wood Dark Mode'}
          >
            <EngravedIcon name={theme === 'dark' ? 'sun' : 'lamp'} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
