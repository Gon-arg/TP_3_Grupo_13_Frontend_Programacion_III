const URL_API = 'https://tp-3-grupo-13-backend-programacion-iii.onrender.com/'

const equipo = [
 
  { foto: 'equipo1.png', nombre: 'Juan Pérez', rol: 'Desarrollador Backend', email: 'juan@pixelstore.com' },
  { foto: 'equipo2.png', nombre: 'Ana Martínez', rol: 'Tester QA', email: 'ana@pixelstore.com' },
  { foto: 'equipo3.png', nombre: 'Miguel Rodríguez', rol: 'DevOps Engineer', email: 'miguel@pixelstore.com' },
  { foto: 'equipo4.png', nombre: 'Laura Sánchez', rol: 'Product Manager', email: 'laura@pixelstore.com' },
  { foto: 'equipo5.png', nombre: 'Pedro Gómez', rol: 'Analista de Datos', email: 'pedro@pixelstore.com' }
]

const getEquipo = async () => {
  try {
    document.getElementById('cargando').style.display = 'block'

    // Simular fetch con datos locales
    // const res = await fetch(`${URL_API}/equipo`)
    // const equipo = await res.json()

    document.getElementById('cargando').style.display = 'none'

    const container = document.getElementById('equipo-container')

    
    container.innerHTML = ''

    equipo.forEach(m => {
      const item = document.createElement('div')
      item.classList.add('equipo-item')

      item.innerHTML = `
        <img src="../assets/img/${m.foto}">
        <h3>${m.nombre}</h3>
        <p>${m.rol}</p>
        <p>${m.email}</p>
      `

      container.appendChild(item)
    })

  } catch (error) {
    console.log('Error al cargar el equipo', error)
    document.getElementById('cargando').textContent = 'Error al cargar el equipo.'
  }
}

getEquipo()