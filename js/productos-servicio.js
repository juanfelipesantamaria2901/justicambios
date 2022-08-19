const tbody = document.querySelector('#tbl-productos tbody');
let mostrar_datos = async() => {
    let productos = await listar_productos();
    tbody.innerHTML = '';
    for (let i = 0; i < productos.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = productos[i]['rates']['USD'];
        fila.insertCell().innerHTML = productos[i]['rates']['MXN'];
        fila.insertCell().innerHTML = productos[i]['rates']['CLP'];
        fila.insertCell().innerHTML = productos[i]['rates']['ARS'];
        fila.insertCell().innerHTML = productos[i]['rates']['PEN'];
        fila.insertCell().innerHTML = productos[i]['rates']['VEF'];
        fila.insertCell().innerHTML = productos[i]['rates']['COP'];
        fila.insertCell().innerHTML = productos[i]['rates']['DOP'];
        fila.insertCell().innerHTML = productos[i]['rates']['EUR'];
        fila.insertCell().innerHTML = productos[i]['rates']['PAB'];
    }
};
mostrar_datos();