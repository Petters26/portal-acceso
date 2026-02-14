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

// NAVEGACIÓN CORREGIDA
function avanzar() {
  if (paginaActual < totalPaginas) {
    const p = document.getElementById("p" + paginaActual)
    p.style.zIndex = "100" // La ponemos arriba mientras vuela
    p.classList.add("flipped")

    paginaActual++

    setTimeout(() => {
      if (p.classList.contains("flipped")) {
        p.style.zIndex = "1" // La mandamos al fondo al terminar
      }
    }, 800)
  }
}

function retroceder() {
  if (paginaActual > 1) {
    paginaActual--
    const p = document.getElementById("p" + paginaActual)

    // EL TRUCO: Subimos el z-index al máximo inmediatamente
    p.style.zIndex = "100"
    p.classList.remove("flipped")

    // Después de que la animación termina (800ms),
    // le devolvemos su valor de jerarquía original
    setTimeout(() => {
      if (!p.classList.contains("flipped")) {
        // Esto calcula el z-index basado en su posición original
        // p1 tendrá 60, p2 tendrá 50, etc.
        p.style.zIndex = (totalPaginas - paginaActual + 1) * 10
      }
    }, 800)
  }
}
