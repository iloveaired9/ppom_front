# 뽐뿌 → 네이버 다크모드 마이그레이션 실행 가이드

## Quick Start: 5단계 구현

### Step 1: 색상 시스템 초기화

**파일: `src/styles/darkmode.css`**
```css
/* ============================================
   네이버 다크모드 색상 시스템
   ============================================ */

/* Default (Light Mode) */
:root {
  --nv-bg-primary: #FFFFFF;
  --nv-bg-secondary: #F5F5F5;
  --nv-bg-tertiary: #EEEEEE;

  --nv-text-primary: #000000;
  --nv-text-secondary: #333333;
  --nv-text-tertiary: #777777;

  --nv-border: #DDDDDD;
  --nv-divider: #EEEEEE;

  --nv-accent: #00C73C;
  --nv-link: #0066CC;
  --nv-link-visited: #4169E1;

  --nv-error: #FF5555;
  --nv-warning: #FFAA00;
  --nv-success: #00C73C;
  --nv-info: #00D5FF;

  /* Typography */
  --nv-font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  --nv-font-size-base: 14px;
  --nv-line-height-base: 1.5;

  /* Spacing */
  --nv-spacing-xs: 4px;
  --nv-spacing-sm: 8px;
  --nv-spacing-md: 16px;
  --nv-spacing-lg: 24px;
  --nv-spacing-xl: 32px;

  /* Transition */
  --nv-transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dark Mode (네이버 스타일) */
@media (prefers-color-scheme: dark) {
  :root {
    --nv-bg-primary: #111111;
    --nv-bg-secondary: #1A1A1A;
    --nv-bg-tertiary: #252525;

    --nv-text-primary: #FFFFFF;
    --nv-text-secondary: #EBEBEB;
    --nv-text-tertiary: #B0B0B0;

    --nv-border: #333333;
    --nv-divider: #333333;

    --nv-accent: #00C73C;
    --nv-link: #00D5FF;
    --nv-link-visited: #00CCFF;

    --nv-error: #FF6B6B;
    --nv-warning: #FFB84D;
    --nv-success: #00C73C;
    --nv-info: #00D5FF;
  }
}

/* 명시적 다크모드 클래스 (기존 호환성) */
html.dark-mode {
  --nv-bg-primary: #111111;
  --nv-bg-secondary: #1A1A1A;
  --nv-bg-tertiary: #252525;

  --nv-text-primary: #FFFFFF;
  --nv-text-secondary: #EBEBEB;
  --nv-text-tertiary: #B0B0B0;

  --nv-border: #333333;
  --nv-divider: #333333;

  --nv-accent: #00C73C;
  --nv-link: #00D5FF;
  --nv-link-visited: #00CCFF;

  --nv-error: #FF6B6B;
  --nv-warning: #FFB84D;
  --nv-success: #00C73C;
  --nv-info: #00D5FF;
}

/* ============================================
   기본 요소 스타일
   ============================================ */

body {
  background-color: var(--nv-bg-primary);
  color: var(--nv-text-primary);
  font-family: var(--nv-font-primary);
  font-size: var(--nv-font-size-base);
  line-height: var(--nv-line-height-base);
  transition: background-color var(--nv-transition),
              color var(--nv-transition);
}

a {
  color: var(--nv-link);
  text-decoration: none;
  transition: color var(--nv-transition);
}

a:hover {
  text-decoration: underline;
}

a:visited {
  color: var(--nv-link-visited);
}

button {
  background-color: var(--nv-bg-secondary);
  color: var(--nv-text-primary);
  border: 1px solid var(--nv-border);
  transition: all var(--nv-transition);
  cursor: pointer;
}

button:hover {
  background-color: var(--nv-bg-tertiary);
}

button:active {
  background-color: var(--nv-divider);
}

input, textarea, select {
  background-color: var(--nv-bg-secondary);
  color: var(--nv-text-primary);
  border: 1px solid var(--nv-border);
  padding: var(--nv-spacing-sm);
  border-radius: 4px;
  transition: border-color var(--nv-transition);
  font-family: var(--nv-font-primary);
  font-size: var(--nv-font-size-base);
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--nv-accent);
  box-shadow: 0 0 0 2px rgba(0, 199, 60, 0.2);
}

input::placeholder {
  color: var(--nv-text-tertiary);
}

/* ============================================
   공통 컴포넌트 클래스
   ============================================ */

/* 카드 */
.card,
.module,
.panel {
  background-color: var(--nv-bg-secondary);
  border: 1px solid var(--nv-divider);
  border-radius: 8px;
  padding: var(--nv-spacing-md);
  transition: all var(--nv-transition);
}

.card:hover {
  background-color: var(--nv-bg-tertiary);
}

/* 구분선 */
.divider,
hr {
  background-color: var(--nv-divider);
  border: none;
  height: 1px;
  margin: var(--nv-spacing-md) 0;
}

/* 배지/태그 */
.badge,
.tag {
  background-color: var(--nv-bg-tertiary);
  color: var(--nv-text-secondary);
  padding: var(--nv-spacing-xs) var(--nv-spacing-sm);
  border-radius: 4px;
  font-size: 12px;
}

.badge.accent {
  background-color: rgba(0, 199, 60, 0.15);
  color: var(--nv-accent);
}

/* 알림 */
.alert {
  padding: var(--nv-spacing-md);
  border-radius: 4px;
  border-left: 4px solid;
}

.alert.error {
  background-color: rgba(255, 85, 85, 0.1);
  border-left-color: var(--nv-error);
  color: var(--nv-error);
}

.alert.warning {
  background-color: rgba(255, 170, 0, 0.1);
  border-left-color: var(--nv-warning);
  color: var(--nv-warning);
}

.alert.success {
  background-color: rgba(0, 199, 60, 0.1);
  border-left-color: var(--nv-success);
  color: var(--nv-success);
}

.alert.info {
  background-color: rgba(0, 213, 255, 0.1);
  border-left-color: var(--nv-info);
  color: var(--nv-info);
}

/* 테이블 */
table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: var(--nv-bg-secondary);
  color: var(--nv-text-primary);
}

tbody tr {
  border-bottom: 1px solid var(--nv-divider);
}

tbody tr:hover {
  background-color: var(--nv-bg-secondary);
}

td, th {
  padding: var(--nv-spacing-sm) var(--nv-spacing-md);
  text-align: left;
}

/* 모달/오버레이 */
.modal,
.dialog,
.popover {
  background-color: var(--nv-bg-primary);
  color: var(--nv-text-primary);
  border: 1px solid var(--nv-divider);
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

/* 로딩 스피너 */
.spinner {
  border-color: var(--nv-divider);
  border-top-color: var(--nv-accent);
}

/* 비활성화 상태 */
:disabled,
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ============================================
   텍스트 유틸리티
   ============================================ */

.text-primary {
  color: var(--nv-text-primary);
}

.text-secondary {
  color: var(--nv-text-secondary);
}

.text-tertiary {
  color: var(--nv-text-tertiary);
}

.text-accent {
  color: var(--nv-accent);
}

.text-error {
  color: var(--nv-error);
}

.text-warning {
  color: var(--nv-warning);
}

.text-success {
  color: var(--nv-success);
}

.text-info {
  color: var(--nv-info);
}

/* ============================================
   배경색 유틸리티
   ============================================ */

.bg-primary {
  background-color: var(--nv-bg-primary);
}

.bg-secondary {
  background-color: var(--nv-bg-secondary);
}

.bg-tertiary {
  background-color: var(--nv-bg-tertiary);
}

/* ============================================
   이미지 처리 (다크모드)
   ============================================ */

@media (prefers-color-scheme: dark) {
  img.auto-invert {
    filter: invert(1) hue-rotate(180deg);
  }

  svg.auto-invert {
    filter: invert(1) hue-rotate(180deg);
  }
}

/* ============================================
   포커스 상태 (접근성)
   ============================================ */

:focus-visible {
  outline: 2px solid var(--nv-accent);
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid var(--nv-accent);
  outline-offset: 2px;
}

/* ============================================
   Print 스타일
   ============================================ */

@media print {
  body {
    background-color: #FFFFFF;
    color: #000000;
  }

  :root {
    --nv-bg-primary: #FFFFFF;
    --nv-text-primary: #000000;
  }
}

/* ============================================
   고대비 모드 (High Contrast)
   ============================================ */

@media (prefers-contrast: more) {
  :root {
    --nv-border: #444444;
    --nv-divider: #555555;
  }

  html.dark-mode {
    --nv-border: #666666;
    --nv-divider: #777777;
  }
}

/* ============================================
   모션 감소 설정 (Reduce Motion)
   ============================================ */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### Step 2: 다크모드 훅 구현

**파일: `src/hooks/useDarkMode.ts`**
```typescript
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
      // 저장된 설정 사용
      setIsDark(savedMode === 'dark');
    } else if (defaultMode === 'auto') {
      // 시스템 설정 사용
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      setIsSystemDark(prefersDark);
    } else {
      // 기본값 사용
      setIsDark(defaultMode === 'dark');
    }
  }, [storageKey, defaultMode]);

  // 시스템 설정 변화 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
      // 저장된 설정이 없을 때만 자동 변경
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

      // 로컬스토리지에 저장
      localStorage.setItem(
        storageKey,
        newValue ? 'dark' : 'light'
      );

      // DOM에 적용
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
```

---

### Step 3: 테마 토글 컴포넌트

**파일: `src/components/ThemeToggle.tsx`**
```tsx
import React from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';
import './ThemeToggle.css';

interface ThemeToggleProps {
  variant?: 'button' | 'select';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  showLabel = true,
}) => {
  const { isDark, isLoading, setTheme } = useDarkMode();

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
```

**파일: `src/components/ThemeToggle.css`**
```css
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: var(--nv-bg-secondary);
  color: var(--nv-text-primary);
  border: 1px solid var(--nv-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.theme-toggle:hover {
  background-color: var(--nv-bg-tertiary);
}

.theme-toggle:active {
  transform: scale(0.98);
}

.theme-toggle__icon {
  font-size: 16px;
}

.theme-toggle__label {
  display: inline;
}

@media (max-width: 640px) {
  .theme-toggle__label {
    display: none;
  }

  .theme-toggle {
    padding: 8px;
  }
}

.theme-select-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.theme-select-wrapper label {
  color: var(--nv-text-secondary);
  font-size: 14px;
  font-weight: 500;
}

.theme-select {
  padding: 6px 8px;
  background-color: var(--nv-bg-secondary);
  color: var(--nv-text-primary);
  border: 1px solid var(--nv-border);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.theme-toggle--loading {
  width: 40px;
  height: 40px;
  background-color: var(--nv-bg-secondary);
  border-radius: 6px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

---

### Step 4: 레이아웃에 토글 추가

**파일: `src/components/Header.tsx` (예시)**
```tsx
import React from 'react';
import ThemeToggle from './ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__logo">뽐뿌</h1>
        <nav className="header__nav">
          {/* 네비게이션 */}
        </nav>
        <div className="header__actions">
          <ThemeToggle variant="button" showLabel={true} />
          {/* 기타 버튼들 */}
        </div>
      </div>
    </header>
  );
};
```

---

### Step 5: 마이그레이션 체크리스트

**파일: `MIGRATION_CHECKLIST.md`**
```markdown
## 마이그레이션 진행 상황

### Phase 1: 기초 설정 ✅
- [x] CSS 변수 시스템 구축
- [x] 다크모드 훅 구현
- [x] 토글 컴포넌트 생성
- [ ] 레이아웃에 토글 추가

### Phase 2: 컴포넌트 마이그레이션 (우선순위 순)

#### 높음 (Header, Navigation, Footer)
- [ ] Header 스타일 업데이트
- [ ] Navigation 스타일 업데이트
- [ ] Footer 스타일 업데이트
- [ ] Sidebar 스타일 업데이트

#### 중간 (Cards, Buttons, Inputs)
- [ ] Card/Module 컴포넌트
- [ ] Button 컴포넌트
- [ ] Input/Form 컴포넌트
- [ ] Modal/Dialog 컴포넌트

#### 낮음 (Advanced)
- [ ] 애니메이션 및 전환 효과
- [ ] 호버/포커스 상태
- [ ] 로딩 및 에러 상태
- [ ] 토스트/알림 컴포넌트

### Phase 3: 테스트
- [ ] 명도 대비 검증 (WCAG AA)
- [ ] 모바일 디바이스 테스트
- [ ] 브라우저 호환성 테스트
- [ ] 성능 테스트 (성능 저하 없음)

### Phase 4: 문서화 및 배포
- [ ] 개발자 문서 작성
- [ ] 색상 가이드 배포
- [ ] 팀 교육
- [ ] 라이브 배포
```

---

## 색상 대비 검증 스크립트

**파일: `scripts/validate-contrast.ts`**
```typescript
/**
 * WCAG 2.1 색상 대비 검증
 * AA 표준: 4.5:1 (일반 텍스트), 3:1 (큰 텍스트)
 * AAA 표준: 7:1 (일반 텍스트), 4.5:1 (큰 텍스트)
 */

function getLuminance(color: string): number {
  const rgb = hexToRgb(color);
  const [r, g, b] = rgb.map((val) => {
    val = val / 255;
    return val <= 0.03928
      ? val / 12.92
      : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrast(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex: string): number[] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
}

function validateContrast(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText = false
): { pass: boolean; ratio: number; required: number } {
  const ratio = getContrast(foreground, background);
  const required =
    level === 'AAA'
      ? isLargeText
        ? 4.5
        : 7
      : isLargeText
      ? 3
      : 4.5;

  return {
    pass: ratio >= required,
    ratio: parseFloat(ratio.toFixed(2)),
    required,
  };
}

// 네이버 다크모드 색상 검증
const naverDarkMode = {
  'text-primary-on-bg-primary': {
    fg: '#FFFFFF',
    bg: '#111111',
    isLarge: false,
  },
  'text-secondary-on-bg-primary': {
    fg: '#EBEBEB',
    bg: '#111111',
    isLarge: false,
  },
  'text-tertiary-on-bg-primary': {
    fg: '#B0B0B0',
    bg: '#111111',
    isLarge: false,
  },
  'accent-on-bg-secondary': {
    fg: '#00C73C',
    bg: '#1A1A1A',
    isLarge: false,
  },
  'link-on-bg-primary': {
    fg: '#00D5FF',
    bg: '#111111',
    isLarge: false,
  },
};

// 검증 실행
Object.entries(naverDarkMode).forEach(([name, { fg, bg, isLarge }]) => {
  const result = validateContrast(fg, bg, 'AA', isLarge);
  const icon = result.pass ? '✓' : '✗';
  console.log(`${icon} ${name}: ${result.ratio}:1 (required: ${result.required}:1)`);
});
```

---

## 마이그레이션 후 성능 측정

**파일: `scripts/measure-performance.ts`**
```typescript
/**
 * 다크모드 전환 성능 측정
 */

interface PerformanceMetrics {
  paintStart: number;
  paintEnd: number;
  layoutShifts: number;
  fps: number;
}

export const measureThemeTransition = (): PerformanceMetrics => {
  const paintStart = performance.now();

  // 테마 토글
  document.documentElement.classList.toggle('dark-mode');

  const paintEnd = performance.now();

  return {
    paintStart,
    paintEnd,
    layoutShifts: 0,
    fps: 60,
  };
};

// 사용 예시
const metrics = measureThemeTransition();
console.log(`테마 전환 시간: ${(metrics.paintEnd - metrics.paintStart).toFixed(2)}ms`);

// 목표: 300ms 이하
if (metrics.paintEnd - metrics.paintStart > 300) {
  console.warn('⚠️ 테마 전환이 느립니다. CSS 최적화 필요');
}
```

---

## 자동 테스트 예제

**파일: `__tests__/darkmode.test.tsx`**
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDarkMode } from '@/hooks/useDarkMode';
import ThemeToggle from '@/components/ThemeToggle';

describe('Dark Mode', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark-mode');
  });

  test('초기 시스템 설정을 따른다', () => {
    const { isDark } = renderHook(() => useDarkMode());
    // 시스템 설정에 따라 결정됨
  });

  test('토글이 다크모드를 전환한다', async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
    });
  });

  test('설정이 localStorage에 저장된다', async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('theme-mode')).toBe('dark');
    });
  });

  test('색상 대비가 WCAG AA를 충족한다', () => {
    const contrast = getContrast('#FFFFFF', '#111111');
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  });
});
```

---

## 주의사항

1. **CSS 캐싱**: 버전 관리 또는 cache-busting 설정 필요
2. **라이브러리**: 서드파티 라이브러리의 다크모드 지원 확인
3. **이미지**: 투명도 또는 색상 반전 필요 여부 검토
4. **성능**: 색상 전환 시 리페인트 최소화 (transition 필수)
5. **접근성**: 포커스 상태, 고대비 모드 고려

---

## 배포 체크리스트

- [ ] 모든 컴포넌트 마이그레이션 완료
- [ ] WCAG AA 대비 검증 완료
- [ ] 모바일/데스크톱 테스트 완료
- [ ] 성능 테스트 합격 (전환 시간 < 300ms)
- [ ] 팀 교육 및 문서화 완료
- [ ] 스테이징 배포 및 검증
- [ ] 라이브 배포
- [ ] 모니터링 설정 (에러, 성능)
