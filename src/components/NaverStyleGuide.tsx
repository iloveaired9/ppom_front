import React, { useState } from 'react';
import './NaverStyleGuide.css';

export const NaverStyleGuide: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  const naverColors = {
    dark: {
      bgPrimary: '#111111',
      bgSecondary: '#1A1A1A',
      bgTertiary: '#333333',
      textPrimary: '#FFFFFF',
      textSecondary: '#CCCCCC',
      textTertiary: '#999999',
      accent: '#00C73C',
      link: '#00D5FF',
      error: '#FF6B6B',
      divider: '#333333',
      border: '#333333',
    },
    light: {
      bgPrimary: '#FFFFFF',
      bgSecondary: '#F8F8F8',
      bgTertiary: '#E5E5E5',
      textPrimary: '#333333',
      textSecondary: '#666666',
      textTertiary: '#999999',
      accent: '#00C73C',
      link: '#0066CC',
      error: '#FF5555',
      divider: '#E5E5E5',
      border: '#D5D5D5',
    },
  };

  const colors = isDark ? naverColors.dark : naverColors.light;

  const ColorBox = ({
    name,
    value,
    description,
  }: {
    name: string;
    value: string;
    description: string;
  }) => (
    <div className="color-box">
      <div
        className="color-swatch"
        style={{
          backgroundColor: value,
          border: `1px solid ${isDark ? '#444' : '#ddd'}`,
        }}
      />
      <div className="color-info">
        <div className="color-name">{name}</div>
        <div className="color-value">{value}</div>
        <div className="color-description">{description}</div>
      </div>
    </div>
  );

  return (
    <div
      className="naver-style-guide"
      style={{
        backgroundColor: colors.bgPrimary,
        color: colors.textPrimary,
      }}
    >
      {/* Header */}
      <header className="guide-header">
        <div className="guide-header-content">
          <h1 style={{ color: colors.accent }}>네이버 스타일 다크모드 가이드</h1>
          <p style={{ color: colors.textSecondary }}>
            뽐뿌 모바일의 네이버 스타일 디자인 시스템
          </p>
        </div>

        {/* Theme Toggle */}
        <button
          className="theme-toggle-btn"
          onClick={() => setIsDark(!isDark)}
          style={{
            backgroundColor: colors.accent,
            color: '#FFFFFF',
          }}
        >
          {isDark ? '☀️ 라이트모드' : '🌙 다크모드'}
        </button>
      </header>

      {/* Main Content */}
      <main className="guide-content">
        {/* Color Palette Section */}
        <section className="guide-section">
          <h2 style={{ color: colors.accent }}>🎨 색상 팔레트</h2>
          <p style={{ color: colors.textSecondary }}>
            네이버 스타일 다크모드에서 사용되는 모든 색상입니다.
          </p>

          <div className="colors-grid">
            <ColorBox
              name="Primary Background"
              value={colors.bgPrimary}
              description="페이지 배경색"
            />
            <ColorBox
              name="Secondary Background"
              value={colors.bgSecondary}
              description="카드, 컨테이너 배경"
            />
            <ColorBox
              name="Tertiary Background"
              value={colors.bgTertiary}
              description="버튼 호버, 입력 필드"
            />
            <ColorBox
              name="Primary Text"
              value={colors.textPrimary}
              description="주요 텍스트"
            />
            <ColorBox
              name="Secondary Text"
              value={colors.textSecondary}
              description="보조 텍스트"
            />
            <ColorBox
              name="Tertiary Text"
              value={colors.textTertiary}
              description="약한 텍스트, 메타정보"
            />
            <ColorBox
              name="Accent (Primary)"
              value={colors.accent}
              description="강조, 버튼, 액션"
            />
            <ColorBox
              name="Link"
              value={colors.link}
              description="링크, 강조 요소"
            />
            <ColorBox
              name="Error"
              value={colors.error}
              description="에러, 경고 메시지"
            />
            <ColorBox
              name="Divider"
              value={colors.divider}
              description="구분선"
            />
          </div>
        </section>

        {/* Component Examples */}
        <section className="guide-section">
          <h2 style={{ color: colors.accent }}>🧩 컴포넌트 예시</h2>

          {/* Header Example */}
          <div className="component-example">
            <h3 style={{ color: colors.textPrimary }}>헤더</h3>
            <div
              style={{
                backgroundColor: colors.bgSecondary,
                padding: '16px',
                borderRadius: '8px',
                marginTop: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: '700' }}>
                  <span style={{ color: colors.accent }}>뽐뿌</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      color: colors.textPrimary,
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                  >
                    🌙
                  </button>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      color: colors.textPrimary,
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                  >
                    🔔
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Button Example */}
          <div className="component-example">
            <h3 style={{ color: colors.textPrimary }}>버튼</h3>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginTop: '12px',
                flexWrap: 'wrap',
              }}
            >
              <button
                style={{
                  backgroundColor: colors.accent,
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Primary Button
              </button>
              <button
                style={{
                  backgroundColor: colors.bgTertiary,
                  color: colors.textPrimary,
                  border: `1px solid ${colors.divider}`,
                  padding: '10px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Secondary Button
              </button>
            </div>
          </div>

          {/* Tab Example */}
          <div className="component-example">
            <h3 style={{ color: colors.textPrimary }}>탭 메뉴</h3>
            <div
              style={{
                display: 'flex',
                borderBottom: `1px solid ${colors.divider}`,
                marginTop: '12px',
              }}
            >
              {['인기 / HOT', '최신글', '장터최신글'].map((tab, idx) => (
                <button
                  key={idx}
                  style={{
                    flex: 1,
                    padding: '12px 8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: idx === 0 ? colors.accent : colors.textTertiary,
                    borderBottom: idx === 0 ? `3px solid ${colors.accent}` : 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Post Item Example */}
          <div className="component-example">
            <h3 style={{ color: colors.textPrimary }}>포스트 아이템</h3>
            <div
              style={{
                backgroundColor: colors.bgSecondary,
                padding: '12px 16px',
                borderBottom: `1px solid ${colors.divider}`,
                marginTop: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{
                      color: colors.textPrimary,
                      fontSize: '14px',
                      fontWeight: '500',
                      marginBottom: '4px',
                    }}
                  >
                    뽐뿌 모바일 페이지 다크모드 마이그레이션
                  </div>
                  <div
                    style={{
                      color: colors.textTertiary,
                      fontSize: '12px',
                    }}
                  >
                    [기술] • 20:45:01
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      color: colors.textTertiary,
                      fontSize: '12px',
                      marginBottom: '4px',
                    }}
                  >
                    💬 12 👍 45
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Example */}
          <div className="component-example">
            <h3 style={{ color: colors.textPrimary }}>입력 필드</h3>
            <input
              type="text"
              placeholder="검색어 입력"
              style={{
                width: '100%',
                padding: '8px 12px',
                backgroundColor: colors.bgSecondary,
                border: `1px solid ${colors.divider}`,
                borderRadius: '4px',
                color: colors.textPrimary,
                fontSize: '14px',
                marginTop: '12px',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.accent;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = colors.divider;
              }}
            />
          </div>

          {/* Badge Example */}
          <div className="component-example">
            <h3 style={{ color: colors.textPrimary }}>뱃지</h3>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <span
                style={{
                  backgroundColor: colors.accent,
                  color: '#FFFFFF',
                  padding: '2px 6px',
                  borderRadius: '2px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}
              >
                공지
              </span>
              <span
                style={{
                  backgroundColor: colors.bgTertiary,
                  color: colors.textPrimary,
                  padding: '2px 6px',
                  borderRadius: '2px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}
              >
                신규
              </span>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="guide-section">
          <h2 style={{ color: colors.accent }}>📝 타이포그래피</h2>

          <div style={{ marginTop: '16px' }}>
            <h3
              style={{
                color: colors.textPrimary,
                fontSize: '20px',
                fontWeight: '700',
                margin: '12px 0',
              }}
            >
              헤더 3 (Heading 3)
            </h3>
            <p
              style={{
                color: colors.textPrimary,
                fontSize: '16px',
                fontWeight: '500',
                margin: '12px 0',
              }}
            >
              서브헤더 (Subheading)
            </p>
            <p style={{ color: colors.textPrimary, fontSize: '14px', margin: '12px 0' }}>
              본문 텍스트 (Body Text) - 일반적인 콘텐츠 텍스트입니다. 읽기 좋은 크기와
              색상으로 설정되어 있습니다.
            </p>
            <p style={{ color: colors.textSecondary, fontSize: '12px', margin: '12px 0' }}>
              캡션 텍스트 (Caption) - 추가 정보나 메타데이터를 표시합니다.
            </p>
          </div>
        </section>

        {/* Usage Guidelines Section */}
        <section className="guide-section">
          <h2 style={{ color: colors.accent }}>📋 사용 가이드</h2>

          <div style={{ marginTop: '16px' }}>
            <h3 style={{ color: colors.textPrimary, fontSize: '16px', fontWeight: '600' }}>
              ✅ 다크모드 사용 시 체크사항
            </h3>
            <ul style={{ color: colors.textSecondary, marginLeft: '20px', marginTop: '12px' }}>
              <li>
                주요 텍스트는 {colors.textPrimary}를 사용하세요 (높은 대비도)
              </li>
              <li>
                강조 요소는 네이버 그린 ({colors.accent})을 사용하세요
              </li>
              <li>
                배경과 텍스트의 명도 차이는 최소 4.5:1 이상이어야 합니다
              </li>
              <li>
                정보 전달은 색상만으로 하지 말고 텍스트나 아이콘으로도 표시하세요
              </li>
              <li>
                구분선({colors.divider})으로 시각적 계층 구조를 명확히 하세요
              </li>
            </ul>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3 style={{ color: colors.textPrimary, fontSize: '16px', fontWeight: '600' }}>
              ❌ 피해야 할 것
            </h3>
            <ul
              style={{
                color: colors.textSecondary,
                marginLeft: '20px',
                marginTop: '12px',
              }}
            >
              <li>밝은 색상의 배경에 밝은 색상의 텍스트 조합</li>
              <li>너무 많은 강조 색상 사용 (주요 액션만 강조)</li>
              <li>순수한 흰색(#FFFFFF)이나 검은색(#000000) 사용</li>
              <li>투명도만으로 계층 구조 표현</li>
            </ul>
          </div>
        </section>

        {/* Quick Reference Section */}
        <section className="guide-section">
          <h2 style={{ color: colors.accent }}>🎯 빠른 참조</h2>

          <div
            style={{
              backgroundColor: colors.bgSecondary,
              padding: '16px',
              borderRadius: '8px',
              marginTop: '16px',
              fontFamily: 'monospace',
              fontSize: '12px',
            }}
          >
            <div style={{ color: colors.textPrimary, marginBottom: '8px' }}>
              <strong>다크모드 CSS 변수:</strong>
            </div>
            <div style={{ color: colors.accent }}>
              --nv-bg-primary: {colors.bgPrimary};
            </div>
            <div style={{ color: colors.accent }}>
              --nv-bg-secondary: {colors.bgSecondary};
            </div>
            <div style={{ color: colors.accent }}>
              --nv-text-primary: {colors.textPrimary};
            </div>
            <div style={{ color: colors.accent }}>
              --nv-accent: {colors.accent};
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="guide-footer"
        style={{
          backgroundColor: colors.bgSecondary,
          color: colors.textSecondary,
          marginTop: '48px',
          padding: '24px 16px',
          borderTop: `1px solid ${colors.divider}`,
          textAlign: 'center',
        }}
      >
        <p>뽐뿌 모바일 - 네이버 스타일 다크모드 가이드</p>
        <p style={{ fontSize: '12px', marginTop: '8px' }}>
          이 가이드는 일관된 UI/UX를 유지하기 위한 참고 자료입니다.
        </p>
      </footer>
    </div>
  );
};

export default NaverStyleGuide;
