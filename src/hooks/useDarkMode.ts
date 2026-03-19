import { useEffect, useState, useCallback } from 'react';

export interface DarkModeOptions {
  storageKey?: string;
  defaultMode?: 'light' | 'dark' | 'auto';
}

export const useDarkMode = (options: DarkModeOptions = {}) => {
  const {
    storageKey = 'theme-mode',
    defaultMode = 'auto',
  } = options;

  const [isDark, setIsDark] = useState<boolean | null>(null);
  const [isSystemDark, setIsSystemDark] = useState(false);

  // 초기 상태 설정
  useEffect(() => {
    const savedMode = localStorage.getItem(storageKey);

    if (savedMode === 'dark' || savedMode === 'light') {
      setIsDark(savedMode === 'dark');
    } else if (defaultMode === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      setIsSystemDark(prefersDark);
    } else {
      setIsDark(defaultMode === 'dark');
    }
  }, [storageKey, defaultMode]);

  // 시스템 설정 변화 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
      if (!localStorage.getItem(storageKey)) {
        setIsDark(e.matches);
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [storageKey]);

  // DOM에 테마 적용
  const applyTheme = useCallback((dark: boolean) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark-mode');
      html.setAttribute('data-theme', 'dark');
    } else {
      html.classList.remove('dark-mode');
      html.setAttribute('data-theme', 'light');
    }
  }, []);

  // 테마 토글 함수
  const toggleDarkMode = useCallback((value?: boolean) => {
    setIsDark((prev) => {
      const newValue = value !== undefined ? value : !prev;
      localStorage.setItem(storageKey, newValue ? 'dark' : 'light');
      applyTheme(newValue);
      return newValue;
    });
  }, [storageKey, applyTheme]);

  // 테마 설정 함수
  const setTheme = useCallback((mode: 'light' | 'dark' | 'auto') => {
    if (mode === 'auto') {
      localStorage.removeItem(storageKey);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      applyTheme(prefersDark);
    } else {
      localStorage.setItem(storageKey, mode);
      const isDarkMode = mode === 'dark';
      setIsDark(isDarkMode);
      applyTheme(isDarkMode);
    }
  }, [storageKey, applyTheme]);

  return {
    isDark: isDark ?? false,
    isSystemDark,
    toggleDarkMode,
    setTheme,
    isLoading: isDark === null,
  };
};
