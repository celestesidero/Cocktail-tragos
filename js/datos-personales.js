let nombre, apellido, tipoDoc, numeroDoc, fechaNac,
    telefono, emailSecundario, botonGuardar,
    contrasena, botonCambiarContrasena, emailPrincipal, botonGuardarEmail;
let modoCambio = false;

const nombreApellidoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ' -]+$/;
const emailRegex = /^[^@]+@[^@]+\.(com|org|net)$/i;
const numeroDocRegex = /^[0-9]+$/;
const telefonoRegex = /^[0-9+\-() ]+$/;
const contraseniaRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$]).{8,12}$/;

function campoCompleto(campo) {
    return campo.value.trim() !== "";
}

function nombreApellidoValido(campo) {
    return nombreApellidoRegex.test(campo.value.trim());
}

function emailValido(campo) {
    return emailRegex.test(campo.value.trim());
}

function tipoDocValido() {
    const tipo = tipoDoc.value.trim().toUpperCase();
    return ["DNI", "CI", "PASAPORTE"].includes(tipo);
}

function numeroDocValido() {
    return numeroDocRegex.test(numeroDoc.value.trim());
}

function telefonoValido() {
    return telefonoRegex.test(telefono.value.trim());
}

function emailPrincipalValido() {
    return campoCompleto(emailPrincipal) && emailValido(emailPrincipal);
}

function fechaValida() {
    if (!campoCompleto(fechaNac)) 
        return false;

    const partes = fechaNac.value.split("-");  // [YYYY, MM, DD]
    const anio = parseInt(partes[0]);
    const mes = parseInt(partes[1]);
    const dia = parseInt(partes[2]);

    const hoy = new Date();
    let edad = hoy.getFullYear() - anio;

    // ¿Todavía no cumplió este año?
    if (hoy.getMonth() + 1 < mes || (hoy.getMonth() + 1 === mes && hoy.getDate() < dia)) {
        edad--;
    }

    return edad >= 16;
}


function contraseniaValida() {
    return contraseniaRegex.test(contrasena.value.trim());
}

function marcarCampo(campo, esValido) {
    if (!esValido) {
        campo.style.border = "2px solid red";
    } else {
        campo.style.border = "";
    }
}

function validarEmailPrincipal() {
    const valido = emailValido(emailPrincipal);
    botonGuardarEmail.disabled = !valido;
    marcarCampo(emailPrincipal, valido); 
}


// --- VALIDACIÓN GENERAL DEL FORMULARIO ---
function validarFormulario() {
    const nombreOK = campoCompleto(nombre) && nombreApellidoValido(nombre);
    const apellidoOK = campoCompleto(apellido) && nombreApellidoValido(apellido);
    const tipoDocOK = tipoDocValido();
    const numeroDocOK = campoCompleto(numeroDoc) && numeroDocValido();
    const fechaOK = fechaValida();
    const telefonoOK = campoCompleto(telefono) && telefonoValido();
    const emailOK = campoCompleto(emailSecundario) && emailValido(emailSecundario);
    const emailPrincipalOK = campoCompleto(emailPrincipal) && emailValido(emailPrincipal);

    marcarCampo(emailPrincipal, emailPrincipalOK);
    marcarCampo(nombre, nombreOK);
    marcarCampo(apellido, apellidoOK);
    marcarCampo(tipoDoc, tipoDocOK);
    marcarCampo(numeroDoc, numeroDocOK);
    marcarCampo(fechaNac, fechaOK);
    marcarCampo(telefono, telefonoOK);
    marcarCampo(emailSecundario, emailOK);

    const todosValidos = nombreOK && apellidoOK && tipoDocOK && numeroDocOK &&
                         fechaOK && telefonoOK && emailOK;

    //botonGuardar.disabled = !todosValidos;
    return todosValidos;
}

// --- CAMBIO DE CONTRASEÑA ---
function marcarContrasena() {
    const valido = contraseniaValida();
    if (valido) {
        contrasena.style.border = "2px solid green";
    } else {
        contrasena.style.border = "2px solid red";
    }
    return valido;
}

function cambiarContrasena() {
    // Si NO estamos en modo de edición → activar modo edición
    if (!modoCambio) {
        contrasena.readOnly = false;
        contrasena.value = "";
        contrasena.placeholder = "Ingrese nueva contraseña";
        modoCambio = true;
        botonCambiarContrasena.textContent = "GUARDAR";
        contrasena.style.border = ""; // quita bordes previos
        contrasena.focus();
        return;
    }

    // Validación antes de guardar
    if (!contraseniaValida()) {
        marcarContrasena();
        alert(" Contraseña inválida. Debe tener 8-12 caracteres, mayúscula, minúscula, número y un caracter especial");
        return;
    }

    // Guardar la contraseña en sessionStorage
    sessionStorage.setItem("contrasenaActual", contrasena.value.trim());

    alert("Contraseña cambiada.");

    // Restaurar estado original
    contrasena.readOnly = true;
    contrasena.value = "••••••••";
    contrasena.placeholder = "";
    modoCambio = false;
    botonCambiarContrasena.textContent = "CAMBIAR";
    contrasena.style.border = "";
}


// BLOQUEA caracteres inválidos al tipear
function validarNombreApellidoKey(e) {
    const permitido = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ' -]$/;

    // Teclas especiales permitidas
    const teclasEspeciales = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];

    if (teclasEspeciales.includes(e.key)) return;

    // Si el carácter NO coincide -> lo bloqueo
    if (!permitido.test(e.key)) {
        e.preventDefault();
    }
}

function validarNumeroDoc(e) {
    const permitido = /^[0-9]$/;
    const teclasEspeciales = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];

    if (teclasEspeciales.includes(e.key))
        return;

    if (!permitido.test(e.key)) {
        e.preventDefault();
    }
}


function validarTelefono(e) {
    const permitido = /^[0-9+\-() ]$/;
    const teclasEspeciales = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];

    if (teclasEspeciales.includes(e.key))
        return;

    if (!permitido.test(e.key)) {
        e.preventDefault();
    }
}

// LIMPIA cualquier cosa pegada
function limpiarNombreApellidoInput(e) {
    e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÜüÑñ' -]/g, "");
}

function limpiarNumeroDocPegado(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
}

function limpiarTelefonoPegado(e) {
    e.target.value = e.target.value.replace(/[^0-9+\-() ]/g, "");
}

function validarTelefono(e) {
    const permitido = /^[0-9+\-() ]$/;
    const teclasEspeciales = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];

    if (teclasEspeciales.includes(e.key))
        return;

    if (!permitido.test(e.key)) {
        e.preventDefault();
    }
}


document.addEventListener("DOMContentLoaded", () => {
    // Referencias
    nombre = document.getElementById("nombre");
    apellido = document.getElementById("apellido");
    tipoDoc = document.getElementById("tipo-doc");
    numeroDoc = document.getElementById("numero-doc");
    fechaNac = document.getElementById("fecha-nac");
    telefono = document.getElementById("telefono");
    emailSecundario = document.getElementById("email-secundario");
    botonGuardar = document.getElementById("boton-guardar");
    contrasena = document.getElementById("contrasena");
    botonCambiarContrasena = document.querySelector(".boton-cambiar");
    emailPrincipal = document.getElementById("email-principal");
    const emailGuardado = sessionStorage.getItem("emailPrincipal");
    botonGuardarEmail = document.getElementById("boton-guardar-email");
    const formDatosPersonales = document.getElementById("form-datos-personales");

    if (emailGuardado) {
        emailPrincipal.value = emailGuardado;
    }

    botonGuardarEmail.addEventListener("click", () => {
    if (botonGuardarEmail.disabled) 
        return;

    if (!emailValido(emailPrincipal)) {
        marcarCampo(emailPrincipal, false);
        alert("Email inválido.");
        return;
    }

    sessionStorage.setItem("emailPrincipal", emailPrincipal.value.trim());
    alert("Email guardado en esta sesión.");
    });

    document.addEventListener("keydown", (e) => {
        if (e.target.id === "numero-doc")
            validarNumeroDoc(e);
        if (e.target.id === "telefono")
            validarTelefono(e);
    });

    document.addEventListener("input", (e) => {
        if (e.target.id === "numero-doc")
            limpiarNumeroDocPegado(e);
        if (e.target.id === "telefono")
            limpiarTelefonoPegado(e);
    });

    [nombre, apellido].forEach(campo => {
        campo.addEventListener("keydown", validarNombreApellidoKey);
        campo.addEventListener("input", limpiarNombreApellidoInput);
    });
    nombre.addEventListener("input", () => {
        marcarCampo(nombre, nombreApellidoRegex.test(nombre.value));
    });

    apellido.addEventListener("input", () => {
        marcarCampo(apellido, nombreApellidoRegex.test(apellido.value));
    });

    numeroDoc.addEventListener("input", () => {
        marcarCampo(numeroDoc, numeroDocRegex.test(numeroDoc.value));
    });

    telefono.addEventListener("input", () => {
        marcarCampo(telefono, telefonoRegex.test(telefono.value));
    });

    emailPrincipal.addEventListener("input", validarEmailPrincipal);

    emailSecundario.addEventListener("input", () => {
        marcarCampo(emailSecundario, emailRegex.test(emailSecundario.value));
    });

    fechaNac.addEventListener("input", () => {
        marcarCampo(fechaNac, fechaValida());
    });

    tipoDoc.addEventListener("change", () => {
    marcarCampo(tipoDoc, tipoDocValido());
});

formDatosPersonales.addEventListener("submit", (e) => {
    if (!validarFormulario()) {
        // Si la validación falla, prevenimos el envío del formulario
        e.preventDefault(); 
    }
});
    botonCambiarContrasena.addEventListener("click", cambiarContrasena);
    contrasena.addEventListener("input", () => {
        if (modoCambio) 
            marcarContrasena();
    });

});