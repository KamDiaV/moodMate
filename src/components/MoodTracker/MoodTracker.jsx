// src/components/MoodTracker/MoodTracker.jsx
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './MoodTracker.css';

const DAYS = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
];

export default function MoodTracker() {
  const svgRef = useRef();

  // Генерация ISO-дат за последние 30 дней
  const genLast30Days = () => {
    const today = new Date();
    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (29 - i));
      return d.toISOString().slice(0, 10);
    });
  };

  // История тонов (30 дней) из localStorage или рандом
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('moodEntries');
    if (saved) return JSON.parse(saved);
    return genLast30Days().map(date => ({
      date,
      tone: Math.floor(Math.random() * 5) + 1
    }));
  });

  // Флаг первой отправки, чтобы не показывать прогноз до ввода
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Неделя в цифрах (рандом)
  const [weekData] = useState(() =>
    DAYS.map(day => ({
      day,
      stress: Math.floor(Math.random() * 100),
      mood:   Math.floor(Math.random() * 100),
      energy: Math.floor(Math.random() * 100),
    }))
  );

  const [text, setText]       = useState('');
  const [rating, setRating]   = useState(5);
  const [forecast, setForecast] = useState(null);

  // При изменении entries: сохраняем, перерисовываем график и считаем прогноз
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
    drawChart();
    if (entries.length > 1) computeForecast();
  }, [entries]);

  const computeForecast = () => {
    const avg = entries.reduce((sum, e) => sum + e.tone, 0) / entries.length;
    setForecast(Math.round(avg));
  };

  const drawChart = () => {
    const svg = d3.select(svgRef.current);
    const width  = 600;
    const height = 200;
    const margin = { top: 20, right: 30, bottom: 50, left: 40 };

    const data = entries.map(d => ({
      ...d,
      dateObj: new Date(d.date)
    }));

    svg.selectAll('*').remove();

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.dateObj))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([1, 5])
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x(d => x(d.dateObj))
      .y(d => y(d.tone));

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3.axisBottom(x)
          .ticks(6)
          .tickFormat(d3.timeFormat('%-d.%m'))
      )
      .selectAll('text')
        .style('font-size','10px')
        .attr('transform','rotate(-45)')
        .attr('text-anchor','end');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', line);
  };

  // Обработка отправки: сохраняем сегодня и включаем прогноз
  const handleSubmit = e => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    const tone  = Math.ceil(rating / 2);
    setEntries(prev => {
      const withoutToday = prev.filter(e => e.date !== today);
      return [...withoutToday, { date: today, tone }];
    });
    setHasSubmitted(true);
    setText('');
    setRating(5);
  };

  const getAdvice = () =>
    forecast <= 2
      ? 'Попробуйте 3-минутную медитацию.'
      : 'Отлично! Продолжайте в том же духе.';

  return (
    <section className="mood-tracker">
      <h2>Трекер настроения</h2>

      <form onSubmit={handleSubmit} className="mood-form">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Как настроение сегодня?"
        />
        <label>
          Рейтинг: {rating}
          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={e => setRating(+e.target.value)}
          />
        </label>
        <button type="submit">Сохранить</button>
      </form>

      {entries.length > 0 && (
        <div className="mood-visuals">
          <svg ref={svgRef} width={600} height={200} />
          {forecast !== null && hasSubmitted && (
            <div className="mood-forecast">
              <p>Прогноз на завтра: <strong>{forecast}</strong></p>
              <p className="mood-advice">{getAdvice()}</p>
            </div>
          )}
        </div>
      )}

      {/* Неделя в цифрах */}
      <div className="weekly-section">
        <h3>Неделя в цифрах</h3>
        <div className="weekly-grid">
          <div className="cell header" />
          <div className="cell header">Stress</div>
          <div className="cell header">Mood</div>
          <div className="cell header">Energy</div>
          {weekData.map(e => (
            <React.Fragment key={e.day}>
              <div className="cell day">{e.day}</div>
              <div className="cell bar-cell">
                <div className="bar stress" style={{ width: `${e.stress}%` }} title={`${e.stress}%`} />
              </div>
              <div className="cell bar-cell">
                <div className="bar mood"   style={{ width: `${e.mood}%`   }} title={`${e.mood}%`} />
              </div>
              <div className="cell bar-cell">
                <div className="bar energy" style={{ width: `${e.energy}%` }} title={`${e.energy}%`} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
