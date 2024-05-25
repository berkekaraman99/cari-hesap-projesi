<template>
  <div class="col-12">
    <h1 class="my-4 text-center">Firma Bilgileri</h1>
    <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
      <div class="card card-body tw-shadow-md">
        <FormKit type="form" @submit="updateInfo" :actions="false">
          <table class="w-100">
            <tbody>
              <tr>
                <td><b>Kullanıcı Adı:</b></td>
                <td>
                  <FormKit
                    type="text"
                    name="username"
                    validation="required|length:6"
                    validation-visibility="live"
                    v-model="userModel.userName"
                    :disabled="!isEditable"
                  />
                </td>
              </tr>
              <tr>
                <td><b>Firma Adı:</b></td>
                <td>
                  <FormKit
                    type="text"
                    name="companyName"
                    validation="required"
                    v-model="userModel.companyName"
                    :disabled="!isEditable"
                  />
                </td>
              </tr>
              <tr>
                <td><b>Vergi Dairesi Şehri:</b></td>
                <td>
                  <FormKit
                    type="select"
                    name="city"
                    placeholder="Vergi Dairesi Şehir"
                    v-model="userModel.taxAdministrationCity"
                    :disabled="!isEditable"
                  >
                    <option v-for="il in iller" :value="il.il_adi" v-bind:key="il.plaka">
                      {{ il.il_adi }}
                    </option>
                  </FormKit>
                </td>
              </tr>
              <tr>
                <td><b>Vergi Dairesi:</b></td>
                <td>
                  <FormKit
                    type="select"
                    name="tax-administration"
                    placeholder="Vergi Dairesi"
                    v-model="userModel.taxAdministration"
                    :disabled="!isEditable"
                  >
                    <template v-for="vDaire in vDaireleri" :key="vDaire.id">
                      <option>
                        {{ vDaire.vergi_dairesi + ' Vergi Dairesi' }}
                      </option>
                    </template>
                  </FormKit>
                </td>
              </tr>
              <tr>
                <td><b>Vergi No/TC No:</b></td>
                <td>
                  <FormKit
                    type="text"
                    name="vergino"
                    validation="number|required|length:10,11|matches:/[0-9]/"
                    v-model="userModel.taxNumber"
                    :disabled="!isEditable"
                  />
                </td>
              </tr>
              <tr>
                <td><b>Adres:</b></td>
                <td>
                  <FormKit
                    type="text"
                    name="address"
                    v-model="userModel.address"
                    :disabled="!isEditable"
                  />
                </td>
              </tr>
              <tr>
                <td><b>Email:</b></td>
                <td>
                  <FormKit
                    type="email"
                    validation="email"
                    placeholder="example@mail.com"
                    v-model="userModel.email"
                    :disabled="!isEditable"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-center mt-3" v-if="!isEditable">
            <FormKit
              type="button"
              label="Bilgileri Düzenle"
              :classes="{
                outer: 'mx-auto',
                wrapper: 'mx-auto text-center'
              }"
              @click="toggleEdit()"
            />
          </div>
          <div class="text-center mt-3" v-else>
            <FormKit
              type="submit"
              label="Değişiklikleri Kaydet"
              :classes="{
                outer: 'mx-auto',
                wrapper: 'mx-auto text-center'
              }"
              :disabled="statusCode === 201 || statusCode === 200"
            />
            <FormKit
              type="button"
              label="Vazgeç"
              :classes="{
                outer: 'mx-auto',
                wrapper: 'mx-auto text-center'
              }"
              @click="toggleEdit()"
            />
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ref, reactive, computed } from 'vue'
import vData from '@/data/vergi_daireleri.json'
import ilData from '@/data/iller.json'
import { useToast } from 'vue-toastification'

const vDaireleri = computed(() => {
  return vData.data.filter((il) => il.il_adi === userModel.taxAdministrationCity)
})

const iller: Array<any> = ilData.data

const toast = useToast()
const authStore = useAuthStore()
const { _user: user, _statusCode: statusCode } = storeToRefs(authStore)
const isEditable = ref(false)
const toggleEdit = () => {
  isEditable.value = !isEditable.value
}

const userModel = reactive({
  userName: user.value.user_name,
  companyName: user.value.company_name,
  taxNumber: user.value.tax_number,
  taxAdministration: user.value.tax_administration,
  taxAdministrationCity: user.value.tax_administration_city,
  address: user.value.address,
  email: user.value.email
})

const updateInfo = async () => {
  await authStore.updateUser({ ...userModel, id: user.value.id }).then(() => {
    if (statusCode.value === 200) {
      toast.success('Kullanıcı bilgileri başarıyla güncellendi.', {
        timeout: 2500
      })
    } else {
      toast.error('Bir hata oluştu, lütfen daha sonra tekrar deneyiniz', {
        timeout: 2500
      })
    }
    setTimeout(() => {
      toggleEdit()
      authStore.$patch({
        statusCode: 0
      })
    }, 2000)
  })
}
</script>

<style scoped>
tr td {
  padding: 0.6rem 0rem;
}
</style>
