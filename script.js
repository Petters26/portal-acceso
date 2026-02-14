const frases = [
  ".",
  "Sincronizando núcleos de jefa...",
  "Desplegando Manual de Carácter...",
  "Acceso concedido a Coshi",
]

let paginaActual = 1
const totalPaginas = 6

function iniciarSecuencia() {
  const passInput = document.getElementById("pass")
  const music = document.getElementById("bg-music")
  const login = document.getElementById("login-screen")
  const body = document.body
  const loading = document.getElementById("loading-screen")
  const statusText = document.getElementById("status-text")
  const progressBar = document.getElementById("progress-bar")
  const pdfScreen = document.getElementById("pdf-screen")

  const codigoCorrecto = "coshi"

  if (passInput.value.toLowerCase() !== codigoCorrecto) {
    alert("Código incorrecto. Inténtalo de nuevo.")
    passInput.value = ""
    passInput.focus()
    return
  }

  music.volume = 0
  music
    .play()
    .catch((error) => console.log("El navegador bloqueó el autoplay inicial"))
  let fadeAudio = setInterval(() => {
    if (music.volume < 0.4) {
      music.volume += 0.05
    } else {
      clearInterval(fadeAudio)
    }
  }, 200)

  login.classList.add("hidden")

  setTimeout(() => {
    body.classList.remove("theme-light")
    body.classList.add("theme-dark")

    setTimeout(() => {
      loading.classList.remove("hidden")
      ejecutarCarga(progressBar, statusText, pdfScreen, loading)
    }, 800)
  }, 500)
}

function ejecutarCarga(bar, text, next, current) {
  let progreso = 0
  let fraseIndex = 0

  const intervalo = setInterval(() => {
    progreso += 1
    bar.style.width = progreso + "%"

    if (progreso % 25 === 0 && fraseIndex < frases.length - 1) {
      fraseIndex++
      text.innerText = frases[fraseIndex]
    }

    if (progreso >= 100) {
      clearInterval(intervalo)
      current.classList.add("hidden")
      setTimeout(() => {
        next.classList.remove("hidden")
      }, 500)
    }
  }, 60)
}

function avanzar() {
  if (paginaActual < totalPaginas) {
    const p = document.getElementById("p" + paginaActual)
    p.style.zIndex = "100"
    p.classList.add("flipped")

    paginaActual++

    setTimeout(() => {
      if (p.classList.contains("flipped")) {
        p.style.zIndex = "1"
      }
    }, 800)
  }
}

function retroceder() {
  if (paginaActual > 1) {
    paginaActual--
    const p = document.getElementById("p" + paginaActual)

    p.style.zIndex = "100"
    p.classList.remove("flipped")

    setTimeout(() => {
      if (!p.classList.contains("flipped")) {
        p.style.zIndex = (totalPaginas - paginaActual + 1) * 10
      }
    }, 800)
  }
}
