"use client";
import React, { useState } from "react";
import pageStyles from "../page.module.css";
import config from "../../config.json";
import { Alternative } from "../components/Alternative";
import { Card } from "../components/Card";
import { ButtonPrimary } from "../components/ButtonPrimary";
import { Modal } from "../components/Modal";
import { QuizLogo } from "../components/QuizLogo";

const questions = config.questions;

const answerStates = {
  DEFAULT: "DEFAULT",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
} as const;

export default function GameScreen() {
  const [answerState, setAnswerState] = React.useState<
    keyof typeof answerStates
  >(answerStates.DEFAULT);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState([]);
  const questionNumber = currentQuestion + 1;
  const question = questions[currentQuestion];
  const isLastQuestion = questionNumber === questions.length;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  const openModal = () => setIsOpenModal(true);

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const $questionInfo = event.target as HTMLFormElement;
    const formData = new FormData($questionInfo);
    const { alternative } = Object.fromEntries(formData.entries());

    const isCorrectAnswer = alternative === question.answer;
    if (isCorrectAnswer) {
      setUserAnswers([...userAnswers, true]);
      setAnswerState(answerStates.SUCCESS);
    }
    if (!isCorrectAnswer) {
      setUserAnswers([...userAnswers, false]);
      setAnswerState(answerStates.ERROR);
    }
    setTimeout(() => {
      if (isLastQuestion) return;

      setCurrentQuestion(currentQuestion + 1);
      setAnswerState(answerStates.DEFAULT);
    }, 2 * 1000);
  }

  React.useEffect(() => {
    if (isLastQuestion) {
      setTotalPoints(
        userAnswers.reduce((_totalPoints, currentAnswer) => {
          if (currentAnswer === true) return _totalPoints + 1;
          return _totalPoints;
        }, 0)
      );
      openModal();
      return;
    }
  }, [userAnswers]);

  return (
    <main
      className={pageStyles.screen}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url("${question.image}")`,
      }}
    >
      <section
        className={pageStyles.container}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <QuizLogo />
        </div>
        <Card headerTitle={`Pergunta ${questionNumber} de ${questions.length}`}>
          <h1>{question.title}</h1>
          <form
            style={{
              marginTop: "24px",
            }}
            onSubmit={(event) => submitForm(event)}
          >
            {question.alternatives.map((alternative, index) => (
              <div
                key={alternative + index}
                style={{
                  marginBottom: "8px",
                }}
              >
                <Alternative
                  label={alternative}
                  order={index}
                  isCorect={answerState === answerStates.SUCCESS}
                  isIncorect={answerState === answerStates.ERROR}
                />
              </div>
            ))}
            {answerState === answerStates.DEFAULT && (
              <ButtonPrimary text="Confirmar" click={() => {}} />
            )}
            <p style={{ textAlign: "center" }}>
              {answerState === answerStates.ERROR && "❌"}
              {answerState === answerStates.SUCCESS && "✅"}
            </p>
          </form>
        </Card>
      </section>
      {isOpenModal && (
        <Modal
          questionsNumber={questions.length}
          corrects={totalPoints}
          incorrects={questions.length - totalPoints}
        />
      )}
    </main>
  );
}
