const URL_API = 'https://tp-3-grupo-13-backend-programacion-iii.onrender.com'

const equipo = [
  { id: 1, foto: 'carlos.png', nombre: 'Carlos García', rol: 'Desarrollador Frontend', email: 'carlos@pixelstore.com' },
  { id: 2, foto: 'sofia.png', nombre: 'Sofia López', rol: 'Diseñadora UX/UI', email: 'sofia@pixelstore.com' },
  { id: 3, foto: 'equipo3.png', nombre: 'Miguel Rodríguez', rol: 'DevOps Engineer', email: 'miguel@pixelstore.com' },
  { id: 4, foto: 'equipo4.png', nombre: 'Laura Sánchez', rol: 'Product Manager', email: 'laura@pixelstore.com' },
  { id: 5, foto: 'equipo5.png', nombre: 'Pedro Gómez', rol: 'Analista de Datos', email: 'pedro@pixelstore.com' }
]

const getEquipo = async () => {
  try {
    document.getElementById('cargando').style.display = 'block'

    // Intentar cargar desde API primero
    try {
      const res = await fetch(`${URL_API}/equipo`)
      if (res.ok) {
        const equipoApi = await res.json()
        if (equipoApi && equipoApi.length > 0) {
          renderEquipo(equipoApi)
          return
        }
      }
    } catch (apiError) {
      console.log('API no disponible, usando datos locales:', apiError)
    }

    // Fallback a datos locales
    document.getElementById('cargando').style.display = 'none'
    renderEquipo(equipo)

  } catch (error) {
    console.log('Error al cargar el equipo', error)
    document.getElementById('cargando').textContent = 'Error al cargar el equipo.'
  }
}

const renderEquipo = (equipoData) => {
  document.getElementById('cargando').style.display = 'none'

  const container = document.getElementById('equipo-container')
  container.innerHTML = ''

  equipoData.forEach(m => {
    const item = document.createElement('div')
    item.classList.add('equipo-item')

    // Usar foto del backend o fallback por ID
    const foto = m.foto || (m.id === 1 ? 'carlos.png' : m.id === 2 ? 'sofia.png' : `equipo${m.id}.png`)

    item.innerHTML = `
      <img src="../assets/img/${foto}" alt="${m.nombre}">
      <h3>${m.nombre}</h3>
      <p>${m.rol}</p>
      <p>${m.email}</p>
    `

    container.appendChild(item)
  })
}

getEquipo()