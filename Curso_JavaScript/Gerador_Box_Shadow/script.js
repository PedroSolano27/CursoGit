//Classes
class BoxShadowGenerator {                                                                  // Classe do Gerador
    constructor(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, opacity, opacityRef, 
                inset, color, colorRef, previewBox, rule, ruleWebkit, ruleMoz)
    {
        this.horizontal= horizontal;
        this.horizontalRef = horizontalRef;
        this.vertical = vertical;
        this.verticalRef = verticalRef;
        this.blur = blur;
        this.blurRef = blurRef;
        this.spread = spread;
        this.spreadRef = spreadRef;
        this.opacity = opacity;
        this.opacityRef = opacityRef;
        this.inset = inset;
        this.color = color;
        this.colorRef = colorRef;
        this.previewBox = previewBox;
        this.rule = rule;
        this.ruleWebkit = ruleWebkit;
        this.ruleMoz = ruleMoz;
    }                                                                                       // Método Construtor

    initialize(){                                                                           // Inicializa a Caixa
        this.horizontalRef.value = horizontal.value;
        this.verticalRef.value = vertical.value;
        this.blurRef.value = blur.value;
        this.spreadRef.value = spread.value;
        this.opacityRef.value = opacity.value;
        this.colorRef.value = color.value;
        this.apply();
        this.show();
    }
    apply(){                                                                                // Aplica as Regras na Caixa
        const rgb = this.hexToRgb(this.colorRef.value);
        
        this.previewBox.style.boxShadow = `${this.insetRef ? "inset" : ""} ${this.horizontalRef.value}px 
        ${this.verticalRef.value}px ${this.blurRef.value}px ${this.spreadRef.value}px rgba(${rgb}, ${this.opacityRef.value})`;
        
        this.currentRule = previewBox.style.boxShadow;
    }
    show(){                                                                                 // Mostra as Regras da Caixa
        this.rule.innerText = this.currentRule;
        this.ruleWebkit.innerText = this.currentRule;
        this.ruleMoz.innerText = this.currentRule;
    }
    update(type, value){                                                                    // Atualiza as Regras
        switch(type){
            case "horizontal": 
                this.horizontalRef.value = value;
            break;
            case "vertical": 
                this.verticalRef.value = value;
            break;
            case "blur": 
                this.blurRef.value = value;
            break;
            case "spread": 
                this.spreadRef.value = value;
            break; 
            case "opacity": 
                this.opacityRef.value = value;
            break; 
            case "inset": 
                this.insetRef = value; 
            break;
            case "color": 
                this.colorRef.value = value;
            break;
        }
        this.apply();
        this.show(); 
    }
    hexToRgb(hex){                                                                          // Converte Hexadecimal para RGB
        return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${("0x" + hex[5] + hex[6]) | 0}`;
    }
}


// Seleção
const horizontal = document.querySelector("#horizontal");                                   //
const horizontalRef = document.querySelector("#horizontal-val");                            //
const vertical = document.querySelector("#vertical");                                       //
const verticalRef = document.querySelector("#vertical-val");                                //
const blur = document.querySelector("#blur");                                               //
const blurRef = document.querySelector("#blur-val");                                        //
const spread = document.querySelector("#spread");                                           // 
const spreadRef = document.querySelector("#spread-val");                                    //
const opacity = document.querySelector("#opacity");                                         // 
const opacityRef = document.querySelector("#opacity-val");                                  // Seletores
const inset = document.querySelector("#inset");                                             // 
const color = document.querySelector("#color");                                             //
const colorRef = document.querySelector("#color-val");                                      //
const previewBox = document.querySelector("#box");                                          //
const rulesArea = document.querySelector("#rules-area");                                    //
const copyText = document.querySelector("#copy");                                           //
const rule = document.querySelector("#rule span");                                          //
const ruleWebkit = document.querySelector("#webkit-rule span");                             //
const ruleMoz = document.querySelector("#moz-rule span");                                   //
const boxShadow = new BoxShadowGenerator(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, 
                                         opacity, opacityRef, inset, color, colorRef, previewBox, rule, ruleWebkit, ruleMoz);


// Eventos
horizontal.addEventListener("input", function(e){                                           // Slider Horizontal
    boxShadow.update("horizontal", e.target.value);
});

horizontalRef.addEventListener("input", function(e){                                        // Input de Píxel Horizontal
    boxShadow.update("horizontal", e.target.value);
    horizontal.value = e.target.value;
});

vertical.addEventListener("input", function(e){                                             // Slider Vertical
    boxShadow.update("vertical", e.target.value);
});

verticalRef.addEventListener("input", function(e){                                          // Input de Píxel Vertical
    boxShadow.update("vertical", e.target.value);
    vertical.value = e.target.value;
});

blur.addEventListener("input", function(e){                                                 // Slider de Blur
    boxShadow.update("blur", e.target.value);
});

blurRef.addEventListener("input", function(e){                                              // Input de Píxel de Blur
    boxShadow.update("blur", e.target.value);
    blur.value = e.target.value;
});

spread.addEventListener("input", function(e){                                               // Slider de Spread
    boxShadow.update("spread", e.target.value);
});

spreadRef.addEventListener("input", function(e){                                            // Input de Píxel de Spread
    boxShadow.update("spread", e.target.value);
    spread.value = e.target.value;
});

opacity.addEventListener("input", function(e){                                              // Slider de Opacidade
    boxShadow.update("opacity", e.target.value);
});

opacityRef.addEventListener("input", function(e){                                           // Input de Píxel de Opacidade
    boxShadow.update("opacity", e.target.value);
    opacity.value = e.target.value;
});

inset.addEventListener("click", function(e){                                                // Input do Sombra Interna
    boxShadow.update("inset", e.target.checked);
});

color.addEventListener("input", function(e){                                                // Input de Cor
    boxShadow.update("color", e.target.value);
});

colorRef.addEventListener("input", function(e){                                             // Input de cor por RGB
    boxShadow.update("color", e.target.value);
    color.value = e.target.value;
});

rulesArea.addEventListener("click", function(e){                                            // Área de Copiar as Regras
    const rules = rulesArea.innerText;
    copyRules(rules);
});


// Funções
function copyRules(rules){                                                                  // Copia as Regras
    rules = rules.replace(/^\s*\n/gm, "");
    navigator.clipboard.writeText(rules).then(() =>{
        copyText.innerText ="Regras copiadas com sucesso!";
        setTimeout(() =>{copyText.innerText ="Clique acima para copiar as Regras";}, 700);
    });
}

// Inicialização
boxShadow.initialize();                                                                     // Inicialização