import React, { useState } from "react";

import styles from "./SurveyForm.module.scss";

const questions = [
  "Мало интереса или удовольствия от занятий",
  "Чувство подавленности, депрессии или безнадежности",
  "Проблемы со сном (трудности при засыпании, слишком раннее пробуждение, слишком много сна)",
  "Чувство усталости или нехватки энергии",
  "Плохой аппетит или переедание",
  "Чувство неполноценности или неудачности, подведение себя или своей семьи",
  "Трудности с концентрацией внимания (например, при чтении газет или просмотре ТВ)",
  "Замедленность движений или, наоборот, беспокойство, двигательная активность",
  "Мысли о том, что было бы лучше умереть или причинить себе вред",
];

const options = [
  { label: "Совсем нет", value: 0 },
  { label: "Несколько дней", value: 1 },
  { label: "Более половины дней", value: 2 },
  { label: "Почти каждый день", value: 3 },
];

const SurveyForm = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleChange = (questionIndex, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = Number(value);
    setAnswers(updatedAnswers);
  };

  const totalScore = answers.reduce((acc, val) => acc + (val ?? 0), 0);

  return (
    <div>
      <h2 className={styles.title}>
        Давай подберем для тебя работающую технику, чтобы это исправить ?
      </h2>
      <h4 className={styles.subtitle}>Ответь, пожалуйста на вопросы</h4>
      <h3 className={styles.question}>
        На протяжении последних двух недель как часто тебя беспокоили следующие
        проблемы?
      </h3>
      <form>
        {questions.map((question, index) => (
          <div key={index}>
            <p>
              {index + 1}. {question}
            </p>
            {options.map((option) => (
              <label
                key={option.value}
                style={{ display: "block", marginLeft: "1rem" }}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option.value}
                  checked={answers[index] === option.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                />{" "}
                {option.label}
              </label>
            ))}
          </div>
        ))}
      </form>
      <p className={styles.score}>
        <strong>Общий балл: {totalScore}</strong>
      </p>
    </div>
  );
};

export default SurveyForm;
