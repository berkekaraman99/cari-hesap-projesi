<template>
  <the-loading v-if="isLoading"></the-loading>
  <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3" v-else>
    <h1>Müşteri Bilgisini Düzenle</h1>
    <form @submit.prevent="update">
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
                <FormKit type="select" name="city" v-model="customerForm.taxAdministrationCity">
                  <option v-for="il in iller" :value="il.il_adi" v-bind:key="il.plaka">
                    {{ il.il_adi }}
                  </option>
                </FormKit>
              </div>
            </td>
          </tr>
          <tr>
            <th>Vergi Dairesi</th>
            <td>
              <div>
                <FormKit
                  type="select"
                  name="tax-administration"
                  v-model="customerForm.taxAdministration"
                >
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
import { onMounted } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const isLoading = ref(true)

const authStore = useAuthStore()
const { _user: user } = storeToRefs(authStore)

const customerStore = useCustomerStore()
const { _statusCode: statusCode, _customer: customer } = storeToRefs(customerStore)
const getCustomer = async () => {
  await customerStore.getCustomerById(props.id).then(() => {
    isLoading.value = false
    customerForm.customerName = customer.value.customer_name
    customerForm.taxNumber = customer.value.tax_number
    customerForm.taxAdministration = customer.value.tax_administration
    customerForm.taxAdministrationCity = customer.value.tax_administration_city
  })
}

onMounted(() => getCustomer())

const toastStore = useToastStore()
toastStore.setToastHeader('Bilgi')
const toggleToast = () => toastStore.toggleToast()

const vDaireleri = computed(() => {
  return vData.data.filter((il) => il.il_adi === customerForm.taxAdministrationCity)
})

const iller: Array<any> = ilData.data

const customerForm = reactive({
  customerName: '',
  taxAdministration: '',
  taxAdministrationCity: '',
  taxNumber: ''
})

const update = async () => {
  if (customerForm.customerName !== '' || customerForm.taxNumber !== '') {
    console.log(customerForm)

    await customerStore
      .updateCustomer({ ...customerForm, customerId: customer.value.customer_id })
      .then(() => {
        toastStore.setStatusCode(statusCode.value)
        toggleToast()
        if (statusCode.value === 201) {
          toastStore.setToastContent('Müşteri bilgileri güncellendi!')
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
