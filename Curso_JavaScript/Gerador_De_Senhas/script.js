// Seleção
const generatePassword = document.querySelector("#generate-password");          //
const generatedPassword = document.querySelector("#generated-password");        // 
const generateBtn = document.querySelector("#generate-btn");                    //
const generateOptions = document.querySelector("#gen-options");                 //
const lengthInput = document.querySelector("#length");                          // Seletores
const letterInput = document.querySelector("#letters");                         //
const numberInput = document.querySelector("#numbers");                         //
const symbolInput = document.querySelector("#symbols");                         //
const copyBtn = document.querySelector("#copy-btn");                            //


//Eventos
generateBtn.addEventListener("click", function(){                               // Botão de gerar senha
    genPassword(getLetterLower, getLetterUpper, getNumber, getSymbol);
});

generatePassword.addEventListener("click", function(){                          // Botão de abrir opções
    generateOptions.classList.toggle("hide");
});

copyBtn.addEventListener("click", function(e){                                   // Botão de Copiar Senha
    e.preventDefault();

    const password = generatedPassword.querySelector("h4").innerText;
    navigator.clipboard.writeText(password).then(function(){
        copyBtn.innerText = "Senha copiada!"
        setTimeout(function(){copyBtn.innerText = "Copiar";},500);
    });
});


// Funções
function getLetterLower (){                                                     // Gera Letra Minúscula
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);

}

function getLetterUpper (){                                                     // Gera Letra Maiúscula
   return String.fromCharCode(Math.floor(Math.random() * 26) + 65);

}

function getNumber(){                                                           // Gera Número
    return Math.floor(Math.random() * 10).toString();
}

function getSymbol(){                                                           // Gera Símbolo
    const symbols ="()[]{}=<>/,.!@#$%&*+-";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function genPassword(getLetterLower, getLetterUpper, getNumber, getSymbol){     // Gera Senha
    let password = "";
    const length = +lengthInput.value;
    const generators = [];

    if(letterInput.checked){generators.push(getLetterLower, getLetterUpper);}
    if(numberInput.checked){generators.push(getNumber);}
    if(symbolInput.checked){generators.push(getSymbol);}

    if(generators.length === 0){alert("Selecione uma opção válida");return;}
    
    for(i = 0; i < length; i += generators.length){
        generators.forEach(() =>{
            const random = generators[Math.floor(Math.random() * generators.length)]();
            password += random;
        });
    }
    password = password.slice(0, length);
    generatedPassword.style.display="block";
    generatedPassword.querySelector("h4").innerText = password;
}