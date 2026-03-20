const titleText = "SISTEMA DE DESCARGA";
const subText = "Acceso restringido - Presiona para continuar";

let i = 0;
let j = 0;

function typeTitle() {
    if (i < titleText.length) {
        document.getElementById("title").innerHTML += titleText[i];
        i++;
        setTimeout(typeTitle, 50);
    } else {
        typeSubtitle();
    }
}

function typeSubtitle() {
    if (j < subText.length) {
        document.getElementById("subtitle").innerHTML += subText[j];
        j++;
        setTimeout(typeSubtitle, 30);
    }
}

typeTitle();

