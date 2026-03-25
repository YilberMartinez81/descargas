let videos = JSON.parse(localStorage.getItem("videos")) || [];
let editIndex = null;

const container = document.getElementById("videos");

// ELEMENTOS
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const addLinkBtn = document.getElementById("addLinkBtn");
const saveBtn = document.getElementById("saveBtn");
const searchInput = document.getElementById("searchInput");

// LOGIN
loginBtn.onclick = () => {
    if (adminID.value === "Dragon" && adminPass.value === "Meliodas") {
        localStorage.setItem("admin", "true");
        adminPanel.style.display = "block";
        loginBox.style.display = "none";
        mostrarVideos();
    } else {
        alert("Datos incorrectos");
    }
};

// LOGOUT
logoutBtn.onclick = () => {
    localStorage.removeItem("admin");
    adminPanel.style.display = "none";
    limpiarFormulario();
    mostrarVideos();
};

// BUSCADOR 🔍
searchInput.addEventListener("input", () => {
    const texto = searchInput.value.toLowerCase();
    document.querySelectorAll(".video-card").forEach(card => {
        const titulo = card.querySelector(".video-title").textContent.toLowerCase();
        card.style.display = titulo.includes(texto) ? "block" : "none";
    });
});

// LIMPIAR
function limpiarFormulario() {
    titulo.value = "";
    imagen.value = "";
    linksContainer.innerHTML = "";
    editIndex = null;
}

// AGREGAR LINK
addLinkBtn.onclick = () => agregarCampoLink();

function agregarCampoLink(nombre = "", url = "") {
    const div = document.createElement("div");
    div.className = "link-item";

    div.innerHTML = `
        <input placeholder="Nombre (APK, MediaFire...)" value="${nombre}">
        <input placeholder="Link descarga" value="${url}">
        <button onclick="this.parentElement.remove()">✖</button>
    `;

    linksContainer.appendChild(div);
}

// IMAGEN
function obtenerImagen(link) {
    if (!link) return "https://via.placeholder.com/480x270";

    if (link.includes("youtu")) {
        let id = link.includes("v=")
            ? link.split("v=")[1].split("&")[0]
            : link.split("youtu.be/")[1];

        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }

    return link;
}

// GUARDAR VIDEO
saveBtn.onclick = () => {
    if (!titulo.value.trim()) {
        alert("Pon un título");
        return;
    }

    const links = [];

    document.querySelectorAll("#linksContainer .link-item").forEach(item => {
        const inputs = item.querySelectorAll("input");

        const nombre = inputs[0].value.trim();
        const url = inputs[1].value.trim();

        if (url) {
            links.push({
                nombre: nombre || "Descarga",
                url: url
            });
        }
    });

    const nuevo = {
        titulo: titulo.value,
        img: obtenerImagen(imagen.value || (links[0] ? links[0].url : "")),
        links
    };

    if (editIndex !== null) {
        videos[editIndex] = nuevo;
        editIndex = null;
    } else {
        videos.push(nuevo);
    }

    localStorage.setItem("videos", JSON.stringify(videos));
    mostrarVideos();
    limpiarFormulario();
};

// EDITAR
function editarVideo(i) {
    const v = videos[i];

    titulo.value = v.titulo;
    imagen.value = v.img;

    linksContainer.innerHTML = "";
    v.links.forEach(l => agregarCampoLink(l.nombre, l.url));

    editIndex = i;
}

// ELIMINAR
function eliminarVideo(i) {
    if (confirm("¿Eliminar video?")) {
        videos.splice(i, 1);
        localStorage.setItem("videos", JSON.stringify(videos));
        mostrarVideos();
    }
}

// MOSTRAR 🔥 (AQUÍ ESTÁ EL CAMBIO)
function mostrarVideos() {

    container.innerHTML = "";

    const esAdmin = localStorage.getItem("admin") === "true";

    [...videos].reverse().forEach((v, index) => {
        const i = videos.length - 1 - index;

        const card = document.createElement("div");
        card.className = "video-card";

        card.innerHTML = `
            <div class="thumb-container">
                <img src="${v.img}" class="thumb">
            </div>

            <div class="video-footer">
                <div class="video-title">${v.titulo}</div>

                ${esAdmin ? `
                <div class="video-actions">
                    <button onclick="event.stopPropagation(); editarVideo(${i})">✏️</button>
                    <button onclick="event.stopPropagation(); eliminarVideo(${i})">🗑️</button>
                </div>` : ""}
            </div>
        `;

        container.appendChild(card);

        card.onclick = () => {
            localStorage.setItem("videoSeleccionado", JSON.stringify(v));
            window.location.href = "pagina2.html";
        };
    });
}

// LOCK LOGIN
lockBtn.onclick = () => {
    loginBox.style.display =
        loginBox.style.display === "block" ? "none" : "block";
};

// ENTER LOGIN
adminID.addEventListener("keypress", e => e.key === "Enter" && loginBtn.click());
adminPass.addEventListener("keypress", e => e.key === "Enter" && loginBtn.click());

// INIT
window.onload = () => {
    if (localStorage.getItem("admin") === "true") {
        adminPanel.style.display = "block";
    }
    if (linksContainer.children.length === 0) {
        agregarCampoLink();
    }
    mostrarVideos();
};