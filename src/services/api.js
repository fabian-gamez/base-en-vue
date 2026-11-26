// Dirección base de la API de prácticas
const API_URL = 'https://rubrika.mx/api/v1'


export async function obtenerToken(correo, licencia) {
    const respuesta = await fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
       
body: JSON.stringify({
    email: correo,
    license_key: licencia
})

    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
        throw new Error(datos.message || datos.error || 'No se pudo obtener el token')
    }

    return datos
}

 // Consulta los datos del usuario dueño del token
export async function obtenerPerfil() {

    // 1. Leer el token guardado en el navegador
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error('No hay token guardado. Inicia sesión primero.')
    }

    // 2. Consultar los datos del usuario
    const respuesta = await fetch(`${API_URL}/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    const datos = await respuesta.json()

    // 3. Comprobar si el token expiró
    if (respuesta.status === 401) {
        localStorage.removeItem('token')
        throw new Error('Tu token no es válido o ya expiró. Vuelve a iniciar sesión.')
    }

    // 4. Comprobar otros errores
    if (!respuesta.ok) {
        throw new Error(datos.error || 'No se pudo consultar el perfil')
    }

    return datos
}
