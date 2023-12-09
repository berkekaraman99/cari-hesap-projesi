<template>
  <div>
    <h1>Müşteri Bilgileri</h1>
    <div class="card">
      <div class="container px-4 py-3">
        <div class="row border rounded-3 py-2 mb-2 shadow-sm">
          <div class="col-auto pb-2 pb-sm-2 pb-md-0">
            <h2 class="text-secondary">35</h2>
            <p>Dekontlar</p>
            <button class="btn btn-primary">Detaylar</button>
          </div>
          <div class="col">
            <p><span class="fw-bold">Müşteri Adı:</span> {{ customer.customer_name }}</p>
            <p>
              <span class="fw-bold">Vergi Dairesi Şehri:</span>
              {{ customer.tax_administration_city }}
            </p>
          </div>
          <div class="col">
            <p><span class="fw-bold">Vergi Dairesi:</span> {{ customer.tax_administration }}</p>
            <p><span class="fw-bold">Vergi Dairesi Numarası:</span> {{ customer.tax_number }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const customerStore = useCustomerStore()
const { _customer: customer } = storeToRefs(customerStore)
const getCustomer = async () => {
  await customerStore.getCustomerById(props.id)
}

onMounted(() => getCustomer())
</script>

<style scoped></style>
