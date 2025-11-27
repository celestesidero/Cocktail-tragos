// --- Variables globales ---
let email, contrasenia, boton, formulario;

// --- Expresiones regulares ---
const emailValido = /^[^@]+@[^@]+\.(com|org|net)$/i;
const contraseniaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$]).{8,12}$/;

// --- Función: validar formato de email ---
function validarEmail() {
  const valorEmail = email.value.trim();
  return emailValido.test(valorEmail);
}

// --- Función: validar formato de contraseña ---
function validarContrasenia() {
  const valorContrasenia = contrasenia.value.trim();
  return contraseniaValida.test(valorContrasenia);
}

// --- Función: verificar si los campos están completos ---
function camposCompletos() {
  return email.value.trim() !== "" && contrasenia.value.trim() !== "";
}


// --- Función para actualizar estilos según validez ---
function marcarCampo(campo, esValido) {
  if (!esValido) {
    campo.style.border = "2px solid red";
  } else {
    campo.style.border = ""; // vuelve al borde normal
  }
}

// --- Función: habilitar/deshabilitar botón ---
function actualizarBoton() {
  const emailCorrecto = validarEmail();
  const contraseniaCorrecta = validarContrasenia();
  const completos = camposCompletos();

  marcarCampo(email, emailCorrecto);
  marcarCampo(contrasenia, contraseniaCorrecta);


  // mensaje de contraseña 
      const msg = document.getElementById("mensaje-contrasenia");

   if (!contraseniaCorrecta && contrasenia.value.trim() !== "") {
    msg.textContent = "Debe tener entre 8 y 12 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo (#?!%$).";
  } else {
    msg.textContent = "";
  }


  boton.disabled = !(completos && emailCorrecto && contraseniaCorrecta);
}

// --- Inicialización ---
document.addEventListener("DOMContentLoaded", () => {
  email = document.getElementById("email");
  contrasenia = document.getElementById("contrasenia");
  boton = document.getElementById("boton-enviar");
  formulario = document.getElementById("formulario-login");

  // Escuchar cambios en los inputs
  email.addEventListener("input", actualizarBoton);
  contrasenia.addEventListener("input", actualizarBoton);

  // Enviar formulario
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!boton.disabled) {
        // Redirigir a index
        window.location.href = "../index.html";
    }
  });

  boton.disabled = true;
});
