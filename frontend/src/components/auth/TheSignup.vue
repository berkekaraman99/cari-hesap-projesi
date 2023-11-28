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
          v-model="cityNo"
        >
          <option v-for="il in iller" :value="il.plaka">{{ il.il_adi }}</option>
        </FormKit>
        <FormKit
          type="select"
          name="tax-administration"
          label="Vergi Dairesi"
          placeholder="Vergi Dairesi"
          v-model="vergi_dairesi"
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
          validation="required"
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
          v-model="signupModel.password"
        />
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
import { reactive, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

import vData from '@/data/vergi_daireleri.json'
import ilData from '@/data/iller.json'

const signupModel: SignUpModel = reactive({
  userName: '',
  password: '',
  companyName: '',
  taxNumber: '',
  tadAdministration: '',
  createdAt: new Date().toISOString()
})
const cityNo = ref<null | number>(null)
const vergi_dairesi = ref(null)

const vDaireleri = computed(() => {
  return vData.data.filter((il) => il.il_id == cityNo.value)
})

const iller: Array<any> = ilData.data

// const latestDate = new Date().toISOString().slice(0, 10)

const router = useRouter()
const authStore = useAuthStore()

const signup = async () => {
  signupModel.taxAdministration = iller.find((il) => il === cityNo.value)
  if (signupModel.userName !== '' || signupModel.password !== '') {
    await authStore.signup(signupModel).then(() => router.push({ name: 'home' }))
  }
}
</script>

<style scoped></style>
