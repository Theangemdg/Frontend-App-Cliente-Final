var usuarios = [
    {
        nombre: "Pedro",
        correo: "Martinez",
        contraseña: "as123",
        latitud: "151515",
        longitud: "151554",
        ordenes: [
            {
                nombreProducto: "Pastel Helado",
                imgProducto: "../img/BasiliosPastelHelado.jpg",
                cantidad: 2,
                descripcion: "Pastel",
                precio: 150.99
            },
            {
                nombreProducto: "Pastel de Corazón",
                imgProducto: "../img/BasiliosPastelCorazon.jpg",
                cantidad: 2,
                descripcion: "Pastele",
                precio: 350.99
            },
            {
                nombreProducto: "Pastel tres leches",
                imgProducto: "../img/Basilios3Leches.jpg",
                cantidad: 2,
                descripcion: "Pastele",
                precio: 250.99
            }
        ],
        pedidos: [],
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
        latitud: "151515",
        longitud: "151554",
        ordenes: [
            {
                nombreProducto: "Media Docena",
                imgProducto: "../img/DkmediaDocena.jpg",
                cantidad: 2,
                descripcion: "Donuts",
                precio: 186.99
            },
            {
                nombreProducto: "Docena de donas",
                imgProducto: "../img/DKDocena.png",
                cantidad: 2,
                descripcion: "Donuts",
                precio: 279.99
            },
            {
                nombreProducto: "Dona + Café",
                imgProducto: "../img/DKDonaCafe.jpg",
                cantidad: 2,
                descripcion: "Donas y café",
                precio: 59.99
            }
        ],
        pedidos: [],
        metodoPago: [{
            nombrePago: "Juan Perez",
            numeroTargeta: "123456",
            FechaExpiracion: "22/02/2022",
            CVV: "756",
        }],
    },
    {
        nombre: "Maria",
        correo: "Rodriguez",
        contraseña: "as123",
        latitud: "151515",
        longitud: "151554",
        ordenes: [
            {
                nombreProducto: "Media Docena",
                imgProducto: "../img/DkmediaDocena.jpg",
                cantidad: 2,
                descripcion: "Donuts",
                precio: 186.99
            },
            {
                nombreProducto: "Docena de donas",
                imgProducto: "../img/DKDocena.png",
                cantidad: 2,
                descripcion: "Donuts",
                precio: 279.99
            },
            {
                nombreProducto: "Dona + Café",
                imgProducto: "../img/DKDonaCafe.jpg",
                cantidad: 2,
                descripcion: "Donas y café",
                precio: 59.99
            }
        ],
        pedidos: [],
        metodoPago: [{
            nombrePago: "Maria Rodriguez",
            numeroTargeta: "123456",
            FechaExpiracion: "22/02/2022",
            CVV: "756",
        }],
    }
];

const formulario = document.getElementById('modalBodyR');
const inputs = document.querySelectorAll('#modalBodyR input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const validarFormulario = (e)=>{
    switch(e.target.name) {
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case 'correo':
            validarCampo(expresiones.correo, e.target, 'correo');
        break;
        case 'contraseña':
            validarCampo(expresiones.password, e.target, 'contraseña');
        break;
    }
}

const validarCampo = (expresion, input, campo)=> {
    if(expresion.test(input.value)){
        document.getElementById(`txt-${campo}`).classList.remove('cajainfo-R-Texto-incorrecto');
        document.getElementById(`txt-${campo}`).classList.add('cajainfo-R-Texto-correcto');
        document.querySelector(`#grupo-${campo} .input-error`).classList.remove('input-error-activo')
    }else{
        document.getElementById(`txt-${campo}`).classList.remove('cajainfo-R-Texto-correcto');
        document.getElementById(`txt-${campo}`).classList.add('cajainfo-R-Texto-incorrecto');
        document.querySelector(`#grupo-${campo} .input-error`).classList.add('input-error-activo')
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

function InicializarDatos() {
    if( JSON.parse(localStorage.getItem('usuarios')) !== ""){
        console.log("no hay nada")
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    
}
InicializarDatos();

var usuariosPortal = JSON.parse(localStorage.getItem('usuarios'));


function agregarUsuario() {
    let txtNombre = document.getElementById('txt-nombre').value;
    let txtCorreo = document.getElementById('txt-correo').value;
    let txtContraseña = document.getElementById('txt-contraseña').value;

    var campos = {
        nombre: false,
        correo: false,
        contraseña: false
    }

    if(txtNombre && txtCorreo && txtContraseña !== " "){
        campos.nombre = true;
        campos.correo = true;
        campos.contraseña = true;
        console.log(campos)
    }


    if (campos.nombre && campos.correo && campos.contraseña === true){
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
        ingresar();
    }else{
        alert("Es necesario rellenar todos los campos")

    }
}

function validarUsuario(correo, contraseña) {
    let bAcces = false;

    for (let i = 0; i < usuariosPortal.length; i++) {
        if (usuariosPortal[i].correo==correo && usuariosPortal[i].contraseña==contraseña ) {
            bAcces = true;
            sessionStorage.setItem('Usuario activo', JSON.stringify(usuariosPortal[i]));
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

    if(ucorreo == "" && contraseña == ""){
        ucorreo = ucorreo = document.getElementById('txt-correo').value;
        contraseña = document.getElementById('txt-contraseña').value;
    }

    bAcceso = validarUsuario(ucorreo, contraseña);
    console.log(bAcceso);

    if(bAcceso == true){
        window.location = "../Htmls/menu-cliente.html"
    }else{
        alert("Credenciales erroneas");
    }
}
