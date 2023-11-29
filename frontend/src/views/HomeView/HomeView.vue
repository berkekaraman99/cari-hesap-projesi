<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { _user: user } = storeToRefs(authStore)
</script>

<template>
  <main>
    <h1>Ana Sayfa</h1>
    <h3>Merhaba, hoşgeldin {{ user.user_name }}</h3>
  </main>
</template>
