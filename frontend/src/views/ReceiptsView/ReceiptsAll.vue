<template>
  <div>
    <h1>Tüm Dekontlar</h1>
    <div class="row">
      <div class="col">
        <table class="table table-striped table-responsive" v-if="receipts.length !== 0">
          <thead>
            <tr>
              <th class="col">Dekont No</th>
              <th class="col">Dekont Tarihi</th>
              <th class="col">
                <div>Firma Adı</div>
                <div>Vergi No</div>
              </th>
              <th class="col">Açıklama</th>
              <th class="col">Tutar</th>
              <th class="col">Dekont Türü</th>
              <th class="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="receipt in receipts" v-bind:key="receipt.receipt_id">
              <td>{{ receipt.receipt_id }}</td>
              <td>{{ receipt.created_date }}</td>
              <td>
                <div>{{ receipt.customer_name }}</div>
                <div>{{ receipt.tax_number }}</div>
              </td>
              <td>{{ receipt.description }}</td>
              <td>{{ receipt.price + ' ₺' }}</td>
              <td>{{ docType(receipt.type) }}</td>
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
                      <a class="dropdown-item bg-success">
                        <div class="py-1 text-white">
                          <i class="fa-solid fa-info"></i> Dekontu Görüntüle
                        </div>
                      </a>
                    </li>
                    <li class="my-1">
                      <a class="dropdown-item bg-primary">
                        <div class="py-1 text-white">Dekontu Düzenle</div>
                      </a>
                    </li>
                    <li class="my-1">
                      <a class="dropdown-item bg-danger">
                        <div class="py-1 text-white">Dekontu Sil</div>
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
import { onMounted } from 'vue'

const authStore = useAuthStore()
const { _user: user } = storeToRefs(authStore)
const receiptStore = useReceiptStore()
const { _receipts: receipts } = storeToRefs(receiptStore)

const fetchReceipts = async () => {
  await receiptStore.fetchReceipts(user.value.id)
}

const docType = (receiptType: number) => {
  return receiptType === 1 ? 'Alacak' : 'Borç'
}

onMounted(() => fetchReceipts())
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
