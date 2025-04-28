// Seletores
const notesContainer = document.querySelector("#notes-container");                                      //
const noteInput = document.querySelector("#note-content");                                              // 
const addBtn = document.querySelector(".add-note");                                                     //
const pin = document.querySelector(".bi-pin");                                                          // Seletores
const xmark = document.querySelector(".bi-x-lg");                                                       //
const file = document.querySelector(".bi-file-earmark-plus");                                           //
const searchInput = document.querySelector("#search-input");                                            //
const exportBtn = document.querySelector("#export-btn");                                                //


// Eventos 
addBtn.addEventListener("click", function(){                                                            // Botão de Salvar
    createNote(noteInput.value);
});

document.addEventListener("keyup",function(e){                                                          // Enter para Salvar
    if(e.target === noteInput && e.key === "Enter"){ 
        addBtn.dispatchEvent(new Event("click")); 
    }
})

searchInput.addEventListener("keyup", function(e){                                                      // Barra de Busca
    searchNotes(e.target.value);
});

exportBtn.addEventListener("click", function(){                                                         // Botão de Exportar
    exportNotes();
});


// Funções
function createNote(value, id, fixed){                                                                  // Criar Nota
    const noteObject ={
        id: generateID(),
        content: value,
        fixed: fixed,
    };
    if(!noteObject.content){alert("Nenhum conteúdo inserido!"); return;}

    const notes = getNotes();
    notes.push(noteObject);
    saveNote(notes);

    addNote(noteObject.id, noteObject.content);
    noteInput.value = "";
}

function addNote(id, content, fixed){                                                                   // Adicionar Nota
    const element = document.createElement("section");
    element.classList.add("note");                                                                      // Própria Nota
    if(fixed){element.classList.add("fixed");}

    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.placeholder = "Adicione algum texto";
    element.appendChild(textarea);                                                                      // Área de Texto
    textarea.addEventListener("keyup",function(e){ updateNote(id, e.target.value); });

    const pin = document.createElement("i");
    pin.classList.add("bi", "bi-pin");
    element.appendChild(pin);                                                                           // Botão de Fixar
    pin.addEventListener("click", function(){ toggleFixed(id); });
    
    const xmark = document.createElement("i");
    xmark.classList.add("bi", "bi-x-lg");
    element.appendChild(xmark);                                                                         // Botão de Excluir
    xmark.addEventListener("click", function(){ deleteNote(id, element); });

    const file = document.createElement("i");
    file.classList.add("bi", "bi-file-earmark-plus");
    element.appendChild(file);                                                                          // Botão de Duplicar
    file.addEventListener("click", function(){ dupeNote(id); });

    notesContainer.appendChild(element);                                                                // Nota Completa
}

function saveNote(notes){                                                                               // Salvar Nota
    localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes(){                                                                                // Carregar Notas
    cleanNotes();                                                                              
    getNotes().forEach(note => {
        const noteElement = addNote(note.id, note.content, note.fixed);
    });
}

function cleanNotes(){                                                                                  // Limpar Notas
    notesContainer.replaceChildren([]);
}

function getNotes(){                                                                                    // Puxar Notas do Storage
    const noteArray = JSON.parse(localStorage.getItem("notes") || "[]");
    const orderedNotes = noteArray.sort(function(a,b){
        if(a.fixed > b.fixed){ return -1; } else return 1;
    });
    return noteArray;
}

function generateID(){                                                                                  // Gerar Id
    return Math.floor(Math.random() * 5000);
}

function toggleFixed(id){                                                                               // Fixar Nota
    const notes = getNotes();
    const target = notes.filter((note) => note.id === id)[0];

    target.fixed = !target.fixed;
    saveNote(notes);
    displayNotes();
}

function deleteNote(id, element){                                                                       // Deletar Nota
    const notes = getNotes().filter((note) => note.id !== id);
    saveNote(notes);

    notesContainer.removeChild(element);
}

function dupeNote(id){                                                                                  // Duplicar Nota
    const notes = getNotes();
    const target = notes.filter((note) => note.id === id)[0];

    noteObject = {
        id: generateID(),
        content: target.content,
        fixed: false,
    };

    createNote(noteObject.content, noteObject.id, noteObject.fixed);
}

function updateNote(id, newContent){                                                                    // Atualizar Nota
    const notes = getNotes();
    const target = notes.filter((note) => note.id === id)[0];

    target.content = newContent;
    saveNote(notes);
}

function searchNotes(search){                                                                           // Procurar Notas
    const results = getNotes().filter((note) =>{
        return note.content.includes(search);
    })

    if(search === ""){ cleanNotes(); displayNotes(); return; }

    cleanNotes();
    results.forEach((note => {
        const noteElement = addNote(note.id, note.content);
    }))
}

function exportNotes(){                                                                                 // Exportar Notas
    const notes = getNotes();
    const csv = [
        ["ID", "Conteudo", "Fixado"],
        ...notes.map((note) => [note.id, note.content, note.fixed])
    ].map((e) => e.join(";")).join("\n"); // O normal é ",", mas pra Excel tem que usar ";"

    const element = document.createElement("a");
    element.target = "_blank";
    element.href = "data:text/csv;charset=utf-8,\uFEFF" + encodeURI(csv);
    element.download = "Notes.csv";
    element.click();
}


// Inicializaçãio
displayNotes(); 