import React from 'react';
import './Header.css';
import avatarImg from '../../assets/avatar.png';

export default function Header({ userName, menuItems, activeTab, onTabChange }) {
  return (
    <header className="header">
      <div className="header__logo">MindCare</div>

      <nav className="header__nav">
        {menuItems.map(item => (
          <button
            key={item.key}
            className={
              'header__nav-item' +
              (activeTab === item.key ? ' header__nav-item--active' : '')
            }
            onClick={() => onTabChange(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header__right">
        <img src={avatarImg} alt="Avatar" className="header__avatar" />
        <span className="header__username">{userName}</span>
        <button className="header__burger" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
