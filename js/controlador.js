const formulario = document.getElementById('modalBodyR');
const inputs = document.querySelectorAll('#modalBodyR input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

function limpiarInputs(){
        
    document.getElementById('txt-nombre').value = "";
    document.getElementById('txt-correo').value = "";
    document.getElementById('txt-contraseña').value = "";      
    document.getElementById('txt-correoI').value = "";
    document.getElementById('txt-contraS').value = "";
}
limpiarInputs();

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
            latitud: "",
            longitud: "",
            ordenes: [],
            pedidos: [],
            metodoPago: []
        }
        
        axios({
            method: 'POST',
            url: "http://localhost/Backend-Portal-Delivery/api/usuarios.php",
            responseType: 'json',
            data: usuario
        }).then(res=>{
            console.log(res.data);
            iniciarUsuarioRegistrado();
        }).catch(err=>{
            console.log(err);
        })
        
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes rellenar todos los campos!',
            confirmButtonColor: '#44bae6',
        })

    }
}

function ingresar() {
    var ucorreo = '';
    var contraseña = '';
    let bAcceso = false;

    ucorreo = document.getElementById('txt-correoI').value;
    contraseña = document.getElementById('txt-contraS').value;

    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/usuarios.php',
        method: 'get',
        responseType: 'json'
    }).then((res) =>{
        console.log(res.data.length);
        for (let i = 0; i<res.data.length; i++) {
            if (res.data[i].correo==ucorreo && res.data[i].contraseña==contraseña ) {
                bAcceso = true;
                sessionStorage.setItem('Usuario activo', JSON.stringify(res.data[i]));
                break;
            }
        }
        if(bAcceso == true){
            window.location = "../Htmls/menu-cliente.html"
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Credenciales erroneas!',
                confirmButtonColor: '#44bae6',
            })
        }
    }).catch(err=>{
        console.log(err);
    })

    console.log(bAcceso);
    
}

function iniciarUsuarioRegistrado() {
    var ucorreo = '';
    var contraseña = '';
    let bAcceso = false;

    ucorreo = document.getElementById('txt-correo').value;
    contraseña = document.getElementById('txt-contraseña').value;

    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/usuarios.php',
        method: 'get',
        responseType: 'json'
    }).then((res) =>{
        console.log(res.data.length);
        for (let i = 0; i<res.data.length; i++) {
            if (res.data[i].correo==ucorreo && res.data[i].contraseña==contraseña ) {
                bAcceso = true;
                sessionStorage.setItem('Usuario activo', JSON.stringify(res.data[i]));
                break;
            }
        }
        if(bAcceso == true){
            window.location = "../Htmls/menu-cliente.html"
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Credenciales erroneas!',
                confirmButtonColor: '#44bae6',
            })
        }
    }).catch(err=>{
        console.log(err);
    })

    console.log(bAcceso);
    
}


