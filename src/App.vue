
<script setup>
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import PerfilUsuario from './components/PerfilUsuario.vue'

// Leer el token guardado en el navegador
const token = ref(localStorage.getItem('token'))

// Se ejecuta cuando el usuario inicia sesión
function alIniciarSesion(nuevoToken) {
    token.value = nuevoToken
}

// Se ejecuta cuando el usuario cierra sesión
function alCerrarSesion() {
    localStorage.removeItem('token')
    token.value = null
}
</script>

<template>
    <PerfilUsuario
        v-if="token"
        @sesion-cerrada="alCerrarSesion"
    />

    <LoginForm
        v-else
        @sesion-iniciada="alIniciarSesion"
    />
</template>
