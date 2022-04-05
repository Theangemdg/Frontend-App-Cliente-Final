var usuarios = JSON.parse(localStorage.getItem('usuarios'))
var categoriasPortal = JSON.parse(localStorage.getItem('categorias'))
console.log(usuarios);
console.log(categoriasPortal);

var clienteActivo = JSON.parse(sessionStorage.getItem('Usuario activo'));
console.log(clienteActivo);

listaOrdenes();

function regresarMenu(){
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function listaOrdenes() {
    document.getElementById('contedor-ordenes').innerHTML = "";
    console.log(clienteActivo.ordenes.length )
    
    let subtotal = 0;
    let ISV = 0.15;

    for(let i=0; i< clienteActivo.ordenes.length ; i++){

        document.getElementById('contedor-ordenes').innerHTML +=
        `
        <div id="contenido-producto" class="shadow-lg p-3 mb-3 bg-body">
            <img id="icono-producto" class="rounded-circle" src="${clienteActivo.ordenes[i].imgProducto}" alt="">
            <div >
                <h2>${clienteActivo.ordenes[i].nombreProducto}</h2>
                <h5>${clienteActivo.ordenes[i].descripcion}</h5>
                <div class="flex-center">
                    <h2>cantidad</h2>
                    <h2>${clienteActivo.ordenes[i].cantidad}</h2>
                </div>
            </div>
            <div>
                <p>$${clienteActivo.ordenes[i].precio.toFixed(2)}</p>
                <button class="fa-regular fa-trash-can" onclick="eliminarOrden('${clienteActivo.ordenes[i].nombreProducto}','${i}')"></button>
            </div>
        </div>
        `
        subtotal += clienteActivo.ordenes[i].precio
    }

    let total= ISV*subtotal + subtotal;

    document.getElementById('contedor-ordenes').innerHTML += 
    `
    <div id="contenedor-detalleCompra">
        <div class="compra">
            <h2>Sub Total</h2>
            <p>$${subtotal.toFixed(2)}</p>
        </div>
        <div class="compra">
            <h2>ISV</h2>
            <p>$${(ISV*subtotal).toFixed(2)}</p>
        </div>
        <div class="compra">
            <h2>TOTAL</h2>
            <p>$${total.toFixed(2)}</p>
        </div>
        <button id="btn-procesar" type="button" data-bs-toggle="modal" data-bs-target="#modalocalizacion">Procesar Orden</button>
    </div>
    `

}

function eliminarOrden(nombre, product){
    for(let i=0; i<clienteActivo.ordenes.length; i++){
        if(usuarios[i].ordenes[product].nombreProducto==nombre){
            clienteActivo.ordenes.splice(i,1);
            usuarios[i].ordenes.splice(i,1)
            break
        }
    }
    listaOrdenes();
    sessionStorage.setItem('Usuario activo', JSON.stringify(clienteActivo));
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

}

function crearOrden(){
    let subtotal = 0;
    let ISV = 0.15;
    let total= ISV*subtotal + subtotal;
    let numeroOrden = clienteActivo.pedidos.length +1;;
    let orden = {
        orden: numeroOrden,
        productos: [],
        estado: "Tomada",
        subtotal: subtotal,
        ISV: ISV*subtotal,
        Total: total
    }

    for(let i=0; i< clienteActivo.ordenes.length ; i++){
        
        orden.productos.push(
            {
            nombreProducto: clienteActivo.ordenes[i].nombreProducto,
            cantidad: clienteActivo.ordenes[i].cantidad,
            precio: clienteActivo.ordenes[i].precio.toFixed(2)
            }
        );
        subtotal += clienteActivo.ordenes[i].precio
        
    }
    
    
    for(let i=0; i<usuarios.length;i++){
        if(usuarios[i].nombre == clienteActivo.nombre){
            clienteActivo.pedidos.push(orden)
            usuarios[i].pedidos.push(orden)
            break
        }
    }

    for(let i=0; i<clienteActivo.ordenes.length ; i++){
        if(usuarios[i].nombre == clienteActivo.nombre){
            usuarios[i].ordenes.splice(0, usuarios[i].ordenes.length);
            clienteActivo.ordenes.splice(0, clienteActivo.ordenes.length)
        }
    }

    sessionStorage.setItem('Usuario activo', JSON.stringify(clienteActivo));
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    console.log(orden);
    

    window.location = "../Htmls/menu-cliente.html"

}


let map;
let marker;
let whacthID;
let geoLoc;

function initMap() {
    var location = { lat: 14.0709873, lng: -87.221397 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location
    });
    marker = new google.maps.Marker({
        position: location,
        map,
    });
    getPosition();
}

function getPosition(){
    if(navigator.geolocation){
        var options = {timeout:60000};
        geoLoc = navigator.geolocation;
        whacthID = geoLoc.watchPosition(showLocationOnMap, errorHandler, options);

    }else{
        alert("Lo sentimos, el navegador no soporta geolocalizacion")
    }
}

function showLocationOnMap(position){
    var latitud = position.coords.latitude;
    var longitud = position.coords.longitude

    console.log("Latitud: " + latitud + "longitud: " + longitud );

    const location = {lat:latitud, lng:longitud};
    marker.setPosition(location);
    map.setCenter(location);

    document.getElementById('contendor-ubicacion').innerHTML = "";
    document.getElementById('contendor-ubicacion').innerHTML +=
    `
    <div class="latitud-longitud">
        <p>Latitud</p>
        <p>${latitud}</p>
    </div>
    <div class="latitud-longitud">
        <p>Longitud</p>
        <p>${longitud}</p>
    </div>
    `
    document.getElementById('footer-ubi').innerHTML="";
    document.getElementById('footer-ubi').innerHTML +=
    `
    <button id="btn-Ubicacion" data-bs-toggle="modal" data-bs-target="#modalTargeta">Fijar Ubicación</button>
    `
    for(let i=0; i<usuarios.length; i++){
        if(usuarios[i].nombre == clienteActivo.nombre ){
            usuarios[i].latitud = latitud;
            usuarios[i].longitud = longitud;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            sessionStorage.setItem('Usuario activo', JSON.stringify(usuarios[i]));
        }

    }
}

function errorHandler(err){
    if(err.code == 1){
        alert("Error: acceso denegado")
    }else if(err.code==2){
        alert("Error: posicion no existe o no se encuentra!")
    }
}

//*Select para llenar el mes
for(let i=1; i<=12; i++){
    let opcion = document.createElement('option')
    opcion.value = i;
    opcion.innerText = i;
    document.getElementById('select-mes').appendChild(opcion);
}

//*select para el año
const yearActual = new Date().getFullYear();
for(let i=yearActual; i<yearActual + 8 ;i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    document.getElementById('select-year').appendChild(opcion);
}

document.getElementById('inputNumero').addEventListener('keyup', (e) => {
    let valorInput = e.target.value;
    document.getElementById('inputNumero').value = valorInput
    //*elimina espacios
    .replace(/\s/g, '')
    //*eliminar letras
    .replace(/\D/g, '')
    // Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();


})

document.getElementById('inputNombre').addEventListener('keyup', (e)=> {
    let valorInputNombre = e.target.value
    document.getElementById('inputNombre').value = valorInputNombre
    .replace(/[0-9]/g, '')
})

document.getElementById('inputCVV').addEventListener('keyup', (e) =>{
    document.getElementById('inputCVV').value = document.getElementById('inputCVV').value
    // Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');
})


