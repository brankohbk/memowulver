
// let elementos = [
//   {nombre:"Uno"},
//   {nombre:"Dos"},
//   {nombre:"Tres"},
//   {nombre:"Cuatro"},
//   {nombre:"Cinco"},
//   {nombre:"Seis"},
// ]

elementos = [
  {
    nombre: "todas",
    fondo: "./assets/todas.jpg"
  },
  {
    nombre: "balar",
    fondo: "./assets/balar.jpg"
  },
  {
    nombre: "dagda",
    fondo: "./assets/dagda.jpg"
  },
  {
    nombre: "kelpie",
    fondo: "./assets/kelpie.jpg"
  },
  {
    nombre: "morrigan",
    fondo: "./assets/morrigan.jpg"
  },
  {
    nombre: "nidhogg",
    fondo: "./assets/nidhogg.jpg"
  },
]
let cartas = [...elementos, ...elementos]

const tablero = document.querySelector(".tablero")


function mezclar(array) {
  let indexActual = array.length

  // Mientras haya elementos
  while (indexActual !== 0) {
    // ...tomar un elemento aleatoreamente...
    let indexAleatorio = Math.floor(Math.random() * indexActual);
    indexActual--;
    // ... e intercambiarlo con el elemento actual.
    [array[indexActual], array[indexAleatorio]] = [array[indexAleatorio], array[indexActual]];
  }

  return array;
}

let cartasMezcladas = mezclar(cartas)

function llenarTablero(array) {  
  array.forEach(carta => {
    let card = document.createElement("div")
    card.classList.add("card")
    card.dataset.nombre = carta.nombre
    // card.innerHTML = `<span> ${carta.nombre} </span>`
    tablero.appendChild(card)
  });
}

llenarTablero(cartasMezcladas)




let indicadorPuntos = document.querySelector("#indicador-puntos")
tablero.addEventListener("click", e => handleClick(e))
let cartaActiva = null
let aciertos = 0
let fallas = 0

function handleClick(e) {
  if (e.target.dataset.nombre && !e.target.classList.contains("emparejada")) {
    let cartaSeleccionada = e.target
    cartaSeleccionada.classList.add("activa")
    cartaSeleccionada.style.backgroundImage = `url('./assets/${cartaSeleccionada.dataset.nombre}.jpg')`


    if (cartaActiva) {
      if (cartaActiva !== cartaSeleccionada && cartaActiva.dataset.nombre === cartaSeleccionada.dataset.nombre) {
        aciertos++
        tablero.querySelectorAll(".activa").forEach(card => {
          card.classList.add("emparejada")
          card.classList.remove("activa")
        })
      } else {
        tablero.querySelectorAll(".activa").forEach(card => card.classList.add("error"))
        fallas++
        tablero.style.pointerEvents = "none"
        setTimeout(() => {
          tablero.style.pointerEvents = ""
          tablero.querySelectorAll(".activa").forEach(card => {
            card.classList.remove("activa")
            card.classList.remove("error")
            card.style.backgroundImage = `url('./assets/wulver.jpg')`

          })
        }, 1500);
      }
      cartaActiva = null

    } else {
      cartaActiva = cartaSeleccionada
    }
  }

  indicadorPuntos.innerText = aciertos - fallas

  if (aciertos === elementos.length) {
    let modal = document.querySelector(".modal-backdrop")
    modal.style.display = "grid"
    modal.addEventListener("click", () => {
      modal.style.display = "none"
      modal.removeEventListener("click")
    })
  }

}
