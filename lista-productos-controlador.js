'use strict';
const tbody = document.querySelector('#tbl-solicitudes tbody');
let mostrar_datos = async() => {
    let solicitudes = await datos();
    tbody.innerHTML = '';
    for (let i = 0; i < solicitudes.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = solicitudes[i]['id'];
        fila.insertCell().innerHTML = solicitudes[i]['text'];
        fila.insertCell().innerHTML = solicitudes[i]['compleato'];
        // fila.insertCell().innerHTML = `<td><button class="btn btn-danger onclick=Eliminar()> Eliminar </button></td>`;
    }
};
mostrar_datos();


//Eliminar 
function Eliminar() {

}
