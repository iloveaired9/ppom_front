# 구현 상세 설명

## 🎯 다크모드 구현의 진화 과정

### Phase 1: 초기 구현 (문제점 존재)

**문제점:**
```
ThemeToggle.tsx              PpompuNew.tsx
    ↓                            ↓
useDarkMode() #1          useDarkMode() #2
    ↓                            ↓
[별도의 상태]            [별도의 상태]
    ↓                            ↓
localStorage              (업데이트 안됨)
  저장
```

- ThemeToggle에서 `setTheme()` 호출
- PpompuNew는 여전히 이전 `isDark` 값 유지
- 두 컴포넌트가 서로 다른 상태 인스턴스 소유

### Phase 2: 최종 구현 (Context API 적용)

**해결책:**
```
main.tsx (진입점)
    ↓
ThemeProvider (전역 상태 관리)
    ├── isDark (상태)
    ├── setTheme (상태 업데이트)
    └── toggleDarkMode (토글)
    ↓
useTheme() Context Hook
    ├── ThemeToggle.tsx (useTheme 사용)
    └── PpompuNew.tsx (useTheme 사용)
         └── 모두 동일한 상태 공유
```

## 📄 코드 구조 분석

### 1. ThemeContext.tsx (새로 생성)

```typescript
// Context 정의
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider 컴포넌트
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
  options = {},
}) => {
  // useDarkMode 훅 호출 (한 번만 - Provider 레벨에서)
  const darkMode = useDarkMode(options);

  // Context.Provider로 감싸서 하위 모든 컴포넌트에 제공
  return (
    <ThemeContext.Provider value={darkMode}>
      {children}
    </ThemeContext.Provider>
  );
};

// 하위 컴포넌트에서 사용할 커스텀 훅
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

**핵심 포인트:**
- `useDarkMode()`는 **Provider 컴포넌트에서만 호출**
- 모든 하위 컴포넌트는 Context를 통해 **동일한 상태** 접근
- 상태 변경 시 Context 구독자 모두 업데이트

### 2. main.tsx (진입점 수정)

**Before:**
```typescript
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**After:**
```typescript
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider options={{ defaultMode: 'auto' }}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
```

**변경 이유:**
- App 전체를 ThemeProvider로 감싸서 Context 제공
- `defaultMode: 'auto'` → 시스템 설정 자동 감지

### 3. useDarkMode.ts (훅 로직)

```typescript
export const useDarkMode = (options: DarkModeOptions = {}) => {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  // 초기화 (마운트 시)
  useEffect(() => {
    const savedMode = localStorage.getItem(storageKey);

    if (savedMode === 'dark' || savedMode === 'light') {
      setIsDark(savedMode === 'dark');
    } else if (defaultMode === 'auto') {
      // 시스템 설정 감지
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDark(prefersDark);
    } else {
      setIsDark(defaultMode === 'dark');
    }
  }, [storageKey, defaultMode]);

  // 시스템 설정 변화 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
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

  // 테마 토글/설정 함수들
  const toggleDarkMode = useCallback((value?: boolean) => {
    setIsDark((prev) => {
      const newValue = value !== undefined ? value : !prev;
      localStorage.setItem(storageKey, newValue ? 'dark' : 'light');
      applyTheme(newValue);
      return newValue;
    });
  }, [storageKey, applyTheme]);

  const setTheme = useCallback((mode: 'light' | 'dark' | 'auto') => {
    if (mode === 'auto') {
      localStorage.removeItem(storageKey);
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
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
    isLoading: isDark === null,
    toggleDarkMode,
    setTheme,
  };
};
```

**주요 로직:**
1. **초기 로드**: localStorage → 시스템 설정 → 기본값 순서로 확인
2. **상태 변경**: `setTheme()` 호출 시 저장 + DOM 업데이트
3. **DOM 적용**: `data-theme` 속성과 `dark-mode` 클래스 추가
4. **시스템 감지**: `prefers-color-scheme` 미디어 쿼리 모니터링

### 4. PpompuNew.tsx (컴포넌트 수정)

**Before:**
```typescript
import { useDarkMode } from '../hooks/useDarkMode';

const { isDark } = useDarkMode();  // ❌ 별도의 인스턴스
```

**After:**
```typescript
import { useTheme } from '@/context/ThemeContext';

const { isDark } = useTheme();  // ✅ Context에서 공유된 상태
```

**className 생성:**
```typescript
const containerClass = `ppomppu-new-page ${
  viewStyle === 'original'
    ? 'ppomppu-original-style'
    : 'ppomppu-naver-style'
} ${isDark ? 'dark-mode' : 'light-mode'}`;
```

결과 예시:
- `ppomppu-new-page ppomppu-original-style dark-mode`
- `ppomppu-new-page ppomppu-naver-style light-mode`

### 5. ThemeToggle.tsx (토글 버튼)

**Before:**
```typescript
const { isDark, isLoading, setTheme } = useDarkMode();  // ❌ 별도 인스턴스
```

**After:**
```typescript
const { isDark, isLoading, setTheme } = useTheme();  // ✅ 공유 상태
```

**토글 로직:**
```typescript
<button
  onClick={() => setTheme(isDark ? 'light' : 'dark')}
  aria-label={`다크모드 ${isDark ? '끄기' : '켜기'}`}
>
  {isDark ? (
    <span>☀️ 라이트</span>
  ) : (
    <span>🌙 다크</span>
  )}
</button>
```

## 🎨 CSS 스타일 시스템

### PpompuNew.css 구조

```css
/* 1. 기본 스타일 */
.ppomppu-new-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: system fonts;
  transition: all 0.3s ease;
}

/* 2. 원본 뽐뿌 - 라이트모드 */
.ppomppu-original-style.light-mode {
  background-color: #FFFFFF;
  color: #333333;
}

.ppomppu-original-style.light-mode .header-logo {
  color: #FF6B35;  /* 오렌지 */
}

/* 3. 원본 뽐뿌 - 다크모드 */
.ppomppu-original-style.dark-mode {
  background-color: #1A1A1A;
  color: #FFFFFF;
}

.ppomppu-original-style.dark-mode .header-logo {
  color: #FF6B35;  /* 오렌지 유지 */
}

/* 4. 네이버 스타일 */
.ppomppu-naver-style {
  background-color: var(--nv-bg-primary, #111111);
  color: var(--nv-text-primary, #FFFFFF);
}

.ppomppu-naver-style .header-logo {
  color: var(--nv-accent, #00C73C);  /* 네이버 그린 */
}
```

## 🔄 상태 흐름 (State Flow)

```
사용자 다크모드 버튼 클릭
    ↓
ThemeToggle.tsx: onClick={() => setTheme('dark')}
    ↓
Context의 setTheme() 호출
    ↓
useDarkMode의 setTheme() 실행:
  1. localStorage.setItem('theme-mode', 'dark')
  2. html.classList.add('dark-mode')
  3. setIsDark(true)
    ↓
[isDark = true로 상태 업데이트]
    ↓
Context 구독자 리렌더링:
  - PpompuNew → containerClass 업데이트
  - ThemeToggle → 아이콘 변경
  - 기타 컴포넌트
    ↓
CSS 적용:
  .ppomppu-original-style.dark-mode { ... }
  또는
  .ppomppu-naver-style.dark-mode { ... }
    ↓
UI 다크모드로 변경 ✓
```

## 📊 localStorage 구조

```javascript
// 사용자가 명시적으로 선택
localStorage.setItem('theme-mode', 'dark');    // 다크모드
localStorage.setItem('theme-mode', 'light');   // 라이트모드

// 시스템 설정 자동 사용
localStorage.removeItem('theme-mode');         // auto 모드
```

## 🧪 테스트 시나리오

### 테스트 1: 기본 토글
```
1. 페이지 로드 (시스템 설정에 따라 라이트/다크 결정)
2. 다크모드 버튼 클릭
3. ✓ 모든 요소가 다크모드로 변경
4. ✓ 다시 클릭하면 라이트모드로 변경
5. ✓ 새로고침 시 선택한 모드 유지 (localStorage)
```

### 테스트 2: 스타일 전환
```
1. 원본 뽐뿌 + 라이트모드
2. 다크모드 버튼 클릭
   ✓ 원본 뽐뿌 + 다크모드 (오렌지 색상 유지)
3. 네이버 스타일 클릭
   ✓ 네이버 + 다크모드 (그린 색상으로 변경)
4. 라이트모드 클릭
   ✓ 네이버 + 라이트모드
5. 원본 뽐뿌 클릭
   ✓ 원본 뽐뿌 + 라이트모드
```

### 테스트 3: localStorage 검증
```
1. 다크모드 선택
   localStorage['theme-mode'] = 'dark'
2. 페이지 새로고침
   ✓ 다크모드 유지
3. 다른 탭에서 접속
   ✓ 다크모드 적용됨
```

## 🚨 주의사항

### 1. 렌더링 타이밍
```typescript
// ❌ 초기 로드 시 깜빡임 방지
const [isDark, setIsDark] = useState<boolean | null>(null);

if (isDark === null) {
  return <LoadingComponent />; // 또는 null
}
```

### 2. 다중 탭 동기화
현재는 localStorage 기반이므로 다른 탭에서의 변경은 감지되지 않습니다.
필요 시 BroadcastChannel API 사용:

```typescript
// 선택사항: 다중 탭 동기화
const channel = new BroadcastChannel('theme');
channel.onmessage = (e) => {
  applyTheme(e.data.isDark);
};
```

### 3. 성능 최적화
Context를 분리하여 불필요한 리렌더링 방지:

```typescript
// 현재: 단일 Context (충분함)
// 개선: 상태와 디스패처 분리
const ThemeStateContext = createContext(...);
const ThemeDispatchContext = createContext(...);
```

## 📚 참고 자료

- [React Context API](https://react.dev/reference/react/useContext)
- [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

**최종 업데이트**: 2026년 3월 19일
