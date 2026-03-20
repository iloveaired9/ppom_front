import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import './PpompuNew.css';

interface PostItem {
  id: string;
  category: string;
  title: string;
  comments: number;
  likes: number;
  timestamp: string;
}

type ViewStyle = 'original' | 'naver';

export const PpompuNew: React.FC = () => {
  const [viewStyle, setViewStyle] = useState<ViewStyle>('naver');
  const { isDark } = useTheme();

  const posts: PostItem[] = [
    {
      id: '1',
      category: '자유게시판',
      title: 'Mbc) 한병도 상임위원장 배분, 원점 재검토ㅋㅋ',
      comments: 9,
      likes: 22,
      timestamp: '21:04:09',
    },
    {
      id: '2',
      category: '유머/감동',
      title: '조니워커 블루 4병을 내다 버린 술 유튜버.jpg',
      comments: 20,
      likes: 4,
      timestamp: '21:02:01',
    },
    {
      id: '3',
      category: '쿠폰게시판',
      title: '[KB스타뱅킹] 스타퀴즈 3/19일자 정답',
      comments: 10,
      likes: 45,
      timestamp: '20:57:01',
    },
    {
      id: '4',
      category: '자유게시판',
      title: '함돈균 고발됐네요',
      comments: 16,
      likes: 62,
      timestamp: '20:52:02',
    },
    {
      id: '5',
      category: '증권포럼',
      title: '손절 하고 나갑니다',
      comments: 32,
      likes: 2,
      timestamp: '20:49:04',
    },
    {
      id: '6',
      category: '알리뽐뿌',
      title: '[역대가선착순] 드리미 L30s 히트(57만), 드리미 L10s 히트(44만), JONR S20 PRO($80) 등',
      comments: 3,
      likes: 0,
      timestamp: '20:45:01',
    },
    {
      id: '7',
      category: '자유게시판',
      title: '성유리 유진만큼 이뻤던 걸그룹 멤버',
      comments: 34,
      likes: 1,
      timestamp: '20:44:04',
    },
    {
      id: '8',
      category: '증권포럼',
      title: '글로벌 증시 하락장 초입에 들어가고 있는 거 같네요',
      comments: 35,
      likes: 2,
      timestamp: '20:39:03',
    },
    {
      id: '9',
      category: '자유게시판',
      title: '요즘 84m2 아파트 평면도.jpg',
      comments: 57,
      likes: 1,
      timestamp: '20:37:01',
    },
    {
      id: '10',
      category: '자유갤러리',
      title: '신발 선물',
      comments: 8,
      likes: 3,
      timestamp: '20:37:01',
    },
  ];

  const containerClass = `ppomppu-new-page ${
    viewStyle === 'original'
      ? 'ppomppu-original-style'
      : 'ppomppu-naver-style'
  } ${isDark ? 'dark-mode' : 'light-mode'}`;

  return (
    <div className={containerClass}>
      {/* 헤더 */}
      <header className="ppomppu-new-header">
        <div className="header-top">
          <button className="header-menu-btn">☰</button>
          <div className="header-logo">뽐뿌</div>
          <div className="header-actions">
            <ThemeToggle variant="button" showLabel={false} />
            <button className="header-btn">🔔</button>
          </div>
        </div>

        {/* 검색바 */}
        <div className="search-bar">
          <input type="text" placeholder="검색어 입력" className="search-input" />
          <button className="search-btn">🔍</button>
        </div>
      </header>

      {/* 스타일 전환 버튼 */}
      <div className="style-switcher-new">
        <button
          className={`style-btn-new ${viewStyle === 'original' ? 'active' : ''}`}
          onClick={() => setViewStyle('original')}
        >
          원본 뽐뿌 스타일
        </button>
        <button
          className={`style-btn-new ${viewStyle === 'naver' ? 'active' : ''}`}
          onClick={() => setViewStyle('naver')}
        >
          네이버 스타일
        </button>
      </div>

      {/* 메인 메뉴 */}
      <nav className="main-menu">
        <button className="menu-btn">뽐뿌</button>
        <button className="menu-btn">정보</button>
        <button className="menu-btn">커뮤니티</button>
        <button className="menu-btn">포럼</button>
        <button className="menu-btn">갤러리</button>
      </nav>

      {/* 탭 메뉴 */}
      <div className="tab-menu">
        <button className="tab-btn active">인기 / HOT</button>
        <button className="tab-btn">최신글</button>
        <button className="tab-btn">장터최신글</button>
      </div>

      {/* 공지사항 */}
      <section className="notice-section">
        <span className="notice-badge">공지</span>
        <a href="#" className="notice-link">맛집처럼 19만 솔직 이사후기 비교 [이사상담]</a>
      </section>

      {/* 포스트 목록 */}
      <main className="posts-container">
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <a href="#" className="post-link">
                <span className="post-title">{post.title}</span>
                <span className="post-category">[{post.category}]</span>
                <span className="post-stat-icon">
                  <img src="/images/new_main/icon_coment.png" alt="댓글" />
                </span>
                <span className="post-stat-value">{post.comments}</span>
                <span className="post-stat-icon like-icon">
                  <img src="/images/new_main/icon_like_blue.png" alt="추천" />
                </span>
                <span className="post-stat-value like-value">{post.likes}</span>
                <span className="post-time">{post.timestamp}</span>
              </a>
            </li>
          ))}
        </ul>
      </main>

      {/* 하단 버튼 */}
      <div className="bottom-action">
        <button className="more-btn">더보기</button>
      </div>
    </div>
  );
};

export default PpompuNew;
