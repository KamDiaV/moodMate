# MoodMate

**MoodMate** — это SPA веб-приложение для само-помощи и поддержания психического здоровья с помощью коротких CBT-техник, самодиагностики и трекинга настроения.

---

## 🚀 Ключевые возможности

1. **CBT-чат-бот «Микро-переключение»**  
   - Мгновенное облегчение тревоги через дыхательные и заземляющие упражнения.  
   - Кнопка «Ещё техника» для новых советов.

2. **Самодиагностика (PHQ-9)**  
   - Форма из 9 вопросов с оценкой 0–3.  
   - Мгновенная оценка риска депрессии: Low / Medium / High.  
   - Ссылка на ресурсы (горячие линии, гайды).

3. **Трекер настроения + прогноз**  
   - Ежедневная заметка (текст + оценка 1–10).  
   - Анализ тональности текста через Sentiment API.  
   - График тональности и прогноз на завтра.  
   - Подпрогнозный совет (микро-медитация и т. д.).

---

## 🤖 Использование ИИ

В проекте MoodMate задействованы следующие AI-модули:

- CBT-чат-бот: DialoGPT-small (Hugging Face) для генерации коротких CBT-техник.

- Самодиагностика (PHQ-9): модели LogisticRegression/RandomForest (scikit-learn) для оценки риска депрессии.

- Анализ тональности: nlptown/bert-multilingual-uncased-sentiment для преобразования пользовательских заметок в тональность (1–5).

---

## 🛠️ Технологический стек

- **Frontend:** React (Create React App)  
- **CBT-бот:** DialoGPT-small (Hugging Face)  
- **Модель PHQ-9:** scikit-learn (LogisticRegression/RandomForest)  
- **Sentiment:** nlptown/bert-multilingual-uncased-sentiment  
- **Embeddings:** sentence-transformers/all-mpnet-base-v2  
- **Хранение данных:** JSON-файл  
- **Графики:** Chart.js  
- **Развёртывание:** GitHub Pages

---

## Именование веток

`feat/my-new-great-feature` -- ветки для новых фич (UI, функционал и т.д.)

`chore/package-json` -- рутинные задачи (конфигурация, зависимости, .gitignore)

`fix/footer-position-fix` -- багфиксы

Имя ветки состоит из двух частей через /: префикс (feat/chore/fix) и краткое описание через дефисы.

---

## 🤝 Команда

[![Contributors](https://contrib.rocks/image?repo=KamDiaV/moodmate&columns=8)](https://github.com/KamDiaV/moodmate/graphs/contributors)

---

MoodMate — ваш быстрый помощник для борьбы с тревогой и улучшения настроения каждый день!