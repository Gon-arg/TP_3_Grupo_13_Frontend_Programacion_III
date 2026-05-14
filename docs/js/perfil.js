const URL_API = 'https://tp-3-grupo-13-backend-programacion-iii.onrender.com/'

const mostrarMensajeLogin = () => {
  const container = document.getElementById('card-container')
  if (container) {
    container.innerHTML = '<p>No hay usuario logueado. <a href="./login.html">Iniciá sesión</a></p>'
  }
}

const redirigirALogin = () => {
  sessionStorage.removeItem('usuarioId')
  window.location.href = './login.html'
}

const getPerfil = async () => {
  try {
    const id = sessionStorage.getItem('usuarioId')
    if (!id) {
      mostrarMensajeLogin()
      return
    }

    const res = await fetch(`${URL_API}/perfil/${id}`)
    if (!res.ok) {
      redirigirALogin()
      return
    }

    const usuario = await res.json()
    const container = document.getElementById('card-container')
    container.innerHTML = `
      <div class="perfil-card">
        <img src="/assets/img/${usuario.foto}" alt="${usuario.nombre}">
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