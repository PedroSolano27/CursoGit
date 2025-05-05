/* eslint-disable react-refresh/only-export-components */
// Contexto do Quiz para a Aplicação
import { createContext } from "react";
import { useReducer } from "react";
import questions from "../data/questions";

const Stages = ["Start", "Playing", "Finish"];                      // Array com os estágios do Quiz
const initialState = {                                              // Estágio inicial do Quiz
    gameStage: Stages[0],
    questions,
    currentQuestion: 0,
    score: 0,
    answered: false
}

function quizReducer(state, action){                                // Reducer do Quiz
    switch(action.type){
        case "Change_State": {                                      // Muda o Estado
            return {...state, gameStage: Stages [1]};
        }    
        
        case "Reorder":  {                                          // Embaralha as questões
            const reorderedQuestions = questions.sort(()=> {
                return Math.random() - 0.5;
            });
            return {...state, questions: reorderedQuestions}; 
        }

        case "Change_Question": {                                   // Muda a Questão ou Finaliza o Jogo
            const nextQuestion = state.currentQuestion + 1;
            let endGame = false;
            
            if(!questions[nextQuestion]){ endGame = true }
            return {
                ...state, 
                currentQuestion: nextQuestion, 
                gameStage: endGame ? Stages[2]: state.gameStage,
                answered: false
            };
        }

        case "Check_Answer": {                                      // Verifica a Resposta
            if(state.answered){return state;};

            const answer = action.payload.answer;
            const option = action.payload.option;
            let correctAnswer = 0;

            if(answer === option) {correctAnswer = 1;}
            return {
                ...state,
                score: state.score + correctAnswer,
                answered: true
            };
        }

        case "Restart": {                                           // Reinicia o Jogo
            return initialState;                                    // Não Embaralha as Questões
        }
            
        default: return state;
    }
}

export const QuizContext = createContext();                         // Cria o contexto do Quiz
export const QuizProvider = ({children}) => {                       // Exporta o Contexto do Quiz
    const value = useReducer(quizReducer, initialState);

    return <QuizContext.Provider value={value} >{children}</QuizContext.Provider>
}