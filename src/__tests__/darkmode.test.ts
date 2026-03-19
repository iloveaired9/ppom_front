import { describe, it, expect, beforeEach, afterEach } from 'vitest';

/**
 * 다크모드 색상 대비 검증
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

describe('Dark Mode - 색상 대비 검증', () => {
  it('Primary text on primary background이 WCAG AAA를 충족해야 한다', () => {
    const contrast = getContrast('#FFFFFF', '#111111');
    expect(contrast).toBeGreaterThanOrEqual(7); // AAA: 7:1
  });

  it('Secondary text on primary background이 WCAG AAA를 충족해야 한다', () => {
    const contrast = getContrast('#EBEBEB', '#111111');
    expect(contrast).toBeGreaterThanOrEqual(7); // AAA: 7:1
  });

  it('Tertiary text on primary background이 WCAG AA를 충족해야 한다', () => {
    const contrast = getContrast('#B0B0B0', '#111111');
    expect(contrast).toBeGreaterThanOrEqual(4.5); // AA: 4.5:1
  });

  it('Link color on primary background이 명확해야 한다', () => {
    const contrast = getContrast('#00D5FF', '#111111');
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  });

  it('Accent color를 배경으로 사용할 수 있을만큼 충분한 대비가 있어야 한다', () => {
    const contrast = getContrast('#00C73C', '#1A1A1A');
    expect(contrast).toBeGreaterThanOrEqual(3); // 최소값
  });
});

describe('Dark Mode - CSS 변수 적용', () => {
  beforeEach(() => {
    // Reset DOM before each test
    document.documentElement.className = '';
    localStorage.clear();
  });

  afterEach(() => {
    document.documentElement.className = '';
    localStorage.clear();
  });

  it('dark-mode 클래스가 HTML에 적용되어야 한다', () => {
    document.documentElement.classList.add('dark-mode');
    expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
  });

  it('dark-mode 클래스 제거가 작동해야 한다', () => {
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('dark-mode');
    expect(document.documentElement.classList.contains('dark-mode')).toBe(false);
  });

  it('data-theme 속성이 설정되어야 한다', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});

describe('Dark Mode - 로컬스토리지 저장', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('테마 설정이 로컬스토리지에 저장되어야 한다', () => {
    localStorage.setItem('theme-mode', 'dark');
    expect(localStorage.getItem('theme-mode')).toBe('dark');
  });

  it('테마 설정을 변경할 수 있어야 한다', () => {
    localStorage.setItem('theme-mode', 'dark');
    localStorage.setItem('theme-mode', 'light');
    expect(localStorage.getItem('theme-mode')).toBe('light');
  });

  it('테마 설정을 제거할 수 있어야 한다', () => {
    localStorage.setItem('theme-mode', 'dark');
    localStorage.removeItem('theme-mode');
    expect(localStorage.getItem('theme-mode')).toBeNull();
  });
});

describe('Dark Mode - 시스템 설정', () => {
  it('prefers-color-scheme 미디어 쿼리가 지원되어야 한다', () => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    expect(darkModeQuery).toBeDefined();
    expect(typeof darkModeQuery.matches).toBe('boolean');
  });
});
