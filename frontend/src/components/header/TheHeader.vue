<template>
  <header class="cs-nav">
    <nav class="navbar navbar-expand-sm bg-body-tertiary border border-1 shadow-sm">
      <div class="container-fluid">
        <button
          class="btn me-1"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"
          aria-controls="offcanvasSidebar"
        >
          <i class="fa-solid fa-bars fa-lg"></i>
        </button>
        <span class="navbar-brand fw-bold brand">CARİ TAKİP</span>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="user != null">
          <ul class="navbar-nav me-auto mb-2 mb-sm-0">
            <li class="nav-item me-2"><i class="fa-solid fa-city"></i></li>
            <li class="nav-item">{{ user.company_name }}</li>
          </ul>
        </div>
        <button class="btn btn-danger fw-bold" @click="logout()">Çıkış Yap</button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const { _user: user } = storeToRefs(authStore)
const logout = () => {
  authStore.logout()
}
</script>

<style scoped lang="scss">
.brand {
  cursor: pointer;
  background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.cs-nav {
  padding: 0.75rem 0.75rem;

  & .navbar {
    border-radius: 0.5rem;
  }
}
</style>
