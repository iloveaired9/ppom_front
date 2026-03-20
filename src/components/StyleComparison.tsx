import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import './StyleComparison.css';

interface ColorPalette {
  name: string;
  colors: Array<{
    name: string;
    hex: string;
    description: string;
  }>;
}

const StyleComparison: React.FC = () => {
  const { isDark } = useTheme();

  const ppompuPalette: ColorPalette = {
    name: '뽐뿌 스타일 (원본)',
    colors: [
      { name: 'Background', hex: isDark ? '#1A1A1A' : '#FFFFFF', description: '배경색' },
      { name: 'Text Primary', hex: isDark ? '#FFFFFF' : '#333333', description: '주요 텍스트' },
      { name: 'Text Secondary', hex: isDark ? '#B0B0B0' : '#666666', description: '보조 텍스트' },
      { name: 'Accent', hex: '#FF6B35', description: '강조색 (주황)' },
      { name: 'Border', hex: isDark ? '#333333' : '#EEEEEE', description: '테두리' },
      { name: 'Hover', hex: isDark ? '#2A2A2A' : '#F5F5F5', description: '호버 상태' },
    ],
  };

  const naverPalette: ColorPalette = {
    name: '네이버 스타일 (신규)',
    colors: [
      { name: 'Background', hex: isDark ? '#111111' : '#FFFFFF', description: '배경색' },
      { name: 'Text Primary', hex: isDark ? '#FFFFFF' : '#000000', description: '주요 텍스트' },
      { name: 'Text Secondary', hex: isDark ? '#A8A8A8' : '#666666', description: '보조 텍스트' },
      { name: 'Accent', hex: '#00C73C', description: '강조색 (그린)' },
      { name: 'Link', hex: '#00D5FF', description: '링크색 (시안)' },
      { name: 'Error', hex: '#FF6B6B', description: '에러색 (빨강)' },
    ],
  };

  return (
    <div className={`style-comparison ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <h1>🎨 뽐뿌 vs 네이버 스타일 비교</h1>
      <p className="subtitle">뽐뿌 원본 디자인과 네이버 스타일의 색상 및 컴포넌트 비교</p>

      {/* 색상 팔레트 비교 */}
      <section className="comparison-section">
        <h2>색상 팔레트 비교</h2>
        <div className="palette-container">
          {/* 뽐뿌 스타일 */}
          <div className="palette-group">
            <h3 className="palette-title">{ppompuPalette.name}</h3>
            <div className="color-grid">
              {ppompuPalette.colors.map((color) => (
                <div key={color.name} className="color-item">
                  <div className="color-preview" style={{ backgroundColor: color.hex }}></div>
                  <div className="color-info">
                    <p className="color-name">{color.name}</p>
                    <p className="color-hex">{color.hex}</p>
                    <p className="color-desc">{color.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 네이버 스타일 */}
          <div className="palette-group">
            <h3 className="palette-title">{naverPalette.name}</h3>
            <div className="color-grid">
              {naverPalette.colors.map((color) => (
                <div key={color.name} className="color-item">
                  <div className="color-preview" style={{ backgroundColor: color.hex }}></div>
                  <div className="color-info">
                    <p className="color-name">{color.name}</p>
                    <p className="color-hex">{color.hex}</p>
                    <p className="color-desc">{color.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 컴포넌트 비교 */}
      <section className="comparison-section">
        <h2>컴포넌트 비교</h2>

        {/* 헤더 비교 */}
        <div className="component-comparison">
          <h3>헤더 컴포넌트</h3>
          <div className="component-grid">
            <div className="component-example ppomppu-style">
              <div className="example-header">
                <span className="menu-icon">☰</span>
                <span className="title">뽐뿌</span>
                <span className="search-icon">🔍</span>
              </div>
            </div>
            <div className="component-example naver-style">
              <div className="example-header">
                <span className="menu-icon">☰</span>
                <span className="title">NAVER</span>
                <span className="search-icon">🔍</span>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 비교 */}
        <div className="component-comparison">
          <h3>버튼 컴포넌트</h3>
          <div className="component-grid">
            <div className="component-example ppomppu-style">
              <button className="ppomppu-btn-primary">확인</button>
              <button className="ppomppu-btn-secondary">취소</button>
              <button className="ppomppu-btn-accent">특별</button>
            </div>
            <div className="component-example naver-style">
              <button className="naver-btn-primary">확인</button>
              <button className="naver-btn-secondary">취소</button>
              <button className="naver-btn-accent">특별</button>
            </div>
          </div>
        </div>

        {/* 카드 비교 */}
        <div className="component-comparison">
          <h3>카드 컴포넌트</h3>
          <div className="component-grid">
            <div className="component-example ppomppu-style">
              <div className="card">
                <h4>제목</h4>
                <p>카드 내용이 표시됩니다.</p>
                <small>작은 텍스트</small>
              </div>
            </div>
            <div className="component-example naver-style">
              <div className="card">
                <h4>제목</h4>
                <p>카드 내용이 표시됩니다.</p>
                <small>작은 텍스트</small>
              </div>
            </div>
          </div>
        </div>

        {/* 입력 필드 비교 */}
        <div className="component-comparison">
          <h3>입력 필드</h3>
          <div className="component-grid">
            <div className="component-example ppomppu-style">
              <input type="text" placeholder="뽐뿌 스타일 입력" className="input" />
              <select className="input">
                <option>선택지</option>
              </select>
            </div>
            <div className="component-example naver-style">
              <input type="text" placeholder="네이버 스타일 입력" className="input" />
              <select className="input">
                <option>선택지</option>
              </select>
            </div>
          </div>
        </div>

        {/* 배지 비교 */}
        <div className="component-comparison">
          <h3>배지</h3>
          <div className="component-grid">
            <div className="component-example ppomppu-style">
              <span className="badge-primary">NEW</span>
              <span className="badge-accent">HOT</span>
              <span className="badge-secondary">추천</span>
            </div>
            <div className="component-example naver-style">
              <span className="badge-primary">NEW</span>
              <span className="badge-accent">HOT</span>
              <span className="badge-secondary">추천</span>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 차이점 */}
      <section className="comparison-section">
        <h2>주요 차이점</h2>
        <div className="differences-grid">
          <div className="difference-item">
            <h4>강조색</h4>
            <p><strong>뽐뿌:</strong> 주황색 (#FF6B35)</p>
            <p><strong>네이버:</strong> 초록색 (#00C73C)</p>
          </div>
          <div className="difference-item">
            <h4>다크 모드 배경</h4>
            <p><strong>뽐뿌:</strong> #1A1A1A (밝은 검정)</p>
            <p><strong>네이버:</strong> #111111 (더 어두운 검정)</p>
          </div>
          <div className="difference-item">
            <h4>텍스트 색상</h4>
            <p><strong>뽐뿌:</strong> 3단계 (Primary, Secondary, Tertiary)</p>
            <p><strong>네이버:</strong> 4단계 (Primary, Secondary, Tertiary + Link)</p>
          </div>
          <div className="difference-item">
            <h4>링크 색상</h4>
            <p><strong>뽐뿌:</strong> 별도 정의 없음</p>
            <p><strong>네이버:</strong> 시안색 (#00D5FF)</p>
          </div>
        </div>
      </section>

      {/* 마이그레이션 가이드 */}
      <section className="comparison-section">
        <h2>마이그레이션 가이드</h2>
        <div className="migration-guide">
          <div className="guide-item">
            <h4>1. 색상 교체</h4>
            <ul>
              <li>#FF6B35 → #00C73C (강조색)</li>
              <li>#1A1A1A → #111111 (다크 배경)</li>
            </ul>
          </div>
          <div className="guide-item">
            <h4>2. 링크 스타일 추가</h4>
            <ul>
              <li>네이버 스타일 링크: #00D5FF</li>
              <li>일관된 링크 스타일 적용</li>
            </ul>
          </div>
          <div className="guide-item">
            <h4>3. 다크 모드 최적화</h4>
            <ul>
              <li>충분한 명도 대비 (WCAG AA 기준)</li>
              <li>테스트: dark + light 모드 모두 검증</li>
            </ul>
          </div>
          <div className="guide-item">
            <h4>4. 점진적 마이그레이션</h4>
            <ul>
              <li>새로운 페이지부터 네이버 스타일 적용</li>
              <li>기존 페이지는 호환성 유지</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StyleComparison;
