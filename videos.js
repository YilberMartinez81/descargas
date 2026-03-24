// 🎬 LISTA DE VIDEOS
const videos = [
    {
        id: 1,
        titulo: "🔥 Sensibilidad PRO",
        img: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    },
    {
        id: 2,
        titulo: "🎯 Headshots PRO",
        img: "https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg"
    },
    {
        id: 3,
        titulo: "⚡ Configuración GOD",
        img: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg"
    },
    {
        id: 4,
        titulo: "⚡ Configuración GOD",
        img: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg"
    },
    {
        id: 5,
        titulo: "⚡ Configuración GOD",
        img: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg"
    },
    {
        id: 6,
        titulo: "⚡ Configuración GOD",
        img: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg"
    },
    {
        id: 7,
        titulo: "⚡ jajaja GOD",
        img: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg"
    },
    {
        id: 8,
        titulo: "⚡ yilbrt GOD",
        img: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg"
    },
    {
        id: 9,
        titulo: "⚡ Configuración GOD",
        img: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg"
    },
    {
        id: 10,
        titulo: "⚡ Configuración GOD",
        img: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg"
    }
];

const container = document.getElementById("videos");

// 💡 FUNCION PARA CREAR TARJETA
function crearTarjeta(v) {
    const card = document.createElement("div");
    card.className = "video-card";

    // Miniatura
    const img = document.createElement("img");
    img.src = v.img;
    img.className = "thumb";

    // Info del video
    const info = document.createElement("div");
    info.className = "info";
    info.innerHTML = `<div class="title">${v.titulo}</div>`;

    // CLICK → abre la página de descarga con ID
    card.onclick = () => window.open(`pagina2.html?id=${v.id}`, "_blank");

    card.appendChild(img);
    card.appendChild(info);

    return card;
}

// 🔎 FUNCION PARA MOSTRAR VIDEOS
function mostrarVideos(lista) {
    container.innerHTML = ""; // limpiar

    lista.forEach(v => {
        const card = crearTarjeta(v);
        container.appendChild(card);
    });
}

// 🔍 FUNCION BUSCADOR
function buscarVideos() {
    const texto = document.getElementById("searchInput").value.toLowerCase();

    if (texto === "") {
        mostrarVideos(videos);
        return;
    }

    const filtrados = videos.filter(v =>
        v.titulo.toLowerCase().includes(texto)
    );

    mostrarVideos(filtrados);
}

// ⚡ CARGAR VIDEOS AL INICIO
mostrarVideos(videos);