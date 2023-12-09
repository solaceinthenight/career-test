import { useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";

const App: React.FC = () => {
  const navigate = useNavigate();

  const startTest = () => {
    navigate("/question");
  };

  return (
    <div className="container">
      <div className="App">
        <header className="App-header">
          <h1>Career Test</h1>
          <button onClick={startTest} className="App-button start-button">
            START
          </button>
        </header>
      </div>
      <Footer />
    </div>
  );
};

export default App;
