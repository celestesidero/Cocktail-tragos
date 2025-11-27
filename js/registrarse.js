// --- Variables globales ---
let email, contrasenia, boton, formulario;

// --- Expresiones regulares ---
const emailValido = /^[^@]+@[^@]+\.(com|org|net)$/i;
const contraseniaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$]).{8,12}$/;

// --- Funciones de validación ---
function validarEmail() {
  const valor = email.value.trim();
  return emailValido.test(valor);
}

function validarContrasenia() {
  const valor = contrasenia.value.trim();
  return contraseniaValida.test(valor);
}

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

// --- Validar todos los campos ---
function validarCampos() {
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


  // Habilitar/deshabilitar botón
  boton.disabled = !(completos && emailCorrecto && contraseniaCorrecta);
}

// --- Inicialización ---
document.addEventListener("DOMContentLoaded", () => {
  email = document.getElementById("email");
  contrasenia = document.getElementById("contrasenia");
  boton = document.getElementById("boton-enviar");
  formulario = document.getElementById("formulario-registrarse");

  email.addEventListener("input", validarCampos);
  contrasenia.addEventListener("input", validarCampos);

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!boton.disabled) {
        // Si se guardó correctamente, redirige al login
        window.location.href = "login.html";
      }
  });

  boton.disabled = true;
});
