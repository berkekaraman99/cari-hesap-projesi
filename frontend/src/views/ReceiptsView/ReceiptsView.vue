<template>
  <div>
    <h1 class="my-4 ps-2">Tüm Dekontlar</h1>
    <div class="row">
      <div class="col">
        <table
          id="receiptsTable"
          class="table table-hover border table-responsive shadow"
          v-if="receipts.length !== 0"
        >
          <thead>
            <tr>
              <th class="col" @click="sortTable(0)">
                <div>Firma Adı</div>
                <div>Vergi No</div>
              </th>
              <th class="col" @click="sortTable(1)">Dekont No</th>
              <th class="col" @click="sortTable(2)">Dekont Tarihi</th>
              <th class="col" @click="sortTable(3)">Tutar</th>
              <th class="col" @click="sortTable(4)">Dekont Türü</th>
              <th class="col" @click="sortTable(5)">İşlemler</th>
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
              <td>{{ docType(receipt.receipt_type) }}</td>
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
                    <li class="my-1">
                      <a
                        class="dropdown-item"
                        @click="selectReceipt(receipt.receipt_id), changeReceiptSelected()"
                      >
                        <div class="py-1 d-flex align-items-center">
                          <i class="fa-solid fa-info me-2"></i>
                          <div>Dekontu Görüntüle</div>
                        </div>
                      </a>
                    </li>
                    <li class="my-1">
                      <RouterLink
                        class="dropdown-item"
                        :to="{ name: 'receipt-edit', params: { id: receipt.receipt_id } }"
                      >
                        <div class="py-1 d-flex align-items-center">
                          <i class="fa-solid fa-pen-to-square me-2"></i>
                          <div>Dekontu Düzenle</div>
                        </div>
                      </RouterLink>
                    </li>
                    <li class="my-1">
                      <a class="dropdown-item" href="#">
                        <div
                          class="py-1 d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#confirmModal"
                          @click="selectReceipt(receipt.receipt_id)"
                        >
                          <i class="fa-solid fa-trash-can me-2"></i>
                          <div>Dekontu Sil</div>
                        </div>
                      </a>
                    </li>
                    <li class="my-1">
                      <a class="dropdown-item" href="#">
                        <div
                          class="py-1 d-flex align-items-center"
                          @click="changeQrOpened(), createQr(receipt.receipt_id)"
                        >
                          <i class="fa-solid fa-qrcode me-2"></i>
                          <div>QR ile Paylaş</div>
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
            <div class="modal-body">Dekontu silmek istediğinize emin misiniz?</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Vazgeç</button>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteReceipt()"
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
    <Transition name="fade">
      <ReceiptModal
        :id="selectedReceiptId"
        @close-dialog="changeReceiptSelected"
        v-if="receiptSelected"
      />
    </Transition>
    <Transition name="fade">
      <QrModal v-if="qrOpened" @close-dialog="changeQrOpened" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useReceiptStore } from '@/stores/receipt'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'
import { useToast } from 'vue-toastification'
import ReceiptModal from '@/components/shared/ReceiptModal.vue'
import QrModal from '@/components/shared/QrModal.vue'

const toast = useToast()
const receiptStore = useReceiptStore()
const authStore = useAuthStore()

const { _user: user } = storeToRefs(authStore)
const { _receipts: receipts, _qrCode: qrCode } = storeToRefs(receiptStore)

const isDeleting = ref(false)
const selectedReceiptId = ref('')
const receiptSelected = ref(false)

const createQr = async (id: string) => {
  await receiptStore.getQrCode(id).then(() => {
    const image = document.createElement('img')
    image.src = qrCode.value
    document.getElementById('qr')?.appendChild(image)
  })
}

const qrOpened = ref(false)
const changeQrOpened = () => {
  qrOpened.value = !qrOpened.value
}

const changeReceiptSelected = () => {
  receiptSelected.value = !receiptSelected.value
}

const selectReceipt = (id: string) => {
  selectedReceiptId.value = id
  console.log(selectedReceiptId.value)
}

const deleteReceipt = async () => {
  isDeleting.value = true
  await receiptStore
    .deleteReceipt(selectedReceiptId.value)
    .then(async () => {
      toast.success('Dekont başarıyla silindi.', { timeout: 2000 })
      await fetchReceipts()
    })
    .catch((_) => {
      toast.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.', { timeout: 2000 })
    })
    .finally(() => (isDeleting.value = false))
}

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

const sortTable = (n: number) => {
  let table: HTMLElement,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0
  table = document.getElementById('receiptsTable')!
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
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
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
