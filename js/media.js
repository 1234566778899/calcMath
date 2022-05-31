let tam_media = 3;
let itmascara = 0;
let valores_media = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 1, 2, 4, 2, 1, 2, 1]
];

function GenerarMatrizMedia(value) {
    if (value == '+') tam_media++;
    if (value == '-') tam_media--;
    if (tam_media > 5) {
        alert("No se puede aumentar la matriz");
        tam_media--;
    }
    if (tam_media < 2) {
        alert("No se puede disminuir la matriz");
        tam_media++;
    }

    let contenedor = document.querySelector('.original-matriz-media');
    let lista = document.querySelectorAll('.cj-original-media');
    if (lista.length > 0) {
        lista.forEach(element => {
            contenedor.removeChild(element);
        });
    }
    let fragmento = document.createDocumentFragment();
    for (let i = 0; i < tam_media; i++) {
        for (let j = 0; j < tam_media; j++) {
            let elemento = document.createElement('input');
            elemento.setAttribute('class', 'cj-original-media');
            fragmento.append(elemento);
        }
    }
    contenedor.style.width = 65 * tam_media + 'px';
    contenedor.appendChild(fragmento);
}
GenerarMatrizMedia('');

function limpiarMedia() {
    let lista = document.querySelectorAll('.cj-original-media');
    lista.forEach(element => {
        element.value = "";
    });
}

function ResultadoMedia() {
    let contenedor = document.querySelector('.resultado-media')
    let lista = document.querySelectorAll('.cj-resultado-media');
    if (lista.length > 0) {
        lista.forEach(element => {
            contenedor.removeChild(element);
        });
    }
    let fragmento = document.createDocumentFragment();
    let arr = algoritmoMedia();
    for (let i = 0; i < tam_media; i++) {
        for (let j = 0; j < tam_media; j++) {
            let elemento = document.createElement('input');
            elemento.setAttribute('class', 'cj-resultado-media');
            elemento.setAttribute('value', arr[i][j]);
            fragmento.append(elemento);
        }
    }
    contenedor.style.width = 65 * tam_media + 'px';
    contenedor.appendChild(fragmento);
}


function LlenarMascara(value) {
    if (value == '+') itmascara++;
    else if (value == '-') itmascara--;
    if (itmascara > 1) itmascara = 0;
    if (itmascara < 0) itmascara = 1;
    let listaMascara = document.querySelectorAll('.cj-mascara-media');
    for (let i = 0; i < 9; i++) {
        listaMascara[i].value = valores_media[itmascara][i];
    }
}
LlenarMascara();

function limpiarMascaraMedia() {
    let lista = document.querySelectorAll('.cj-mascara-media');
    lista.forEach(element => {
        element.value = "";
    });
}

function algoritmoMedia() {

    let matriz = new Array(tam_media);
    for (let i = 0; i < tam_media; i++) {
        matriz[i] = new Array(tam_media);
    }
    let it = 0;
    let listaOriginal = document.querySelectorAll('.cj-original-media');
    for (let i = 0; i < tam_media; i++) {
        for (let j = 0; j < tam_media; j++) {
            matriz[i][j] = parseInt(listaOriginal[it].value);
            it++;
        }
    }
    let mascara = new Array(3);
    for (let i = 0; i < 3; i++) {
        mascara[i] = new Array(3);
    }
    let listaMascara = document.querySelectorAll('.cj-mascara-media');
    let c = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            mascara[i][j] = parseInt(listaMascara[c].value);
            c++;
        }
    }
    let suma = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            suma += mascara[i][j];
        }
    }

    let aux = new Array(tam_media);
    for (let i = 0; i < tam_media; i++) {
        aux[i] = new Array(tam_media);
    }
    for (let i = 0; i < tam_media; i++) {
        for (let j = 0; j < tam_media; j++) {
            aux[i][j] = 0;
        }
    }
    //--------------start---------------//
    for (let i = 0; i < tam_media; i++) {
        for (let j = 0; j < tam_media; j++) {
            //1
            aux[i][j] += matriz[i][j] * mascara[1][1];
            //2
            if (i - 1 >= 0 && i - 1 < tam_media && j - 1 >= 0 && j - 1 < tam_media) {
                aux[i][j] += matriz[i - 1][j - 1] * mascara[0][0];
            }
            //3
            if (i - 1 >= 0 && i - 1 < tam_media && j >= 0 && j < tam_media) {
                aux[i][j] += matriz[i - 1][j] * mascara[0][1];
            }
            //4
            if (i - 1 >= 0 && i - 1 < tam_media && j + 1 >= 0 && j + 1 < tam_media) {
                aux[i][j] += matriz[i - 1][j + 1] * mascara[0][2];
            }
            //5
            if (i >= 0 && i < tam_media && j - 1 >= 0 && j - 1 < tam_media) {
                aux[i][j] += matriz[i][j - 1] * mascara[1][0];
            }
            //6
            if (i >= 0 && i < tam_media && j + 1 >= 0 && j + 1 < tam_media) {
                aux[i][j] += matriz[i][j + 1] * mascara[1][2];
            }
            //7
            if (i + 1 >= 0 && i + 1 < tam_media && j - 1 >= 0 && j - 1 < tam_media) {
                aux[i][j] += matriz[i + 1][j - 1] * mascara[2][0];
            }
            //8
            if (i + 1 >= 0 && i + 1 < tam_media && j >= 0 && j < tam_media) {
                aux[i][j] += matriz[i + 1][j] * mascara[2][1];
            }
            //9
            if (i + 1 >= 0 && i + 1 < tam_media && j + 1 >= 0 && j + 1 < tam_media) {
                aux[i][j] += matriz[i + 1][j + 1] * mascara[2][2];
            }
        }
    }



    for (let i = 0; i < tam_media; i++) {
        for (let j = 0; j < tam_media; j++) {
            aux[i][j] = aux[i][j] / suma;
            aux[i][j] = Math.round(aux[i][j]);
        }
    }
    return aux;
}
algoritmoMedia();