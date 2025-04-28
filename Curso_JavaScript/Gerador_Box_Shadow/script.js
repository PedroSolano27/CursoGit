//Classes
class BoxShadowGenerator {                                                                  // Classe do Gerador
    constructor(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, previewBox, rule, ruleWebkit, ruleMoz)
    {
        this.horizontal= horizontal;
        this.horizontalRef = horizontalRef;
        this.vertical = vertical;
        this.verticalRef = verticalRef;
        this.blur = blur;
        this.blurRef = blurRef;
        this.spread = spread;
        this.spreadRef = spreadRef;
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
        this.apply();
        this.show();
    }
    apply(){                                                                                // Aplica as Regras na Caixa
        this.previewBox.style.boxShadow = `${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.blurRef.value}px ${this.spreadRef.value}px #000000`;
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
                this.apply();
                this.show(); 
            break;
            case "vertical": 
                this.verticalRef.value = value;
                this.apply();
                this.show(); 
            break;
            case "blur": 
                this.blurRef.value = value;
                this.apply();
                this.show(); 
            break;
            case "spread": 
                this.spreadRef.value = value;
                this.apply();
                this.show(); 
            break;
            default: 
        }
    }
}


// Seleção
const horizontal = document.querySelector("#horizontal");                                   //
const horizontalRef = document.querySelector("#horizontal-value");                          //
const vertical = document.querySelector("#vertical");                                       //
const verticalRef = document.querySelector("#vertical-value");                              //
const blur = document.querySelector("#blur");                                               //
const blurRef = document.querySelector("#blur-value");                                      //
const spread = document.querySelector("#spread");                                           // Seletores
const spreadRef = document.querySelector("#spread-value");                                  //
const previewBox = document.querySelector("#box");                                          //
const rule =document.querySelector("#rule span");                                           //
const ruleWebkit =document.querySelector("#webkit-rule span");                              //
const ruleMoz =document.querySelector("#moz-rule span");                                    //
const boxShadow = new BoxShadowGenerator(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, previewBox, rule, ruleWebkit, ruleMoz);


// Eventos
horizontal.addEventListener("input", function(e){                                           // Slider Horizontal
    boxShadow.update("horizontal", e.target.value);
});

vertical.addEventListener("input", function(e){                                             // Slider Vertical
    boxShadow.update("vertical", e.target.value);
});

blur.addEventListener("input", function(e){                                                 // Slider de Blur
    boxShadow.update("blur", e.target.value);
});

spread.addEventListener("input", function(e){                                               // Slider de Spread
    boxShadow.update("spread", e.target.value);
});


// Funções



// Inicialização
boxShadow.initialize();                                                                     // Inicialização