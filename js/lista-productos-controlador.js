let listar_productos = async() => {
    let productos;
    var myHeaders = new Headers();
     myHeaders.append("apikey", "0SdtGYumsdP7xXQKCEWU7p5BdZYkwPBv");
    await axios({
            method: 'get',
            headers: myHeaders,
            url: "https://api.apilayer.com/fixer/latest?symbols=MXN%2CCLP%2CARS%2CPEN%2CVEF%2CCOP%2CDOP%2CEUR%2C%20PAB%2CUSD&base=USD", 
            responseType: 'json'
        }).then(function(res) {
            productos = res.data.productos;
        })
        .catch(function(err) {
            console.log(err);
        });
    return productos;
};
