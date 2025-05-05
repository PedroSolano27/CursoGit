// Programa Principal
import "./App.css";
import { useContext, useEffect } from "react";
import { QuizContext } from "./context/Quiz";
import Welcome from "./components/welcome/Welcome";
import Question from "./components/question/Question";
import Finish from "./components/finish/Finish";

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
        {quizState.gameStage === "Finish" && <Finish/>}
      </main>
    </div>
  );
}

export default App;