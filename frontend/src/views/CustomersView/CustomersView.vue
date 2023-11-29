<template>
  <div>
    <h1>Tanımlı Müşteriler</h1>
    <div class="card px-2">
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="col">Müşteri/Firma Adı</th>
            <th class="col">Vergi Dairesi</th>
            <th class="col">Vergi Numarası</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers">
            <td>{{ customer.customer_name }}</td>
            <td>{{ customer.tax_administration }}</td>
            <td>{{ customer.tax_number }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const customerStore = useCustomerStore()
const { _customers: customers } = storeToRefs(customerStore)
const getCustomers = async () => {
  await customerStore.fetchCustomers()
}

onMounted(() => getCustomers())
</script>

<style scoped></style>
