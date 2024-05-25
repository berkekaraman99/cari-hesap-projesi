<template>
  <div>
    <h1 class="my-4 ps-2">Ayarlar</h1>
    <div class="row">
      <div class="col">
        <div class="card card-body">
          <h4 class="border-bottom">Görünüm</h4>
          <FormKit
            type="select"
            name="appearance"
            :options="[
              {
                label: 'Açık',
                value: 'light'
              },
              {
                label: 'Koyu',
                value: 'dark'
              }
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

// const deviceTheme = ref('dark')
// let body: any

// onMounted(() => {
//   body = document.querySelector('body')
//   deviceTheme.value = localStorage.getItem('userTheme') ?? 'dark'
// })

// watch(deviceTheme, () => changeTheme)

// const changeTheme = () => {
//   deviceTheme.value === 'dark'
//     ? body?.setAttribute('data-bs-theme', 'dark')
//     : body?.setAttribute('data-bs-theme', 'light')

//   localStorage.setItem('userTheme', deviceTheme.value)
// }
</script>

<style scoped></style>
