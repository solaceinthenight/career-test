import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

import questionsData from "./data/questions.json";
import Footer from "./Footer";

type Question = {
  id: number;
  question: string;
  option1: string;
  option2: string;
};

const createQuestion = (json: {
  id: number;
  question: string;
  option1: string;
  option2: string;
}): Question => {
  return {
    id: json.id,
    question: json.question,
    option1: json.option1,
    option2: json.option2,
  };
};

const QuestionPage: React.FC = () => {
  const TOTAL_QUESTIONS = 25;
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>(questionsData);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [questionsAnswered, setQuestionsAnswered] = useState(1);
  const [counts, setCounts] = useState({
    countRealistic: 0,
    countInvestigative: 0,
    countArtistic: 0,
    countSocial: 0,
    countConventional: 0,
    countEnterprising: 0,
  });
  const [selectedCounts, setSelectedCounts] = useState({
    countRealistic: 0,
    countInvestigative: 0,
    countArtistic: 0,
    countSocial: 0,
    countConventional: 0,
    countEnterprising: 0,
  });

  useEffect(() => {
    // Whenever the 'questionsAnswered' state updates, this effect will run
    if (questionsAnswered > TOTAL_QUESTIONS) {
      navigate("/results", {
        state: { selectedCounts: selectedCounts, counts: counts },
      });
    } else if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      const question: Question = createQuestion(questions[randomIndex]);
      setCurrentQuestion(question);
      setSelectedOption("");
      console.log(Object.prototype.toString.call(questions));
    }
  }, [questionsAnswered, questions, navigate, selectedCounts, counts]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (currentQuestion == null) return;
    if (selectedOption) {
      let selected = "";
      if (selectedOption == "option1") {
        selected = currentQuestion.option1;
      } else {
        selected = currentQuestion.option2;
      }

      setSelectedCounts((prevCounts) => ({
        ...prevCounts,
        [`count${selected}`]:
          prevCounts[`count${selected}` as keyof typeof prevCounts] + 1,
      }));

      setCounts((prevCounts) => ({
        ...prevCounts,
        [`count${currentQuestion.option1}`]:
          prevCounts[
            `count${currentQuestion.option1}` as keyof typeof prevCounts
          ] + 1,
        [`count${currentQuestion.option2}`]:
          prevCounts[
            `count${currentQuestion.option2}` as keyof typeof prevCounts
          ] + 1,
      }));

      console.log(counts);

      // Exclude the answered question from future selections
      setQuestions(questions.filter((q) => q.id !== currentQuestion.id));

      // Increment the questions answered counter
      setQuestionsAnswered((prevCount) => prevCount + 1);
    } else {
      alert("Please select an option before moving on to the next question.");
    }
  };

  if (!currentQuestion) {
    // Show a loading state or handle the case where no questions are left
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="App">
        <h2>Question {questionsAnswered}</h2>
        <h5>Option 1 may substitute for "Yes" in applicable cases.</h5>
        <div className="question-container">
          <p className="question">{currentQuestion.question}</p>
          <div className="options">
            <button
              onClick={() => handleOptionSelect("option1")}
              className={
                selectedOption === "option1" ? "option selected" : "option"
              }
            >
              Option 1
            </button>
            <button
              onClick={() => handleOptionSelect("option2")}
              className={
                selectedOption === "option2" ? "option selected" : "option"
              }
            >
              Option 2
            </button>
          </div>
          <button onClick={handleNextClick} className="next-button">
            NEXT
          </button>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${((questionsAnswered - 1) / TOTAL_QUESTIONS) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuestionPage;
