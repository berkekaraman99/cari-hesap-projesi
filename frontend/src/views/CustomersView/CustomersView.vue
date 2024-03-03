<template>
  <div>
    <h1>Tanımlı Müşteriler</h1>
    <div class="row">
      <div class="col">
        <table
          class="table table-striped table-responsive border shadow"
          v-if="customers.length !== 0"
        >
          <thead>
            <tr>
              <th class="col">Müşteri/Firma Adı</th>
              <th class="col">Vergi Dairesi Şehri</th>
              <th class="col">Vergi Dairesi</th>
              <th class="col">
                <div>Vergi Numarası</div>
                <div>TCNO</div>
              </th>
              <th class="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" v-bind:key="customer.customer_id">
              <td>{{ customer.customer_name }}</td>
              <td>{{ customer.tax_number }}</td>
              <td>{{ customer.tax_administration_city }}</td>
              <td>{{ customer.tax_administration }}</td>
              <td>
                <div class="dropdown-center">
                  <button
                    class="dropdown-toggle text-body"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    İşlem
                  </button>
                  <ul class="dropdown-menu px-2">
                    <li class="my-1" v-for="item in dropdownItems">
                      <RouterLink
                        class="dropdown-item"
                        :to="{ name: item.routeName, params: { id: customer.customer_id } }"
                      >
                        <div class="py-1 d-flex align-items-center">
                          <i class="me-2" :class="item.icon"></i>
                          <div>{{ item.actionName }}</div>
                        </div>
                      </RouterLink>
                    </li>
                    <li class="my-1">
                      <div class="dropdown-item">
                        <div class="py-1 d-flex align-items-center">
                          <i class="fa-solid fa-trash-can me-2"></i>
                          Sil
                        </div>
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

const dropdownItems = [
  {
    routeName: 'customer-edit',
    actionName: 'Düzenle',
    icon: 'fa-solid fa-pen-to-square'
  },
  {
    routeName: 'customer-details',
    actionName: 'Görüntüle',
    icon: 'fa-solid fa-info'
  }
]
</script>

<style scoped lang="scss">
.table {
  border-collapse: separate;
  border-radius: 0.5rem;
  border-spacing: 0;
  margin-bottom: 0;
}

th {
  &:first-child {
    border-top-left-radius: 0.5rem;
  }
  &:last-child {
    border-top-right-radius: 0.5rem;
  }
}

tr {
  &:last-child td {
    &:first-child {
      border-bottom-left-radius: 0.5rem;
    }
    &:last-child {
      border-bottom-right-radius: 0.5rem;
    }
  }
}

thead tr,
thead tr th {
  background-color: transparent;
  color: var(--textcolor-light);
}

thead {
  background-image: linear-gradient(90deg, var(--primary-color-h) 0%, var(--primary-color-l) 100%);
}

th,
td {
  text-align: center;
}

.dropdown-menu {
  background-color: var(--primary-color-h);
}

.dropdown-item {
  transition: 0.3s ease;
  border-radius: 0.5rem;
  color: var(--textcolor-light);
  &:hover {
    background-color: var(--secondary-color-h);
    color: var(--textcolor-dark);
  }
}

button {
  display: inline-block;
  border: 1px solid var(--primary-color-h);
  padding: 1rem 0.75rem;
  border-radius: 0.375rem;
  line-height: 1px;
  background-color: var(--primary-color-h);
  transition: 0.3s ease;
  user-select: none;
  vertical-align: middle;
  &:hover {
    background-color: var(--primary-color-l);
    border-color: var(--primary-color-l);
  }
}
</style>
