import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import './ThemeToggle.css';

interface ThemeToggleProps {
  variant?: 'button' | 'select';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  showLabel = true,
}) => {
  const { isDark, isLoading, setTheme } = useTheme();

  if (isLoading) {
    return <div className="theme-toggle--loading" />;
  }

  if (variant === 'select') {
    return (
      <div className="theme-select-wrapper">
        {showLabel && <label htmlFor="theme-select">테마:</label>}
        <select
          id="theme-select"
          defaultValue={isDark ? 'dark' : 'light'}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'auto')}
          className="theme-select"
        >
          <option value="light">라이트</option>
          <option value="dark">다크</option>
          <option value="auto">시스템 설정</option>
        </select>
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="theme-toggle"
      aria-label={`다크모드 ${isDark ? '끄기' : '켜기'}`}
      title={`현재: ${isDark ? '다크' : '라이트'} 모드`}
    >
      {isDark ? (
        <>
          <span className="theme-toggle__icon">☀️</span>
          {showLabel && <span className="theme-toggle__label">라이트</span>}
        </>
      ) : (
        <>
          <span className="theme-toggle__icon">🌙</span>
          {showLabel && <span className="theme-toggle__label">다크</span>}
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
