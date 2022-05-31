let cont = 0;
let canvas1 = document.querySelector('.canvas');
canvas1.width = 600;
canvas1.height = 300;
let contexto = canvas1.getContext('2d');
let arrVertice = [];
let arrLinea = [];
class CVertice {
    constructor(value, x, y) {
        this.x = x;
        this.y = y;
        this.value = value;
    }
    dibujar() {
        contexto.fillStyle = 'black';
        contexto.fillRect(this.x, this.y, 20, 20);
        contexto.font = "12px Verdana";
        contexto.fillStyle = 'white';
        contexto.fillText('' + this.value, this.x + 5, this.y + 15);
    }
}
class CLinea {
    constructor(p1, p2, peso) {
        this.p1 = p1;
        this.p2 = p2;
        this.peso = peso;
    }
    dibujar(colorLinea) {
        contexto.beginPath();
        contexto.strokeStyle = colorLinea;
        contexto.moveTo(arrVertice[this.p1].x + 3, arrVertice[this.p1].y + 3);
        contexto.lineTo(arrVertice[this.p2].x + 3, arrVertice[this.p2].y + 3);
        let x = (arrVertice[this.p1].x + arrVertice[this.p2].x) / 2;
        let y = (arrVertice[this.p1].y + arrVertice[this.p2].y) / 2;
        contexto.font = "12px Verdana";
        contexto.fillStyle = 'red';
        contexto.fillText(this.peso, x, y);
        contexto.fill();
        contexto.stroke();
    }
}

function existeLinea(p1, p2) {
    let verdad = false;
    arrLinea.forEach(element => {
        if (element.p1 == p1 && element.p2 == p2 || element.p2 == p1 && element.p1 == p2) {
            verdad = true;
        }
    });
    return verdad;
}

function dibujarLinea() {
    let punto1 = parseInt(document.querySelector('.punto1').value);
    let punto2 = parseInt(document.querySelector('.punto2').value);
    let peso = parseInt(document.querySelector('.peso').value);
    if (punto1 < arrVertice.length && punto2 < arrVertice.length && punto2 != punto1) {
        let linea = new CLinea(punto1, punto2, peso);
        if (!existeLinea(punto1, punto2))
            arrLinea.push(linea);
        else alert('Ya existe la arista');
    } else {
        alert('El vertice ingresado no existe');
    }

    contexto.clearRect(0, 0, 300, 150);
    for (let i = 0; i < arrLinea.length; i++) {
        arrLinea[i].dibujar('black')
    }
    dibujarVertice();
}
canvas1.addEventListener('click', (e) => {
    let cords = canvas1.getBoundingClientRect();
    let _x = e.clientX - cords.left;
    let _y = e.clientY - cords.top;
    // let x = (_x * 300) / 600;
    // let y = (_y * 150) / 300;
    let x = _x;
    let y = _y;
    let vertice = new CVertice(cont, x, y);
    arrVertice.push(vertice);
    dibujarVertice();
    cont++;
})

function dibujarVertice() {
    arrVertice.forEach(element => {
        element.dibujar();
    });
}

function limpiar() {
    location.reload();
}
let boton = document.querySelector('.boton-linea');
boton.addEventListener('click', () => {
    dibujarLinea();
})

function generarMatriz() {
    let tam = arrVertice.length;
    let matriz = new Array(tam);
    for (let i = 0; i < tam; i++) {
        matriz[i] = new Array(tam);
    }
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            matriz[i][j] = 0;
        }
    }
    for (let i = 0; i < arrLinea.length; i++) {
        matriz[arrLinea[i].p1][arrLinea[i].p2] = arrLinea[i].peso;
        matriz[arrLinea[i].p2][arrLinea[i].p1] = arrLinea[i].peso;
    }
    return matriz;
}

const permutator = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

function getCombinaciones(_num) {
    let num = _num - 1;
    let arrNum = [];
    for (let i = 0; i < num; i++) {
        arrNum.push(i);
    }
    let arraux = permutator(arrNum);
    let fil = arraux.length;
    let col = arraux[0].length + 2;
    let matriz = new Array(fil);
    for (let i = 0; i < fil; i++) {
        matriz[i] = new Array(col);
    }

    for (let i = 0; i < fil; i++) {
        matriz[i][0] = num;
        matriz[i][col - 1] = num;
        for (let j = 1; j < col - 1; j++) {
            matriz[i][j] = arraux[i][j - 1];
        }
    }
    return matriz;
}

function PertenceLinea(p1, p2, cad) {
    for (let i = 1; i < cad.length - 3; i += 5) {
        if ((cad[i] == p1 && cad[i + 2] == p2) || (cad[i] == p2 && cad[i + 2] == p1)) {
            return true;
        }
    }
    return false;
}

function caminoMinimo() {
    let caminos = [];
    let matriz = generarMatriz();
    let tam = matriz.length;
    let combinacion = getCombinaciones(tam);

    let cont = 0;
    let cant = getCombinaciones(tam).length;
    let suma = new Array(cant);
    let k = 0;
    for (let l = 0; l < cant; l++) {
        let cadena = "";
        while (k < tam) {

            for (let i = 0; i < tam; i++) {
                for (let j = 0; j < tam; j++) {
                    try {
                        if (i == combinacion[l][k] && j == combinacion[l][k + 1]) {
                            if (matriz[i][j] == 0) cont += 99;
                            else {
                                cont += matriz[i][j];
                                cadena += ("[" + i + ";" + j + "]");
                            }
                            k++;
                        }
                    } catch {
                        break;
                    }
                }
            }
        }
        caminos.push(cadena);
        k = 0;
        suma[l] = cont;
        cont = 0;
    }
    let menor = 9999;
    let posMinimo;
    for (let i = 0; i < cant; i++) {
        if (suma[i] < menor) {
            menor = suma[i];
            posMinimo = i;
        }
    }
    let txtrecorrido = document.querySelector('.Recorrido');
    let txtcamino = document.querySelector('.caminoMinimo');
    let cad = caminos[posMinimo];
    //if (menor < 99) {
    txtrecorrido.textContent = 'Camino mas corto: ' + cad;
    txtcamino.textContent = 'Longitud: ' + menor;
    //  } else {
    //  txtrecorrido.textContent = 'Camino mas corto: -No es un ciclo hamiltoniano-';
    //txtcamino.textContent = 'Longitud: -error-';
    //}

    contexto.clearRect(0, 0, 600, 300);
    for (let i = 0; i < arrLinea.length; i++) {
        let element = arrLinea[i];
        if (PertenceLinea(element.p1, element.p2, cad)) {
            element.dibujar('green');
        } else {
            element.dibujar('black');
        }

    }
    dibujarVertice();
}