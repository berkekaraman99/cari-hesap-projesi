<template>
  <div class="container min-vh-100 d-flex flex-column justify-content-center">
    <h1 class="text-center mb-3">Hesap Takip</h1>

    <div class="row">
      <div class="col-12 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
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

<style scoped>
.active {
  background-color: rebeccapurple !important;
  color: white;
  font-weight: bold;
}

.main-tab {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid rebeccapurple !important;
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
  background-color: white;
}
</style>
