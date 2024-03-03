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
// import { useToastStore } from '@/stores/toast'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// declare var bootstrap: any
import { useToast } from 'vue-toastification'

const toast = useToast()

const router = useRouter()
const authStore = useAuthStore()
const { _statusCode: statusCode } = storeToRefs(authStore)
const userName = ref<string>('')
const password = ref<string>('')

// const toastStore = useToastStore()
// toastStore.setToastHeader('Giriş Bilgisi')

// let toastTrigger
// let toastLiveExample

// onMounted(() => {
//   toastTrigger = document.getElementById('liveToastBtn') as HTMLElement
//   toastLiveExample = document.getElementById('liveToast') as HTMLElement

//   console.log(toastTrigger)
//   console.log(toastLiveExample)
// })

// const handleToast = () => {
//   const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample!)
//   toastBootstrap.show()
// }

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
          default:
            toast.error('Kullanıcı adı veya şifre hatalı!', {
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
