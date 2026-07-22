import React, { createContext, useContext, useState } from 'react';
import { NavItem } from '../types';
import { NAVIGATION_ITEMS } from '../constants/navigation';

interface NavigationContextType {
  activeNavId: string;
  setActiveNavId: (id: string) => void;
  navItems: NavItem[];
  activeItem: NavItem;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeNavId, setActiveNavId] = useState<string>('home');

  const activeItem = NAVIGATION_ITEMS.find((item) => item.id === activeNavId) || NAVIGATION_ITEMS[0];

  return (
    <NavigationContext.Provider
      value={{
        activeNavId,
        setActiveNavId,
        navItems: NAVIGATION_ITEMS,
        activeItem,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
