<template>
  <div>
    <h1>Tüm Dekontlar</h1>
    <div class="row">
      <div class="col">
        <table
          class="table table-hover border table-responsive shadow"
          v-if="receipts.length !== 0"
        >
          <thead>
            <tr>
              <th class="col">
                <div>Firma Adı</div>
                <div>Vergi No</div>
              </th>
              <th class="col">Dekont No</th>
              <th class="col">Dekont Tarihi</th>
              <th class="col">Tutar</th>
              <th class="col">Dekont Türü</th>
              <th class="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="receipt in receipts" v-bind:key="receipt.receipt_id">
              <td>
                <div>{{ receipt.customer_name }}</div>
                <div>{{ receipt.tax_number }}</div>
              </td>
              <td>{{ receipt.receipt_id }}</td>
              <td>{{ receipt.created_date }}</td>
              <td>{{ receipt.price + ' ₺' }}</td>
              <td>{{ docType(receipt.type) }}</td>
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
                    <li class="my-1">
                      <RouterLink
                        :to="{ name: 'receipt-details', params: { id: receipt.receipt_id } }"
                        class="dropdown-item"
                      >
                        <div class="py-1 d-flex align-items-center">
                          <i class="fa-solid fa-info me-2"></i>
                          <div>Dekontu Görüntüle</div>
                        </div>
                      </RouterLink>
                    </li>
                    <li class="my-1">
                      <a class="dropdown-item" href="#">
                        <div class="py-1 d-flex align-items-center">
                          <i class="fa-solid fa-pen-to-square me-2"></i>
                          <div>Dekontu Düzenle</div>
                        </div>
                      </a>
                    </li>
                    <li class="my-1">
                      <a class="dropdown-item" href="#">
                        <div class="py-1 d-flex align-items-center">
                          <i class="fa-solid fa-trash-can me-2"></i>
                          <div>Dekontu Sil</div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <h2 class="text-center fw-light my-3" v-else>Dekont bulunamadı</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useReceiptStore } from '@/stores/receipt'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const authStore = useAuthStore()
const { _user: user } = storeToRefs(authStore)
const receiptStore = useReceiptStore()
const { _receipts: receipts } = storeToRefs(receiptStore)

const fetchReceipts = async () => {
  await receiptStore.fetchReceipts(user.value.id).catch((_) => {
    toast.error('Bir hata oluştu, lütfen daha sonra tekrar deneyiniz.', {
      timeout: 2500
    })
  })
}

const docType = (receiptType: number) => {
  return receiptType === 1 ? 'Alacak' : 'Borç'
}

onBeforeMount(async () => {
  await fetchReceipts()
})
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
  color: var(--textcolor-dark);
}
thead {
  background-image: linear-gradient(
    90deg,
    var(--secondary-color-h) 0%,
    var(--secondary-color-l) 100%
  );
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
