const items = document.querySelectorAll(".articulo-categoria")
const buscador = document.getElementById("buscador")
const categorias = document.querySelectorAll(".tab-categoria")
const ratings = document.querySelectorAll(".item-valor-rating")

function carrusel() {
       $(".carrusel").slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              arrows: false,
              dots: true,
              autoplay: true
       })
}

function generaRating() {
       
       ratings.forEach(item => {
              const valor = parseInt(item.textContent)
              item.innerHTML = ""

              const contenedor = document.createElement("div")

              /* logica para crear las estrellas */
              for (let index = 1; index <= 5; index++) {
                     const estrella = document.createElement("i")

                     estrella.classList.add("bi", "bi-star-fill")

                     /* logica para pintar las estrellas */
                     if (index <= valor)
                            estrella.classList.add("estrella-pintada")
                     else
                            estrella.classList.add("estrella")

                     contenedor.appendChild(estrella)

              }
              item.appendChild(contenedor)
       })
}

function seleccionaCategoria() {
       categorias.forEach(item => {
              item.addEventListener("click", () => {
                     categorias.forEach(c => c.classList.remove("selecciona-categoria"))
                     item.classList.add("selecciona-categoria")
              })
       })
}

function buscar() {
       buscador.addEventListener("input", () => {
              const texto = buscador.value.toLowerCase().trim()

              if (texto.length < 3) {
                     items.forEach(item => item.style.display = "grid")
                     return
              }

              items.forEach(item => {
                     const nombre = item.querySelector(".item-valor-nombre").textContent.toLowerCase()
                     const autor = item.querySelector(".item-valor-autor").textContent.toLowerCase()
                     const descripcion = item.querySelector(".item-valor-descripcion").textContent.toLowerCase()
                     if (nombre.includes(texto) || autor.includes(texto) || descripcion.includes(texto))
                            item.style.display = "grid"
                     else
                            item.style.display = "none"
              })
       })
}

function efectoAlHacerClick() {
       items.forEach(item => {
              item.addEventListener("click", () => {
                     item.classList.add("efecto-click")
              })
       })
}

function quitarEfectoMouse() {
       items.forEach(item => {
              item.addEventListener("mouseout", () => {
                     item.classList.remove("efecto-mouse")
              })
       })
}

function efectoAlPasarElMouse() {
       items.forEach(item => {
              item.addEventListener("mouseover", () => {
                     item.classList.add("efecto-mouse")
              })
       })
}

function inicializarRating() {
    generaRating()
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', generaRating)
    }
    
    window.addEventListener('load', generaRating)
    
    setTimeout(generaRating, 300)
    
    window.addEventListener('popstate', generaRating)
    
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            setTimeout(generaRating, 100)
        }
    })
}

efectoAlPasarElMouse()
quitarEfectoMouse()
efectoAlHacerClick()
buscar()
seleccionaCategoria()
generaRating()
inicializarRating()
window.generaRating = generaRating

$(document).ready(carrusel())