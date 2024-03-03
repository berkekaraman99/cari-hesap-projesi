<template>
  <div>
    <h1>Müşteri Bilgileri</h1>
    <div class="card bg-body-secondary">
      <div class="container px-4 py-3">
        <div class="row py-2">
          <div class="col-12 col-lg-4 py-2">
            <div class="card card-body rounded-3">
              <div class="row">
                <div class="col-12 col-lg-6">
                  <h4 class="text-center">Dekont Sayısı: {{ receiptCount.receipt_count }}</h4>
                </div>
                <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                  <img
                    src="../../assets/images/receipts_2.png"
                    alt="inbox receipts"
                    class="doc-image"
                  />
                </div>
              </div>
              <RouterLink :to="{ name: 'customer-receipts', params: { id: customer.customer_id } }"
                ><button class="btn btn-primary mt-3">Tümünü Görüntüle</button></RouterLink
              >
            </div>
          </div>

          <div class="col-12 col-sm-12 col-md-12 col-lg-8">
            <div class="row">
              <div class="col-12 col-sm-12 col-md-6 col-lg-6 py-2">
                <div class="card card-body">
                  <p>
                    <span class="fw-bold">Müşteri Adı:</span>
                    <input
                      class="form-control"
                      type="text"
                      :disabled="!isEditable"
                      v-model="customerDetails.customerName"
                    />
                  </p>
                  <p>
                    <span class="fw-bold">Vergi Dairesi Şehri:</span>
                    <input
                      class="form-control"
                      type="text"
                      :disabled="!isEditable"
                      v-model="customerDetails.taxCity"
                    />
                  </p>
                </div>
              </div>
              <div class="col-12 col-sm-12 col-md-6 col-lg-6 py-2">
                <div class="card card-body">
                  <p>
                    <span class="fw-bold">Vergi Dairesi:</span>
                    <input
                      class="form-control"
                      type="text"
                      :disabled="!isEditable"
                      v-model="customerDetails.taxAdministration"
                    />
                  </p>
                  <p>
                    <span class="fw-bold"
                      >{{
                        customer.customer_type === 'company' ? 'Vergi Dairesi Numarası' : 'TC No'
                      }}:</span
                    >
                    <input
                      class="form-control"
                      type="text"
                      :disabled="!isEditable"
                      v-model="customerDetails.taxNumber"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { reactive } from 'vue'
import { onMounted } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const isEditable = ref(false)

const customerDetails = reactive({
  customerName: '',
  taxCity: '',
  taxAdministration: '',
  taxNumber: ''
})

const customerStore = useCustomerStore()
const { _customer: customer, _receiptCount: receiptCount } = storeToRefs(customerStore)
const getCustomer = async () => {
  await customerStore.getCustomerById(props.id).then(() => {
    customerDetails.customerName = customer.value.customer_name
    customerDetails.taxAdministration = customer.value.tax_administration
    customerDetails.taxNumber = customer.value.tax_number
    customerDetails.taxCity = customer.value.tax_administration_city
  })
}

const getReceiptCount = async () => {
  await customerStore.getCustomerReceiptCount(props.id)
}

onMounted(() => {
  getCustomer()
  getReceiptCount()
})
</script>

<style scoped></style>
