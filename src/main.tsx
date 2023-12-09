import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import QuestionPage from "./QuestionPage";
import ResultsPage from "./ResultsPage";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="question" element={<QuestionPage />} />
        <Route path="results" element={<ResultsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
