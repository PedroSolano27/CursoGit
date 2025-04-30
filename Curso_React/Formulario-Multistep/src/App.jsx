//Aplicativo Principal
import './App.css'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import UserForm from './components/UserForm';
import ReviewForm from './components/ReviewForm';
import FinalForm from './components/FinalForm';
import { useForm } from './hooks/useForm';

function App() {
  const formComponents = [<UserForm/>, <ReviewForm/>, <FinalForm/>];

  const {currentStep, currentComponent, changeStep} = useForm(formComponents);

  return (
    <>
      <header>
        <h1>Formulário MultiStet</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci sunt inventore numquam, illo mollitia excepturi quod molestias? Cum praesentium sint rem, cupiditate quo necessitatibus omnis, commodi exercitationem, nobis natus atque!</p>
      </header>

      <main className="form-container">
      <p>Etapas</p>
      <form onSubmit={(e) => {changeStep(currentStep + 1, e)}}>

        <section className="inputs">
         {currentComponent}
        </section>

        <section className="actions">
          <button type="button" onClick={(e) => {changeStep(currentStep - 1, e)}}><GrFormPrevious/><span>Voltar</span></button>
          <button type="submit"><span>Avançar</span><GrFormNext/></button>
        </section>

      </form>
      </main>
    </>
  );
}

export default App;