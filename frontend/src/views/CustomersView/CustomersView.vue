<template>
  <div>
    <h1 class="my-4 ps-2">Tanımlı Müşteriler</h1>
    <div class="row">
      <div class="col">
        <table
          id="customersTable"
          class="table table-striped table-responsive border shadow"
          v-if="customers.length !== 0"
        >
          <thead>
            <tr>
              <th class="col" @click="sortTable(0)">Müşteri/Firma Adı</th>
              <th class="col" @click="sortTable(1)">Müşteri Tipi</th>
              <th class="col" @click="sortTable(2)">
                <div>Vergi Numarası</div>
                <div>TCNO</div>
              </th>
              <th class="col" @click="sortTable(3)">Vergi Dairesi</th>
              <th class="col" @click="sortTable(4)">Vergi Dairesi Şehri</th>
              <th class="col" @click="sortTable(5)">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" v-bind:key="customer.customer_id">
              <td>{{ customer.customer_name }}</td>
              <td>{{ customerType(customer.customer_type) }}</td>
              <td>{{ customer.tax_number }}</td>
              <td>{{ customer.tax_administration_city }}</td>
              <td>{{ customer.tax_administration }}</td>
              <td>
                <div class="dropdown-center">
                  <button
                    class="dropdown-toggle text-body table-btn"
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
                        <div
                          class="py-1 d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#confirmModal"
                          @click="selectCustomer(customer.customer_id)"
                        >
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
    <!-- Modal -->
    <Teleport to="body">
      <div
        class="modal fade"
        id="confirmModal"
        tabindex="-1"
        aria-labelledby="deleteDialogLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="deleteDialogLabel">Silme İşlemi Geri Alınamaz</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Müşteriyi silmek istediğinize emin misiniz?</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Vazgeç</button>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteCustomer()"
                data-bs-dismiss="modal"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
    <the-loading v-if="isDeleting" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useCustomerStore } from '@/stores/customer'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const authStore = useAuthStore()
const customerStore = useCustomerStore()

const { _user: user } = storeToRefs(authStore)
const { _customers: customers } = storeToRefs(customerStore)

const getCustomers = async () => {
  await customerStore.fetchCustomers(user.value.id)
}

const isDeleting = ref(false)
const selectedCustomerId = ref('')

const selectCustomer = (customerId: string) => {
  selectedCustomerId.value = customerId
}

const deleteCustomer = async () => {
  isDeleting.value = true
  await customerStore
    .deleteCustomer(selectedCustomerId.value)
    .then(async () => {
      toast.success('Müşteri başarıyla silindi.', { timeout: 2000 })
      await getCustomers()
    })
    .catch((_) => {
      toast.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.', { timeout: 2000 })
    })
    .finally(() => (isDeleting.value = false))
}

const customerType = (customerType: string) => {
  return customerType === 'company' ? 'Şirket' : 'Şahıs'
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

const sortTable = (n: number) => {
  let table: HTMLTableElement,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0
  table = document.getElementById('customersTable') as HTMLTableElement
  switching = true
  // Set the sorting direction to ascending:
  dir = 'asc'
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false
    rows = table.rows
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName('TD')[n]
      y = rows[i + 1].getElementsByTagName('TD')[n]
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true
          break
        }
      } else if (dir == 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true
          break
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode!.insertBefore(rows[i + 1], rows[i])
      switching = true
      // Each time a switch is done, increase this count by 1:
      switchcount++
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc'
        switching = true
      }
    }
  }
}
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

  cursor: pointer;
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
    background-color: var(--secondary-color-l);
    color: var(--textcolor-light);
  }
}

.table-btn {
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
  color: var(--textcolor-light) !important;
}
</style>
