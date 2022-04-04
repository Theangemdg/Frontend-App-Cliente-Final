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

