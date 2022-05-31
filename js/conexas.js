let tam_conexas = 4;

function GenerarMatrizConexas(value) {
    if (value == '+') tam_conexas++;
    else if (value == '-') tam_conexas--;
    if (tam_conexas > 6) {
        tam_conexas--;
        alert("No se puede agregar mas celdas");
    }
    if (tam_conexas < 2) {
        tam_conexas++;
        alert("No se puede quitar mas celdas");
    }

    let contenedor = document.querySelector('.original-matriz-conexas');
    let lista = document.querySelectorAll('.cj-conexas');
    if (lista.length > 0) {
        lista.forEach(element => {
            contenedor.removeChild(element);
        });
    }
    let fragmento = document.createDocumentFragment();
    for (let i = 0; i < tam_conexas; i++) {
        for (let j = 0; j < tam_conexas; j++) {
            let elemento = document.createElement('input');
            elemento.setAttribute('class', 'cj-conexas');
            fragmento.append(elemento);
        }
    }
    contenedor.style.width = 65 * tam_conexas + 'px';
    contenedor.appendChild(fragmento);
}
GenerarMatrizConexas('');

function LlenarMatriz(value) {
    let lista = document.querySelectorAll('.cj-conexas');
    lista.forEach(element => {
        element.value = value;
    });
}

function ResultadoConexas() {
    let contenedor = document.querySelector('.resultado-matriz-conexas');
    let lista = document.querySelectorAll('.cj-resultado-conexas');
    if (lista.length > 0) {
        lista.forEach(element => {
            contenedor.removeChild(element);
        });
    }
    let fragmento = document.createDocumentFragment();
    let arr = algoritmoConexas();
    for (let i = 0; i < tam_conexas; i++) {
        for (let j = 0; j < tam_conexas; j++) {
            let elemento = document.createElement('input');
            elemento.setAttribute('class', 'cj-resultado-conexas');
            elemento.setAttribute('value', arr[i][j]);
            fragmento.append(elemento);
        }
    }
    contenedor.style.width = 65 * tam_conexas + 'px';
    contenedor.appendChild(fragmento);

}

function algoritmoConexas() {

    let matriz = new Array(tam_conexas);
    for (let i = 0; i < tam_conexas; i++) {
        matriz[i] = new Array(tam_conexas);
    }
    let lista = document.querySelectorAll('.cj-conexas');
    let it = 0;
    for (let i = 0; i < tam_conexas; i++) {
        for (let j = 0; j < tam_conexas; j++) {
            matriz[i][j] = parseInt(lista[it].value);
            it++;
        }
    }
    let trabajado = new Array(tam_conexas);
    for (let i = 0; i < tam_conexas; i++) {
        trabajado[i] = new Array(tam_conexas);
    }
    for (let i = 0; i < tam_conexas; i++)
        for (let j = 0; j < tam_conexas; j++)
            trabajado[i][j] = false;

    for (let i = 0; i < tam_conexas; i++) {
        let listo = false;
        while (!listo) {
            for (let j = 0; j < tam_conexas; j++) {
                if (i == j && matriz[i, j] == 1) {
                    trabajado[i][j] = true;
                }
                if (matriz[i][j] == 1 && !trabajado[i][j]) {
                    trabajado[i][j] = true;
                    for (let k = 0; k < tam_conexas; k++) {
                        if (matriz[j][k] == 1) {
                            matriz[i][k] = 1;
                        }
                    }
                }

            }

            for (let j = 0; j < tam_conexas; j++) {
                if (matriz[i, j] == 1 && !trabajado[i, j]) {
                    listo = false;
                    break;
                } else {
                    listo = true;
                }
            }
        }
    }

    let cont = new Array(tam_conexas);
    let cont2 = new Array(tam_conexas);
    for (let i = 0; i < tam_conexas; i++) {
        cont[i] = 0;
        cont2[i] = 0;
    }

    for (let i = 0; i < tam_conexas; i++) {
        for (let j = 0; j < tam_conexas; j++) {
            if (matriz[i][j] == 1) {
                cont[i]++;
                cont2[i]++;
            }
        }
    }


    for (let i = 0; i < tam_conexas; i++) {
        for (let j = 0; j < tam_conexas - 1; j++) {
            if (cont[j] < cont[j + 1]) {
                let num = new Array(tam_conexas);
                for (let k = 0; k < tam_conexas; k++)
                    num[k] = matriz[j][k];
                for (let k = 0; k < tam_conexas; k++)
                    matriz[j][k] = matriz[j + 1][k];
                for (let k = 0; k < tam_conexas; k++)
                    matriz[j + 1][k] = num[k];

                let aux = cont[j];
                cont[j] = cont[j + 1];
                cont[j + 1] = aux;
            }
        }
    }
    for (let i = 0; i < tam_conexas; i++) {
        for (let j = 0; j < tam_conexas - 1; j++) {
            if (cont2[j] < cont2[j + 1]) {
                let num = new Array(tam_conexas);
                for (let k = 0; k < tam_conexas; k++)
                    num[k] = matriz[k][j];
                for (let k = 0; k < tam_conexas; k++)
                    matriz[k][j] = matriz[k][j + 1];
                for (let k = 0; k < tam_conexas; k++)
                    matriz[k][j + 1] = num[k];

                let aux = cont2[j];
                cont2[j] = cont2[j + 1];
                cont2[j][1] = aux;
            }
        }
    }
    return matriz;
}