let tam = 2;

function cambiarTamanio(value) {
    if (value == '+') {
        tam++;
        if (tam > 10) tam--;
    } else {
        tam--;
        if (tam < 3) tam++;
    }
    $('.cj-input').remove();
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            $('.cj-matriz').append(`
            <input type="text" class="cj-input">
            `);
        }
    }
    $('.cj-matriz').css('width', tam * 72 + '');
    $('.botones').css('width', tam * 72 + '');
    notacion();
}
cambiarTamanio('+');

function limpiar() {
    $('.cj-input').val('');
    $('.trans').text('-');
    $('.reflex').text('-');
    $('.antis').text('-');
    $('.line').remove();
    ctx.clearRect(0, 0, 400, 300);
}

function GenerarMatrizHasse() {

    let matriz = new Array(tam);
    for (let i = 0; i < tam; i++) {
        matriz[i] = new Array(tam);
    }
    let inputs = document.querySelectorAll('.cj-input');
    let it = 0;
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            matriz[i][j] = parseInt(inputs[it].value);
            it++;
        }
    }
    let resultado = new Array(tam);
    for (let i = 0; i < tam; i++) {
        resultado[i] = new Array(tam);
    }
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            resultado[i][j] = matriz[i][j];
        }
    }
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            if (j == i) {
                resultado[i][j] = 0;
            }
        }
    }
    let producto = new Array(tam);
    for (let i = 0; i < tam; i++) {
        producto[i] = new Array(tam);
    }
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            for (let k = 0; k < tam; k++) {
                if (resultado[i][k] == 1 && resultado[k][j] == 1) {
                    producto[i][j] = 1;
                    break;
                } else {
                    producto[i][j] = 0;
                }
            }
        }
    }
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            if (producto[i][j] == 1) resultado[i][j] = 0;
        }
    }
    $('.line').remove();
    for (let i = 0; i < tam; i++) {
        let cadena = '';
        for (let j = 0; j < tam; j++) {
            cadena += resultado[i][j] + ' ';
        }
        $('.resultado').append(`
        <p class="line">${cadena}</p>
        `);
    }
    return resultado;
}


function determinarOrdenParcial() {
    let reflexiva = true;
    let cont2 = 0;
    let matriz = new Array(tam);
    for (let i = 0; i < tam; i++) {
        matriz[i] = new Array(tam);
    }
    let inputs = document.querySelectorAll('.cj-input');
    let it = 0;
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            matriz[i][j] = parseInt(inputs[it].value);
            it++;
        }
    }
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            if (i == j && matriz[i][j] == 0) {
                reflexiva = false;
            }
            if (i != j && ((matriz[i][j] == 0 && matriz[j][i] == 0) || (matriz[i][j] != matriz[j][i]))) {
                cont2++;
            }
        }
    }

    let existe = true;
    let producto = new Array(tam);
    for (let i = 0; i < tam; i++) {
        producto[i] = new Array(tam);
    }
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            for (let k = 0; k < tam; k++) {
                if (matriz[i][k] == 1 && matriz[k][j] == 1) {
                    producto[i][j] = 1;
                    break;
                } else {
                    producto[i][j] = 0;
                }
            }
        }
    }
    for (let i = 0; i < tam && existe; i++) {
        for (let j = 0; j < tam; j++) {
            if (producto[i][j] == 1 && matriz[i][j] == 0) {
                existe = false;
                break;
            }
        }
    }

    if (existe) $('.trans').text('SI');
    else $('.trans').text('NO');
    if (reflexiva) $('.reflex').text('SI');
    else $('.reflex').text('NO');
    if (cont2 == tam * tam - tam) $('.antis').text('SI');
    else $('.antis').text('NO');

    if (existe && reflexiva && cont2 == tam * tam - tam) return true;

    return false;
}

function existe(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].valor == value) return i;
    }
    return false;
}
class Nodito {
    constructor(value, nivel) {
        this.valor = value;
        this.padre = [];
        this.nivel = nivel;
        this.x = 0;
        this.y = 0;
    }
}

function nivel(arr, value) {
    let aux = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].nivel == value) {
            aux.push(arr[i]);
        }
    }
    return aux;
}

function existe(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].valor == value) {
            return true;
        }
    }
    return false;
}

function index(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].valor == value) return i;
    }
    return 0;
}
let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

function circulo(x, y, dato) {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(x, y, 10, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.font = '12px serif';
    ctx.fillStyle = 'white';
    ctx.fillText('' + dato, x - 5, y + 5);
    ctx.fill()
}

function linea(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function cantidad(arr, nivel) {
    let cont = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].nivel == nivel) cont++;
    }
    return cont;
}


function dibujar() {
    let matriz = GenerarMatrizHasse();
    let nodos = [];

    for (let i = 0; i < matriz.length; i++) {
        let cierto = true;
        for (let j = 0; j < matriz.length; j++) {
            if (matriz[i][j] == 1) {
                cierto = false;
                break;
            }
        }
        if (cierto) {
            let nodito = new Nodito(i, 1);
            nodos.push(nodito);
        }
    }
    let cont = 1;
    console.log('1do', nodos[nodos.length - 1].nivel);
    while (cont < tam) {

        for (let i = 0; i < matriz.length; i++) {
            let arr = nivel(nodos, cont);
            for (let j = 0; j < arr.length; j++) {
                if (matriz[i][arr[j].valor] == 1) {
                    if (!existe(nodos, i)) {
                        let nodito = new Nodito(i, cont + 1);
                        nodito.padre.push(arr[j].valor);
                        nodos.push(nodito);
                    } else {
                        nodos[index(nodos, i)].padre.push(arr[j].valor);
                    }
                }
            }
        }
        cont++;
    }
    let y = 30;
    let k = 1;
    console.log('2do', nodos[nodos.length - 1].nivel);
    while (k < nodos[nodos.length - 1].nivel + 1) {
        let x = 0;
        let dx = Math.round(400 / (cantidad(nodos, k) + 1));
        for (let i = 0; i < nodos.length; i++) {
            if (nodos[i].nivel == k) {
                x += dx;
                nodos[i].x = x;
                nodos[i].y = y;
            }
        }
        y += 60;
        k++;
    }
    canvas.height = y + 10;
    ctx.clearRect(0, 0, 400, 300);
    for (let i = 0; i < nodos.length; i++) {
        for (let j = 0; j < nodos.length; j++) {
            if (i != j) {
                for (let k = 0; k < nodos[i].padre.length; k++) {
                    if (nodos[i].padre[k] == nodos[j].valor) {
                        linea(nodos[i].x, nodos[i].y, nodos[j].x, nodos[j].y);
                    }
                }
            }
        }
    }
    let letras=['a','b','c','d','e','f','g','h','i','j'];
    for (let i = 0; i < nodos.length; i++) {
        circulo(nodos[i].x, nodos[i].y, letras[nodos[i].valor]);
    }

}

function todoOK() {
    let cajas = document.querySelectorAll('.cj-input');
    for (let i = 0; i < cajas.length; i++) {
        if (cajas[i].value == '') return false;
    }
    return true;
}

function resultado() {
    if (todoOK()) {
        ctx.clearRect(0, 0, 400, 300);
        GenerarMatrizHasse();
        if (determinarOrdenParcial()) {
            dibujar();
        } else alert('No es un conjunto parcialmente ordenado');
    } else alert('Debe completar todos los campos');
}

function llenar(value) {
    let input = document.querySelectorAll('.cj-input');
    for (let i = 0; i < input.length; i++) {
        input[i].value = value;
    }
}

function mostrar() {
    $('.canvas').toggle();
}

function notacion() {
    let cadena = '';
    let letras=['a','b','c','d','e','f','g','h','i','j'];
    for (let i = 0; i < tam; i++) {
        if (i != tam - 1)
            cadena += letras[i] + ', ';
        else
            cadena += letras[i] + ' ';
    }
    $('.notacion').text('Resultados:  ' + 'A={ ' + cadena + '}');
}
mostrar()
notacion();