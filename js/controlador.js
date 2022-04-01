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
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
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
    let bAcces = false;

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
    let bAcceso = false;

    ucorreo = document.getElementById('txt-correoI').value;
    contraseña = document.getElementById('txt-contraS').value;

    bAcceso = validarUsuario(ucorreo, contraseña);
    console.log(bAcceso);

    if(bAcceso == true){
        window.location = "../Htmls/menu-cliente.html"
    }else{
        alert("Credenciales erroneas");
    }
}
