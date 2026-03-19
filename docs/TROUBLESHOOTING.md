# 문제 해결 가이드 (Troubleshooting)

다크모드 및 스타일 전환 관련 문제를 해결하기 위한 가이드입니다.

## 🔍 일반적인 문제

### 1. 다크모드 토글이 작동하지 않음

#### 증상
- 🌙 다크모드 버튼을 클릭해도 변화가 없음
- 페이지가 여전히 라이트모드로 표시됨

#### 진단 단계

**Step 1: 브라우저 콘솔 확인**
```javascript
// 콘솔에서 실행
localStorage.getItem('theme-mode')
// 출력: 'dark' 또는 'light' 또는 null

// 현재 클래스 확인
document.documentElement.classList
// 'dark-mode' 클래스가 있는지 확인
```

**Step 2: React DevTools 확인**
- React DevTools 설치
- ThemeContext 값 확인
- `isDark` 상태 값 확인

**Step 3: 네트워크 탭 확인**
- 콘솔의 Network 탭에서 오류 있는지 확인
- CSS 파일이 제대로 로드되었는지 확인

#### 해결책

**원인 1: ThemeProvider가 없음**
```typescript
// ❌ main.tsx에서
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);

// ✅ 올바른 방법
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider options={{ defaultMode: 'auto' }}>
    <App />
  </ThemeProvider>
);
```

**원인 2: 잘못된 훅 사용**
```typescript
// ❌ 잘못됨
import { useDarkMode } from '@/hooks/useDarkMode';
const { isDark } = useDarkMode();

// ✅ 올바름
import { useTheme } from '@/context/ThemeContext';
const { isDark } = useTheme();
```

**원인 3: CSS 선택자 오류**
```css
/* ❌ 잘못됨 */
.ppomppu-new-page.light-mode {
  background: white;
}

/* ✅ 올바름 - 스타일 지정자 필요 */
.ppomppu-original-style.light-mode {
  background: white;
}

.ppomppu-naver-style.light-mode {
  background: white;
}
```

### 2. 페이지 새로고침 후 다크모드 초기화

#### 증상
- 다크모드로 설정했는데 새로고침하면 라이트모드로 돌아옴
- localStorage가 제대로 저장되지 않음

#### 진단
```javascript
// 콘솔에서 실행
localStorage.getItem('theme-mode')
// 출력이 null이면 저장이 안됨
```

#### 해결책

**원인 1: localStorage 비활성화**
```javascript
// 확인 방법
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('localStorage 사용 가능');
} catch (e) {
  console.error('localStorage 사용 불가:', e);
}
```

**원인 2: 개인정보 보호 모드**
- 브라우저의 개인정보 보호 모드에서는 localStorage 사용 불가
- 일반 창에서 테스트

**원인 3: 브라우저 캐시**
```bash
# 브라우저 캐시 清소
Ctrl+Shift+Delete  # Windows
Cmd+Shift+Delete   # Mac
```

### 3. 스타일 전환 시 다크모드가 라이트모드로 변경됨

#### 증상
- 다크모드에서 원본 → 네이버로 전환하면 라이트모드가 됨
- CSS가 제대로 적용되지 않음

#### 진단
```javascript
// 콘솔에서 현재 클래스 확인
document.querySelector('.ppomppu-new-page').className
// 예상: "ppomppu-new-page ppomppu-naver-style dark-mode"
```

#### 해결책

**원인 1: CSS 규칙 누락**
```css
/* 모든 조합에 대한 규칙이 있는지 확인 */

/* 원본 라이트 */
.ppomppu-original-style.light-mode { ... } ✅

/* 원본 다크 */
.ppomppu-original-style.dark-mode { ... } ✅

/* 네이버 라이트 */
.ppomppu-naver-style.light-mode { ... } ❓

/* 네이버 다크 */
.ppomppu-naver-style.dark-mode { ... } ✅
```

**원인 2: CSS 특이성(Specificity) 문제**
```css
/* ❌ 낮은 특이성 */
.dark-mode .post-item {
  background: black;
}

/* ✅ 높은 특이성 */
.ppomppu-naver-style.dark-mode .post-item {
  background: black;
}
```

### 4. 라이트모드가 너무 밝음 또는 다크모드가 너무 어두움

#### 증상
- 접근성 대비도 기준 미달
- 텍스트를 읽기 어려움
- 눈이 피로함

#### 해결책

**WCAG 대비도 검사**
```bash
npm run contrast:check
```

**색상 조정**
```css
/* 현재 */
.ppomppu-original-style.dark-mode {
  background-color: #1A1A1A;  /* 너무 어두우면 #222222로 변경 */
  color: #FFFFFF;               /* 너무 밝으면 #EEEEEE로 변경 */
}
```

### 5. localStorage 저장 용량 초과

#### 증상
- 콘솔에 "QuotaExceededError" 에러
- 저장이 실패함

#### 해결책

```javascript
// localStorage 사용량 확인
function getStorageUsage() {
  let total = 0;
  for (let key in localStorage) {
    total += localStorage[key].length + key.length;
  }
  console.log('Total usage:', (total / 1024).toFixed(2), 'KB');
}

getStorageUsage();
```

일반적으로 localStorage는 5-10MB이므로 테마 저장은 문제가 되지 않습니다.

### 6. 특정 컴포넌트에서 다크모드가 작동하지 않음

#### 증상
- ThemeToggle은 작동하지만 특정 부분은 색상이 안 바뀜
- Header는 다크모드인데 Footer는 라이트모드

#### 원인 및 해결책

**원인 1: ThemeProvider 범위 밖**
```typescript
// ❌ ThemeProvider 밖의 컴포넌트
<App>
  <Header />  {/* useTheme() 불가 - 오류 발생 */}
</App>

// ✅ ThemeProvider 안의 컴포넌트
<ThemeProvider>
  <App>
    <Header />  {/* useTheme() 가능 */}
  </App>
</ThemeProvider>
```

**원인 2: 컴포넌트가 Context를 사용하지 않음**
```typescript
// ✅ 해결책: useTheme() 추가
import { useTheme } from '@/context/ThemeContext';

export const MyComponent = () => {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? 'dark' : 'light'}>
      {/* 컨텐츠 */}
    </div>
  );
};
```

## 🎨 CSS 관련 문제

### 색상 변수가 적용되지 않음

#### 원인 및 해결책

```css
/* ❌ 잘못됨 */
.element {
  background-color: --nv-bg-primary;  /* var() 빠짐 */
}

/* ✅ 올바름 */
.element {
  background-color: var(--nv-bg-primary);
}

/* ✅ 기본값 지정 */
.element {
  background-color: var(--nv-bg-primary, #111111);
}
```

### 애니메이션이 끊김

#### 원인
```javascript
// useDarkMode.ts에서 applyTheme 호출 시 강제 리플로우 발생
// 여러 번 호출되면 성능 저하
```

#### 해결책
```typescript
// 디바운싱 추가
import { useCallback } from 'react';

const applyTheme = useCallback((dark: boolean) => {
  requestAnimationFrame(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
    }
  });
}, []);
```

## 📱 모바일 관련 문제

### iOS Safari에서 다크모드가 작동하지 않음

#### 원인
- iOS Safari의 localStorage 정책 차이

#### 해결책
```typescript
// iOS 감지
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

// iOS에서는 IndexedDB 사용
if (isIOS) {
  // IndexedDB 사용
} else {
  // localStorage 사용
}
```

### Android Chrome에서 반응이 느림

#### 해결책
```css
/* GPU 가속화 추가 */
.ppomppu-new-page {
  will-change: background-color, color;
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

## 🔧 개발자 도구 활용

### React DevTools에서 Context 확인

1. Chrome DevTools 열기 (F12)
2. React 탭 선택
3. Components에서 `<ThemeProvider>` 찾기
4. Props 패널에서 `value` 확인:
   ```javascript
   {
     isDark: true,
     isLoading: false,
     toggleDarkMode: ƒ,
     setTheme: ƒ
   }
   ```

### localStorage 확인

```javascript
// DevTools 콘솔
// Application → Storage → Local Storage → http://localhost:5173
// 'theme-mode' 키 확인

// 또는 콘솔에서
console.log(localStorage);
```

### CSS 규칙 확인

```javascript
// 어떤 CSS 규칙이 적용됐는지 확인
const element = document.querySelector('.ppomppu-new-page');
console.log(window.getComputedStyle(element).backgroundColor);
```

## 🚀 성능 디버깅

### 렌더링 횟수 확인

```typescript
// 콘솔에 renderCount 출력
const renderCount = useRef(0);

useEffect(() => {
  console.log('PpompuNew rendered', ++renderCount.current);
});
```

### 성능 프로파일링

```javascript
// DevTools Performance 탭
1. Record 클릭
2. 다크모드 버튼 클릭
3. Stop 클릭
4. Flame Chart 분석
```

## 📞 추가 지원

### 추천되는 검사 순서

```
1. 콘솔 오류 확인
   ↓
2. ThemeProvider 설정 확인
   ↓
3. useTheme() 훅 사용 확인
   ↓
4. CSS 선택자/규칙 확인
   ↓
5. localStorage 확인
   ↓
6. 브라우저 캐시 삭제 후 재시도
   ↓
7. 다른 브라우저에서 테스트
```

### 버그 리포트

버그를 발견했다면:

1. **재현 단계 기록**
   ```
   1. 페이지 로드
   2. 다크모드 클릭
   3. 새로고침
   → 예상: 다크모드 유지
   → 실제: 라이트모드로 변경
   ```

2. **스크린샷 또는 비디오 캡처**

3. **콘솔 에러 메시지 복사**

4. **브라우저/버전 정보**
   ```
   Chrome 120.0.6099.129
   macOS 14.2
   ```

5. **GitHub Issues에 보고**
   https://github.com/iloveaired9/ppom_front/issues

---

**마지막 업데이트**: 2026년 3월 19일
