<template>
  <div>
    <h1>Tanımlı Müşteriler</h1>
    <div class="row">
      <div class="col">
        <table class="table table-striped table-responsive" v-if="customers.length !== 0">
          <thead>
            <tr>
              <th class="col">Müşteri/Firma Adı</th>
              <th class="col">Vergi Dairesi Şehri</th>
              <th class="col">Vergi Dairesi</th>
              <th class="col">Vergi Numarası</th>
              <th class="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" v-bind:key="customer.customer_id">
              <td>{{ customer.customer_name }}</td>
              <td>{{ customer.tax_administration_city }}</td>
              <td>{{ customer.tax_administration }}</td>
              <td>{{ customer.tax_number }}</td>
              <td>
                <div class="dropdown">
                  <button
                    class="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    İşlem
                  </button>
                  <ul class="dropdown-menu">
                    <li class="my-1">
                      <RouterLink
                        class="dropdown-item bg-primary"
                        :to="{ name: 'customer-edit', params: { id: customer.customer_id } }"
                      >
                        <div class="text-white py-1">
                          <i class="fa-solid fa-pen-to-square"></i> Düzenle
                        </div>
                      </RouterLink>
                    </li>
                    <li class="my-1">
                      <RouterLink
                        class="dropdown-item bg-success"
                        :to="{ name: 'customer-details', params: { id: customer.customer_id } }"
                      >
                        <div class="text-white py-1">
                          <i class="fa-solid fa-info"></i> Görüntüle
                        </div>
                      </RouterLink>
                    </li>
                    <li class="my-1">
                      <div class="dropdown-item bg-danger">
                        <div class="text-white py-1"><i class="fa-solid fa-trash-can"></i> Sil</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <h2 class="text-center fw-light my-3" v-else>Tanımlı müşteri bulunamadı</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useCustomerStore } from '@/stores/customer'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const { _user: user } = storeToRefs(authStore)
const customerStore = useCustomerStore()
const { _customers: customers } = storeToRefs(customerStore)
const getCustomers = async () => {
  await customerStore.fetchCustomers(user.value.id)
}

onMounted(() => getCustomers())
</script>

<style scoped lang="scss">
.table {
  margin-bottom: 0;
}

thead tr,
thead tr th {
  background-color: transparent;
  color: var(--color-light);
}
thead {
  background-image: linear-gradient(90deg, rebeccapurple, navy);
}
</style>
