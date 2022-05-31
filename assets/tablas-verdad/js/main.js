function obtenerTecla(value) {
    document.querySelector('.pantalla').value += value;
}

function limpiar() {
    document.querySelector('.pantalla').value = '';
}

let variables = [];
let preposiciones = [];

function existe(value, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].letra == value) return true;
    }
    return false;
}
function convert(value){
    let cad='';
    for(let i=0;i<value.length;i++){
        cad+=value[i];
    }
    return cad;
}
function obtenerDatos() {
    preposiciones = [];
    variables = [];
    let pantalla = document.querySelector('.pantalla').value;

    let porcion = [];
    let inicio = false;
    for (let i = 0; i < pantalla.length; i++) {
        if (!existe(pantalla[i], variables) && (pantalla[i] == 'p' || pantalla[i] == 'q' ||
                pantalla[i] == 'r' || pantalla[i] == 's'))
            variables.push({
                letra: pantalla[i],
                valores: []
            });

        if (pantalla[i] == ')') {
            inicio = false;
            preposiciones.push(convert(porcion));
            porcion = [];
        }
        if (inicio) {
            porcion.push(pantalla[i]);
        }
        if (pantalla[i] == '(') inicio = true;
    }
    console.log(preposiciones);
    generarTabla();
    console.log('ver');
    ver();
}
obtenerDatos();

function dibujar(variables, tabla1, tabla2, long) {
    $('.tabla-cabecera').html('');
    $('.tabla-cuerpo').html('');
    for (let i = 0; i < variables.length; i++) {
        $('.tabla-cabecera').append(`
        <th scope="col">${variables[i].letra}</th>`);
    }
    for (let i = 0; i < tabla1.length; i++) {
        $('.tabla-cabecera').append(`
        <th scope="col">${tabla1[i].header}</th>`);
    }
    for (let i = 0; i < tabla2.length; i++) {
        $('.tabla-cabecera').append(`
        <th scope="col">${tabla2[i].header}</th>`);
    }
    for (let i = 0; i < long; i++) {
        let lista = ``;
        for (let j = 0; j < variables.length; j++) {
            lista += `<td>${variables[j].valores[i]}</td>`;
        }
        for (let j = 0; j < tabla1.length; j++) {
            lista += `<td>${tabla1[j].valores[i]}`
        }
        for (let j = 0; j < tabla2.length; j++) {
            lista += `<td>${tabla2[j].valores[i]}`
        }
        $('.tabla-cuerpo').append(`
           <tr>${lista}</tr>`);
    }
}

function indice(valor, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].letra == valor) return i;
    }
    return 0;
}
function cortar(nuevo, arr) {
    let op = [];
    op.push(nuevo);
    for (let i = 2; i < arr.length; i++) {
        op.push(arr[i]);
    }
    console.log('nuevo: ',op);
    return op;
}
function obtenerSignos(){
    let pantalla = document.querySelector('.pantalla').value;
    let signos=[];
    for(let i=0;i<pantalla.length;i++){
        if(pantalla[i]==')' && i!=pantalla.length-1){
            signos.push(pantalla[i+1]);
        }
    }
    return signos;
}
function ver() {
    let tabla = [];
    let tam = Math.pow(2, variables.length);
    for (let i = 0; i < preposiciones.length; i++) {
        let aux = extraer(preposiciones[i]);
        let fila1 = [];
        let fila2 = [];
        for (let i = 0; i < tam; i++) {
            if (aux[0].length == 2) {
                if (variables[indice(aux[0][1], variables)].valores[i] == 'V') fila1.push('F');
                else fila1.push('V');
            } else {
                fila1.push(variables[indice(aux[0], variables)].valores[i]);
            }
            if (aux[2].length == 2) {
                if (variables[indice(aux[2][1], variables)].valores[i] == 'V') fila2.push('F');
                else fila2.push('V');
            } else {
                fila2.push(variables[indice(aux[2], variables)].valores[i]);
            }
        }
        let listAux = [];
        for (let i = 0; i < tam; i++) {
            let val = '';
            if (aux[1] == 'v') {
                if (fila1[i] == 'V' || fila2[i] == 'V') {
                    val = 'V';
                } else {
                    val = 'F';
                }
            } else {
                if (fila1[i] == 'V' && fila2[i] == 'V') {
                    val = 'V';
                } else {
                    val = 'F';
                }
            }
            listAux.push(val);
        }
        tabla.push({
            header: preposiciones[i],
            valores: listAux
        })
    }

    let tabla1 = tabla;
    let tabla2 = [];
    let it=0;
    let signos=obtenerSignos();
    while (tabla.length > 1) {  
        let op = {
            header: '(' + tabla[0].header + ')'+signos[it]+'(' + tabla[1].header + ')',
            valores: resolver(tabla[0].valores,tabla[1].valores,signos[it],tam)
        }
        tabla2.push(op);
        tabla = cortar(op, tabla);   
        it++;
    }
    dibujar(variables, tabla1, tabla2, tam);
}
function resolver(arr1, arr2, signo, long) {
    console.log(long);
    let aux = [];
    for (let i = 0; i < long; i++) {
        if (signo == 'v') {
            if (arr1[i] == 'V' || arr2[i] == 'V') {
                aux.push('V');
            } else aux.push('F');
        } else {
            if (arr1[i] == 'V' && arr2[i] == 'V') aux.push('V');
            else aux.push('F');
        }
    }
    return aux;
}
function generarTabla() {
    let cantidad = Math.pow(2, variables.length);
    let total=cantidad;
    cantidad = cantidad / 2;
    let cont = 0;
    let gen = 0;
    let valor = true;
    for (let i = 0; i < variables.length; i++) {
        while (gen < total) {
            if (cont == cantidad) {
                valor = !valor;
                cont = 0;
            }
            if (valor) variables[i].valores.push('F');
            else variables[i].valores.push('V');
            cont++;
            gen++;
        }
        cantidad = cantidad / 2;
        cont = 0;
        gen = 0;
        valor = true;
    }
}

function extraer(value) {
    let arr = [];
    if (value.length == 3) {
        arr.push(value[0]);
        arr.push(value[1]);
        arr.push(value[2]);
    } else if (value.length == 4) {
        if (value[0] == '~') {
            arr.push(value[0] + value[1]);
            arr.push(value[2]);
            arr.push(value[3]);
        } else {
            arr.push(value[0]);
            arr.push(value[1]);
            arr.push(value[2] + value[3]);
        }
    } else {
        arr.push(value[0] + value[1]);
        arr.push(value[2]);
        arr.push(value[3] + value[4]);
    }
    return arr;
}