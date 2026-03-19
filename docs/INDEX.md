# 📚 문서 목록 (Documentation Index)

뽐뿌 모바일 다크모드 마이그레이션 프로젝트의 모든 문서를 한 곳에서 찾을 수 있습니다.

## 📖 주요 문서

### 1. 📋 [IMPLEMENTATION_DETAILS.md](./IMPLEMENTATION_DETAILS.md)
**기술 구현 상세 설명**

- 다크모드 구현의 진화 과정 (Phase 1 → Phase 2)
- ThemeContext 코드 분석
- useDarkMode 훅의 동작 원리
- CSS 스타일 시스템
- 상태 흐름도
- 테스트 시나리오
- 성능 최적화

**읽을 사람**: 개발자, 코드를 수정해야 하는 사람

**읽는 데 걸리는 시간**: 약 20-30분

---

### 2. 📝 [CHANGELOG.md](./CHANGELOG.md)
**버전 히스토리 및 변경사항**

- v1.0.0 초기 릴리스 상세
- 추가된 기능 목록
- 수정사항 설명
- 버그 수정 내역
- 성능 최적화
- 검증된 기능 체크리스트
- 브라우저 호환성
- 향후 계획

**읽을 사람**: 프로젝트 관리자, 버전 추적이 필요한 사람

**읽는 데 걸리는 시간**: 약 15-20분

---

### 3. 🔧 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
**문제 해결 가이드**

- 6가지 일반적인 문제와 해결책
- 진단 단계별 설명
- CSS 관련 문제
- 모바일 관련 문제
- 개발자 도구 활용법
- 성능 디버깅
- 버그 리포트 방법

**읽을 사람**: 문제가 발생한 사람, 디버깍이 필요한 개발자

**읽는 데 걸리는 시간**: 필요에 따라 5-15분

---

## 📚 참고 자료 (Reference)

### [REFERENCE_DARKMODE_COMPARISON.md](./REFERENCE_DARKMODE_COMPARISON.md)
**네이버 vs 뽐뿌 다크모드 비교 분석**

프로젝트 진행 중 수집한 분석 자료입니다.
- 색상 팔레트 비교
- 디자인 요소 분석
- 마이그레이션 계획

### [REFERENCE_ANALYSIS.md](./REFERENCE_ANALYSIS.md)
**뽐뿌 vs 네이버 다크모드 분석 보고서**

구현 기반의 상세 비교 분석입니다.
- 시각적 차이점
- 사용자 경험 비교
- 기술 구현 내용

---

## 🎯 상황별 문서 선택 가이드

### "프로젝트를 처음 알아보고 싶어요"
```
1️⃣  프로젝트 루트의 README.md 읽기
     (프로젝트 개요, 설치 방법, 파일 구조)
```

### "코드를 이해하고 수정하고 싶어요"
```
1️⃣  README.md로 전체 개요 파악
     ↓
2️⃣  IMPLEMENTATION_DETAILS.md로 기술 이해
     ↓
3️⃣  소스 코드 직접 읽기
```

### "버전 관리를 하고 싶어요"
```
1️⃣  CHANGELOG.md 확인
     (버전별 변경사항, 새로운 기능, 버그 수정)
     ↓
2️⃣  필요하면 커밋 로그 확인
     git log --oneline
```

### "문제가 발생했어요"
```
1️⃣  TROUBLESHOOTING.md에서 증상 찾기
     ↓
2️⃣  진단 단계 실행
     ↓
3️⃣  해결책 적용
     ↓
4️⃣  문제 해결 안 되면 버그 리포트
```

---

## 📊 문서별 세부 정보

| 문서 | 길이 | 섹션 수 | 대상 | 난이도 |
|------|------|--------|------|--------|
| README.md | ~400줄 | 8 | 모두 | 초급 |
| IMPLEMENTATION_DETAILS.md | ~600줄 | 10 | 개발자 | 고급 |
| CHANGELOG.md | ~450줄 | 12 | 관리자 | 중급 |
| TROUBLESHOOTING.md | ~550줄 | 6 | 모두 | 중급 |

---

## 🔍 주제별 정보 찾기

### 다크모드 구현 방법
- 📖 [IMPLEMENTATION_DETAILS.md](./IMPLEMENTATION_DETAILS.md) → "ThemeContext" 섹션
- 📖 [IMPLEMENTATION_DETAILS.md](./IMPLEMENTATION_DETAILS.md) → "useDarkMode Hook" 섹션

### 스타일 전환 기능
- 📖 [README.md](../README.md) → "스타일 전환" 섹션
- 📖 [IMPLEMENTATION_DETAILS.md](./IMPLEMENTATION_DETAILS.md) → "PpompuNew.tsx" 섹션

### 색상 팔레트
- 📖 [README.md](../README.md) → "색상 팔레트" 섹션
- 📖 [CHANGELOG.md](./CHANGELOG.md) → "스타일 개선" 섹션

### localStorage 구조
- 📖 [IMPLEMENTATION_DETAILS.md](./IMPLEMENTATION_DETAILS.md) → "localStorage 구조" 섹션
- 📖 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) → "페이지 새로고침 후 다크모드 초기화" 섹션

### 개발자 도구 사용법
- 📖 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) → "개발자 도구 활용" 섹션

### 성능 최적화
- 📖 [IMPLEMENTATION_DETAILS.md](./IMPLEMENTATION_DETAILS.md) → "주의사항" 섹션
- 📖 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) → "성능 디버깅" 섹션

### 브라우저 호환성
- 📖 [CHANGELOG.md](./CHANGELOG.md) → "브라우저 호환성" 섹션
- 📖 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) → "모바일 관련 문제" 섹션

---

## 🚀 빠른 시작

### 1단계: 프로젝트 이해
```bash
# 루트의 README.md 읽기
cat ../README.md
```

### 2단계: 설치 및 실행
```bash
npm install
npm run dev
```

### 3단계: 기술 이해
```bash
# 이 파일 읽기
cat INDEX.md

# IMPLEMENTATION_DETAILS.md 읽기
cat IMPLEMENTATION_DETAILS.md
```

### 4단계: 문제 해결
```bash
# 문제가 있으면 TROUBLESHOOTING.md 읽기
cat TROUBLESHOOTING.md
```

---

## 📚 문서 구조

```
ppom_front/
├── README.md                    ← 프로젝트 메인 문서
├── docs/
│   ├── INDEX.md                 ← 이 파일 (문서 목록)
│   ├── IMPLEMENTATION_DETAILS.md (기술 상세)
│   ├── CHANGELOG.md             (버전 히스토리)
│   └── TROUBLESHOOTING.md       (문제 해결)
├── src/
└── package.json
```

---

## 💡 팁

### 빠르게 답을 찾고 싶을 때
1. Ctrl+F (Cmd+F)로 문서 내 검색
2. 키워드 입력 (예: "localStorage", "다크모드", "색상")

### 깊이 있게 공부하고 싶을 때
1. 순서대로 문서 읽기
2. 코드 직접 읽기
3. 수정하고 테스트하기

### 특정 버그를 찾고 싶을 때
1. TROUBLESHOOTING.md에서 증상 검색
2. 진단 단계 실행
3. 해결책 적용

---

## 🎯 문서 유지보수

이 문서들은 프로젝트와 함께 유지보수됩니다:

- ✅ 코드 변경 시 문서 업데이트
- ✅ 새 기능 추가 시 CHANGELOG.md 업데이트
- ✅ 버그 수정 시 TROUBLESHOOTING.md 업데이트

---

## 📞 추가 도움이 필요할 때

1. **이 INDEX.md에서 관련 문서 찾기**
2. **해당 문서의 관련 섹션 읽기**
3. **TROUBLESHOOTING.md의 "추가 지원" 섹션 참고**
4. **[GitHub Issues](https://github.com/iloveaired9/ppom_front/issues)에서 질문하기**

---

**마지막 업데이트**: 2026년 3월 19일
