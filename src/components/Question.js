import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (timeRemaining > 1) {
        setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
        //console.log("Decremented timeRemaining");
      } else {
        //console.log("Set time remaining to 10");
        setTimeRemaining(10);
        onAnswered(false);
      }
    }, 1000);
    return () => {
      console.log("In cleanup.  Clearing timer", timerId);
      clearTimeout(timerId);
    };
    console.log("timerId is ", timerId);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;
  console.log("Time remaining is", timeRemaining);
  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
