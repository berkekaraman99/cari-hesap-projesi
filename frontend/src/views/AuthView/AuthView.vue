<template>
  <div class="container min-vh-100 d-flex flex-column justify-content-center py-3">
    <div class="row">
      <div class="col-12 col-md-12 col-lg-6 d-flex align-items-center justify-content-center">
        <div class="auth-brand">Cari Takip</div>
        <!-- <h1 class="text-center mb-3">Hesap Takip</h1> -->
      </div>

      <div class="col-12 col-md-12 col-lg-6">
        <div>
          <div class="main-tab border">
            <div
              class="tab"
              :class="{ active: component == TheLogin }"
              @click="toggleComponent(TheLogin)"
            >
              Giriş Yap
            </div>
            <div
              class="tab"
              :class="{ active: component == TheSignup }"
              @click="toggleComponent(TheSignup)"
            >
              Hesap Oluştur
            </div>
          </div>
        </div>
        <component :is="component" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheLogin from '@/components/auth/TheLogin.vue'
import TheSignup from '@/components/auth/TheSignup.vue'
import { shallowRef } from 'vue'

const component = shallowRef(TheLogin)

const toggleComponent = (value: any) => {
  component.value = value
}
</script>

<style scoped lang="scss">
.active {
  background-color: var(--primary-color-h) !important;
  color: white;
  font-weight: bold;
}

.main-tab {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid var(--primary-color-h) !important;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  cursor: pointer;
  overflow: hidden;
}

.tab {
  transition: 0.3s ease;
  padding: 0.8rem 0rem;
  text-align: center;
  width: 100%;

  @media (prefers-color-scheme: dark) {
    background-color: #040404;
  }
  @media (prefers-color-scheme: light) {
    background-color: #fbfbfb;
  }
}
</style>
