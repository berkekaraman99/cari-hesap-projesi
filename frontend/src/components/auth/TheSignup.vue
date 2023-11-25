<template>
  <div class="col-12 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
    <div class="card card-body rounded-top-0 border-top-0 shadow py-5">
      <FormKit
        type="form"
        id="auth"
        @submit="signup"
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
          name="companyName"
          label="Şirket Adı"
          validation="required"
          v-model="signupModel.companyName"
        />
        <FormKit
          type="text"
          name="username"
          label="Kullanıcı Adı"
          validation="required"
          v-model="signupModel.userName"
        />
        <FormKit
          type="password"
          name="password"
          label="Şifre"
          validation="required|length:6|matches:/[^a-zA-Z]/"
          :validation-messages="{
            matches: 'Please include at least one symbol'
          }"
          v-model="signupModel.password"
        />
        <FormKit
          type="date"
          label="Tarih"
          :validation="`required|date_before:${latestDate}`"
          v-model="signupModel.date"
        />
        <FormKit type="text" name="dbname" label="Veri Tabanı Adı" validation="required" />

        <FormKit
          type="submit"
          label="Hesap Oluştur"
          :classes="{
            outer: 'mx-auto',
            wrapper: 'mx-auto text-center'
          }"
        />
      </FormKit>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SignUpModel } from '@/models/signup_model'
import { useAuthStore } from '@/stores/auth'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const latestDate = new Date().toISOString().slice(0, 10)

const router = useRouter()
const authStore = useAuthStore()

const signupModel: SignUpModel = reactive({
  userName: '',
  password: '',
  companyName: '',
  database: '',
  date: latestDate
})

const signup = async () => {
  if (signupModel.userName !== '' || signupModel.password !== '') {
    await authStore.signup(signupModel).then(() => router.push({ name: 'home' }))
  }
}
</script>

<style scoped></style>
