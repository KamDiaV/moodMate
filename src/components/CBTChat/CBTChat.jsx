// src/components/CBTChat.jsx
import React, { useState, useEffect, useRef } from 'react';
import techniquesData from '../../data/techniques.json';
import './CBTChat.css';

export default function CBTChat() {
  const [techniques, setTechniques] = useState([]);
  const [messages, setMessages]     = useState([]);
  const [input, setInput]           = useState('');
  const endRef                      = useRef(null);

  // Загрузить техники
  useEffect(() => {
    setTechniques(techniquesData);
  }, []);

  // Скроллим вниз при новом сообщении
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!input.trim()) return;

    // Добавляем сообщение пользователя
    setMessages(m => [...m, { sender: 'user', text: input }]);
    const userText = input;
    setInput('');

    // Имитируем задержку ответа бота
    setTimeout(() => {
      // Тут будет вызов вашего бэкенда с DialoGPT
      // А пока — просто рандомная техника:
      const next = techniques[Math.floor(Math.random() * techniques.length)];
      setMessages(m => [...m, { sender: 'bot', text: next }]);
    }, 500);
  };

  if (!techniques.length) {
    return <div className="cbt-chat loading">Загружаем техники...</div>;
  }

  return (
    <div className="cbt-chat-chatbot">
      <div className="cbt-chat-window">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.sender === 'user'
                ? 'message message--user'
                : 'message message--bot'
            }
          >
            {msg.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form className="cbt-chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="cbt-chat-input"
          placeholder="Напишите сообщение…"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="cbt-chat-submit">
          Отправить
        </button>
      </form>
    </div>
  );
}
