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
    licencia_key: licencia
})
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
        throw new Error(datos.message || datos.error || 'No se pudo obtener el token')
    }

    return datos
}
