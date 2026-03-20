import React, { useState } from 'react';
import Header from '@/components/Header';
import PpompuNew from '@/components/PpompuNew';
import NaverStyleGuide from '@/components/NaverStyleGuide';
import StyleComparison from '@/components/StyleComparison';
import './App.css';

type DemoType = 'new' | 'components' | 'guide' | 'comparison';

function App() {
  const [currentDemo, setCurrentDemo] = useState<DemoType>('new');

  if (currentDemo === 'new') {
    return (
      <div className="app ppomppu-app">
        <div className="demo-switcher">
          <button onClick={() => setCurrentDemo('comparison')}>🎨 비교</button>
          <button onClick={() => setCurrentDemo('guide')}>📋 가이드</button>
          <button onClick={() => setCurrentDemo('components')}>← 컴포넌트</button>
        </div>
        <PpompuNew />
      </div>
    );
  }

  if (currentDemo === 'guide') {
    return (
      <div className="app">
        <div className="demo-switcher">
          <button onClick={() => setCurrentDemo('new')}>뽐뿌 NEW 페이지 →</button>
          <button onClick={() => setCurrentDemo('comparison')}>🎨 비교 페이지 →</button>
        </div>
        <NaverStyleGuide />
      </div>
    );
  }

  if (currentDemo === 'comparison') {
    return (
      <div className="app">
        <div className="demo-switcher">
          <button onClick={() => setCurrentDemo('guide')}>← 스타일 가이드</button>
          <button onClick={() => setCurrentDemo('new')}>뽐뿌 NEW 페이지 →</button>
        </div>
        <StyleComparison />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <section className="container">
          <h2>네이버 다크모드 마이그레이션</h2>
          <p className="text-secondary">뽐뿌 모바일을 네이버 다크모드 스타일로 마이그레이션했습니다.</p>

          <div className="demo-grid">
            {/* 카드 예제 */}
            <div className="card demo-card">
              <h3>카드 컴포넌트</h3>
              <p>이것은 다크모드가 적용된 카드 컴포넌트입니다.</p>
              <p className="text-tertiary">추가 정보는 이렇게 표시됩니다.</p>
            </div>

            {/* 버튼 예제 */}
            <div className="card demo-card">
              <h3>버튼 컴포넌트</h3>
              <div className="button-group">
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
              </div>
            </div>

            {/* 알림 예제 */}
            <div className="card demo-card">
              <h3>알림 메시지</h3>
              <div className="alert success">✓ 성공 메시지</div>
              <div className="alert error">✗ 에러 메시지</div>
              <div className="alert warning">⚠ 경고 메시지</div>
              <div className="alert info">ℹ 정보 메시지</div>
            </div>

            {/* 텍스트 예제 */}
            <div className="card demo-card">
              <h3>텍스트 색상</h3>
              <p className="text-primary">Primary 텍스트 (강조)</p>
              <p className="text-secondary">Secondary 텍스트 (일반)</p>
              <p className="text-tertiary">Tertiary 텍스트 (약함)</p>
              <p className="text-accent">Accent 텍스트 (네이버 그린)</p>
            </div>

            {/* 폼 예제 */}
            <div className="card demo-card">
              <h3>폼 요소</h3>
              <input type="text" placeholder="입력창" className="form-input" />
              <select className="form-input">
                <option>선택지 1</option>
                <option>선택지 2</option>
              </select>
            </div>

            {/* 링크 예제 */}
            <div className="card demo-card">
              <h3>링크</h3>
              <a href="#example">링크 색상 (네이버 시안)</a>
              <a href="#visited">방문한 링크</a>
            </div>
          </div>

          {/* 색상 팔레트 */}
          <section className="color-palette">
            <h3>색상 팔레트 (다크모드)</h3>
            <div className="colors">
              <div className="color-box">
                <div className="color-swatch" style={{ backgroundColor: '#111111' }}></div>
                <p>#111111 (Primary BG)</p>
              </div>
              <div className="color-box">
                <div className="color-swatch" style={{ backgroundColor: '#1A1A1A' }}></div>
                <p>#1A1A1A (Secondary BG)</p>
              </div>
              <div className="color-box">
                <div className="color-swatch" style={{ backgroundColor: '#333333' }}></div>
                <p>#333333 (Border)</p>
              </div>
              <div className="color-box">
                <div className="color-swatch" style={{ backgroundColor: '#00C73C' }}></div>
                <p>#00C73C (Accent)</p>
              </div>
              <div className="color-box">
                <div className="color-swatch" style={{ backgroundColor: '#00D5FF' }}></div>
                <p>#00D5FF (Link)</p>
              </div>
              <div className="color-box">
                <div className="color-swatch" style={{ backgroundColor: '#FF6B6B' }}></div>
                <p>#FF6B6B (Error)</p>
              </div>
            </div>
          </section>

          {/* 마이그레이션 상태 */}
          <section className="migration-status">
            <h3>마이그레이션 완료 항목</h3>
            <ul className="checklist">
              <li>✅ CSS 변수 시스템 구축</li>
              <li>✅ 다크모드 훅 (useDarkMode) 구현</li>
              <li>✅ 테마 토글 컴포넌트 생성</li>
              <li>✅ 뽐뿌 NEW 페이지 구현</li>
              <li>✅ 원본 vs 네이버 스타일 비교</li>
              <li>✅ Header 컴포넌트 마이그레이션</li>
            </ul>
          </section>
        </section>
      </main>
      <div className="demo-switcher">
        <button onClick={() => setCurrentDemo('guide')}>📋 스타일 가이드</button>
        <button onClick={() => setCurrentDemo('comparison')}>🎨 비교 페이지</button>
        <button onClick={() => setCurrentDemo('new')}>뽐뿌 NEW 페이지 →</button>
      </div>
    </div>
  );
}

export default App;
