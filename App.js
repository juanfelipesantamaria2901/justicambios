//Inicializar conexion con API 
$(document).ready(function() {
    const config = {
        apiKey: "AIzaSyBhXqkq7yJN_TZiaB7Ndf3cWAau-i2ISNs",
        authDomain: "jusicambios.firebaseapp.com",
        databaseURL: "https://jusicambios-default-rtdb.firebaseio.com",
        projectId: "jusicambios",
        storageBucket: "jusicambios.appspot.com",
        messagingSenderId: "818070447962",
        appId: "1:818070447962:web:d5a96879b779ead375f563",
        measurementId: "G-NZHSB0W8JW"
};    
firebase.initializeApp(config); //inicializamos firebase

var filaEliminada; //para capturara la fila eliminada
var filaEditada; //para capturara la fila editada o actualizada

//creamos constantes para los iconos editar y borrar    
const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

var db = firebase.database();
var coleccionProductos = db.ref('Database').child("countries");

var dataSet = [];//array para guardar los valores de los campos inputs del form
var table = $('#tablaProductos').DataTable({
            pageLength : 10,
            lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
            data: dataSet,
            columnDefs: [
                {
                    targets: [2], 
                    visible: false,                         
                },
                {
                    targets: [3], 
                    visible: false,                        
                },
                {
                    targets: [5], 
                    visible: false,                        
                },
                {
                    targets: [6], 
                    visible: false,                        
                },
                {
                    targets: -1,        
                    defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>"+iconoEditar+"</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>"+iconoBorrar+"</button></div></div>"
                }
            ]	   
        });

//Consturccion de la tabla
coleccionProductos.on("child_added", datos => {        
    dataSet = [datos.key, datos.child("currency_name").val(), datos.child("flag").val(), datos.child("iso_code").val(), datos.child("label").val()];
    table.rows.add([dataSet]).draw();
});
coleccionProductos.on('child_changed', datos => {           
    dataSet = [datos.key, datos.child("currency_name").val(), datos.child("flag").val(), datos.child("iso_code").val(), datos.child("label").val()];
    table.row(filaEditada).data(dataSet).draw();
});
coleccionProductos.on("child_removed", function() {
    table.row(filaEliminada.parents('tr')).remove().draw();                     
});
      
//Formulario para agregar o actualizar las Solicitudes
$('form').submit(function(e){                         
    e.preventDefault();
    let id = $.trim($('#id').val());        
    let currency_name = $.trim($('#currency_name').val());
    let flag = $.trim($('#flag').val());         
    let iso_code = $.trim($('#iso_code').val());     
    let label = $('#label').val();                    
    let idFirebase = id;        
    if (idFirebase == ''){                      
        idFirebase = coleccionProductos.push().key;
    };                
    data = {currency_name:currency_name, decimals: 0, flag:flag, is_crypto: false, is_source: false, iso_code:iso_code, label:label};             
    actualizacionData = {};
    actualizacionData[`/${idFirebase}`] = data;
    coleccionProductos.update(actualizacionData);
    id = '';        
    $("form").trigger("reset");
    $('#modalAltaEdicion').modal('hide');
});

//Botones
$('#btnNuevo').click(function() {
    $('#id').val('');        
    $('#currency_name').val('');
    $('#flag').val('');         
    $('#iso_code').val('');      
    $('#label').val('');   
    $("form").trigger("reset");
    $('#modalAltaEdicion').modal('show');
});        

//Editar la solicitud
$("#tablaProductos").on("click", ".btnEditar", function() {    
    filaEditada = table.row($(this).parents('tr'));           
    let fila = $('#tablaProductos').dataTable().fnGetData($(this).closest('tr'));               
    let id = fila[0];
    console.log(id);
    let currency_name = $(this).closest('tr').find('td:eq(0)').text(); 
    let flag = $(this).closest('tr').find('td:eq(1)').text();        
    let iso_code = ($(this).closest('tr').find('td:eq(2)').text());      
    let label = ($(this).closest('tr').find('td:eq(3)').text());    
    $('#id').val(id);        
    $('#currency_name').val(currency_name);
    $('#flag').val(flag);                
    $('#iso_code').val(iso_code);   
    $('#label').val(label);              
    $('#modalAltaEdicion').modal('show');
});  


//Elimiar la solicitud
$("#tablaProductos").on("click", ".btnBorrar", function() {   
    filaEliminada = $(this);
    Swal.fire({
    title: '¿Está seguro de eliminar el producto?',
    text: "¡Está operación no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Borrar'
    }).then((result) => {
    if (result.value) {
        let fila = $('#tablaProductos').dataTable().fnGetData($(this).closest('tr'));   
        console.log(fila);         
        let Id = fila[0];            
        db.ref(`Database/countries/${Id}`).remove()
        Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.','success')
    }
    })        
}); 


});



