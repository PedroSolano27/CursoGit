//Seleção de Elementos
const multiplicationForm = document.querySelector("#multiplication-form");
const numberInput = document.querySelector("#number");
const multiplicationInput = document.querySelector("#multiplicator");
const multiplicationTable = document.querySelector("#multiplication-ops");
const multiplicationTitle = document.querySelector("#multiplication-title span");

//Funções
function createTable(number, multiplicatorNumber){
    multiplicationTable.innerHTML = "";

    for(i = 1; i <= multiplicatorNumber; i++){
        const result = number*i;

        const template = `<div class="row">
                                <div class="operation">${number} X ${i} =</div>
                                <div class="result">${result}</div>
                          </div>`

        const parser = new DOMParser;
        const htmlTemplate = parser.parseFromString(template, "text/html");
        const row = htmlTemplate.querySelector(".row");

        multiplicationTable.appendChild(row);
    }

    multiplicationTitle.innerText = number;
}


//Eventos
multiplicationForm.addEventListener("submit", function(e){
    e.preventDefault();

    const multiplicationNumber = +numberInput.value;
    const multiplicatorNumber = +multiplicationInput.value;

    if(!multiplicationNumber || !multiplicatorNumber){
        alert("Insira um número!!");
        return;
    }

    createTable(multiplicationNumber, multiplicatorNumber);
});

