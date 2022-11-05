import classes from "./ShowResult.module.css";
import { useNavigate } from "react-router-dom";

const ShowResult = (props) => {
  const navigate = useNavigate();

  const getAngleTransform = () => {
    const angle = (180 * props.correct) / props.total;
    return `translate(-50%, -100%) rotate(${270 + angle}deg)`;
  };

  const perScore = () => {
    return (props.correct * 100) / props.total + "%";
  };

  return (
    <div className={classes.showResult}>
      <p>Your Result</p>
      <div className={classes.gauge}>
        <div className={classes.gaugeMask}></div>
        <div
          className={classes.arrow}
          style={{ transform: getAngleTransform() }}
        ></div>
        <div className={classes.arrowMask}>
          <div className={classes.scorePer}>{perScore()}</div>
        </div>
      </div>
      <div className={classes.resultCorrect}>
        <span className={classes.resultCorrectCircle}></span>
        {props.correct} Correct
      </div>
      <div className={classes.resultInCorrect}>
        <span className={classes.resultIncorrectCircle}></span>
        {props.total - props.correct} Incorrect
      </div>
      <button
        className={classes.nextBtn}
        onClick={() => {
          navigate("/");
        }}
      >
        Start Again
      </button>
    </div>
  );
};

export default ShowResult;
