let tam_mediana = 3;

function GenerarMatrizMediana(value) {
    if (value == '+') tam_mediana++;
    else if (value == '-') tam_mediana--;
    if (tam_mediana > 6) {
        tam_mediana--;
        alert("No se puede aumentar la matriz");
    }
    if (tam_mediana < 2) {
        tam_mediana++;
        alert("No se puede disminuir la matriz");
    }
    let lista = document.querySelectorAll('.cj-original-mediana');
    let contenedor = document.querySelector('.matriz-mediana');
    if (lista.length > 0) {
        lista.forEach(element => {
            contenedor.removeChild(element);
        });
    }
    let fragmento = document.createDocumentFragment();
    for (let i = 0; i < tam_mediana; i++) {
        for (let j = 0; j < tam_mediana; j++) {
            let elemento = document.createElement('input');
            elemento.setAttribute('class', 'cj-original-mediana');
            fragmento.append(elemento);
        }
    }
    contenedor.style.width = 65 * tam_mediana + 'px';
    contenedor.appendChild(fragmento);
}
GenerarMatrizMediana('');

function limpiarMediana() {
    let lista = document.querySelectorAll('.cj-original-mediana');
    lista.forEach(element => {
        element.value = "";
    });
}

function ResultadoMediana() {
    let contenedor = document.querySelector('.resultado-mediana');
    let lista = document.querySelectorAll('.cj-resultado-mediana');
    lista.forEach(element => {
        contenedor.removeChild(element);
    });
    let fragmento = document.createDocumentFragment();
    let arr = algoritmoMediana();
    for (let i = 0; i < tam_mediana; i++) {
        for (let j = 0; j < tam_mediana; j++) {
            let elemento = document.createElement('input');
            elemento.setAttribute('class', 'cj-resultado-mediana');
            elemento.setAttribute('value', arr[i][j]);
            fragmento.append(elemento);
        }
    }
    contenedor.style.width = 65 * tam_mediana + 'px';
    contenedor.appendChild(fragmento);
}

function conteo(value) {
    let c = 0;
    for (let i = 0; i < value.length; i++) {
        if (value[i] != null) c++;
    }
    return c;
}

function algoritmoMediana() {
    let matriz = new Array(tam_mediana);
    for (let i = 0; i < tam_mediana; i++) {
        matriz[i] = new Array(tam_mediana);
    }
    let n = 0;
    let cajas = document.querySelectorAll('.cj-original-mediana');
    for (let i = 0; i < tam_mediana; i++) {
        for (let j = 0; j < tam_mediana; j++) {
            matriz[i][j] = parseInt(cajas[n].value);
            n++;
        }

    }
    let values = [];
    for (let i = 0; i < tam_mediana; i++) {
        for (let j = 0; j < tam_mediana; j++) {
            let lista = [];
            try {
                lista.push(matriz[i - 1][j - 1]);
            } catch {}
            try {
                lista.push(matriz[i - 1][j]);
            } catch {}
            try {
                lista.push(matriz[i - 1][j + 1]);
            } catch {}
            try {
                lista.push(matriz[i][j - 1]);
            } catch {}
            try {
                lista.push(matriz[i][j]);
            } catch {}
            try {
                lista.push(matriz[i][j + 1]);
            } catch {}
            try {
                lista.push(matriz[i + 1][j - 1]);
            } catch {}
            try {
                lista.push(matriz[i + 1][j]);
            } catch {}
            try {
                lista.push(matriz[i + 1][j + 1]);
            } catch {}

            let listaaux = lista.sort(function (a, b) {
                return a - b
            });
            console.log('(' + i + ',' + j + ')' + lista.sort(function (a, b) {
                return a - b
            }));
            console.log('(' + i + ',' + j + ')' + listaaux);
            let cont = conteo(listaaux);
            console.log('(' + i + ',' + j + ')' + cont);
            if (cont % 2 == 0) {
                cont = cont / 2;
                let m = (listaaux[cont - 1] + listaaux[cont]) / 2;
                let valor = Math.round(m);
                values.push(valor);
            } else {
                cont = Math.round(cont / 2);
                values.push(listaaux[cont - 1]);
            }

        }
    }
    let it = 0;
    for (let i = 0; i < tam_mediana; i++) {
        for (let j = 0; j < tam_mediana; j++) {
            matriz[i][j] = values[it];
            it++;
        }
    }
    return matriz;
}