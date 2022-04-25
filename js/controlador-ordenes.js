var clienteActivo = JSON.parse(sessionStorage.getItem('Usuario activo'));

function obtenerPedidos(){
    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/usuarios.php',
        method: 'get',
        responseType: 'json'
    }).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].nombre == clienteActivo.nombre) {
                let idUsuario = i;
                axios({
                    method: 'get',
                    url: "http://localhost/Backend-Portal-Delivery/api/pedidos.php?id=" + idUsuario,
                    responseType: 'json'
                }).then(res => {
                    console.log(res.data);
                    document.getElementById('grupo-ordenes').innerHTML = "";
                    for(let i=0; i<res.data.length; i++){
                        
                        document.getElementById('grupo-ordenes').innerHTML +=
                        `<div id="orden" class="col-12 col-sm-6">
                            <div class="info-orden">
                                <h2>Pedido numero</h2>
                                <p>#${res.data[i].numeroPedido}</p>
                            </div>
                            <div class="info-orden">
                                <h2>productos</h2>
                                <p>${res.data[i].productos.length}</p>
                            </div>
                            <div class="info-orden">
                                <h2>Total</h2>
                                <p>$${res.data[i].total.toFixed(2)}</p>
                            </div>
                            <button id="btn-orden" data-bs-toggle="modal" data-bs-target="#modalDetalle" onclick="obtenerDetalle('${idUsuario}', '${i}')">Ver Detalle del pedido</button>
                        </div>
                        
                        `

                    }
                }).catch(err => {
                    console.log(err);
                })
                break;
            }
        }
    }).catch(err => {
        console.log(err);
    })
}
obtenerPedidos();

function obtenerDetalle(id, idPedido){
    
    document.getElementById('contenedor-compra').innerHTML = "";
    document.getElementById('info-detalle').innerHTML = ""; 
    document.getElementById('contenedor-detalleCompra').innerHTML = "";
    let timerInterval
    Swal.fire({
    title: 'Cargando Pedido!',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
    }
    })
    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/usuarios.php?',
        method: 'get',
        responseType: 'json'
    }).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].nombre == clienteActivo.nombre) {
                axios({
                    method: 'get',
                    url: "http://localhost/Backend-Portal-Delivery/api/pedidos.php?id=" + id+'&idP='+idPedido,
                    responseType: 'json'
                }).then(res => {
                    console.log(res.data);
                    let productos = "";
                    for(let j=0; j<res.data.productos.length; j++){
                        productos += 
                        `   <p>${res.data.productos[j].nombreProducto}</p>
                            <div class="contenedor-producto">
                                <div class="info-product">
                                    <p>Cantidad:</p>
                                    <p>${res.data.productos[j].cantidad}</p>
                                </div>
                                <p>$${res.data.productos[j].precio}</p>
                            </div>
                        `
                    }
                        document.getElementById('info-detalle').innerHTML =
                        `<div>
                            <div>
                                <h2>Pedido #${res.data.numeroPedido}</h2>
                                <hr>
                                <h2>Estado</h2>
                                <div id="icon-estados">
                                    <i class="fa-solid fa-circle"></i>
                                    <i class="fa-solid fa-arrow-right"></i>
                                    <i class="fa-solid fa-circle"></i>
                                    <i class="fa-solid fa-arrow-right"></i>
                                    <i class="fa-solid fa-circle"></i>
                                </div>
                            </div>
                            <div>
                                <h2>Fecha de Pago:</h2>
                                <p>${res.data.fechaPago}</p>
                            </div>
                            <div>
                                <h2>Recibe</h2>
                                <p>${res.data.usuario}</p>
                            </div>
                            <div>
                                <h2>correo:</h2>
                                <p>${res.data.correo}</p>
                            </div>
                        </div>
                        `
                
                        document.getElementById('contenedor-compra').innerHTML =
                        `<div>
                            <h1>Tu Compra</h1>
                            <hr>
                        </div>
                        <div>
                            ${productos}
                        </div>
                        `
                
                        document.getElementById('contenedor-detalleCompra').innerHTML =
                        `<div class="compra">
                            <h2>Sub Total</h2>
                            <p>$${res.data.subTotal}</p>
                        </div>
                        <div class="compra">
                            <h2>ISV</h2>
                            <p>$${res.data.icv.toFixed(2)}</p>
                        </div>
                        <div class="compra">
                            <h2>TOTAL</h2>
                            <p>$${res.data.total.toFixed(2)}</p>
                        </div>
                        `
                    
                    
                }).catch(err => {
                    console.log(err);
                })
                break;
            }
        }
    }).catch(err => {
        console.log(err);
    })


    

    
}