// --- Variables globales ---
let email, botonContinuar, formulario;

// --- Expresión regular para validar email ---
const emailValido = /^[^@]+@[^@]+\.(com|org|net)$/i;

// --- Función: validar formato de email ---
function validarEmail() {
  const valor = email.value.trim();
  return emailValido.test(valor);
}

// --- Función: verificar si el campo está completo ---
function campoCompleto() {
  return email.value.trim() !== "";
}

// --- Función principal de validación ---
function validarCampo() {
  const completo = campoCompleto();
  const formatoValido = validarEmail();

  // Campo vacío o con formato inválido → borde rojo
  if (!completo || !formatoValido) {
    email.style.border = "2px solid red";
    botonContinuar.disabled = true;
  } else {
    email.style.border = "";
    botonContinuar.disabled = false;
  }
}

// --- Inicialización ---
document.addEventListener("DOMContentLoaded", () => {
  email = document.getElementById("email");
  botonContinuar = document.getElementById("boton-enviar");
  formulario = document.getElementById("caja-entrada");

  // Al inicio, el botón está deshabilitado
  botonContinuar.disabled = true;

  // Escuchar cambios en el input
  email.addEventListener("input", validarCampo);

  // Controlar envío del formulario
  formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el envío real

    if (validarEmail()) {
      // Si el email es válido, redirige al login
      alert("Código de recuperación enviado"); 
      window.location.href = "login.html";
    } else {
      // Si no es válido, marcar el campo en rojo
      email.style.border = "2px solid red";
      botonContinuar.disabled = true;
    }
  });
});

