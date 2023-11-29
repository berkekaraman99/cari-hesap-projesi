<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/header/TheHeader.vue'
import TheSidebar from '@/components/sidebar/TheSidebar.vue'
</script>

<template>
  <div class="min-vh-100">
    <TheHeader v-if="$route.name !== 'auth'" />
    <TheSidebar />
    <div class="container-md">
      <div>
        <RouterView v-slot="{ Component }">
          <Transition name="customAnimation" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
  <the-toast></the-toast>
</template>

<style scoped></style>
