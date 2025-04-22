console.log("Operações do DOM");

// Selecionar por Tag
const lista = document.getElementsByTagName("li");
console.log(lista);


// Selecionar por Id
const title = document.getElementById("title");
console.log(title);


// Selecionar por Classe
const classe = document.getElementsByClassName("product");
console.log(classe);


//Selecionar por QueryAll
const seletor = document.querySelectorAll(".product")
console.log(seletor);


//Selecionar por Query Único
const container = document.querySelector("#main-container");
console.log(container);


//Alterar Elementos HTML
const p = document.createElement("p");
const header = title.parentElement;
header.insertBefore(p, title);

const navLinks = document.querySelector("nav ul");
const li = document.createElement("li");
navLinks.appendChild(li);

const h1 = document.createElement("h1");
h1.textContent = "Título feito com JavaScript";
header.replaceChild(h1, title);

const meuTexto = document.createTextNode("Esse será mais um título");
const h2 = document.createElement("h2");
h2.appendChild(meuTexto);
container.appendChild(h2);


//ALterar Atributos
const firstLink = navLinks.querySelector("a");
firstLink.setAttribute("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
firstLink.setAttribute("target", "_blank");


//Altura e Largura do Elemento
const footer = document.querySelector("footer");
console.log(`Offset lateral do Footer: ${footer.offsetWidth}`);
console.log(`Offset vertical do Footer: ${footer.offsetHeight}`);
console.log(`Client lateral do Footer: ${footer.clientWidth}`);
console.log(`Client vertical do Footer: ${footer.clientHeight}`);


//Posição do Elemento
const product = classe[0];
console.log(product.getBoundingClientRect());


//Estilos de Elemento
container.style.color = "blue";
container.style.backgroundColor = "darkGrey";


//Estilizando vários Elementos
for(const li of lista){
    li.style.backgroundColor = "lightGrey";
}

