// Programa Principal
import { useContext } from "react";
import { useEffect } from "react";
import { QuizContext } from "./context/Quiz";
import "./App.css";
import Welcome from "./components/welcome/Welcome";
import Question from "./components/question/question";

function App() {
  const [quizState, dispatch] = useContext(QuizContext);          // Contexto do Quiz

  useEffect(() =>{                                                // Reordena as Questões
    dispatch({type: "Reorder"})
  }, [dispatch])

  return (
    <div className="container">
      <header>
        <h1>Questionário sobre Linguagens de Programação</h1>
      </header>

      <main>
        {quizState.gameStage === "Start" && <Welcome/>}
        {quizState.gameStage === "Playing" && <Question/>}
        {quizState.gameStage === "Finish" && <Welcome/>}
      </main>
    </div>
  );
}

export default App;