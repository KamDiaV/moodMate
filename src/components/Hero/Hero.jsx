import React from 'react';
import './Hero.css';

export default function Hero({ userName = 'Diana St', children }) {
  return (
    <section className="hero">
      <div className="hero__welcome">
        <h1 className="hero__title">Добро пожаловать, {userName}!</h1>
        <p className="hero__subtitle">Как вы сегодня себя чувствуете?</p>
      </div>
      <div className="hero__content">
        {children}
      </div>
    </section>
  );
}
