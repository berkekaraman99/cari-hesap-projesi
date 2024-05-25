<template>
  <header class="cs-nav">
    <nav class="navbar navbar-expand-sm bg-body border border-1 shadow-sm">
      <div class="container-fluid">
        <span
          class="px-2 py-1 me-2 bars"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"
          aria-controls="offcanvasSidebar"
        >
          <i class="fa-solid fa-bars fa-lg"></i>
        </span>
        <a class="text-decoration-none me-3" @click="router.push({ name: 'home' })">
          <span class="header-brand">Cari Takip</span>
        </a>

        <!-- <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="user != null">
          <ul class="navbar-nav me-auto mb-2 mb-sm-0">
            <li class="nav-item"><i class="fa-solid fa-city"></i></li>
            <li class="nav-item">{{ user.company_name }}</li>
          </ul>
        </div>
        <div class="dark-light" @click="changeTheme">
          <i class="fa-solid fa-circle-half-stroke fa-lg"></i>
        </div>
        <div class="dropdown">
          <a class="nav-link user-icon" href="#" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-circle-user fa-xl"></i
          ></a>

          <ul class="dropdown-menu dropdown-menu-end">
            <li class="dropdown-item"><i class="fa-solid fa-city"></i> {{ user.company_name }}</li>
            <!-- <RouterLink :to="{ name: 'settings' }" class="dropdown-item"
              ><i class="fa-solid fa-gear"></i> Ayarlar</RouterLink
            > -->
            <li>
              <a class="dropdown-item text-danger fw-bold" href="#" @click="logout()"
                ><i class="fa-solid fa-arrow-right-from-bracket"></i>Çıkış Yap</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

let body: HTMLElement | null

onMounted(() => {
  body = document.querySelector('body')
})

const authStore = useAuthStore()

const { _user: user } = storeToRefs(authStore)
const logout = () => {
  authStore.logout()
}

const changeTheme = () => {
  const val = body?.getAttribute('data-bs-theme')
  if (val === 'dark') {
    body?.setAttribute('data-bs-theme', 'light')
  } else {
    body?.setAttribute('data-bs-theme', 'dark')
  }
}
</script>

<style scoped lang="scss">
.header-brand {
  font-family: 'Lobster', cursive;
  cursor: pointer;
  background: linear-gradient(to right, var(--brand-color-l), var(--brand-color-h));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (prefers-color-scheme: dark) {
    filter: drop-shadow(1px 0px 0px rgba(255, 255, 255, 0.7));
  }
  @media (prefers-color-scheme: light) {
    filter: drop-shadow(1px 0px 0px rgba(0, 0, 0, 0.7));
  }
  font-size: 1.35rem;

  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.cs-nav {
  padding: 0.75rem 0.75rem;

  & .navbar {
    border-radius: 0.5rem;
  }
}

.bars {
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color-h);

    &:active {
      background-color: var(--primary-color-l);
    }
  }
}

.dropdown-item {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

nav div.container-fluid {
  height: 3rem;
}

.dark-light {
  cursor: pointer;
  // background-color: whitesmoke;
  padding: 0.5rem;
  border-radius: 99px;
  margin-right: 0.5rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.568);
  }
}
</style>
