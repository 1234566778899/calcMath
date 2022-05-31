let tam_juegos = 2;

let cadena = ['A', 'B', 'C'];

function crearColumna() {
    let elemento_input1 = document.createElement('input');
    let elemento_input2 = document.createElement('input');
    elemento_input1.setAttribute('class', 'txtvalor');
    elemento_input2.setAttribute('class', 'txtvalor');
    let elemento_label = document.createElement('label');
    elemento_label.textContent = ';';
    let elemento_td = document.createElement('td');
    elemento_td.setAttribute('class', 'cuerpo-columna');
    elemento_td.appendChild(elemento_input1);
    elemento_td.appendChild(elemento_label);
    elemento_td.appendChild(elemento_input2);

    return elemento_td;
}

function crearFila(value) {
    let elemento_tr = document.createElement('tr');
    elemento_tr.setAttribute('class', 'cuerpo-fila');
    let elemento_th = document.createElement('th');
    elemento_th.setAttribute('class', 'fila table-dark');
    elemento_th.setAttribute('scope', 'row');
    elemento_th.textContent = value;
    elemento_tr.appendChild(elemento_th);
    for (let i = 0; i < tam_juegos; i++) {
        elemento_tr.appendChild(crearColumna());
    }
    return elemento_tr;
}

function crearCabeza(value) {
    let cabeza_columna = document.createElement('th');
    cabeza_columna.setAttribute('class', 'cabeza-columna');
    cabeza_columna.setAttribute('scope', 'col');
    cabeza_columna.textContent = value;
    return cabeza_columna;
}

function GenerarTabla(value) {

    if (value == '+') tam_juegos++;
    else if (value == '-') tam_juegos--;

    if (tam_juegos > 3) tam_juegos--;
    if (tam_juegos < 2) tam_juegos++;

    let elemento_tbody = document.querySelector('.cuerpo');
    let cuerpo_lista = document.querySelectorAll('.cuerpo-fila');
    cuerpo_lista.forEach(element => {
        elemento_tbody.removeChild(element);
    });
    for (let i = 0; i < tam_juegos; i++) {
        elemento_tbody.appendChild(crearFila(cadena[i]));
    }

    let cabeza = document.querySelector('.cabeza');
    let lista_cabeza = document.querySelectorAll('.cabeza-columna');
    lista_cabeza.forEach(element => {
        cabeza.removeChild(element);
    });
    for (let i = 0; i < tam_juegos; i++) {
        cabeza.appendChild(crearCabeza(cadena[i]));
    }
}
GenerarTabla('');

function mayor(a, b) {
    if (a > b) return '';
    else if (b > a) return b;
    return 'iguales';
}

function mayor2(a, b, c) {
    if (a > b && a > c) return 'a';
    else if (b > a && b > c) return 'b';
    else if (c > a && c > b) return 'c';
    else if (a == b && a > c) return 'ab';
    else if (a == c && a > b) return 'ac'
    else if (b == c && b > a) return 'bc';
    else return 'abc';
}

function MostrarResultado() {
    let lista = document.querySelectorAll('.txtvalor');
    if (tam_juegos == 2) {
        let aux = ['(A;A)', '(A;B)', '(B;A)', '(B;B)'];
        let cont = [0, 0, 0, 0];

        if (mayor(parseInt(lista[0].value), parseInt(lista[4].value)) == lista[0].value) cont[0]++;
        else if (mayor(parseInt(lista[0].value), parseInt(lista[4].value)) == lista[4].value) cont[2]++;
        else {
            cont[0]++;
            cont[2]++;
        }

        if (mayor(parseInt(lista[2].value), parseInt(lista[6].value)) == lista[2].value) cont[1]++;
        else if (mayor(parseInt(lista[2].value), parseInt(lista[6].value)) == lista[6].value) cont[3]++;
        else {
            cont[1]++;
            cont[3]++;
        }

        if (mayor(parseInt(lista[1].value), parseInt(lista[3].value)) == lista[1].value) cont[0]++;
        else if (mayor(parseInt(lista[1].value), parseInt(lista[3].value)) == lista[3].value) cont[1]++;
        else {
            cont[0]++;
            cont[1]++;
        }

        if (mayor(parseInt(lista[5].value), parseInt(lista[7].value)) == lista[5].value) cont[2]++;
        else if (mayor(parseInt(lista[5].value), parseInt(lista[7].value)) == lista[7].value) cont[3]++;
        else {
            cont[2]++;
            cont[3]++;
        }

        let resultado = document.querySelector('.resultado-juegos');
        resultado.textContent = "Equilibrio de Nash: ";
        for (let i = 0; i < 4; i++) {
            if (cont[i] == 2) {
                resultado.textContent += aux[i] + "  ";
            }
        }
    } else {
        let aux = ['(A;A)', '(A;B)', '(A;C)', '(B;A)', '(B;B)', '(B;C)', '(C;A)', '(C;B)', '(C;C)'];
        let cont = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (mayor2(parseInt(lista[0].value), parseInt(lista[6].value), parseInt(lista[12].value)) == 'a') cont[0]++;
        else if (mayor2(parseInt(lista[0].value), parseInt(lista[6].value), parseInt(lista[12].value)) == 'b') cont[3]++;
        else if (mayor2(parseInt(lista[0].value), parseInt(lista[6].value), parseInt(lista[12].value)) == 'c') cont[6]++;
        else if (mayor2(parseInt(lista[0].value), parseInt(lista[6].value), parseInt(lista[12].value)) == 'ab') {
            cont[0]++;
            cont[3]++;
        } else if (mayor2(parseInt(lista[0].value), parseInt(lista[6].value), parseInt(lista[12].value)) == 'ac') {
            cont[0]++;
            cont[6]++;
        } else if (mayor2(parseInt(lista[0].value), parseInt(lista[6].value), parseInt(lista[12].value)) == 'bc') {
            cont[3]++;
            cont[6]++;
        } else {
            cont[0]++;
            cont[3]++;
            cont[6]++;
        }

        if (mayor2(parseInt(lista[2].value), parseInt(lista[8].value), parseInt(lista[14].value)) == 'a') cont[1]++;
        else if (mayor2(parseInt(lista[2].value), parseInt(lista[8].value), parseInt(lista[14].value)) == 'b') cont[4]++;
        else if (mayor2(parseInt(lista[2].value), parseInt(lista[8].value), parseInt(lista[14].value)) == 'c') cont[7]++;
        else if (mayor2(parseInt(lista[2].value), parseInt(lista[8].value), parseInt(lista[14].value)) == 'ab') {
            cont[1]++;
            cont[4]++;
        } else if (mayor2(parseInt(lista[2].value), parseInt(lista[8].value), parseInt(lista[14].value)) == 'ac') {
            cont[1]++;
            cont[7]++;
        } else if (mayor2(parseInt(lista[2].value), parseInt(lista[8].value), parseInt(lista[14].value)) == 'bc') {
            cont[4]++;
            cont[7]++;
        } else {
            cont[1]++;
            cont[4]++;
            cont[7]++;
        }

        if (mayor2(parseInt(lista[4].value), parseInt(lista[10].value), parseInt(lista[16].value)) == 'a') cont[2]++;
        else if (mayor2(parseInt(lista[4].value), parseInt(lista[10].value), parseInt(lista[16].value)) == 'b') cont[5]++;
        else if (mayor2(parseInt(lista[4].value), parseInt(lista[10].value), parseInt(lista[16].value)) == 'c') cont[8]++;
        else if (mayor2(parseInt(lista[4].value), parseInt(lista[10].value), parseInt(lista[16].value)) == 'ab') {
            cont[2]++;
            cont[5]++;
        } else if (mayor2(parseInt(lista[4].value), parseInt(lista[10].value), parseInt(lista[16].value)) == 'ac') {
            cont[2]++;
            cont[8]++;
        } else if (mayor2(parseInt(lista[4].value), parseInt(lista[10].value), parseInt(lista[16].value)) == 'bc') {
            cont[5]++;
            cont[8]++;
        } else {
            cont[2]++;
            cont[5]++;
            cont[8]++;
        }

        if (mayor2(parseInt(lista[1].value), parseInt(lista[3].value), parseInt(lista[5].value)) == 'a') cont[0]++;
        else if (mayor2(parseInt(lista[1].value), parseInt(lista[3].value), parseInt(lista[5].value)) == 'b') cont[1]++;
        else if (mayor2(parseInt(lista[1].value), parseInt(lista[3].value), parseInt(lista[5].value)) == 'c') cont[2]++;
        else if (mayor2(parseInt(lista[1].value), parseInt(lista[3].value), parseInt(lista[5].value)) == 'ab') {
            cont[0]++;
            cont[1]++;
        } else if (mayor2(parseInt(lista[1].value), parseInt(lista[3].value), parseInt(lista[5].value)) == 'ac') {
            cont[0]++;
            cont[2]++;
        } else if (mayor2(parseInt(lista[1].value), parseInt(lista[3].value), parseInt(lista[5].value)) == 'bc') {
            cont[1]++;
            cont[2]++;
        } else {
            cont[0]++;
            cont[1]++;
            cont[2]++;
        }

        if (mayor2(parseInt(lista[7].value), parseInt(lista[9].value), parseInt(lista[11].value)) == 'a') cont[3]++;
        else if (mayor2(parseInt(lista[7].value), parseInt(lista[9].value), parseInt(lista[11].value)) == 'b') cont[4]++;
        else if (mayor2(parseInt(lista[7].value), parseInt(lista[9].value), parseInt(lista[11].value)) == 'c') cont[5]++;
        else if (mayor2(parseInt(lista[7].value), parseInt(lista[9].value), parseInt(lista[11].value)) == 'ab') {
            cont[3]++;
            cont[4]++;
        } else if (mayor2(parseInt(lista[7].value), parseInt(lista[9].value), parseInt(lista[11].value)) == 'ac') {
            cont[3]++;
            cont[5]++;
        } else if (mayor2(parseInt(lista[7].value), parseInt(lista[9].value), parseInt(lista[11].value)) == 'bc') {
            cont[4]++;
            cont[5]++;
        } else {
            cont[3]++;
            cont[4]++;
            cont[5]++;
        }

        if (mayor2(parseInt(lista[13].value), parseInt(lista[15].value), parseInt(lista[17].value)) == 'a') cont[6]++;
        else if (mayor2(parseInt(lista[13].value), parseInt(lista[15].value), parseInt(lista[17].value)) == 'b') cont[7]++;
        else if (mayor2(parseInt(lista[13].value), parseInt(lista[15].value), parseInt(lista[17].value)) == 'c') cont[8]++;
        else if (mayor2(parseInt(lista[13].value), parseInt(lista[15].value), parseInt(lista[17].value)) == 'ab') {
            cont[6]++;
            cont[7]++;
        } else if (mayor2(parseInt(lista[13].value), parseInt(lista[15].value), parseInt(lista[17].value)) == 'ac') {
            cont[6]++;
            cont[8]++;
        } else if (mayor2(parseInt(lista[13].value), parseInt(lista[15].value), parseInt(lista[17].value)) == 'bc') {
            cont[7]++;
            cont[8]++;
        } else {
            cont[6]++;
            cont[7]++;
            cont[8]++;
        }

        let resultado = document.querySelector('.resultado-juegos');
        resultado.textContent = "Equilibrio de Nash: ";
        for (let i = 0; i < 9; i++) {
            if (cont[i] == 2) {
                resultado.textContent += aux[i] + '  ';
            }
        }
    }

}