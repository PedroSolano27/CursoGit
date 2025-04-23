//Seletores
const container = document.querySelector(".container");
const qrBtn = document.querySelector("#qr-main button");
const qrInput = document.querySelector("#qr-main input")
const qrImg = document.querySelector("#qr-code img");


//Funções
function generateQrCode(){
    const qrInputValue = qrInput.value;
    
    if (!qrInputValue){alert("Insira um Texto ou URL!"); return;}

    qrBtn.innerText = "Gerando Código...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrInputValue}`;

    qrImg.addEventListener("load", function(){
        container.classList.add("active");
        qrBtn.innerText = "Código Gerado!";
    });
}


//Eventos
qrBtn.addEventListener("click", function(){generateQrCode()});
qrInput.addEventListener("keydown", function(e){if(e.code === "Enter"){ generateQrCode(); }});
qrInput.addEventListener("keyup", function(){
    const qrInputValue = qrInput.value;

    if(!qrInputValue.value){
        container.classList.remove("active");
        qrBtn.innerText = "Gerar QR Code";
    }
});