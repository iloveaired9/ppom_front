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

console.log('\n🎨 네이버 다크모드 색상 대비 검증 (WCAG AA 표준)\n');
console.log('═'.repeat(60));

let allPass = true;
Object.entries(naverDarkMode).forEach(([name, { fg, bg, isLarge }]) => {
  const result = validateContrast(fg, bg, 'AA', isLarge);
  const icon = result.pass ? '✓' : '✗';
  const status = result.pass ? '통과' : '실패';

  console.log(
    `${icon} ${name.padEnd(35)} ${result.ratio.toString().padStart(5)}:1 (필요: ${result.required}:1) [${status}]`
  );

  if (!result.pass) allPass = false;
});

console.log('═'.repeat(60));
console.log(`\n결과: ${allPass ? '✓ 모든 색상 조합이 WCAG AA를 충족합니다' : '✗ 일부 색상 조합이 표준을 충족하지 않습니다'}\n`);

process.exit(allPass ? 0 : 1);
