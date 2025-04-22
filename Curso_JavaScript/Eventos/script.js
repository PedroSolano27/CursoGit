//Evento de Carregamento de Página
window.addEventListener("load", function(){console.log("Operações de Evento");});


//Adicionando Eventos
const btnEvento = document.querySelector("#meu-botao");
btnEvento.addEventListener("click", function(){console.log("Botão clicado");});


//Remover Eventos
const btnSemEvento = document.querySelector("#nao-botao");
function mensagem() {console.log("Mensagem Impressa");}
btnSemEvento.addEventListener("click", mensagem);

const btnRemove = document.querySelector("#botao-remove");
btnRemove.addEventListener("click", function(){
    btnSemEvento.removeEventListener("click", mensagem);
    console.log("Evento removido");
});


//Argumentos no Evento
const title = document.querySelector("#title");
title.addEventListener("click", function(event){
    console.log(`Posição X: ${event.offsetX}`);
    console.log(`Tipo: ${event.pointerType}`);
    console.log(`Alvo: ${event.target}`);
});


//Propagação
const divPro = document.querySelector("#div-propagacao");
divPro.addEventListener("click", function(){console.log("Evento da Div")});

const btnPro = document.querySelector("#botao-propagacao");
btnPro.addEventListener("click", function(e){e.stopPropagation(); console.log("Evento do Botão")});


//Removendo evento Padrão
const a = document.querySelector("#first-link");
a.addEventListener("click", function(e){e.preventDefault(); console.log("Link desativado");});


//Eventos de tecla
document.addEventListener("keyup", function(e){console.log(`Soltou a tecla ${e.key}`)})
document.addEventListener("keydown", function(e){console.log(`Apertou a tecla ${e.key}`)})


//Eventos de Mouse
const footer = document.querySelector("footer");
footer.addEventListener("mousedown", function(){console.log("Pressionou o Mouse")});
footer.addEventListener("mouseup", function(){console.log("Soltou o Mouse")});
footer.addEventListener("dblclick", function(){console.log("Clique Duplo")});


//Evento de Scroll
window.addEventListener("scroll",function(e){
    if(this.window.pageYOffset > 200){
        console.log("Passou de 200px");
    }
});


//Evento de Focus/Blur
const input = document.querySelector("#input");
input.addEventListener("focus", function(){console.log("Entrou na área")});
input.addEventListener("blur", function(){console.log("Saiu na área")});