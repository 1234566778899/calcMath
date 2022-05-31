let valores = [
    [0, -1, 0, -1, 4, -1, 0, -1, 0],
    [0, 1, 0, 1, -4, 1, 0, 1, 0],
    [1, 1, 1, 1, -8, 1, 1, 1, 1],
    [-1, -1, -1, -1, 8, -1, -1, -1, -1]
];
let it = 0;

function CambiarValores(value) {
    let listaMascara = document.querySelectorAll('.cj-mascara-laplaciano');
    if (value == '+') it++;
    else if (value == '-') it--;
    if (it > 3) it = 0;
    if (it < 0) it = 3;

    for (let i = 0; i < listaMascara.length; i++) {
        listaMascara[i].value = valores[it][i];
    }
}
CambiarValores('');

function limpiarMascara() {
    let listaMascara = document.querySelectorAll('.cj-mascara-laplaciano');
    listaMascara.forEach(element => {
        element.value = "";
    });
}

let contenedor_laplaciano = document.querySelector('.original-matriz');
let tam_laplaciano = 3;

function GenerarMatriz(value) {
    if (value == '+') tam_laplaciano++;
    else if (value == '-') tam_laplaciano--;
    if (tam_laplaciano > 5) {
        alert("No se puede aumentar el tamaño");
        tam_laplaciano--;
    }
    if (tam_laplaciano < 2) {
        alert("No se puede disminuir el tamaño");
        tam_laplaciano++;
    }

    let lista = document.querySelectorAll('.cj-original-laplaciano');
    if (lista.length > 0) {
        lista.forEach(element => {
            contenedor_laplaciano.removeChild(element);
        });
    }
    let fragmento = document.createDocumentFragment();
    for (let i = 0; i < tam_laplaciano; i++) {
        for (let j = 0; j < tam_laplaciano; j++) {
            let elemento = document.createElement('input');
            elemento.setAttribute('class', 'cj-original-laplaciano')
            fragmento.append(elemento);
        }
    }
    contenedor_laplaciano.style.width = 65 * tam_laplaciano + 'px';
    contenedor_laplaciano.appendChild(fragmento);
}
GenerarMatriz();

function LimpiarLaplaciano() {
    let lista = document.querySelectorAll('.cj-original-laplaciano');
    lista.forEach(element => {
        element.value = "";
    });
}

function algoritmoLaplaciano() {
    let listaOriginal = document.querySelectorAll('.cj-original-laplaciano');

    let matriz = new Array(tam_laplaciano);
    for (let i = 0; i < tam_laplaciano; i++) {
        matriz[i] = new Array(tam_laplaciano);
    }
    let cont = 0;
    for (let i = 0; i < tam_laplaciano; i++) {
        for (let j = 0; j < tam_laplaciano; j++) {
            matriz[i][j] = parseInt(listaOriginal[cont].value);
            cont++;
        }
    }
    let mascara = new Array(3);
    for (let i = 0; i < 3; i++) {
        mascara[i] = new Array(3);
    }
    let lista = document.querySelectorAll('.cj-mascara-laplaciano');
    let it = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            mascara[i][j] = parseInt(lista[it].value);
            it++;
        }
    }


    let aux = new Array(tam_laplaciano);
    for (let i = 0; i < tam_laplaciano; i++) {
        aux[i] = new Array(tam_laplaciano);
    }

    for (let i = 0; i < tam_laplaciano; i++) {
        for (let j = 0; j < tam_laplaciano; j++) {
            aux[i][j] = 0;
        }
    }
    //--------------start---------------//
    for (let i = 0; i < tam_laplaciano; i++) {
        for (let j = 0; j < tam_laplaciano; j++) {
            //1
            aux[i][j] += matriz[i][j] * mascara[1][1];
            //2
            if (i - 1 >= 0 && i - 1 < tam_laplaciano && j - 1 >= 0 && j - 1 < tam_laplaciano) {
                aux[i][j] += matriz[i - 1][j - 1] * mascara[0][0];
            }
            //3
            if (i - 1 >= 0 && i - 1 < tam_laplaciano && j >= 0 && j < tam_laplaciano) {
                aux[i][j] += matriz[i - 1][j] * mascara[0][1];
            }
            //4
            if (i - 1 >= 0 && i - 1 < tam_laplaciano && j + 1 >= 0 && j + 1 < tam_laplaciano) {
                aux[i][j] += matriz[i - 1][j + 1] * mascara[0][2];
            }
            //5
            if (i >= 0 && i < tam_laplaciano && j - 1 >= 0 && j - 1 < tam_laplaciano) {
                aux[i][j] += matriz[i][j - 1] * mascara[1][0];
            }
            //6
            if (i >= 0 && i < tam_laplaciano && j + 1 >= 0 && j + 1 < tam_laplaciano) {
                aux[i][j] += matriz[i][j + 1] * mascara[1][2];
            }
            //7
            if (i + 1 >= 0 && i + 1 < tam_laplaciano && j - 1 >= 0 && j - 1 < tam_laplaciano) {
                aux[i][j] += matriz[i + 1][j - 1] * mascara[2][0];
            }
            //8
            if (i + 1 >= 0 && i + 1 < tam_laplaciano && j >= 0 && j < tam_laplaciano) {
                aux[i][j] += matriz[i + 1][j] * mascara[2][1];
            }
            //9
            if (i + 1 >= 0 && i + 1 < tam_laplaciano && j + 1 >= 0 && j + 1 < tam_laplaciano) {
                aux[i][j] += matriz[i + 1][j + 1] * mascara[2][2];
            }
        }
    }
    let min = 99;
    let max = -99;

    for (let i = 0; i < tam_laplaciano; i++) {
        for (let j = 0; j < tam_laplaciano; j++) {
            if (min > aux[i][j]) min = aux[i][j];
            if (max < aux[i][j]) max = aux[i][j];
        }
    }
    for (let i = 0; i < tam_laplaciano; i++) {
        for (let j = 0; j < tam_laplaciano; j++) {
            aux[i][j] = (7 / (max - min)) * (aux[i][j] - min);
        }
    }
    for (let i = 0; i < tam_laplaciano; i++) {
        for (let j = 0; j < tam_laplaciano; j++) {
            aux[i][j] = parseInt(Math.round(aux[i][j]));
        }
    }
    return aux;
}

function resultadoLaplaciano() {
    let contenidoResultado = document.querySelector('.resultado');
    let lista = document.querySelectorAll('.cj-resultado-laplaciano');
    if (lista.length > 0) {
        lista.forEach(element => {
            contenidoResultado.removeChild(element);
        });
    }
    let arr = algoritmoLaplaciano();
    let fragmento = document.createDocumentFragment();
    for (let i = 0; i < tam_laplaciano; i++) {
        for (let j = 0; j < tam_laplaciano; j++) {
            let elemento = document.createElement('input');
            elemento.setAttribute('class', 'cj-resultado-laplaciano')
            elemento.setAttribute('value', arr[i][j]);
            fragmento.append(elemento);
        }
    }
    contenidoResultado.style.width = 65 * tam_laplaciano + 'px';
    contenidoResultado.appendChild(fragmento);
}