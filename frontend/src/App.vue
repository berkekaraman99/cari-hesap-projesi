<template>
  <div id="bg-wallpaper"></div>
  <div class="min-vh-100 position-relative">
    <Transition name="headerAnimation">
      <TheHeader v-if="$route.name !== 'auth'" />
    </Transition>
    <TheSidebar />
    <div
      id="main"
      class="container-lg px-md-3"
      :style="{ 'padding-bottom': $route.name !== 'auth' ? '7.5rem' : '0px' }"
    >
      <RouterView v-slot="{ Component }">
        <Transition name="customAnimation" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
    <TheFooter v-if="$route.name !== 'auth'" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/layouts/TheHeader.vue'
import TheSidebar from '@/components/sidebar/TheSidebar.vue'
import { watchEffect } from 'vue'
import { onMounted } from 'vue'
import TheFooter from './components/layouts/TheFooter.vue'

let body: HTMLElement | null

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
  if (matches) {
    body?.setAttribute('data-bs-theme', 'dark')
  } else {
    body?.setAttribute('data-bs-theme', 'light')
  }
})

onMounted(() => {
  body = document.querySelector('body')

  watchEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body?.setAttribute('data-bs-theme', 'dark')
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      body?.setAttribute('data-bs-theme', 'light')
    }
  })
})
</script>

<style scoped lang="scss">
#bg-wallpaper {
  @media (prefers-color-scheme: dark) {
    background-image: url('./assets/images/dark-wallpaper.jpg');
  }
  @media (prefers-color-scheme: light) {
    background-image: url('./assets/images/light-wallpaper.jpg');
  }

  background-size: auto;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  filter: blur(8px);
  height: 100vh;
}

#main {
  padding-bottom: 7.5rem;
}
</style>
