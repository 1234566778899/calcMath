var x = 0;
var n = 0;
var a = 0;

function GenerarPrimos() {
    let lista_primos = document.querySelectorAll('.item');
    let contenedor = document.querySelector('.lista-primos')
    if (lista_primos.length > 0) {
        lista_primos.forEach(element => {
            contenedor.removeChild(element);
        });
    }

    p = parseInt(document.querySelector('.primo1').value);
    q = parseInt(document.querySelector('.primo2').value);
    n = p * q;
    euler = (p - 1) * (q - 1);
    let k = 1;
    while (k < euler) {
        let esDivisible = false;
        for (let i = 2; i < 100; i++) {
            if (k % i == 0 && euler % i == 0) {
                esDivisible = true;
            }
        }
        if (!esDivisible) agregarLista(k);
        k++;
    }
}

function agregarLista(value) {
    let contenedor = document.querySelector('.lista-primos')
    let elemento = document.createElement('li');
    elemento.setAttribute('class', 'item');
    elemento.textContent = value;
    contenedor.appendChild(elemento);
}

function GenerarClaves(value) {
    a = value;
    let b = 1;
    let resultado = 0;

    for (let i = 1; i < 100; i++) {
        if ((a * i - 1) % euler == 0) {
            resultado = i;
            break;
        }
    }
    x = (resultado * b) % euler;
    document.querySelector('.clave-privada').textContent = "Clave Privada:  (" + n + "," + value + ")";
    document.querySelector('.clave-publica').textContent = "Clave Pública:  (" + n + "," + x + ")";
}
window.addEventListener('click', () => {
    let lista = document.querySelectorAll('.item');
    lista.forEach(element => {
        element.addEventListener('click', () => {
            GenerarClaves(parseInt(element.innerHTML));
        })
    });
})

function ResultadoEncriptar() {
    let btnEncriptar = document.querySelector('#encriptar');
    let btnDesencriptar = document.querySelector('#desencriptar');
    if (btnEncriptar.checked) {
        let valor = document.querySelector('.valor').value;
        let value = parseInt(valor);
        let resultado = 1;
        for (let i = 1; i <= x; i++) {
            resultado *= value;
        }
        document.querySelector('.res').textContent = "Resultado: " + resultado % n;
    } else if (btnDesencriptar.checked) {
        let valor = document.querySelector('.valor').value;
        let value = parseInt(valor);
        let resultado = 1;
        for (let i = 1; i <= a; i++) {
            resultado *= value;
        }
        document.querySelector('.res').textContent = "Resultado: " + resultado % n;
    } else alert("Debe seleccionar una opcion");
}