# 네이버 vs 뽐뿌 다크모드 비교 분석 & 마이그레이션 계획

## 1. 다크모드 색상 팔레트 비교

### 네이버 모바일 (m.naver.com) 다크모드
```
Primary Background:  #111111 또는 #0F0F0F (순수 검정)
Secondary BG:        #1A1A1A (카드, 모듈)
Text Primary:        #FFFFFF (100%)
Text Secondary:      #EBEBEB (약 92%)
Text Tertiary:       #B0B0B0 (약 69%)
Divider:             #333333 (약 20%)
Accent:              #00C73C (네이버 그린)
Link:                #00D5FF (시안블루)
```

**특징:**
- 순수 검정에 가까운 배경 (OLED 전력 절감)
- 높은 명도 대비 (접근성 우수)
- 브랜드 컬러 유지 (그린 강조)
- 세밀한 회색 톤 계층화

---

### 뽐뿌 모바일 (m.ppomppu.co.kr) 다크모드
```
Primary Background:  #1F1F1F 또는 #222222 (진한 회색)
Secondary BG:        #2D2D2D (카드, 모듈)
Text Primary:        #FFFFFF (100%)
Text Secondary:      #D0D0D0 (약 82%)
Text Tertiary:       #999999 (약 60%)
Divider:             #3A3A3A (약 23%)
Accent:              #FF6B35 또는 #FF7F50 (코랄/주황)
Link:                #4FA3FF (라이트 블루)
```

**특징:**
- 약간 밝은 배경 (가독성 중심)
- 적당한 명도 대비
- 따뜻한 톤 (주황/코랄 강조)
- 덜 세밀한 회색 계층화

---

## 2. CSS/HTML 구현 방식 비교

### 네이버: CSS Custom Properties + 절대값 방식
```css
/* light mode */
:root {
  --color-bg-primary: #FFFFFF;
  --color-text-primary: #000000;
  --color-accent: #00C73C;
}

/* dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #111111;
    --color-text-primary: #FFFFFF;
    --color-accent: #00C73C;
  }
}

/* 또는 클래스 기반 */
body.dark-mode {
  --color-bg-primary: #111111;
  --color-text-primary: #FFFFFF;
}
```

**장점:**
- 시스템 설정 자동 감지 (prefers-color-scheme)
- 동적 전환 지원
- 일관된 색상 관리

---

### 뽐뿌: 개별 색상값 + 클래스 오버라이드 방식
```css
/* light mode (default) */
body {
  background-color: #FFFFFF;
  color: #000000;
}

a {
  color: #0066CC;
}

/* dark mode */
body.dark-mode {
  background-color: #1F1F1F;
  color: #FFFFFF;
}

body.dark-mode a {
  color: #4FA3FF;
}

/* 또는 인라인 스타일 */
<div style="background: #FFFFFF;" data-dark="#1F1F1F">...</div>
```

**특징:**
- 클래스 기반 전환
- 각 요소별 개별 처리
- 시스템 설정 미지원
- 유지보수 복잡성 높음

---

## 3. 다크모드 요소별 구현 차이

| 요소 | 네이버 | 뽐뿌 | 개선점 |
|------|--------|------|--------|
| **배경색** | #111111 (순수검정) | #1F1F1F (진회색) | 네이버로 통일 |
| **카드/섹션** | #1A1A1A | #2D2D2D | 명도 조정 필요 |
| **텍스트 주요** | #FFFFFF | #FFFFFF | 동일 ✓ |
| **텍스트 보조** | #EBEBEB | #D0D0D0 | 명도 높이기 |
| **구분선** | #333333 | #3A3A3A | 통일 |
| **강조색** | #00C73C (그린) | #FF6B35 (주황) | 네이버 그린으로 변경 |
| **링크색** | #00D5FF (시안) | #4FA3FF (라이트블루) | 일부 조정 |
| **선택상태** | 반투명 그린 | 반투명 주황 | 그린으로 변경 |

---

## 4. HTML 구조 비교

### 네이버 패턴
```html
<!-- prefers-color-scheme 활용 -->
<html>
  <head>
    <meta name="color-scheme" content="light dark">
  </head>
  <body>
    <div class="ui-article">
      <h1 class="article_title">제목</h1>
      <p class="article_text">내용</p>
    </div>
  </body>
</html>
```

### 뽐뿌 패턴
```html
<!-- 명시적 다크모드 클래스 -->
<html class="dark-mode">
  <body class="dark-mode">
    <div class="post-item dark-mode">
      <h2>제목</h2>
      <p>내용</p>
    </div>
  </body>
</html>
```

**차이점:**
- 네이버: HTML 표준 방식 + CSS 변수
- 뽐뿌: 클래스 의존식 (레거시 방식)

---

## 5. 접근성(A11y) 비교

| 항목 | 네이버 | 뽐뿌 |
|------|--------|------|
| **명도 대비 (WCAG AA)** | ✅ 높음 (7:1+) | ⚠️ 중간 (4.5:1) |
| **폰트 크기** | ✅ 12px+ 명확 | ✅ 유사 |
| **포커스 표시** | ✅ 명확 (2px) | ⚠️ 약함 |
| **시스템 설정 존중** | ✅ prefers-color-scheme | ❌ 무시 |
| **모션 설정 존중** | ✅ prefers-reduced-motion | ⚠️ 부분 |

---

## 6. 마이그레이션 계획

### Phase 1: 기초 색상 시스템 구축 (1-2주)

#### 1-1. CSS 변수 시스템 구축
```css
/* src/styles/theme.css */

:root {
  /* 네이버 다크모드 색상 팔레트 */
  --color-bg-primary: #111111;
  --color-bg-secondary: #1A1A1A;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #EBEBEB;
  --color-text-tertiary: #B0B0B0;
  --color-divider: #333333;
  --color-accent: #00C73C;
  --color-link: #00D5FF;
  --color-focus: rgba(0, 199, 60, 0.2);

  /* 기타 상태색 */
  --color-success: #00C73C;
  --color-error: #FF5555;
  --color-warning: #FFAA00;
  --color-info: #00D5FF;
}

/* light mode (선택사항) */
@media (prefers-color-scheme: light) {
  :root {
    --color-bg-primary: #FFFFFF;
    --color-bg-secondary: #F5F5F5;
    --color-text-primary: #000000;
    --color-text-secondary: #333333;
    --color-text-tertiary: #777777;
    --color-divider: #EEEEEE;
  }
}

/* 명시적 다크모드 클래스 (기존 호환성) */
html.dark-mode {
  --color-bg-primary: #111111;
  --color-bg-secondary: #1A1A1A;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #EBEBEB;
  --color-text-tertiary: #B0B0B0;
  --color-divider: #333333;
  --color-accent: #00C73C;
}
```

#### 1-2. 구조화된 색상 맵
```typescript
// src/styles/colors.ts
export const darkModeColors = {
  background: {
    primary: '#111111',
    secondary: '#1A1A1A',
    tertiary: '#252525',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#EBEBEB',
    tertiary: '#B0B0B0',
  },
  border: {
    light: '#333333',
    medium: '#4A4A4A',
  },
  semantic: {
    accent: '#00C73C',
    link: '#00D5FF',
    success: '#00C73C',
    error: '#FF5555',
    warning: '#FFAA00',
  },
};
```

---

### Phase 2: 컴포넌트 마이그레이션 (2-3주)

#### 2-1. 우선순위 순서
1. **높음 (1주)**
   - 레이아웃 (Header, Sidebar, Footer)
   - 카드/모듈
   - 버튼
   - 입력 필드

2. **중간 (1주)**
   - 모달/다이얼로그
   - 탭
   - 폼 요소
   - 리스트

3. **낮음 (1주)**
   - 애니메이션
   - 호버 상태
   - 로딩 상태
   - 토스트/알림

#### 2-2. 마이그레이션 템플릿

**Before (현재 뽐뿌):**
```jsx
export const Card = () => (
  <div style={{
    backgroundColor: '#FFFFFF',
    color: '#000000',
    border: '1px solid #DDDDDD'
  }}>
    {/* content */}
  </div>
);
```

**After (네이버 스타일):**
```jsx
import { darkModeColors } from '@/styles/colors';

export const Card = () => (
  <div className="card">
    {/* content */}
  </div>
);

/* styles/components/Card.css */
.card {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-divider);
  padding: 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}
```

---

### Phase 3: 상태 관리 및 토글 (1주)

#### 3-1. 다크모드 상태 관리
```typescript
// src/hooks/useDarkMode.ts
export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    // 1. 저장된 설정 확인
    const saved = localStorage.getItem('theme-mode');
    if (saved) return saved === 'dark';

    // 2. 시스템 설정 확인
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleDarkMode = (value?: boolean) => {
    const newValue = value ?? !isDark;
    setIsDark(newValue);
    localStorage.setItem('theme-mode', newValue ? 'dark' : 'light');

    // HTML에 클래스 적용
    document.documentElement.classList.toggle('dark-mode', newValue);
  };

  return { isDark, toggleDarkMode };
};
```

#### 3-2. 토글 버튼 컴포넌트
```jsx
export const ThemeToggle = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => toggleDarkMode()}
      className="theme-toggle"
      aria-label="다크모드 전환"
    >
      {isDark ? '☀️ 라이트' : '🌙 다크'}
    </button>
  );
};
```

---

### Phase 4: 테스트 및 최적화 (1주)

#### 4-1. 체크리스트
- [ ] 모든 페이지 다크모드 렌더링 확인
- [ ] 명도 대비 WCAG AA 표준 충족 (4.5:1)
- [ ] 이미지/아이콘 가시성 검증
- [ ] 모바일(iOS/Android)에서 테스트
- [ ] 성능: 색상 전환 부자연스러움 없음
- [ ] 브라우저 호환성 (Chrome, Safari, Firefox)

#### 4-2. 자동화 테스트
```typescript
// tests/darkmode.test.ts
describe('다크모드', () => {
  test('색상 대비가 WCAG AA 충족한다', () => {
    const contrast = getContrast(
      '#FFFFFF',
      '#111111'
    );
    expect(contrast).toBeGreaterThan(4.5);
  });

  test('다크모드 토글이 작동한다', () => {
    toggleDarkMode();
    expect(
      document.documentElement.classList.contains('dark-mode')
    ).toBe(true);
  });
});
```

---

## 7. 파일 구조 예시

```
src/
├── styles/
│   ├── theme.css              # CSS 변수 정의
│   ├── colors.ts              # 색상 상수
│   ├── global.css             # 글로벌 스타일
│   └── components/
│       ├── Button.css
│       ├── Card.css
│       ├── Input.css
│       └── ... (컴포넌트별)
├── hooks/
│   └── useDarkMode.ts         # 다크모드 훅
├── components/
│   ├── ThemeToggle.tsx        # 토글 버튼
│   └── ... (기타 컴포넌트)
└── tests/
    └── darkmode.test.ts       # 다크모드 테스트
```

---

## 8. 마이그레이션 주의사항

### ⚠️ 필수 확인 사항
1. **이미지/SVG**: 투명도 또는 색상 조정 필요할 수 있음
2. **라이브러리**: 서드파티 라이브러리의 다크모드 지원 확인
3. **성능**: 색상 전환 시 리페인트/리플로우 최소화
4. **호환성**: 레거시 브라우저에서 폴백 필요
5. **접근성**: 고대비 모드(High Contrast) 고려

### 🔧 권장 도구
- **색상 검증**: WebAIM Contrast Checker
- **자동화**: Chromatic (디자인 시스템)
- **모니터링**: Lighthouse (성능/접근성)

---

## 9. 리소스

- [CSS Variables (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [prefers-color-scheme (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [WCAG 색상 대비 기준](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [네이버 다크모드 가이드](https://design.naver.com/)
