const URL_API = 'https://tp-3-grupo-13-backend-programacion-iii.onrender.com/'

const servicios = [
  { id: 1, imagen: 'joystick.png', nombre: 'Reparación de Joysticks', descripcion: 'Servicio completo de reparación y mantenimiento de joysticks para consolas.', categoria: 'Reparación', precio: 15000 },
  { id: 2, imagen: 'limpieza.png', nombre: 'Limpieza de Consolas', descripcion: 'Limpieza profunda y mantenimiento preventivo para consolas de videojuegos.', categoria: 'Mantenimiento', precio: 8000 },
  { id: 3, imagen: 'pasta.png', nombre: 'Cambio de Pasta Térmica', descripcion: 'Reemplazo de pasta térmica para optimizar el rendimiento de tu PC gaming.', categoria: 'Mantenimiento', precio: 5000 },
  { id: 4, imagen: 'pcalta.png', nombre: 'Armado de PC Alta Gama', descripcion: 'Armado personalizado de PC gaming de alta performance con componentes premium.', categoria: 'Armado', precio: 250000 },
  { id: 5, imagen: 'pcbasica.png', nombre: 'Armado de PC Básica', descripcion: 'Armado de PC gaming básica para principiantes con componentes esenciales.', categoria: 'Armado', precio: 120000 },
  { id: 6, imagen: 'pcmedia.png', nombre: 'Armado de PC Media Gama', descripcion: 'Armado equilibrado de PC gaming con buena relación precio-rendimiento.', categoria: 'Armado', precio: 180000 },
  { id: 7, imagen: 'ps4.webp', nombre: 'Reparación PS4', descripcion: 'Reparación especializada de consolas PlayStation 4.', categoria: 'Reparación', precio: 20000 },
  { id: 8, imagen: 'ps5.png', nombre: 'Reparación PS5', descripcion: 'Servicio técnico autorizado para consolas PlayStation 5.', categoria: 'Reparación', precio: 30000 },
  { id: 9, imagen: 'reparacion.png', nombre: 'Reparación General', descripcion: 'Reparación de diversos dispositivos gaming y accesorios.', categoria: 'Reparación', precio: 0 },
  { id: 10, imagen: 'setup.webp', nombre: 'Setup de Gaming', descripcion: 'Configuración completa de setup gaming personalizado.', categoria: 'Instalación', precio: 25000 },
  { id: 11, imagen: 'software.png', nombre: 'Instalación de Software', descripcion: 'Instalación y configuración de software gaming y drivers.', categoria: 'Instalación', precio: 10000 },
  { id: 12, imagen: 'switch.png', nombre: 'Reparación Nintendo Switch', descripcion: 'Reparación de consolas Nintendo Switch y accesorios.', categoria: 'Reparación', precio: 18000 },
  { id: 13, imagen: 'xbox.png', nombre: 'Reparación Xbox One', descripcion: 'Servicio de reparación para consolas Xbox One.', categoria: 'Reparación', precio: 22000 },
  { id: 14, imagen: 'xboxs.png', nombre: 'Reparación Xbox Series', descripcion: 'Reparación técnica para consolas Xbox Series X/S.', categoria: 'Reparación', precio: 35000 }
]

const getServicios = async () => {
  try {
    document.getElementById('cargando').style.display = 'block'
    document.getElementById('detalle-container').innerHTML = ''

    const res = await fetch(`${URL_API}servicios`)  
    const data = await res.json()

    console.log('Respuesta:', data) 

    const servicios = Array.isArray(data) ? data : data.servicios ?? data.data ?? []

    document.getElementById('cargando').style.display = 'none'
    const container = document.getElementById('servicios-container')
    container.innerHTML = ''

    if (servicios.length === 0) {
      container.textContent = 'No hay servicios disponibles.'
      return
    }

    servicios.forEach(s => {
      const card = document.createElement('div')
      card.classList.add('servicio-card')
      card.innerHTML = `
        <img src="../assets/img/${s.imagen}" alt="${s.nombre}">
        <h3>${s.nombre}</h3>
        <p>${s.descripcion}</p>
        <p><strong>Categoría:</strong> ${s.categoria}</p>
        ${s.precio > 0 ? `<p><strong>Precio:</strong> $${s.precio.toLocaleString()}</p>` : ''}
        <button onclick="verDetalle(${s.id})">Ver detalle</button>
      `
      container.appendChild(card)
    })
  } catch (error) {
    console.log('Error al cargar servicios', error)
    document.getElementById('cargando').textContent = 'Error al cargar los servicios.'
  }
}

const verDetalle = async (id) => {
  try {
    // const res = await fetch(`${URL_API}/servicios/${id}`)
    // const s = await res.json()
    const s = servicios.find(serv => serv.id == id)
    if (!s) return
    const detalle = document.getElementById('detalle-container')

    if (detalle.innerHTML !== '') {
      detalle.innerHTML = ''
      return
    }

    detalle.innerHTML = `
      <div class="servicio-card">
        <img src="../assets/img/${s.imagen}" alt="${s.nombre}">
        <h3>${s.nombre}</h3>
        <p><strong>Categoría:</strong> ${s.categoria}</p>
        <p>${s.descripcion}</p>
        ${s.precio > 0 ? `<p><strong>Precio:</strong> $${s.precio.toLocaleString()}</p>` : '<p><strong>Precio:</strong> Consultar</p>'}
        <button onclick="document.getElementById('detalle-container').innerHTML=''">Cerrar</button>
      </div>
    `
    detalle.scrollIntoView({ behavior: 'smooth' })
  } catch (error) {
    console.error('Error al cargar el detalle', error)
  }
}

document.getElementById('buscar-id').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const id = document.getElementById('buscar-id').value
    if (id) verDetalle(id)
  }
})

