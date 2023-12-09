<template>
  <div class="col-12 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
    <div class="card card-body rounded-top-0 border-top-0 shadow py-5">
      <FormKit
        type="form"
        id="auth"
        @submit="login"
        :actions="false"
        :config="{
          classes: {
            outer: 'mx-auto',
            wrapper: 'mx-auto',
            message: 'text-center'
          }
        }"
      >
        <FormKit
          type="text"
          name="username"
          label="Kullanıcı Adı"
          placeholder="Kullanıcı Adı"
          validation="required"
          v-model="userName"
        />
        <FormKit
          type="password"
          name="password"
          label="Şifre"
          validation="required|length:6|matches:/[^a-zA-Z]/"
          :validation-messages="{
            matches: 'Please include at least one symbol'
          }"
          placeholder="Şifre"
          v-model="password"
        />
        <FormKit
          type="submit"
          label="Giriş Yap"
          :classes="{
            outer: 'mx-auto',
            wrapper: 'mx-auto text-center'
          }"
          :disabled="statusCode === 200"
        />
      </FormKit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const { _statusCode: statusCode } = storeToRefs(authStore)
const userName = ref<string>('')
const password = ref<string>('')

const toastStore = useToastStore()
const toggleToast = () => toastStore.toggleToast()

const login = async () => {
  if (userName.value !== '' || password.value !== '') {
    toastStore.setToastHeader('Giriş Bilgisi')
    await authStore
      .login({
        userName: userName.value,
        password: password.value
      })
      .then(() => {
        toastStore.setStatusCode(statusCode.value)
        toggleToast()
        if (statusCode.value === 200) {
          toastStore.setToastContent('Giriş Başarılı, ana sayfaya yönlendiriliyorsunuz.')
          setTimeout(() => {
            toggleToast()
            router.push({ name: 'home' })
          }, 3000)
        } else {
          toastStore.setToastContent('Kullanıcı adı veya şifre hatalı!')
          setTimeout(() => {
            toggleToast()
          }, 3000)
        }
      })
  }
}
</script>

<style scoped lang="scss"></style>
