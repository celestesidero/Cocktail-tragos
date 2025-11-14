const items = document.querySelectorAll(".articulo-categoria")
const buscador = document.getElementById("buscador")
const categorias = document.querySelectorAll(".tab-categoria")

efectoAlPasarElMouse()
quitarEfectoMouse()
efectoAlHacerClick()
buscar()
seleccionaCategoria()

$(document).ready(carrusel())

function carrusel() {
       $(".carrusel").slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              arrows: false,
              dots: true,
              autoplay: false
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

