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
          label="Firma Adı"
          validation="required"
          v-model="signupModel.companyName"
        />
        <FormKit
          type="select"
          name="city"
          label="Vergi Dairesi Şehir"
          placeholder="Vergi Dairesi Şehir"
          v-model="signupModel.taxAdministrationCity"
        >
          <option v-for="il in iller" :value="il.il_adi" v-bind:key="il.plaka">
            {{ il.il_adi }}
          </option>
        </FormKit>
        <FormKit
          type="select"
          name="tax-administration"
          label="Vergi Dairesi"
          placeholder="Vergi Dairesi"
          v-model="signupModel.taxAdministration"
        >
          <template v-for="vDaire in vDaireleri" :key="vDaire.id">
            <option>
              {{ vDaire.vergi_dairesi + ' Vergi Dairesi' }}
            </option>
          </template>
        </FormKit>
        <FormKit
          type="text"
          name="vergino"
          label="Vergi Numarası"
          validation="number|required|length:10,11|matches:/[0-9]/"
          v-model="signupModel.taxNumber"
        />
        <FormKit
          type="text"
          name="username"
          label="Kullanıcı Adı"
          validation="required|length:6"
          validation-visibility="live"
          v-model="signupModel.userName"
        />
        <FormKit
          type="password"
          name="password"
          label="Şifre"
          validation="required|length:6|contains_alphanumeric|contains_symbol|contains_uppercase"
          :validation-messages="{
            matches: 'Please include at least one symbol'
          }"
          validation-visibility="live"
          v-model="signupModel.password"
        />
        <FormKit
          type="submit"
          label="Hesap Oluştur"
          :classes="{
            outer: 'mx-auto',
            wrapper: 'mx-auto text-center'
          }"
          :disabled="statusCode === 201 || statusCode === 200"
        />
      </FormKit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import vData from '@/data/vergi_daireleri.json'
import ilData from '@/data/iller.json'
import { storeToRefs } from 'pinia'
import { useToastStore } from '@/stores/toast'

const signupModel = reactive({
  userName: '',
  password: '',
  companyName: '',
  taxNumber: '',
  taxAdministration: '',
  taxAdministrationCity: ''
})

const vDaireleri = computed(() => {
  return vData.data.filter((il) => il.il_adi === signupModel.taxAdministrationCity)
})

const iller: Array<any> = ilData.data

const router = useRouter()
const authStore = useAuthStore()
const { _statusCode: statusCode } = storeToRefs(authStore)
const toastStore = useToastStore()
toastStore.setToastHeader('Kayıt Bilgisi')
const toggleToast = () => toastStore.toggleToast()

const signup = async () => {
  if (signupModel.userName !== '' || signupModel.password !== '') {
    await authStore.signup({ ...signupModel, createdAt: new Date().toISOString() }).then(() => {
      toastStore.setStatusCode(statusCode.value)
      toggleToast()
      if (statusCode.value === 201) {
        toastStore.setToastContent('Kayıt Başarılı!')
        setTimeout(() => {
          toggleToast()
          router.push({ name: 'home' })
        }, 3000)
      } else if (statusCode.value === 1003) {
        toastStore.setToastContent('Kullanıcı adı kullanımakta!')
        setTimeout(() => {
          toggleToast()
        }, 3000)
      } else if (statusCode.value === 1004) {
        toastStore.setToastContent('Vergi numarası kullanılmakta!')
        setTimeout(() => {
          toggleToast()
        }, 3000)
      } else {
        toastStore.setToastContent('Bir hata oluştu, lütfen daha sonra tekrar deneyiniz')
        setTimeout(() => {
          toggleToast()
        }, 3000)
      }
    })
  }
}
</script>

<style scoped></style>
