
<script setup>
import { ref } from 'vue'
import { obtenerToken } from '../services/api.js'

// Evento para avisar a App.vue que se inició sesión
const emit = defineEmits(['sesion-iniciada'])

// Variables del formulario
const correo = ref('')
const licencia = ref('')
const mensaje = ref('')
const cargando = ref(false)

// Función para obtener el token
async function iniciarSesion() {
    mensaje.value = ''
    cargando.value = true

    try {
        // Enviamos el correo y la licencia a la API
        const respuesta = await obtenerToken(
            correo.value,
            licencia.value
        )

        // Comprobamos que la API devolvió un token
        if (!respuesta.token) {
            throw new Error('La API no devolvió un token')
        }

        // Guardamos el token en el navegador
        localStorage.setItem('token', respuesta.token)

        // Limpiamos la licencia por seguridad
        licencia.value = ''

        // Mostramos un mensaje de éxito
        mensaje.value = 'Sesión iniciada. Token guardado.'

        // Avisamos a App.vue para mostrar el perfil
        emit('sesion-iniciada', respuesta.token)

    } catch (error) {
        // Mostramos el error si falla la petición
        mensaje.value = 'Error: ' + error.message

    } finally {
        // Habilitamos nuevamente el botón
        cargando.value = false
    }
}
</script>

<template>
    <h1>Acceso a la API</h1>

    <form @submit.prevent="iniciarSesion">

        <label for="correo">Correo</label>
        <input
            id="correo"
            v-model="correo"
            type="email"
            placeholder="Ingresa tu correo"
            autocomplete="email"
            required
        />

        <label for="licencia">Licencia</label>
        <input
            id="licencia"
            v-model="licencia"
            type="password"
            placeholder="Ingresa tu licencia"
            autocomplete="off"
            required
        />

        <button type="submit" :disabled="cargando">
            {{ cargando ? 'Obteniendo token...' : 'Obtener token' }}
        </button>

    </form>

    <p role="status">{{ mensaje }}</p>
</template>
