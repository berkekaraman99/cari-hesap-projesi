<template>
  <div class="col-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
    <h1>Müşteri Oluştur</h1>
    <form @submit.prevent="createCustomer">
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
        </table>
        <div class="d-flex align-items-center justify-content-end">
          <FormKit type="submit" label="Oluştur" :disabled="statusCode === 200" />
          <FormKit
            type="button"
            label="Temizle"
            :classes="{
              input: 'bg-secondary'
            }"
            @click="resetForm()"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import vData from '@/data/vergi_daireleri.json'
import ilData from '@/data/iller.json'
import { useCustomerStore } from '@/stores/customer'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const authStore = useAuthStore()
const { _user: user } = storeToRefs(authStore)
const customerStore = useCustomerStore()
const { _statusCode: statusCode } = storeToRefs(customerStore)
const router = useRouter()

const vDaireleri = computed(() => {
  return vData.data.filter((il) => il.il_adi === customerForm.taxAdministrationCity)
})

const iller: Array<any> = ilData.data

const customerForm = reactive({
  customerName: '',
  taxAdministration: '',
  taxAdministrationCity: '',
  taxNumber: '',
  customerType: ''
})

const resetForm = () => {
  customerForm.customerName = ''
  customerForm.taxAdministration = ''
  customerForm.taxNumber = ''
  customerForm.customerType = ''
  customerForm.taxAdministrationCity = ''
}

const createCustomer = async () => {
  if (customerForm.customerName !== '' || customerForm.taxNumber !== '') {
    const customerId = uuidv4()
    await customerStore
      .createCustomer({
        ...customerForm,
        connectedUserId: user.value.id,
        customerId: customerId,
        createdAt: new Date().toISOString()
      })
      .then(() => {
        if (statusCode.value === 201) {
          toast.success('Müşteri oluşturuldu!', {
            timeout: 2000
          })
          setTimeout(() => {
            resetForm()
            customerStore.$patch({
              statusCode: 0
            })
            router.push({ name: 'customers' })
          }, 3000)
        } else if (statusCode.value === 1013) {
          toast.error('Müşteri zaten bulunmakta!', {
            timeout: 2000
          })
        } else if (statusCode.value === 1004) {
          toast.error('Bu vergi numarasına sahip müşteri bulunmaktadır', {
            timeout: 2000
          })
        } else {
          toast.error('Bir hata oluştu, lütfen daha sonra tekrar deneyiniz', {
            timeout: 2000
          })
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
