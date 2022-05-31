class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.izq = null;
        this.der = null;
        this.letra = '';
    }
}

function insertarNodo(izq, der) {
    nodo = new Nodo(izq.dato + der.dato);
    nodo.izq = izq;
    nodo.der = der;
    return nodo;
}

function ordenarLista(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j].dato > arr[j + 1].dato) {
                aux = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = aux;
            }
        }
    }
    return arr;
}

function nuevaLista(arr, arbol) {
    let aux = [];
    aux.push(arbol);
    for (let i = 2; i < arr.length; i++) {
        aux.push(arr[i]);
    }
    aux = ordenarLista(aux);
    return aux;
}

function huffman(arr, letras) {
    let arbol = null;
    let listNodo = [];
    for (let i = 0; i < arr.length; i++) {
        let nodo = new Nodo(arr[i]);
        nodo.letra = letras[i];
        listNodo.push(nodo);
    }
    listNodo = ordenarLista(listNodo);

    while (listNodo.length > 1) {
        arbol = insertarNodo(listNodo[0], listNodo[1]);
        listNodo = nuevaLista(listNodo, arbol);
    }
    return arbol;
}

function nodosCompletos(arbol) {
    if (arbol == null) {
        return 0;
    } else {
        if (arbol.izq != null && arbol.der != null)
            return nodosCompletos(arbol.izq) + nodosCompletos(arbol.der) + 1;
        return nodosCompletos(arbol.izq) + nodosCompletos(arbol.der);
    }
}

function dibujarNodo(x, y, dato) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, true);
    ctx.font = '15px serif';
    ctx.fillText('' + dato, x - 8, y + 5);
    ctx.stroke();
}

function dibujarLinea(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function dibujarArbol(arbol, x, y) {
    if (arbol == null) {
        return;
    } else {
        let extra = nodosCompletos(arbol) * 12;
        if (arbol.letra == '')
            dibujarNodo(x, y, arbol.dato);
        else dibujarNodo(x, y, arbol.letra);

        if (arbol.izq != null) dibujarLinea(x, y + 23, x - 10 - extra, y + 60)
        if (arbol.der != null) dibujarLinea(x, y + 23, x + 10 + extra, y + 60)

        dibujarArbol(arbol.der, x + 20 + extra, y + 80);
        dibujarArbol(arbol.izq, x - 20 - extra, y + 80);
    }
}
let tam = 5;

function mostrarCantidad() {
    $('.cantidad').text(`Cantidad: ${tam}`);
}

function cambiarTamanio(value) {
    if (value == '+') {
        tam++;
        if (tam > 14) tam--;
    } else {
        tam--;
        if (tam < 3) tam++;
    }
    $('.cj-input').remove();
    for (let i = 0; i < tam; i++) {
        $('.padre-input').append(`
        <div class="d-flex flex-column cj-input">
            <input type="text" placeholder="" class="letra">
             <input type="text" placeholder="" class="valor">
        </div>
        `);
    }
    mostrarCantidad();
}
cambiarTamanio('+');
let canvas = document.querySelector('.canvas');
canvas.width = $('.cj-canvas').width() - 17;;
canvas.height = 700;
let ctx = canvas.getContext('2d');

// let arrValor = [8, 12, 15, 10, 20, 9];
// let arrLetra = ['a', 'b', 'c', 'd', 'e', 'f'];
let arrValor = [];
let arrLetra = [];


function obtenerValores() {
    arrLetra = [];
    arrValor = [];
    let letras = document.querySelectorAll('.letra');
    let valores = document.querySelectorAll('.valor');
    for (let i = 0; i < letras.length; i++) {
        arrValor.push(parseInt(valores[i].value));
        arrLetra.push(letras[i].value);
    }
}
let muestra = true;

function limpiarCanvas() {
    $('.fila').remove();
    $('.cuerpo').append(`
    <tr class="fila">
        <th scope="row">-</th>
        <td>-</td>
        <td>-</td>
        <td>-</td>
    </tr>
    <tr class="fila">
        <th scope="row">-</th>
        <td>-</td>
        <td>-</td>
        <td>-</td>
    </tr>
    `);
    let valores = document.querySelectorAll('.valor');
    let letras = document.querySelectorAll('.letra');
    for (let i = 0; i < valores.length; i++) {
        valores[i].value = '';
        letras[i].value = '';
    }
    $('.cj-resultado').css('display', 'none');
    ctx.clearRect(0, 0, 1320, 700);
    $('.cj-canvas').toggle();
    $('.btn-mostrar').text('Mostrar árbol');
    muestra = true;
}
let arrNodo = [];
let cadena = '';
let arrBinario = [];

function obtenerNodos(arbol) {
    if (arbol == null)
        return;
    else {
        arrNodo.push(arbol);
        obtenerNodos(arbol.izq);
        obtenerNodos(arbol.der);
    }
}

function encontrarNodoPadre(nodo) {
    if (arrNodo[0] == nodo) return;
    for (let i = 0; i < arrNodo.length; i++) {
        if (arrNodo[i].izq != null && arrNodo[i].der != null) {
            if (arrNodo[i].izq == nodo) {
                cadena += '0';
                encontrarNodoPadre(arrNodo[i]);
                return;
            }
            if (arrNodo[i].der == nodo) {
                cadena += '1';
                encontrarNodoPadre(arrNodo[i]);
                return;
            }

        }
    }
}

function obtenerBinarios() {
    let arrHojas = [];
    for (let i = 0; i < arrNodo.length; i++) {
        if (arrNodo[i].letra != '') arrHojas.push(arrNodo[i]);
    }
    for (let i = 0; i < arrHojas.length; i++) {
        cadena = '';
        encontrarNodoPadre(arrHojas[i]);
        let hoja = {
            caracter: arrHojas[i].letra,
            binario: cadena.split("").reverse().join(""),
            valor: arrHojas[i].dato
        }
        arrBinario.push(hoja);
    }
}

function mostrarBinarios() {
    $('.fila').remove();
    let suma = 0;
    let total = arrNodo[0].dato;
    for (let i = 0; i < arrBinario.length; i++) {
        $('.cuerpo').append(`
        <tr class="fila">
            <th scope="row">${arrBinario[i].caracter}</th>
            <td>${arrBinario[i].valor}</td>
            <td>${arrBinario[i].binario}</td>
            <td>${(arrBinario[i].binario.length)*(arrBinario[i].valor)}</td>
        </tr>
        `);
        suma += (arrBinario[i].binario.length) * (arrBinario[i].valor);
    }
    $('.cuerpo').append(`
        <tr class="fila">
            <th scope="row">TOTAL</th>
            <td>${total}</td>
            <td>-</td>
            <td>${suma}</td>
        </tr>
        `);
    let reduccion = (suma / (total * 8)) * 100;
    $('.f1').text(`Originalmente: ${total}x8=${total*8}`);
    $('.f2').text(`Huffman: ${suma} bits`);
    $('.f3').text(`(${suma}/${total*8})*100=${reduccion.toFixed(2)}%`);
    $('.f4').text(`Se redujo a ${reduccion.toFixed(2)}%`);
}

function toOK() {
    let letras = document.querySelectorAll('.letra');
    let valores = document.querySelectorAll('.valor');
    for (let i = 0; i < letras.length; i++) {
        if (letras[i].value == '' || valores[i].value == '') return false;
    }
    return true;
}

function resultado() {
    if (toOK()) {
        ctx.clearRect(0, 0, 1320, 700);
        let ancho = $('.canvas').width();
        let x = ancho / 2;
        let y = 35;
        obtenerValores();
        dibujarArbol(huffman(arrValor, arrLetra), x, y);
        arrNodo = [];
        obtenerNodos(huffman(arrValor, arrLetra));
        arrBinario = [];
        obtenerBinarios();
        mostrarBinarios();
        $('.cj-resultado').css('display', 'block');
    } else alert('Debe completar todos los campos');
}

function mostrarArbol() {
    if (toOK()) {
        muestra = !muestra;
        $('.cj-canvas').toggle();
        if (!muestra)
            $('.btn-mostrar').text('Mostrar tabla');
        else
            $('.btn-mostrar').text('Mostrar árbol');
        resultado();
    } else alert('Debe completar todos los campos');
}
$('.cj-canvas').toggle();