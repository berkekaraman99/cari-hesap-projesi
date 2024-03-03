<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/header/TheHeader.vue'
import TheSidebar from '@/components/sidebar/TheSidebar.vue'
import { watchEffect } from 'vue'
import { onMounted } from 'vue'

let body: HTMLElement | null
let bg: HTMLElement | null

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
  if (matches) {
    body?.setAttribute('data-bs-theme', 'dark')
  } else {
    body?.setAttribute('data-bs-theme', 'light')
  }
})

onMounted(() => {
  body = document.querySelector('body')
  bg = document.getElementById('bg-wallpaper')

  watchEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body?.setAttribute('data-bs-theme', 'dark')
      // bg!.style.backgroundImage = "url('@/assets/images/dark-wallpaper.jpg')"
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      body?.setAttribute('data-bs-theme', 'light')
      // bg!.style.backgroundImage = "url('@/assets/images/light-wallpaper.jpg')"
    }
  })
})
</script>

<template>
  <div id="bg-wallpaper"></div>
  <div class="min-vh-100">
    <Transition name="headerAnimation">
      <TheHeader v-if="$route.name !== 'auth'" />
    </Transition>
    <TheSidebar />
    <div class="container-lg px-md-3">
      <RouterView v-slot="{ Component }">
        <Transition name="customAnimation" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style scoped lang="scss">
#bg-wallpaper {
  @media (prefers-color-scheme: dark) {
    background-image: url('./assets/images/dark-wallpaper.jpg');
  }
  @media (prefers-color-scheme: light) {
    background-image: url('./assets/images/light-wallpaper.jpg');
  }
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  filter: blur(8px);
}
</style>
