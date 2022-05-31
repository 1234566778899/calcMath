let canvas = document.querySelector('.canvas-expancion');
canvas.width=600;
canvas.height=300;
let ctx = canvas.getContext("2d")
let canvas2 = document.querySelector('.canvas-ecualizacion');
canvas2.width=600;
canvas2.height=300;
let ctx2 = canvas2.getContext("2d");


function dibujarHistogramaExpancion() {
    ctx.clearRect(0, 0, 600, 300);
    let arreglo = resultadoExpancion();
    ctx.beginPath();
    ctx.moveTo(30, 280);
    ctx.lineTo(30, 10);
    ctx.moveTo(30, 280);
    ctx.lineTo(500, 280);
    ctx.lineWidth = 1;
    ctx.stroke();
    let mayor = 0;
    arreglo.forEach(element => {
        if (element > mayor) mayor = element;
    });
    let x = 60;
    let cont = 0;
    arreglo.forEach(element => {
        let alto = ((element * 230) / mayor) + 1;
        ctx.fillRect(x, 280 - alto, 30, alto);
        ctx.font = "12px Verdana";
        ctx.fillText("" + element, x+3, 275 - alto - 2);
        ctx.fillText("" + cont, x + 7, 293);
        cont++;
        x += 40;
    });
}
function dibujarHistogramaEcualizacion() {
    ctx2.clearRect(0, 0, 300, 150);
    let arreglo = resultadoEcualizacion();
    ctx2.beginPath();
    ctx2.moveTo(30, 280);
    ctx2.lineTo(30, 10);
    ctx2.moveTo(30, 280);
    ctx2.lineTo(500, 280);
    ctx2.lineWidth = 1;
    ctx2.stroke();
    let mayor = 0;
    arreglo.forEach(element => {
        if (element > mayor) mayor = element;
    });
    let x = 60,
        y = 100;
    let cont = 0;
    arreglo.forEach(element => {
        let alto = ((element * 230) / mayor) + 1;
        ctx2.fillRect(x, 280 - alto, 30, alto);
        ctx2.font = "12px Verdana";
        ctx2.fillText("" + element, x+2, 275 - alto - 2);
        ctx2.fillText("" + cont, x + 7, 293);
        cont++;
        x += 40;
    });
}

function resultadoExpancion() {
    let lista = document.querySelectorAll('.cj-expancion');
    let num = [];
    lista.forEach(element => {
        num.push(parseInt(element.value));
    });
    let minimo = parseInt(document.querySelector('.min').value);
    let maximo = parseInt(document.querySelector('.max').value);
    let min = -1;
    let max = -1;

    for (let i = 0; i < num.length; i++) {
        if (num[i] != 0) {
            min = i;
            break;
        }
    }
    for (let i = num.length - 1; i >= 0; i--) {
        if (num[i] != 0) {
            max = i;
            break;
        }
    }
    let resultado = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = min; i <= max; i++) {
        let pos = Math.round((((maximo - minimo) * (i - min)) / (max - min)) + minimo);
        resultado[pos] = parseInt(num[i]);
    }
    return resultado;
}

function limpiarExpancion() {
    ctx.clearRect(0, 0, 600, 300);
    let lista = document.querySelectorAll('.cj-expancion');
    lista.forEach(element => {
        element.value = "";
    });
}

function limpiarEcualizacion() {
    ctx2.clearRect(0, 0, 600, 300);
    let lista = document.querySelectorAll('.cj-ecualizacion');
    lista.forEach(element => {
        element.value = "";
    });
}

function resultadoEcualizacion() {
    let lista = document.querySelectorAll('.cj-ecualizacion');
    let num = [];
    lista.forEach(element => {
        num.push(parseInt(element.value));
    });

    let total = 0;
    for (let i = 0; i < num.length; i++) {
        total += num[i];
    }
    let suma = [0, 0, 0, 0, 0, 0, 0, 0];
    let cont = 0;
    for (let i = 0; i < num.length; i++) {
        num[i] = num[i] / total;
        cont += num[i];
        suma[i] = cont;
    }

    let res = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 8; i++) {
        let d = Math.round(suma[i] * 7);
        res[d] += num[i];
    }

    let resultado = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 8; i++) {
        let d = Math.round(res[i] * total);
        resultado[i] = d;
    }
    return resultado;
}