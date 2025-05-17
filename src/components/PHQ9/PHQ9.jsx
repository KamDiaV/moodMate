import React, { useState } from 'react';
import './PHQ9.css';

const QUESTIONS = [
  'Как часто вы испытывали утрату интереса или удовольствия от занятий?',
  'Как часто вы чувствовали грусть, подавленность или безнадёжность?',
  'Как часто у вас были проблемы с засыпанием?',
  'Как часто вы чувствовали утомлённость или низкий уровень энергии?',
  'Как часто у вас был пониженный или повышенный аппетит?',
  'Как часто вы чувствовали себя безнадежно?',
  'Как часто у вас были проблемы с концентрацией?',
  'Как часто вы были раздражительны или гиперактивны?',
  'Как часто у вас были мысли о смерти?',
];

export default function PHQ9() {
  const [answers, setAnswers] = useState(Array(9).fill(null));
  const [risk, setRisk] = useState(null);

  const handleChange = (idx, value) => {
    const newA = [...answers];
    newA[idx] = value;
    setAnswers(newA);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (answers.some(a => a === null)) {
      alert('Пожалуйста, ответьте на все вопросы.');
      return;
    }
    const sum = answers.reduce((s, v) => s + v, 0);
    let level = 'Low';
    if (sum >= 10 && sum < 15) level = 'Medium';
    else if (sum >= 15) level = 'High';
    setRisk(level);
  };

  return (
    <section className="phq9">
      <h2>Самодиагностика PHQ-9</h2>
      <form onSubmit={handleSubmit} className="phq9__form">
        {QUESTIONS.map((q, i) => (
          <fieldset key={i} className="phq9__question">
            <legend className="phq9__legend">
              {i + 1}. {q}
            </legend>
            <div className="phq9__options">
              {[0, 1, 2, 3].map(v => (
                <label key={v} className="phq9__option">
                  <input
                    type="radio"
                    name={`q${i}`}
                    value={v}
                    checked={answers[i] === v}
                    onChange={() => handleChange(i, v)}
                  />
                  <span className="phq9__label-text">{v}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <button type="submit" className="phq9__submit">
          Оценить риск
        </button>
      </form>

      {risk && (
        <div className={`phq9__result phq9__result--${risk.toLowerCase()}`}>
          Ваш риск: <strong>{risk}</strong>
        </div>
      )}
    </section>
  );
}
