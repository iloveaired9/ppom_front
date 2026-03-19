import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import './PpompuMobileHome.css';

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  badge?: number;
}

interface PostItem {
  id: string;
  category: string;
  title: string;
  price?: string;
  image?: string;
  views: number;
  comments: number;
  likes: number;
  timestamp: string;
}

export const PpompuMobileHome: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 뽐뿌 모바일 메뉴
  const menuItems: MenuItem[] = [
    { id: 'hotdeal', icon: '🔥', label: '핫딜', badge: 3 },
    { id: 'info', icon: 'ℹ️', label: '정보', badge: 5 },
    { id: 'community', icon: '💬', label: '커뮤니티' },
    { id: 'events', icon: '🎉', label: '이벤트', badge: 2 },
    { id: 'news', icon: '📰', label: '뉴스' },
    { id: 'deals', icon: '💰', label: '거래', badge: 1 },
    { id: 'reviews', icon: '⭐', label: '후기' },
    { id: 'settings', icon: '⚙️', label: '설정' },
  ];

  // 뽐뿌 스타일 포스트
  const hotDeals: PostItem[] = [
    {
      id: '1',
      category: '[핫딜]',
      title: '🔥 무신사 대세 브랜드 30~50% 할인',
      price: '29,000원',
      image: '🛍️',
      views: 2341,
      comments: 156,
      likes: 892,
      timestamp: '2시간 전',
    },
    {
      id: '2',
      category: '[정보]',
      title: '💻 최신 노트북 구매가이드 2026',
      views: 1523,
      comments: 87,
      likes: 645,
      timestamp: '4시간 전',
    },
    {
      id: '3',
      category: '[거래]',
      title: '아이폰 15 프로 맥스 미개봉 새상품',
      price: '1,200,000원',
      views: 3421,
      comments: 234,
      likes: 1205,
      timestamp: '6시간 전',
    },
    {
      id: '4',
      category: '[후기]',
      title: '🎮 게이밍 마우스 로지텍 G502 사용 후기',
      views: 892,
      comments: 45,
      likes: 321,
      timestamp: '8시간 전',
    },
    {
      id: '5',
      category: '[핫딜]',
      title: '⚡ 쿠팡 와우 회원 특가 물품 추천',
      views: 4156,
      comments: 567,
      likes: 2341,
      timestamp: '10시간 전',
    },
  ];

  const infoSection: PostItem[] = [
    {
      id: 'info-1',
      category: '[정보]',
      title: '2026년 베스트셀러 전자제품 TOP 10',
      views: 5234,
      comments: 234,
      likes: 1890,
      timestamp: '어제',
    },
    {
      id: 'info-2',
      category: '[팁]',
      title: '온라인 쇼핑에서 싼값 찾는 꿀팁 5가지',
      views: 3456,
      comments: 123,
      likes: 987,
      timestamp: '2일 전',
    },
  ];

  return (
    <div className="ppomppu-mobile-home">
      {/* 헤더 */}
      <header className="ppomppu-header">
        <div className="ppomppu-header-content">
          <div className="ppomppu-logo">
            <span className="logo-icon">🎯</span>
            <span className="logo-text">뽐뿌</span>
          </div>
          <div className="ppomppu-header-actions">
            <button className="icon-btn search-btn">🔍</button>
            <button className="icon-btn noti-btn">🔔</button>
            <ThemeToggle variant="button" showLabel={false} />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="ppomppu-main">
        {/* 퀵 메뉴 */}
        <section className="quick-menu-section">
          <div className="quick-menu">
            {menuItems.slice(0, 4).map((item) => (
              <button key={item.id} className="quick-menu-item">
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
                {item.badge && <span className="menu-badge">{item.badge}</span>}
              </button>
            ))}
          </div>
          {isMenuOpen && (
            <div className="quick-menu expanded">
              {menuItems.slice(4).map((item) => (
                <button key={item.id} className="quick-menu-item">
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                  {item.badge && <span className="menu-badge">{item.badge}</span>}
                </button>
              ))}
            </div>
          )}
          <button
            className="expand-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '▲ 닫기' : '▼ 더보기'}
          </button>
        </section>

        {/* 배너 슬라이더 */}
        <section className="banner-section">
          <div className="banner-container">
            <div className="banner-item">
              <div className="banner-content primary">
                <h3>🎁 신규가입 쿠폰</h3>
                <p>최대 50% 할인</p>
              </div>
            </div>
            <div className="banner-item">
              <div className="banner-content secondary">
                <h3>⭐ VIP 멤버십</h3>
                <p>매월 특가 이벤트</p>
              </div>
            </div>
            <div className="banner-item">
              <div className="banner-content accent">
                <h3>💳 포인트 적립</h3>
                <p>최대 20배</p>
              </div>
            </div>
          </div>
          <div className="banner-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </section>

        {/* 핫딜 섹션 */}
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">🔥 실시간 핫딜</h2>
            <a href="#" className="section-more">
              더보기 →
            </a>
          </div>

          <div className="posts-list">
            {hotDeals.map((post) => (
              <article key={post.id} className="post-item">
                <div className="post-content">
                  <div className="post-header">
                    <span className="post-category">{post.category}</span>
                    <span className="post-timestamp">{post.timestamp}</span>
                  </div>
                  <h3 className="post-title">{post.title}</h3>
                  {post.price && <p className="post-price">{post.price}</p>}
                  <div className="post-stats">
                    <span className="stat">👁 {post.views}</span>
                    <span className="stat">💬 {post.comments}</span>
                    <span className="stat">❤️ {post.likes}</span>
                  </div>
                </div>
                {post.image && (
                  <div className="post-image">
                    <span className="image-placeholder">{post.image}</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* 정보 섹션 */}
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">ℹ️ 유용한 정보</h2>
            <a href="#" className="section-more">
              더보기 →
            </a>
          </div>

          <div className="posts-list">
            {infoSection.map((post) => (
              <article key={post.id} className="post-item">
                <div className="post-content">
                  <div className="post-header">
                    <span className="post-category info">{post.category}</span>
                    <span className="post-timestamp">{post.timestamp}</span>
                  </div>
                  <h3 className="post-title">{post.title}</h3>
                  <div className="post-stats">
                    <span className="stat">👁 {post.views}</span>
                    <span className="stat">💬 {post.comments}</span>
                    <span className="stat">❤️ {post.likes}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 추천 상품 섹션 */}
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">💎 추천 상품</h2>
            <a href="#" className="section-more">
              더보기 →
            </a>
          </div>

          <div className="products-grid">
            {[
              { icon: '👕', name: '의류', price: '~50% 할인' },
              { icon: '📱', name: '전자제품', price: '최저가 보장' },
              { icon: '🏠', name: '생활용품', price: '특가 이벤트' },
              { icon: '👟', name: '신발', price: '전체 할인' },
              { icon: '💄', name: '뷰티', price: '신상품 추가' },
              { icon: '🍔', name: '음식', price: '배달비 무료' },
            ].map((product, idx) => (
              <div key={idx} className="product-card">
                <div className="product-icon">{product.icon}</div>
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">{product.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 커뮤니티 섹션 */}
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">💬 커뮤니티</h2>
            <a href="#" className="section-more">
              더보기 →
            </a>
          </div>

          <div className="community-cards">
            <div className="community-card">
              <h3>📸 사진</h3>
              <p>찍은 사진을 공유해보세요</p>
            </div>
            <div className="community-card">
              <h3>✍️ 일상</h3>
              <p>일상의 이야기를 나눠요</p>
            </div>
            <div className="community-card">
              <h3>❓ 질문</h3>
              <p>궁금한 점을 물어봐요</p>
            </div>
          </div>
        </section>
      </main>

      {/* 하단 네비게이션 */}
      <nav className="ppomppu-bottom-nav">
        <button className="nav-item active">
          <span className="nav-icon">🏠</span>
          <span className="nav-label">홈</span>
        </button>
        <button className="nav-item">
          <span className="nav-icon">🔥</span>
          <span className="nav-label">핫딜</span>
        </button>
        <button className="nav-item">
          <span className="nav-icon">➕</span>
          <span className="nav-label">글쓰기</span>
        </button>
        <button className="nav-item">
          <span className="nav-icon">🔔</span>
          <span className="nav-label">알림</span>
        </button>
        <button className="nav-item">
          <span className="nav-icon">👤</span>
          <span className="nav-label">마이</span>
        </button>
      </nav>
    </div>
  );
};

export default PpompuMobileHome;
