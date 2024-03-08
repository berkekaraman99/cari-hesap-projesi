<template>
  <div>
    <h1>Dekont Detayları</h1>
    <div class="card card-body shadow-sm">
      <div class="container">
        <div class="row py-2 mb-2">
          <div class="col">
            <h3>
              Müşteri Adı: <span>{{ receipt.customer_name }}</span>
            </h3>
            <h3>
              Dekont Türü: <span>{{ docType(receipt.type) }}</span>
            </h3>
            <h3>
              Tarih: <span>{{ receipt.created_date }}</span>
            </h3>
            <h3>
              Tutar: <span>{{ receipt.price + '₺' }}</span>
            </h3>
            <h3>
              Açıklama: <span>{{ receipt.description }}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="my-3 d-flex justify-content-end">
      <RouterLink :to="{ name: 'receipt-edit', params: { id: props.id } }"
        ><button class="btn btn-primary">Dekontu Düzenle</button></RouterLink
      >
      <button class="btn btn-danger ms-3">Dekontu Sil</button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { useReceiptStore } from '@/stores/receipt'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const receiptStore = useReceiptStore()
onBeforeMount(async () => {
  await receiptStore.getReceiptById(props.id)
})

const docType = (receiptType: number) => {
  return receiptType === 1 ? 'Alacak' : 'Borç'
}

const { _receipt: receipt } = storeToRefs(receiptStore)
</script>

<style scoped>
h3 span {
  font-weight: normal;
}
</style>
