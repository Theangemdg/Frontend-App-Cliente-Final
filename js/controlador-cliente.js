var clienteActivo = JSON.parse(sessionStorage.getItem('Usuario activo'));
console.log(clienteActivo);

function regresarAlandingPage() {
    sessionStorage.setItem('Usuario activo', "");
    window.location = "../Htmls/index.html"
}


function obtenerCliente() {
    document.getElementById('inicarss').innerHTML = "Bienvenido/a " + clienteActivo.nombre;
    document.getElementById('presentacion').innerHTML = "Hola, " + clienteActivo.nombre
}
obtenerCliente();

function generarCategorias() {

    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/categorias.php',
        method: 'get',
        responseType: 'json'
    }).then((res) => {
        document.getElementById('contenedor-categorias').innerHTML = ""
        for (let i = 0; i < res.data.length; i++) {
            document.getElementById('contenedor-categorias').innerHTML +=
                `
            <button type="button" id="Carta-categoria" class="col-3 col-sm-5 col-md-4 col-lg-3 col-xl-2" onclick="empresasCategoria(${i})"  data-bs-toggle="modal" data-bs-target="#empresasModal">
                <img id="icono-categoria" src="${res.data[i].icono}" class="card-img-top rounded-circle" alt="...">
                <div class="card-body">
                    <p class="card-text">${res.data[i].nombreCategoria}</p>
                </div>
            </button>
        `
        }
    }).catch(err => {
        console.log(err);
    })

}
generarCategorias();

function empresasCategoria(codigocategoria) {
    document.getElementById('contenedor-empresas').innerHTML = "";
    document.getElementById('empresasModalLabel').innerHTML = "PORTAL"
    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/categorias.php?id=' + codigocategoria,
        method: 'get',
        responseType: 'json'
    }).then((res) => {
        document.getElementById('empresasModalLabel').innerHTML = `${res.data.nombreCategoria}`
        for (let i = 0; i < res.data.empresas.length; i++) {
            document.getElementById('contenedor-empresas').innerHTML +=
                `
        <div id="empresa">
            <button id="btn-productos" data-bs-toggle="modal" data-bs-target="#modalproductos" onclick="listaProductos(${codigocategoria},${i})">
                <img id="banner-empresa" src="${res.data.empresas[i].imagen}"alt="...">
                <div id="body-empresa" class="card-body">
                    <img id="logo-empresa" src="${res.data.empresas[i].logo}" class="rounded-circle " alt="...">
                    <div>
                        <h2>${res.data.empresas[i].nombreEmpresa}</h2>
                        <p>${res.data.empresas[i].descripcion}</p>
                    </div>
                </div>
            </button>
        </div>
        `

        }
    }).catch(err => {
        console.log(err);
    })


}

function listaProductos(codigocategoria, empresa) {
    document.getElementById('contendor-producto').innerHTML = "";
    document.getElementById('modalproductosLabel').innerHTML = "PORTAL"

    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/productos.php?id=' + codigocategoria + "&idE=" + empresa,
        method: 'get',
        responseType: 'json'
    }).then((res) => {
        document.getElementById('modalproductosLabel').innerHTML = `${res.data.nombreEmpresa}`

        for (let i = 0; i < res.data.productos.length; i++) {
            document.getElementById('contendor-producto').innerHTML +=
                `<div id="producto">
            <div>
                <img class="img-producto rounded-circle" src="${res.data.productos[i].imgProducto}" alt="img">
            </div>
            <div id="info-producto">
                <h2>${res.data.productos[i].nombreProducto}</h2>
                <p>${res.data.productos[i].descripcion}</p>
            </div>
            <div id="pedir-productos">
                <p>${res.data.productos[i].precio}</p>
                <button id="btn-pedir" class="rounded-pill" onclick="abrirformularioPedir(${codigocategoria},${empresa},${i});">Pedir</button>
            </div>
        </div>

        `
        }

    }).catch(err => {
        console.log(err);
    })

}

function abrirformularioPedir(categoria, empresa, producto) {
    document.getElementById('contenedor-orden1').classList.toggle('abrir-categorias');
    document.getElementById('contenedor-orden1').innerHTML = "";

    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/productos.php?id=' + categoria + "&idE=" + empresa + "&idP=" + producto,
        method: 'get',
        responseType: 'json'
    }).then((res) => {
        let Pproduct = res.data.nombreProducto;
        let Pdescripcion = res.data.descripcion;
        let Pprecio = res.data.precio;
        let imagen = res.data.imgProducto;

        document.getElementById('contenedor-orden1').innerHTML =
            `
            <div id="contenedor-orden2">
                <div id="titulo-orden">
                    <h4 style="margin-right: 10px">${Pproduct}</h4>
                    <p style="margin-left: 10px;">${Pprecio}</p>
                </div>
                <div class="flex-orden" style="justify-content: center;">
                    <h5>Ingrese la cantidad</h5>
                    <input id="input-orden" class="rounded-pill" type="text" placeholder="123">
                </div>
                <div class="flex-orden">
                    <button id="btn-cerrarOrden" class="rounded-pill" type="button" onclick="cerrarFormulario()">Cancelar</button>
                    <button id="btn-procesarOrden" class="rounded-pill" type="button" onclick="procesarOrden('${Pproduct}','${Pdescripcion}','${Pprecio}','${imagen}')">Procesar orden</button>
                </div>
            </div>
            `
    }).catch(err => {
        console.log(err);
    })

}

function cerrarFormulario() {
    document.getElementById('contenedor-orden1').classList.remove('abrir-categorias');
    document.getElementById('input-orden').value = "";
}

function procesarOrden(nombrePro, descriProd, Precio, imagenP) {
    let cantidad = document.getElementById('input-orden').value;
    for (let i = 0; i < usuarios.length; i++) {
        if (cantidad == "") {
            alert("Introduce la cantidad antes de prcesar la orden")
            break
        } else {
            if (usuarios[i].nombre == clienteActivo.nombre) {
                let orden = {
                    nombreProducto: nombrePro,
                    imgProducto: imagenP,
                    descripcion: descriProd,
                    cantidad: cantidad,
                    precio: Precio * cantidad
                }
                usuarios[i].ordenes.push(orden);
                clienteActivo.ordenes.push(orden)
                alert("Orden realizada correctamente")
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                sessionStorage.setItem('Usuario activo', JSON.stringify(usuarios[i]));
                cerrarFormulario();
            }
        }

    }
}
