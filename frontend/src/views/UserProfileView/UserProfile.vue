<template>
  <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
    <h1>Firma Profili</h1>
    <Transition name="fade" mode="out-in">
      <div class="card card-body tw-shadow-md" v-if="!isEditable">
        <table>
          <tbody>
            <tr>
              <td><b>Kullanıcı Adı:</b></td>
              <td>
                <input
                  class="form-control"
                  type="text"
                  :disabled="!isEditable"
                  v-model="userModel.userName"
                />
              </td>
            </tr>
            <tr>
              <td><b>Firma Adı:</b></td>
              <td>
                <input
                  class="form-control"
                  type="text"
                  :disabled="!isEditable"
                  v-model="userModel.companyName"
                />
              </td>
            </tr>
            <tr>
              <td><b>Vergi Dairesi Şehri:</b></td>
              <td>
                <input
                  class="form-control"
                  type="text"
                  :disabled="!isEditable"
                  v-model="userModel.taxAdministrationCity"
                />
              </td>
            </tr>
            <tr>
              <td><b>Vergi Dairesi:</b></td>
              <td>
                <input
                  class="form-control"
                  type="text"
                  :disabled="!isEditable"
                  v-model="userModel.taxAdministration"
                />
              </td>
            </tr>
            <tr>
              <td><b>Vergi No/TC No:</b></td>
              <td>
                <input
                  class="form-control"
                  type="text"
                  :disabled="!isEditable"
                  v-model="userModel.taxNumber"
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
      </div>

      <div class="card card-body tw-shadow-sm" v-else>
        <FormKit
          type="form"
          id="auth"
          @submit="updateInfo"
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
            validation="required|length:6"
            validation-visibility="live"
            v-model="userModel.userName"
          />
          <FormKit
            type="text"
            name="companyName"
            label="Firma Adı / Müşteri Adı"
            validation="required"
            v-model="userModel.companyName"
          />
          <FormKit
            type="select"
            name="city"
            label="Vergi Dairesi Şehir"
            placeholder="Vergi Dairesi Şehir"
            v-model="userModel.taxAdministrationCity"
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
            v-model="userModel.taxAdministration"
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
            label="Vergi No / TC No"
            validation="number|required|length:10,11|matches:/[0-9]/"
            v-model="userModel.taxNumber"
          />
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
        </FormKit>
      </div>
    </Transition>
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
  taxAdministrationCity: user.value.tax_administration_city
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
