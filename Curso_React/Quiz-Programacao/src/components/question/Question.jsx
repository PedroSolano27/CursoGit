// Página de Questões
import { useContext } from "react";
import { QuizContext } from "../../context/Quiz";
import "./Question.css";

function Question() {
    const [quizState] = useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestion];

    return (
        <section id="question">
            <p>Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}</p>
            <h2>{currentQuestion.question}</h2>
            <section id="options-container">
                <p>Opção 1</p>
                <p>Opção 2</p>
                <p>Opção 3</p>
                <p>Opção 4</p>
            </section>
            <button>Continuar</button>
        </section>
    );
}

export default Question;