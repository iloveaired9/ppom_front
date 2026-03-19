import React, { createContext, useContext, ReactNode } from 'react';
import { useDarkMode, DarkModeOptions } from '@/hooks/useDarkMode';

interface ThemeContextType {
  isDark: boolean;
  isLoading: boolean;
  toggleDarkMode: (value?: boolean) => void;
  setTheme: (mode: 'light' | 'dark' | 'auto') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode; options?: DarkModeOptions }> = ({
  children,
  options = {},
}) => {
  const darkMode = useDarkMode(options);

  return (
    <ThemeContext.Provider value={darkMode}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
