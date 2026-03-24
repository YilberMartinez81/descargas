// =================== MATRIX ===================
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

// =================== INTRO ===================
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

            // Cargar descargas según ID
            cargarDescargasPorID();
        }, 1000);
        return;
    }

    setTimeout(typeEffect, 40);
}
typeEffect();

// =================== CONTADOR FAKE ===================
function updateViewers() {
    const num = Math.floor(Math.random() * 200) + 50;
    document.getElementById("viewers").innerText = num;
}
setInterval(updateViewers, 2000);
updateViewers();

// =================== NOMBRE ===================
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

// =================== TIEMPO REAL / SISTEMA ===================
let tiempoSalida = 0;
let plataformaActual = "";
let ytDone = false;
let ttDone = false;
let progress = 0;

// ------------------- BOTONES -------------------
function clickYT() {
    if (!nombreValido()) return;
    if (ytDone) return;

    plataformaActual = "yt";
    tiempoSalida = Date.now();

    window.open("https://www.youtube.com/@blacksoul-c3l", "_blank");
    document.getElementById("status").innerText = "🔗 Ve a YouTube y suscríbete";
}

function clickTT() {
    if (!nombreValido()) return;
    if (ttDone) return;

    plataformaActual = "tt";
    tiempoSalida = Date.now();

    window.open("https://www.tiktok.com/@blackcreative1", "_blank");
    document.getElementById("status").innerText = "🔗 Ve a TikTok y sigue";
}

// ------------------- DETECTAR REGRESO -------------------
document.addEventListener("visibilitychange", () => {
    if (!document.hidden && tiempoSalida > 0) {
        const tiempoActual = Date.now();
        const diferencia = (tiempoActual - tiempoSalida) / 1000;

        if (diferencia >= 5) {
            validarAccion();
        } else {
            document.getElementById("status").innerText =
                "⛔ Debes permanecer al menos 5 segundos. Intenta de nuevo.";
        }

        tiempoSalida = 0;
    }
});

// ------------------- VALIDACIÓN -------------------
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

// ------------------- FINAL -------------------
function checkFinal() {
    if (ytDone && ttDone) {
        document.getElementById("doneText").classList.remove("hidden");
        const texto = document.getElementById("valeryText");
        texto.innerText = "💚 " + nombreUsuario + " desbloqueó el sistema";
        texto.classList.remove("hidden");

        // Mostrar descargas (solo las que existan)
        cargarDescargasPorID();
    }
}

// =================== RESPONSIVE ===================
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// =================== DESCARGAS DINÁMICAS POR ID ===================
const descargasPorID = {
    1: {
        emulador: "https://www.mediafire.com/file/41zo1mkxulfhjj6/BluestaksFino-BLACK.exe/file",
        freefire: "https://www.mediafire.com/file/3tdabn5jt93nrft/FREE_FIRE-BLACK.apk/file",
        custom: "https://www.mediafire.com/file/i6uqmiheneb0utu/com.dts.freefireth.cfg/file"
    },
    2: {
        emulador: "https://www.mediafire.com/file/abcd1234/emulador2.exe/file",
        freefire: "https://www.mediafire.com/file/abcd1234/freefire2.apk/file",
        custom: "https://www.mediafire.com/file/abcd1234/custom2.cfg/file"
    },
    3: {
        emulador: "https://www.mediafire.com/file/efgh5678/emulador3.exe/file",
        freefire: "https://www.mediafire.com/file/efgh5678/freefire3.apk/file",
        custom: "https://www.mediafire.com/file/efgh5678/custom3.cfg/file"
    },
    4: {
        emulador: "https://www.mediafire.com/file/ijkl9012/emulador4.exe/file",
        freefire: "https://www.mediafire.com/file/ijkl9012/freefire4.apk/file",
        custom: "https://www.mediafire.com/file/ijkl9012/custom4.cfg/file"
    },
    5: {
        emulador: "https://www.mediafire.com/file/mnop3456/emulador5.exe/file",
        freefire: "https://www.mediafire.com/file/mnop3456/freefire5.apk/file",
        custom: "https://www.mediafire.com/file/mnop3456/custom5.cfg/file"
    },
    6: {
        emulador: "https://www.mediafire.com/file/qrst7890/emulador6.exe/file",
        freefire: "https://www.mediafire.com/file/qrst7890/freefire6.apk/file",
        custom: "https://www.mediafire.com/file/qrst7890/custom6.cfg/file"
    },
    7: {
        emulador: "https://www.mediafire.com/file/uvwx1234/emulador7.exe/file",
        custom: "https://www.mediafire.com/file/uvwx1234/custom7.cfg/file"
    },
    8: {
        freefire: "https://www.mediafire.com/file/yzab5678/freefire8.apk/file",
    },
    9: {
        emulador: "https://www.mediafire.com/file/cdef9012/emulador9.exe/file",
        freefire: "https://www.mediafire.com/file/cdef9012/freefire9.apk/file",
        custom: "https://www.mediafire.com/file/cdef9012/custom9.cfg/file"
    },
    10: {
        emulador: "https://www.mediafire.com	file/g hij3456/emulador10.exe	file",
        freefire: "https://www.mediafire.com	file/g hij3456/freefir10.apk	file",
        custom: "https://www.mediafire.com	file/g hij3456/custom10.cfg	file"
    }
};

function cargarDescargasPorID() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Ocultar todos los botones y títulos al inicio
    const botones = ["emuBtn", "ffBtn", "customBtn"];
    const titulos = ["emuTitle", "ffTitle", "customTitle"];
    botones.forEach(b => document.getElementById(b).classList.add("hidden"));
    titulos.forEach(t => document.getElementById(t).classList.add("hidden"));

    if (!id || !descargasPorID[id]) return;

    const data = descargasPorID[id];

    if (data.emulador) {
        document.getElementById("emuBtn").classList.remove("hidden");
        document.getElementById("emuTitle").classList.remove("hidden");
        document.getElementById("emuBtn").onclick = () => window.open(data.emulador, "_blank");
    }
    if (data.freefire) {
        document.getElementById("ffBtn").classList.remove("hidden");
        document.getElementById("ffTitle").classList.remove("hidden");
        document.getElementById("ffBtn").onclick = () => window.open(data.freefire, "_blank");
    }
    if (data.custom) {
        document.getElementById("customBtn").classList.remove("hidden");
        document.getElementById("customTitle").classList.remove("hidden");
        document.getElementById("customBtn").onclick = () => window.open(data.custom, "_blank");
    }
}
