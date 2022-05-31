const div_matrizCaminos = document.querySelector("#matriz-caminos");
const div_congruencia = document.querySelector("#congruencias")
const div_laplaciano = document.querySelector("#filtro-laplaciano")
const div_media = document.querySelector("#filtro-media")
const div_mediana = document.querySelector("#filtro-mediana")
const div_expancion = document.querySelector("#expancion-histograma")
const div_ecualizacion = document.querySelector("#ecualizacion-histograma")
const div_encriptacion = document.querySelector("#encriptacion")
const div_conexas = document.querySelector("#conexas")
const div_hamiltoniano = document.querySelector("#hamiltoniano")
const div_juegos = document.querySelector("#juegos")


let arr = [div_matrizCaminos, div_congruencia, div_laplaciano, div_expancion, div_ecualizacion, div_encriptacion, div_media, div_mediana, div_conexas, div_hamiltoniano, div_juegos];

function activarContenido(value) {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != value) {
            arr[i].className = "contenedor shadow rounded desactivado";
        } else {
            arr[i].className = "contenedor shadow rounded activado";
        }
    }
}


let grados = [-90, -60, -30, 0, 30, 60, 90, 119];
let i = 0;
setInterval(() => {
    if (i == grados.length) i = 0;
    document.getElementById('imagen').style.transform = 'rotate(' + grados[i] + 'deg)';
    i++;
}, 500);

let nav = document.querySelector('.navbar');
let columna = document.querySelector('.main');
let c1 = document.querySelector('.c1');

let alto = window.innerHeight - nav.clientHeight;
columna.style.height = alto + "px";