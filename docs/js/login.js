const URL_API = 'https://tp-3-grupo-13-backend-programacion-iii.onrender.com'

const form = document.querySelector('#login-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const usuario = document.querySelector('#usuario').value
  const password = document.querySelector('#password').value

  try {
    const response = await fetch(`${URL_API}/login`, {  
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: usuario, password })
    })

    if (response.ok) {
      const perfil = await response.json()
      console.log('Login correcto:', perfil)

      const usuarioId = perfil.id || perfil._id || perfil.usuarioId || perfil.userId || perfil.usuario?.id || perfil.usuario?._id
      if (usuarioId) {
        sessionStorage.setItem('usuarioId', usuarioId)
      }
      sessionStorage.setItem('usuarioData', JSON.stringify(perfil))
      window.location.href = './perfil_usuario.html'
    } else {
      alert('Usuario o contraseña incorrectos')
    }
  } catch (error) {
    console.error('Error en login:', error)
  }
})