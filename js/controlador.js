var usuarios = [
    {
        nombre: "Pedro",
        correo: "Martinez",
        contraseña: "as123",
        ubicacion: "col-flor",
        ordenes: [
            {
                nombreProducto: "Producto 1",
                descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
                cantidad: 3,
                precio: 49.99
            },
            {
                nombreProducto: "Producto 2",
                descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
                cantidad: 1,
                precio: 49.99
            }
        ],
        metodoPago: [{
            nombrePago: "Pedro Martinez",
            numeroTargeta: "123456",
            FechaExpiracion: "22/02/2022",
            CVV: "756",
        }]
    },
    {
        nombre: "Juan",
        correo: "Perez",
        contraseña: "as123",
        ubicacion: "col-flor",
        ordenes: [
            {
                nombreProducto: "Producto 3",
                descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
                cantidad: 2,
                precio: 49.99
            },
            {
                nombreProducto: "Producto 2",
                descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
                cantidad: 4,
                precio: 49.99
            }
        ],
        metodoPago: [{
            nombrePago: "Juan Perez",
            numeroTargeta: "123456",
            FechaExpiracion: "22/02/2022",
            CVV: "756",
        }]
    },
    {
        nombre: "Maria",
        correo: "Rodriguez",
        contraseña: "as123",
        ubicacion: "col-flor",
        ordenes: [
            {
                nombreProducto: "Producto 4",
                descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
                cantidad: 5,
                precio: 49.99
            },
            {
                nombreProducto: "Producto 1",
                descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
                cantidad: 4,
                precio: 49.99
            }
        ],
        metodoPago: [{
            nombrePago: "Maria Rodriguez",
            numeroTargeta: "123456",
            FechaExpiracion: "22/02/2022",
            CVV: "756",
        }]
    }
];


function InicializarDatos() {
    if (JSON.parse(localStorage.getItem('usuarios')) == null) {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

}
InicializarDatos();

var usuariosPortal = JSON.parse(localStorage.getItem('usuarios'));


function agregarUsuario() {
    let txtNombre = document.getElementById('txt-nombre').value;
    let txtCorreo = document.getElementById('txt-correo').value;
    let txtContraseña = document.getElementById('txt-contraseña').value;

    let usuario =
    {
        nombre: txtNombre,
        correo: txtCorreo,
        contraseña: txtContraseña,
        ordenes: [],
        metodoPago: []
    }

    console.log(usuario)
    usuariosPortal.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosPortal));
}

function validarUsuario(correo, contraseña) {
    var bAcces = false;

    for (let i = 0; i < usuariosPortal.length; i++) {
        if (usuariosPortal[i].correo==correo && usuariosPortal[i].contraseña==contraseña ) {
            bAcces = true;
            sessionStorage.setItem('Usuario activo', usuariosPortal[i].nombre);
        }
    }

    return bAcces;
}

function ingresar() {
    var ucorreo = '';
    var contraseña = '';
    var bAcces = false;

    ucorreo = document.getElementById('txt-correo').value;
    contraseña = document.getElementById('txt-contraseña').value;

    bAcces = validarUsuario(ucorreo, contraseña);
    console.log(bAcces);

    if(bAcces == true){
        document.getElementById('contenido-page').classList.toggle('d-none');
        document.getElementById('menu-lateral').classList.toggle('d-none');
        document.getElementById('cont-menu').style.backgroundColor = 'rgba(68, 186, 230, 1)';

        document.getElementById('menu-lateral').innerHTML =
        `
        <div class="container contenedor-1">
            <div style="margin-top: 40px;">
                <img id="profile-photo" src="img/default-profile.jpg" class="rounded-circle position-img"alt="">
                <a id="inicarss" href="#">Iniciar Sesion</a>
            </div>
        </div>
        <div class="container contenedor-2">
            <button type="button">Carrito</button>
            <button type="button">Cerrar Sesion</button>
            <button type="button">Estado de las ordenes</button>
        </div>
        `
    }else{
        alert("Credenciales erroneas");
    }
}
