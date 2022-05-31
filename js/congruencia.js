function ResultadoCongruencia() {

    let a = parseInt(document.querySelector('.txta').value);
    let b = parseInt(document.querySelector('.txtb').value);
    let n = parseInt(document.querySelector('.txtn').value);
    let auxa = a;
    let auxb = b;
    let resultado = -1;

    if (a > n) a = a % n;
    if (b > n) b = b % n;

    for (let i = 1; i < 100; i++) {
        if ((a * i - 1) % n == 0) {
            resultado = i;
            break;
        }
    }

    let txtresultado1 = document.querySelector('.txtrespuesta1');
    let txtresultado2 = document.querySelector('.txtrespuesta2');
    let paso1 = document.querySelector('.paso1');
    let paso2 = document.querySelector('.paso2');
    let paso3 = document.querySelector('.paso3');
    let paso4 = document.querySelector('.paso4');
    let paso5 = document.querySelector('.paso5');
    if (resultado != -1) {
        let x = (resultado * b) % n;
        txtresultado1.textContent = "X= " + x;
        txtresultado2.textContent = "Rpta:  X= " + x + " + " + n + "K";

        paso1.textContent = "" + auxa + "X = " + auxb + " mod " + n;

        if (auxa > n || auxb > n)
            paso2.textContent = "" + a + "X = " + b + " mod " + n;
        else
            paso2.textContent = "" + auxa + "X = " + auxb + " mod " + n;

        paso3.textContent = "(" + resultado + ")" + a + "X" + " = (" + resultado + ")" + b + " mod " + n;
        paso4.textContent = "" + resultado * a + "X" + " = " + resultado * b + " mod " + n;
        let op = resultado * b;
        paso5.textContent = "" + resultado * a + "X" + " = (" + n + "°+" + (op % n) + ") mod " + n;

    } else {
        paso1.textContent = "";
        txtresultado2.textContent = "No existe solución";
        txtresultado1.textContent = "";
        paso3.textContent = "";
        paso2.textContent = "";
        paso4.textContent = "";
        paso5.textContent = "";
    }

}

function limpiar() {
    let lista = document.querySelectorAll('.caja');
    lista.forEach(element => {
        element.value = "";
    });
}