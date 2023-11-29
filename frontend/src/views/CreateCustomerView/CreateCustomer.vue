<template>
  <div>
    <h1>Müşteri Bilgileri</h1>
    <form @submit.prevent="createCustomer">
      <div class="card card-body table-responsive">
        <table class="table table-borderless">
          <tr>
            <th>Firma Adı</th>
            <td>
              <div>
                <FormKit
                  type="text"
                  name="Firma Adı"
                  validation="required"
                  v-model="customerForm.customerName"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>Vergi Dairesi Şehir</th>
            <td>
              <div>
                <FormKit type="select" name="city" v-model="cityNo">
                  <option v-for="il in iller" :value="il.plaka">{{ il.il_adi }}</option>
                </FormKit>
              </div>
            </td>
          </tr>
          <tr v-if="cityNo != null">
            <th>Vergi Dairesi</th>
            <td>
              <div>
                <FormKit type="select" name="tax-administration" v-model="vergi_dairesi">
                  <template v-for="vDaire in vDaireleri" :key="vDaire.id">
                    <option>
                      {{ vDaire.vergi_dairesi + ' Vergi Dairesi' }}
                    </option>
                  </template>
                </FormKit>
              </div>
            </td>
          </tr>
          <tr>
            <th>Vergi No</th>
            <td>
              <div>
                <FormKit
                  type="text"
                  name="Vergi Numarası"
                  validation="number|required|length:10,11|matches:/[0-9]/"
                  v-model="customerForm.taxNumber"
                />
              </div>
            </td>
          </tr>
        </table>
        <div class="d-flex align-items-center justify-content-end">
          <button class="btn btn-primary mx-1" type="submit">Kaydet</button>
          <button class="btn btn-secondary mx-1" type="button">Temizle</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import vData from '@/data/vergi_daireleri.json'
import ilData from '@/data/iller.json'
import { ref } from 'vue'
import { computed } from 'vue'
import { useCustomerStore } from '@/stores/customer'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useToastStore } from '@/stores/toast'

const authStore = useAuthStore()
const { _user: user } = storeToRefs(authStore)
const customerStore = useCustomerStore()
const { _statusCode: statusCode } = storeToRefs(customerStore)
const toastStore = useToastStore()
toastStore.setToastHeader('Bilgi')
const toggleToast = () => toastStore.toggleToast()

const cityNo = ref<null | number>(null)
const vergi_dairesi = ref(null)

const vDaireleri = computed(() => {
  return vData.data.filter((il) => il.il_id == cityNo.value)
})

const iller: Array<any> = ilData.data

const customerForm = reactive({
  customerId: new Date().getTime(),
  customerName: '',
  taxAdministration: '',
  taxNumber: '',
  createdAt: new Date().toISOString()
})

const createCustomer = async () => {
  const il = iller.find((il) => il.plaka == cityNo.value)
  customerForm.taxAdministration = il.il_adi + ' - ' + vergi_dairesi.value
  console.log({ ...customerForm, connectedUserId: user.value.id })

  if (customerForm.customerName !== '' || customerForm.taxNumber !== '') {
    await customerStore
      .createCustomer({ ...customerForm, connectedUserId: user.value.id })
      .then(() => {
        toastStore.setStatusCode(statusCode.value)
        toggleToast()
        if (statusCode.value === 201) {
          toastStore.setToastContent('Müşteri oluşturuldu!')
          setTimeout(() => {
            toggleToast()
          }, 3000)
        } else if (statusCode.value === 1013) {
          toastStore.setToastContent('Müşteri zaten bulunmakta!')
          setTimeout(() => {
            toggleToast()
          }, 3000)
        } else if (statusCode.value === 1004) {
          toastStore.setToastContent('Bu vergi numarasına sahip müşteri bulunmaktadır')
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

<style scoped>
.formkit-outer {
  margin: 0;
}
</style>
