# 뽐뿌 모바일 - 네이버 다크모드 마이그레이션 프로젝트

뽐뿌(Ppomppu) 모바일 페이지를 네이버 스타일의 다크모드로 마이그레이션한 프로젝트입니다.

## 🎯 프로젝트 목표

- 뽐뿌 모바일의 원본 스타일과 네이버 스타일을 비교 분석
- 네이버 다크모드 색상 팔레트 적용
- 양쪽 스타일 간 원활한 전환 기능 구현
- 다크모드/라이트모드 토글 기능 구현

## ✨ 주요 기능

### 1. 스타일 전환 (Style Switching)
- **원본 뽐뿌 스타일**: 원래의 뽐뿌 디자인 유지
  - 주색상: 오렌지 (#FF6B35)
  - 배경: 흰색(라이트) / 어두운회색(다크)

- **네이버 스타일**: 네이버의 모던한 디자인
  - 주색상: 네이버 그린 (#00C73C)
  - 배경: 검은색(다크) / 흰색(라이트)

### 2. 다크모드 토글
- 🌙 라이트모드 ↔ ☀️ 다크모드 전환
- 사용자 선택 저장 (localStorage)
- 시스템 설정 자동 감지 (prefers-color-scheme)
- 모든 스타일에서 일관되게 작동

### 3. 반응형 디자인
- 모바일 우선 설계
- 768px 이하에서 최적화
- 터치 친화적 UI

## 🛠️ 기술 스택

- **Frontend Framework**: React 18.2.0
- **Language**: TypeScript 5.0.0
- **Build Tool**: Vite 4.5.14
- **Styling**: CSS3 (변수 시스템)
- **State Management**: React Context API
- **Testing**: Vitest, Playwright

## 📁 프로젝트 구조

```
ppom_front/
├── src/
│   ├── components/
│   │   ├── PpompuNew.tsx          # 메인 페이지 컴포넌트
│   │   ├── PpompuNew.css          # 스타일 (원본 vs 네이버)
│   │   ├── ThemeToggle.tsx        # 다크모드 토글 버튼
│   │   ├── Header.tsx             # 헤더 컴포넌트
│   │   └── ...
│   ├── context/
│   │   └── ThemeContext.tsx       # 🆕 전역 테마 관리 (React Context)
│   ├── hooks/
│   │   └── useDarkMode.ts         # 다크모드 로직 (localStorage, system preference)
│   ├── styles/
│   │   └── darkmode.css           # 다크모드 CSS 변수 정의
│   ├── main.tsx                   # 앱 진입점 (ThemeProvider 포함)
│   └── App.tsx                    # 라우팅 및 전역 레이아웃
├── package.json                   # 의존성 및 스크립트
├── vite.config.ts                 # Vite 설정
├── tsconfig.json                  # TypeScript 설정
└── README.md                       # 이 파일
```

## 🔄 다크모드 구현 아키텍처

### ThemeContext (새로 추가됨)

```
main.tsx (ThemeProvider 래핑)
    ↓
  App
    ├── PpompuNew (useTheme() 사용)
    │   └── ThemeToggle (useTheme() 사용)
    └── ...
```

**ThemeProvider의 역할:**
- 모든 컴포넌트가 동일한 `isDark` 상태 공유
- 상태 변경 시 즉시 모든 구독 컴포넌트 업데이트
- localStorage에 테마 선택 저장

### useDarkMode Hook

```typescript
const { isDark, isLoading, toggleDarkMode, setTheme } = useDarkMode()
```

**기능:**
- localStorage 기반 상태 저장/복구
- 시스템 색상 스킴 감지
- DOM에 테마 클래스 적용
- 컴포넌트 리렌더링 트리거

## 🎨 색상 팔레트

### 원본 뽐뿌 스타일

#### 라이트모드
| 요소 | 색상 | HEX |
|------|------|-----|
| 배경 | 하양 | #FFFFFF |
| 텍스트 | 검정 | #333333 |
| 주색상(Accent) | 오렌지 | #FF6B35 |
| 보조색 | 회색 | #E5E5E5 |

#### 다크모드
| 요소 | 색상 | HEX |
|------|------|-----|
| 배경 | 진검정 | #1A1A1A |
| 텍스트 | 흰색 | #FFFFFF |
| 주색상(Accent) | 오렌지 | #FF6B35 |
| 항목배경 | 검정 | #111111 |

### 네이버 스타일 (다크모드)

| 요소 | 색상 | HEX |
|------|------|-----|
| 배경(Primary) | 검정 | #111111 |
| 배경(Secondary) | 진검정 | #1A1A1A |
| 텍스트 | 흰색 | #FFFFFF |
| 주색상(Accent) | 네이버그린 | #00C73C |
| 링크색 | 하늘색 | #00D5FF |

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
서버는 `http://localhost:5173` 또는 `5174`에서 실행됩니다.

### 3. 프로덕션 빌드
```bash
npm run build
```

### 4. 빌드 결과 미리보기
```bash
npm run preview
```

## 📊 CSS 클래스 구조

### 컨테이너 클래스

```html
<!-- 원본 뽐뿌 스타일 (다크모드) -->
<div class="ppomppu-new-page ppomppu-original-style dark-mode">

<!-- 원본 뽐뿌 스타일 (라이트모드) -->
<div class="ppomppu-new-page ppomppu-original-style light-mode">

<!-- 네이버 스타일 (다크모드) -->
<div class="ppomppu-new-page ppomppu-naver-style dark-mode">

<!-- 네이버 스타일 (라이트모드) -->
<div class="ppomppu-new-page ppomppu-naver-style light-mode">
```

### CSS 변수 시스템 (darkmode.css)

```css
:root {
  /* 네이버 다크모드 색상 */
  --nv-bg-primary: #111111;
  --nv-bg-secondary: #1A1A1A;
  --nv-text-primary: #FFFFFF;
  --nv-text-secondary: #CCCCCC;
  --nv-accent: #00C73C;
  --nv-divider: #333333;
  /* ... */
}

[data-theme="dark"] {
  /* 다크모드 오버라이드 */
}
```

## 🔧 핵심 수정사항

### 문제점 (이전)
- ❌ ThemeToggle과 PpompuNew가 별도의 `useDarkMode()` 인스턴스 사용
- ❌ ThemeToggle에서 상태 변경 → PpompuNew에 반영 안됨
- ❌ 스타일 전환 시 다크모드 상태 유지 안됨

### 해결책 (현재)
- ✅ ThemeContext 생성 → 전역 상태 관리
- ✅ main.tsx에서 ThemeProvider로 앱 전체 감싸기
- ✅ 모든 컴포넌트가 `useTheme()` 훅 사용
- ✅ localStorage 기반 상태 영속화

### 수정된 파일
1. **src/context/ThemeContext.tsx** (NEW)
   - React Context 기반 전역 테마 상태 관리

2. **src/main.tsx**
   ```typescript
   <ThemeProvider options={{ defaultMode: 'auto' }}>
     <App />
   </ThemeProvider>
   ```

3. **src/components/ThemeToggle.tsx**
   ```typescript
   const { isDark, isLoading, setTheme } = useTheme();
   ```

4. **src/components/PpompuNew.tsx**
   ```typescript
   const { isDark } = useTheme();
   ```

## 📱 UI 컴포넌트

### PpompuNew 레이아웃
```
┌─────────────────────────────────┐
│ ☰  뽐뿌  🌙 🔔                 │ <- Header
├─────────────────────────────────┤
│ [원본 뽐뿌] [네이버 스타일]      │ <- Style Switcher
├─────────────────────────────────┤
│ 뽐뿌 정보 커뮤니티 포럼 갤러리   │ <- Main Menu
├─────────────────────────────────┤
│ 인기/HOT  최신글  장터최신글    │ <- Tab Menu
├─────────────────────────────────┤
│ 🔔 공지: 맛집처럼 19만 솔직...  │ <- Notice
├─────────────────────────────────┤
│ • 제목 1                    9  22│
│ • 제목 2                   20   4│
│ • 제목 3                   10  45│
│   ...                            │
│                                  │ <- Posts Container
│                                  │
├─────────────────────────────────┤
│          [더보기]                │ <- Action Button
└─────────────────────────────────┘
```

## 🧪 테스트

### Vitest (단위 테스트)
```bash
npm run test
```

### Vitest UI
```bash
npm run test:ui
```

### 대비도 검증
```bash
npm run contrast:check
```

## 📚 추가 문서

- `DARKMODE_COMPARISON.md` - 네이버 vs 뽐뿌 다크모드 비교 분석
- `MIGRATION_GUIDE.md` - 마이그레이션 가이드
- `IMPLEMENTATION_STATUS.md` - 구현 상태 체크리스트
- `COLOR_PALETTE.json` - 색상 팔레트 정의

## 🔍 localStorage 구조

```javascript
// localStorage에 저장되는 테마 설정
localStorage.setItem('theme-mode', 'dark');  // 'light' | 'dark' | 제거됨(auto)
```

## 🌐 브라우저 호환성

- Chrome/Edge: ✅ 지원
- Firefox: ✅ 지원
- Safari: ✅ 지원
- IE11: ❌ 미지원

## 📝 라이선스

MIT License

## 👤 기여자

- Claude AI - 구현 및 문서화

## 📧 문의

GitHub: https://github.com/iloveaired9/ppom_front

---

**마지막 업데이트**: 2026년 3월 19일
