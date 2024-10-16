document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
});
function iniciarApp() {
    crearGaleria();
    scrollNav();
    navFija();
}
function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement("picture");
        imagen.innerHTML = `<source srcset="./img/thunder/${i}.avif" type="image/avif">
        <source srcset="./img/thunder/${i}.webp" type="image/webp">
        <source srcset="./img/thunder/${i}.png" type="image/png">

        <img loading="lazy" width="200" height="300" src="./img/thunder/${i}.jpg" alt="imagen-galeria">`;

        imagen.onclick = function () {
            mostrarImagen(i);
        };
        galeria.appendChild(imagen);
    }
}
function mostrarImagen(id) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `<source srcset="./img/zoom/${id}.avif" type="image/avif">
        <source srcset="./img/zoom/${id}.webp" type="image/webp">
        <source srcset="./img/zoom/${id}.png" type="image/png">

        <img loading="lazy" src="./img/zoom/${id}.jpg" alt="imagen-galeria">`;

    // Crea un overlay con la imagen
    const overlay = document.createElement("div");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");
    overlay.onclick = function () {
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    };

    // Boton para cerrar la ventana modal
    const cerrar = document.createElement("p");
    cerrar.textContent = "×";
    cerrar.classList.add("btn-cerrar");
    cerrar.onclick = function () {
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    };
    overlay.appendChild(cerrar);

    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body");
}
function scrollNav() {
    const enlaces = document.querySelectorAll(".navegacion-principal a");
    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", function (e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth" });
        });
    });
}
function navFija() {
    const barra = document.querySelector(".header");
    const sobreFestival = document.querySelector(".sobre-festival");
    const body = document.querySelector("body");

    window.addEventListener("scroll", function () {
        if (sobreFestival.getBoundingClientRect().top < 0) {
            barra.classList.add("fijo");
            body.classList.add("body-scroll");
        } else {
            barra.classList.remove("fijo");
            body.classList.remove("body-scroll");
        }
    });
}
