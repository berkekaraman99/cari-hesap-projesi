<template>
  <div>
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
            message: 'text-center fw-bold'
          }
        }"
      >
        <FormKit
          type="text"
          name="username"
          label="Kullanıcı Adı"
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
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()

const router = useRouter()
const authStore = useAuthStore()
const { _statusCode: statusCode } = storeToRefs(authStore)
const userName = ref<string>('')
const password = ref<string>('')

const login = async () => {
  if (userName.value !== '' || password.value !== '') {
    await authStore
      .login({
        userName: userName.value,
        password: password.value
      })
      .then(() => {
        switch (statusCode.value) {
          case 200:
            toast.success('Giriş Başarılı, ana sayfaya yönlendiriliyorsunuz.', {
              timeout: 2500
            })
            setTimeout(() => {
              router.push({ name: 'home' })
            }, 3000)
            break
          case 1001:
            toast.error('Kullanıcı adı veya şifre hatalı!', {
              timeout: 2500
            })
            break
          default:
            toast.error('Bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.', {
              timeout: 2500
            })
            break
        }
        setTimeout(() => {
          authStore.$patch({
            statusCode: 0
          })
        }, 3000)
      })
  }
}
</script>

<style scoped lang="scss"></style>
