const URL_API = 'https://tp-3-grupo-13-backend-programacion-iii.onrender.com/'

const getEquipo = async () => {
  try {
    document.getElementById('cargando').style.display = 'block'

    const res = await fetch(`${URL_API}/equipo`)
    const equipo = await res.json()

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