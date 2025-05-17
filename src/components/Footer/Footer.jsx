import React from 'react';
import './Footer.css';
// Пример: иконки можно хранить в src/assets/icons/*.svg
import { ReactComponent as TelegramIcon } from '../../assets/icons/tg.svg';
import { ReactComponent as WhatsappIcon } from '../../assets/icons/wa.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="#about">О проекте</a>
        <a href="#contact">Контакты</a>
        <a href="#privacy">Политика конфиденциальности</a>
      </div>
      <div className="footer__social">
        <a href="https://t.me"      aria-label="Telegram"><TelegramIcon /></a>
        <a href="https://Whatsapp.com" aria-label="Instagram"><WhatsappIcon /></a>
      </div>
      <div className="footer__copy">© 2025</div>
    </footer>
  );
}
