import { useNavigate } from "react-router-dom";
import classes from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const startQuiz = () => {
    navigate("/questions");
  };
  return (
    <div className={classes.home}>
      <center>
        <div className={classes.content}>
          <div className={classes.logo}>
            <img
              src="https://global-uploads.webflow.com/5da0478a951135b39339e016/603e29b9802caa2681c9be0f_Upraised%20Logo.svg"
              alt="image"
              width="30px"
              height="20px"
            />
            <h2 style={{ display: "inline-block" }}>upraised</h2>
          </div>
          <div className={classes.quiz}>Quiz</div>
          <button onClick={startQuiz} className={classes.btn}>
            Start
          </button>
        </div>
      </center>
    </div>
  );
};

export default Home;
