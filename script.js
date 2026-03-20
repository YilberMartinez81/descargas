// MATRIX
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff99";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i]++;
    }
}
setInterval(drawMatrix, 30);

// INTRO
const introText = ["Accessing...", "Decrypting...", "Access Granted"];
let i = 0, j = 0;

function typeEffect() {
    if (i < introText.length) {
        document.getElementById("intro").innerHTML += introText[i][j];
        j++;

        if (j === introText[i].length) {
            document.getElementById("intro").innerHTML += "<br>";
            i++; j = 0;
        }
    } else {
        setTimeout(() => {
            document.getElementById("intro").classList.add("hidden");
            document.getElementById("main").classList.remove("hidden");
        }, 1000);
        return;
    }

    setTimeout(typeEffect, 40);
}
typeEffect();

// CONTADOR FAKE
function updateViewers() {
    const num = Math.floor(Math.random() * 200) + 50;
    document.getElementById("viewers").innerText = num;
}
setInterval(updateViewers, 2000);
updateViewers();

// ================== NOMBRE ==================
let nombreUsuario = "";

function guardarNombre() {
    const input = document.getElementById("username").value;

    if (input.trim() !== "") {
        nombreUsuario = input;
        document.getElementById("status").innerText = "✔ Nombre guardado";
    } else {
        document.getElementById("status").innerText = "⚠️ Ingresa un nombre válido";
    }
}

function nombreValido() {
    if (nombreUsuario.trim() === "") {
        document.getElementById("status").innerText = "⚠️ Debes ingresar tu nombre primero";
        return false;
    }
    return true;
}

// ================== TIEMPO REAL ==================
let tiempoSalida = 0;
let plataformaActual = "";

// SISTEMA
let ytDone = false;
let ttDone = false;
let progress = 0;

// BOTONES
function clickYT() {
    if (!nombreValido()) return;
    if (ytDone) return;

    plataformaActual = "yt";
    tiempoSalida = Date.now();

    window.open("https://www.youtube.com", "_blank");

    document.getElementById("status").innerText = "🔗 Ve a YouTube mínimo 5 segundos...";
}

function clickTT() {
    if (!nombreValido()) return;
    if (ttDone) return;

    plataformaActual = "tt";
    tiempoSalida = Date.now();

    window.open("https://www.tiktok.com", "_blank");

    document.getElementById("status").innerText = "🔗 Ve a TikTok mínimo 5 segundos...";
}

// DETECTAR REGRESO
document.addEventListener("visibilitychange", () => {
    if (!document.hidden && tiempoSalida > 0) {

        const tiempoActual = Date.now();
        const diferencia = (tiempoActual - tiempoSalida) / 1000;

        if (diferencia >= 5) {
            validarAccion();
        } else {
            document.getElementById("status").innerText = "⛔ Quédate al menos 5 segundos";
        }

        tiempoSalida = 0;
    }
});

// VALIDACIÓN
function validarAccion() {

    if (plataformaActual === "yt" && !ytDone) {
        document.getElementById("status").innerText = "🔍 Verificando suscripción...";
        
        setTimeout(() => {
            ytDone = true;
            progress += 50;
            document.getElementById("bar").style.width = progress + "%";

            document.getElementById("status").innerText = "✔ YouTube verificado";
            checkFinal();
        }, 1500);
    }

    if (plataformaActual === "tt" && !ttDone) {
        document.getElementById("status").innerText = "🔍 Verificando seguimiento...";
        
        setTimeout(() => {
            ttDone = true;
            progress += 50;
            document.getElementById("bar").style.width = progress + "%";

            document.getElementById("status").innerText = "✔ TikTok verificado";
            checkFinal();
        }, 1500);
    }
}

// FINAL
function checkFinal() {
    if (ytDone && ttDone) {
        document.getElementById("doneText").classList.remove("hidden");
        document.getElementById("finalBtn").classList.remove("hidden");

        const texto = document.getElementById("valeryText");
        texto.innerText = "💚 " + nombreUsuario + " desbloqueó el sistema";
        texto.classList.remove("hidden");
    }
}

function goFinal() {
    window.open("https://TU-LINK-AQUI.com", "_blank");
}

// RESPONSIVE
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});