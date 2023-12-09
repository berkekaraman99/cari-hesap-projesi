<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { _user: user } = storeToRefs(authStore)
</script>

<template>
  <main>
    <h1>Ana Sayfa</h1>
    <div class="container card">
      <div class="row my-2">
        <div class="col">
          <h3>Merhaba, hoşgeldin {{ user.user_name }}</h3>
        </div>
      </div>
    </div>
  </main>
</template>
