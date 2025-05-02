/* eslint-disable react-refresh/only-export-components */
// Contexto do Quiz para a Aplicação
import { createContext } from "react";
import { useReducer } from "react";
import questions from "../data/questions";

const Stages = ["Start", "Playing", "Finish"];              // Array com os estágios do Quiz
const initialState = {                                      // Estágio inicial do Quiz
    gameStage: Stages[0],
    questions,
    currentQuestion: 0
}

function quizReducer(state, action){                        // Reducer do Quiz
    switch(action.type){
        case "Change_State": return {...state ,gameStage: Stages [1]};
        case "Reorder":  {
            const reorderedQuestions = questions.sort(()=> {
                return Math.random() - 0.5;
            });
            return {...state, questions: reorderedQuestions}; 
        }        
        default: return state;
    }
}

export const QuizContext = createContext();                 // Cria o contexto do Quiz
export const QuizProvider = ({children}) => {               // Exporta o Contexto do Quiz
    const value = useReducer(quizReducer, initialState);

    return <QuizContext.Provider value={value} >{children}</QuizContext.Provider>
}