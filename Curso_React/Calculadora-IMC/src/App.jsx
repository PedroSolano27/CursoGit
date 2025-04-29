// Arquivo principal do App
import data from "./data/data.js";
import { useState } from "react";
import "./App.css"
import Calc from "./components/Calc";
import Table from "./components/Table";

function App() {
  const [imc, setImc] = useState("");
  const [info, setInfo] = useState("");
  const [infoClass, setInfoClass] = useState("");

  function calcImc(e, height, weight){                                // Cálculo de IMC
    if (!weight || !height){return;};
    
    const weightNum = +weight.replace(",", ".");
    const heightNum = +height.replace(",", ".");
    const imcResult = (weightNum / (heightNum * heightNum)).toFixed(1);

    setImc(imcResult);
  }

  return (                                                            // Aplicativo
    <div className="container">{!imc ? <Calc calculator={calcImc}/> : <Table/>}</div>
  );
}

export default App;