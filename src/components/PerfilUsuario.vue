
<script setup>
import { ref, onMounted } from 'vue'
import { obtenerPerfil } from '../services/api.js'

// Evento para avisar a App.vue que cerramos sesión
const emit = defineEmits(['sesion-cerrada'])

// Variables del componente
const perfil = ref(null)
const cargando = ref(true)
const error = ref('')

// Función para consultar el perfil
async function cargarPerfil() {
    cargando.value = true
    error.value = ''

    try {
        // Consultar los datos de Rubrika
        perfil.value = await obtenerPerfil()

    } catch (e) {
        // Mostrar el mensaje si ocurre un error
        error.value = e.message

    } finally {
        // Finalizar el estado de carga
        cargando.value = false
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    emit('sesion-cerrada')
}

// Consultar el perfil cuando aparece el componente
onMounted(cargarPerfil)
</script>

<template>
    <h1>Mi perfil</h1>

    <p v-if="cargando">Cargando perfil...</p>

    <p v-else-if="error">
        Error: {{ error }}
    </p>

    <div v-else-if="perfil">
        <p>
            <strong>Nombre:</strong>
            {{ perfil.first_name }} {{ perfil.last_name }}
        </p>

        <p>
            <strong>Correo:</strong>
            {{ perfil.email }}
        </p>

        <p>
            <strong>Escuela:</strong>
            {{ perfil.school }}
        </p>

        <p>
            <strong>Items:</strong>
            {{ perfil.items_count }} de {{ perfil.items_limit }}
        </p>
    </div>

    <button @click="cargarPerfil" :disabled="cargando">
        Actualizar
    </button>

    <button @click="cerrarSesion">
        Cerrar sesión
    </button>
</template>
