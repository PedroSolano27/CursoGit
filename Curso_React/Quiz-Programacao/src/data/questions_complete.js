const data = [
  {
    category: "HTML",
    questions: [
      {
        question: "Qual tag cria um parágrafo?",
        options: ["<p>", "<h1>", "<text>", "<ul>"],
        answer: "<p>",
        tip: "É uma tag de uma letra apenas",
      },
      {
        question: "Qual atributo adiciona um link para a tag a?",
        options: ["alt", "href", "src", "link"],
        answer: "href",
        tip: "Hyperlink Reference",
      },
      {
        question: "As listas não ordenadas tem a tag de:",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        answer: "<ul>",
        tip: "Exemplo de dica",
      },
      {
        question: "Qual atributo deixa o input obrigatório?",
        options: ["placeholder", "value", "required", "maxlength"],
        answer: "required",
        tip: "Exemplo de dica",
      },
      {
        question: "A tag semântica indicada para rodapés é a:",
        options: ["div", "main", "section", "footer"],
        answer: "footer",
        tip: "Exemplo de dica",
      },
    ],
  },
  {
    category: "CSS",
    questions: [
      {
        question: "Qual regra altera a cor de um elemento?",
        options: ["color", "background-color", "font-size", "transition"],
        answer: "color",
        tip: "Cor em inglês",
      },
      {
        question: "Para aumentar a fonte de um elemento utilizamos:",
        options: ["font", "text-transform", "font-size", "hover"],
        answer: "font-size",
        tip: "Exemplo de dica",
      },
      {
        question: "O atributo que deixa a posição de um elemento fixo é a:",
        options: ["static", "absolute", "fixed", "relative"],
        answer: "fixed",
        tip: "Exemplo de dica",
      },
      {
        question: "Para chamar um elemento pela propriedade 'id', é utilizado o símbolo:",
        options: ["@", "$", "&", "#"],
        answer: "#",
        tip: "Exemplo de dica",
      },
      {
        question: "Para deixar um elemento com borda redonda, é utilizado o atributo:",
        options: ["round", "border-radius", "border", "corner-radius"],
        answer: "border-radius",
        tip: "Exemplo de dica",
      },
    ],
  },
  {
    category: "JavaScript",
    questions: [
      {
        question: "O que é Vanilla JavaScript?",
        options: [
          "JavaScript puro",
          "Uma biblioteca JavaScript",
          "Um framework JavaScript",
          "Um compilador de JavaScript",
        ],
        answer: "JavaScript puro",
        tip: "Exemplo de dica",
      },
      {
        question: "Com qual instrução declaramos uma constante em JavaScript?",
        options: ["const", "let", "var", "define"],
        answer: "const",
        tip: "Exemplo de dica",
      },
      {
        question: "Qual dos tipos de dado a seguir não existe em JavaScript?",
        options: ["string", "number", "boolean", "float"],
        answer: "float",
        tip: "Exemplo de dica",
      },
      {
        question: "Qual dos métodos a seguir seleciona um elemento?",
        options: ["querySelector", "parseInt", "sort", "reduce"],
        answer: "querySelector",
        tip: "Exemplo de dica",
      },
      {
        question: "Qual destas propriedades da a quantidade de elementos de um array?",
        options: ["qty", "length", "items", "index"],
        answer: "length",
        tip: "Exemplo de dica",
      },
    ],
  },
];

export default data;
