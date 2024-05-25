<template>
  <the-loading v-if="isLoading"></the-loading>
  <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3" v-else>
    <h1 class="my-4">Müşteri Bilgisini Düzenle</h1>
    <form @submit.prevent="update">
      <div class="card card-body table-responsive">
        <table class="table table-borderless">
          <tr>
            <th>Müşteri Tipi</th>
            <td>
              <FormKit
                v-model="customerForm.customerType"
                type="radio"
                :options="[
                  { label: 'Şahsi', value: 'personal' },
                  { label: 'Şirket', value: 'company' }
                ]"
              />
            </td>
          </tr>
          <tr v-if="customerForm.customerType === 'personal'">
            <th>Adı ve Soyadı</th>
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
          <tr v-else-if="customerForm.customerType === 'company'">
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
          <tr v-if="customerForm.customerType === 'company'">
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
          <tr
            v-if="
              customerForm.taxAdministrationCity != '' && customerForm.customerType === 'company'
            "
          >
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
          <tr v-if="customerForm.customerType === 'company'">
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
          <tr v-else-if="customerForm.customerType === 'personal'">
            <th>TC No</th>
            <td>
              <div>
                <FormKit
                  type="text"
                  name="TC No"
                  validation="number|required|length:10,11|matches:/[0-9]/"
                  v-model="customerForm.taxNumber"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>Adres</th>
            <td>
              <div>
                <FormKit type="text" name="TC No" v-model="customerForm.address" />
              </div>
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>
              <FormKit
                type="email"
                validation="email"
                placeholder="example@mail.com"
                v-model="customerForm.email"
              />
            </td>
          </tr>
        </table>
        <div class="d-flex align-items-center justify-content-end">
          <FormKit type="submit" label="Kaydet" :disabled="statusCode === 201" />
          <FormKit
            type="button"
            label="Temizle"
            :classes="{
              input: 'bg-secondary'
            }"
          />
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
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const toast = useToast()
const isLoading = ref(true)

const authStore = useAuthStore()
// const { _user: user } = storeToRefs(authStore)
const router = useRouter()

const customerStore = useCustomerStore()
const { _statusCode: statusCode, _customer: customer } = storeToRefs(customerStore)
const getCustomer = async () => {
  await customerStore.getCustomerById(props.id).then(() => {
    isLoading.value = false
    customerForm.customerName = customer.value.customer_name
    customerForm.taxNumber = customer.value.tax_number
    customerForm.taxAdministration = customer.value.tax_administration
    customerForm.taxAdministrationCity = customer.value.tax_administration_city
    customerForm.customerType = customer.value.customer_type
    customerForm.address = customer.value.address
    customerForm.email = customer.value.email
  })
}

onMounted(() => {
  getCustomer()
})

const vDaireleri = computed(() => {
  return vData.data.filter((il) => il.il_adi === customerForm.taxAdministrationCity)
})

const iller: Array<any> = ilData.data

const customerForm = reactive({
  customerName: '',
  taxAdministration: '',
  taxAdministrationCity: '',
  taxNumber: '',
  customerType: '',
  address: '',
  email: ''
})

const update = async () => {
  if (customerForm.customerName !== '' || customerForm.taxNumber !== '') {
    console.log(customerForm)

    await customerStore
      .updateCustomer({ ...customerForm, customerId: customer.value.customer_id })
      .then(() => {
        if (statusCode.value === 201) {
          toast.success('Müşteri bilgileri güncellendi!', {
            timeout: 2500
          })
          setTimeout(() => {
            router.push({ name: 'customers' })
          }, 3000)
        } else {
          toast.error('Bir hata oluştu, lütfen daha sonra tekrar deneyiniz', {
            timeout: 2500
          })
        }
      })
  }
}
</script>

<style scoped></style>
