<template>
  <div>
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
            message: 'text-center fw-bold'
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
          v-model="signupModel.taxAdministrationCity"
        >
          <option v-for="il in iller" :value="il.il_adi" v-bind:key="il.plaka">
            {{ il.il_adi }}
          </option>
        </FormKit>
        <FormKit
          v-if="signupModel.taxAdministrationCity != ''"
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
          type="number"
          name="vergino"
          label="Vergi Numarası"
          min="0"
          validation="number|required|length:10,10|matches:/[0-9]/"
          v-model="signupModel.taxNumber"
        />
        <FormKit
          type="text"
          name="username"
          label="Kullanıcı Adı"
          validation="required|length:6"
          validation-visibility="live"
          :validation-messages="{
            alpha: 'Kullanıcı adı sadece harflerden oluşabilir.',
            length: 'Kullanıcı adı en az 6 karakter veya daha fazla olmalıdır.'
          }"
          v-model="signupModel.userName"
        />
        <FormKit
          type="password"
          name="password"
          label="Şifre"
          validation="required|length:6|contains_alphanumeric|contains_symbol|contains_uppercase"
          :validation-messages="{
            contains_symbol: 'Şifre en az bir sembol içermelidir.',
            contains_uppercase: 'Şifre en az bir büyük harf içermelidir.',
            contains_alphanumeric: 'Şifre en az bir harf içermelidir.',
            length: 'Şifre en az 6 karakter veya daha fazla olmalıdır'
          }"
          validation-visibility="live"
          v-model="signupModel.password"
        />
        <FormKit
          type="password"
          name="password_confirm"
          label="Şifreyi Onayla"
          validation="required|confirm"
          validation-label="Şifre doğrulama"
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
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import vData from '@/data/vergi_daireleri.json'
import ilData from '@/data/iller.json'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useToast } from 'vue-toastification'

// console.log(uuidv4())

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

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()
const { _statusCode: statusCode } = storeToRefs(authStore)

const signup = async () => {
  signupModel.taxNumber = String(signupModel.taxNumber)
  if (signupModel.userName !== '' || signupModel.password !== '') {
    const id = uuidv4()
    await authStore
      .signup({ ...signupModel, createdAt: new Date().toISOString(), id: id })
      .then(() => {
        if (statusCode.value === 201) {
          toast.success('Kayıt Başarılı!', {
            timeout: 2000
          })
          setTimeout(() => {
            router.push({ name: 'home' })
          }, 3000)
        } else if (statusCode.value === 1003) {
          toast.error('Kullanıcı adı kullanımaktadır!', {
            timeout: 2000
          })
        } else if (statusCode.value === 1004) {
          toast.error('Vergi numarası kullanılmaktadır!', {
            timeout: 2000
          })
        } else {
          toast.error('Bir hata oluştu, lütfen daha sonra tekrar deneyiniz', {
            timeout: 2000
          })
        }
        setTimeout(() => {
          authStore.$patch({
            statusCode: 0
          })
        }, 2000)
      })
  }
}
</script>

<style scoped lang="scss">
.formkit-message {
  font-weight: bold;
}
</style>
