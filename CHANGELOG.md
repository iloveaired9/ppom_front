# 변경 로그 (Changelog)

모든 주목할 만한 변경사항을 이 파일에 문서화합니다.

형식은 [Keep a Changelog](https://keepachangelog.com/)를 따릅니다.

## [1.0.0] - 2026-03-19

### 🎉 초기 릴리스

완전한 다크모드 기능을 갖춘 뽐뿌 모바일 마이그레이션 프로젝트 첫 공개 버전입니다.

### ✨ 추가된 기능

#### 1. ThemeContext (NEW - 핵심 개선사항)
- **파일**: `src/context/ThemeContext.tsx`
- **용도**: 전역 테마 상태 관리
- **주요 기능**:
  - React Context API를 이용한 중앙 집중식 상태 관리
  - `ThemeProvider` 컴포넌트로 앱 전체 감싸기
  - `useTheme()` 커스텀 훅 제공
  - 모든 하위 컴포넌트가 동일한 테마 상태 공유

#### 2. 다크모드 토글 기능
- 🌙 라이트모드 ↔ ☀️ 다크모드 전환
- ThemeToggle 컴포넌트에서 즉시 토글 가능
- 모든 스타일(원본/네이버)에서 작동
- 사용자 선택 localStorage에 저장

#### 3. 스타일 전환 기능
- 원본 뽐뿌 스타일 ↔ 네이버 스타일 전환
- 각 스타일별 라이트/다크모드 CSS 규칙
- 스타일 전환 시 다크모드 설정 유지

#### 4. 시스템 설정 감지
- `prefers-color-scheme` 미디어 쿼리 감지
- 사용자 OS 설정에 따른 자동 다크모드 적용
- "Auto" 모드에서 시스템 설정 자동 따름

#### 5. localStorage 기반 상태 영속화
- 사용자 선택사항 저장 (`theme-mode` 키)
- 페이지 새로고침 후에도 선택한 모드 유지
- 초기 로드 시 저장된 선택 우선 적용

### 📝 수정사항

#### PpompuNew.tsx
- ✅ `useDarkMode` import → `useTheme` context 훅으로 변경
- ✅ `const { isDark } = useTheme();` 적용
- ✅ 컨테이너 클래스에 `dark-mode`/`light-mode` 동적 적용
- ✅ 스타일 전환 버튼 추가 (원본 vs 네이버)

#### ThemeToggle.tsx
- ✅ `useDarkMode` import → `useTheme` context 훅으로 변경
- ✅ `const { isDark, isLoading, setTheme } = useTheme();` 적용
- ✅ Context 기반 상태 관리로 변경

#### main.tsx
- ✅ `ThemeProvider` 임포트 추가
- ✅ `<App />` 을 `<ThemeProvider>로 감싸기
- ✅ `defaultMode: 'auto'` 옵션 설정

#### .claude/launch.json
- ✅ `npx vite` → `npm run dev` 로 변경
- ✅ 개발 서버 포트 설정 명확화

### 🐛 버그 수정

#### 다크모드 토글이 원본 뽐뿌 스타일에서 작동하지 않는 문제
- **원인**: 각 컴포넌트가 별도의 `useDarkMode()` 훅 인스턴스 사용
- **해결**: ThemeContext 도입으로 전역 상태 공유
- **상태**: ✅ 완전히 해결됨

#### 스타일 전환 시 다크모드 상태 초기화 문제
- **원인**: 로컬 상태 관리의 한계
- **해결**: localStorage + Context 기반 영속화
- **상태**: ✅ 완전히 해결됨

### 🎨 스타일 개선

#### PpompuNew.css
- ✅ `.ppomppu-original-style.light-mode` 규칙 추가
  - 라이트 배경, 어두운 텍스트, 오렌지 액센트

- ✅ `.ppomppu-original-style.dark-mode` 규칙 추가
  - 어두운 배경, 밝은 텍스트, 오렌지 액센트 유지

- ✅ `.ppomppu-naver-style` 다크모드 스타일 완성
  - CSS 변수 기반 동적 색상
  - 네이버 그린 액센트 (#00C73C)

### 📦 의존성 (변경 없음)
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

### 📚 문서 추가

#### README.md (새로 작성)
- 프로젝트 개요 및 목표
- 주요 기능 설명
- 설치 및 실행 방법
- 파일 구조
- 색상 팔레트
- 기술 스택

#### IMPLEMENTATION_DETAILS.md (새로 작성)
- 구현 과정의 진화
- 코드 구조 분석
- 상태 흐름도
- 테스트 시나리오
- 주의사항 및 최적화 팁

#### CHANGELOG.md (이 파일)
- 버전별 변경사항 기록

### 🔄 마이그레이션 경로

**v0.x → v1.0.0**

기존 코드에서 마이그레이션하려면:

1. `src/context/ThemeContext.tsx` 생성
2. `main.tsx`에서 `<App />`을 `<ThemeProvider>`로 감싸기
3. 컴포넌트에서 `useDarkMode` → `useTheme` 변경
4. CSS는 기존대로 유지

```typescript
// Before
import { useDarkMode } from '@/hooks/useDarkMode';
const { isDark } = useDarkMode();

// After
import { useTheme } from '@/context/ThemeContext';
const { isDark } = useTheme();
```

### ✅ 검증된 기능

| 기능 | 원본 라이트 | 원본 다크 | 네이버 라이트 | 네이버 다크 |
|------|-----------|---------|-------------|----------|
| 다크모드 토글 | ✅ | ✅ | ✅ | ✅ |
| 스타일 전환 | ✅ | ✅ | ✅ | ✅ |
| localStorage 저장 | ✅ | ✅ | ✅ | ✅ |
| 시스템 감지 | ✅ | ✅ | ✅ | ✅ |
| 페이지 새로고침 유지 | ✅ | ✅ | ✅ | ✅ |
| 색상 정확성 | ✅ | ✅ | ✅ | ✅ |

### 🚀 성능 최적화

- Context 기반 선택적 리렌더링
- localStorage 기반 빠른 상태 복구
- CSS 변수로 효율적인 스타일 적용
- 불필요한 DOM 조작 최소화

### 🌍 브라우저 호환성

| 브라우저 | 버전 | 상태 |
|---------|------|------|
| Chrome | 최신 | ✅ |
| Firefox | 최신 | ✅ |
| Safari | 최신 | ✅ |
| Edge | 최신 | ✅ |
| IE | 11 | ❌ |

### 📱 반응형 테스트

- ✅ 데스크톱 (1024px+)
- ✅ 태블릿 (768px - 1023px)
- ✅ 모바일 (375px - 767px)

### 🔍 코드 품질

- TypeScript 엄격 모드 적용
- ESLint 규칙 준수
- 타입 안정성 보장
- 주석 및 문서화 완성

### 🎯 알려진 제한사항

1. **다중 탭 동기화 미지원**
   - localStorage 기반이라 다른 탭의 변경이 실시간 반영 안됨
   - BroadcastChannel API로 개선 가능

2. **IE11 미지원**
   - Proxy, Symbol 등 미지원 기능 사용
   - Polyfill 추가 시 지원 가능

3. **서버 사이드 렌더링(SSR) 미지원**
   - 클라이언트 사이드 전용
   - Next.js 등으로 마이그레이션 시 별도 처리 필요

### 📅 향후 계획

- [ ] Dark mode 애니메이션 개선
- [ ] 커스텀 색상 팔레트 지원
- [ ] 다중 탭 동기화 (BroadcastChannel)
- [ ] 성능 메트릭 추가
- [ ] E2E 테스트 추가
- [ ] 접근성(A11y) 개선
- [ ] PWA 지원

### 🙏 감사의 말

- React 팀의 Context API
- MDN의 prefers-color-scheme 문서
- 뽐뿌 커뮤니티

---

**릴리스 날짜**: 2026년 3월 19일
**유지보수자**: Claude AI

이전 버전들은 [GitHub Releases](https://github.com/iloveaired9/ppom_front/releases)에서 확인할 수 있습니다.
