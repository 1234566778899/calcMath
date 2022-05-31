const contenedor = document.querySelector(".matriz1");
const contenedor2 = document.querySelector(".matriz2");
let tam = 3;
let ids;

function actualizarMatriz() {
    let lista = document.querySelectorAll(".cj1");
    for (let i = 0; i < lista.length; i++)
        contenedor.removeChild(lista[i]);

    let fragmento = document.createDocumentFragment();
    let cont = 0;
    ids = new Array(tam);
    for (let i = 0; i < tam; i++) {
        ids[i] = new Array(tam);
    }
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            let element = document.createElement('input');
            element.setAttribute('class', 'cj1');
            element.setAttribute('id', 'n' + cont);
            ids[i][j] = 'n' + cont;
            fragmento.append(element);
            cont++;
        }
    }
    contenedor.style.width = 65 * tam + 'px';
    contenedor.appendChild(fragmento);
}
actualizarMatriz();

function aumentarMatriz() {
    if (tam < 7) tam++;
    else alert("No se puede aumentar la matriz");
    actualizarMatriz();
}

function disminuirMatriz() {
    if (tam > 2) tam--;
    else alert("No se puede disminuir la matriz");
    actualizarMatriz();
}

function completar(value) {
    let lista = document.querySelectorAll('.cj1');
   lista.forEach(element => {
       element.value=value;
   });
}

function aplicarAlgoritmo() {
    contenedor2.style.display = "block";
    let lista = document.querySelectorAll(".cj2");
    for (let i = 0; i < lista.length; i++)
        contenedor2.removeChild(lista[i]);

    let matriz = new Array(tam);
    for (let i = 0; i < tam; i++) {
        matriz[i] = new Array(tam);
    }

    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            matriz[i][j] = document.getElementById("" + ids[i][j]).value;
        }
    }



    let trabajado = new Array(tam);
    for (let i = 0; i < tam; i++) {
        trabajado[i] = new Array(tam);
    }

    for (let i = 0; i < tam; i++)
        for (let j = 0; j < tam; j++)
            trabajado[i][j] = false;

    for (let i = 0; i < tam; i++) {
        let listo = false;
        while (!listo) {
            for (let j = 0; j < tam; j++) {
                if (i == j && matriz[i][j] == 1) {
                    trabajado[i][j] = true;
                }
                if (matriz[i][j] == 1 && !trabajado[i][j]) {
                    trabajado[i][j] = true;
                    for (let k = 0; k < tam; k++) {
                        if (matriz[j][k] == 1) {
                            matriz[i][k] = 1;
                        }
                    }
                }

            }

            for (let j = 0; j < tam; j++) {
                if (matriz[i][j] == 1 && !trabajado[i][j]) {
                    listo = false;
                    break;
                } else {
                    listo = true;
                }
            }
        }
    }

    let frag = document.createDocumentFragment();
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            let element = document.createElement('input');
            element.value= matriz[i][j];
            element.setAttribute('class', 'cj2');
            frag.appendChild(element);
        }
    }
    contenedor2.style.width = tam * 65 + 'px';
    contenedor2.appendChild(frag);
}