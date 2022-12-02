'use strict';
const datos = async() => {
    let solicitudes;
    await axios({
        method: 'GET',
        url: 'https://jusicambios-default-rtdb.firebaseio.com/Database3/Solicitudes.json',
        responseType: 'json'
        }).then(function(res) {
            console.log(res.data);
            solicitudes = res.data;
        })
        .catch(function(err) {
            console.log(err);
        });
    return solicitudes;
};