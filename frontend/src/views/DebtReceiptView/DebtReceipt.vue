<template>
  <div class="col-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
    <h1>Borç Dekontu</h1>
    <form @submit.prevent="sendReceipt()">
      <div class="card card-body table-responsive">
        <table class="table table-borderless table-hover">
          <tr>
            <th>Müşteri Adı</th>
            <td>
              <div>
                <FormKit
                  type="text"
                  name="Müşteri Adı"
                  validation="required"
                  v-model="customerName"
                  list="customers"
                  @input="searchCustomer()"
                />
                <datalist id="customers">
                  <option
                    v-for="customer in searchedCustomers"
                    :value="customer.customer_name"
                  ></option>
                </datalist>
              </div>
            </td>
          </tr>
          <tr>
            <th>Tarih</th>
            <td>
              <div>
                <FormKit
                  type="date"
                  value="2011-01-01"
                  name="Tarih"
                  :validation="'required|date_before:' + maxDate"
                  v-model="receiptForm.createdDate"
                  validation-visibility="live"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>Evrak No</th>
            <td>
              <div>
                <FormKit
                  type="text"
                  name="Evrak Numarası"
                  validation="number|required|matches:/[0-9]/"
                  v-model="receiptForm.documentNo"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>Tutar</th>
            <td>
              <div>
                <FormKit
                  type="number"
                  name="Tutar"
                  validation="required|min:0"
                  :validation-messages="{
                    min: 'Tutar 0 dan büyük olmalıdır'
                  }"
                  v-model="receiptForm.price"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>Açıklama</th>
            <td>
              <div>
                <FormKit
                  type="textarea"
                  name="Açıklama"
                  validation="required|length:1"
                  v-model="receiptForm.description"
                />
              </div>
            </td>
          </tr>
        </table>
        <div class="d-flex align-items-center justify-content-end">
          <button class="btn btn-primary mx-1" type="submit">Kaydet</button>
          <button class="btn btn-secondary mx-1" type="button" @click="clearInputs()">
            Temizle
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useCustomerStore } from '@/stores/customer'
import { useReceiptStore } from '@/stores/receipt'
import { useToastStore } from '@/stores/toast'
import { storeToRefs } from 'pinia'
import { ref, reactive, onBeforeUnmount } from 'vue'

const toastStore = useToastStore()
const receiptStore = useReceiptStore()
const { _statusCode: statusCode } = storeToRefs(receiptStore)
const authStore = useAuthStore()
const { _user: user } = storeToRefs(authStore)
const customerStore = useCustomerStore()
const { _searchedCustomers: searchedCustomers } = storeToRefs(customerStore)

const toggleToast = () => {
  toastStore.toggleToast()
}

const latestDate = new Date()
latestDate.setDate(latestDate.getDate() + 1)

const maxDate = latestDate.toISOString().slice(0, 10)
const currentDate = new Date().toISOString().slice(0, 10)

const customerName = ref('')

let timer: any = null

const searchCustomer = async () => {
  clearTimeout(timer)

  timer = setTimeout(async () => {
    await customerStore.searchCustomers(customerName.value)
  }, 1000)
}

const receiptForm = reactive({
  receiptId: new Date().getTime(),
  userId: user.value.id,
  customerId: '',
  createdDate: currentDate,
  documentNo: '',
  price: '',
  description: '',
  type: 2
})

const clearInputs = () => {
  receiptForm.customerId = ''
  receiptForm.createdDate = currentDate
  receiptForm.documentNo = ''
  receiptForm.price = ''
  receiptForm.description = ''
}

const sendReceipt = async () => {
  receiptForm.customerId = searchedCustomers.value[0].customer_id
  await receiptStore.createReceipt(receiptForm).then(() => {
    toastStore.setStatusCode(statusCode.value)
    toggleToast()
    toastStore.setToastHeader('Bilgi')
    if (statusCode.value === 201) {
      toastStore.setToastContent('Dekont başarıyla oluşturuldu!')
    } else {
      toastStore.setToastContent('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz')
    }
    setTimeout(() => {
      toggleToast()
    }, 3000)
  })
}

onBeforeUnmount(() => {
  customerStore.$patch({
    searchedCustomers: []
  })
})
</script>

<style scoped>
.formkit-outer {
  margin: 0;
}
</style>
