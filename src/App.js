import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Questions from "./components/Questions";

function App() {
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        position: "fixed",
        top: "0",
        background: "#af9cf3",
      }}
    >
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/questions" element={<Questions />}></Route>
      </Routes>
    </div>
  );
}

export default App;
