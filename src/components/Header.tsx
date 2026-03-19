import React from 'react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <h1 className="header__logo">뽐뿌</h1>
        </div>
        <nav className="header__nav">
          <a href="#" className="header__link">핫딜</a>
          <a href="#" className="header__link">정보</a>
          <a href="#" className="header__link">커뮤니티</a>
        </nav>
        <div className="header__actions">
          <ThemeToggle variant="button" showLabel={false} />
        </div>
      </div>
    </header>
  );
};

export default Header;
