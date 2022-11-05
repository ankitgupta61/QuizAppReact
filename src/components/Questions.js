import { useEffect, useState } from "react";
import Loader from "./Loader";
import classes from "./Questions.module.css";
import "./QuestionsOption.css";
import ShowResult from "./ShowResult";

const Questions = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [options, setOptions] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [displayResult, setDisplayResult] = useState(false);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple"
    )
      .then((res) => {
        return res.json();
      })
      .then((responsedData) => {
        setData(responsedData.results);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      setOptions(
        [
          ...data[questionNumber - 1].incorrect_answers,
          data[questionNumber - 1].correct_answer,
        ].sort(() => {
          return Math.random() - 0.5;
        })
      );
    }
  }, [questionNumber, data]);

  const nextQuestionHandler = () => {
    if (userAnswer === "") {
      alert("Please select one option");
      return false;
    }
    if (userAnswer === data[questionNumber - 1].correct_answer) {
      setScore(score + 1);
    }
    setUserAnswer("");
    setQuestionNumber(questionNumber + 1);
  };

  const showResult = () => {
    if (userAnswer === "") {
      alert("Please select one option");
      return false;
    }
    if (userAnswer === data[questionNumber - 1].correct_answer) {
      setScore(score + 1);
    }
    setDisplayResult(true);
  };

  const optionClickHandler = (e) => {
    setUserAnswer(e.target.id);

    e.target.className = "options selected";
  };

  const getConicalGradient = (max, target) => {
    const endAngle = (360 * target) / max;
    return `conic-gradient(#44B77B 0deg, #44B77B ${endAngle}deg, #d3d0d0 ${endAngle}deg)`;
  };

  return (
    <>
      {displayResult ? (
        <ShowResult total={5} correct={score} />
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className={classes.mainContainer}>
              <div className={classes.container}>
                <div className={classes.progress}>
                  <div
                    className={classes.progressChild}
                    style={{
                      backgroundImage: getConicalGradient(
                        5,
                        questionNumber - 1
                      ),
                    }}
                  >
                    <div className={classes.progressText}>
                      {questionNumber}/5
                    </div>
                  </div>
                </div>
                <div>{data[questionNumber - 1].question}</div>
                <div className={classes.optionContainer}>
                  {options.map((option, index) => {
                    return (
                      <p
                        key={index}
                        className={`options ${
                          option === userAnswer ? "selected" : null
                        }`}
                        onClick={optionClickHandler}
                        style={{ cursor: "pointer" }}
                        id={option}
                      >
                        {option === userAnswer ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM37.3137 14.3431L39.435 16.4645L25.2929 30.6066L22.4645 33.435L19.636 30.6066L12.565 23.5355L14.6863 21.4142L22.38 28.0821L37.3137 14.3431Z"
                              fill="#44B77B"
                            />
                          </svg>
                        ) : (
                          <span className="select-option"></span>
                        )}
                        {option}
                      </p>
                    );
                  })}
                </div>
                {questionNumber < 5 ? (
                  <button
                    className={classes.nextBtn}
                    onClick={nextQuestionHandler}
                  >
                    Next Question
                  </button>
                ) : (
                  <button className={classes.nextBtn} onClick={showResult}>
                    Show Result
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Questions;
