const URL_API = 'https://tp-3-grupo-13-backend-programacion-iii.onrender.com'

const mostrarMensajeLogin = () => {
  const container = document.getElementById('card-container')
  if (container) {
    container.innerHTML = '<p>No hay usuario logueado. <a href="./login.html">Iniciá sesión</a></p>'
  }
}

const redirigirALogin = () => {
  sessionStorage.removeItem('usuarioId')
  sessionStorage.removeItem('usuarioData')
  window.location.href = './login.html'
}

const getFotoPerfil = (usuario) => {
  const id = usuario.id || usuario._id || usuario.usuarioId || usuario.userId || usuario.usuario?.id || usuario.usuario?._id
  if (id === 1 || id === '1') return 'carlos.png'
  if (id === 2 || id === '2') return 'sofia.png'
  return usuario.foto || ''
}

const renderPerfil = (usuario) => {
  const container = document.getElementById('card-container')
  if (!container) return

  const foto = getFotoPerfil(usuario)

  container.innerHTML = `
      <div class="perfil-card">
        <img src="../assets/img/${foto}" alt="${usuario.nombre}">
        <h3>${usuario.nombre}</h3>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Miembro desde:</strong> ${usuario.fechaRegistro}</p>
        <h4>Últimos pedidos</h4>
        <ul>
          ${(usuario.ultimosPedidos || []).map(p => `
            <li>${p.fecha} — ${p.servicio} ${p.total > 0 ? '— $' + p.total.toLocaleString() : ''}</li>
          `).join('')}
        </ul>
      </div>
    `
}

const getPerfil = async () => {
  try {
    const id = sessionStorage.getItem('usuarioId')
    const storedData = sessionStorage.getItem('usuarioData')

    if (!id && !storedData) {
      mostrarMensajeLogin()
      return
    }

    if (!id && storedData) {
      const usuario = JSON.parse(storedData)
      console.log('Cargando perfil desde sesión:', usuario)
      renderPerfil(usuario)
      return
    }

    const res = await fetch(`${URL_API}/perfil/${id}`)
    if (!res.ok) {
      redirigirALogin()
      return
    }

    const usuario = await res.json()
    sessionStorage.setItem('usuarioData', JSON.stringify(usuario))
    renderPerfil(usuario)
  } catch (error) {
    console.error('Error al cargar el perfil:', error)
    const container = document.getElementById('card-container')
    if (container) {
      container.innerHTML = '<p>Error al cargar el perfil. Intentá nuevamente.</p>'
    }
  }
}

const perfilButton = document.getElementById('btn-perfil')
if (perfilButton) {
  perfilButton.addEventListener('click', getPerfil)
}

window.addEventListener('DOMContentLoaded', getPerfil)